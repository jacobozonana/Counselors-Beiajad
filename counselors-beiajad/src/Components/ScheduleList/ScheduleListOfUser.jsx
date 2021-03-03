import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Button, Modal, Table } from "react-bootstrap";
import DeleteSchedule from "../Delete/DeleteSchedule";
import axios from "axios";
import EditSchedule from "../Edit/EditSchedule";
import "../../index.css";

function ScheduleListOfUser() {
  const { user1, isAuth } = useContext(AuthContext);
  const [schedule, setSchedule] = useState([]);
  const [order, setOrder] = useState("date");
  const URL_GET_USER = `http://localhost:8000/api/v1/schedulesbyuser/${user1.id}/${user1.id}`;
  const [show, setShow] = useState(false);
  const [noteonmodal, setNoteonmodal] = useState("");
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

  const IdUser = schedule.filter((a) => {
    const fecha = new Date(a.date).valueOf();
    const now = Date.now();
    if (a.user[0]._id === user1.id && fecha >= now) {
      return a;
    }
  });

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

  return (
    <>
      {isAuth ? (
        user1.role === "user" ? (
          <>
            <Table responsive hover size="sm">
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
                {IdUser.map((date, i) => (
                  <tr key={i}>
                    <td>{date.date.split("T")[0]}</td>
                    <td>{date.time}</td>
                    <td>{date.doctor[0].first_name}</td>
                    <td>{date.doctor[0].last_name}</td>
                    <td>
                      {
                        <Button
                          variant="warning"
                          onClick={() => (
                            handleShow(), setNoteonmodal(date.note)
                          )}
                        >
                          <i className="far fa-sticky-note"></i>
                        </Button>
                      }
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
                    <td>
                      <DeleteSchedule id={date._id} />
                    </td>
                  </tr>
                ))}
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

export default ScheduleListOfUser;
