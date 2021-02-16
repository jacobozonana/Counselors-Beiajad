import React, { useEffect, useState, useContext } from "react";
import { Form, Button, Modal, Col, Row } from "react-bootstrap";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import "../../index.css";
import "react-modern-calendar-datepicker/lib/DatePicker.css";

function EditPassword() {
  const { user1, isAuth } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const PASSWORDPATCH = `http://localhost:8000/api/v1/editpas/${user1.id}`;
  const URL_GET_MAIL = `http://localhost:8000/api/v1/user/${user1.id}`;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios
      .get(URL_GET_MAIL, {
        headers: {
          Authorization: `Bearer: ${localStorage.getItem("app_token")}`,
        },
      })
      .then((data) => setEmail(data.data.email))
      .catch((err) => console.log(err));
  }, []);
  const editUser = () => {
    if (newpassword !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Verifica tu contraseña",
      });
    } else {
      Swal.fire({
        title: `Tu contraseña sera editada`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Confirmar cambio",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .patch(
              PASSWORDPATCH,
              {
                email,
                password,
                newpassword,
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
                title: "Tu contraseña cambió",
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
            });
        }
      });
    }
  };

  return (
    <>
      {isAuth ? (
        <div className="calendar1">
          <Button variant="info" onClick={handleShow}>
            {<i className="fas fa-key"></i>} Cambio de contraseña
          </Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Cambio de contraseña</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Control
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        name="password"
                        id="examplePassword"
                        placeholder="Escribe tu contraseña actual"
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Control
                        value={newpassword}
                        onChange={(e) => setNewpassword(e.target.value)}
                        type="password"
                        name="newpassword"
                        id="exampleNewassword"
                        placeholder="Escribe tu nueva contraseña"
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Control
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type="password"
                        name="confirmpassword"
                        id="exampleConfirmpassword"
                        placeholder="Verifica tu nueva contraseña"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cerrar
              </Button>
              <Button
                type="submit"
                onClick={() => {
                  editUser();
                }}
                className="btn btn-info boton"
              >
                Siguiente
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      ) : undefined}
    </>
  );
}

export default EditPassword;
