import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TaskContext from '../context/TaskContext';


const Login = () => {
  const { setToken } = useContext(TaskContext);
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (username, password) => {
    setAuthLoading(true);
    setAuthError("");

    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    setAuthLoading(false);
    if (data.token) {
      setToken(data.token);
      localStorage.setItem("token", data.token);
      navigate("/");
    } else {
      setAuthError(data.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex overflow-hidden">
      
      <div className="hidden md:flex w-1/2 bg-white items-center justify-center">
        <img className="max-h-[90vh] w-3/4 object-contain" src="/assets/Screenshot 2025-07-22 232018.png" alt="Login illustration" />
      </div>

      
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              login(username, password);
            }}
          >
            <h2 className="text-2xl pb-4 font-bold">Login</h2>
            {authError && <p className="text-red-600 mb-2">{authError}</p>}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium"
            >
              {authLoading ? "Logging in..." : "Submit"}
            </button>
          </form>
          <div className="text-center text-sm text-gray-500 mt-4">
            Don't have an account?
            <Link to="/signup">
              <span className="mx-2 text-blue-700 hover:underline font-semibold cursor-pointer">
                Signup
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
