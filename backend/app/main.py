from contextlib import asynccontextmanager
from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.config import settings
from app.database import create_all_tables
from app.routers import auth, interview, resume, dashboard, history
from app.routers import settings as settings_router, profile, topics, ml


@asynccontextmanager
async def lifespan(app: FastAPI):
    await create_all_tables()
    for sub in ["audio", "resumes"]:
        Path(settings.UPLOAD_DIR).joinpath(sub).mkdir(parents=True, exist_ok=True)
    yield


app = FastAPI(title="AI Interviewer API", version="1.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL, "http://localhost:5173"],
    allow_credentials=True, allow_methods=["*"], allow_headers=["*"],
)

upload_path = Path(settings.UPLOAD_DIR)
upload_path.mkdir(exist_ok=True)
app.mount("/static", StaticFiles(directory=str(upload_path)), name="static")

app.include_router(auth.router)
app.include_router(interview.router)
app.include_router(resume.router)
app.include_router(dashboard.router)
app.include_router(history.router)
app.include_router(settings_router.router)
app.include_router(profile.router)
app.include_router(topics.router)
app.include_router(ml.router)

@app.get("/")
async def root():
    return {"status": "ok", "app": settings.APP_NAME}