from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import tasks
from app.db.database import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Task Manager API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tasks.router, prefix="/api")