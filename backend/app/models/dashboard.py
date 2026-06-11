from sqlalchemy import Column, Integer, Float, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base


class DashboardStats(Base):
    __tablename__ = "dashboard_stats"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), unique=True)
    total_interviews = Column(Integer, default=0)
    average_score = Column(Float, default=0.0)
    total_questions = Column(Integer, default=0)
    practice_hours = Column(Float, default=0.0)

    user = relationship("User", back_populates="dashboard_stats")