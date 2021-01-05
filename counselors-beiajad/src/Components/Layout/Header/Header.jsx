import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { Nav, NavDropdown, Navbar, Button } from 'react-bootstrap';
import Logo from'../../../Counselor/Logo.jpg'
import Contact from "../../Contact/Contact";
import Login from '../../Users/Login'
import './Header.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
  
  const { isAuth } = useContext(AuthContext);

  return (
  <> 
    {isAuth ? (

            <Navbar bg="light" expand="lg">
              <Navbar.Brand href="/"><img src={Logo} className="d-inline-block align-top logo" alt="Counselors-Beiajad" /></Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link className="alineacion" href="/">Inicio</Nav.Link>
                  <Nav.Link className="alineacion" href="/faq">Preguntas Frecuentes</Nav.Link>
                  <NavDropdown className="alineacion" title="Back Office" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/alllist">Lista de todos</NavDropdown.Item>
                    <NavDropdown.Item href="/adminslist">Lista de administradores</NavDropdown.Item>
                    <NavDropdown.Item href="/doctorslist">Lista de doctores</NavDropdown.Item>
                    <NavDropdown.Item href="/userslist">Lista de Usuarios</NavDropdown.Item>
                    <NavDropdown.Item href="/schedule">Citas</NavDropdown.Item>

                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/signupadmin">Alta administrador</NavDropdown.Item>
                    <NavDropdown.Item href="/signupdoctor">Alta doctor</NavDropdown.Item>        
                  </NavDropdown>
                </Nav>                
              </Navbar.Collapse>
              <Contact />
              <Button variant="info" href="/logout">Cerrar sesión</Button>
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
                </Nav>                
              </Navbar.Collapse>
              <Contact />
              <Login />
            </Navbar>
    
  )}
  </>
  );
}

export default Header;
