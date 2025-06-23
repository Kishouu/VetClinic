import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';

import GetInTouch from "../components/GetInTouch";
import CatLinkToServices from "../assets/CatLinkToServices.png";
import "../components/UI/ContactUs.css";

const ContactUs = ({ isLoggedIn }) => {
  return (
    <>
      <Helmet>
        <title>Contact Us</title>
      </Helmet>

      <div className="contact-us">
        <div className="background">
          <GetInTouch isLoggedIn={isLoggedIn} />

          <div className="link">
            <div className="photo-wrapper">
              <div className="photo">
                <Link to="/services">
                  <img className="img" alt="Link to Services" src={CatLinkToServices} />
                </Link>

                <div className="button-2">
                  <div className="link-wrapper">
                    <a
                      className="vector-wrapper"
                      href="https://leaflife.framer.website/services"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <div className="vector">
                        <div className="SVG" />
                      </div>
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default ContactUs;

