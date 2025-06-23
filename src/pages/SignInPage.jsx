import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import '../components/UI/SignInPage.css';

export default function SignInPage({ onLogin }) {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="signin-background">
      <div className="signin-container">
        <div className="signin-card">
          {showRegister ? (
            <>
              <RegisterForm onRegister={onLogin} />
              <p className="signin-toggle-text">
                <button
                  id="toggle-login"
                  className="toggle-button"
                  onClick={() => setShowRegister(false)}
                >
                  Already have an account? Login.
                </button>
              </p>
            </>
          ) : (
            <>
              <LoginForm onLogin={onLogin} />
              <p className="signin-toggle-text">
                <button
                  id="toggle-register"
                  className="toggle-button"
                  onClick={() => setShowRegister(true)}
                >
                  Don't have an account? Create it!
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
