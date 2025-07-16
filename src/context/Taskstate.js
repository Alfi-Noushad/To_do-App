import TaskContext from './TaskContext'
import React from 'react'

const Taskstate = () => {
  const [tasks, setTasks] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");

  //fetch task-------------------  --------

  const fetchTask = async () => {
    
  };






    return (
        <NoteContext.Provider value={{}}>
            {props.children}
        </NoteContext.Provider>)
}

export default Taskstate
