import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import '../components/UI/Account.css';
import CreatePetForm from '../components/CreatePetForm';

export default function Account() {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [pets, setPets] = useState([]);
  const [error, setError] = useState('');
  const [showPetForm, setShowPetForm] = useState(false);
  const token = localStorage.getItem('token');

  const fetchPets = () => {
    axios.get('/api/pets/user', {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => setPets(res.data))
    .catch(() => {});
  };

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

    fetchPets();
  }, [token]);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!user) return <p>Loading your account info...</p>;

  return (
    <>
      <Helmet>
        <title>My Account</title>
        <body className="dark-page" />
      </Helmet>
      <div className="max-w-4xl mx-auto p-4">
        <section className="appointments-section mb-8">
          <h3 className="section-title">YOUR APPOINTMENTS</h3>
          {appointments.length === 0 ? (
            <p>No appointments booked yet.</p>
          ) : (
            <div className="table-like">
              <div className="table-header">
                <div className="table-cell">Date</div>
                <div className="table-cell">Pet Name</div>
                <div className="table-cell">Doctor</div>
                <div className="table-cell">Service</div>
              </div>
              {appointments.map((appt) => (
                <div key={appt.id} className="table-row">
                  <div className="table-cell">{new Date(appt.date).toLocaleString()}</div>
                  <div className="table-cell">{appt.pet?.name || 'N/A'}</div>
                  <div className="table-cell">{appt.doctor?.login || 'N/A'}</div>
                  <div className="table-cell">{appt.service?.name || 'N/A'}</div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="pets-section">
          <h3 className="section-title">YOUR PETS</h3>
          {pets.length === 0 ? (
            <p>You have no pets registered.</p>
          ) : (
            <div className="table-like">
              <div className="table-header">
                <div className="table-cell">Name</div>
                <div className="table-cell">Species</div>
                <div className="table-cell">Breed</div>
              </div>
              {pets.map((pet) => (
                <div key={pet.id} className="table-row">
                  <div className="table-cell">{pet.name}</div>
                  <div className="table-cell">{pet.species}</div>
                  <div className="table-cell">{pet.breed || 'N/A'}</div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-4">
            <button
              onClick={() => setShowPetForm(!showPetForm)}
              className="add-pet-btn"
            >
              {showPetForm ? 'Cancel' : 'Add New Pet'}
            </button>
          </div>

          {showPetForm && (
            <div className="mt-4">
              <CreatePetForm
                onPetCreated={() => {
                  fetchPets();
                  setShowPetForm(false);
                }}
              />
            </div>
          )}
        </section>
      </div>
    </>
  );
}

