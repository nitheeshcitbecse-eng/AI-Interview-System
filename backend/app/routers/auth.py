from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.database import get_db
from app.models.user import User, Profile, Settings as UserSettings
from app.models.dashboard import DashboardStats
from app.schemas.auth import RegisterRequest, LoginRequest, TokenResponse
from app.utils.security import hash_password, verify_password, create_access_token

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register", response_model=TokenResponse, status_code=201)
async def register(data: RegisterRequest, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.email == data.email))
    if result.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Email already registered")

    user = User(name=data.name, email=data.email, password_hash=hash_password(data.password))
    db.add(user)
    await db.flush()

    db.add(Profile(user_id=user.id))
    db.add(UserSettings(user_id=user.id))
    db.add(DashboardStats(user_id=user.id))

    await db.commit()
    await db.refresh(user)
    return TokenResponse(user_id=user.id, name=user.name, token=create_access_token(user.id, user.name))


@router.post("/login", response_model=TokenResponse)
async def login(data: LoginRequest, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.email == data.email))
    user = result.scalar_one_or_none()
    if not user or not verify_password(data.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    return TokenResponse(user_id=user.id, name=user.name, token=create_access_token(user.id, user.name))