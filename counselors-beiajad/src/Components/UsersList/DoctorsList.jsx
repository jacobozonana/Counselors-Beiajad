import React, { useContext } from 'react'
import { AuthContext } from "../../contexts/AuthContext";
import List from './List'
import Header from "../Layout/Header/Header";
import Footer from '../Layout/Footer/Footer'

function UsersList() {

  const { isAuth, user1 } = useContext(AuthContext);
  
  return (
    <>
    {isAuth ? (
      user1.role==="admin" || user1.role==="doctor" || user1.role==="user" ? (
        <>    
          <div className="headerSchedule">
          <Header/>
          </div>
          <List lista="doctors" titulo="Doctores" />
          <Footer />
        </>
    ) : (
      undefined
    )
    ) : (
      undefined
     )}
    </>
  )
}

export default UsersList
