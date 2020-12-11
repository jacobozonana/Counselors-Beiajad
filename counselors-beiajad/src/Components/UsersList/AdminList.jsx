import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import { Table } from 'reactstrap';
import DeleteUser from "../Delete/DeleteUser";
import Home from '../../Pages/Home/Home'
import './UsersList.css'

function AdminList() {
  const { isAuth, user1 } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  const excludeColumns = ["_id", "is_active", "createdAt", "password", "updatedAt"];   // excluye datos del arreglo del filtro

  const URL_GET_USERS = `http://localhost:8000/api/v1/users/${user1.id}`;

  useEffect(() => {
    axios
      .get(URL_GET_USERS, {
        headers: {
          Authorization: `Bearer: ${localStorage.getItem("app_token")}`,
        },
      })
      .then((data) => (setUsers(data.data), setData(data.data), setSearchText("")))
      .catch((err) => console.log(err));
  }, [isAuth]);
  
  // ESTE CODIGO BUSCA EN EL ARREGLO UN SOLO DATO EN ESTE CASO EL APELLIDO.
  // useEffect(() => {
  //   setFilteredUsers(
  //     users.filter((user) => 
  //        user.last_name.toLowerCase().includes(lastName.toLowerCase())
  //    ));
  // }, [lastName, users]);


  // handle change event of search input
  const handleChange = value => {
    setSearchText(value);
    filterData(value);
  };

 

  // filter records by search text
  const filterData = (value) => {
    const lowercasedValue = value.toLowerCase().trim();
    if (lowercasedValue === "") setData(users);
    else {
      const filteredData = users.filter(item => {
        return Object.keys(item).some(key =>
          excludeColumns.includes(key) ? false : item[key].toString().toLowerCase().includes(lowercasedValue)
        );
      });
      setData(filteredData);
    }
  }
   
  return (
    <>
    {isAuth ? (
      <>
        
      <div>
        <label>Busqueda</label>
        <input className="form-control buscador"
        style={{ marginLeft: 5 }}
        type="text"
        value={searchText}
        onChange={e => handleChange(e.target.value)}
      />
      </div>
      <h1>Administradores</h1>
      <Table striped>
      <thead>
        <tr>
          <th className="absolute3">Nombre</th>
          <th className="absolute3">Apellido</th>
          <th className="absolute3">Especialidad</th>
          <th className="absolute3">Email</th>
          <th className="absolute3">Edad</th>
          <th className="absolute3">Comunidad</th>
          <th className="absolute3">País</th>
          <th className="absolute3">Teléfofo</th>
          <th className="absolute3">Borrar</th>
          <th className="absolute3">Editar</th>          
        </tr>
      </thead>
      <tbody>
      {data.map((user, i) => (
        
       <tr key={i}>         
        <td >{user.first_name}</td>
        <td >{user.last_name}</td>
        <td >{user.specialty}</td>
        <td >{user.email}</td>
        <td >{user.age}</td>
        <td >{user.comunity}</td>
        <td >{user.country}</td>
        <td >{user.tel}</td>
        <td><DeleteUser id={user._id}/></td>
       </tr>
      ))}
      
      </tbody>
    </Table> 
    <h1>Usuarios</h1>
    <Table striped>
      <thead>
        <tr>
          <th className="absolute3">Nombre</th>
          <th className="absolute3">Apellido</th>
          <th className="absolute3">Email</th>
          <th className="absolute3">Edad</th>
          <th className="absolute3">Comunidad</th>
          <th className="absolute3">País</th>
          <th className="absolute3">Teléfofo</th>
          <th className="absolute3">Borrar</th>
          <th className="absolute3">Editar</th>          
        </tr>
      </thead>
      <tbody>
      {data.map((user, i) => (
       <tr key={i}>         
        <td >{user.first_name}</td>
        <td >{user.last_name}</td>
        <td >{user.email}</td>
        <td >{user.age}</td>
        <td >{user.comunity}</td>
        <td >{user.country}</td>
        <td >{user.tel}</td>
        <td><DeleteUser id={user._id}/></td>
       </tr>
      ))}
      
      </tbody>
    </Table>
    <h1>Doctores</h1>
    <Table striped>
      <thead>
        <tr>
          <th className="absolute3">Nombre</th>
          <th className="absolute3">Apellido</th>
          <th className="absolute3">Email</th>
          <th className="absolute3">Especialidad</th>
          <th className="absolute3">País</th>
          <th className="absolute3">Teléfofo</th>
          <th className="absolute3">Borrar</th>
          <th className="absolute3">Editar</th>          
        </tr>
      </thead>
      <tbody>
      {data.map((user, i) => (

             
        <tr key={i}>         
        <td >{user.first_name}</td>
        <td >{user.last_name}</td>
        <td >{user.email}</td>
        <td >{user.specialty}</td>
        <td >{user.country}</td>
        <td >{user.tel}</td>
        <td><DeleteUser id={user._id}/></td>
        </tr>
      ))}
      </tbody>
    </Table>     
        
        <div className="clearboth">
        {data.length === 0 && <span>No hay resultados!</span>}
        </div>
           
    
    </>
    ) : (
      <Home/>
    )} 
    </>     
  );
}

export default AdminList;