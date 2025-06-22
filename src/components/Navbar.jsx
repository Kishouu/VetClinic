import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './UI/Navbar.css';
import contactBg from '../assets/ContactUsHeader.png';  // adjust path if needed

export default function Navbar({ isLoggedIn, onLogout }) {
  const location = useLocation();
  const isContactPage = location.pathname === '/contact';

  const navbarStyle = isContactPage
    ? {
        backgroundImage: `url(${contactBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
      }
    : {};

  return (
    <nav className="navbar" style={navbarStyle}>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>

        {!isLoggedIn ? (
          <li><Link to="/signin">Sign In</Link></li>
        ) : (
          <>
            <li><Link to="/appointment">Book</Link></li>
            <li><Link to="/account">My Account</Link></li>
            <li><button onClick={onLogout}>Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
}

