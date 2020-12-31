import React, { useState, useContext} from 'react';
import { useHistory } from "react-router-dom";
import { Button, Form } from 'react-bootstrap';
import { AuthContext } from '../../contexts/AuthContext';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios'
import Swal from 'sweetalert2'
import Header from '../Layout/Header/Header'
import Seccion2 from '../../Components/Seccion2/Seccion2'
import Seccion3 from '../../Components/Seccion3/Seccion3'
import Footer from '../../Components/Layout/Footer/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '././../../Pages/Home/Home.css'

  const Login = () => {
    
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');  
  const { loginUser } = useContext(AuthContext)
  const LOGIN_URL= `http://localhost:8000/api/v1/login/`
  let history = useHistory();

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
      <Header />
      <div id="start">
        <div className="seccion1">                
          <h1 className="texto1">Inicia Sesion</h1>
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
                          placeholder="Email"
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
        </div>
      </div>
      <br/><br/>
      <Seccion2 />
      <br/><br/>
      <Seccion3 />
      <Footer/>  
    </>
  )
}
 
export default Login; 