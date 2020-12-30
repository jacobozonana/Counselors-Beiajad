import React from 'react'
import List from './List'
import Header from "../Layout/Header/Header";



function UsersList() {

  return (
    <>
      <div className="headerSchedule">
      <Header/>
      </div>

        <List lista="admins" titulo="Administradores" />
        <List lista="doctors" titulo="Doctores" />
        <List lista="usuarios" titulo="Usuarios" />
        <List lista="users" titulo="Todos" />

    </>
  )
}

export default UsersList
