import React from 'react';
import { FaTasks, FaCheckCircle, FaTimesCircle, FaTrash } from 'react-icons/fa';


interface Task {
  id: number;
  title: string;
  description: string;
  status?: string;
}

interface TaskListProps {
  tasks: Task[];
  onDone: (id: number) => void;
  onCancel?: (id: number) => void;
  onDelete?: (id: number) => void;
}

const statusColors: Record<string, string> = {
  done: 'bg-green-100 text-green-700 border-green-300',
  cancelled: 'bg-yellow-100 text-yellow-700 border-yellow-300',
  pending: 'bg-blue-100 text-blue-700 border-blue-300',
};

const TaskList: React.FC<TaskListProps> = ({ tasks, onDone, onCancel, onDelete }) => (
  <div className="flex flex-col gap-6 w-full max-w-md">
    {tasks.length === 0 ? (
      <div className="text-gray-400 text-center">No tasks yet.</div>
    ) : (
      tasks.map(task => (
        <div key={task.id} className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl shadow-lg flex flex-col p-5 gap-2 border border-blue-100">
          <div className="flex items-center gap-3 mb-1">
            <FaTasks className="text-purple-500 text-lg" />
            <div className="font-bold text-lg text-gray-800 break-words max-w-xs" title={task.title}>{task.title}</div>
          </div>
          {task.status && (
            <span className={`inline-block mb-1 ml-7 px-3 py-0.5 rounded-full text-xs font-semibold border ${statusColors[task.status] || 'bg-gray-100 text-gray-600 border-gray-300'}`}>
              {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
            </span>
          )}
          <div className="text-gray-600 text-base mb-2 pl-7 break-words max-w-xs" title={task.description}>{task.description}</div>
          <div className="self-end flex flex-wrap gap-2">
  <button
    onClick={() => onDone(task.id)}
    disabled={task.status !== 'pending'}
    className={`bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-white text-sm font-medium px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition shadow-md ${task.status !== 'pending' ? 'opacity-50 cursor-not-allowed' : ''}`}
  >
    <FaCheckCircle className="text-sm" /> 
    <span className="hidden sm:inline">Done</span>
  </button>
  <button
    onClick={() => onCancel && onCancel(task.id)}
    disabled={task.status !== 'pending'}
    className={`bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white text-sm font-medium px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition shadow-md ${task.status !== 'pending' ? 'opacity-50 cursor-not-allowed' : ''}`}
  >
    <FaTimesCircle className="text-sm" /> 
    <span className="hidden sm:inline">Cancel</span>
  </button>
  <button
    onClick={() => onDelete && onDelete(task.id)}
    className="bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white text-sm font-medium px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition shadow-md"
  >
    <FaTrash className="text-sm" /> 
    <span className="hidden sm:inline">Delete</span>
  </button>
</div>
        </div>
      ))
    )}
  </div>
);

export default TaskList; 