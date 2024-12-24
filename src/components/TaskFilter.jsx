import React from 'react';

const TaskFilter = ({ filter, setFilter }) => {
  return (
    <div className="flex justify-center gap-4 my-4">
      {['All', 'Pending', 'Completed'].map((status) => (
        <button
          key={status}
          onClick={() => setFilter(status)}
          className={`px-4 py-1 rounded outline-none ${
            filter === status
              ? 'bg-green-400 text-white'
              : 'bg-gray-200 hover:bg-gray-300 text-purple-600'
          }`}
        >
          {status}
        </button>
      ))}
    </div>
  );
};

export default TaskFilter;
