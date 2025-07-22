import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import TaskContext from '../context/TaskContext';
import { useContext } from 'react';

const Navbar = () => {
    const { token, logout } = useContext(TaskContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    return (
        <div>
            <nav className="bg-blue-500">
                <div className="max-w-8xl mx-auto px-4 py-3 flex justify-between">
                    <Link className="flex-shrink-0 text-white text-xl font-bold" to="/">TO DO</Link>
                    <button className="" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <ul className="flex space-x-4 ">
                        {!token ? (
                            <>
                                <li className="nav-item">
                                    <Link className="text-white hover:bg-blue-400 px-3 py-2 rounded-md text-m font-medium" to="/signup">Signup</Link>
                                </li>
                                <li className="nav-item mx-1">
                                    <Link className="text-white hover:bg-blue-400 px-3 py-2 rounded-md text-m font-medium" to="/login">Login</Link>
                                </li>
                            </>
                        ) : (
                            <li className="text-white hover:bg-blue-400 px-3 py-2 rounded-md text-m font-medium">
                                <button onClick={handleLogout} className="btn btn-danger">Logout</button>
                            </li>
                        )}
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
