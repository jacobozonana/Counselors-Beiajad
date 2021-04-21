import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";

function DeleteSchedule(props) {
  const { isAuth, user1 } = useContext(AuthContext);
  const URLDELETE = `${process.env.REACT_APP_API}schedule/${user1.id}/${props.id}`;

  const Borrar = () => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Esta acción no se puede revertir",
      icon: "warning",
      showCancelButton: true,
      reverseButtons: true,
      allowEscapeKey: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#25a1b7",
      confirmButtonText: "Cancelar",
      cancelButtonText: "Conservar",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(URLDELETE, {
            headers: {
              Authorization: `Bearer: ${localStorage.getItem("app_token")}`,
            },
          })
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Se elimino con exito",
              confirmButtonText: `Ok`,
              timer: 1000,
              timerProgressBar: true,
              allowEscapeKey: true,
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
          });
      }
    });
  };

  return (
    <>
      {isAuth ? (
        user1.role === "admin" || user1.role === "user" || user1.role === "doctor" ? (
          <button onClick={Borrar} className="btn btn-dark boton">
            <i className="far fa-trash-alt"></i>
          </button>
        ) : undefined
      ) : undefined}
    </>
  );
}

export default DeleteSchedule;
