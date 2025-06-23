import React from "react";
import { useNavigate } from "react-router-dom";
import "./UI/GetInTouch.css";
const GetInTouch = ({ isLoggedIn }) => { const navigate = useNavigate(); const handleClick = () => { if (isLoggedIn) { navigate("/appointment"); } else { navigate("/signin"); } }; return ( <div className="get-in-touch"> <div className="contact-map-info"> <div className="map-container"> <iframe title="Clinic Location" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.898935216623!2d-73.98189168459306!3d40.76873117932652!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c258f45f917b3f%3A0xf2c1d0b3d324d5d!2sCentral%20Park%20Zoo!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus" width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /> </div>
        <div className="contact-info">
		    <h2 className="text-wrapper">Get in Touch</h2>
		<p className="contact-description">
  We're here to help! Reach out to us using the contact information below or go to your account page,
  and we'll get back to you as soon as possible.
</p>
	
	<div>
            <strong>Phone:</strong> +1 234 567 890
          </div>
          <div>
            <strong>Email:</strong> info@randomclinic.com
          </div>
          <div>
            <strong>Address:</strong> 64 Central Park Zoo, New York, NY
          </div>

          <button
            className="action-button dark-button"
            onClick={handleClick}
          >
            {isLoggedIn ? "Book now" : "Create an account"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;

