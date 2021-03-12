import React, { useState, useContext } from "react";
import { Form, Button, Modal, Col, Row } from "react-bootstrap";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import EditPassword from "./EditPasword";
import "../../index.css";
import "react-modern-calendar-datepicker/lib/DatePicker.css";

function EditSchedule(props) {
  const { user1, isAuth } = useContext(AuthContext);
  const [first_name, setFirst_name] = useState(props.first_name);
  const [last_name, setLast_name] = useState(props.last_name);
  const [age, setAge] = useState(props.age);
  const [comunity, setComunity] = useState(props.comunity);
  const [country, setCountry] = useState(props.country);
  const [tel, setTel] = useState(props.tel);
  const [specialty, setSpecialty] = useState(props.specialty);
  const [email, setEmail] = useState(undefined);
  const USERPATCH = `http://localhost:8000/api/v1/${props.route}/${user1.id}/${props.id}`;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const editUser = () => {
    Swal.fire({
      title: `Tu informacion sera editada`,
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
              first_name,
              last_name,
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
              timer: 1000,
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
        user1.role === "user" ? (
          <div className="calendar1">
            <Button variant="info" onClick={handleShow}>
              {<i className="far fa-edit"></i>} Edita tu informacion
            </Button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Edita tus datos</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                          placeholder={props.first_name}
                          onChange={(e) => setFirst_name(e.target.value)}
                          type="text"
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control
                          placeholder={props.last_name}
                          onChange={(e) => setLast_name(e.target.value)}
                          type="text"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>Edad</Form.Label>
                        <Form.Control
                          placeholder={props.age}
                          onChange={(e) => setAge(e.target.value)}
                          type="text"
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
                          value={tel}
                          placeholder={props.tel}
                          onChange={(e) => setTel(e.target.value)}
                          type="text"
                          id="Tel"
                          name="inputTel"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          placeholder={props.email}
                          onChange={(e) => setEmail(e.target.value)}
                          type="email"
                        />
                      </Form.Group>
                      <EditPassword id={props.id} />
                      <h6>modifica los datos que quieras</h6>
                    </Col>
                  </Row>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  type="submit"
                  onClick={() => {
                    editUser();
                  }}
                  className="btn btn-info boton"
                >
                  Editar
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        ) : user1.role === "doctor" ? (
          <div className="calendar1">
            <Button variant="info" onClick={handleShow}>
              {<i className="far fa-edit"></i>} Edita tu informacion
            </Button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Edita tus datos</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                          placeholder={props.first_name}
                          onChange={(e) => setFirst_name(e.target.value)}
                          type="text"
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control
                          placeholder={props.last_name}
                          onChange={(e) => setLast_name(e.target.value)}
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
                  </Row>
                  <Row>
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
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          placeholder={props.email}
                          onChange={(e) => setEmail(e.target.value)}
                          type="email"
                        />
                      </Form.Group>
                      <EditPassword id={props.id} />
                      <h6>modifica los datos que quieras</h6>
                    </Col>
                  </Row>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  type="submit"
                  onClick={() => {
                    editUser();
                  }}
                  className="btn btn-info boton"
                >
                  Editar
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        ) : user1.role === "admin" ? (
          <div className="calendar1">
            <Button variant="info" onClick={handleShow}>
              {<i className="far fa-edit"></i>} Edita tu informacion
            </Button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Edita tus datos</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                          placeholder={props.first_name}
                          onChange={(e) => setFirst_name(e.target.value)}
                          type="text"
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control
                          placeholder={props.last_name}
                          onChange={(e) => setLast_name(e.target.value)}
                          type="text"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
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
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          placeholder={props.email}
                          onChange={(e) => setEmail(e.target.value)}
                          type="email"
                        />
                      </Form.Group>
                      <EditPassword id={props.id} />                      
                      <h6>modifica los datos que quieras</h6>
                    </Col>
                  </Row>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  type="submit"
                  onClick={() => {
                    editUser();
                  }}
                  className="btn btn-info boton"
                >
                  Editar
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        ) : undefined
      ) : undefined}
    </>
  );
}

export default EditSchedule;
