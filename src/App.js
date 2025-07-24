import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Taskstate from './context/Taskstate';
import TaskContext from './context/TaskContext';
import { useContext } from 'react';

function AppContent() {
  const { token } = useContext(TaskContext); 

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={token ? <Home /> : <Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Taskstate>
      <Router>
        <AppContent />
      </Router>
    </Taskstate>
  );
}

export default App;


/*completed*/ 