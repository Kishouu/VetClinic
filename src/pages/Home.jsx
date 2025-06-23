import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import HowItWork from '../assets/HowItWork.png';
import WhiteValue from '../assets/WhiteValues.png';
import prophylaxis from '../assets/prophylaxis.png';
import ophtalmology from '../assets/ophtalmology.png';
import dermatology from '../assets/dermatology.png';
import trust from '../assets/trust.png';

import '../components/UI/Homepage.css';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Home</title>
        <body className="home-page" />
      </Helmet>

      {/* Values Section */}
      <section className="home-values-section">
        <div className="values-content">
          <div className="image-wrapper">
            <img src={WhiteValue} alt="White Value" className="values-image" />
            <Link to="/appointment" className="book-button-black">
              Book your visit
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-work-section">
        <div className="work-content">
          <div className="work-wrapper">
            <img src={HowItWork} alt="How It Work" className="how-it-work-image" />
          </div>
        </div>
      </section>

      {/* Services Banner */}
      <section className="services-banner-section">
        <div className="services-banner">
          <div className="banner-left">[ SERVICES ]</div>
          <Link to="/services" className="services-link">See More Services</Link>
        </div>
      </section>

      {/* Services Row */}
      <section className="services-row">
        <Link to="/services">
          <img src={prophylaxis} alt="Prophylaxis" className="service-image" />
        </Link>
        <Link to="/services">
          <img src={ophtalmology} alt="Ophtalmology" className="service-image" />
        </Link>
        <Link to="/services">
          <img src={dermatology} alt="Dermatology" className="service-image" />
        </Link>
      </section>

      {/* Trust Section */}
      <section className="trust-section">
        <div className="trust-wrapper">
          <img src={trust} alt="Trust" className="trust-image" />
          <Link to="/appointment" className="book-button-smaller">
            Book your visit
          </Link>
        </div>
      </section>
    </>
  );
}

