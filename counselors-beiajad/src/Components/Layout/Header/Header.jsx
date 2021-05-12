import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { Nav, NavDropdown, Navbar } from "react-bootstrap";
import Logo from "../../../Counselor/Logo.jpg";
import Login from "../../Users/Login";
import "../../../index.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  const { isAuth, user1 } = useContext(AuthContext);

  return (
    <>
      {isAuth ? (
        user1.role === "admin" ? (
          <Navbar sticky="top" bg="light" expand="lg">
            <Navbar.Brand href="/">
              <img
                src={Logo}
                className="d-inline-block align-top logo"
                alt="Counselors-Beiajad"
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/">
                  <h4 className="alineacion">Citas</h4>
                </Nav.Link>
                <Nav.Link href="/blocklist">
                  <h4 className="alineacion">Horas libres</h4>
                </Nav.Link>
                <Nav.Link href="/files">
                  <h4 className="alineacion">Mis fotos</h4>
                </Nav.Link>
                <Nav.Link href="/adminslist">
                  <h4 className="alineacion">Administradores</h4>
                </Nav.Link>
                <Nav.Link href="/doctorslist">
                  <h4 className="alineacion">Doctores</h4>
                </Nav.Link>
                <Nav.Link href="/userslist">
                  <h4 className="alineacion">Usuarios</h4>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
            <Nav.Link eventKey="disabled" disabled>
              <h4 className="alineacion">
                Hola {user1.first_name} {user1.last_name}
              </h4>
            </Nav.Link>
            <NavDropdown
              title={<i className="far fa-user"></i>}
              id="basic-nav-dropdown"
              drop={"left"}
            >
              <NavDropdown.Item href="/profile">Mi cuenta</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/logout">Cerrar sesion</NavDropdown.Item>
            </NavDropdown>
          </Navbar>
        ) : user1.role === "doctor" ? (
          <Navbar sticky="top" bg="light" expand="lg">
            <Navbar.Brand href="/">
              <img
                src={Logo}
                className="d-inline-block align-top logo"
                alt="Counselors-Beiajad"
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/">
                  <h4 className="alineacion">Mis citas</h4>
                </Nav.Link>
                <Nav.Link href="/blocklist">
                  <h4 className="alineacion">Mis horas libres</h4>
                </Nav.Link>
                <Nav.Link href="/files">
                  <h4 className="alineacion">Mis fotos</h4>
                </Nav.Link>
                <Nav.Link href="/userslist">
                  <h4 className="alineacion">Usuarios</h4>
                </Nav.Link>
                <Nav.Link href="/doctorslist">
                  <h4 className="alineacion">Doctores</h4>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
            <Nav.Link href={`mailto:${process.env.REACT_APP_MAIL}`}>
              <h4 id="contact" className="alineacion">
                <i className="far fa-envelope"></i>
              </h4>
            </Nav.Link>
            <Nav.Link href={process.env.REACT_APP_WHATSAPP}>
              <h4 className="alineacion">
                <i className="fab fa-whatsapp"></i>
              </h4>
            </Nav.Link>
            <Nav.Link eventKey="disabled" disabled>
              <h4 className="alineacion">
                Hola {user1.first_name} {user1.last_name}
              </h4>
            </Nav.Link>
            <NavDropdown
              title={<i className="far fa-user"></i>}
              id="basic-nav-dropdown"
              drop={"left"}
            >
              <NavDropdown.Item href="/profile">Mi cuenta</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/logout">Cerrar sesion</NavDropdown.Item>
            </NavDropdown>
          </Navbar>
        ) : user1.role === "user" ? (
          <Navbar sticky="top" bg="light" expand="lg">
            <Navbar.Brand href="/">
              <img
                src={Logo}
                className="d-inline-block align-top logo"
                alt="Counselors-Beiajad"
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/">
                  <h4 className="alineacion">Mis citas</h4>
                </Nav.Link>
                <Nav.Link href="/files">
                  <h4 className="alineacion">Mis fotos</h4>
                </Nav.Link>
                <Nav.Link href="/doctorslist">
                  <h4 className="alineacion">Lista de doctores</h4>
                </Nav.Link>
                <Nav.Link href="/faq">
                  <h4 className="alineacion">Preguntas frecuentes</h4>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
            <Nav.Link href={`mailto:${process.env.REACT_APP_MAIL}`}>
              <h4 id="contact" className="alineacion">
                <i className="far fa-envelope"></i>
              </h4>
            </Nav.Link>
            <Nav.Link href={process.env.REACT_APP_WHATSAPP}>
              <h4 className="alineacion">
                <i className="fab fa-whatsapp"></i>
              </h4>
            </Nav.Link>
            <Nav.Link eventKey="disabled" disabled>
              <h4 className="alineacion">
                Hola {user1.first_name} {user1.last_name}
              </h4>
            </Nav.Link>
            <NavDropdown
              title={<i className="far fa-user"></i>}
              id="basic-nav-dropdown"
              drop={"left"}
            >
              <NavDropdown.Item href="/profile">Mi cuenta</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/logout">Cerrar sesion</NavDropdown.Item>
            </NavDropdown>
          </Navbar>
        ) : undefined
      ) : (
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">
            <img src={Logo} className="logo" alt="Counselors-Beiajad" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/faq">
                <h4 className="alineacion">Preguntas frecuentes</h4>
              </Nav.Link>
              <Nav.Link href="/register">
                <h4 className="alineacion">Registrate</h4>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Nav.Link href={`mailto:${process.env.REACT_APP_MAIL}`}>
            <h4 id="contact" className="alineacion">
              <i className="far fa-envelope"></i>
            </h4>
          </Nav.Link>
          <Nav.Link href={process.env.REACT_APP_WHATSAPP}>
            <h4 className="alineacion">
              <i className="fab fa-whatsapp"></i>
            </h4>
          </Nav.Link>
          <Login />
        </Navbar>
      )}
    </>
  );
};

export default Header;
