import React, { useState } from 'react';
import axios from 'axios';

export default function RegisterForm({ onLogin }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!login || !password) {
      setError('Please enter both login and password');
      return;
    }

    try {
      const res = await axios.post('/api/register', { login, password });

      if (res.status === 201) {
        setSuccess('Registration successful! Logging you in...');
        // Optionally auto-login after registration:
        if (res.data.token) {
          onLogin(res.data.token);
        }
      } else {
        setError('Registration failed');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Registration error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <input
        type="text"
        placeholder="Login"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Create Account</button>
    </form>
  );
}

