import React from "react";
// import clipPathGroup from "../assets/clip-path-group.png"; // adjust path if needed
// import image23 from "../assets/image-23.png"; // adjust path
import "./UI/Header.css";

export const Header = () => {
  return (
    <div className="header">
      {/* Replace image23 src with a fallback or remove it */}
      {/* <img className="image" alt="Background" src={image23} /> */}
      <div className="image" style={{ height: '300px', backgroundColor: '#ccc' }}>
        {/* Background placeholder */}
      </div>

      <div className="container">
        <div className="navigation">
          <div className="text-wrapper">Dr.Paw</div>

          <div className="menu">
            <div className="container-wrapper">
              <div className="div-wrapper">
                <div className="div">ABOUT</div>
              </div>
            </div>

            <div className="container-wrapper">
              <div className="div-wrapper">
                <div className="div">SERVICES</div>
              </div>
            </div>

            <div className="container-wrapper">
              <div className="div-wrapper">
                <div className="div">NEWS</div>
              </div>
            </div>

            <div className="container-wrapper">
              <div className="div-wrapper">
                <div className="text-wrapper-2">CONTACT</div>
              </div>
            </div>
          </div>

          <div className="side-menu">
            <div className="iconsax-menu-wrapper">
              <div className="iconsax-menu">
                {/* <img className="clip-path-group" alt="Menu icon" src={clipPathGroup} /> */}
                <div style={{ width: 24, height: 24, backgroundColor: "#999" }} />
              </div>
            </div>
          </div>
        </div>

        <div className="title">
          <div className="button">
            <div className="container-wrapper-2">
              <div className="div-wrapper">
                <div className="div">Home</div>
              </div>
            </div>

            <div className="line" />

            <div className="container-wrapper-2">
              <div className="div-wrapper">
                <div className="div">Contact</div>
              </div>
            </div>
          </div>

          <div className="div-wrapper">
            <div className="text-wrapper-3">CONTACT US</div>
          </div>
        </div>
      </div>
    </div>
  );
};

