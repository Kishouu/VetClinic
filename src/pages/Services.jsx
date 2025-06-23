import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import prophylaxis2 from '../assets/prophylaxis2.png';
import ophtalmology2 from '../assets/ophtalmology2.png';
import dermatology2 from '../assets/dermatology2.png';
import cardiology from '../assets/cardiology.png';
import wantMore from '../assets/wantMore.png';

import '../components/UI/Services.css';

export default function Services() {
  return (
    <>
      <Helmet>
        <title>Services</title>
		<body className="light-page" />
      </Helmet>

      {/* Wrap all content to center page */}
      <div className="services-page-container">
        <section className="services-grid">

          {/* Prophylaxis */}
          <div className="service-card-with-text">
            <div className="service-card">
              <img src={prophylaxis2} alt="Prophylaxis" />
            </div>
            <div className="service-description">
              <p>At the VET-MED clinic we offer:</p>
              <ul>
                <li>antiparasitic prophylaxis – so-called deworming</li>
                <li>protection against external parasites</li>
                <li>protective vaccinations</li>
                <li>claw correction</li>
                <li>tick removal</li>
                <li>Dietary advice</li>
                <li>and other services that facilitate and support the daily care of pets.</li>
              </ul>
              <Link to="/appointment" className="book-button-custom">
                Book your visit
              </Link>
            </div>
          </div>

          {/* Ophtalmology */}
          <div className="service-card-with-text">
            <div className="service-card">
              <img src={ophtalmology2} alt="Ophtalmology" />
            </div>
            <div className="service-description">
              <p>In our clinic, we specialize in the diagnosis and treatment of eye diseases in dogs and cats, including:</p>
              <ul>
                <li>Cataracts and lens disorders</li>
                <li>Glaucoma and increased intraocular pressure</li>
                <li>Corneal diseases and injuries</li>
                <li>Retinal disorders and degenerative eye conditions</li>
                <li>Eyelid abnormalities and tear duct issues</li>
                <li>Inflammatory and infectious eye diseases (e.g. conjunctivitis, uveitis)</li>
              </ul>
              <Link to="/appointment" className="book-button-custom">
                Book your visit
              </Link>
            </div>
          </div>

          {/* Dermatology */}
          <div className="service-card-with-text">
            <div className="service-card">
              <img src={dermatology2} alt="Dermatology" />
            </div>
            <div className="service-description">
              <p>In order to detect the causes of diseases of the skin and its appendages, we perform:</p>
              <ul>
                <li>A thorough examination and dermatological interview</li>
                <li>Diagnostic tests for external parasites</li>
                <li>Histopathological examination (taking skin samples for testing), skin biopsies</li>
                <li>Skin scraping examination - collection of epidermis for microscopic examination</li>
                <li>Allergy blood tests (inhalant, food allergens, food intolerance)</li>
              </ul>
              <Link to="/appointment" className="book-button-custom">
                Book your visit           
              </Link>
            </div>
          </div>

          {/* Cardiology */}
          <div className="service-card-with-text">
            <div className="service-card">
              <img src={cardiology} alt="Cardiology" />
            </div>
            <div className="service-description">
              <p>The cardiology consultations and treatments we offer include:</p>
              <ul>
                <li>echocardiographic examination – ECHO of the heart</li>
                <li>electrocardiographic examination – ECG</li>
                <li>blood pressure measurement</li>
                <li>Chest X-ray</li>
                <li>pharmacotherapy of cardiovascular diseases</li>
                <li>ionogram</li>
                <li>thoracic and pericardial punctures guided by ultrasound probe</li>
                <li>oxygen therapy</li>
              </ul>
              <Link to="/appointment" className="book-button-custom">
                Book your visit
              </Link>
            </div>
          </div>

          {/* Want More section */}
          <div className="want-more-section">
            <img src={wantMore} alt="Want More" className="want-more-image" />
            <Link to="/about" className="about-button">
              About Us
            </Link>
          </div>

        </section>
      </div>
    </>
  );
}

