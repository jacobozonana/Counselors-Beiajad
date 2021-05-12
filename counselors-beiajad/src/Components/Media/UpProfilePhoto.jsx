import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import "../../index.css";
import "react-modern-calendar-datepicker/lib/DatePicker.css";

function UpProfilePhoto() {
  const { user1, isAuth } = useContext(AuthContext);
  const FILPOST = `${process.env.REACT_APP_API}upprofile/`;
  const [file, setFile] = useState();

  const uploadFile = () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("user", user1.id);
    axios
      .post(FILPOST, formData)
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
        let message = error;
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
              <div class="d-flex flex-row bd-highlight">
                <div class="p-2 bd-highlight">
                  <Form.File id="formcheck-api-regular">
                    <Form.File.Input
                      onChange={(e) => {
                        setFile(e.target.files[0]);
                      }}
                    />
                  </Form.File>
                </div>
                <div class="p-2 bd-highlight">
                  <Button
                    onClick={() => {
                      uploadFile();
                    }}
                    className="btn btn-info boton rounded-pill"
                  >
                    Editar
                  </Button>
                </div>
              </div>
              <div className="mb-3"></div>
            </Form>
          </div>
        ) : undefined
      ) : undefined}
    </>
  );
}

export default UpProfilePhoto;
