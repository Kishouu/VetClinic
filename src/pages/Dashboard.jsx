import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import '../components/UI/Dashboard.css';

export default function Dashboard() {
  const [appointments, setAppointments] = useState([]);
  const [pets, setPets] = useState([]);
  const [error, setError] = useState('');
  const [editingApptId, setEditingApptId] = useState(null);
  const [editFormData, setEditFormData] = useState({ date: '', notes: '' });
  const [editingPetId, setEditingPetId] = useState(null);
  const [editPetData, setEditPetData] = useState({ name: '', species: '', breed: '' });

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      setError('You are not logged in.');
      return;
    }

    axios.get('http://localhost:3001/api/appointment', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => setAppointments(res.data))
      .catch(() => setError('Failed to fetch appointments.'));

    axios.get('http://localhost:3001/api/pets', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => setPets(res.data))
      .catch(() => setError('Failed to fetch pets.'));
  }, [token]);

  const handleDeleteAppointment = (id) => {
    axios.delete(`http://localhost:3001/api/appointment/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => setAppointments((prev) => prev.filter((a) => a.id !== id)))
      .catch(() => alert('Failed to delete appointment.'));
  };

  const handleDeletePet = (id) => {
    axios.delete(`http://localhost:3001/api/pets/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => setPets((prev) => prev.filter((p) => p.id !== id)))
      .catch(() => alert('Failed to delete pet.'));
  };

  const startEditingAppointment = (appt) => {
    setEditingApptId(appt.id);
    setEditFormData({
      date: appt.date.slice(0, 16),
      notes: appt.notes || '',
    });
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleUpdateAppointment = (id) => {
    axios.put(`http://localhost:3001/api/appointment/${id}`, editFormData, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        setEditingApptId(null);
        setEditFormData({ date: '', notes: '' });
        window.location.reload();
      })
      .catch(() => alert('Failed to update appointment.'));
  };

  const startEditingPet = (pet) => {
    setEditingPetId(pet.id);
    setEditPetData({
      name: pet.name || '',
      species: pet.species || '',
      breed: pet.breed || '',
    });
  };

  const handlePetEditChange = (e) => {
    setEditPetData({ ...editPetData, [e.target.name]: e.target.value });
  };

  const handleUpdatePet = (id) => {
    axios.put(`http://localhost:3001/api/pets/${id}`, editPetData, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        setEditingPetId(null);
        setEditPetData({ name: '', species: '', breed: '' });
        window.location.reload();
      })
      .catch(() => alert('Failed to update pet.'));
  };

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
        <body className="dark-page" />
      </Helmet>

      <div className="max-w-5xl">
        {error && <p>{error}</p>}

        {/* Appointments */}
        <h2 className="section-title1">APPOINTMENTS</h2>
        <div className="table-like1">
          <div className="table-header1">
            <div className="table-cell1">Date</div>
            <div className="table-cell1">Pet</div>
            <div className="table-cell1">Doctor</div>
            <div className="table-cell1">Service</div>
            <div className="table-cell1">Notes</div>
            <div className="table-cell actions-cell"></div>
          </div>
          {appointments.map((appt) => (
            <div className="table-row1" key={appt.id}>
              <div className="table-cell1">
                {editingApptId === appt.id ? (
                  <input
                    type="datetime-local"
                    name="date"
                    value={editFormData.date}
                    onChange={handleEditChange}
                  />
                ) : (
                  new Date(appt.date).toLocaleString()
                )}
              </div>
              <div className="table-cell1">{appt.pet?.name || 'N/A'}</div>
              <div className="table-cell1">{appt.doctor?.login || 'N/A'}</div>
              <div className="table-cell1">{appt.service?.name || 'N/A'}</div>
              <div className="table-cell1">
                {editingApptId === appt.id ? (
                  <input
                    type="text"
                    name="notes"
                    value={editFormData.notes}
                    onChange={handleEditChange}
                  />
                ) : (
                  appt.notes || '—'
                )}
              </div>
              <div className="table-cell actions-cell">
                {editingApptId === appt.id ? (
                  <>
                    <button className="change-btn" onClick={() => handleUpdateAppointment(appt.id)}>Save</button>
                    <button className="change-btn" onClick={() => setEditingApptId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button className="change-btn" onClick={() => startEditingAppointment(appt)}>Edit</button>
                    <button className="change-btn" onClick={() => handleDeleteAppointment(appt.id)}>Delete</button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pets */}
        <h2 className="section-title mt-5">PETS</h2>
        <div className="table-like1">
          <div className="table-header1">
            <div className="table-cell1">Name</div>
            <div className="table-cell1">Species</div>
            <div className="table-cell1">Breed</div>
            <div className="table-cell1">User</div>
            <div className="table-cell actions-cell"></div>
          </div>
          {pets.map((pet) => (
            <div className="table-row1" key={pet.id}>
              <div className="table-cell1">
                {editingPetId === pet.id ? (
                  <input
                    type="text"
                    name="name"
                    value={editPetData.name}
                    onChange={handlePetEditChange}
                  />
                ) : (
                  pet.name
                )}
              </div>
              <div className="table-cell1">
                {editingPetId === pet.id ? (
                  <input
                    type="text"
                    name="species"
                    value={editPetData.species}
                    onChange={handlePetEditChange}
                  />
                ) : (
                  pet.species
                )}
              </div>
              <div className="table-cell1">
                {editingPetId === pet.id ? (
                  <input
                    type="text"
                    name="breed"
                    value={editPetData.breed}
                    onChange={handlePetEditChange}
                  />
                ) : (
                  pet.breed || 'N/A'
                )}
              </div>
              <div className="table-cell1">{pet.user?.login || 'N/A'}</div>
              <div className="table-cell actions-cell">
                {editingPetId === pet.id ? (
                  <>
                    <button className="change-btn" onClick={() => handleUpdatePet(pet.id)}>Save</button>
                    <button className="change-btn" onClick={() => setEditingPetId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button className="change-btn" onClick={() => startEditingPet(pet)}>Edit</button>
                    <button className="change-btn" onClick={() => handleDeletePet(pet.id)}>Delete</button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

