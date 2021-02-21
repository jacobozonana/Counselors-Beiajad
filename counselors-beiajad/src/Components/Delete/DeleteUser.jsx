import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";

function DeleteUser(props) {
  const { isAuth, user1 } = useContext(AuthContext);
  const [schedule, setSchedule] = useState([]);
  const URLGETUSERDATES = `http://localhost:8000/api/v1/${props.route1}/${user1.id}/${props.id}`;

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
    const dates = schedule.map((user) => {
      return user._id;
    });
    for (let i = 0; i < dates.length; i++) {
      const URLDELETEDATES = `http://localhost:8000/api/v1/schedule/${user1.id}/${dates[i]}`;
      axios
        .delete(URLDELETEDATES, {
          headers: {
            Authorization: `Bearer: ${localStorage.getItem("app_token")}`,
          },
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const DeleteUser = () => {
    const URLDELETEUSER = `http://localhost:8000/api/v1/${props.route}/${user1.id}/${props.id}`;
    axios
      .delete(URLDELETEUSER, {
        headers: {
          Authorization: `Bearer: ${localStorage.getItem("app_token")}`,
        },
      })

      .then( )
      .catch((error) => {
        console.log(error);
      });
  };

  const Eliminate = () => {
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
        Delete();
        DeleteUser();
        Swal.fire({
          icon: "success",
          title: "Se elimino con exito",
          confirmButtonText: `Ok`,
          timer: 3000,
          timerProgressBar: true,
        })
          .then(() => {
            window.location.reload();
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Lo sentimos esta acción no se pudo completar",
            });
          });
      }
    });
  };

  return (
    <>
      {isAuth ? (
        user1.role == "admin" ? (
          <button onClick={Eliminate} className="btn btn-dark boton">
            <i className="far fa-trash-alt"></i>
          </button>
        ) : undefined
      ) : undefined}
    </>
  );
}

export default DeleteUser;
