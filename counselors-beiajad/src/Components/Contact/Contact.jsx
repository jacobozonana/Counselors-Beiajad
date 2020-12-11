import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './Contact.css'

function Contact(props) {
    
    const {
        className
      } = props;
    
      const [modal, setModal] = useState(false);
    
      const toggle = () => setModal(!modal);
    return (
    <div>
      <Button color="info" onClick={toggle}>Contáctanos</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Contactanos!</ModalHeader>
        <ModalFooter>
          <Button color="primary" href="mailto:couselorsbeiajad@gmail.com" onClick={toggle}>Correo electronico</Button>{' '}
          <Button id="Whatsapp" href="https://api.whatsapp.com/send?phone=5491152470444" onClick={toggle}>WhatsApp</Button>{' '}
          
        </ModalFooter>
      </Modal>
    </div>
    )
}

export default Contact
