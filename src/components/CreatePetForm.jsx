import React, { useState } from 'react';
import axios from 'axios';

import '../components/UI/CreatePetForm.css';

const CreatePetForm = ({ onPetCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    breed: '',
  });
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    try {
      const res = await axios.post('http://localhost:3001/api/pets', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage(res.data.message || 'Pet created successfully!');
      setFormData({ name: '', species: '', breed: '' });
      setIsError(false);

      if (onPetCreated) {
        onPetCreated();
      }

    } catch (err) {
      console.error('Pet creation error:', err);
      setMessage(err.response?.data?.error || 'Pet creation failed');
      setIsError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>
      <div>
        <label>Species:</label>
        <input
          type="text"
          value={formData.species}
          onChange={(e) => setFormData({ ...formData, species: e.target.value })}
        />
      </div>
      <div>
        <label>Breed:</label>
        <input
          type="text"
          value={formData.breed}
          onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
        />
      </div>
      <button type="submit">Create Pet</button>

      {message && (
        <p style={{ color: isError ? 'red' : 'green' }}>{message}</p>
      )}
    </form>
  );
};

export default CreatePetForm;

