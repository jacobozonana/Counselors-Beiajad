import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { Container, Button, Form } from "react-bootstrap";
import Header from "../Layout/Header/Header";
import Footer from "../Layout/Footer/Footer"
import axios from "axios";
import Swal from 'sweetalert2'
import './Signup.css'

const SignupDoctor = () => {
   
  const { user1, isAuth } = useContext(AuthContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [country, setCountry] = useState(""); 
  const [tel, setTel] = useState("");
  const history = useHistory();

  const handleForm = async (event) =>{
  event.preventDefault();

  const jsonSend = {
    role: "doctor",
    first_name: firstName,
    last_name: lastName,
    email,
    password,
    specialty,
    country,
    tel
  };

  const SIGNUP_URL = `http://localhost:8000/api/v1/signupdoctor/${user1.id}`
    try {
      await axios.post(SIGNUP_URL, jsonSend,
        {
          headers: {
            Authorization: `Bearer: ${localStorage.getItem("app_token")}`,
          },
        }
        )
      setFirstName('')
      setLastName('')
      setEmail('')
      setPassword('')
      setSpecialty('')
      setCountry('')
      setTel('')
      Swal.fire({
        icon: 'success',
        title: 'Doctor creado con exito',
        text: 'Inicia sesión',
        timer: 3000,
        timerProgressBar: true,
      }).then(history.push("/"))
    }catch (error){
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'No se puede crear doctor',
        text: 'Algo salio mal',
        timer: 3000,
        timerProgressBar: true,
      })
    }
  };

  return (
    <>
    {isAuth ? (
    <>
    <Header />
      <Container className="themed-container" fluid={true}>
      <h1 className="mb-4 reg">Registra un doctor nuevo</h1>
      <Form className="container form-regis" onSubmit={handleForm}>
      <Form.Group>
       <Form.Label>Nombre</Form.Label>
       <Form.Control
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        type="text"
        id="firstName"
        name="inputFirstName"
        placeholder="Escribe tu nombre"
      />
      </Form.Group>
        <Form.Group>
          <Form.Label>Apellido</Form.Label>
          <Form.Control
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            name="lastName"
            id="inputLastname"
            placeholder="Escribe tu apellido"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Especialidad</Form.Label>
          <Form.Control
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            type="string"
            name="specialty"
            id="exampleage"
            placeholder="Escribe tu especialidad"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>País</Form.Label>
          <Form.Control
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            type="text"
            id="country"
            name="inputcountry"
            placeholder="País de residencia"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Tel</Form.Label>
          <Form.Control
            value={tel}
            onChange={(e) => setTel(e.target.value)}
            type="number"
            name="tel"
            id="inputTel"
            placeholder="Teléfono"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            id="exampleEmail"
            placeholder="Correo electronico"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="examplePassword"
            placeholder="Escribe tu contraseña"
          />
        </Form.Group>
        <Button color='info'>Enviar</Button>
      </Form>
      </Container>
      <Footer/>
    </>
    ) : (
      undefined
     )}
     </>
  );
};

export default SignupDoctor;

