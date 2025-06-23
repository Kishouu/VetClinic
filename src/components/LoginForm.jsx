import React, { useState } from 'react';
import axios from 'axios';
import './UI/LoginForm.css';

export default function LoginForm({ onLogin }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!login || !password) {
      setError('Please enter both login and password');
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post('http://localhost:3001/api/login', { login, password });

      if (res.data.token) {
        onLogin(res.data.token);
      } else {
        setError('Login failed: no token returned');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2 className="login-title">Login</h2>
      {error && <p className="login-error">{error}</p>}
      <input
        className="login-input"
        type="text"
        placeholder="Login"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
        required
        disabled={loading}
      />
      <input
        className="login-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        disabled={loading}
      />
      <button className="login-button" type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Log In'}
      </button>
    </form>
  );
}
