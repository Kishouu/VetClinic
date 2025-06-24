import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './UI/Navbar.css';
import contactHeader from '../assets/ContactUsHeader.png';
import aboutUsHeader from '../assets/AboutUsHeader.png';
import serviceHeader from '../assets/ServicesHeader.png';
import appointmentHeader from '../assets/AppointmentHeader.png';
import accountHeader from '../assets/AccountHeader.png';
import homeHeader from '../assets/HomeHeader.png';
import dashboardHeader from '../assets/DashboardHeader.png';

export default function Navbar({ isLoggedIn, onLogout }) {
  const location = useLocation();
  const isContactPage = location.pathname === '/contact';
  const isAboutPage = location.pathname === '/about';
  const isLoginPage = location.pathname === '/signin';
  const isServicePage = location.pathname === '/services';
  const isAppointmentPage = location.pathname === '/appointment';
  const isAccountPage = location.pathname === '/account';
  const isDashboardPage = location.pathname === '/dashboard';
  const isHomePage = location.pathname === '/';
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

  const dashboardBgStyle = {
    backgroundImage: `url(${dashboardHeader})`,
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
  const loginBgStyle = {
    backgroundColor: '#2A2A2A', // semi-transparent background
    color: 'transparent',
    minHeight: '1px',
    width: '100%',
    padding: '1rem 2rem',
    position: 'relative',
  };

  const servicesBgStyle = {
    backgroundImage: `url(${serviceHeader})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    color: 'white',
    minHeight: '220px',
    width: '100%',
    padding: '1rem 2rem',
    position: 'relative',
  };

  const appointmentBgStyle = {
    backgroundImage: `url(${appointmentHeader})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    color: 'white',
    minHeight: '220px',
    width: '100%',
    padding: '1rem 2rem',
    position: 'relative',
  };
  
  const accountBgStyle = {
    backgroundImage: `url(${accountHeader})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    color: 'white',
    minHeight: '220px',
    width: '100%',
    padding: '1rem 2rem',
    position: 'relative',
  };

  const homeBgStyle = {
    backgroundImage: `url(${homeHeader})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    color: 'white',
    minHeight: '850px',
    width: '100%',
    padding: '1rem 2rem',
    position: 'relative',
  };



  const navbarBgStyle = isContactPage
  ? contactBgStyle
  : isAboutPage
  ? aboutBgStyle
  : isLoginPage
  ? loginBgStyle
  : isServicePage
  ? servicesBgStyle
  : isAppointmentPage
  ? appointmentBgStyle
  : isAccountPage
  ? accountBgStyle
  :isDashboardPage
  ? dashboardBgStyle
  : isHomePage
  ?homeBgStyle
  :{};


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
            Dr.Paw
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

      {isDashboardPage && (
        <div className="navbar-info-position">
          <div className="breadcrumb">
            Admin | Dashboard
          </div>
          <div className="page-title">DASHBOARD</div>
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
      {isServicePage && (
        <div className="navbar-info-position">
          <div className="breadcrumb">
            <Link to="/" style={{ color: 'white' }}>
              Home
            </Link>{' '}
            | Services
          </div>
          <div className="page-title">OUR SERVICES</div>
        </div>
      )}
      {isAccountPage && (
        <div className="navbar-info-position">
          <div className="breadcrumb">
            <Link to="/" style={{ color: 'white' }}>
              Home
            </Link>{' '}
            | Account
          </div>
          <div className="page-title">MY ACCOUNT</div>
        </div>
      )}
      {isAppointmentPage && (
        <div className="navbar-info-position">
          <div className="breadcrumb">
            <Link to="/" style={{ color: 'white' }}>
              Home
            </Link>{' '}
            |
            <Link to="/services" style={{ color: 'white' }}>
              Services
            </Link>{' '}
            | Book
          </div>
          <div className="page-title">BOOK APPOINTMENT</div>
        </div>
      )}
      {isHomePage && (
      <div className="home-navbar-info-position">
        <p className="meow-woof">
          MEOW. MEOW.
          <br />
          WOOF. WOOF.
        </p>

        <p className='home-nav-text'> We provide compassionate, high-quality veterinary care for dogs, cats, and <br/>
        other small animals. Whether it is a routine checkup, vaccination, surgery, or<br/>
         emergency care — our experienced team is here to support your pet’s well-<br/>
         being every step of the way.<br/><br/>
         Because to us, they’re not just pets — they’re family. </p>

        <div className="home-nav-buttons">
          <Link to="/appointment" className='home-head-book-but'>
                  Book your visit
          </Link>
          <Link to="/about" className='home-head-about-but'>
                  Learn more about our team
          </Link>
        </div>
      </div>

      )}
    </nav>
  );
}
