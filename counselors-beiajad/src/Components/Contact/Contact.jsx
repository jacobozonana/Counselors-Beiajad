import React, { useState } from "react";
import { Container, Button, Form, Col, Nav, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Header from "../Layout/Header/Header";
import Footer from "../Layout/Footer/Footer";
import Whatsapp from "../Whatsapp/Whatsapp";
import "../../index.css";
import ImgContact from "../../Imagenes/pexels-andrea-piacquadio-789822.jpeg"

const Contact = () => {
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const history = useHistory();

  const handleForm = async (event) => {
    event.preventDefault();
    const jsonSend = {
      name,
      email,
      note,
      tel,
    };

    const POST_CONTACT = `${process.env.REACT_APP_API}contact/`;

    try {
      await axios.post(POST_CONTACT, jsonSend).then(() => {
        setName("");
        setEmail("");
        setTel("");
        setNote("");
        Swal.fire({
          icon: "success",
          title: "Listo, se enviaron tus datos",
          text: "Te contactaremos en breve",
          timer: 3000,
          timerProgressBar: true,
          allowEscapeKey: true,
        }).then(history.push("/"));
      });
    } catch (error) {
      let message = error.datas;
      console.log(error)
      Swal.fire({
        icon: "error",
        title: "Algo salio mal",
        text: message,
        allowEscapeKey: true,
      });
    }
  };

  return (
    <>
      <Header />
      <Container className="themed-container" fluid={true}>
        <h1 className="mb-4 reg">Contactanos</h1>
        <Row>
        <Col>
        <Container>
          <Nav.Link href={`mailto:${process.env.REACT_APP_MAIL}`}>
            <img src={ImgContact} className="imgcontact" alt=""/>
            <h4 id="contact" className="alineacion mailcontact">
              <i className="far fa-envelope"></i> beiajadcounselors@gmail.com
            </h4>
          </Nav.Link>
        </Container>
        
        </Col>
           <Col>
         <Form className="container form-regis" onSubmit={handleForm}>
          <Form.Group>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="Name"
              name="inputName"
              placeholder="Cual es tu nombre?"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Telefono</Form.Label>
            <Form.Control
              onChange={(e) => setTel(e.target.value)}
              type="number"
              name="tel"
              id="inputTel"
              placeholder="Tu teléfono?"
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
              placeholder="Tu email?"
              required
            />
          </Form.Group>
          <Form.Group>
            <textarea
              className="comment2"
              placeholder={note}
              onChange={(e) => {
                setNote(e.target.value);
              }}
              placeholder="Quieres escribir algun mensaje?"
            />
          </Form.Group>
          <Button variant="info" type="submit">
            Enviar
          </Button>
        </Form>
        </Col>
        
        </Row>
       
       
        
      </Container>
      <Footer />
      <Whatsapp />
    </>
  );
};

export default Contact;
