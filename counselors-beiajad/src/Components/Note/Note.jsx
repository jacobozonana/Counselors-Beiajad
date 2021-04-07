import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function Note(props) {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const [noteonmodal, setNoteonmodal] = useState("");

  return (
    <>
      <Button
        variant="warning"
        onClick={() => (handleShow(), setNoteonmodal(props.note))}
      >
        <i className="far fa-sticky-note"></i>
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nota</Modal.Title>
        </Modal.Header>
        <Modal.Body>{noteonmodal}</Modal.Body>
      </Modal>
    </>
  );
}

export default Note;
