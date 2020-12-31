import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { Nav, NavDropdown, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from'../../../Counselor/Logo.jpg'
import Contact from "../../Contact/Contact";
import './Header.css'

const Header = () => {
  
  const { isAuth } = useContext(AuthContext);

  return (
  <> 
    {isAuth ? (

            <Navbar bg="light" expand="lg">
              <Navbar.Brand href="/"><img
                    src={Logo}
                    className="d-inline-block align-top logo"
                    alt="Counselors-Beiajad"
                  /></Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link className="alineacion" href="/">Inicio</Nav.Link>
                  <Nav.Link className="alineacion" href="/faq">Preguntas Frecuentes</Nav.Link>
                  <NavDropdown className="alineacion" title="Back Office" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/users">Listas</NavDropdown.Item>
                    <NavDropdown.Item href="/schedule">Citas</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/sigunpadmin">Alta administrador</NavDropdown.Item>
                    <NavDropdown.Item href="/sigundoctor">Alta doctor</NavDropdown.Item>        
                  </NavDropdown>
                  <Nav.Link className="alineacion" href="/logout">Cerrar sesión</Nav.Link>
                  <Nav.Link className="alineacion" href="/"><Contact /></Nav.Link>
                </Nav>                
              </Navbar.Collapse>
            </Navbar>

    ) : (

            <Navbar bg="light" expand="lg">
              <Navbar.Brand href="/"><img
                    src={Logo}
                    className="d-inline-block align-top logo"
                    alt="Counselors-Beiajad"
                  /></Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link className="alineacion" href="/">Inicio</Nav.Link>                  
                  <Nav.Link className="alineacion" href="/faq">Preguntas Frecuentes</Nav.Link>                  
                  <Nav.Link className="alineacion" href="/login">Mi Cuenta</Nav.Link>
                  <Nav.Link className="alineacion" href="/"><Contact /></Nav.Link>
                </Nav>                
              </Navbar.Collapse>
      </Navbar>
    
  )}
  </>
  );
}

export default Header;
