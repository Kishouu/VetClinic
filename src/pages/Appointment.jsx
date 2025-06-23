import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Appointment = () => {
  const [petName, setPetName] = useState('');
  const [pets, setPets] = useState([]);
  const [date, setDate] = useState('');
  const [services, setServices] = useState([]);
  const [serviceId, setServiceId] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [loadingDoctors, setLoadingDoctors] = useState(false);

  // Fetch user's pets on component mount
  useEffect(() => {
    const fetchPets = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:3001/api/pets/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPets(res.data);
      } catch (err) {
        console.error('Error fetching pets:', err);
      }
    };

    fetchPets();
  }, []);

  // Fetch services on component mount
  useEffect(() => {
    const fetchServices = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:3001/api/services/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setServices(res.data);
      } catch (err) {
        console.error('Error fetching services:', err);
      }
    };

    fetchServices();
  }, []);

  // Fetch doctors when serviceId changes
  useEffect(() => {
    const fetchDoctors = async () => {
      if (!serviceId) return;

      console.log('Selected serviceId:', serviceId);
      setLoadingDoctors(true);
      const token = localStorage.getItem('token');

      try {
        const res = await axios.get(
          `http://localhost:3001/api/doctor/service/${serviceId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log('Doctors fetched:', res.data);

        const doctorList = Array.isArray(res.data)
          ? res.data
          : res.data && typeof res.data === 'object'
            ? [res.data]
            : [];

        setDoctors(doctorList);
        setDoctorId('');
      } catch (err) {
        console.error('Error fetching doctors:', err);
        setDoctors([]);
      } finally {
        setLoadingDoctors(false);
      }
    };

    fetchDoctors();
  }, [serviceId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);
    const token = localStorage.getItem('token');

    const utcDate = new Date(date).toISOString();

    const payload = {
      petName, // If needed, change to `petId: Number(petName)` if backend expects pet ID
      date: utcDate,
      doctorId: Number(doctorId),
      serviceId: Number(serviceId),
    };

    console.log('Submitting payload:', payload);

    try {
      const res = await axios.post('http://localhost:3001/api/appointment', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage(res.data.message || 'Appointment booked successfully!');
      setPetName('');
      setDate('');
      setServiceId('');
      setDoctorId('');
      setDoctors([]);
    } catch (err) {
      console.error('Appointment error:', err);
      console.log('Full Axios Error:', JSON.stringify(err, null, 2));
      setMessage(err.response?.data?.error || 'Appointment failed');
      setIsError(true);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Book Appointment</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        {/* Pet Dropdown */}
        <select
          value={petName}
          onChange={(e) => setPetName(e.target.value)}
          className="border p-2 rounded"
          required
        >
          <option value="">Select Pet</option>
          {pets.map((pet) => (
            <option key={pet.id} value={pet.name}>
              {pet.name}
            </option>
          ))}
        </select>

        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <select
          value={serviceId}
          onChange={(e) => setServiceId(e.target.value)}
          className="border p-2 rounded"
          required
        >
          <option value="">Select Service</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name}
            </option>
          ))}
        </select>

        <select
          value={doctorId}
          onChange={(e) => setDoctorId(e.target.value)}
          className="border p-2 rounded"
          required
          disabled={!serviceId || loadingDoctors}
        >
          <option value="">
            {loadingDoctors ? 'Loading doctors...' : 'Select Doctor'}
          </option>
          {doctors.map((doc) => (
            <option key={doc.id} value={doc.id}>
              {doc.login}
            </option>
          ))}
        </select>

        {!loadingDoctors && serviceId && doctors.length === 0 && (
          <p className="text-sm text-red-500">No doctors available for this service.</p>
        )}

        <button type="submit" className="bg-purple-600 text-white p-2 rounded">
          Book Appointment
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
