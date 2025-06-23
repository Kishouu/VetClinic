import React from 'react';
import { Link } from 'react-router-dom';
import '../components/UI/AboutUs.css';

import dogNailTrim from '../assets/dog-nail-trim.png';
import dogEarCheck from '../assets/dog-ear-check.png';
import values from '../assets/Values.png';
import arlene from '../assets/Arlene.png';
import devon from '../assets/Devon.png';
import bessie from '../assets/Bessie.png';
import ronald from '../assets/Ronald.png';
import ipsumlogo from '../assets/logoipsum.png';    
import gallery from '../assets/Gallery.png';       
import linkToServices from '../assets/CatLinkToServices.png';

export default function AboutUs() {
  return (
    <section className="about-wrapper">
      <div className="about-columns">
        <div className="about-col title">
          <h2>
            Here<br />for the life<br />of your pet
          </h2>
        </div>
        <div className="about-col">
          <p>
            At Dr.Paw Clinic, we are dedicated to providing compassionate, high-quality veterinary care for pets and peace of mind for their owners. With a focus on personalized service, our experienced veterinarians and friendly staff work together to ensure every visit is as comfortable as possible — for both pets and their people.
          </p>
        </div>
        <div className="about-col">
          <p>
            Whether it’s a wellness exam, emergency care, or long-term treatment, we offer a full range of medical services tailored to your pet’s unique needs. We treat every patient like family — because we know they’re more than just pets — they’re your loyal companions and cherished members of your home.
          </p>
        </div>
      </div>

      <div className="about-images-row spaced">
        <img src={dogNailTrim} alt="Dog nail trim" className="image-fixed image-left" />
        <img src={dogEarCheck} alt="Dog ear check" className="image-fixed image-right" />
      </div>
{/* New section with values image and button on the right */}
<div className="values-section">
  <div className="values-content">
    <img src={values} alt="Our Values" className="values-image" />
    <div className="values-text">
      <Link to="/appointment" className="book-button">
        Book your visit
      </Link>
    </div>
  </div>
</div>
      <div className="team-section">
        <h3 className="team-title">
          OUR <span className="team-word">TEAM</span><br />
          OF DEDICATION
        </h3>
        <div className="team-grid simple-grid">
          <img src={devon} alt="Devon Lane" />
          <img src={arlene} alt="Arlene McCoy" />
          <img src={bessie} alt="Bessie Cooper" />
          <img src={ronald} alt="Ronald Richards" />
        </div>

        {/* Logo below doctors with gap */}
        <div className="logo-container">
          <img src={ipsumlogo} alt="Clinic Logo" />
        </div>

        {/* Gallery below logo, centered */}
        <div className="gallery-container">
          <img src={gallery} alt="Gallery" />
        </div>

        {/* Link to Services below gallery with bigger gap */}
        <div className="link-to-services-container">
          <Link to="/services">
            <img src={linkToServices} alt="Go to Services" />
          </Link>
        </div>
      </div>
    </section>
  );
}

