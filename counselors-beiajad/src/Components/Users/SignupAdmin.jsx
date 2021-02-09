import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Container, Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Header from "../Layout/Header/Header";
import Footer from "../Layout/Footer/Footer"
import axios from "axios";
import Swal from 'sweetalert2'
import '../../index.css'

const SignupAdmin = () => {
  
  const { user1, isAuth } = useContext(AuthContext);  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [age, setAge] = useState("");
  const [comunity, setComunity] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [country, setCountry] = useState(""); 
  const [tel, setTel] = useState("");
  const history = useHistory();

  const handleForm = async (event) =>{
  event.preventDefault();

  if (password !== confirmPassword) {
    Swal.fire({
      icon: 'error',
      title: 'Verifica tu contraseña',
    })
  } else {
    const jsonSend = {
      role: "admin",
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      age,
      comunity,
      specialty,
      country,
      tel
    };
  
    const SIGNUP_URL = `http://localhost:8000/api/v1/signupadmin/${user1.id}`
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
        setAge('')
        setComunity('')
        setSpecialty('')
        setCountry('')
        setTel('')
        Swal.fire({
          icon: 'success',
          title: 'Administrador creado con exito',
          text: 'Inicia sesión',
          timer: 3000,
          timerProgressBar: true,
        }).then(history.push("/"))
      }catch (error){
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: 'No se puede crear administrador',
          text: 'Algo salio mal',
          timer: 3000,
          timerProgressBar: true,
        })
      }
    };
  }  

  return (
    <>
    {isAuth ? (
      user1.role==="admin" ? (  
        <>
          <Header />
            <Container className="themed-container" fluid={true}>
            <h1 className="mb-4 reg">Registra un administrador nuevo</h1>
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
              required
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
                  required
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
                  required
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
                  required
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
                  required
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
                  required
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
                  required
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
                  required
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
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Verificar contraseña</Form.Label>
                <Form.Control
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  name="password"
                  id="examplePassword"
                  placeholder="Escribe tu contraseña"
                  required
                />
              </Form.Group>
              <Button variant='info' type="submit">Enviar</Button>
            </Form>
            </Container>
            <Footer/>
          </>
      ) : (
        undefined
      )
      ) : (
        undefined
       )}
      </>
  );
};

export default SignupAdmin;