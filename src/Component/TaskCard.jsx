import React from 'react';

const TaskCard = ({ task, removeTask, editTask }) => {

  // removing task card
  const handleRemove = () => {
    removeTask(task.id);
  };
   // editing task card
  const handleEdit = () => {
    editTask(task);
  };

  return (
    <div className='pt-17'>
      <div className='w-80 h-60 border border-gray-300 rounded-lg p-6 shadow-md ml-10'>
        <h2>{task.title}</h2>
        <p>{task.description}</p>
        <p>priority:</p>
        <div className={`w-7 h-7 rounded-full ${task.priority==='red'?'bg-red-600':task.priority==='blue'? 'bg-blue-600':'bg-green-600'}`}></div>
        <p>Date:{task.date}</p>
        <p>Status :{task.status}</p>
        <button class="text-white bg-blue-700 hover:bg-blue-800 font-medium text-sm rounded-lg px-5 py-2.5 text-center mr-5"  onClick={handleRemove}>Remove</button>
        <button class="text-white bg-blue-700 hover:bg-blue-800 font-medium text-sm rounded-lg px-5 py-2.5 text-center mr-5"  onClick={handleEdit}>Edit</button>
      </div>
    </div>
  );
};

export default TaskCard;
