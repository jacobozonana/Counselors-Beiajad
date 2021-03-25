import React from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Container, Button } from "react-bootstrap";
import Apointment from "../../Components/Apointment/Apointment";
import ScheduleListByDoctor from "../../Components/ScheduleList/ScheduleListByDoctor";
import ScheduleList from "../../Components/ScheduleList/ScheduleList";
import Header from "../../Components/Layout/Header/Header";
import Seccion3 from "../../Components/Seccion3/Seccion3";
import Seccion2 from "../../Components/Seccion2/Seccion2";
import Footer from "../../Components/Layout/Footer/Footer";
import "../../index.css";

import { jsPDF } from "jspdf";




function Home() {
  const { user1, isAuth } = React.useContext(AuthContext);

  const pdf = () => {
    const doc = new jsPDF();
    const text = "Hello"
  
  doc.text(text, 10, 10);
  doc.text(text, 10, 30);
  doc.save("Prueba.pdf");
  
  };

  return (
    <>
      {isAuth ? (
        user1.role === "admin" ? (
          <>
            <Header />
            <div className="seccion1">
              <Container className="themed-container" fluid={true}>
                <ScheduleList />
              </Container>
            </div>
            <Footer />
          </>
        ) : user1.role === "user" ? (
          <>
            <Header />
            <div className="seccion1">
              <Container className="themed-container margin" fluid={true}>
                <Apointment />
              </Container>
            </div>
            <Footer />
          </>
        ) : user1.role === "doctor" ? (
          <>
            <Header />
            <div className="seccion1">
              <Container className="themed-container margin" fluid={true}>
                <ScheduleListByDoctor />
              </Container>
            </div>
            <Footer />
          </>
        ) : undefined
      ) : (
        <>
          <Header />
          <div id="start" className="seccion1">
            <Container className="themed-container" fluid={true}>
              <h4 className="texto1">
                Estabilidad emocional para tu vida diaria
              </h4>
              <Button href="/register" variant="info">
                Comienza ahora
              </Button>{" "}
              <h4 className="texto2">
                Habla de forma segura y privada con una consultora psicológica
                de confianza cuando lo necesites.
              </h4>
              <button onClick={pdf}>pdf</button>
            </Container>
          </div>
          <Seccion2 />
          <Seccion3 />
          <Footer />
        </>
      )}
    </>
  );
}

export default Home;
