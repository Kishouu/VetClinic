import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import '../components/UI/Appointment.css';
import appointmentImg from '../assets/appointmentsimg.png';

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

  useEffect(() => {
    const fetchDoctors = async () => {
      if (!serviceId) return;

      setLoadingDoctors(true);
      const token = localStorage.getItem('token');

      try {
        const res = await axios.get(
          `http://localhost:3001/api/doctor/service/${serviceId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

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
      petName,
      date: utcDate,
      doctorId: Number(doctorId),
      serviceId: Number(serviceId),
    };

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
      setMessage(err.response?.data?.error || 'Appointment failed');
      setIsError(true);
    }
  };
return (
  <>
    <Helmet>
      <title>Book An Appointment</title>
      <body className="dark-page" />
    </Helmet>

    <div className="appointment-container">
      <div className="appointment-image">
        <img src={appointmentImg} alt="Appointment illustration" />
      </div>

      <form onSubmit={handleSubmit} className="appointment-form">
        {message && (
          <p className={`mt-4 text-center text-sm ${isError ? 'error-msg' : 'success-msg'}`}>
            {message}
          </p>
        )}

        {/* Pet Dropdown */}
        <div className="appointment-input-wrapper">
          <select
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
            className="appointment-input"
            required
          >
            <option value="">Select Pet</option>
            {pets.map((pet) => (
              <option key={pet.id} value={pet.name}>
                {pet.name}
              </option>
            ))}
          </select>
          <i className="bi bi-chevron-down arrow-icon"></i>
        </div>

        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="appointment-input"
          required
        />

        {/* Service Dropdown */}
        <div className="appointment-input-wrapper">
          <select
            value={serviceId}
            onChange={(e) => setServiceId(e.target.value)}
            className="appointment-input"
            required
          >
            <option value="">Select Service</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>
          <i className="bi bi-chevron-down arrow-icon"></i>
        </div>

        {/* Doctor Dropdown */}
        <div className="appointment-input-wrapper">
          <select
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            className="appointment-input"
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
          <i className="bi bi-chevron-down arrow-icon"></i>
        </div>

        {!loadingDoctors && serviceId && doctors.length === 0 && (
          <p className="error-msg">No doctors available for this service.</p>
        )}

        <button type="submit" className="appointment-button">
          Book Appointment
        </button>
      </form>
    </div>
  </>
);
}
export default Appointment;

