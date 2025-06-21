import React, { useState } from 'react';
import axios from 'axios';

const Appointment = () => {
  const [petName, setPetName] = useState('');
  const [species, setSpecies] = useState('');
  const [type, setType] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        'http://localhost:3001/api/appointment',
        {
          petName,
          species,
          type,
          date,
          doctorId: 2,  // hardcoded doctor id
          serviceId: 4, // hardcoded service id
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(res.data.message || 'Appointment created successfully!');
      setIsError(false);

      // Clear the form on success
      setPetName('');
      setSpecies('');
      setType('');
      setDate('');
    } catch (err) {
      setMessage(err.response?.data?.error || 'Appointment creation failed');
      setIsError(true);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Book Appointment</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Pet Name"
          value={petName}
          onChange={(e) => setPetName(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Species (e.g. Dog, Cat)"
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Breed/Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-purple-600 text-white p-2 rounded">
          Book
        </button>
      </form>
      {message && (
        <p className={`mt-4 text-center text-sm ${isError ? 'text-red-500' : 'text-green-600'}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default Appointment;

