import React, { useState } from 'react';
import axios from 'axios';

export default function RegisterForm({ onLogin }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!login || !password || !confirmPassword) {
      setError('Please fill all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('/api/registration', { login, password });

      if (res.status === 201) {
        setSuccess('Registration successful! Logging you in...');
        if (res.data.token) {
          onLogin(res.data.token);
        }
      } else {
        setError('Registration failed');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Registration error');
    } finally {
      setLoading(false);
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
        disabled={loading}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}
        required
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        disabled={loading}
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Creating Account...' : 'Create Account'}
      </button>
    </form>
  );
}

