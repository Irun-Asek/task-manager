"use client";

import { useEffect, useState } from "react";
import { Task, TaskCreate, TaskUpdate } from "@/types/task";
import { getTasks, createTask, updateTask, deleteTask } from "@/api/tasks";
import TaskCard from "@/components/TaskCard";
import TaskForm from "@/components/TaskForm";
import TaskFilters from "@/components/TaskFilters";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    try {
      setLoading(true);
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError("Failed to load tasks. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(taskData: TaskCreate) {
    try {
      await createTask(taskData);
      setShowForm(false);
      fetchTasks();
    } catch (err) {
      setError("Failed to create task.");
    }
  }

  async function handleUpdate(taskData: TaskCreate) {
    if (!editingTask) return;
    try {
      await updateTask(editingTask.id, taskData as TaskUpdate);
      setEditingTask(null);
      fetchTasks();
    } catch (err) {
      setError("Failed to update task.");
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this task?")) return;
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (err) {
      setError("Failed to delete task.");
    }
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !statusFilter || statusFilter ==="all" ? true: task.status === statusFilter ;
    const matchesPriority = !priorityFilter || priorityFilter ==="all" ? true: task.priority === priorityFilter ;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
            <p className="text-gray-500 text-sm mt-1">{tasks.length} tasks total</p>
          </div>
          <button
            onClick={() => { setShowForm(true); setEditingTask(null); }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
          >
            + New Task
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        {/* Filters */}
        <TaskFilters
          search={search}
          status={statusFilter}
          priority={priorityFilter}
          onSearchChange={setSearch}
          onStatusChange={setStatusFilter}
          onPriorityChange={setPriorityFilter}
        />

        {/* Tasks Grid */}
        {loading ? (
          <p className="text-center text-gray-400 mt-20">Loading tasks...</p>
        ) : filteredTasks.length === 0 ? (
          <p className="text-center text-gray-400 mt-20">No tasks found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={(task) => { setEditingTask(task); setShowForm(true); }}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <TaskForm
          onSubmit={editingTask ? handleUpdate : handleCreate}
          onCancel={() => { setShowForm(false); setEditingTask(null); }}
          editingTask={editingTask}
        />
      )}
    </main>
  );
}