import React, { useState } from 'react';
import axios from 'axios';

export default function AppointmentForm({ token }) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [petName, setPetName] = useState('');
  const [species, setSpecies] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!date || !time || !petName || !species) {
      setError('All fields are required');
      return;
    }

    const dateTime = new Date(`${date}T${time}`);

    try {
      const res = await axios.post(
        '/api/appointment',
        { date: dateTime.toISOString(), petName, species },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess('Appointment created successfully!');
      setDate('');
      setTime('');
      setPetName('');
      setSpecies('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create appointment');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Book an Appointment</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <label>
        Date:
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </label>

      <label>
        Time:
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
      </label>

      <label>
        Pet Name:
        <input
          type="text"
          value={petName}
          onChange={(e) => setPetName(e.target.value)}
          required
        />
      </label>

      <label>
        Species:
        <input
          type="text"
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
          required
        />
      </label>

      <button type="submit">Create Appointment</button>
    </form>
  );
}

