import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { Nav, Dropdown, DropdownButton, NavDropdown, Navbar, Button } from 'react-bootstrap';
import Logo from'../../../Counselor/Logo.jpg'
import Login from '../../Users/Login'
import '../../../index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
  
  const { isAuth, user1 } = useContext(AuthContext);
  
  return (
  <> 
    {isAuth ? (
      user1.role==="admin" ? (
            <Navbar sticky="top" bg="light" expand="lg">
              <Navbar.Brand href="/"><img src={Logo} className="d-inline-block align-top logo" alt="Counselors-Beiajad" /></Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">   
                  <DropdownButton variant="outline-danger" id="dropdown-basic-button" title="Back office">
                    <Dropdown.Item href="/"><h4 className="alineacion">Citas</h4></Dropdown.Item>
                    <Dropdown.Item href="/signupadmin"><h4 className="alineacion">Alta administrador</h4></Dropdown.Item>
                    <Dropdown.Item href="/signupdoctor"><h4 className="alineacion">Alta doctor</h4></Dropdown.Item>
                    <Dropdown.Item href="/adminslist"><h4 className="alineacion">Lista de administradores</h4></Dropdown.Item>
                    <Dropdown.Item href="/doctorslist"><h4 className="alineacion">Lista de doctores</h4></Dropdown.Item>
                    <Dropdown.Item href="/userslist"><h4 className="alineacion">Lista de Usuarios</h4></Dropdown.Item>
                    <Dropdown.Item href="/alllist"><h4 className="alineacion">Lista completa</h4></Dropdown.Item>                    
                  </DropdownButton>
                  </Nav>
              </Navbar.Collapse>
              <Nav.Link eventKey="disabled" disabled><h4 className="alineacion">Hola {user1.first_name} {user1.last_name}</h4></Nav.Link>                         
              <Nav.Link  href="/logout"><h4 className="alineacion"><i className="fas fa-sign-out-alt"></i></h4></Nav.Link>
            </Navbar>
      ) :
      user1.role==="doctor" ? (
            <Navbar sticky="top" bg="light" expand="lg">
              <Navbar.Brand href="/"><img src={Logo} className="d-inline-block align-top logo" alt="Counselors-Beiajad" /></Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="/"><h4 className="alineacion">Mis citas</h4></Nav.Link>
                  <Nav.Link href="/userslist"><h4 className="alineacion">Usuarios</h4></Nav.Link>
                  <Nav.Link href="/doctorslist"><h4 className="alineacion">Doctores</h4></Nav.Link>      
                </Nav>       
              </Navbar.Collapse>
              <Nav.Link  href="mailto:couselorsbeiajad@gmail.com"><h4 id="contact" className="alineacion"><i className="far fa-envelope"></i></h4></Nav.Link>                         
              <Nav.Link  href="https://api.whatsapp.com/send?phone=5491152470444"><h4 className="alineacion"><i className="fab fa-whatsapp"></i></h4></Nav.Link>                         
              <Nav.Link eventKey="disabled" disabled><h4 className="alineacion">Hola {user1.first_name} {user1.last_name}</h4></Nav.Link>                         
              <Nav.Link  href="/logout"><h4 className="alineacion"><i className="fas fa-sign-out-alt"></i></h4></Nav.Link>
            </Navbar>
      ) : 
      user1.role==="user" ? (
        <Navbar sticky="top" bg="light" expand="lg">
        <Navbar.Brand href="/"><img src={Logo} className="d-inline-block align-top logo" alt="Counselors-Beiajad" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/"><h4 className="alineacion">Mis citas</h4></Nav.Link>
            <Nav.Link href="/doctorslist"><h4 className="alineacion">Lista de doctores</h4></Nav.Link>
            <Nav.Link href="/faq"><h4 className="alineacion">Preguntas frecuentes</h4></Nav.Link>         
          </Nav>       
        </Navbar.Collapse>
        <Nav.Link  href="mailto:couselorsbeiajad@gmail.com"><h4 id="contact" className="alineacion"><i className="far fa-envelope"></i></h4></Nav.Link>                         
        <Nav.Link  href="https://api.whatsapp.com/send?phone=5491152470444"><h4 className="alineacion"><i className="fab fa-whatsapp"></i></h4></Nav.Link>                         
        <Nav.Link eventKey="disabled" disabled><h4 className="alineacion">Hola {user1.first_name} {user1.last_name}</h4></Nav.Link>                         
        <Nav.Link  href="/logout"><h4 className="alineacion"><i className="fas fa-sign-out-alt"></i></h4></Nav.Link>
      </Navbar>
      ) : (
        undefined
      )            
    ) : (
      
            <Navbar bg="light" expand="lg">
              <Navbar.Brand href="/"><img src={Logo} className="logo" alt="Counselors-Beiajad" /></Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link  href="/faq"><h4 className="alineacion">Preguntas frecuentes</h4></Nav.Link>
                  <Nav.Link  href="/register"><h4 className="alineacion">Registrate</h4></Nav.Link>                         
                </Nav>                
              </Navbar.Collapse>
              <Nav.Link  href="mailto:couselorsbeiajad@gmail.com"><h4 id="contact" className="alineacion"><i className="far fa-envelope"></i></h4></Nav.Link>                         
              <Nav.Link  href="https://api.whatsapp.com/send?phone=5491152470444"><h4 className="alineacion"><i className="fab fa-whatsapp"></i></h4></Nav.Link>              
              <Login />
            </Navbar>    
  )}
  </>
  );
}

export default Header;
