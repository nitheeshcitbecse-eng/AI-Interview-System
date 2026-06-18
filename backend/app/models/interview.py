from sqlalchemy import Column, Integer, String, Float, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base


class InterviewSession(Base):
    __tablename__ = "interview_sessions"

    session_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    role = Column(String(200), nullable=False)
    department = Column(String(200), nullable=True)
    resume_id = Column(Integer, ForeignKey("resumes.resume_id", ondelete="SET NULL"), nullable=True)
    start_time = Column(DateTime(timezone=True), server_default=func.now())
    end_time = Column(DateTime(timezone=True), nullable=True)
    duration = Column(Integer, nullable=True)
    status = Column(String(20), default="active")

    user = relationship("User", back_populates="sessions")
    questions = relationship("Question", back_populates="session", cascade="all, delete-orphan")
    answers = relationship("Answer", back_populates="session", cascade="all, delete-orphan")
    live_analysis = relationship("LiveAnalysis", back_populates="session", cascade="all, delete-orphan")
    feedback = relationship("Feedback", back_populates="session", uselist=False, cascade="all, delete-orphan")


class Question(Base):
    __tablename__ = "questions"

    question_id = Column(Integer, primary_key=True, index=True)
    session_id = Column(Integer, ForeignKey("interview_sessions.session_id", ondelete="CASCADE"))
    question_text = Column(Text, nullable=False)
    category = Column(String(100), nullable=True)
    difficulty = Column(String(20), default="medium")
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    session = relationship("InterviewSession", back_populates="questions")
    answers = relationship("Answer", back_populates="question", cascade="all, delete-orphan")


class Answer(Base):
    __tablename__ = "answers"

    answer_id = Column(Integer, primary_key=True, index=True)
    session_id = Column(Integer, ForeignKey("interview_sessions.session_id", ondelete="CASCADE"))
    question_id = Column(Integer, ForeignKey("questions.question_id", ondelete="CASCADE"))
    user_answer = Column(Text, nullable=True)
    audio_url = Column(String(500), nullable=True)
    time_taken = Column(Integer, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    session = relationship("InterviewSession", back_populates="answers")
    question = relationship("Question", back_populates="answers")


class LiveAnalysis(Base):
    __tablename__ = "live_analysis"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(Integer, ForeignKey("interview_sessions.session_id", ondelete="CASCADE"))
    confidence = Column(Float, default=0.0)
    communication = Column(Float, default=0.0)
    technical_score = Column(Float, default=0.0)
    clarity = Column(Float, default=0.0)
    eye_contact = Column(Float, default=0.0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    session = relationship("InterviewSession", back_populates="live_analysis")


class Feedback(Base):
    __tablename__ = "feedback"

    feedback_id = Column(Integer, primary_key=True, index=True)
    session_id = Column(Integer, ForeignKey("interview_sessions.session_id", ondelete="CASCADE"), unique=True)
    overall_score = Column(Float, default=0.0)
    technical_score = Column(Float, default=0.0)
    communication_score = Column(Float, default=0.0)
    confidence_score = Column(Float, default=0.0)
    clarity_score = Column(Float, default=0.0)
    strengths = Column(Text, nullable=True)
    weaknesses = Column(Text, nullable=True)
    suggestions = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    session = relationship("InterviewSession", back_populates="feedback")