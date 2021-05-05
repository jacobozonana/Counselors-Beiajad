import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import "../../index.css";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import FilesList from "./FilesList";

function UpFiles() {
  const { user1, isAuth } = useContext(AuthContext);
  const FILPOST = `${process.env.REACT_APP_API}upfile/`;
  const [file, setFile] = useState();

  const uploadFile = () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("route", `${user1.id}/photos`);
    axios
      .post(FILPOST, formData, {
        headers: {
          Authorization: `Bearer: ${localStorage.getItem("app_token")}`,
        },
      })
      .then((res) => {
        console.log(res);
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
        let message = error.response.data.message;
        Swal.fire({
          allowEscapeKey: true,
          icon: "error",
          title: "Oops...",
          text: "Lo sentimos esta acción no se pudo completar " + message,
        });
        console.log(error);
      });
  };

  return (
    <>
      {isAuth ? (
        user1.role === "admin" ||
        user1.role === "user" ||
        user1.role === "doctor" ? (
          <div>
            <Form>
              <div className="mb-3">
                <Form.File id="formcheck-api-regular">
                  <Form.File.Label>Escoge tu archivo</Form.File.Label>
                  <Form.File.Input
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                    }}
                  />
                </Form.File>
                <Button
                  type=""
                  onClick={() => {
                    uploadFile();
                  }}
                  className="btn btn-primary boton rounded-pill"
                >
                  Subir!!
                </Button>
              </div>
            </Form>
            <FilesList />
          </div>
        ) : undefined
      ) : undefined}
    </>
  );
}

export default UpFiles;
