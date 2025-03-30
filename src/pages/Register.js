import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate from react-router-dom
import { registerUser } from '../services/authService';
import '../styles/Register.css'; 

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await registerUser({ email, password });
    if (data.message === 'Registration successful') {
      alert('Registration successful. Please check your email to verify your account');
      navigate('/login'); // Use navigate instead of history.push
    } else {
      alert('Registration failed');
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
