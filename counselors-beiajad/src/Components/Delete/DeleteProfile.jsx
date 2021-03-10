import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";

function DeleteUser(props) {
  const { isAuth, user1 } = useContext(AuthContext);
  const [schedule, setSchedule] = useState([]);
  const URLGETUSERDATES = `http://localhost:8000/api/v1/${props.route1}/${user1.id}/${user1.id}`;

  useEffect(() => {
    axios
      .get(URLGETUSERDATES, {
        headers: {
          Authorization: `Bearer: ${localStorage.getItem("app_token")}`,
        },
      })
      .then((data) => setSchedule(data.data))
      .catch((err) => console.log(err));
  }, []);

  const Delete = () => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Esta acción no se puede revertir",
      icon: "warning",
      showDenyButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Borrar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        for (let i = 0; i < schedule.length; i++) {
          const URLDELETEDATES = `http://localhost:8000/api/v1/schedule/${user1.id}/${schedule[i]._id}`;
          axios
            .delete(URLDELETEDATES, {
              headers: {
                Authorization: `Bearer: ${localStorage.getItem("app_token")}`,
              },
            })
            .then((data) => console.log(data.data))
            .catch((error) => {
              console.log(error);
            });
        }
        const URLDELETEUSER = `http://localhost:8000/api/v1/${props.route}/${user1.id}/${user1.id}`;
        axios
          .delete(URLDELETEUSER, {
            headers: {
              Authorization: `Bearer: ${localStorage.getItem("app_token")}`,
            },
          })
          .then(() =>
            Swal.fire({
              icon: "success",
              title: "Se elimino con exito",
              confirmButtonText: `Ok`,
              timer: 3000,
              timerProgressBar: true,
            }).then(() => {
              window.location.href = "/logout";
            })
          )
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Lo sentimos esta acción no se pudo completar",
            });
            console.log(error);
          });
      }
    });
  };
  return (
    <>
      {isAuth ? (
        <button onClick={Delete} className="btn btn-danger boton">
          <i className="far fa-trash-alt"></i> Eliminar mi cuenta
        </button>
      ) : undefined}
    </>
  );
}

export default DeleteUser;
