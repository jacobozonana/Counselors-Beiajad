import React, { useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2'
import Header from "../Layout/Header/Header";
import Footer from "../Layout/Footer/Footer"
import './Signup.css'


const Register = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [comunity, setComunity] = useState("");
  const [country, setCountry] = useState(""); 
  const [tel, setTel] = useState("");
  const history = useHistory();

  const handleForm = async (event) =>{
  event.preventDefault();

  const jsonSend = {
    first_name: firstName,
    last_name: lastName,
    email,
    password,
    age,
    comunity,
    country,
    tel
  };

  const SIGNUP_URL = `http://localhost:8000/api/v1/signupuser/`
    try {
      await axios.post(SIGNUP_URL, jsonSend)
      setFirstName('')
      setLastName('')
      setEmail('')
      setPassword('')
      setAge('')
      setComunity('')
      setCountry('')
      setTel('')
      Swal.fire({
        icon: 'success',
        title: 'Usuario creado con exito',
        text: 'Inicia sesión',
        timer: 3000,
        timerProgressBar: true,
      }).then(history.push("/"))
    }catch (error){
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'Algo salio mal',
      })
    }
  };

  return (
    <>
    <Header />
      <Container className="themed-container" fluid={true}>
      <h1 className="mb-4 reg">Registrate</h1>
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
          <Form.Label>Edad</Form.Label>
          <Form.Control
            value={age}
            onChange={(e) => setAge(e.target.value)}
            type="number"
            name="age"
            id="exampleage"
            placeholder="Escribe tu edad"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Comunidad</Form.Label>
          <Form.Control
            value={comunity}
            onChange={(e) => setComunity(e.target.value)}
            type="comunity"
            name="comunity"
            id="examplecomunity"
            placeholder="Comunidad que asistes"
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
        <Button variant='info'>Enviar</Button>
      </Form>
      </Container>
      <Footer/>
    </>
  );
};

export default Register;

