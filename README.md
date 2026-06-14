# Task Manager — Intern Assessment

A full-stack Task Manager application built with FastAPI, PostgreSQL, and Next.js (TypeScript).

---

## Tech Stack

- **Backend:** Python, FastAPI, SQLAlchemy, PostgreSQL
- **Frontend:** Next.js 16, TypeScript, Tailwind CSS
- **Scripts:** Node.js, TypeScript, ts-node

---

## Project Structure
task-manager/
├── backend/          # FastAPI backend
├── frontend/         # Next.js frontend
├── scripts/          # Node.js seed/export scripts
└── README.md
---

## Getting Started

### Prerequisites
- Python 3.10+
- Node.js 18+
- PostgreSQL 18

### 1. Database Setup

```bash
psql -U postgres
CREATE DATABASE taskmanager;
\q
```

### 2. Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
pip install -r requirements.txt
```

Create a `.env` file in the `backend/` folder:

```env
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/taskmanager
```

Start the backend:

```bash
uvicorn main:app --reload
```

Backend runs at: `http://127.0.0.1:8000`
API docs at: `http://127.0.0.1:8000/docs`

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: `http://localhost:3000`

### 4. Scripts Setup

```bash
cd scripts
npm install
```

Seed sample tasks:
```bash
npm run seed
```

Export tasks to JSON:
```bash
npm run export-tasks
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/tasks | Get all tasks |
| GET | /api/tasks/{id} | Get a single task |
| POST | /api/tasks | Create a task |
| PUT | /api/tasks/{id} | Update a task |
| DELETE | /api/tasks/{id} | Delete a task |

---

## Features

- Full CRUD for tasks
- Filter tasks by status and priority
- Search tasks by title or description
- Input validation with Pydantic
- Responsive UI with Tailwind CSS
- Seed script to populate sample data
- Export script to save tasks as JSON

---

## What's Completed

- Q1 — REST API with full CRUD
- Q2 — PostgreSQL database with SQLAlchemy
- Q3 — Input validation with Pydantic
- Q4 — Task list page
- Q5 — Create task form
- Q6 — Edit task form
- Q7 — Delete task
- Q8 — Search functionality
- Q9 — Filter by status and priority
- Q10 — Seed and export scripts
- Q11 —8 passing tests (pytest)

---

### Running Tests

```bash
cd backend
venv\Scripts\activate
python -m pytest app/tests/test_tasks.py -v
```

Tests cover:
- Create task
- Get all tasks
- Get single task
- Get task not found (404)
- Update task
- Delete task
- Invalid status validation
- Invalid date validation


## Task Summary API (Q12)

A separate standalone Python API that accepts a list of tasks and returns a summary report.

### Setup

```bash
cd task-summary-api
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

### Start the server

```bash
uvicorn main:app --reload --port 8001
```

Runs at: `http://127.0.0.1:8001`
Docs at: `http://127.0.0.1:8001/docs`

### Endpoint

`POST /api/task-summary`

Accepts a list of tasks and returns:
- Total tasks count
- Completed tasks count
- Pending tasks count
- High priority tasks count
- Tasks grouped by status
- Tasks grouped by priority

---

## Notes

TypeScript is used throughout the frontend and scripts
AI tools were used to assist development the development 
I have used claude and chatgpt

