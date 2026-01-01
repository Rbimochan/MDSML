from typing import Optional, List
from pydantic import BaseModel
from uuid import UUID
from datetime import datetime


class ProblemBase(BaseModel):
    title: str
    description: str
    problem_type: str
    difficulty: str = "beginner"
    points: int = 10


class ProblemCreate(ProblemBase):
    course_id: UUID
    concept_content: Optional[str] = None
    code_template: Optional[str] = None
    solution_code: Optional[str] = None
    test_cases: Optional[str] = None


class ProblemResponse(ProblemBase):
    id: UUID
    course_id: UUID
    concept_content: Optional[str]
    code_template: Optional[str]
    
    class Config:
        from_attributes = True


class ProblemSubmissionCreate(BaseModel):
    problem_id: UUID
    submitted_code: Optional[str] = None
    submitted_answer: Optional[str] = None


class ProblemSubmissionResponse(BaseModel):
    id: UUID
    problem_id: UUID
    is_correct: bool
    score: int
    feedback: Optional[str]
    submitted_at: datetime
    
    class Config:
        from_attributes = True


class CourseBase(BaseModel):
    title: str
    description: str
    category: str
    difficulty: str = "beginner"
    points_total: int = 100


class CourseCreate(CourseBase):
    pass


class CourseResponse(CourseBase):
    id: UUID
    is_published: bool
    created_at: datetime
    
    class Config:
        from_attributes = True


class CourseEnrollmentResponse(BaseModel):
    course_id: UUID
    progress: int
    points_earned: int
    enrolled_at: datetime
    completed_at: Optional[datetime]
    
    class Config:
        from_attributes = True


class UserProgressResponse(BaseModel):
    points: int
    streak_days: int
    mastery_score: float
    enrolled_courses: List[CourseEnrollmentResponse]
