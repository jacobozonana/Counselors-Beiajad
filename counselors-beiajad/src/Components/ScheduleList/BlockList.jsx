import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Container } from "react-bootstrap";
import BList from "./BList";
import BlockApointment from "../Apointment/BlockApointment";
import Header from "../Layout/Header/Header";
import Footer from "../Layout/Footer/Footer";

function BlockList() {
  const { isAuth, user1 } = useContext(AuthContext);

  return (
    <>
      {isAuth ? (
        user1.role === "admin" ? (
          <>
            <Header />
            <div className="seccion1">
              <Container className="themed-container margin" fluid={true}>
                <BList lista="schedules" log="" />
              </Container>
            </div>
            <Footer />
          </>
        ) : 
        user1.role === "doctor" ? (
            <>
              <Header />
              <div className="seccion1">
                <Container className="themed-container margin" fluid={true}>
                  <BlockApointment />
                  <BList lista="schedulesbydoctor" log={user1.id} />
                </Container>
              </div>
              <Footer />
            </>
          ) : undefined
      ) : undefined}
    </>
  );
}

export default BlockList;
