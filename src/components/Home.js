import React from 'react'
import TaskContext from '../context/TaskContext';
import { useContext } from 'react';


const Home = () => {
   const {  filteredTasks,
    filterStatus,
    setFilterStatus,
    filterPriority,
    setFilterPriority,
    addTask,
    deleteTask,
    updateTaskStatus,
    updateTaskPriority,
    logout, } = useContext(TaskContext);

  return (
     <div className="min-h-screen bg-blue-50 flex flex-col">
      <main className="flex-1 p-8">
        <h1 className='text-4xl font-extrabold text-center mb-8'>TO DO APP</h1>
        <form onSubmit={(e) => {
            e.preventDefault();
            addTask(e.target.value);
            e.target.value="";
        }} className='mb-6 flex gap-2 justify-center' >
        
          <input type="text" placeholder='Add a Task' className='border-2 p-3 border-grey-100 rounded-2xl w-2/3 focus:outline-none focus:ring-grey-400'/>
          <button className='px-6 py-2 bg-blue-300 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors duration-200'>Add</button>
        </form>
        <div className='mb-6 flex gap-3 justify-center'>
          <select 
              onChange={(e) => setFilterStatus(e.target.value)}
              className='p-2 w-1/5 border-2 border-blue-100 rounded-lg  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300'
              value={filterStatus}
          >
            <option  value="all">All Status</option>
            <option value="pending">Pending</option>
             <option value="completed">Completed</option>
          </select>
           <select 
              onChange={(e) => setFilterPriority(e.target.value)}
              className='p-2 w-1/5 border-2 border-blue-100 rounded-lg  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300'
              value={filterPriority}
          >
            <option value="all">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <ul className='space-y-4'>

        </ul>
      </main>
    </div>
  )
}

export default Home
