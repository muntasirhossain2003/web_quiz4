import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate for routing in React Router v6
import { loginUser } from '../services/authService'; // Assuming authService handles API requests
import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await loginUser({ email, password });
    if (data.token) {
      localStorage.setItem('authToken', data.token);
      navigate('/dashboard'); // Navigate to the dashboard after successful login
    } else {
      alert('Login failed');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
