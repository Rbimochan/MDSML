from sqlalchemy import Boolean, Column, Integer, String, DateTime, Float
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
import uuid
from .db import Base

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String, unique=True, index=True)
    full_name = Column(String, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow, index=True)
    
    # Learning state
    points = Column(Integer, default=0)
    streak_days = Column(Integer, default=0)
    last_activity = Column(DateTime, default=datetime.utcnow)
    mastery_score = Column(Float, default=0.0)
