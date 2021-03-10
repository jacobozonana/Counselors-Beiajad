import React, { useState, useContext } from "react";
import { Form, Button, Modal, Col, Row } from "react-bootstrap";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import "../../index.css";
import "react-modern-calendar-datepicker/lib/DatePicker.css";

function EditUser(props) {
  const { user1, isAuth } = useContext(AuthContext);
  const [role, setRole] = useState(props.role);
  const [route] = useState(props.route);
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
              first_name,
              last_name,
              specialty,
              age,
              comunity,
              country,
              tel,
              email,
            },
            {
              headers: {
                Authorization: `Bearer: ${localStorage.getItem("app_token")}`,
              },
            }
          )
          .then((res) => {
            Swal.fire({
              icon: "success",
              title: "Se edito con exito",
              confirmButtonText: `Ok`,
              timer: 3000,
              timerProgressBar: true,
            }).then(() => {
              window.location.reload();
              console.log(res);
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
          route === "editadmins" ? (
            <>
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
                      <Col>
                        <Form.Group>
                          <Form.Label>Nombre</Form.Label>
                          <Form.Control
                            placeholder={props.first_name}
                            onChange={(e) => setFirst_name(e.target.value)}
                            type="text"
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Apellido</Form.Label>
                          <Form.Control
                            placeholder={props.last_name}
                            onChange={(e) => setLast_name(e.target.value)}
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
                        <Form.Group>
                          <Form.Label>Tipo</Form.Label>
                          <Form.Control
                            as="select"
                            placeholder={props.role}
                            onChange={(e) => setRole(e.target.value)}
                            type="text"
                          >
                            <option>{role}</option>
                            <option>doctor</option>
                            <option>user</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            placeholder={props.email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                          />
                        </Form.Group>
                      </Col>
                      <h6>cambia los datos que quieras</h6>
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
            </>
          ) : route === "editdoctors" ? (
            <>
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
                            <Form.Label>Tipo</Form.Label>
                            <Form.Control
                              as="select"
                              placeholder={props.role}
                              onChange={(e) => setRole(e.target.value)}
                              type="text"
                            >
                              <option>{role}</option>
                              <option>admin</option>
                              <option>user</option>
                            </Form.Control>
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
                        </Col>
                      </Row>
                      <h6>cambia los datos que quieras</h6>
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
            </>
          ) : route === "editusers" ? (
            <>
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
                              type="number"
                            />
                          </Form.Group>
                        </Col>
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
                            <Form.Label>Comunidad</Form.Label>
                            <Form.Control
                              placeholder={props.comunity}
                              onChange={(e) => setComunity(e.target.value)}
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
                            <Form.Label>Tipo</Form.Label>
                            <Form.Control
                              as="select"
                              placeholder={props.role}
                              onChange={(e) => setRole(e.target.value)}
                              type="text"
                            >
                              <option>{role}</option>
                              <option>admin</option>
                              <option>doctor</option>
                            </Form.Control>
                          </Form.Group>
                          <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                              placeholder={props.email}
                              onChange={(e) => setEmail(e.target.value)}
                              type="email"
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <h6>cambia los datos que quieras</h6>
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
            </>
          ) : undefined
        ) : undefined
      ) : undefined}
    </>
  );
}

export default EditUser;
