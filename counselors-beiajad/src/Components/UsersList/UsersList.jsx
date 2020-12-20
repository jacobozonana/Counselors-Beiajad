import React from 'react'
import List from './List'


function UsersList() {

  return (
    <>
        <List lista="admins" titulo="Administradores" />
        <List lista="doctors" titulo="Doctores" />
        <List lista="usuarios" titulo="Usuarios" />
        <List lista="users" titulo="Todos" />

    </>
  )
}

export default UsersList
