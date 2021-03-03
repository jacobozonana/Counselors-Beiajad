import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Container, ListGroup, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import EditProfile from "../Edit/EditProfile";
import DeleteProfile from "../Delete/DeleteProfile";
import "../../index.css";

function Profile(props) {
  const { isAuth, user1 } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [route, setRoute] = useState("");
  const URL_GET_INFO = `http://localhost:8000/api/v1/${props.lista}/${user1.id}`;

  useEffect(() => {
    axios
      .get(URL_GET_INFO, {
        headers: {
          Authorization: `Bearer: ${localStorage.getItem("app_token")}`,
        },
      })
      .then((data) => setData(data.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    verify();
  }, [data]);

  const verify = () => {
    if (data.role === "user") {
      setRoute("editusers");
    }
    if (data.role === "doctor") {
      setRoute("editdoctors");
    }
    if (data.role === "admin") {
      setRoute("editadmins");
    }
  };

  return (
    <>
      {isAuth ? (
        user1.role === "user" ? (
          <>
            <h1 className="mb-4 reg">Mi cuenta</h1>
            <Container>
              <ListGroup>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <h6>Nombre:</h6>
                    </Col>
                    <Col>
                      <h6> {data.first_name}</h6>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <h6>Apellido:</h6>
                    </Col>
                    <Col>
                      <h6>{data.last_name}</h6>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <h6>Comunidad:</h6>
                    </Col>
                    <Col>
                      <h6>{data.comunity}</h6>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <h6>Edad:</h6>
                    </Col>
                    <Col>
                      <h6>{data.age}</h6>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <h6>Pais:</h6>
                    </Col>
                    <Col>
                      <h6>{data.country}</h6>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <h6>Telefono:</h6>
                    </Col>
                    <Col>
                      <h6>{data.tel}</h6>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <h6>Email:</h6>
                    </Col>
                    <Col>
                      <h6>{data.email}</h6>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Container>
            <div className="seccion1">
              <Container className="themed-container margin" fluid={true}>
                <EditProfile
                  route={route}
                  id={data._id}
                  first_name={data.first_name}
                  last_name={data.last_name}
                  comunity={data.comunity}
                  age={data.age}
                  country={data.country}
                  tel={data.tel}
                  email={data.email}
                />
                <DeleteProfile
                  route1={"schedulesbyuser"}
                  route={"deleteusers"}
                />
              </Container>
            </div>
          </>
        ) : user1.role === "doctor" ? (
          <>
            <h1 className="mb-4 reg">Mi cuenta</h1>
            <Container>
              <ListGroup>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <h6>Nombre:</h6>
                    </Col>
                    <Col>
                      <h6> {data.first_name}</h6>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <h6>Apellido:</h6>
                    </Col>
                    <Col>
                      <h6>{data.last_name}</h6>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <h6>Pais:</h6>
                    </Col>
                    <Col>
                      <h6>{data.country}</h6>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <h6>Telefono:</h6>
                    </Col>
                    <Col>
                      <h6>{data.tel}</h6>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <h6>Especialidad:</h6>
                    </Col>
                    <Col>
                      <h6>{data.specialty}</h6>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <h6>Email:</h6>
                    </Col>
                    <Col>
                      <h6>{data.email}</h6>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Container>
            <div className="seccion1">
              <Container className="themed-container margin" fluid={true}>
                <EditProfile
                  route={route}
                  id={data._id}
                  first_name={data.first_name}
                  last_name={data.last_name}
                  country={data.country}
                  specialty={data.specialty}
                  tel={data.tel}
                  email={data.email}
                />                
              </Container>
            </div>
          </>
        ) : user1.role === "admin" ? (
          <>
            <h1 className="mb-4 reg">Mi cuenta</h1>
            <Container>
              <ListGroup>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <h6>Nombre:</h6>
                    </Col>
                    <Col>
                      <h6> {data.first_name}</h6>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <h6>Apellido:</h6>
                    </Col>
                    <Col>
                      <h6>{data.last_name}</h6>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <h6>Telefono:</h6>
                    </Col>
                    <Col>
                      <h6>{data.tel}</h6>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>
                      <h6>Email:</h6>
                    </Col>
                    <Col>
                      <h6>{data.email}</h6>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Container>
            <div className="seccion1">
              <Container className="themed-container margin" fluid={true}>
                <EditProfile
                  route={route}
                  id={data._id}
                  first_name={data.first_name}
                  last_name={data.last_name}
                  tel={data.tel}
                  email={data.email}
                />
                <DeleteProfile
                  route1={"schedulesbyuser"}
                  route={"deleteadmins"}
                />
              </Container>
            </div>
          </>
        ) : undefined
      ) : undefined}
    </>
  );
}

export default Profile;
