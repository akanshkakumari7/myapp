import React, { useState, useEffect } from 'react';
import '../Styles/todolist.css'
import Modal from './Modal';
import TaskCard from './TaskCard';

const TodoList = () => {

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editTaskData, setEditTaskData] = useState(null);
  const [tasks, setTasks] = useState(() => {
    // Retrieve tasks from local storage or initialize as an empty array
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });


  const handleAddTask = () => {
    setIsPopupOpen(true)
  }

  const addTask = (task) => {
    setTasks([...tasks, task]);
    setIsPopupOpen(false);

    // Save tasks to local storage
    localStorage.setItem('tasks', JSON.stringify([...tasks, task]));
  };

  const removeTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId)
    setTasks(updatedTasks);

     // Remove task from local storage
     localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }

  const editTask = (task) => {
    setEditTaskData(task);
    setIsPopupOpen(true);
  };

  const handleSubmitEdit = (editedTask) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === editedTask.id) {
        return editedTask
      }
      return task;
    })
    setTasks(updatedTasks);
    setEditTaskData(null);
    setIsPopupOpen(false);
  }

  const sortTasks = () => {
    const sortedTasks = [...tasks].sort((a, b) => {
      if (a.priority === 'red') return -1;
      if (a.priority === 'blue' && b.priority !== 'red') return -1;
      if (a.priority === 'green' && b.priority !== 'red' && b.priority !== 'blue')
        return -1;
      return 1;
    });

    setTasks(sortedTasks);
  };


  return (
    <>
        <div className="bg-blue-200 w-screen h-72 flex-col items-center justify-center">
        <h1 className='text-5xl font-bold text-center md:text-center pt-16'>Todo Lists</h1>
        <div className='w-full flex items-center justify-center'>
        <button class="text-white bg-blue-700 hover:bg-blue-800 font-medium text-sm rounded-lg px-5 py-4 text-center mr-5 mt-8" onClick={handleAddTask}>Create Task</button>
        <button class="text-white bg-blue-700 hover:bg-blue-800 font-medium text-sm rounded-lg px-5 py-4 text-center mr-5 mt-8" onClick={sortTasks}>Sort</button>
        {isPopupOpen && <Modal addTask={addTask} editedTask={editTaskData} onSubmitEdit={handleSubmitEdit} />}
        </div>
        </div>
        <div className="flex flex-wrap justify-center mt-20">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task}
              removeTask={removeTask}
              editTask={editTask} />
          ))}
        </div>
    </>
  )
}

export default TodoList