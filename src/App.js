// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import SignInPage from './pages/SignInPage';
import Account from './pages/Account';
import Appointment from './pages/Appointment';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import Navbar from './components/Navbar';
import { Footer } from './components/Footer';
import Services from './pages/Services';
import './style.css';

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
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactUs isLoggedIn={isLoggedIn} />} />
        <Route path="/about" element={<AboutUs />} />
        <Route
          path="/signin"
          element={isLoggedIn ? <Navigate to="/" replace /> : <SignInPage onLogin={handleLogin} />}
        />
        <Route
          path="/account"
          element={isLoggedIn ? <Account /> : <Navigate to="/signin" replace />}
        />
        <Route
          path="/appointment"
          element={isLoggedIn ? <Appointment /> : <Navigate to="/signin" replace />}
        />
		<Route path='/services' element={< Services /> } />
      </Routes>
	<Footer />
    </Router>
  );
}

