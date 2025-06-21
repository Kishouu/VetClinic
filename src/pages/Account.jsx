import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Account() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      setError('You are not logged in.');
      return;
    }

    axios.get('/api/users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      setUser(res.data);
      setError('');
    })
    .catch(() => {
      setError('Failed to load user data. Please log in again.');
      localStorage.removeItem('token');
    });
  }, [token]);

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!user) {
    return <p>Loading your account info...</p>;
  }

  return (
    <div>
      <h2>Welcome, {user.login || user.username || 'User'}!</h2>
      <p>Email: {user.email}</p>
      {/* Add more user info or settings here */}
    </div>
  );
}

