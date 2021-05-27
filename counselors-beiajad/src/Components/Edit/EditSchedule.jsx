import React, { useEffect, useState, useContext } from "react";
import {
  Dropdown,
  DropdownButton,
  Form,
  Button,
  Modal,
  Col,
} from "react-bootstrap";
import { AuthContext } from "../../contexts/AuthContext";
import DatePicker from "react-modern-calendar-datepicker";
import axios from "axios";
import Swal from "sweetalert2";
import "../../index.css";
import "react-modern-calendar-datepicker/lib/DatePicker.css";

function EditSchedule(props) {
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
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState("Fecha");
  const [time, setTime] = useState("Hora");
  const [note, setNote] = useState(props.notee);
  const [doctor, setDoctor] = useState(user1.id);
  const [doctorName, setDoctorName] = useState("Escoge");
  const [doctorLname, setDoctorLname] = useState("Doctor");
  const [usrdates, setUsrdates] = useState([]);
  const [usdat, setUsdat] = useState([]);
  const [selectedDay, setSelectedDay] = useState(defaultValue);
  const [fecha, setFecha] = useState("");
  const [data, setData] = useState([]);
  const [es, setes] = useState([
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
  ]);
  const [borbot, setBorbot] = useState([]);
  const [apa, setApa] = useState("btn btn-info  apagado");
  const [sinHoras, setSinHoras] = useState(false);
  const titleedbot = `${doctorName} ${doctorLname}`;
  const excludeColumns = ["_id", "is_active", "createdAt", "updatedAt"]; // excluye datos del arreglo del filtro
  const SCHDOCGET = `${process.env.REACT_APP_API}schedulesbydoctor/${user1.id}/${doctor}`;
  const SCHUSRGET = `${process.env.REACT_APP_API}schedulesbyuser/${user1.id}/${user1.id}`;
  const DOCGET = `${process.env.REACT_APP_API}doctors/${user1.id}`;
  const SCHPATCH = `${process.env.REACT_APP_API}schedule/${user1.id}/${props.id}`;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //---------------All this its react-modern-calendar-datepicker config---------------------------------

  // render regular HTML input element
  const renderCustomInput = ({ ref }) => (
    <input
      readOnly
      ref={ref} // necessary
      value={date.slice(0, 10)}
      style={{
        textAlign: "center",
        width: "135px",
        height: "40px",
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
      .get(SCHUSRGET, {
        headers: {
          Authorization: `Bearer: ${localStorage.getItem("app_token")}`,
        },
      })
      .then((data) => setUsrdates(data.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(DOCGET, {
        headers: {
          Authorization: `Bearer: ${localStorage.getItem("app_token")}`,
        },
      })
      .then((data) => setDoctors(data.data))
      .catch((err) => console.log(err));
  }, [usrdates]);

  useEffect(() => {
    axios
      .get(SCHDOCGET, {
        headers: {
          Authorization: `Bearer: ${localStorage.getItem("app_token")}`,
        },
      })
      .then((data) => setSchedule(data.data))
      .catch((err) => console.log(err));
  }, [doctor]);

  const diaSeleccionado = (selectedDay) => {
    setSinHoras(false);
    setes(["10:00", "11:00", "12:00", "13:00", "14:00", "15:00"]);
    setBorbot([""]);
    setApa("btn btn-info ");
    setTime("Hora");

    if (selectedDay.month < 10) {
      if (selectedDay.day < 10) {
        setDate(
          `${selectedDay.year}-0${selectedDay.month}-0${selectedDay.day}T`
        );
        filterData(
          `${selectedDay.year}-0${selectedDay.month}-0${selectedDay.day}T`
        );
        setFecha(
          `0${selectedDay.day}/0${selectedDay.month}/${selectedDay.year}T     `
        );
      } else {
        setDate(
          `${selectedDay.year}-0${selectedDay.month}-${selectedDay.day}T`
        );
        filterData(
          `${selectedDay.year}-0${selectedDay.month}-${selectedDay.day}T`
        );
        setFecha(
          `${selectedDay.day}/0${selectedDay.month}/${selectedDay.year}T     `
        );
      }
    } else {
      if (selectedDay.day < 10) {
        setDate(
          `${selectedDay.year}-${selectedDay.month}-0${selectedDay.day}T`
        );
        filterData(
          `${selectedDay.year}-${selectedDay.month}-0${selectedDay.day}T`
        );
        setFecha(
          `0${selectedDay.day}/${selectedDay.month}/${selectedDay.year}T     `
        );
      } else {
        setDate(`${selectedDay.year}-${selectedDay.month}-${selectedDay.day}T`);
        filterData(
          `${selectedDay.year}-${selectedDay.month}-${selectedDay.day}T`
        );
        setFecha(
          `${selectedDay.day}/${selectedDay.month}/${selectedDay.year}T     `
        );
      }
    }
  };

  const escogeHora = (horario) => {
    setTime(horario);
    let x = date.slice(0, 11);
    let y = fecha.slice(0, 11);
    setDate(`${x}${horario}`);
    setFecha(`${y}  ${horario}`);
  };

  const filterData = (value) => {
    const lowercasedValue = value.toLowerCase().trim();
    if (lowercasedValue === "") setData(schedule);
    else {
      const filteredData = schedule.filter((item) => {
        return Object.keys(item).some((key) =>
          excludeColumns.includes(key)
            ? false
            : item[key].toString().toLowerCase().includes(lowercasedValue)
        );
      });
      setData(filteredData);
    }
  };

  useEffect(() => {
    verify();
  }, [data]);

  const verify = () => {
    data.map((info) => borbot.push(info.time));
    const disponibles = es.filter((item) => !borbot.includes(item));

    if (disponibles.length === 0) {
      setes(disponibles);
      setSinHoras(true);
    } else {
      setes(disponibles);
    }
  };

  useEffect(() => {
    udates();
  }, [usrdates]);

  const udates = () => {
    let usdates = [];
    usrdates.map((info) => usdates.push(info.date));
    let year = usdates.map((v) => parseInt(v.slice(0, 4)));
    let month = usdates.map((v) => parseInt(v.slice(5, 7)));
    let day = usdates.map((v) => parseInt(v.slice(8, 10)));
    let datos = [];

    for (var i = 0; i < year.length; i++) {
      datos.push({
        year: year[i],
        month: month[i],
        day: day[i],
      });
      setUsdat(datos);
    }
  };

  const editDate = () => {
    if (
      doctor === user1.id ||
      date === "Fecha" ||
      time === "Hora" ||
      date === "Fecha10:00" ||
      date === "Fecha11:00" ||
      date === "Fecha12:00" ||
      date === "Fecha13:00" ||
      date === "Fecha14:00" ||
      date === "Fecha15:00"
    ) {
      return Swal.fire({
        allowEscapeKey: true,
        icon: "info",
        title: "Informacion incompleta",
        text: "Escoge todos los campos",
        confirmButtonText: `Ok`,
        timerProgressBar: true,
        allowEscapeKey: true,
      });
    }
    Swal.fire({
      title: `Tu cita sera reprogramada con el Dr. ${doctorName} ${doctorLname}, para el ${date.slice(
        0,
        10
      )} ${time} hrs.`,
      icon: "warning",
      showCancelButton: true,
      reverseButtons: true,
      allowEscapeKey: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar Cita",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .patch(
            SCHPATCH,
            {
              date,
              time,
              note,
              doctor: doctor,
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
          });
      }
    });
  };

  /*     
        ESTE CODIGOS SIRVE PARA HACER COMPARACIONES DE HORARIOS DESDE MONOG DB CON CAMBIO DE HORARIO LOCAL

        ----------------------------------
        LO QUE ESTAMOS HACIENDO ACA ES UNA VEZ OBTENIDO LA FECHA LA CORTABAMOS Y AGRAGABAMOS LA HORA ELEGIDA 
        POR EL USUARIO Y  LO SIGUIENE FUE AGREGAR COMO STRING LO RESTANTE PARA PODER IGUALARLO CON LA FECHA DE 
        LA API

        let x = date.slice(0, 11)
        setDate2(`${x}${horario}:00.000Z`)
       ------------------------------------

        let citaApi = new Date(info.date).valueOf()
        
        let pick = new Date(date2).valueOf()

        let horario = 1000 * 60 * 60 * 6; // aqui sumo 6 horas para México

        let escogida = pick+horario // aqui suma las horas de mexico

        console.log(citaApi + "cita de api");
        console.log(escogida + "escogida para comparar") 
      
  */

        console.log(es)

  return (
    <>
      {isAuth ? (
        user1.role === "user" || user1.role === "admin" ? (
          <div>
            <Button variant="info" onClick={handleShow}>
              <i className="far fa-edit"></i>
            </Button>
            <Modal show={show} size="sm" onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Edicion de cita</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="actual">
                  <h6 className="nomargin">Cita actual:</h6>
      <p className="nomargin">Dr. {props.doctorefn} {props.doctoreln}</p>
      <p className="nomargin">Fecha: {props.datee.slice(
        0,
        10
      )}</p>
      <p className="nomargin">{props.timee} hrs.</p>
                </div>
                
                <Form>
                  <Col>
                    <Form.Group>
                      <DropdownButton
                        variant="outline-info"
                        id="dropdown-basic-button"
                        title={titleedbot}
                      >
                        {doctors.map((user, i) => (
                          <Dropdown.Item
                            onClick={() => {
                              setDoctor(user._id);
                              setDoctorName(user.first_name);
                              setDoctorLname(user.last_name);
                              setDate("Fecha");
                              setTime("Hora");
                            }}
                            key={i}
                          >
                            <h4 className="alineacion">
                              {user.first_name} {user.last_name}
                            </h4>
                          </Dropdown.Item>
                        ))}
                      </DropdownButton>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <DatePicker
                        value={selectedDay}
                        onChange={
                          (setSelectedDay,
                          (e) => {
                            diaSeleccionado(e);
                          })
                        }
                        colorPrimary="#25a1b7"
                        calendarClassName="responsive-calendar" // added this
                        locale={myCustomLocale} // custom locale object
                        shouldHighlightWeekends
                        renderInput={renderCustomInput} // render a custom input
                        ClassName="custom-today-day"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <DropdownButton
                        variant="outline-info"
                        id="dropdown-basic-button"
                        title={time}
                      >
                        {sinHoras ? (
                          <>
                            <h6 className="CitaSeleccionada sinhoras">
                              Ups! no hay horas disponibles.<br></br>Escoge otro
                              dia por favor
                            </h6>
                          </>
                        ) : (
                          <>
                            {es.map((hora, i) => (
                              <Dropdown.Item
                                onClick={() => escogeHora(hora, i)}
                                key={i}
                                className={apa}
                              >
                                <h4 className="alineacion">{hora}</h4>
                              </Dropdown.Item>
                            ))}
                          </>
                        )}
                      </DropdownButton>
                    </Form.Group>
                  </Col>
                  <Form.Group>
                    <textarea
                      className="note"
                      placeholder={note}
                      rows="3"
                      onChange={(e) => {
                        setNote(e.target.value);
                      }}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  type="submit"
                  onClick={() => {
                    editDate();
                  }}
                  className="btn btn-info"
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
