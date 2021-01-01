import React, { useState, useContext} from 'react';
import { useHistory } from "react-router-dom";
import { AuthContext } from '../../contexts/AuthContext';
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios'
import Swal from 'sweetalert2'
import 'bootstrap/dist/css/bootstrap.min.css';
import '././../../Pages/Home/Home.css'

  const Login = () => {
    
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');  
  const { loginUser } = useContext(AuthContext)
  const LOGIN_URL= `http://localhost:8000/api/v1/login/`
  const history = useHistory();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (event)=>{
    event.preventDefault();
    const jsonSend ={
      email,
      password
    };    

    try {
      const res = await axios.post(LOGIN_URL, jsonSend)
      loginUser(res.data.token)
      Swal.fire({
        icon: 'success',
        title: 'Bienvenido',
        timer: 3000,
        timerProgressBar: true,
      }).then(history.push("/"))
    }
    catch(error){
     Swal.fire({
      icon: 'error',
      title: 'Error en iniciar sesion',
      })
    }
  }

  return (
    <>
      <Button variant="info" onClick={handleShow}>Mi cuenta</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
        <Form className="container" onSubmit={handleSubmit}>
              <Container>
                <Row>
                  <Col>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>
                        Correo Electronico
                      </Form.Label>
                        <Form.Control 
                          className="buscador"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          type="email"
                          name="email"
                          placeholder="Correo Electronico"
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="formBasicPassword">
                        <Form.Label>
                          Contraseña
                        </Form.Label>
                        <Form.Control
                        className="buscador" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password" 
                        name="password"
                        placeholder="Contraseña"
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Button variant="info" type="submit">
                        Iniciar Sesión
                      </Button>
                    </Col>
                </Row>
              </Container>
            </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}
 
export default Login; 