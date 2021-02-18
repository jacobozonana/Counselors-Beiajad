import React, { useEffect, useState, useContext } from "react";
import { Form, Button, Modal, Col, Row } from "react-bootstrap";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import "../../index.css";
import "react-modern-calendar-datepicker/lib/DatePicker.css";

function EditUser(props) {
  const { user1, isAuth } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [role, setRole] = useState(props.role);
  const [route, setRoute] = useState("");
  const [firstName, setFirstName] = useState(props.first_name);
  const [lastName, setLastName] = useState(props.last_name);
  const [age, setAge] = useState(props.age);
  const [comunity, setComunity] = useState(props.comunity);
  const [country, setCountry] = useState(props.country);
  const [tel, setTel] = useState(props.tel);
  const [specialty, setSpecialty] = useState(props.specialty);
  const [email, setEmail] = useState(props.email);
  const USERPATCH = `http://localhost:8000/api/v1/${route}/${user1.id}/${props.id}`;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    verify();
  }, []);

  const verify = () => {
    const rol = props.role;
    if (rol === "admin") {
      setRoute("editadmins");
    }
    if (rol === "doctor") {
      setRoute("editdoctors");
    }
    if (rol === "user") {
      setRoute("editiusers");
    }
  };

  const editUser = () => {
    Swal.fire({
      title: `La informacion sera editada`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Confirmar cambios",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .patch(
            USERPATCH,
            {
              role,
              first_name: firstName,
              last_name: lastName,
              age,
              comunity,
              country,
              tel,
              specialty,
              email,
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
              title: "Se edito con exito",
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
  };

  return (
    <>
      {isAuth ? (
        user1.role === "admin" ? (
          <div className="calendar1">
            <Button variant="info" onClick={handleShow}>
              <i className="far fa-edit"></i>
            </Button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Editar información</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>Tipo</Form.Label>
                        <Form.Control
                          as="select"
                          placeholder={props.role}
                          onChange={(e) => setRole(e.target.value)}
                          type="text"
                        >
                          <option>admin</option>
                          <option>doctor</option>
                          <option>user</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                          placeholder={props.first_name}
                          onChange={(e) => setFirstName(e.target.value)}
                          type="text"
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control
                          placeholder={props.last_name}
                          onChange={(e) => setLastName(e.target.value)}
                          type="text"
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Edad</Form.Label>
                        <Form.Control
                          placeholder={props.age}
                          onChange={(e) => setAge(e.target.value)}
                          type="number"
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Comunidad</Form.Label>
                        <Form.Control
                          placeholder={props.comunity}
                          onChange={(e) => setComunity(e.target.value)}
                          type="text"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>Pais</Form.Label>
                        <Form.Control
                          placeholder={props.country}
                          onChange={(e) => setCountry(e.target.value)}
                          type="text"
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Teléfono</Form.Label>
                        <Form.Control
                          placeholder={props.tel}
                          onChange={(e) => setTel(e.target.value)}
                          type="number"
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Especialidad</Form.Label>
                        <Form.Control
                          placeholder={props.specialty}
                          onChange={(e) => setSpecialty(e.target.value)}
                          type="text"
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          placeholder={props.email}
                          onChange={(e) => setEmail(e.target.value)}
                          type="text"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <h6>cambia los datos que quieras</h6>
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
        ) : undefined
      ) : undefined}
    </>
  );
}

export default EditUser;
