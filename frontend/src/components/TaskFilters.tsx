import { TaskStatus, TaskPriority } from "@/types/task";

interface TaskFiltersProps {
  search: string;
  status: string;
  priority: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onPriorityChange: (value: string) => void;
}

export default function TaskFilters({
  search,
  status,
  priority,
  onSearchChange,
  onStatusChange,
  onPriorityChange,
}: TaskFiltersProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-6">
  <input
    type="text"
    placeholder="Search tasks..."
    value={search}
    onChange={(e) => onSearchChange(e.target.value)}
    className="border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1 min-w-[200px] bg-white shadow-sm"
  />

  <div className="flex flex-col gap-1">
    <label className="text-xs font-semibold text-gray-600">Status</label>
    <select
      value={status}
      onChange={(e) => onStatusChange(e.target.value)}
      className="border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
    >
      <option value="all">All</option>
      <option value="todo">Todo</option>
      <option value="in_progress">In Progress</option>
      <option value="done">Done</option>
    </select>
  </div>

  <div className="flex flex-col gap-1">
    <label className="text-xs font-semibold text-gray-600">Priority</label>
    <select
      value={priority}
      onChange={(e) => onPriorityChange(e.target.value)}
      className="border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
    >
      <option value="all">All</option>
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>
  </div>
</div>
  );
}