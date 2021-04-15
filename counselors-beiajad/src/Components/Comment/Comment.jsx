import React, { useState, useContext } from "react";
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
          allowEscapeKey: true,
          icon: "success",
          title: "Listo!",
          confirmButtonText: `Ok`,
          timer: 1000,
          timerProgressBar: true,
        }).then(() => {
          window.location.reload();
        });
      })
      .catch((error) => {
        let message = error.response.data.message;
        Swal.fire({
          allowEscapeKey: true,
          icon: "error",
          title: "Oops...",
          text: "Lo sentimos esta acción no se pudo completar " + message,
        });
        console.log(error);
      });
  };

  return (
    <>
      {isAuth ? (
        user1.role === "admin" ||
        user1.role === "user" ||
        user1.role === "doctor" ? (
          <div>
            <Button
              className="btn btn-primary rounded-circle boton"
              onClick={handleShow}
            >
              <i class="fas fa-feather-alt"></i>
            </Button>
            <Modal show={show} size="sm" onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>
                  {" "}
                  <h6>
                    {props.first_name} {props.last_name}
                  </h6>{" "}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Col>
                    <Form.Group>
                      <textarea
                        className="comment"
                        placeholder={subject}
                        onChange={(e) => {
                          setSubject(e.target.value);
                        }}
                      />
                    </Form.Group>
                    <Form.Group>
                      <textarea
                        className="comment1"
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
                  className="btn btn-primary boton rounded-pill"
                >
                  Comentar
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
