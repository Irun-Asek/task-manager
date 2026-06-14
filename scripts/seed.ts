import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

const sampleTasks = [
  {
    title: "Design database schema",
    description: "Create the initial database schema for the project",
    status: "done",
    priority: "high",
    due_date: "2026-06-01",
  },
  {
    title: "Set up FastAPI backend",
    description: "Initialize the FastAPI project and configure dependencies",
    status: "done",
    priority: "high",
    due_date: "2026-06-03",
  },
  {
    title: "Build React frontend",
    description: "Create the Next.js frontend with TypeScript",
    status: "in_progress",
    priority: "high",
    due_date: "2026-06-10",
  },
  {
    title: "Write unit tests",
    description: "Write tests for all API endpoints",
    status: "todo",
    priority: "medium",
    due_date: "2026-06-12",
  },
  {
    title: "Deploy to production",
    description: "Deploy the app to a cloud provider",
    status: "todo",
    priority: "low",
    due_date: "2026-06-20",
  },
];

async function seed() {
  console.log("🌱 Seeding tasks...");
  for (const task of sampleTasks) {
    try {
      const res = await axios.post(`${API_URL}/tasks`, task);
      console.log(`✅ Created: ${res.data.title}`);
    } catch (err: any) {
      console.error(`❌ Failed to create "${task.title}":`, err.message);
    }
  }
  console.log("✅ Seeding complete!");
}

seed();