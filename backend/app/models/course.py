from sqlalchemy import Boolean, Column, String, Text, Integer, ForeignKey, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid
from .db import Base


class Course(Base):
    __tablename__ = "courses"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String, index=True)
    description = Column(Text)
    category = Column(String, index=True)  # "foundation", "algorithms", "theory", etc.
    difficulty = Column(String, default="beginner")
    points_total = Column(Integer, default=100)
    is_published = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    problems = relationship("Problem", back_populates="course")
    enrollments = relationship("CourseEnrollment", back_populates="course")


class Problem(Base):
    __tablename__ = "problems"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    course_id = Column(UUID(as_uuid=True), ForeignKey("courses.id"), index=True)
    title = Column(String, index=True)
    description = Column(Text)
    problem_type = Column(String)  # "theory", "coding", "exercise"
    difficulty = Column(String, default="beginner")
    points = Column(Integer, default=10)
    
    # Content
    concept_content = Column(Text, nullable=True)
    code_template = Column(Text, nullable=True)
    solution_code = Column(Text, nullable=True)
    test_cases = Column(Text, nullable=True)  # JSON string
    
    # Metadata
    order = Column(Integer)  # Display order in course
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    course = relationship("Course", back_populates="problems")
    submissions = relationship("ProblemSubmission", back_populates="problem")


class CourseEnrollment(Base):
    __tablename__ = "course_enrollments"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), index=True)
    course_id = Column(UUID(as_uuid=True), ForeignKey("courses.id"), index=True)
    progress = Column(Integer, default=0)  # 0-100
    points_earned = Column(Integer, default=0)
    enrolled_at = Column(DateTime, default=datetime.utcnow)
    completed_at = Column(DateTime, nullable=True)
    
    # Relationships
    course = relationship("Course", back_populates="enrollments")


class ProblemSubmission(Base):
    __tablename__ = "problem_submissions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), index=True)
    problem_id = Column(UUID(as_uuid=True), ForeignKey("problems.id"), index=True)
    
    # Submission data
    submitted_code = Column(Text, nullable=True)
    submitted_answer = Column(Text, nullable=True)
    is_correct = Column(Boolean, default=False)
    score = Column(Integer, default=0)
    feedback = Column(Text, nullable=True)
    
    # Metadata
    attempts = Column(Integer, default=1)
    submitted_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    problem = relationship("Problem", back_populates="submissions")
