import React, { useState, useEffect } from 'react';

const Modal = ({ addTask, editedTask, onSubmitEdit }) => {
  const [newTask, setNewTask] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPriority, setNewPriority] = useState('');
  const [newDate, setNewDate]=useState('');
  const [status, setStatus]=useState("Started");

  useEffect(() => {
    if (editedTask) {
      setNewTask(editedTask.title);
      setNewDescription(editedTask.description);
      setNewPriority(editedTask.priority);
      setNewDate(editedTask.date);
      setStatus(editedTask.status);
    }
  }, [editedTask]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submitted");

    const task = {
      id: editedTask ? editedTask.id : Date.now(),
      title: newTask,
      description: newDescription,
      priority: newPriority,
      date:newDate,
      status:status,
    };

    if (editedTask) {
      onSubmitEdit(task);
    } else {
      addTask(task);
    }

    setNewTask('');
    setNewDescription('');
    setNewPriority('');
    setNewDate('')
    setStatus('');
  };

  return (
    <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center flex-col '>
      <form className='bg-white w-1/3 p-8 rounded-md h-fit' onSubmit={handleSubmit}>
        <div>
        <label className='text-2xl font-bold'>Task : </label>
          <input className='p-3 rounded-md w-8/12 shadow-md bg-slate-100 ml-24'
            type='text'
            value={newTask}
            onChange={(event) => setNewTask(event.target.value)}
            required
          /></div><br/>
       

        <div>
        <label className='text-2xl font-bold'>Description :</label>
          <input className='p-3 rounded-md ml-5 w-8/12 shadow-md bg-slate-100 '
            type='text'
            value={newDescription}
            onChange={(event) => setNewDescription(event.target.value)}
            required
          /></div><br/>
      
         <div>
        <label className='text-2xl font-bold'>Priority :</label>
          <select className='pt-2 shadow-md bg-slate-100 ml-16 p-3'
            value={newPriority}
            onChange={(event) => setNewPriority(event.target.value)}
            required
          >
            <option value='red'>Red</option>
            <option value='blue'>Blue</option>
            <option value='Green'>Green</option>
          </select></div><br/>
        <div>
          <label className='text-2xl font-bold'>Date :</label>
          <input type="date" className='p-3 rounded-md w-8/12 shadow-md bg-slate-100 ml-24' 
          value={newDate}
          onChange={(event)=> setNewDate(event.target.value)}
          required
          />
        </div>

        <div>
          <label className='text-2xl font-bold'>Task Status :</label>
          <select className='pt-2 shadow-md bg-slate-100 ml-5 mt-7 p-3'
          value={status} onChange={(event)=>setStatus(event.target.value)}
          >
            <option value="Started">Started</option>
            <option value="InProgress">InProgress</option>
            <option value="Done">Done</option>
          </select>
        </div>

       <div className='flex justify-end'>
        <button class="text-white bg-blue-700 hover:bg-blue-800 font-medium text-sm rounded-lg px-5 py-2.5 text-center flex flex-row justify-end mt-6" 
        type='submit'>{editedTask ? 'Update' : 'Submit'}</button>
        </div>
      </form>
    </div>
  );
};

export default Modal;