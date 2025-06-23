import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import '../components/UI/Appointment.css';
import appointmentImg from '../assets/appointmentsimg.png';
import AppointmentForm from '../components/AppointmentForm';

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

        <div className="appointment-form-container">
          <AppointmentForm
            petName={petName}
            setPetName={setPetName}
            pets={pets}
            date={date}
            setDate={setDate}
            services={services}
            serviceId={serviceId}
            setServiceId={setServiceId}
            doctors={doctors}
            doctorId={doctorId}
            setDoctorId={setDoctorId}
            handleSubmit={handleSubmit}
            loadingDoctors={loadingDoctors}
            message={message}
            isError={isError}
          />
        </div>
      </div>
    </>
  );
};

export default Appointment;

