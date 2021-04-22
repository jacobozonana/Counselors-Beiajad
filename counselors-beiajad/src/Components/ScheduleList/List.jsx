import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Button, Container, Table, Modal, Col, Form } from "react-bootstrap";
import DatePicker from "react-modern-calendar-datepicker";
import DeleteSchedule from "../Delete/DeleteSchedule";
import EditSchedule from "../Edit/EditSchedule";
import Note from "../Note/Note";
import axios from "axios";
import "../../index.css";
import encode from "nodejs-base64-encode";
import Swal from "sweetalert2";
import img from "../../contexts/ImgContext";
import exportFromJSON from "export-from-json";
import "jspdf-autotable";
import { jsPDF } from "jspdf";

function ScheduleList(props) {
  //---------------All this its react-modern-calendar-datepicker config---------------------------------
  const myCustomLocale = {
    // months list by order
    months: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],

    // week days by order
    weekDays: [
      {
        name: "Domingo", // used for accessibility
        short: "D", // displayed at the top of days' rows
        isWeekend: true, // is it a formal weekend or not?
      },
      {
        name: "Lunes",
        short: "L",
      },
      {
        name: "Martes",
        short: "M",
      },
      {
        name: "Miercoles",
        short: "M",
      },
      {
        name: "Jueves",
        short: "J",
      },
      {
        name: "Viernes",
        short: "V",
      },
      {
        name: "Sabado",
        short: "S",
        isWeekend: true,
      },
    ],

    // just play around with this number between 0 and 6
    weekStartingIndex: 0,

    // return a { year: number, month: number, day: number } object
    getToday(gregorainTodayObject) {
      return gregorainTodayObject;
    },

    // return a native JavaScript date here
    toNativeDate(date) {
      return new Date(date.year, date.month - 1, date.day);
    },

    // return a number for date's month length
    getMonthLength(date) {
      return new Date(date.year, date.month, 0).getDate();
    },

    // return a transformed digit to your locale
    transformDigit(digit) {
      return digit;
    },

    // texts in the date picker
    nextMonth: "Next Month",
    previousMonth: "Previous Month",
    openMonthSelector: "Open Month Selector",
    openYearSelector: "Open Year Selector",
    closeMonthSelector: "Close Month Selector",
    closeYearSelector: "Close Year Selector",
    defaultPlaceholder: "Select...",

    // used for input value when multi dates are selected
    digitSeparator: ",",

    // if your provide -2 for example, year will be 2 digited
    yearLetterSkip: 0,

    // is your language rtl or ltr?
    isRtl: false,
  };

  let d = new Date();
  let year = d.getFullYear();
  let month = d.getMonth() + 1;
  let day = d.getDate();

  const defaultValue = {
    year: year,
    month: month,
    day: day,
  };

  //-------------------------------------------------------------------------------------------------

  const { user1, isAuth } = useContext(AuthContext);
  const [schedule, setSchedule] = useState([]);
  const [data1, setData1] = useState([]);
  const [data2] = useState([]);
  const [order, setOrder] = useState("date");
  const [selectedDay, setSelectedDay] = useState(defaultValue);
  const [searchText, setSearchText] = useState("Citas por dia");
  const excludeColumns = ["_id", "is_active", "createdAt", "updatedAt"]; // excluye datos del arreglo del filtro
  const URL_GET_SCHEDULE = `${process.env.REACT_APP_API}${props.lista}/${user1.id}/${props.log}`;
  const [attachment, setAttachment] = useState("");
  const URLSENDREPORT = `${process.env.REACT_APP_API}sendreport/`;
  const [email, setEmail] = useState("Correo electronico");
  const [dataxls, setDataxls] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);

  //---------------All this its react-modern-calendar-datepicker config---------------------------------

  // render regular HTML input element
  const renderCustomInput = ({ ref }) => (
    <input
      readOnly
      ref={ref} // necessary
      value={searchText}
      style={{
        textAlign: "center",
        width: "150px",
        height: "38px",
        border: "1px solid #25a1b7",
        borderRadius: "5px",
        color: "#25a1b7",
      }}
      className="my-custom-input-class" // a styling class
    />
  );

  //------------------------------------------------------------------------------------------------------

  useEffect(() => {
    axios
      .get(URL_GET_SCHEDULE, {
        headers: {
          Authorization: `Bearer: ${localStorage.getItem("app_token")}`,
        },
      })
      .then((data) => (setSchedule(data.data), setData1(data.data)))
      .catch((err) => console.log(err));
  }, []);

  const toFind = (selectedDay) => {
    let dia = selectedDay.day;
    let month = selectedDay.month;
    let year = selectedDay.year;
    if (month < 10) {
      if (dia < 10) {
        filterData(`${year}-0${month}-0${dia}`);
        setSearchText(`0${dia}/0${month}/${year}`);
      } else {
        filterData(`${year}-0${month}-${dia}`);
        setSearchText(`${dia}/0${month}/${year}`);
      }
    } else {
      if (dia < 10) {
        filterData(`${year}-${month}-0${dia}`);
        setSearchText(`0${dia}/${month}/${year}`);
      } else {
        filterData(`${year}-${month}-${dia}`);
        setSearchText(`${dia}/${month}/${year}`);
      }
    }
  };

  const filterData = (value) => {
    const lowercasedValue = value.toLowerCase().trim();
    if (lowercasedValue === "") setData1(schedule);
    else {
      const filteredData = schedule.filter((item) => {
        return Object.keys(item).some((key) =>
          excludeColumns.includes(key)
            ? false
            : item[key].toString().toLowerCase().includes(lowercasedValue)
        );
      });
      setData1(filteredData);
    }
  };

  const Todas = () => {
    setData1(schedule);
    setSearchText(null);
    setSearchText("Citas por dia");
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
    data1.map((date) => {
      const fecha = new Date(date.date).valueOf();
      const now = Date.now();
      if (fecha >= now) {
        data2.push(date);
      }
    });

    let inf = data2.filter((v) => v.type === true);
    let date = inf.map((v) => v.date.split("T")[0]);
    let usefna = inf.map((v) => v.user[0].first_name);
    let uselna = inf.map((v) => v.user[0].last_name);
    let tel = inf.map((v) => v.user[0].tel);
    let time = inf.map((v) => v.time);
    let docfna = inf.map((v) => v.doctor[0].first_name);
    let doclna = inf.map((v) => v.doctor[0].last_name);

    let datos = [];

    for (var i = 0; i < date.length; i++) {
      datos.push({
        Fecha: date[i],
        Hora: time[i],
        Nombre: usefna[i],
        Apellido: uselna[i],
        Telefono: tel[i],
        NombreDr: docfna[i],
        ApellidoDr: doclna[i],
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
            <div className="floatl">
              <DatePicker
                value={selectedDay}
                onChange={
                  (setSelectedDay,
                  (e) => {
                    toFind(e);
                  })
                }
                colorPrimary="#25a1b7"
                calendarClassName="responsive-calendar" // added this
                locale={myCustomLocale} // custom locale object
                shouldHighlightWeekends
                renderInput={renderCustomInput} // render a custom input
                calendarTodayClassName="custom-today-day"
              />
            </div>
            <Container className="margin">
              <Button className="alldat" variant="outline-info" onClick={Todas}>
                Ver todas las citas
              </Button>
            </Container>
            <Table id="table" responsive hover size="sm">
              <thead>
                <tr>
                  <th onClick={() => setOrder("date")} variant="link" size="sm">
                    Fecha
                  </th>
                  <th onClick={() => setOrder("time")} variant="link" size="sm">
                    Hora
                  </th>
                  <th
                    onClick={() => setOrder("first_name")}
                    variant="link"
                    size="sm"
                  >
                    Nombre
                  </th>
                  <th
                    onClick={() => setOrder("last_name")}
                    variant="link"
                    size="sm"
                  >
                    Apellido
                  </th>
                  <th onClick={() => setOrder("tel")} variant="link" size="sm">
                    Telefono
                  </th>
                  <th
                    onClick={() => setOrder("first_name")}
                    variant="link"
                    size="sm"
                  >
                    Apellido Dr.
                  </th>
                  <th
                    onClick={() => setOrder("last_name")}
                    variant="link"
                    size="sm"
                  >
                    Nombre Dr.
                  </th>
                  <th>Nota</th>
                  <th>Editar</th>
                  <th>Borrar</th>
                </tr>
              </thead>
              <tbody>
                {data1.map((date, i) => {
                  const fecha = new Date(date.date).valueOf();
                  const now = Date.now();
                  return date.type === true && fecha >= now ? (
                    <tr key={i}>
                      <td>{date.date.split("T")[0]}</td>
                      <td>{date.time}</td>
                      <td>{date.user[0].first_name}</td>
                      <td>{date.user[0].last_name}</td>
                      <td>{date.user[0].tel}</td>
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
                      <td>{<DeleteSchedule id={date._id} />}</td>
                    </tr>
                  ) : undefined;
                })}
              </tbody>
            </Table>
          </>
        ) : user1.role === "doctor" ? (
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
            <div className="floatl">
              <DatePicker
                value={selectedDay}
                onChange={
                  (setSelectedDay,
                  (e) => {
                    toFind(e);
                  })
                }
                colorPrimary="#25a1b7"
                calendarClassName="responsive-calendar" // added this
                locale={myCustomLocale} // custom locale object
                shouldHighlightWeekends
                renderInput={renderCustomInput} // render a custom input
                calendarTodayClassName="custom-today-day"
              />
            </div>
            <Container className="margin">
              <Button className="alldat" variant="outline-info" onClick={Todas}>
                Ver todas las citas
              </Button>
            </Container>
            <Table id="table" responsive hover size="sm">
              <thead>
                <tr>
                  <th onClick={() => setOrder("date")} variant="link" size="sm">
                    Fecha
                  </th>
                  <th onClick={() => setOrder("time")} variant="link" size="sm">
                    Hora
                  </th>
                  <th
                    onClick={() => setOrder("first_name")}
                    variant="link"
                    size="sm"
                  >
                    Nombre
                  </th>
                  <th
                    onClick={() => setOrder("last_name")}
                    variant="link"
                    size="sm"
                  >
                    Apellido
                  </th>
                  <th onClick={() => setOrder("tel")} variant="link" size="sm">
                    Telefono
                  </th>
                  <th>Nota</th>
                </tr>
              </thead>
              <tbody>
                {data1.map((date, i) => {
                  const fecha = new Date(date.date).valueOf();
                  const now = Date.now();
                  return date.type === true && fecha >= now ? (
                    <tr key={i}>
                      <td>{date.date.split("T")[0]}</td>
                      <td>{date.time}</td>
                      <td>{date.user[0].first_name}</td>
                      <td>{date.user[0].last_name}</td>
                      <td>{date.user[0].tel}</td>
                      <td>{<Note note={date.note} />}</td>
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

export default ScheduleList;
