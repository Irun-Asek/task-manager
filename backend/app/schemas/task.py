from pydantic import BaseModel, field_validator
from typing import Optional
from datetime import date, datetime
from app.models.task import TaskStatus, TaskPriority

class TaskBase(BaseModel):
    title: str
    description: str
    status: TaskStatus
    priority: TaskPriority
    due_date: str

    @field_validator("due_date")
    @classmethod
    def validate_due_date(cls, v):
        try:
            date.fromisoformat(v)
        except ValueError:
            raise ValueError("due_date must be a valid date in YYYY-MM-DD format")
        return v

class TaskCreate(TaskBase):
    pass

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[TaskStatus] = None
    priority: Optional[TaskPriority] = None
    due_date: Optional[str] = None

    @field_validator("due_date")
    @classmethod
    def validate_due_date(cls, v):
        if v is not None:
            try:
                date.fromisoformat(v)
            except ValueError:
                raise ValueError("due_date must be a valid date in YYYY-MM-DD format")
        return v

class TaskResponse(TaskBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}