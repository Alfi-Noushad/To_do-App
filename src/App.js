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


function App() {
  return (
   <Router>
    <div>
    <Navbar/>
    <Routes>
      <Route path='/'  element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
    </Routes>
    </div>
   </Router>
  );
}

export default App;
