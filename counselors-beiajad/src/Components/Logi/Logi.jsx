import React, { useState } from 'react';
import { Modal } from 'reactstrap';
import './Logi.css'
import Login from '../Users/Login'


function Logi(props) {
    
    const {
        className
      } = props;
    
      const [modal, setModal] = useState(false);
    
      const toggle = () => setModal(!modal);
    return (
    <div>
      <h2 className="alineacion"  color="info" onClick={toggle}>Iniciar Sesión</h2>
      <Modal color="info" onClick={toggle} isOpen={modal} toggle={toggle} className={className}><Login/></Modal>
    </div>
    )
}

export default Logi
