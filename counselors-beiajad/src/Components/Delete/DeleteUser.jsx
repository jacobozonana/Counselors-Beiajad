import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";

function DeleteUser(props) {
  const { isAuth, user1 } = useContext(AuthContext);
  const [schedule, setSchedule] = useState([]);
  const [usercombau, setUsercombau] = useState([]);
  const [usercombab, setUsercombab] = useState([]);
  const URLGETUSERDATES = `${process.env.REACT_APP_API}${props.route1}/${user1.id}/${props.id}`;
  const URLGETUSERCOMBAU = `${process.env.REACT_APP_API}${props.route2}/${user1.id}/${props.id}`;
  const URLGETUSERCOMBAB = `${process.env.REACT_APP_API}commentsbyabout/${user1.id}/${props.id}`;

  useEffect(() => {
    axios
      .get(URLGETUSERDATES, {
        headers: {
          Authorization: `Bearer: ${localStorage.getItem("app_token")}`,
        },
      })
      .then((data) => setSchedule(data.data))
      .catch((err) => console.log(err));

    axios
      .get(URLGETUSERCOMBAU, {
        headers: {
          Authorization: `Bearer: ${localStorage.getItem("app_token")}`,
        },
      })
      .then((data) => setUsercombau(data.data))
      .catch((err) => console.log(err));

    axios
      .get(URLGETUSERCOMBAB, {
        headers: {
          Authorization: `Bearer: ${localStorage.getItem("app_token")}`,
        },
      })
      .then((data) => setUsercombab(data.data))
      .catch((err) => console.log(err));
  }, []);

  const Delete = () => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Esta acción no se puede revertir",
      icon: "warning",
      showDenyButton: true,
      reverseButtons: true,
      allowEscapeKey: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Borrar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        for (let i = 0; i < schedule.length; i++) {
          const URLDELETEDATES = `${process.env.REACT_APP_API}schedule/${user1.id}/${schedule[i]._id}`;
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

        for (let i = 0; i < usercombau.length; i++) {
          const URLDELETECOMMENTS = `${process.env.REACT_APP_API}comment/${user1.id}/${usercombau[i]._id}`;
          axios
            .delete(URLDELETECOMMENTS, {
              headers: {
                Authorization: `Bearer: ${localStorage.getItem("app_token")}`,
              },
            })
            .then((data) => console.log(data.data))
            .catch((error) => {
              console.log(error);
            });
        }

        for (let i = 0; i < usercombab.length; i++) {
          const URLDELETECOMMENT = `${process.env.REACT_APP_API}comment/${user1.id}/${usercombab[i]._id}`;
          axios
            .delete(URLDELETECOMMENT, {
              headers: {
                Authorization: `Bearer: ${localStorage.getItem("app_token")}`,
              },
            })
            .then((data) => console.log(data.data))
            .catch((error) => {
              console.log(error);
            });
        }
        const URLDELETEUSER = `${process.env.REACT_APP_API}${props.route}/${user1.id}/${props.id}`;
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
              timer: 1000,
              timerProgressBar: true,
              allowEscapeKey: true,
            }).then(() => {
              window.location.reload();
            })
          )
          .catch((error) => {
            let message = error.response.data.message
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Lo sentimos esta acción no se pudo completar " + message,
              allowEscapeKey: true,
            });
            console.log(error);
          });
      }
    });
  };

  return (
    <>
      {isAuth ? (
        user1.role == "admin" || user1.role == "user" ? (
          <button onClick={Delete} className="btn btn-dark boton">
            <i className="far fa-trash-alt"></i>
          </button>
        ) : undefined
      ) : undefined}
    </>
  );
}

export default DeleteUser;
