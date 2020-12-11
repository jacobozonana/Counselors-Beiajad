import React, { useState } from 'react';
import { Modal, ModalFooter } from 'reactstrap';
import './Logi.css'
import Login from '../Users/Login'
import { Link } from "react-router-dom";


function Logi(props) {
    
    const {
        className
      } = props;
    
      const [modal, setModal] = useState(false);
    
      const toggle = () => setModal(!modal);
    return (
    <div>
      <Link color="info" onClick={toggle}>Iniciar Sesión</Link>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        
        <ModalFooter>
          <Login/>      
        </ModalFooter>
        
      </Modal>
    </div>
    )
}

export default Logi
