import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';

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
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Appointments Table */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">All Appointments</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Pet Name</th>
                <th className="px-4 py-2 border">Doctor Login</th>
                <th className="px-4 py-2 border">Service Name</th>
                <th className="px-4 py-2 border">Notes</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt) => (
                <tr key={appt.id} className="text-center">
                  <td className="px-4 py-2 border">
                    {editingApptId === appt.id ? (
                      <input
                        type="datetime-local"
                        name="date"
                        value={editFormData.date}
                        onChange={handleEditChange}
                        className="border p-1"
                      />
                    ) : (
                      new Date(appt.date).toLocaleString()
                    )}
                  </td>
                  <td className="px-4 py-2 border">{appt.pet?.name || 'N/A'}</td>
                  <td className="px-4 py-2 border">{appt.doctor?.login || 'N/A'}</td>
                  <td className="px-4 py-2 border">{appt.service?.name || 'N/A'}</td>
                  <td className="px-4 py-2 border">
                    {editingApptId === appt.id ? (
                      <input
                        type="text"
                        name="notes"
                        value={editFormData.notes}
                        onChange={handleEditChange}
                        className="border p-1 w-full"
                      />
                    ) : (
                      appt.notes || '—'
                    )}
                  </td>
                  <td className="px-4 py-2 border">
                    {editingApptId === appt.id ? (
                      <>
                        <button
                          className="text-green-600 hover:underline mr-2"
                          onClick={() => handleUpdateAppointment(appt.id)}
                        >
                          Save
                        </button>
                        <button
                          className="text-gray-600 hover:underline"
                          onClick={() => setEditingApptId(null)}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="text-blue-600 hover:underline mr-2"
                          onClick={() => startEditingAppointment(appt)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-600 hover:underline"
                          onClick={() => handleDeleteAppointment(appt.id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Pets Table */}
      <section>
        <h2 className="text-2xl font-semibold mb-3">All Pets</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Species</th>
                <th className="px-4 py-2 border">Breed</th>
                <th className="px-4 py-2 border">User Name</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pets.map((pet) => (
                <tr key={pet.id} className="text-center">
                  <td className="px-4 py-2 border">
                    {editingPetId === pet.id ? (
                      <input
                        type="text"
                        name="name"
                        value={editPetData.name}
                        onChange={handlePetEditChange}
                        className="border p-1 w-full"
                      />
                    ) : (
                      pet.name
                    )}
                  </td>
                  <td className="px-4 py-2 border">
                    {editingPetId === pet.id ? (
                      <input
                        type="text"
                        name="species"
                        value={editPetData.species}
                        onChange={handlePetEditChange}
                        className="border p-1 w-full"
                      />
                    ) : (
                      pet.species
                    )}
                  </td>
                  <td className="px-4 py-2 border">
                    {editingPetId === pet.id ? (
                      <input
                        type="text"
                        name="breed"
                        value={editPetData.breed}
                        onChange={handlePetEditChange}
                        className="border p-1 w-full"
                      />
                    ) : (
                      pet.breed || 'N/A'
                    )}
                  </td>
                  <td className="px-4 py-2 border">{pet.user?.login || 'N/A'}</td>
                  <td className="px-4 py-2 border">
                    {editingPetId === pet.id ? (
                      <>
                        <button
                          className="text-green-600 hover:underline mr-2"
                          onClick={() => handleUpdatePet(pet.id)}
                        >
                          Save
                        </button>
                        <button
                          className="text-gray-600 hover:underline"
                          onClick={() => setEditingPetId(null)}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="text-blue-600 hover:underline mr-2"
                          onClick={() => startEditingPet(pet)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-600 hover:underline"
                          onClick={() => handleDeletePet(pet.id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </>
);
}