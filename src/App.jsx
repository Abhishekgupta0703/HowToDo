import React, { useState, useEffect } from 'react';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import TaskFilter from './components/TaskFilter';

const App = () => {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  const [filter, setFilter] = useState('All');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    setTasks([...tasks, { id: Date.now(), text, completed: false, advice: '' }]);
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const updateAdvice = (id, advice) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, advice } : task))
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'Pending') return !task.completed;
    if (filter === 'Completed') return task.completed;
    return true;
  });

  return (
    <div className="min-h-[100dvh] bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-start justify-center p-4 relative">
      <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-lg p-6 w-full max-w-md">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Todo List
        </h1>
        <AddTask addTask={addTask}/>
        <TaskFilter filter={filter} setFilter={setFilter} />
        <TaskList
          tasks={filteredTasks}
          toggleComplete={toggleComplete}
          deleteTask={deleteTask}
          updateAdvice={updateAdvice}
        />
      </div>
      <div className="absolute bottom-6 bg-[#00ADB5] w-12 h-12 rounded-full 
      object-cover overflow-clip right-6 border-4 border-[#EEEEEE]"><a href="https://Abhishekgupta0703.github.io/Portfolio" target='_blank' className=''><img src="/hero.png" className='w-full h-full object-contain' alt="" /></a></div>
    </div>
  );
};

export default App;
