import React from 'react'
import { Container, Row, Col } from 'reactstrap';
import './Footer.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import the library
import { FaInstagram } from "react-icons/fa";

// import your icons

import { faFacebook, faInstagram} from '@fortawesome/free-brands-svg-icons';


function Footer() {
    
    return (
        <>
         <Container className="themed-container" fluid={true}>

         <Row>
           <Col  md="12" lg={{ size: 6}}>
             <div className="footerIzq">
              <h6>© 2020 Counselors Beiajad. Todos los derechos reservados</h6>
             </div>
           </Col>

          <Col md="12" lg={{ size: 3, offset: 3}}>
            <div className="Redes">
              {/* <FontAwesomeIcon icon={faFacebook} size="md"/>
              <FontAwesomeIcon icon={faInstagram} /> */}
              <FaInstagram className="instagram"/>
            </div>
          </Col>
         </Row>
       </Container> 
        <div className="container">
        {/* Row */}
        <div className="row">
          <div className="col-md-12">
            {/* footer logo */}
            <div className="footer-logo">
              <a href="index.html"><img src="img/logo-alt.png" alt="logo" /></a>
            </div>
            {/* /footer logo */}
            {/* footer follow */}
            <ul className="footer-follow">
              <li><a href="#"><i className="fa fa-facebook" /></a></li>
              <li><a href="#"><i className="fa fa-twitter" /></a></li>
              <li><a href="#"><i className="fa fa-google-plus" /></a></li>
              <li><a href="#"><i className="fa fa-instagram" /></a></li>
              <li><a href="#"><i className="fa fa-linkedin" /></a></li>
              <li><a href="#"><i className="fa fa-youtube" /></a></li>
            </ul>
            {/* /footer follow */}
            {/* footer copyright */}
            <div className="footer-copyright">
              <p>Copyright © 2017. All Rights Reserved. Designed by <a href="https://colorlib.com" target="_blank">Colorlib</a></p>
            </div>
            {/* /footer copyright */}
          </div>
        </div>
        {/* /Row */}
      </div>
      {/* /Container */}
        </>
    )
}

export default Footer
