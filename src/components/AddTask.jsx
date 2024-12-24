import React, { useState } from 'react';
import { Plus } from 'lucide-react'
const AddTask = ({ addTask }) => {
  const [taskText, setTaskText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText.trim()) {
      addTask(taskText);
      setTaskText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center mb-4">
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Enter a task"
        className="flex-grow mr-2 rounded-md bg-white bg-opacity-50 border-none placeholder-gray-500 text-gray-800 p-3 outline-none"
      />
      <button
        type="submit"
        className="bg-white p-3 text-purple-600 hover:bg-purple-100 rounded-md"
      >
        <Plus size={24} />
      </button>
    </form>
  );
};

export default AddTask;
