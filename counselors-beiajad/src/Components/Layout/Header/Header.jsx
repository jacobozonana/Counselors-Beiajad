import React, { useState, useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { Link } from "react-router-dom";
import Logo from'../../../Counselor/Logo.jpg'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
} from "reactstrap";
import Contact from "../../Contact/Contact";
import './Header.css'
import Logi from '../../Logi/Logi'

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuth } = useContext(AuthContext);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/"></NavbarBrand>
      <NavbarToggler onClick={toggle} />       
      <Collapse className="nav" isOpen={isOpen} navbar>
              <div>
               <img className="logo" src={Logo} /> 
              </div>
       
          {isAuth ? (
            <>
              <div className="links">

              <Link className="alineacion" to="/">Inicio</Link>
              
              <Link className="alineacion" to="/faq">Preguntas Frecuentes</Link>

              <Link className="alineacion" to="/users">Listas</Link> 

              <Link className="alineacion" to="/schedule">Todas las citas</Link>

              <Link className="alineacion" to="/signupadmin">Registrar Administrador</Link>   

              <Link className="alineacion" to="/signupdoctor">Registrar Doctor</Link>              


              <Link><Contact/></Link>

              <Link className="alineacion" to="/logout">Cerrar sesión</Link>
               

              </div>
               
            </>
          ) : (
     
           <>
              <div className="links">

              <Link className="alineacion" to="/">Inicio</Link>

              <Link className="alineacion" to="/faq">Preguntas Frecuentes</Link>

              <Link className="alineacion" to="/register">Registrate</Link>              
            
              <Link to="/"><Contact/></Link>

              <Link className="alineacion" to="/"><Logi /></Link>

              </div>
               
                </>
         )}                
      </Collapse>
    </Navbar>
  );
};

export default Header;
