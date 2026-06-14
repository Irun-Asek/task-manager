import axios from "axios";
import fs from "fs";
import path from "path";

const API_URL = "http://127.0.0.1:8000/api";

async function exportTasks() {
  console.log("📦 Exporting tasks...");
  try {
    const res = await axios.get(`${API_URL}/tasks`);
    const tasks = res.data;

    const outputPath = path.join(__dirname, "tasks_export.json");
    fs.writeFileSync(outputPath, JSON.stringify(tasks, null, 2));

    console.log(`✅ Exported ${tasks.length} tasks to tasks_export.json`);
  } catch (err: any) {
    console.error("❌ Failed to export tasks:", err.message);
  }
}

exportTasks();