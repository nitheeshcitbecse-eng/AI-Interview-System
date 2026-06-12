from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.sql import func
from app.database import Base


class History(Base):
    __tablename__ = "history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    session_id = Column(Integer, ForeignKey("interview_sessions.session_id", ondelete="CASCADE"))
    role = Column(String(200), nullable=True)
    score = Column(Float, default=0.0)
    duration = Column(Integer, default=0)
    date = Column(DateTime(timezone=True), server_default=func.now())