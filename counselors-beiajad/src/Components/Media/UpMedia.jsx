import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Form, Button, Modal } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import "../../index.css";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import MediaList from "./MediaList";
import Header from "../Layout/Header/Header";
import Footer from "../Layout/Footer/Footer";
import Whatsapp from "../Whatsapp/Whatsapp";

function UpMedia() {
  const { user1, isAuth } = useContext(AuthContext);
  const FILPOST = `${process.env.REACT_APP_API}upmedia/`;
  const [file, setFile] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const uploadFile = () => {
    if (file == undefined) {
      Swal.fire({
        icon: "error",
        title: "Escoge un archivo",
        allowEscapeKey: true,
      });
    } else {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("user", user1.id);
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
    }
  };

  return (
    <>
      {isAuth ? (
        user1.role === "admin" ||
        user1.role === "user" ||
        user1.role === "doctor" ? (
          <div>
            <Header />
            <div className="texto">
              <div>
                <Button
                  className="margin floatl"
                  variant="primary"
                  onClick={handleShow}
                >
                  Subir foto
                </Button>
                <Modal show={show} size="sm" onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Escoge la imagen</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.File id="formcheck-api-regular">
                        <Form.File.Input
                          onChange={(e) => {
                            setFile(e.target.files[0]);
                          }}
                        />
                      </Form.File>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      type=""
                      onClick={() => {
                        uploadFile();
                      }}
                      className="btn btn-primary boton rounded-pill float"
                    >
                      Subir!!
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>
            <MediaList />
            <Footer />
            <Whatsapp />
          </div>
        ) : undefined
      ) : undefined}
    </>
  );
}

export default UpMedia;
