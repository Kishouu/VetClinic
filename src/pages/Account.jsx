import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Account() {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [pets, setPets] = useState([]); // keep if you want pets too
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      setError('You are not logged in.');
      return;
    }

    // Fetch user data
    axios.get('/api/users/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      setUser(res.data);
      setError('');
    })
    .catch(() => {
      setError('Failed to load user data. Please log in again.');
      localStorage.removeItem('token');
    });

    // Fetch user appointments
    axios.get('/api/appointment/user', {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      setAppointments(res.data);
    })
    .catch(() => {
      // Optionally handle errors here
    });

    // Optional: fetch pets if your backend supports it
    axios.get('/api/pets/user', {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      setPets(res.data);
    })
    .catch(() => {});

  }, [token]);

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!user) {
    return <p>Loading your account info...</p>;
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Welcome, {user.login || 'User'}!</h2>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Your Appointments</h3>
        {appointments.length === 0 ? (
          <p>No appointments booked yet.</p>
        ) : (
          <ul className="list-disc list-inside">
            {appointments.map((appt) => (
              <li key={appt.id} className="mb-2">
                <strong>Pet:</strong> {appt.pet?.name} ({appt.pet?.species})<br />
                <strong>Doctor:</strong> {appt.doctor?.name || 'N/A'}<br />
                <strong>Service:</strong> {appt.service?.name || 'N/A'}<br />
                <strong>Date:</strong> {new Date(appt.date).toLocaleString()}<br />
                {appt.notes && <><strong>Notes:</strong> {appt.notes}</>}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-2">Your Pets</h3>
        {pets.length === 0 ? (
          <p>You have no pets registered.</p>
        ) : (
          <ul className="list-disc list-inside">
            {pets.map((pet) => (
              <li key={pet.id}>
                {pet.name} ({pet.species})
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

