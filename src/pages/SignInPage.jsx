import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

export default function SignInPage({ onLogin }) {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}>
      {showRegister ? (
        <>
          <RegisterForm onRegister={onLogin} />
          <p>
            Already have an account?{' '}
            <button onClick={() => setShowRegister(false)}>Login here</button>
          </p>
        </>
      ) : (
        <>
          <LoginForm onLogin={onLogin} />
          <p>
            Don't have an account?{' '}
            <button onClick={() => setShowRegister(true)}>Create account</button>
          </p>
        </>
      )}
    </div>
  );
}

