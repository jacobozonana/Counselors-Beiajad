import React, { useState, useContext} from 'react';
import axios from 'axios'
import Swal from 'sweetalert2'
import { useHistory } from "react-router-dom";

import {
  Button,  
  Form,  
  FormGroup,
  Label,  
  Input,
} from 'reactstrap';

import { AuthContext } from '../../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');  
  const { loginUser } = useContext(AuthContext)
  let history = useHistory();
  
  const handleSubmit = async (event)=>{
    event.preventDefault();
    const jsonSend ={
      email,
      password
    };
    const LOGIN_URL= `http://localhost:8000/api/v1/login/`

    try {
      const res = await axios.post(LOGIN_URL, jsonSend)
      loginUser(res.data.token)
      Swal.fire({
        icon: 'success',
        title: 'Bienvenido',
        timer: 3000,
        timerProgressBar: true,
      }).then(history.push("/"))
    } catch(error){
     Swal.fire({
      icon: 'error',
      title: 'Error en iniciar sesion',
    })
    }
  }
  return (
    <>
       <Form className="container" onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Correo Electronico</Label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            id="exampleEmail"
            placeholder="Email" />
        </FormGroup>
        <FormGroup>
          <Label>Contraseña</Label>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="examplePassword"
            placeholder="Contraseña" />
        </FormGroup>
        <Button color="info">Iniciar Sesion</Button>
      </Form>
    </>
  );
}
 
export default Login;
 