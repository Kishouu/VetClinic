import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './UI/Navbar.css';
import contactHeader from '../assets/ContactUsHeader.png';
import aboutUsHeader from '../assets/AboutUsHeader.png';

export default function Navbar({ isLoggedIn, onLogout }) {
  const location = useLocation();
  const isContactPage = location.pathname === '/contact';
  const isAboutPage = location.pathname === '/about';
  const [menuOpen, setMenuOpen] = useState(false);

  const contactBgStyle = {
    backgroundImage: `url(${contactHeader})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    color: 'white',
    minHeight: '220px',
    width: '100%',
    padding: '1rem 2rem',
    position: 'relative',
  };

  const aboutBgStyle = {
    backgroundImage: `url(${aboutUsHeader})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    color: 'white',
    minHeight: '220px',
    width: '100%',
    padding: '1rem 2rem',
    position: 'relative',
  };

  const navbarBgStyle = isContactPage
    ? contactBgStyle
    : isAboutPage
    ? aboutBgStyle
    : {};

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  const handleBurgerKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleMenu();
    }
  };

  return (
    <nav className="navbar" style={navbarBgStyle}>
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
            <Link to="/about" onClick={closeMenu}>
              ABOUT 
            </Link>
          </li>
          <li>
            <Link to="/services" onClick={closeMenu}>
              SERVICES 
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={closeMenu}>
              CONTACT
            </Link>
          </li>
          {!isLoggedIn ? (
            <li>
              <Link to="/signin" onClick={closeMenu}>
                SIGN IN
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link to="/appointment" onClick={closeMenu}>
                  BOOK
                </Link>
              </li>
              <li>
                <Link to="/account" onClick={closeMenu}>
                  MY ACCOUNT
                </Link>
              </li>
            </>
          )}
        </ul>

        {isLoggedIn && (
          <div className="navbar-logout">
            <button
              onClick={() => {
                onLogout();
                closeMenu();
              }}
              type="button"
            >
              LOG OUT
            </button>
          </div>
          
        )}
      </div>

      {isContactPage && (
        <div className="navbar-info-position">
          <div className="breadcrumb">
            <Link to="/" style={{ color: 'white' }}>
              Home
            </Link>{' '}
            | Contact Us
          </div>
          <div className="page-title">CONTACT US</div>
        </div>
      )}

      {isAboutPage && (
        <div className="navbar-info-position">
          <div className="breadcrumb">
            <Link to="/" style={{ color: 'white' }}>
              Home
            </Link>{' '}
            | About Us
          </div>
          <div className="page-title">ABOUT US</div>
        </div>
      )}
    </nav>
  );
}
