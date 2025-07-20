import React from 'react'
import TaskContext from '../context/TaskContext';
import { useContext } from 'react';


const Home = () => {
  const { filteredTasks,
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
           addTask(e.target[0].value);
            e.target[0].value = "";
        }} className='mb-6 flex gap-2 justify-center' >

          <input type="text" placeholder='Add a Task' className='border-2 p-3 border-grey-100 rounded-2xl w-2/3 focus:outline-none focus:ring-grey-400' />
          <button className='px-6 py-2 bg-blue-300 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors duration-200'>Add</button>
        </form>
        <div className='mb-6 flex gap-3 justify-center'>
          <select
            onChange={(e) => setFilterStatus(e.target.value)}
            className='p-2 w-1/5 border-2 border-blue-100 rounded-lg  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300'
            value={filterStatus}
          >
            <option value="all">All Status</option>
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
        <ul className="space-y-4">
          {filteredTasks.map((task) => (
            <li
              key={task._id}
              className="p-4 bg-white rounded-xl shadow flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:bg-blue-100 hover:shadow-lg transition duration-300"
            >
              <div className="flex-1">
                <span className="font-mono text-2xl text-blue-800 font-medium ">{task.text}</span>
                <span className="ml-2 text-sm text-gray-500">
                  ({task.status}, {task.priority})
                </span>
              </div>
              <div className="flex gap-2 items-center">
                <button
                  onClick={() => updateTaskStatus(task._id, task.status)}
                  className={`px-3 py-1 rounded-full font-semibold transition-colors duration-900 ${task.status === 'pending'
                      ? 'bg-yellow-400 text-yellow-900 hover:bg-yellow-500'
                      : 'bg-green-400 text-green-900 hover:bg-green-500'
                    }`}
                >
                  {task.status === 'pending' ? 'Mark Complete' : 'Mark Pending'}
                </button>
                <select
                  value={task.priority}
                  onChange={(e) => updateTaskPriority(task._id, e.target.value)} 
                 className="p-2 border-2 border-blue-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <button
                  onClick={() => deleteTask(task._id)}
                  className="flex items-center gap-1 px-3 py-1 bg-red-500 hover:bg-red-700 text-white font-semibold rounded-full transition-colors duration-200 ml-2"
                  title="Delete Task"
                >
                  <i className="fas fa-trash" /> Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}

export default Home
