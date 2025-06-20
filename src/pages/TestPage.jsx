import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import AppointmentForm from '../components/AppointmentForm';

export default function TestPage() {
  const [token, setToken] = useState(null);

  return (
    <div>
      {!token ? (
        <LoginForm onLogin={setToken} />
      ) : (
        <AppointmentForm token={token} />
      )}
    </div>
  );
}

