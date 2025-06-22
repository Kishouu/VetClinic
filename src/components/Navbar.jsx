import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './UI/Navbar.css';
import contactHeader from '../assets/ContactUsHeader.png';

export default function Navbar({ isLoggedIn, onLogout }) {
  const location = useLocation();
  const isContactPage = location.pathname === '/contact';
  const [menuOpen, setMenuOpen] = useState(false);

  // Special background style for Contact page
  const contactBgStyle = isContactPage
    ? {
        backgroundImage: `url(${contactHeader})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: 'white',
        minHeight: '220px',
        width: '100%',
        padding: '1rem 2rem',
        position: 'relative',
      }
    : {};

  // Toggle burger menu open/close
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  // Close menu on link/button click
  const closeMenu = () => setMenuOpen(false);

  // Handle keyboard events on burger menu for accessibility
  const handleBurgerKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleMenu();
    }
  };

  return (
    <nav className="navbar" style={contactBgStyle}>
      <div className="navbar-top">
        <div className="navbar-logo-position">
          <Link to="/" className="navbar-title" onClick={closeMenu}>
            DrPaw
          </Link>
        </div>

        <div
          className="burger-menu"
          onClick={toggleMenu}
          onKeyDown={handleBurgerKeyDown}
          aria-label="Toggle navigation menu"
          role="button"
          tabIndex={0}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
        >
          <div></div>
          <div></div>
          <div></div>
        </div>

        <ul id="primary-navigation" className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <li>
            <Link to="/contact" onClick={closeMenu}>
              Contact Us
            </Link>
          </li>

          {!isLoggedIn ? (
            <li>
              <Link to="/signin" onClick={closeMenu}>
                Sign In
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link to="/appointment" onClick={closeMenu}>
                  Book
                </Link>
              </li>
              <li>
                <Link to="/account" onClick={closeMenu}>
                  My Account
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    onLogout();
                    closeMenu();
                  }}
                  type="button"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Additional info for Contact page */}
      {isContactPage && (
        <div className="navbar-info-position">
          <div className="breadcrumb">
            <Link to="/" style={{ color: 'white' }}>
              Home
            </Link>{' '}
            / Contact Us
          </div>
          <div className="page-title">Contact Us</div>
        </div>
      )}
    </nav>
  );
}

