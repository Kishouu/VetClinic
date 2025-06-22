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
        <NavLink to="/contact" className="nav-link" onClick={closeMenu}>Contact Us</NavLink>

        {!isLoggedIn ? (
          <NavLink to="/signin" className="nav-link" onClick={closeMenu}>Sign In</NavLink>
        ) : (
          <>
            <NavLink to="/appointment" className="nav-link" onClick={closeMenu}>Book</NavLink>
            <NavLink to="/account" className="nav-link" onClick={closeMenu}>My Account</NavLink>
            <button className="nav-button" onClick={() => { onLogout(); closeMenu(); }}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

