import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Button, Modal } from "react-bootstrap";
import "../../index.css";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import CommentsList from "./List";

function BotComment(props) {
  const { user1, isAuth } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {isAuth ? (
        user1.role === "admin" ||
        user1.role === "user" ||
        user1.role === "doctor" ? (
          <div>
            <Button className="btn btn-primary boton" onClick={handleShow}>
              <i className="far fa-clipboard"></i>
            </Button>
            <Modal show={show} size="sm" onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>
                  Comentarios sobre {props.first_name} {props.last_name}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <CommentsList
                  id={props.id}
                  first_name={props.first_name}
                  last_name={props.last_name}
                />
              </Modal.Body>
            </Modal>
          </div>
        ) : undefined
      ) : undefined}
    </>
  );
}

export default BotComment;
