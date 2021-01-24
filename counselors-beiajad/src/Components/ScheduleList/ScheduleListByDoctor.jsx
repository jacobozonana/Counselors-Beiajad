import React, { useContext } from 'react'
import { AuthContext } from "../../contexts/AuthContext";
import List from './List'
import Header from "../Layout/Header/Header";



function ScheduListByDoctor() {

  const { isAuth, user1 } = useContext(AuthContext);


  return (
    <>
    {isAuth ? (
      <>    
        <div className="headerSchedule">
        <Header/>
        </div>
        <List lista="schedulesbydoctor" log={user1.id} />
        </>
    ) : (
      undefined
     )}
    </>
  )
}

export default ScheduListByDoctor
