import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Table, Button, Col, Row, Modal, Form } from "react-bootstrap";
import { jsPDF } from "jspdf";
import axios from "axios";
import BotComment from "../CommentsList.jsx/BotComment";
import DeleteUser from "../Delete/DeleteUser";
import EditUser from "../Edit/EditUser";
import "../../index.css";
import encode from "nodejs-base64-encode";
import Swal from "sweetalert2";
import img from "../../contexts/ImgContext";
import exportFromJSON from "export-from-json";
import "jspdf-autotable";

function AdminList(props) {
  const { isAuth, user1 } = useContext(AuthContext);
  const [data1, setData1] = useState([]);
  const [dataxls, setDataxls] = useState([]);
  const [order, setOrder] = useState("first_name");
  const [list, setList] = useState(props.lista);
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const URL_GET_ADMINS = `${process.env.REACT_APP_API}${props.lista}/${user1.id}`;
  const [attachment, setAttachment] = useState("");
  const [email, setEmail] = useState("Correo electronico");
  const URLSENDREPORT = `${process.env.REACT_APP_API}sendreport/`;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const excludeColumns = [
    "_id",
    "is_active",
    "createdAt",
    "password",
    "updatedAt",
  ]; // excluye datos del arreglo del filtro

  // handle change event of search input
  const handleChange = (value) => {
    setSearchText(value);
    filterData(value);
  };

  useEffect(() => {
    axios
      .get(URL_GET_ADMINS, {
        headers: {
          Authorization: `Bearer: ${localStorage.getItem("app_token")}`,
        },
      })
      .then(
        (data) => (setUsers(data.data), setData1(data.data), setSearchText(""))
      )
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    verify();
  }, [data1]);

  const verify = () => {
    if (list === "admins") {
      setList("admins");
    }
    if (list === "doctors") {
      setList("doctors");
    }
    if (list === "usuarios") {
      setList("usuarios");
    }
  };

  // filter records by search text
  const filterData = (value) => {
    const lowercasedValue = value.toLowerCase().trim();
    if (lowercasedValue === "") setData1(users);
    else {
      const filteredData = users.filter((item) => {
        return Object.keys(item).some((key) =>
          excludeColumns.includes(key)
            ? false
            : item[key].toString().toLowerCase().includes(lowercasedValue)
        );
      });
      setData1(filteredData);
    }
  };

  //-----------------------------------------------------------------------
  // ESTE CODIGO BUSCA EN EL ARREGLO UN SOLO DATO EN ESTE CASO EL APELLIDO.
  // useEffect(() => {
  //   setFilteredUsers(
  //     users.filter((user) =>
  //        user.last_name.toLowerCase().includes(lastName.toLowerCase())
  //    ));
  // }, [lastName, users]);
  //-----------------------------------------------------------------------

  const sortJSON = (json, key, orden) => {
    return json.sort(function (a, b) {
      var x = a[key],
        y = b[key];

      if (orden === "asc") {
        return x < y ? -1 : x > y ? 1 : 0;
      }

      if (orden === "desc") {
        return x > y ? -1 : x < y ? 1 : 0;
      }
    });
  };

  sortJSON(data1, order, "asc");

  /// DESDE AQUI EMPIEZA LOS REPORTES PDF
  useEffect(() => {
    let list1 = list;
    if (list1 === "admins") {
      const doc = new jsPDF();
      doc.autoTable({
        margin: { top: 50 },
      });
      doc.text("Administradores", 20, 30);
      doc.addImage(img, "JPEG", 160, 15, 20, 20);
      doc.autoTable({ html: "#table" });
      let att = doc.output("arraybuffer");
      let base64File = encode.encode(att, "base64");
      setAttachment(base64File);
    } else if (list1 === "doctors") {
      const doc = new jsPDF();
      doc.autoTable({
        margin: { top: 50 },
      });
      doc.text("Doctores", 20, 30);
      doc.addImage(img, "JPEG", 160, 15, 20, 20);
      doc.autoTable({ html: "#table" });
      let att = doc.output("arraybuffer");
      let base64File = encode.encode(att, "base64");
      setAttachment(base64File);
    } else if (list1 === "usuarios") {
      const doc = new jsPDF();
      doc.autoTable({
        margin: { top: 50 },
      });
      doc.text("Usuarios", 20, 30);
      doc.addImage(img, "JPEG", 160, 15, 20, 20);
      doc.autoTable({ html: "#table" });
      let att = doc.output("arraybuffer");
      let base64File = encode.encode(att, "base64");
      setAttachment(base64File);
    }
  }, [email]);

  const sendReport = () => {
    axios
      .post(
        URLSENDREPORT,
        {
          email,
          attachment,
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
          title: "Listo!",
          confirmButtonText: `Ok`,
          timer: 1000,
          timerProgressBar: true,
          allowEscapeKey: true,
        }).then(() => {
          window.location.reload();
        });
      })
      .catch((error) => {
        let message = error.response.data.message;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Lo sentimos esta acción no se pudo completar " + message,
          allowEscapeKey: true,
        });
        console.log(error);
      });
  };

  const downloadPdf = () => {
    let list1 = list;
    if (list1 === "admins") {
      const doc = new jsPDF();
      const text = "Administradores";
      doc.autoTable({
        margin: { top: 50 },
      });
      doc.text(text, 20, 30);
      doc.addImage(img, "JPEG", 160, 15, 20, 20);
      doc.autoTable({ html: "#table" });
      doc.save("Administradores.pdf");
    } else if (list1 === "doctors") {
      const doc = new jsPDF();
      const text = "Doctores";
      doc.autoTable({
        margin: { top: 50 },
      });
      doc.text(text, 20, 30);
      doc.addImage(img, "JPEG", 160, 15, 20, 20);
      doc.autoTable({ html: "#table" });
      doc.save("Doctores.pdf");
    } else if (list1 === "usuarios") {
      const doc = new jsPDF();
      const text = "Usuarios";
      doc.autoTable({
        margin: { top: 50 },
      });
      doc.text(text, 20, 30);
      doc.addImage(img, "JPEG", 160, 15, 20, 20);
      doc.autoTable({ html: "#table" });
      doc.save("Usuarios.pdf");
    }
  };

  const data = dataxls;
  const fileName = "ReporteContactos";
  const exportType = "xls";

  const xls = () => {
    exportFromJSON({ data, fileName, exportType });
  };

  useEffect(() => {
    let list1 = list;
    if (list1 === "admins") {
      let fname = data1.map((v) => v.first_name);
      let lname = data1.map((v) => v.last_name);
      let email = data1.map((v) => v.email);
      let tel = data1.map((v) => v.tel);

      let datos = [];

      for (var i = 0; i < fname.length; i++) {
        datos.push({
          Nombre: fname[i],
          Apellido: lname[i],
          Email: email[i],
          Telefono: tel[i],
        });
        setDataxls(datos);
      }
    } else if (list1 === "doctors") {
      let fname = data1.map((v) => v.first_name);
      let lname = data1.map((v) => v.last_name);
      let country = data1.map((v) => v.country);
      let specialty = data1.map((v) => v.specialty);
      let email = data1.map((v) => v.email);
      let tel = data1.map((v) => v.tel);

      let datos = [];

      for (let i = 0; i < fname.length; i++) {
        datos.push({
          Nombre: fname[i],
          Apellido: lname[i],
          Pais: country[i],
          Especialidad: specialty[i],
          Email: email[i],
          Telefono: tel[i],
        });
        setDataxls(datos);
      }
    } else if (list1 === "usuarios") {
      let fname = data1.map((v) => v.first_name);
      let lname = data1.map((v) => v.last_name);
      let age = data1.map((v) => v.age);
      let country = data1.map((v) => v.country);
      let comunity = data1.map((v) => v.comunity);
      let email = data1.map((v) => v.email);
      let tel = data1.map((v) => v.tel);

      let datos = [];

      for (let i = 0; i < fname.length; i++) {
        datos.push({
          Nombre: fname[i],
          Apellido: lname[i],
          Edad: age[i],
          Pais: country[i],
          Comunidad: comunity[i],
          Email: email[i],
          Telefono: tel[i],
        });
        setDataxls(datos);
      }
    }
  }, [data1]);
  /// AQUI TERMINA LOS REPORTES PDF

  return (
    <>
      {isAuth ? (
        user1.role === "admin" ? (
          list === "admins" ? (
            <>
              <Row>
                <Col>
                  <h1>{props.titulo}</h1>
                </Col>
                <Col>
                  <Button
                    href="/signupadmin"
                    variant="success"
                    className="float"
                  >
                    Nuevo
                  </Button>
                </Col>
              </Row>
              {/* ///DESDE AQUI EMPIEZA LOS REPORTES PDF */}
              <div className="float">
                <Button
                  variant="outline-danger rounded-circle boton"
                  onClick={downloadPdf}
                >
                  <i className="fas fa-file-pdf"></i>
                </Button>
                <Button
                  variant="outline-primary rounded-circle boton"
                  onClick={handleShow}
                >
                  <i className="fas fa-envelope-open-text"></i>
                </Button>
                <Modal show={show} size="sm" onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>
                      {" "}
                      <h6>Exportar</h6>{" "}
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Col>
                        <Form.Group>
                          <Form.Control
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            name="email"
                            id="exampleEmail"
                            placeholder="Correo electronico"
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      type="submit"
                      onClick={() => {
                        sendReport();
                      }}
                      className="btn btn-primary boton rounded-pill"
                    >
                      Enviar
                    </Button>
                  </Modal.Footer>
                </Modal>
                <Button
                  variant="outline-success rounded-circle boton"
                  onClick={xls}
                >
                  {" "}
                  <i className="far fa-file-excel"></i>
                </Button>
              </div>
              {/* ///AQUI TERMINA LOS REPORTES PDF */}
              <input
                className="w3-input w3-border w3-animate-input"
                type="text"
                placeholder="Busqueda"
                value={searchText}
                onChange={(e) => handleChange(e.target.value)}
              ></input>
              <Table id="table" responsive hover size="sm">
                <thead>
                  <tr>
                    <th
                      className="texto"
                      onClick={() => setOrder("first_name")}
                      variant="link"
                      size="sm"
                    >
                      Nombre
                    </th>
                    <th
                      className="texto"
                      onClick={() => setOrder("last_name")}
                      variant="light"
                      size="sm"
                    >
                      Apellido
                    </th>
                    <th
                      className="texto"
                      onClick={() => setOrder("email")}
                      variant="light"
                      size="sm"
                    >
                      Email
                    </th>
                    <th
                      className="texto"
                      onClick={() => setOrder("tel")}
                      variant="light"
                      size="sm"
                    >
                      Telefono
                    </th>
                    <th className="texto">Editar</th>
                    <th className="texto">Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                  {data1.map((user, i) => (
                    <tr key={i}>
                      <td className="texto">{user.first_name}</td>
                      <td className="texto">{user.last_name}</td>
                      <td className="texto">{user.email}</td>
                      <td className="texto">{user.tel}</td>
                      <td className="texto">
                        <EditUser
                          id={user._id}
                          route={"editadmins"}
                          role={user.role}
                          first_name={user.first_name}
                          last_name={user.last_name}
                          tel={user.tel}
                          email={user.email}
                        />
                      </td>
                      <td className="texto">
                        <DeleteUser
                          id={user._id}
                          route1={"schedulesbyuser"}
                          route={"deleteadmins"}
                          route2={"commentsbyauthor"}
                          route3={"commentsbyabout"}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="clearboth">
                {data1.length === 0 && <span>No hay resultados!</span>}
              </div>
            </>
          ) : list === "doctors" ? (
            <>
              <Row>
                <Col>
                  <h1>{props.titulo}</h1>
                </Col>
                <Col>
                  <Button
                    href="/signupdoctor"
                    variant="success"
                    className="float"
                  >
                    Nuevo
                  </Button>
                </Col>
              </Row>
              {/* ///DESDE AQUI EMPIEZA LOS REPORTES PDF */}
              <div className="float">
                <Button
                  variant="outline-danger rounded-circle boton"
                  onClick={downloadPdf}
                >
                  <i className="fas fa-file-pdf"></i>
                </Button>
                <Button
                  variant="outline-primary rounded-circle boton"
                  onClick={handleShow}
                >
                  <i className="fas fa-envelope-open-text"></i>
                </Button>
                <Modal show={show} size="sm" onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>
                      {" "}
                      <h6>Exportar</h6>{" "}
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Col>
                        <Form.Group>
                          <Form.Control
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            name="email"
                            id="exampleEmail"
                            placeholder="Correo electronico"
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      type="submit"
                      onClick={() => {
                        sendReport();
                      }}
                      className="btn btn-primary boton rounded-pill"
                    >
                      Enviar
                    </Button>
                  </Modal.Footer>
                </Modal>
                <Button
                  variant="outline-success rounded-circle boton"
                  onClick={xls}
                >
                  {" "}
                  <i className="far fa-file-excel"></i>
                </Button>
              </div>
              {/* ///AQUI TERMINA LOS REPORTES PDF */}
              <input
                className="w3-input w3-border w3-animate-input"
                type="text"
                placeholder="Busqueda"
                value={searchText}
                onChange={(e) => handleChange(e.target.value)}
              ></input>
              <Table id="table" responsive hover size="sm">
                <thead>
                  <tr>
                    <th
                      className="texto"
                      onClick={() => setOrder("first_name")}
                      variant="link"
                      size="sm"
                    >
                      Nombre
                    </th>
                    <th
                      className="texto"
                      onClick={() => setOrder("last_name")}
                      variant="light"
                      size="sm"
                    >
                      Apellido
                    </th>
                    <th
                      className="texto"
                      onClick={() => setOrder("country")}
                      variant="light"
                      size="sm"
                    >
                      Pais
                    </th>
                    <th
                      className="texto"
                      onClick={() => setOrder("specialty")}
                      variant="light"
                      size="sm"
                    >
                      Especiaidad
                    </th>
                    <th
                      className="texto"
                      onClick={() => setOrder("email")}
                      variant="light"
                      size="sm"
                    >
                      Email
                    </th>
                    <th
                      className="texto"
                      onClick={() => setOrder("tel")}
                      variant="light"
                      size="sm"
                    >
                      Telefono
                    </th>
                    <th className="texto">Comentarios</th>
                    <th className="texto">Editar</th>
                    <th className="texto">Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                  {data1.map((user, i) => (
                    <tr key={i}>
                      <td className="texto">{user.first_name}</td>
                      <td className="texto">{user.last_name}</td>
                      <td className="texto">{user.country}</td>
                      <td className="texto">{user.specialty}</td>
                      <td className="texto">{user.email}</td>
                      <td className="texto">{user.tel}</td>
                      <td className="texto">
                        <BotComment
                          id={user._id}
                          first_name={user.first_name}
                          last_name={user.last_name}
                        />
                      </td>
                      <td className="texto">
                        <EditUser
                          id={user._id}
                          route={"editdoctors"}
                          role={user.role}
                          first_name={user.first_name}
                          last_name={user.last_name}
                          country={user.country}
                          specialty={user.specialty}
                          tel={user.tel}
                          email={user.email}
                        />
                      </td>
                      <td className="texto">
                        <DeleteUser
                          id={user._id}
                          route={"deletedoctors"}
                          route1={"schedulesbydoctor"}
                          route2={"commentsbyauthor"}
                          route3={"commentsbyabout"}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="clearboth">
                {data1.length === 0 && <span>No hay resultados!</span>}
              </div>
            </>
          ) : list === "usuarios" ? (
            <>
              <h1>{props.titulo}</h1>
              {/* ///DESDE AQUI EMPIEZA LOS REPORTES PDF */}
              <div className="float">
                <Button
                  variant="outline-danger rounded-circle boton"
                  onClick={downloadPdf}
                >
                  <i className="fas fa-file-pdf"></i>
                </Button>
                <Button
                  variant="outline-primary rounded-circle boton"
                  onClick={handleShow}
                >
                  <i className="fas fa-envelope-open-text"></i>
                </Button>
                <Modal show={show} size="sm" onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>
                      {" "}
                      <h6>Exportar</h6>{" "}
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Col>
                        <Form.Group>
                          <Form.Control
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            name="email"
                            id="exampleEmail"
                            placeholder="Correo electronico"
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      type="submit"
                      onClick={() => {
                        sendReport();
                      }}
                      className="btn btn-primary boton rounded-pill"
                    >
                      Enviar
                    </Button>
                  </Modal.Footer>
                </Modal>
                <Button
                  variant="outline-success rounded-circle boton"
                  onClick={xls}
                >
                  {" "}
                  <i className="far fa-file-excel"></i>
                </Button>
              </div>
              {/* ///AQUI TERMINA LOS REPORTES PDF */}
              <input
                className="w3-input w3-border w3-animate-input"
                type="text"
                placeholder="Busqueda"
                value={searchText}
                onChange={(e) => handleChange(e.target.value)}
              ></input>
              <Table id="table" responsive hover size="sm">
                <thead>
                  <tr>
                    <th
                      className="texto"
                      onClick={() => setOrder("first_name")}
                      variant="link"
                      size="sm"
                    >
                      Nombre
                    </th>
                    <th
                      className="texto"
                      onClick={() => setOrder("last_name")}
                      variant="light"
                      size="sm"
                    >
                      Apellido
                    </th>
                    <th
                      className="texto"
                      onClick={() => setOrder("age")}
                      variant="light"
                      size="sm"
                    >
                      Edad
                    </th>
                    <th
                      className="texto"
                      onClick={() => setOrder("country")}
                      variant="light"
                      size="sm"
                    >
                      Pais
                    </th>
                    <th
                      className="texto"
                      onClick={() => setOrder("comunity")}
                      variant="light"
                      size="sm"
                    >
                      Comunidad
                    </th>
                    <th
                      className="texto"
                      onClick={() => setOrder("email")}
                      variant="light"
                      size="sm"
                    >
                      Email
                    </th>
                    <th
                      className="texto"
                      onClick={() => setOrder("tel")}
                      variant="light"
                      size="sm"
                    >
                      Telefono
                    </th>
                    <th className="texto">Comentarios</th>
                    <th className="texto">Editar</th>
                    <th className="texto">Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                  {data1.map((user, i) => (
                    <tr key={i}>
                      <td className="texto">{user.first_name}</td>
                      <td className="texto">{user.last_name}</td>
                      <td className="texto">{user.age}</td>
                      <td className="texto">{user.country}</td>
                      <td className="texto">{user.comunity}</td>
                      <td className="texto">{user.email}</td>
                      <td className="texto">{user.tel}</td>
                      <td className="texto">
                        <BotComment
                          id={user._id}
                          first_name={user.first_name}
                          last_name={user.last_name}
                        />
                      </td>
                      <td className="texto">
                        <EditUser
                          id={user._id}
                          route={"editusers"}
                          role={user.role}
                          first_name={user.first_name}
                          last_name={user.last_name}
                          age={user.age}
                          country={user.country}
                          comunity={user.comunity}
                          tel={user.tel}
                          email={user.email}
                        />
                      </td>
                      <td className="texto">
                        <DeleteUser
                          id={user._id}
                          route={"deleteusers"}
                          route1={"schedulesbyuser"}
                          route2={"commentsbyauthor"}
                          route3={"commentsbyabout"}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="clearboth">
                {data1.length === 0 && <span>No hay resultados!</span>}
              </div>
            </>
          ) : undefined
        ) : user1.role === "doctor" ? (
          list === "doctors" ? (
            <>
              <h1>{props.titulo}</h1>
              <div>
                <input
                  className="w3-input w3-border w3-animate-input"
                  type="text"
                  placeholder="Busqueda"
                  value={searchText}
                  onChange={(e) => handleChange(e.target.value)}
                ></input>
              </div>
              <Table responsive hover size="sm">
                <thead>
                  <tr>
                    <th
                      className="texto"
                      onClick={() => setOrder("first_name")}
                      variant="link"
                      size="sm"
                    >
                      Nombre
                    </th>
                    <th
                      className="texto"
                      onClick={() => setOrder("last_name")}
                      variant="light"
                      size="sm"
                    >
                      Apellido
                    </th>
                    <th
                      className="texto"
                      onClick={() => setOrder("country")}
                      variant="light"
                      size="sm"
                    >
                      Pais
                    </th>
                    <th
                      className="texto"
                      onClick={() => setOrder("specialty")}
                      variant="light"
                      size="sm"
                    >
                      Especialidad
                    </th>
                    <th
                      className="texto"
                      onClick={() => setOrder("email")}
                      variant="light"
                      size="sm"
                    >
                      Email
                    </th>
                    <th
                      className="texto"
                      onClick={() => setOrder("tel")}
                      variant="light"
                      size="sm"
                    >
                      Telefono
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data1.map((user, i) => (
                    <tr key={i}>
                      <td className="texto">{user.first_name}</td>
                      <td className="texto">{user.last_name}</td>
                      <td className="texto">{user.country}</td>
                      <td className="texto">{user.specialty}</td>
                      <td className="texto">{user.email}</td>
                      <td className="texto">{user.tel}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="clearboth">
                {data1.length === 0 && <span>No hay resultados!</span>}
              </div>
            </>
          ) : list === "usuarios" ? (
            <>
              <h1>{props.titulo}</h1>
              <div>
                <input
                  className="w3-input w3-border w3-animate-input"
                  type="text"
                  placeholder="Busqueda"
                  value={searchText}
                  onChange={(e) => handleChange(e.target.value)}
                ></input>
              </div>
              <Table responsive hover size="sm">
                <thead>
                  <tr>
                    <th
                      className="texto"
                      onClick={() => setOrder("first_name")}
                      variant="link"
                      size="sm"
                    >
                      Nombre
                    </th>
                    <th
                      className="texto"
                      onClick={() => setOrder("last_name")}
                      variant="light"
                      size="sm"
                    >
                      Apellido
                    </th>
                    <th
                      className="texto"
                      onClick={() => setOrder("age")}
                      variant="light"
                      size="sm"
                    >
                      Edad
                    </th>
                    <th
                      className="texto"
                      onClick={() => setOrder("country")}
                      variant="light"
                      size="sm"
                    >
                      Pais
                    </th>
                    <th
                      className="texto"
                      onClick={() => setOrder("comunity")}
                      variant="light"
                      size="sm"
                    >
                      Comunidad
                    </th>
                    <th
                      className="texto"
                      onClick={() => setOrder("email")}
                      variant="light"
                      size="sm"
                    >
                      Email
                    </th>
                    <th
                      className="texto"
                      onClick={() => setOrder("tel")}
                      variant="light"
                      size="sm"
                    >
                      Telefono
                    </th>
                    <th className="texto">Comentarios</th>
                  </tr>
                </thead>
                <tbody>
                  {data1.map((user, i) => (
                    <tr key={i}>
                      <td className="texto">{user.first_name}</td>
                      <td className="texto">{user.last_name}</td>
                      <td className="texto">{user.age}</td>
                      <td className="texto">{user.country}</td>
                      <td className="texto">{user.comunity}</td>
                      <td className="texto">{user.email}</td>
                      <td className="texto">{user.tel}</td>
                      <td className="texto">
                        <BotComment
                          id={user._id}
                          first_name={user.first_name}
                          last_name={user.last_name}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="clearboth">
                {data1.length === 0 && <span>No hay resultados!</span>}
              </div>
            </>
          ) : undefined
        ) : user1.role === "user" ? (
          list === "doctors" ? (
            <>
              <h1>{props.titulo}</h1>
              <div>
                <input
                  className="w3-input w3-border w3-animate-input"
                  type="text"
                  placeholder="Busqueda"
                  value={searchText}
                  onChange={(e) => handleChange(e.target.value)}
                ></input>
              </div>
              <Table responsive hover size="sm">
                <thead>
                  <tr>
                    <th
                      className="texto"
                      onClick={() => setOrder("first_name")}
                      variant="link"
                      size="sm"
                    >
                      Nombre
                    </th>
                    <th
                      className="texto"
                      onClick={() => setOrder("last_name")}
                      variant="light"
                      size="sm"
                    >
                      Apellido
                    </th>
                    <th
                      className="texto"
                      onClick={() => setOrder("country")}
                      variant="light"
                      size="sm"
                    >
                      Pais
                    </th>
                    <th
                      className="texto"
                      onClick={() => setOrder("specialty")}
                      variant="light"
                      size="sm"
                    >
                      Especialidad
                    </th>
                    <th
                      className="texto"
                      onClick={() => setOrder("email")}
                      variant="light"
                      size="sm"
                    >
                      Email
                    </th>
                    <th
                      className="texto"
                      onClick={() => setOrder("tel")}
                      variant="light"
                      size="sm"
                    >
                      Telefono
                    </th>
                    <th className="texto">Comentarios</th>
                  </tr>
                </thead>
                <tbody>
                  {data1.map((user, i) => (
                    <tr key={i}>
                      <td className="texto">{user.first_name}</td>
                      <td className="texto">{user.last_name}</td>
                      <td className="texto">{user.country}</td>
                      <td className="texto">{user.specialty}</td>
                      <td className="texto">{user.email}</td>
                      <td className="texto">{user.tel}</td>
                      <td className="texto">
                        <BotComment
                          id={user._id}
                          first_name={user.first_name}
                          last_name={user.last_name}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="clearboth">
                {data1.length === 0 && <span>No hay resultados!</span>}
              </div>
            </>
          ) : undefined
        ) : undefined
      ) : undefined}
    </>
  );
}

export default AdminList;
