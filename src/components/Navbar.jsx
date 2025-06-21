import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar({ isLoggedIn, onLogout }) {
  return (
    <nav style={{ padding: '1rem', background: '#eee' }}>
      <NavLink to="/" style={({ isActive }) => ({ margin: '0 1rem', color: isActive ? 'blue' : 'black' })}>
        Home
      </NavLink>

      {!isLoggedIn && (
        <>
          <NavLink to="/register" style={({ isActive }) => ({ margin: '0 1rem', color: isActive ? 'blue' : 'black' })}>
            Register
          </NavLink>
          <NavLink to="/login" style={({ isActive }) => ({ margin: '0 1rem', color: isActive ? 'blue' : 'black' })}>
            Login
          </NavLink>
        </>
      )}

      {isLoggedIn && (
        <>
          <NavLink to="/account" style={({ isActive }) => ({ margin: '0 1rem', color: isActive ? 'blue' : 'black' })}>
            My Account
          </NavLink>
          <button onClick={onLogout} style={{ marginLeft: '1rem' }}>
            Logout
          </button>
        </>
      )}

      <NavLink to="/appointment" style={({ isActive }) => ({ margin: '0 1rem', color: isActive ? 'blue' : 'black' })}>
        Book
      </NavLink>
    </nav>
  );
}

