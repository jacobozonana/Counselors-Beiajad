import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Table, Button, Col, Row } from "react-bootstrap";
import axios from "axios";
import BotComment from "../CommentsList.jsx/BotComment";
import DeleteUser from "../Delete/DeleteUser";
import EditUser from "../Edit/EditUser";
import "../../index.css";

function AdminList(props) {
  const { isAuth, user1 } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [order, setOrder] = useState("first_name");
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

  const sortJSON = (json, key, orden) => {
    return json.sort(function (a, b) {
      var x = a[key],
        y = b[key];

      if (orden === "asc") {
        return x < y ? -1 : x > y ? 1 : 0;
      }

      if (orden === "desc") {
        return x > y ? -1 : x < y ? 1 : 0;
      }
    });
  };

  sortJSON(data, order, "asc");

  return (
    <>
      {isAuth ? (
        user1.role === "admin" ? (
          list === "admins" ? (
            <>
              <Row>
                <Col>
                  <h1>{props.titulo}</h1>
                </Col>
                <Col>
                  <Button
                    href="/signupadmin"
                    variant="success"
                    className="float"
                  >
                    Nuevo
                  </Button>
                </Col>
              </Row>
              <input
                className="w3-input w3-border w3-animate-input"
                type="text"
                placeholder="Busqueda"
                value={searchText}
                onChange={(e) => handleChange(e.target.value)}
              ></input>
              <Table responsive hover size="sm">
                <thead>
                  <tr>
                    <th
                      className="texto"
                      onClick={() => setOrder("first_name")}
                      variant="link"
                      size="sm"
                    >
                      Nombre
                    </th>
                    <th
                      className="texto"
                      onClick={() => setOrder("last_name")}
                      variant="light"
                      size="sm"
                    >
                      Apellido
                    </th>
                    <th
                      className="texto"
                      onClick={() => setOrder("email")}
                      variant="light"
                      size="sm"
                    >
                      Email
                    </th>
                    <th
                      className="texto"
                      onClick={() => setOrder("tel")}
                      variant="light"
                      size="sm"
                    >
                      Telefono
                    </th>
                    <th className="texto">Editar</th>
                    <th className="texto">Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((user, i) => (
                    <tr key={i}>
                      <td className="texto">{user.first_name}</td>
                      <td className="texto">{user.last_name}</td>
                      <td className="texto">{user.email}</td>
                      <td className="texto">{user.tel}</td>
                      <td className="texto">
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
                      <td className="texto">
                        <DeleteUser
                          id={user._id}
                          route1={"schedulesbyuser"}
                          route={"deleteadmins"}
                          route2={"commentsbyauthor"}
                          route3={"commentsbyabout"}
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
              <Row>
                <Col>
                  <h1>{props.titulo}</h1>
                </Col>
                <Col>
                  <Button
                    href="/signupdoctor"
                    variant="success"
                    className="float"
                  >
                    Nuevo
                  </Button>
                </Col>
              </Row>
              <input
                className="w3-input w3-border w3-animate-input"
                type="text"
                placeholder="Busqueda"
                value={searchText}
                onChange={(e) => handleChange(e.target.value)}
              ></input>
              <Table responsive hover size="sm">
                <thead>
                  <tr>
                    <th
                      className="texto"
                      onClick={() => setOrder("first_name")}
                      variant="link"
                      size="sm"
                    >
                      Nombre
                    </th>
                    <th
                      className="texto"
                      onClick={() => setOrder("last_name")}
                      variant="light"
                      size="sm"
                    >
                      Apellido
                    </th>
                    <th
                      className="texto"
                      onClick={() => setOrder("country")}
                      variant="light"
                      size="sm"
                    >
                      Pais
                    </th>
                    <th
                      className="texto"
                      onClick={() => setOrder("specialty")}
                      variant="light"
                      size="sm"
                    >
                      Especiaidad
                    </th>
                    <th
                      className="texto"
                      onClick={() => setOrder("email")}
                      variant="light"
                      size="sm"
                    >
                      Email
                    </th>
                    <th
                      className="texto"
                      onClick={() => setOrder("tel")}
                      variant="light"
                      size="sm"
                    >
                      Telefono
                    </th>
                    <th className="texto">Comentarios</th>
                    <th className="texto">Editar</th>
                    <th className="texto">Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((user, i) => (
                    <tr key={i}>
                      <td className="texto">{user.first_name}</td>
                      <td className="texto">{user.last_name}</td>
                      <td className="texto">{user.country}</td>
                      <td className="texto">{user.specialty}</td>
                      <td className="texto">{user.email}</td>
                      <td className="texto">{user.tel}</td>
                      <td className="texto">
                        <BotComment
                          id={user._id}
                          first_name={user.first_name}
                          last_name={user.last_name}
                        />
                      </td>
                      <td className="texto">
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
                      <td className="texto">
                        <DeleteUser
                          id={user._id}
                          route={"deletedoctors"}
                          route1={"schedulesbydoctor"}
                          route2={"commentsbyauthor"}
                          route3={"commentsbyabout"}
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
              <input
                className="w3-input w3-border w3-animate-input"
                type="text"
                placeholder="Busqueda"
                value={searchText}
                onChange={(e) => handleChange(e.target.value)}
              ></input>
              <Table responsive hover size="sm">
                <thead>
                  <tr>
                    <th
                      className="texto"
                      onClick={() => setOrder("first_name")}
                      variant="link"
                      size="sm"
                    >
                      Nombre
                    </th>
                    <th
                      className="texto"
                      onClick={() => setOrder("last_name")}
                      variant="light"
                      size="sm"
                    >
                      Apellido
                    </th>
                    <th
                      className="texto"
                      onClick={() => setOrder("age")}
                      variant="light"
                      size="sm"
                    >
                      Edad
                    </th>
                    <th
                      className="texto"
                      onClick={() => setOrder("country")}
                      variant="light"
                      size="sm"
                    >
                      Pais
                    </th>
                    <th
                      className="texto"
                      onClick={() => setOrder("comunity")}
                      variant="light"
                      size="sm"
                    >
                      Comunidad
                    </th>
                    <th
                      className="texto"
                      onClick={() => setOrder("email")}
                      variant="light"
                      size="sm"
                    >
                      Email
                    </th>
                    <th
                      className="texto"
                      onClick={() => setOrder("tel")}
                      variant="light"
                      size="sm"
                    >
                      Telefono
                    </th>
                    <th className="texto">Comentarios</th>
                    <th className="texto">Editar</th>
                    <th className="texto">Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((user, i) => (
                    <tr key={i}>
                      <td className="texto">{user.first_name}</td>
                      <td className="texto">{user.last_name}</td>
                      <td className="texto">{user.age}</td>
                      <td className="texto">{user.country}</td>
                      <td className="texto">{user.comunity}</td>
                      <td className="texto">{user.email}</td>
                      <td className="texto">{user.tel}</td>
                      <td className="texto">
                        <BotComment
                          id={user._id}
                          first_name={user.first_name}
                          last_name={user.last_name}
                        />
                      </td>
                      <td className="texto">
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
                      <td className="texto">
                        <DeleteUser
                          id={user._id}
                          route={"deleteusers"}
                          route1={"schedulesbyuser"}
                          route2={"commentsbyauthor"}
                          route3={"commentsbyabout"}
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
                <input
                  className="w3-input w3-border w3-animate-input"
                  type="text"
                  placeholder="Busqueda"
                  value={searchText}
                  onChange={(e) => handleChange(e.target.value)}
                ></input>
              </div>
              <Table responsive hover size="sm">
                <thead>
                  <tr>
                    <th
                      className="texto"
                      onClick={() => setOrder("first_name")}
                      variant="link"
                      size="sm"
                    >
                      Nombre
                    </th>
                    <th
                      className="texto"
                      onClick={() => setOrder("last_name")}
                      variant="light"
                      size="sm"
                    >
                      Apellido
                    </th>
                    <th
                      className="texto"
                      onClick={() => setOrder("country")}
                      variant="light"
                      size="sm"
                    >
                      Pais
                    </th>
                    <th
                      className="texto"
                      onClick={() => setOrder("specialty")}
                      variant="light"
                      size="sm"
                    >
                      Especialidad
                    </th>
                    <th
                      className="texto"
                      onClick={() => setOrder("email")}
                      variant="light"
                      size="sm"
                    >
                      Email
                    </th>
                    <th
                      className="texto"
                      onClick={() => setOrder("tel")}
                      variant="light"
                      size="sm"
                    >
                      Telefono
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((user, i) => (
                    <tr key={i}>
                      <td className="texto">{user.first_name}</td>
                      <td className="texto">{user.last_name}</td>
                      <td className="texto">{user.country}</td>
                      <td className="texto">{user.specialty}</td>
                      <td className="texto">{user.email}</td>
                      <td className="texto">{user.tel}</td>
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
                <input
                  className="w3-input w3-border w3-animate-input"
                  type="text"
                  placeholder="Busqueda"
                  value={searchText}
                  onChange={(e) => handleChange(e.target.value)}
                ></input>
              </div>
              <Table responsive hover size="sm">
                <thead>
                  <tr>
                    <th
                      className="texto"
                      onClick={() => setOrder("first_name")}
                      variant="link"
                      size="sm"
                    >
                      Nombre
                    </th>
                    <th
                      className="texto"
                      onClick={() => setOrder("last_name")}
                      variant="light"
                      size="sm"
                    >
                      Apellido
                    </th>
                    <th
                      className="texto"
                      onClick={() => setOrder("age")}
                      variant="light"
                      size="sm"
                    >
                      Edad
                    </th>
                    <th
                      className="texto"
                      onClick={() => setOrder("country")}
                      variant="light"
                      size="sm"
                    >
                      Pais
                    </th>
                    <th
                      className="texto"
                      onClick={() => setOrder("comunity")}
                      variant="light"
                      size="sm"
                    >
                      Comunidad
                    </th>
                    <th
                      className="texto"
                      onClick={() => setOrder("email")}
                      variant="light"
                      size="sm"
                    >
                      Email
                    </th>
                    <th
                      className="texto"
                      onClick={() => setOrder("tel")}
                      variant="light"
                      size="sm"
                    >
                      Telefono
                    </th>
                    <th className="texto">Comentarios</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((user, i) => (
                    <tr key={i}>
                      <td className="texto">{user.first_name}</td>
                      <td className="texto">{user.last_name}</td>
                      <td className="texto">{user.age}</td>
                      <td className="texto">{user.country}</td>
                      <td className="texto">{user.comunity}</td>
                      <td className="texto">{user.email}</td>
                      <td className="texto">{user.tel}</td>
                      <td className="texto">
                        <BotComment
                          id={user._id}
                          first_name={user.first_name}
                          last_name={user.last_name}
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
        ) : user1.role === "user" ? (
          list === "doctors" ? (
            <>
              <h1>{props.titulo}</h1>
              <div>
                <input
                  className="w3-input w3-border w3-animate-input"
                  type="text"
                  placeholder="Busqueda"
                  value={searchText}
                  onChange={(e) => handleChange(e.target.value)}
                ></input>
              </div>
              <Table responsive hover size="sm">
                <thead>
                  <tr>
                    <th
                      className="texto"
                      onClick={() => setOrder("first_name")}
                      variant="link"
                      size="sm"
                    >
                      Nombre
                    </th>
                    <th
                      className="texto"
                      onClick={() => setOrder("last_name")}
                      variant="light"
                      size="sm"
                    >
                      Apellido
                    </th>
                    <th
                      className="texto"
                      onClick={() => setOrder("country")}
                      variant="light"
                      size="sm"
                    >
                      Pais
                    </th>
                    <th
                      className="texto"
                      onClick={() => setOrder("specialty")}
                      variant="light"
                      size="sm"
                    >
                      Especialidad
                    </th>
                    <th
                      className="texto"
                      onClick={() => setOrder("email")}
                      variant="light"
                      size="sm"
                    >
                      Email
                    </th>
                    <th
                      className="texto"
                      onClick={() => setOrder("tel")}
                      variant="light"
                      size="sm"
                    >
                      Telefono
                    </th>
                    <th className="texto">Comentarios</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((user, i) => (
                    <tr key={i}>
                      <td className="texto">{user.first_name}</td>
                      <td className="texto">{user.last_name}</td>
                      <td className="texto">{user.country}</td>
                      <td className="texto">{user.specialty}</td>
                      <td className="texto">{user.email}</td>
                      <td className="texto">{user.tel}</td>
                      <td className="texto">
                        <BotComment
                          id={user._id}
                          first_name={user.first_name}
                          last_name={user.last_name}
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
        ) : undefined
      ) : undefined}
    </>
  );
}

export default AdminList;
