from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from uuid import UUID

from app.models.db import get_db
from app.models.course import Course, Problem, ProblemSubmission, CourseEnrollment
from app.models.user import User
from app.schemas.course import (
    ProblemResponse,
    ProblemSubmissionCreate,
    ProblemSubmissionResponse,
    CourseResponse,
    CourseEnrollmentResponse,
)
from app.api.deps import get_current_user

router = APIRouter()


@router.get("/courses", response_model=list[CourseResponse])
async def list_courses(
    category: str = None,
    db: AsyncSession = Depends(get_db)
):
    """List all published courses, optionally filtered by category."""
    query = select(Course).filter(Course.is_published == True)
    
    if category:
        query = query.filter(Course.category == category)
    
    result = await db.execute(query)
    courses = result.scalars().all()
    return courses


@router.get("/courses/{course_id}", response_model=CourseResponse)
async def get_course(course_id: UUID, db: AsyncSession = Depends(get_db)):
    """Get a specific course."""
    result = await db.execute(select(Course).filter(Course.id == course_id))
    course = result.scalars().first()
    
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    return course


@router.post("/courses/{course_id}/enroll")
async def enroll_in_course(
    course_id: UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Enroll user in a course."""
    # Check if already enrolled
    result = await db.execute(
        select(CourseEnrollment).filter(
            (CourseEnrollment.user_id == current_user.id) &
            (CourseEnrollment.course_id == course_id)
        )
    )
    existing = result.scalars().first()
    
    if existing:
        raise HTTPException(status_code=400, detail="Already enrolled in this course")
    
    enrollment = CourseEnrollment(user_id=current_user.id, course_id=course_id)
    db.add(enrollment)
    await db.commit()
    await db.refresh(enrollment)
    
    return {"message": "Enrolled successfully", "enrollment_id": enrollment.id}


@router.get("/problems/{problem_id}", response_model=ProblemResponse)
async def get_problem(problem_id: UUID, db: AsyncSession = Depends(get_db)):
    """Get a specific problem with its content."""
    result = await db.execute(select(Problem).filter(Problem.id == problem_id))
    problem = result.scalars().first()
    
    if not problem:
        raise HTTPException(status_code=404, detail="Problem not found")
    
    return problem


@router.get("/courses/{course_id}/problems", response_model=list[ProblemResponse])
async def get_course_problems(
    course_id: UUID,
    db: AsyncSession = Depends(get_db)
):
    """Get all problems in a course."""
    result = await db.execute(
        select(Problem)
        .filter(Problem.course_id == course_id)
        .order_by(Problem.order)
    )
    problems = result.scalars().all()
    return problems


@router.post("/problems/{problem_id}/submit", response_model=ProblemSubmissionResponse)
async def submit_problem(
    problem_id: UUID,
    submission: ProblemSubmissionCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Submit a solution to a problem."""
    # Get problem
    result = await db.execute(select(Problem).filter(Problem.id == problem_id))
    problem = result.scalars().first()
    
    if not problem:
        raise HTTPException(status_code=404, detail="Problem not found")
    
    # Check if code is correct (basic validation)
    is_correct = False
    feedback = "Submitted for review"
    
    if submission.submitted_code and problem.solution_code:
        # Simple check: if submitted contains key patterns from solution, mark as correct
        # In production, this would be actual test execution
        is_correct = all(
            pattern in submission.submitted_code 
            for pattern in ["import", "numpy", "np"]
            if pattern in problem.solution_code
        )
        feedback = "✓ Solution looks correct!" if is_correct else "❌ Try again. Review the hints."
    
    # Record submission
    submission_obj = ProblemSubmission(
        user_id=current_user.id,
        problem_id=problem_id,
        submitted_code=submission.submitted_code,
        submitted_answer=submission.submitted_answer,
        is_correct=is_correct,
        score=problem.points if is_correct else 0,
        feedback=feedback
    )
    
    db.add(submission_obj)
    
    # Update user points if correct
    if is_correct:
        current_user.points += problem.points
        current_user.last_activity = __import__('datetime').datetime.utcnow()
    
    await db.commit()
    await db.refresh(submission_obj)
    
    return submission_obj


@router.get("/user/progress")
async def get_user_progress(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get user's learning progress."""
    result = await db.execute(
        select(CourseEnrollment).filter(CourseEnrollment.user_id == current_user.id)
    )
    enrollments = result.scalars().all()
    
    return {
        "points": current_user.points,
        "streak_days": current_user.streak_days,
        "mastery_score": current_user.mastery_score,
        "enrolled_courses": enrollments
    }
