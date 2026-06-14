import { Task } from "@/types/task";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

const statusColors: Record<string, string> = {
  todo: "bg-gray-200 text-gray-800",
  in_progress: "bg-blue-100 text-blue-800",
  done: "bg-green-100 text-green-800",
};

const priorityColors: Record<string, string> = {
  low: "bg-yellow-100 text-yellow-800",
  medium: "bg-orange-100 text-orange-800",
  high: "bg-red-100 text-red-800",
};

export default function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 flex flex-col gap-3 border border-gray-200 hover:shadow-lg transition">
      <div className="flex justify-between items-start">
        <h3 className="text-base font-bold text-gray-900">{task.title}</h3>
        <div className="flex gap-3">
          <button
            onClick={() => onEdit(task)}
            className="text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="text-sm font-medium text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-600">{task.description}</p>

      <div className="flex gap-2 flex-wrap">
        <span className={`text-xs px-3 py-1 rounded-full font-semibold ${statusColors[task.status]}`}>
          {task.status.replace("_", " ").toUpperCase()}
        </span>
        <span className={`text-xs px-3 py-1 rounded-full font-semibold ${priorityColors[task.priority]}`}>
          {task.priority.toUpperCase()} PRIORITY
        </span>
      </div>

      <p className="text-xs font-medium text-gray-500">📅 Due: {task.due_date}</p>
    </div>
  );
}