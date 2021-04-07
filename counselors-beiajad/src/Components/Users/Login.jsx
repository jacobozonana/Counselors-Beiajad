import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { Button, Modal, Form, Nav } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../index.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser } = useContext(AuthContext);
  const LOGIN_URL = `http://localhost:8000/api/v1/login/`;
  const history = useHistory();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const jsonSend = {
      email,
      password,
    };

    try {
      const res = await axios.post(LOGIN_URL, jsonSend)
      loginUser(res.data.token);
      console.log(res.data)
      Swal.fire({
        icon: "success",
        title: "Bienvenido",
        timer: 1000,
        timerProgressBar: true,
        allowEscapeKey: true,
      }).then(history.push("/"));
    } catch (error) {
      let message = error.response.data.message
      Swal.fire({
        icon: "error",
        title: "Error en iniciar sesion",
        text: message,
        allowEscapeKey: true,
      });
    }
  };

  return (
    <>
      <Nav.Link variant="outline-info" onClick={handleShow}>
        <h4 className="alineacion">
          <i className="far fa-user"></i>
        </h4>
      </Nav.Link>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Correo Electronico</Form.Label>
              <Form.Control
                className="buscador"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                placeholder="Correo Electronico"
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                className="buscador"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                placeholder="Contraseña"
                required
              />
            </Form.Group>
            <Button variant="info" type="submit">
              Iniciar Sesión
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Login;
