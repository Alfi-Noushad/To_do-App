import React from 'react'
import TaskContext from '../context/TaskContext';
import { useContext } from 'react';


const Home = () => {
   const { filteredTasks, deleteTask, updateTaskStatus, addTask } = useContext(TaskContext);

  return (
    <div>
     
    </div>
  )
}

export default Home
