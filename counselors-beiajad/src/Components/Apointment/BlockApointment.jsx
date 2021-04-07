import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Form, Button, Modal, Col } from "react-bootstrap";
import DatePicker from "react-modern-calendar-datepicker";
import axios from "axios";
import ScheduleListOfUser from "../ScheduleList/ScheduleListOfUser";
import Swal from "sweetalert2";
import "../../index.css";
import "react-modern-calendar-datepicker/lib/DatePicker.css";

function BlockApointment() {
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
  const DOCGET = `http://localhost:8000/api/v1/doctors/${user1.id}`;
  const [schedule, setSchedule] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState("Fecha");
  const [time, setTime] = useState("Hora");
  const [note, setNote] = useState("Escribe la razón");
  const [user] = useState(user1.id);
  const [usrdates, setUsrdates] = useState([]);
  const [usdat, setUsdat] = useState([]);
  const [selectedDay, setSelectedDay] = useState(defaultValue);
  const [fecha, setFecha] = useState("");
  const [data, setData] = useState([]);
  const [display, setDisplay] = useState("off");
  const [botones, setBotones] = useState([
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
  ]);
  const [borbot, setBorbot] = useState([]);
  const [hours, setHours] = useState([]);
  const [apa, setApa] = useState("btn btn-info boton apagado");
  const [sinHoras, setSinHoras] = useState(false);
  const excludeColumns = ["_id", "is_active", "createdAt", "updatedAt"]; // excluye datos del arreglo del filtro
  const SCHDOCGET = `http://localhost:8000/api/v1/schedulesbydoctor/${user1.id}/${user1.id}`;
  const SCHUSRGET = `http://localhost:8000/api/v1/schedulesbyuser/${user1.id}/${user1.id}`;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
  }, []);

  const diaSeleccionado = (selectedDay) => {
    setSinHoras(false);
    setBotones(["10:00", "11:00", "12:00", "13:00", "14:00", "15:00"]);
    setBorbot([""]);
    setApa("btn btn-info boton");
    setDisplay("");
    setTime("Hora");
    setHours([]);

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
    data.map((info) => borbot.push(info.time));
    const disponibles = botones.filter((item) => !borbot.includes(item));

    if (disponibles.length === 0) {
      setBotones(disponibles);
      setSinHoras(true);
    } else {
      setBotones(disponibles);
    }
  }, [data]);

  useEffect(() => {
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
  }, [usrdates]);

  const saveDate = () => {
    for (let i = 0; i < hours.length; i++) {
      const SCHPOST1 = `http://localhost:8000/api/v1/scheduleblock/${user1.id}`;
      let x = date.slice(0, 11);
      const date1 = `${x}${hours[i]}`;
      axios
        .post(
          SCHPOST1,
          {
            type: false,
            date: date1,
            time: hours[i],
            note,
            user: user,
            doctor: user1.id,
          },
          {
            headers: {
              Authorization: `Bearer: ${localStorage.getItem("app_token")}`,
            },
          }
        )
        .then(() => {
          Swal.fire({
            allowEscapeKey: true,
            icon: "success",
            title: "Listo!",
            confirmButtonText: `Ok`,
            timer: 1000,
            timerProgressBar: true,
          }).then(() => {
            window.location.reload();
          });
        })
        .catch((error) => {
          let message = error.response.data.message
          Swal.fire({
            allowEscapeKey: true,
            icon: "error",
            title: "Oops...",
            text: "Lo sentimos esta acción no se pudo completar " + message,
          });
          console.log(error);
        });
    }
  };

  const saveDay = () => {
    for (let i = 0; i < botones.length; i++) {
      const SCHPOST1 = `http://localhost:8000/api/v1/scheduleblock/${user1.id}`;
      let x = date.slice(0, 11);
      const date1 = `${x}${botones[i]}`;
      axios
        .post(
          SCHPOST1,
          {
            type: false,
            date: date1,
            time: botones[i],
            note,
            user: user,
            doctor: user1.id,
          },
          {
            headers: {
              Authorization: `Bearer: ${localStorage.getItem("app_token")}`,
            },
          }
        )
        .then(() => {
          Swal.fire({
            allowEscapeKey: true,
            icon: "success",
            title: "Listo!",
            confirmButtonText: `Ok`,
            timer: 1000,
            timerProgressBar: true,
          }).then(() => {
            window.location.reload();
          });
        })
        .catch((error) => {
          let message = error.response.data.message
          Swal.fire({
            allowEscapeKey: true,
            icon: "error",
            title: "Oops...",
            text: "Lo sentimos esta acción no se pudo completar  " + message,
          });
          console.log(error);
        });
    }
  };

  return (
    <>
      {isAuth ? (
        user1.role === "doctor" ? (
          <div className="calendar1">
            <Button className="margin" variant="primary" onClick={handleShow}>
              Quiero horas libres!
            </Button>
            <Modal show={show} size="sm" onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Escoge dia y horas</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
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
                      {sinHoras ? (
                        <>
                          <h6 className="CitaSeleccionada sinhoras">
                            Ups! El dia esta lleno.<br></br>Escoge otro dia por
                            favor
                          </h6>
                        </>
                      ) : (
                        <>
                          <div className={display}>
                            {botones.map((hora, i) => (
                              <Button
                                variant="outline-info"
                                className="margin"
                                size="sm"
                                key={i}
                                onClick={() => {
                                  setHours((hours) =>
                                    hours.filter((item) => item !== hora)
                                  );
                                  setHours((hours) => hours.concat(hora));
                                }}
                              >
                                {hora}
                              </Button>
                            ))}
                            <div className="hours">
                              <p className="hours1">{`${hours} `}</p>
                            </div>
                            <div className="floatl">
                              <Form.Text className="text-muted">
                                Horas seleccionadas
                              </Form.Text>
                            </div>

                            <div className="float">
                              <Button
                                variant="outline-dark"
                                size="sm"
                                onClick={() => {
                                  setHours([]);
                                  setDate("Fecha");
                                  setDisplay("off");
                                }}
                              >
                                Reset
                              </Button>
                            </div>
                          </div>
                        </>
                      )}
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
                    saveDay();
                  }}
                  variant="outline-danger"
                  className="boton"
                >
                  Todo el día libre!
                </Button>
                <Button
                  type="submit"
                  onClick={() => {
                    saveDate();
                  }}
                  className="btn btn-info boton"
                >
                  Horas líbres!
                </Button>
              </Modal.Footer>
            </Modal>

            <ScheduleListOfUser />
          </div>
        ) : undefined
      ) : undefined}
    </>
  );
}

export default BlockApointment;
