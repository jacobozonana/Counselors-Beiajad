import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Table } from "react-bootstrap";
import axios from "axios";
import DeleteUser from "../Delete/DeleteUser";
import EditUser from "../Editar/EditUser";
import "../../index.css";

function AdminList(props) {
  const { isAuth, user1 } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [list, setList] = useState(props.lista);
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const URL_GET_ADMINS = `http://localhost:8000/api/v1/${props.lista}/${user1.id}`;
  const excludeColumns = [
    "_id",
    "is_active",
    "createdAt",
    "password",
    "updatedAt",
  ]; // excluye datos del arreglo del filtro

  // handle change event of search input
  const handleChange = (value) => {
    setSearchText(value);
    filterData(value);
  };

  useEffect(() => {
    axios
      .get(URL_GET_ADMINS, {
        headers: {
          Authorization: `Bearer: ${localStorage.getItem("app_token")}`,
        },
      })
      .then(
        (data) => (setUsers(data.data), setData(data.data), setSearchText(""))
      )
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    verify();
  }, [data]);

  const verify = () => {
    if (list === "admins") {
      setList("admins");
    }
    if (list === "doctors") {
      setList("doctors");
    }
    if (list === "usuarios") {
      setList("usuarios");
    }
  };

  // filter records by search text
  const filterData = (value) => {
    const lowercasedValue = value.toLowerCase().trim();
    if (lowercasedValue === "") setData(users);
    else {
      const filteredData = users.filter((item) => {
        return Object.keys(item).some((key) =>
          excludeColumns.includes(key)
            ? false
            : item[key].toString().toLowerCase().includes(lowercasedValue)
        );
      });
      setData(filteredData);
    }
  };

  //-----------------------------------------------------------------------
  // ESTE CODIGO BUSCA EN EL ARREGLO UN SOLO DATO EN ESTE CASO EL APELLIDO.
  // useEffect(() => {
  //   setFilteredUsers(
  //     users.filter((user) =>
  //        user.last_name.toLowerCase().includes(lastName.toLowerCase())
  //    ));
  // }, [lastName, users]);
  //-----------------------------------------------------------------------

  return (
    <>
      {isAuth ? (
        user1.role === "admin" ? (
          list === "admins" ? (
            <>
              <h1>{props.titulo}</h1>
              <div>
                <label>Busqueda</label>
                <input
                  className="buscador"
                  style={{ marginLeft: 5 }}
                  type="text"
                  value={searchText}
                  onChange={(e) => handleChange(e.target.value)}
                />
              </div>
              <Table responsive hover size="sm">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Email</th>
                    <th>Telefono</th>
                    <th>Editar</th>
                    <th>Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((user, i) => (
                    <tr key={i}>
                      <td>{user.first_name}</td>
                      <td>{user.last_name}</td>
                      <td>{user.email}</td>
                      <td>{user.tel}</td>
                      <td>
                        <EditUser
                          id={user._id}
                          route={"editadmins"}
                          role={user.role}
                          first_name={user.first_name}
                          last_name={user.last_name}
                          tel={user.tel}
                          email={user.email}
                        />
                      </td>
                      <td>
                        <DeleteUser
                          id={user._id}
                          route1={"schedulesbyuser"}
                          route={"deleteadmins"}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="clearboth">
                {data.length === 0 && <span>No hay resultados!</span>}
              </div>
            </>
          ) : list === "doctors" ? (
            <>
              <h1>{props.titulo}</h1>
              <div>
                <label>Busqueda</label>
                <input
                  className="buscador"
                  style={{ marginLeft: 5 }}
                  type="text"
                  value={searchText}
                  onChange={(e) => handleChange(e.target.value)}
                />
              </div>
              <Table responsive hover size="sm">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Pais</th>
                    <th>Especiaidad</th>
                    <th>Email</th>
                    <th>Telefono</th>
                    <th>Editar</th>
                    <th>Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((user, i) => (
                    <tr key={i}>
                      <td>{user.first_name}</td>
                      <td>{user.last_name}</td>
                      <td>{user.country}</td>
                      <td>{user.specialty}</td>
                      <td>{user.email}</td>
                      <td>{user.tel}</td>
                      <td>
                        <EditUser
                          id={user._id}
                          route={"editdoctors"}
                          role={user.role}
                          first_name={user.first_name}
                          last_name={user.last_name}
                          country={user.country}
                          specialty={user.specialty}
                          tel={user.tel}
                          email={user.email}
                        />
                      </td>
                      <td>
                        <DeleteUser
                          id={user._id}
                          route={"deletedoctors"}
                          route1={"schedulesbydoctor"}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="clearboth">
                {data.length === 0 && <span>No hay resultados!</span>}
              </div>
            </>
          ) : list === "usuarios" ? (
            <>
              <h1>{props.titulo}</h1>
              <div>
                <label>Busqueda</label>
                <input
                  className="buscador"
                  style={{ marginLeft: 5 }}
                  type="text"
                  value={searchText}
                  onChange={(e) => handleChange(e.target.value)}
                />
              </div>
              <Table responsive hover size="sm">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Edad</th>
                    <th>Pais</th>
                    <th>Comunidad</th>
                    <th>Email</th>
                    <th>Telefono</th>
                    <th>Editar</th>
                    <th>Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((user, i) => (
                    <tr key={i}>
                      <td>{user.first_name}</td>
                      <td>{user.last_name}</td>
                      <td>{user.age}</td>
                      <td>{user.country}</td>
                      <td>{user.comunity}</td>
                      <td>{user.email}</td>
                      <td>{user.tel}</td>
                      <td>
                        <EditUser
                          id={user._id}
                          route={"editusers"}
                          role={user.role}
                          first_name={user.first_name}
                          last_name={user.last_name}
                          age={user.age}
                          country={user.country}
                          comunity={user.comunity}
                          tel={user.tel}
                          email={user.email}
                        />
                      </td>
                      <td>
                        <DeleteUser
                          id={user._id}
                          route={"deleteusers"}
                          route1={"schedulesbyuser"}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="clearboth">
                {data.length === 0 && <span>No hay resultados!</span>}
              </div>
            </>
          ) : undefined
        ) : user1.role === "doctor" ? (
          list === "doctors" ? (
            <>
              <h1>{props.titulo}</h1>
              <div>
                <label>Busqueda</label>
                <input
                  className="buscador"
                  style={{ marginLeft: 5 }}
                  type="text"
                  value={searchText}
                  onChange={(e) => handleChange(e.target.value)}
                />
              </div>
              <Table responsive hover size="sm">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Pais</th>
                    <th>Especiaidad</th>
                    <th>Email</th>
                    <th>Telefono</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((user, i) => (
                    <tr key={i}>
                      <td>{user.first_name}</td>
                      <td>{user.last_name}</td>
                      <td>{user.country}</td>
                      <td>{user.specialty}</td>
                      <td>{user.email}</td>
                      <td>{user.tel}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="clearboth">
                {data.length === 0 && <span>No hay resultados!</span>}
              </div>
            </>
          ) : list === "usuarios" ? (
            <>
              <h1>{props.titulo}</h1>
              <div>
                <label>Busqueda</label>
                <input
                  className="buscador"
                  style={{ marginLeft: 5 }}
                  type="text"
                  value={searchText}
                  onChange={(e) => handleChange(e.target.value)}
                />
              </div>
              <Table responsive hover size="sm">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Edad</th>
                    <th>Pais</th>
                    <th>Comunidad</th>
                    <th>Email</th>
                    <th>Telefono</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((user, i) => (
                    <tr key={i}>
                      <td>{user.first_name}</td>
                      <td>{user.last_name}</td>
                      <td>{user.age}</td>
                      <td>{user.country}</td>
                      <td>{user.comunity}</td>
                      <td>{user.email}</td>
                      <td>{user.tel}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="clearboth">
                {data.length === 0 && <span>No hay resultados!</span>}
              </div>
            </>
          ) : undefined
        ) : user1.role === "user" ? (
          list === "doctors" ? (
            <>
              <h1>{props.titulo}</h1>
              <div>
                <label>Busqueda</label>
                <input
                  className="buscador"
                  style={{ marginLeft: 5 }}
                  type="text"
                  value={searchText}
                  onChange={(e) => handleChange(e.target.value)}
                />
              </div>
              <Table responsive hover size="sm">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Pais</th>
                    <th>Especiaidad</th>
                    <th>Email</th>
                    <th>Telefono</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((user, i) => (
                    <tr key={i}>
                      <td>{user.first_name}</td>
                      <td>{user.last_name}</td>
                      <td>{user.country}</td>
                      <td>{user.specialty}</td>
                      <td>{user.email}</td>
                      <td>{user.tel}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="clearboth">
                {data.length === 0 && <span>No hay resultados!</span>}
              </div>
            </>
          ) : undefined
        ) : undefined
      ) : undefined}
    </>
  );
}

export default AdminList;
