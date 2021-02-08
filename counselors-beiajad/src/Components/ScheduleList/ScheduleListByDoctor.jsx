import React, { useContext } from 'react'
import { AuthContext } from "../../contexts/AuthContext";
import List from './List'



function ScheduListByDoctor() {

  const { isAuth, user1 } = useContext(AuthContext);


  return (
    <>
    {isAuth ? (
      user1.role==="doctor" ? (
        <> 
          <List lista="schedulesbydoctor" log={user1.id} />
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

export default ScheduListByDoctor
