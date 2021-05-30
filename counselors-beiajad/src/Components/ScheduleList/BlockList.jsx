import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Container } from "react-bootstrap";
import BList from "./BList";
import Header from "../Layout/Header/Header";
import Footer from "../Layout/Footer/Footer";
import Whatsapp from "../Whatsapp/Whatsapp";

function BlockList() {
  const { isAuth, user1 } = useContext(AuthContext);

  return (
    <>
      {isAuth ? (
        user1.role === "admin" ? (
          <>
            <Header />
            <div className="seccion1">
              <Container className="themed-container" fluid={true}>
                <BList lista="schedules" log="" />
              </Container>
            </div>
            <Footer />
            <Whatsapp />
          </>
        ) : user1.role === "doctor" ? (
          <>
            <Header />
            <div className="seccion1">
              <Container className="themed-container" fluid={true}>
                <BList lista="schedulesbydoctor" log={user1.id} />
              </Container>
            </div>
            <Footer />
            <Whatsapp />
          </>
        ) : undefined
      ) : undefined}
    </>
  );
}

export default BlockList;
