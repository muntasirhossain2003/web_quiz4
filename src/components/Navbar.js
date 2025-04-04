import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'; // Importing the Navbar styles

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/dashboard">Dashboard</Link>
    </nav>
  );
};

export default Navbar;
