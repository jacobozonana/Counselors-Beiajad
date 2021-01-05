import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import Logo from'../../../Counselor/Logo.jpg'
import './Footer.css'

function Footer() {
    
    return (
        <>
        <Container className="themed-container" fluid={true}>
          <div className="footer-logo">
            <a href="index.html"><img src={Logo} className="d-inline-block align-top logo" alt="Counselors-Beiajad" /></a>
          </div>
          
            <Row>
              <Col>
                <ul className="footer-follow">
                  <li><a href="/"><i className="fab fa-facebook-f"></i></a></li>
                  <li><a href="/"><i className="fab fa-twitter"></i></a></li>
                  <li><a href="/"><i className="fab fa-google-plus-g"></i></a></li>
                  <li><a href="/"><i className="fab fa-instagram" /></a></li>
                  <li><a href="/"><i className="fab fa-linkedin" /></a></li>
                  <li><a href="/"><i className="fab fa-youtube" /></a></li>
                </ul>
              </Col>
            </Row>        
          </Container> 
          <div className="footer-copyright">
            <p>Copyright © 2020. All Rights Reserved.<a href="/" target="_blank">Counselors-Beiajad</a></p>
          </div>
       </>
    )
}

export default Footer
