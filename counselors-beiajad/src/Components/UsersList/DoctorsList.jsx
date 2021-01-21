import React, { useContext } from 'react'
import { AuthContext } from "../../contexts/AuthContext";
import List from './List'
import Header from "../Layout/Header/Header";



function UsersList() {

  const { isAuth } = useContext(AuthContext);


  return (
    <>
    {isAuth ? (
      <>    
        <div className="headerSchedule">
        <Header/>
        </div>
        <List lista="doctors" titulo="Doctores" />
        </>
    ) : (
      undefined
     )}
    </>
  )
}

export default UsersList
