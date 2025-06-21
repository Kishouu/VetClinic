import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../style.css';

export default function Navbar({ isLoggedIn, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-logo">WetClinic</div>

      <div className="burger" onClick={toggleMenu}>
        ☰
      </div>

      <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
        <NavLink to="/" className="nav-link" onClick={closeMenu}>Home</NavLink>
        {!isLoggedIn && (
          <>
            <NavLink to="/register" className="nav-link" onClick={closeMenu}>Register</NavLink>
            <NavLink to="/login" className="nav-link" onClick={closeMenu}>Login</NavLink>
          </>
        )}
        {isLoggedIn && (
          <>
            <NavLink to="/account" className="nav-link" onClick={closeMenu}>My Account</NavLink>
            <button className="nav-button" onClick={() => { onLogout(); closeMenu(); }}>Logout</button>
          </>
        )}
        <NavLink to="/appointment" className="nav-link" onClick={closeMenu}>Book</NavLink>
      </div>
    </nav>
  );
}

