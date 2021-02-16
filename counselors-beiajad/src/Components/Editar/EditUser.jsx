import React, { useEffect, useState, useContext } from "react";
import { Form, Button, Modal, Col, Row } from "react-bootstrap";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import "../../index.css";
import "react-modern-calendar-datepicker/lib/DatePicker.css";

function EditSchedule(props) {
  const { user1, isAuth } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [age, setAge] = useState(props.age);
  const [comunity, setComunity] = useState(props.comunity);
  const [country, setCountry] = useState(props.country);
  const [tel, setTel] = useState(props.tel);
  const [specialty, setSpecialty] = useState(props.specialty);
  const [email, setEmail] = useState(props.email);
  const USERGET = `http://localhost:8000/api/v1/user/${user1.id}`;
  const USERPATCH = `http://localhost:8000/api/v1/${props.route}/${user1.id}/${props.id}`;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios
      .get(USERGET, {
        headers: {
          Authorization: `Bearer: ${localStorage.getItem("app_token")}`,
        },
      })
      .then((data) => setData(data.data))
      .catch((err) => console.log(err));
  }, []);

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
                        <Form.Label>Edad</Form.Label>
                        <Form.Control
                          value={age}
                          placeholder={props.age}
                          onChange={(e) => setAge(e.target.value)}
                          type="text"
                          id="age"
                          name="inputAge"
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Comunidad</Form.Label>
                        <Form.Control
                          value={comunity}
                          placeholder={props.comunity}
                          onChange={(e) => setComunity(e.target.value)}
                          type="text"
                          id="comunity"
                          name="inputComunity"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>Pais</Form.Label>
                        <Form.Control
                          value={country}
                          placeholder={props.country}
                          onChange={(e) => setCountry(e.target.value)}
                          type="text"
                          id="Country"
                          name="inputCountry"
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
                          value={email}
                          placeholder={props.email}
                          onChange={(e) => setEmail(e.target.value)}
                          type="text"
                          id="Email"
                          name="inputEmail"
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
                        <Form.Label>Pais</Form.Label>
                        <Form.Control
                          value={country}
                          placeholder={props.country}
                          onChange={(e) => setCountry(e.target.value)}
                          type="text"
                          id="Country"
                          name="inputCountry"
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
                        <Form.Label>Especialidad</Form.Label>
                        <Form.Control
                          value={specialty}
                          placeholder={props.specialty}
                          onChange={(e) => setSpecialty(e.target.value)}
                          type="text"
                          id="Specialty"
                          name="inputSpecyalty"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          value={email}
                          placeholder={props.email}
                          onChange={(e) => setEmail(e.target.value)}
                          type="text"
                          id="Email"
                          name="inputEmail"
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
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          value={email}
                          placeholder={props.email}
                          onChange={(e) => setEmail(e.target.value)}
                          type="text"
                          id="Email"
                          name="inputEmail"
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

export default EditSchedule;
