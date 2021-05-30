import React, { useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Header from "../Layout/Header/Header";
import Footer from "../Layout/Footer/Footer";
import Whatsapp from '../Whatsapp/Whatsapp'
import "../../index.css";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [age, setAge] = useState("");
  const [comunity, setComunity] = useState("");
  const [country, setCountry] = useState("");
  const [tel, setTel] = useState("");
  const history = useHistory();
  const [file, setFile] = useState();

  const handleForm = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Verifica tu contraseña",
        allowEscapeKey: true,
      });
    } else {
      const jsonSend = {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        age,
        comunity,
        country,
        tel,
      };

      const SIGNUP_URL = `${process.env.REACT_APP_API}signupuser/`;
      const FILPOST = `${process.env.REACT_APP_API}upprofile/`;

      try {
        await axios.post(SIGNUP_URL, jsonSend).then((data) => {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("user", data.data._id);
          axios
            .post(FILPOST, formData)
            .then((res) => {
              console.log(res);
            })
            .catch((error) => {
              console.log(error);
            });
        });
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setAge("");
        setComunity("");
        setCountry("");
        setTel("");
        setFile();
        Swal.fire({
          icon: "success",
          title: "Usuario creado con exito",
          text: "Inicia sesión",
          timer: 1000,
          timerProgressBar: true,
          allowEscapeKey: true,
        }).then(history.push("/"));
      } catch (error) {
        let message = error.response.data.message;
        Swal.fire({
          icon: "error",
          title: "Algo salio mal",
          text: message,
          allowEscapeKey: true,
        });
      }
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
            <Form.Label>Telefono</Form.Label>
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
            <Form.Label>Foto</Form.Label>
            <Form.File>
              <Form.File.Input
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
                required
              />
            </Form.File>
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
            <Form.Label>Confirma la contraseña</Form.Label>
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
          <Button variant="info" type="submit">
            Enviar
          </Button>
        </Form>
      </Container>
      <Footer />
      <Whatsapp />
    </>
  );
};

export default Register;
