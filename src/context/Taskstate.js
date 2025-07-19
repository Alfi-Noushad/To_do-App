import TaskContext from './TaskContext'
import React, { useState , useEffect } from 'react'

const Taskstate = ({children}) => {

  const host = "http://localhost:5000";


  const [tasks, setTasks] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");

  //fetch task-------------------  --------

  const fetchTasks = async () => {
    if (!token) return;
    const res = await fetch(`${host}/api/auth/tasks`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }

    });
    const data = await res.json();
    setTasks(Array.isArray(data) ? data : data.tasks || []);

  };

  useEffect(() => {
    if (token)
      fetchTasks();
  }, [token])

  // add task-----------------------

  const addTask = async (text) => {
    const res = await fetch(`${host}/api/auth/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
      body: JSON.stringify({ text, status: "pending", priority: "medium" })
    });
    const newTask = await res.json();
    setTasks([...tasks, newTask]);
  };


  //delete task----------------------------


  const deleteTask = async (id) => {
    await fetch(`${host}/api/auth/tasks/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    setTasks(tasks.filter(task => task._id !== id));
  };


  //update task-----------------------------------

  const updateTaskStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "pending" ? "completed" : "pending";
    const res = await fetch(`${host}/api/auth//tasks/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ status: newStatus })
    });
    const updatedTask = await res.json();
    setTasks(tasks.map(task => task._id === id ? updatedTask : task));
  };



  const updateTaskPriority = async (id, newPriority) => {
    const res = await fetch(`${host}/api/auth//tasks/${id}/priority`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ priority: newPriority })
    });
    const updatedTask = await res.json();
    setTasks(tasks.map(task => task._id === id ? updatedTask : task));
  };


  //set up the filter system to choose--------------

  const filteredTasks = tasks.filter(
    task =>
      (filterStatus === "all" || task.status === filterStatus) &&
      (filterPriority === "all" || task.priority === filterPriority)
  );


  //logot state

  const logout = () => {
  setToken("");
  localStorage.removeItem("token");
  setTasks([]);
};





  return (
    <TaskContextProvider value={{
      tasks, setTasks,
      token, setToken,
      filterStatus, setFilterStatus,
      filterPriority, setFilterPriority,
      filteredTasks,
      fetchTasks, addTask, deleteTask, updateTaskStatus, updateTaskPriority,
      logout
    }}>
      {children}
    </TaskContextProvider>)
}

export default Taskstate;
