from fastapi import FastAPI
from pydantic import BaseModel, field_validator
from typing import List
from datetime import date

app = FastAPI(title="Task Summary API")

class TaskItem(BaseModel):
    id: int
    title: str
    status: str
    priority: str
    due_date: str

    @field_validator("status")
    @classmethod
    def validate_status(cls, v):
        if v not in ["todo", "in_progress", "done"]:
            raise ValueError("status must be one of: todo, in_progress, done")
        return v

    @field_validator("priority")
    @classmethod
    def validate_priority(cls, v):
        if v not in ["low", "medium", "high"]:
            raise ValueError("priority must be one of: low, medium, high")
        return v

    @field_validator("due_date")
    @classmethod
    def validate_due_date(cls, v):
        try:
            date.fromisoformat(v)
        except ValueError:
            raise ValueError("due_date must be a valid date in YYYY-MM-DD format")
        return v

class TaskList(BaseModel):
    tasks: List[TaskItem]

@app.post("/api/task-summary")
def task_summary(body: TaskList):
    tasks = body.tasks

    total_tasks = len(tasks)
    completed_tasks = sum(1 for t in tasks if t.status == "done")
    pending_tasks = sum(1 for t in tasks if t.status != "done")
    high_priority_tasks = sum(1 for t in tasks if t.priority == "high")

    tasks_by_status = {
        "todo": sum(1 for t in tasks if t.status == "todo"),
        "in_progress": sum(1 for t in tasks if t.status == "in_progress"),
        "done": sum(1 for t in tasks if t.status == "done"),
    }

    tasks_by_priority = {
        "low": sum(1 for t in tasks if t.priority == "low"),
        "medium": sum(1 for t in tasks if t.priority == "medium"),
        "high": sum(1 for t in tasks if t.priority == "high"),
    }

    return {
        "total_tasks": total_tasks,
        "completed_tasks": completed_tasks,
        "pending_tasks": pending_tasks,
        "high_priority_tasks": high_priority_tasks,
        "tasks_by_status": tasks_by_status,
        "tasks_by_priority": tasks_by_priority,
    }