import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const API_BASE = 'https://bootcamp2025.depster.me';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [task, setTask] = useState(null);
  const [message, setMessage] = useState('');

  const register = async () => {
    try {
      const res = await axios.post(`${API_BASE}/registration`, { email, password });
      setMessage('Registration successful!');
    } catch (err) {
      setMessage(`Registration failed: ${err.response?.data?.message || err.message}`);
    }
  };

  const login = async () => {
    try {
      const res = await axios.post(`${API_BASE}/login`, { email, password });
      setToken(res.data.data.token);
      setMessage('Login successful!');
    } catch (err) {
      setMessage(`Login failed: ${err.response?.data?.message || err.message}`);
    }
  };

  const fetchTask = async () => {
    try {
      const res = await axios.get(`${API_BASE}/task`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTask(res.data);
      setMessage('Task fetched successfully!');
    } catch (err) {
      setMessage(`Failed to fetch task: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <div className='main-part'>
      <h1>DEPT Bootcamp</h1>

      <div className='input-fields'>
        <div className="input-box">
          <i className='bx bxs-user'></i>
          <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)}/>
        </div>
        <div className="input-box">
          <i className='bx bxs-lock-alt'></i>
          <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
      </div>

      <div className='buttons'>
        <button onClick={register}>Register</button>
        <button onClick={login}>Login</button>
        <button onClick={fetchTask}>Fetch Task</button>
      </div>

      <p>{message}</p>

    </div>
  );
}

export default App;
