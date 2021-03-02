import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Form, Button, Modal, Col } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import "../../index.css";
import "react-modern-calendar-datepicker/lib/DatePicker.css";

function Apointment(props) {
  const { user1, isAuth } = useContext(AuthContext);
  const COMPOST = `http://localhost:8000/api/v1/comment/${user1.id}`;
  const [date] = useState(Date.now());
  const [subject, setSubject] = useState("Asunto");
  const [note, setNote] = useState("Escribe aqui tu comentario");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const saveComment = () => {
    Swal.fire({
      title: `Tu comentario sobre ${props.first_name} ${props.last_name}, sera registrado`,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar comentario",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(
            COMPOST,
            {
              date,
              subject,
              note,
              author: user1.id,
              about: props.id,
            },
            {
              headers: {
                Authorization: `Bearer: ${localStorage.getItem("app_token")}`,
              },
            }
          )
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Gracias por tus comentarios",
              confirmButtonText: `Ok`,
              timer: 3000,
              timerProgressBar: true,
            }).then(() => {
              window.location.reload();
            });
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Lo sentimos esta acción no se pudo completar",
            });
            console.log(error);
          });
      }
    });
  };

  return (
    <>
      {isAuth ? (
        user1.role === "admin" || user1.role === "user" || user1.role === "doctor" ? (
          <div className="calendar1">
            <Button className="btn btn-primary boton" onClick={handleShow}>
              <i className="far fa-clipboard"></i>
            </Button>
            <Modal show={show} size="lg" onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Comentar</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Col xs={6}>
                    <Form.Group>
                      <h5>
                        Comentario sobre {props.first_name} {props.last_name}
                      </h5>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <textarea
                        className="note1"
                        placeholder={subject}
                        onChange={(e) => {
                          setSubject(e.target.value);
                        }}
                      />
                    </Form.Group>
                    <Form.Group>
                      <textarea
                        className="note"
                        placeholder={note}
                        onChange={(e) => {
                          setNote(e.target.value);
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  type="submit"
                  onClick={() => {
                    saveComment();
                  }}
                  className="btn btn-info boton"
                >
                  Siguiente
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        ) : undefined
      ) : undefined}
    </>
  );
}

export default Apointment;
