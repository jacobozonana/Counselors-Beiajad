import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Profile from "./Profile";
import Header from "../Layout/Header/Header";
import Footer from "../Layout/Footer/Footer";
import Whatsapp from "../Whatsapp/Whatsapp";

function Eprofile() {
  const { isAuth } = useContext(AuthContext);

  return (
    <>
      {isAuth ? (
        <>
          <div className="headerSchedule">
            <Header />
          </div>
          <Profile lista="user" />
          <Footer />
          <Whatsapp />
        </>
      ) : undefined}
    </>
  );
}

export default Eprofile;
