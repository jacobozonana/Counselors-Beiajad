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
      user1.role==="admin" ? (  
        <>    
          <div className="headerSchedule">
          <Header/>
          </div>
          <List lista="users" titulo="Todos" />
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
