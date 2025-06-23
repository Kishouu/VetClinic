import React from "react";
import { Link } from "react-router-dom";
import "./UI/Footer.css";

export const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="footer-desktop">
          <div className="div">
            <div className="contents">
              <div className="company-logo-text">
                <div className="company-logo-text-2">
                  <div className="company-logo">
                    <div className="text-wrapper">Dr.Paw</div>
                  </div>

                  <div className="text">
                    <div className="container-wrapper">
                      <div className="div-wrapper">
                        <p className="because-to-us-they">
                          Because to us, they’re not just pets - <br />
                          they’re family.
                        </p>
                      </div>
                    </div>

                    <div className="vertical-border" />
                  </div>
                </div>
              </div>

              <div className="menu">
                <div className="div-2">
                  <div className="container-2">
                    <div className="div-wrapper">
                      <div className="text-wrapper-2">LINKS</div>
                    </div>
                  </div>

                  <div className="div-3">
                    <div className="container-2">
                      <div className="div-wrapper">
                        <Link className="text-wrapper-3" to="/">HOME</Link>
                      </div>
                    </div>

                    <div className="container-2">
                      <div className="div-wrapper">
                        <Link className="text-wrapper-3" to="/about">ABOUT US</Link>
                      </div>
                    </div>

                    <div className="container-2">
                      <div className="div-wrapper">
                        <Link className="text-wrapper-3" to="/services">SERVICES</Link>
                      </div>
                    </div>

                    <div className="container-2">
                      <div className="div-wrapper">
                        <Link className="text-wrapper-3" to="/news">NEWS</Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="line" />

                <div className="div-2">
                  <div className="container-2">
                    <div className="div-wrapper">
                      <div className="text-wrapper-2">SERVICES</div>
                    </div>
                  </div>

                  <div className="div-3">
                    <div className="container-2">
                      <div className="div-wrapper">
                        <div className="text-wrapper-3">PROPHYLAXIS</div>
                      </div>
                    </div>

                    <div className="container-2">
                      <div className="div-wrapper">
                        <div className="text-wrapper-3">OPHTHALMOLOGY</div>
                      </div>
                    </div>

                    <div className="container-2">
                      <div className="div-wrapper">
                        <div className="text-wrapper-3">DERMATOLOGY</div>
                      </div>
                    </div>

                    <div className="container-2">
                      <div className="div-wrapper">
                        <div className="text-wrapper-3">CARDIOLOGY</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="horizontal-border-wrapper">
              <div className="horizontal-border" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
