import React, { useState, useEffect } from 'react';
import TaskContext from './TaskContext';

const TaskState = ({ children }) => {
  const host = "http://localhost:5000";

  const [tasks, setTasks] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");

  // ------------------- Fetch Tasks -------------------
  const fetchTasks = async () => {
    if (!token) return;
    try {
      const res = await fetch(`${host}/api/text/tasks`, {
        method: 'GET',
        headers: {
           Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      setTasks(Array.isArray(data) ? data : data.tasks || []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    if (token) fetchTasks();
  }, [token]);

  // ------------------- Add Task -------------------
  const addTask = async (text) => {
    try {
      const res = await fetch(`${host}/api/text/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ text, status: "pending", priority: "medium" })
      });
      const newTask = await res.json();
      setTasks(prev => [...prev, newTask]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // ------------------- Delete Task -------------------
  const deleteTask = async (id) => {
    try {
      await fetch(`${host}/api/text/tasks/${id}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setTasks(prev => prev.filter(task => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // ------------------- Update Task Status -------------------
  const updateTaskStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "pending" ? "completed" : "pending";
    try {
      const res = await fetch(`${host}/api/text/tasks/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      const updatedTask = await res.json();
      setTasks(prev => prev.map(task => task._id === id ? updatedTask : task));
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  // ------------------- Update Task Priority -------------------
  const updateTaskPriority = async (id, newPriority) => {
    try {
      const res = await fetch(`${host}/api/text/tasks/${id}/priority`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ priority: newPriority })
      });
      const updatedTask = await res.json();
      setTasks(prev => prev.map(task => task._id === id ? updatedTask : task));
    } catch (error) {
      console.error("Error updating task priority:", error);
    }
  };

  // ------------------- Filtered Tasks -------------------
  const filteredTasks = tasks.filter(
    task =>
      (filterStatus === "all" || task.status === filterStatus) &&
      (filterPriority === "all" || task.priority === filterPriority)
  );

  // ------------------- Logout -------------------
  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    setTasks([]);
  };

  return (
    <TaskContext.Provider value={{
      tasks, setTasks,
      token, setToken,
      filterStatus, setFilterStatus,
      filterPriority, setFilterPriority,
      filteredTasks,
      fetchTasks, addTask, deleteTask, updateTaskStatus, updateTaskPriority,
      logout
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskState;
