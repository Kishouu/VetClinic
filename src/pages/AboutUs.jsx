import React from 'react';
import '../components/UI/AboutUs.css';

import dogNailTrim from '../assets/dog-nail-trim.png';
import dogEarCheck from '../assets/dog-ear-check.png';
import devonLane from '../assets/devon-lane.png';
import marvinMcKinney from '../assets/marvin-mckinney.png';

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

      <div className="about-images-row">
        <img src={dogNailTrim} alt="Dog nail trim" className="image-fixed image-left" />
        <img src={dogEarCheck} alt="Dog ear check" className="image-fixed image-right" />
      </div>

      <div className="team-section">
        <h3>OUR TEAM</h3>
        <div className="team-grid">
          <div className="team-card">
            <img src={devonLane} alt="Devon Lane" />
            <h4>Devon Lane</h4>
            <p>Vet</p>
          </div>
          <div className="team-card">
            <img src={marvinMcKinney} alt="Marvin McKinney" />
            <h4>Marvin McKinney</h4>
            <p>Vet</p>
          </div>
        </div>
      </div>
    </section>
  );
}
