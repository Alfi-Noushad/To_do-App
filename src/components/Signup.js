import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Signup = ({ setToken }) => {

  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (username, password) => {
    setAuthLoading(true);
    setAuthError("");

    const response = await fetch("http://localhost:5000/api/auth/register", {
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
      setAuthError(data.message || "Login failed")
    }

  };


  return (
    <div className='container p-4'>
      <form onSubmit={(e) => {
        e.preventDefault();
        login(username, password);
      }}>
        <div className="text-2xl pb-4">SIGN UP.. .</div>
        <div className="mb-4">
          <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
          <input type="text" className="form-control" id="exampleInputEmail1" value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <div id="emailHelp" className="form-text">We'll never share your username with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {authLoading ? "Signing up..." : "Submit"}
        </button>
      </form>
      <div className="text my-3">Have an account already?
        <Link to="/login"><span className='mx-3 text-blue-700 hover:underline font-semibold cursor-pointer'>Login</span></Link>
      </div>
    </div>
  )
}

export default Signup
