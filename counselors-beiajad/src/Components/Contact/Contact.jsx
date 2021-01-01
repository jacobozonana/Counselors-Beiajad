import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import './Contact.css'

function Contact() {
    
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    return (
    <div>
      <Button variant="info" onClick={handleShow}>Contáctanos</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Contactanos!</Modal.Title>
        </Modal.Header>        
        <Modal.Footer>
          <Button variant="primary" href="mailto:couselorsbeiajad@gmail.com" onClick={handleClose}>Correo electronico</Button>
          <Button id="Whatsapp" href="https://api.whatsapp.com/send?phone=5491152470444" onClick={handleClose}>Whatsapp</Button>
        </Modal.Footer>
      </Modal>
    </div>
    )
}

export default Contact
