import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Table, Button, Col, Row, Modal, Form } from "react-bootstrap";
import { jsPDF } from "jspdf";
import axios from "axios";
import DeleteContact from "../Delete/DeleteContact";
import "../../index.css";
import encode from "nodejs-base64-encode";
import Swal from "sweetalert2";
import img from "../../contexts/ImgContext";
import exportFromJSON from "export-from-json";
import "jspdf-autotable";
import Header from "../Layout/Header/Header";
import Footer from "../Layout/Footer/Footer";

function AdminList() {
  const { isAuth, user1 } = useContext(AuthContext);
  const [data1, setData1] = useState([]);
  const [dataxls, setDataxls] = useState([]);
  const [order, setOrder] = useState("first_name");
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const URL_GET_CONTACTS = `${process.env.REACT_APP_API}contacts`;
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
      .get(URL_GET_CONTACTS, {
        headers: {
          Authorization: `Bearer: ${localStorage.getItem("app_token")}`,
        },
      })
      .then(
        (data) => (setUsers(data.data), setData1(data.data), setSearchText(""))
      )
      .catch((err) => console.log(err));
  }, []);

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
    const doc = new jsPDF();
    doc.autoTable({
      margin: { top: 50 },
    });
    doc.text("Contactos", 20, 30);
    doc.addImage(img, "JPEG", 160, 15, 20, 20);
    doc.autoTable({ html: "#table" });
    let att = doc.output("arraybuffer");
    let base64File = encode.encode(att, "base64");
    setAttachment(base64File);
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
    const doc = new jsPDF();
    const text = "Contactos";
    doc.autoTable({
      margin: { top: 50 },
    });
    doc.text(text, 20, 30);
    doc.addImage(img, "JPEG", 160, 15, 20, 20);
    doc.autoTable({ html: "#table" });
    doc.save("Contactos.pdf");
  };

  const data = dataxls;
  const fileName = "ReporteContactos";
  const exportType = "xls";

  const xls = () => {
    exportFromJSON({ data, fileName, exportType });
  };

  useEffect(() => {
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
  }, [data1]);
  /// AQUI TERMINA LOS REPORTES PDF

  return (
    <>
      {isAuth ? (
        user1.role === "admin" ? (
          <>
            <Header />
            <Row>
              <Col>
                <h1>Contactos</h1>
              </Col>
            </Row>
            {/* ///DESDE AQUI EMPIEZA LOS REPORTES PDF */}
            <div className="float">
              <Button
                variant="outline-danger rounded-circle"
                onClick={downloadPdf}
              >
                <i className="fas fa-file-pdf"></i>
              </Button>
              <Button
                variant="outline-primary rounded-circle"
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
                    className="btn btn-primary rounded-pill"
                  >
                    Enviar
                  </Button>
                </Modal.Footer>
              </Modal>
              <Button
                variant="outline-success rounded-circle"
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
                  <th className="texto">Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {data1.map((user, i) => (
                  <tr key={i}>
                    <td className="texto">{user.name}</td>
                    <td className="texto">{user.email}</td>
                    <td className="texto">{user.tel}</td>
                    <td className="texto">
                      <DeleteContact id={user._id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="clearboth">
              {data1.length === 0 && <span>No hay resultados!</span>}
            </div>
            <Footer />
          </>
        ) : undefined
      ) : undefined}
    </>
  );
}

export default AdminList;
