import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import List from "./List";
import Header from "../Layout/Header/Header";
import Footer from "../Layout/Footer/Footer";
import Whatsapp from "../Whatsapp/Whatsapp";

function UsersList() {
  const { isAuth, user1 } = useContext(AuthContext);

  return (
    <>
      {isAuth ? (
        user1.role === "admin" ? (
          <>
            <div className="headerSchedule">
              <Header />
            </div>
            <List lista="admins" titulo="Administradores" />
            <Footer />
            <Whatsapp />
          </>
        ) : undefined
      ) : undefined}
    </>
  );
}

export default UsersList;
