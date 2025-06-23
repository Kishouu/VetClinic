import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';

export default function Account() {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [pets, setPets] = useState([]);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      setError('You are not logged in.');
      return;
    }

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

    axios.get('/api/appointment/user', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        setAppointments(res.data);
      })
      .catch(() => {});

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
    <>
    <Helmet>
      <title>My Account</title>
      <body className="light-page" />
    </Helmet>
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Welcome, {user.login || 'User'}!</h2>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-3">Your Appointments</h3>
        {appointments.length === 0 ? (
          <p>No appointments booked yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-auto w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border">Date</th>
                  <th className="px-4 py-2 border">Pet Name</th>
                  <th className="px-4 py-2 border">Doctor Login</th>
                  <th className="px-4 py-2 border">Service Name</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt) => (
                  <tr key={appt.id} className="text-center">
                    <td className="px-4 py-2 border">{new Date(appt.date).toLocaleString()}</td>
                    <td className="px-4 py-2 border">{appt.pet?.name || 'N/A'}</td>
                    <td className="px-4 py-2 border">{appt.doctor?.login || 'N/A'}</td>
                    <td className="px-4 py-2 border">{appt.service?.name || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-3">Your Pets</h3>
        {pets.length === 0 ? (
          <p>You have no pets registered.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-auto w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Species</th>
                  <th className="px-4 py-2 border">Breed</th>
                </tr>
              </thead>
              <tbody>
                {pets.map((pet) => (
                  <tr key={pet.id} className="text-center">
                    <td className="px-4 py-2 border">{pet.name}</td>
                    <td className="px-4 py-2 border">{pet.species}</td>
                    <td className="px-4 py-2 border">{pet.breed || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
    </>
  );
}
