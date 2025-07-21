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
            <nav className="navbar navbar-expand-lg bg-body-tertiary bg-black">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">TO DO</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <ul className="navbar-nav ms-auto">
                        {!token ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link text-white" to="/signup">Signup</Link>
                                </li>
                                <li className="nav-item mx-1">
                                    <Link className="nav-link text-white" to="/login">Login</Link>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item mx-1">
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
