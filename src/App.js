import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

function App() {
  return (
   <Router>
    <div>
    <Routes>
      <Route path='/' />
      <Route path='/login' element={<Login setToken={setToken} />}/>
      <Route path='/signup' element={<Signup/>}/>
    </Routes>
    </div>
   </Router>
  );
}

export default App;
