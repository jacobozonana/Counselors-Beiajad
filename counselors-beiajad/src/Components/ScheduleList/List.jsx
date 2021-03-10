import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Modal, Button, Container, Table } from "react-bootstrap";
import DatePicker from "react-modern-calendar-datepicker";
import DeleteSchedule from "../Delete/DeleteSchedule";
import EditSchedule from "../Edit/EditSchedule";
import axios from "axios";
import "../../index.css";

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
  const [data, setData] = useState([]);
  const [order, setOrder] = useState("date");
  const [selectedDay, setSelectedDay] = useState(defaultValue);
  const [searchText, setSearchText] = useState("Citas por dia");
  const excludeColumns = ["_id", "is_active", "createdAt", "updatedAt"]; // excluye datos del arreglo del filtro
  const URL_GET_SCHEDULE = `http://localhost:8000/api/v1/${props.lista}/${user1.id}/${props.log}`;
  const [show, setShow] = useState(false);
  const [noteonmodal, setNoteonmodal] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
      .then((data) => (setSchedule(data.data), setData(data.data)))
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

  const Todas = () => {
    setData(schedule);
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

  sortJSON(data, order, "asc");

  return (
    <>
      {isAuth ? (
        user1.role === "admin" ? (
          <>
            <Container className="margin">
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
              <Button className="alldat" variant="outline-info" onClick={Todas}>
                Ver todas las citas
              </Button>
            </Container>
            <Table responsive hover size="sm">
              <thead>
                <tr>
                  <th 
                    onClick={() => setOrder("date")} 
                    variant="link" 
                    size="sm"
                  >
                    Fecha
                  </th>
                  <th
                    onClick={() => setOrder("time")}
                    variant="link"
                    size="sm"
                  >
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
                  <th 
                    onClick={() => setOrder("tel")} 
                    variant="link" 
                    size="sm"
                    >
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
                {data.map((date, i) => {   
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
                    <td>
                      <Button
                        variant="warning"
                        onClick={() => (
                          handleShow(), setNoteonmodal(date.note)
                        )}
                      >
                        <i className="far fa-sticky-note"></i>
                      </Button>
                    </td>
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
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Nota</Modal.Title>
              </Modal.Header>
              <Modal.Body>{noteonmodal}</Modal.Body>
            </Modal>
          </>
        ) : user1.role === "doctor" ? (
          <>
            <Container className="margin">
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
              <Button className="alldat" variant="outline-info" onClick={Todas}>
                Ver todas las citas
              </Button>
            </Container>
            <Table responsive hover size="sm">
              <thead>
                <tr>
                  <th 
                    onClick={() => setOrder("date")} 
                    variant="link" 
                    size="sm"
                  >
                    Fecha
                  </th>
                  <th 
                    onClick={() => setOrder("time")} 
                    variant="link" 
                    size="sm"
                  >
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
                  <th 
                    onClick={() => setOrder("tel")} 
                    variant="link" 
                    size="sm"
                  >
                    Telefono
                  </th>
                  <th>Nota</th>
                </tr>
              </thead>
              <tbody>
                {data.map((date, i) => {
                   const fecha = new Date(date.date).valueOf();
                   const now = Date.now();
                  return date.type === true && fecha >= now ? (
                  <tr key={i}>
                    <td>{date.date.split("T")[0]}</td>
                    <td>{date.time}</td>
                    <td>{date.user[0].first_name}</td>
                    <td>{date.user[0].last_name}</td>
                    <td>{date.user[0].tel}</td>
                    <td>
                      <Button
                        variant="warning"
                        onClick={() => (
                          handleShow(), setNoteonmodal(date.note)
                        )}
                      >
                        <i className="far fa-sticky-note"></i>
                      </Button>
                    </td>
                  </tr>
                 ) : undefined;
                })}
              </tbody>
            </Table>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Nota</Modal.Title>
              </Modal.Header>
              <Modal.Body>{noteonmodal}</Modal.Body>
            </Modal>
          </>
        ) : undefined
      ) : undefined}
    </>
  );
}

export default ScheduleList;
