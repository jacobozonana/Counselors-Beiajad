import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Button, Modal, Table, Form, Col } from "react-bootstrap";
import { jsPDF } from "jspdf";
import DeleteSchedule from "../Delete/DeleteSchedule";
import Note from "../Note/Note";
import EditSchedule from "../Edit/EditSchedule";
import axios from "axios";
import encode from "nodejs-base64-encode";
import Swal from "sweetalert2";
import img from "../../contexts/ImgContext";
import exportFromJSON from "export-from-json";
import "jspdf-autotable";
import "../../index.css";

function ScheduleListOfUser() {
  const { user1, isAuth } = useContext(AuthContext);
  const [schedule, setSchedule] = useState([]);
  const [dataxls, setDataxls] = useState([]);
  const [order, setOrder] = useState("date");
  const URL_GET_USER = `${process.env.REACT_APP_API}schedulesbyuser/${user1.id}/${user1.id}`;
  const URLSENDREPORT = `${process.env.REACT_APP_API}sendreport/`;
  const [show, setShow] = useState(false);
  const [attachment, setAttachment] = useState("");
  const [email, setEmail] = useState("Correo electronico");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios
      .get(URL_GET_USER, {
        headers: {
          Authorization: `Bearer: ${localStorage.getItem("app_token")}`,
        },
      })
      .then((data) => setSchedule(data.data))
      .catch((err) => console.log(err));
  }, []);

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

  sortJSON(schedule, order, "asc");

  /// DESDE AQUI EMPIEZA LOS REPORTES PDF
  useEffect(() => {
    const doc = new jsPDF();
    doc.autoTable({
      margin: { top: 50 },
    });
    doc.text("Mis Citas", 20, 30);
    doc.addImage(img, "JPEG", 160, 15, 20, 20);
    doc.autoTable({ html: "#table" });
    var att = doc.output("arraybuffer");
    var base64File = encode.encode(att, "base64");
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
    const text = "Mis Citas";
    doc.autoTable({
      margin: { top: 50 },
    });
    doc.text(text, 20, 30);
    doc.addImage(img, "JPEG", 160, 15, 20, 20);
    doc.autoTable({ html: "#table" });
    doc.save("MisCitas.pdf");
  };

  const data = dataxls;
  const fileName = "MisCitas";
  const exportType = "xls";

  const xls = () => {
    exportFromJSON({ data, fileName, exportType });
  };

  useEffect(() => {
    let date = schedule.map((v) => v.date.slice(0, 10));
    let time = schedule.map((v) => v.time);
    let docfna = schedule.map((v) => v.doctor[0].first_name);
    let doclna = schedule.map((v) => v.doctor[0].last_name);

    let datos = [];

    for (var i = 0; i < date.length; i++) {
      datos.push({
        Fecha: date[i],
        Hora: time[i],
        NombreDr: docfna[i],
        ApellidoDr: doclna[i],
      });
      setDataxls(datos);
    }
  }, [schedule]);
  /// AQUI TERMINA LOS REPORTES PDF

  return (
    <>
      {isAuth ? (
        user1.role === "user" ? (
          <>
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
            <Table id="table" responsive hover size="sm">
              <thead>
                <tr>
                  <th onClick={() => setOrder("date")} variant="link" size="sm">
                    Fecha
                  </th>
                  <th onClick={() => setOrder("time")} variant="link" size="sm">
                    {" "}
                    Hora
                  </th>
                  <th
                    onClick={() => setOrder("first_name")}
                    variant="link"
                    size="sm"
                  >
                    Nombre Dr.
                  </th>
                  <th
                    onClick={() => setOrder("last_name")}
                    variant="link"
                    size="sm"
                  >
                    Apellido Dr.
                  </th>
                  <th>Nota</th>
                  <th>Editar</th>
                  <th>Cancelar</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((date, i) => {
                  const fecha = new Date(date.date).valueOf();
                  const now = Date.now();
                  return fecha >= now ? (
                    <tr key={i}>
                      <td>{date.date.split("T")[0]}</td>
                      <td>{date.time}</td>
                      <td>{date.doctor[0].first_name}</td>
                      <td>{date.doctor[0].last_name}</td>
                      <td>{<Note note={date.note} />}</td>
                      <td>
                        {
                          <EditSchedule
                            id={date._id}
                            datee={date.date}
                            timee={date.time}
                            notee={date.note}
                            doctore={date.doctor[0]._id}
                            doctorefn={date.doctor[0].first_name}
                            doctoreln={date.doctor[0].last_name}
                          />
                        }
                      </td>
                      <td>
                        <DeleteSchedule id={date._id} />
                      </td>
                    </tr>
                  ) : undefined;
                })}
              </tbody>
            </Table>
          </>
        ) : undefined
      ) : undefined}
    </>
  );
}

export default ScheduleListOfUser;
