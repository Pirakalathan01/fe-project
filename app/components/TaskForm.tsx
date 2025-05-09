'use client';

import React, { useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';

interface TaskFormProps {
  onAdd: (title: string, description: string) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && description.trim()) {
      onAdd(title, description);
      setTitle('');
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md flex flex-col gap-5 border border-blue-100">
      <div className="flex items-center gap-2 mb-2">
        <FaPlusCircle className="text-blue-500 text-xl" />
        <h2 className="text-2xl font-bold text-gray-800">Add a Task</h2>
      </div>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="border border-gray-200 bg-gray-50 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 text-base shadow-sm"
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        className="border border-gray-200 bg-gray-50 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 text-base shadow-sm resize-none"
        rows={3}
        required
      />
      <button
        type="submit"
        className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg px-6 py-2 font-semibold hover:from-blue-600 hover:to-purple-600 transition text-lg flex items-center gap-2 justify-center shadow-md"
      >
        <FaPlusCircle /> Add
      </button>
    </form>
  );
};

export default TaskForm; 