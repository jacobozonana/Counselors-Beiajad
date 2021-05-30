import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Logo from "../../../Counselor/Logo.jpg";
import "../../../index.css";

function Footer() {
  return (
    <div className="footer">
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
    </div>
  );
}

export default Footer;
