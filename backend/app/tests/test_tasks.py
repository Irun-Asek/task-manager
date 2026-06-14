import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_create_task():
    response = client.post("/api/tasks", json={
        "title": "Test Task",
        "description": "This is a test task",
        "status": "todo",
        "priority": "medium",
        "due_date": "2026-12-01"
    })
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == "Test Task"
    assert data["status"] == "todo"
    assert "id" in data

def test_get_all_tasks():
    response = client.get("/api/tasks")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_get_single_task():
    # First create a task
    create_res = client.post("/api/tasks", json={
        "title": "Single Task",
        "description": "Testing get single",
        "status": "todo",
        "priority": "low",
        "due_date": "2026-12-01"
    })
    task_id = create_res.json()["id"]

    # Then fetch it
    response = client.get(f"/api/tasks/{task_id}")
    assert response.status_code == 200
    assert response.json()["id"] == task_id

def test_get_task_not_found():
    response = client.get("/api/tasks/99999")
    assert response.status_code == 404

def test_update_task():
    # Create a task first
    create_res = client.post("/api/tasks", json={
        "title": "Update Me",
        "description": "Will be updated",
        "status": "todo",
        "priority": "low",
        "due_date": "2026-12-01"
    })
    task_id = create_res.json()["id"]

    # Update it
    response = client.put(f"/api/tasks/{task_id}", json={
        "status": "done"
    })
    assert response.status_code == 200
    assert response.json()["status"] == "done"

def test_delete_task():
    # Create a task first
    create_res = client.post("/api/tasks", json={
        "title": "Delete Me",
        "description": "Will be deleted",
        "status": "todo",
        "priority": "low",
        "due_date": "2026-12-01"
    })
    task_id = create_res.json()["id"]

    # Delete it
    response = client.delete(f"/api/tasks/{task_id}")
    assert response.status_code == 204

    # Verify it's gone
    response = client.get(f"/api/tasks/{task_id}")
    assert response.status_code == 404

def test_create_task_invalid_status():
    response = client.post("/api/tasks", json={
        "title": "Invalid Task",
        "description": "Bad status",
        "status": "invalid_status",
        "priority": "medium",
        "due_date": "2026-12-01"
    })
    assert response.status_code == 422

def test_create_task_invalid_date():
    response = client.post("/api/tasks", json={
        "title": "Invalid Date Task",
        "description": "Bad date",
        "status": "todo",
        "priority": "medium",
        "due_date": "not-a-date"
    })
    assert response.status_code == 422