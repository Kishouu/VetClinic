import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import SignInPage from './pages/SignInPage';
import Account from './pages/Account';
import Appointment from './pages/Appointment'; // ✅ Make sure this path is correct

export default function App() {
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const isLoggedIn = Boolean(token);

  const handleLogin = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
  };

  return (
    <Router>
      <nav style={{ padding: '1rem', background: '#eee' }}>
        <Link to="/" style={{ margin: '0 1rem' }}>Home</Link>

        {!isLoggedIn && (
          <Link to="/signin" style={{ margin: '0 1rem' }}>
            Sign In
          </Link>
        )}

        {isLoggedIn && (
          <>
            <Link to="/appointments" style={{ margin: '0 1rem' }}>Appointments</Link> {/* ✅ */}
            <Link to="/account" style={{ margin: '0 1rem' }}>My Account</Link>
            <button onClick={handleLogout} style={{ marginLeft: '1rem' }}>
              Logout
            </button>
          </>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/signin"
          element={isLoggedIn ? <Navigate to="/" replace /> : <SignInPage onLogin={handleLogin} />}
        />

        <Route
          path="/account"
          element={isLoggedIn ? <Account /> : <Navigate to="/signin" replace />}
        />

        <Route
          path="/appointments"
          element={isLoggedIn ? <Appointment /> : <Navigate to="/signin" replace />} // ✅
        />
      </Routes>
    </Router>
  );
}

