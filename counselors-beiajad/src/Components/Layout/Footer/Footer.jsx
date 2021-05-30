import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Logo from "../../../Counselor/Logo.jpg";
import "../../../index.css";

function Footer() {
  return (
    <div className="footer">
      <div className="center">
        <a href="/">
          <img
            src={Logo}
            className="d-inline-block align-top logo"
            alt="Counselors-Beiajad"
          />
        </a>
      </div>
      <div class="d-flex justify-content-center">
        <div class="p-2 bd-highlight">
          <a href="/">
            <i className="fab fa-facebook-f social"></i>
          </a>
        </div>
        <div class="p-2 bd-highlight">
          <a href="/">
            <i className="fab fa-twitter social"></i>
          </a>
        </div>
        <div class="p-2 bd-highlight">
          <a href="/">
            <i className="fab fa-google-plus-g social"></i>
          </a>
        </div>
        <div class="p-2 bd-highlight">
          {" "}
          <a href="/">
            <i className="fab fa-instagram social" />
          </a>
        </div>
        <div class="p-2 bd-highlight">
          <a href="/">
            <i className="fab fa-linkedin social" />
          </a>
        </div>
        <div class="p-2 bd-highlight">
          <a href="/">
            <i className="fab fa-youtube social" />
          </a>
        </div>
      </div>
      <div className="footer-copyright">
        <p>
          Copyright © 2020. All Rights Reserved.{" "}
          <a href="/" target="_blank">
            Counselors-Beiajad
          </a>
        </p>
      </div>
    </div>
  );
}

export default Footer;
