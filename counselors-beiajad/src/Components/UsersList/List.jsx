import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { MDBDataTableV5 } from "mdbreact";
import axios from "axios";
import DeleteUser from "../Delete/DeleteUser";
import EditUser from "../Editar/EditUser";
import "../../index.css";

function AdminList(props) {
  const { isAuth, user1 } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const URL_GET_ADMINS = `http://localhost:8000/api/v1/${props.lista}/${user1.id}`;

  useEffect(() => {
    axios
      .get(URL_GET_ADMINS, {
        headers: {
          Authorization: `Bearer: ${localStorage.getItem("app_token")}`,
        },
      })
      .then((data) => setData(data.data))
      .catch((err) => console.log(err));
  }, []);

  //-----------------------------------------------------------------------
  // ESTE CODIGO BUSCA EN EL ARREGLO UN SOLO DATO EN ESTE CASO EL APELLIDO.
  // useEffect(() => {
  //   setFilteredUsers(
  //     users.filter((user) =>
  //        user.last_name.toLowerCase().includes(lastName.toLowerCase())
  //    ));
  // }, [lastName, users]);

  // ESTE CODIGO BUSCA EN EL ARREGLO UN SOLO DATO EN TODO EL JSON, PERO SOLO 1 A LA VEZ
  // const [users, setUsers] = useState([]);
  // const [searchText, setSearchText] = useState("");
  // const excludeColumns = ["_id", "is_active", "createdAt", "password", "updatedAt"];   // excluye datos del arreglo del filtro

  // handle change event of search input
  // const handleChange = value => {
  //   setSearchText(value);
  //   filterData(value);
  // };

  // filter records by search text
  // const filterData = (value) => {
  //   const lowercasedValue = value.toLowerCase().trim();
  //   if (lowercasedValue === "") setData(users);
  //   else {
  //     const filteredData = users.filter(item => {
  //       return Object.keys(item).some(key =>
  //         excludeColumns.includes(key) ? false : item[key].toString().toLowerCase().includes(lowercasedValue)
  //       );
  //     });
  //     setData(filteredData);
  //   }
  // }
  //   return
  //   <div>
  //   <label>Busqueda</label>
  //   <input className="buscador"
  //   style={{ marginLeft: 5 }}
  //   type="text"
  //   value={searchText}
  //   onChange={e => handleChange(e.target.value)}
  // />
  // </div>
  //-----------------------------------------------------------------------

  return (
    <>
      {isAuth ? (
        user1.role === "admin" ? (
          <>
            <h1>{props.titulo}</h1>
            <MDBDataTableV5
              small
              hover
              entriesOptions={[3, 5, 15]}
              entries={3}
              pagesAmount={4}
              pagingTop
              searchTop
              searchBottom={false}
              data={{
                columns: [
                  {
                    label: "Tipo",
                    field: "rol",
                    sort: "asc",
                    width: 10,
                  },
                  {
                    label: "Nombre",
                    field: "fna",
                    sort: "asc",
                    width: 10,
                  },
                  {
                    label: "Apellido",
                    field: "lna",
                    sort: "asc",
                    width: 10,
                  },
                  {
                    label: "Especialidad",
                    field: "spe",
                    sort: "asc",
                    width: 10,
                  },
                  {
                    label: "Email",
                    field: "ema",
                    sort: "asc",
                    width: 10,
                  },
                  {
                    label: "Edad",
                    field: "age",
                    sort: "disabled",
                    width: 10,
                  },
                  {
                    label: "Comunidad",
                    field: "com",
                    sort: "disabled",
                    width: 10,
                  },
                  {
                    label: "Pais",
                    field: "cou",
                    sort: "disabled",
                    width: 10,
                  },
                  {
                    label: "Telefono",
                    field: "tel",
                    sort: "disabled",
                    width: 10,
                  },
                  {
                    label: "Eliminar",
                    field: "del",
                    sort: "disabled",
                    width: 10,
                  },
                  {
                    label: "Editar",
                    field: "edi",
                    sort: "disabled",
                    width: 10,
                  },
                ],
                rows: data.map((user, i) => ({
                  rol: user.role,
                  fna: user.first_name,
                  lna: user.last_name,
                  spe: user.specialty,
                  ema: user.email,
                  age: user.age,
                  com: user.comunity,
                  cou: user.country,
                  tel: user.tel,
                  del: <DeleteUser id={user._id} />,
                  edi: (
                    <EditUser
                      id={user._id}
                      role={user.role}
                      first_name={user.first_name}
                      last_name={user.last_name}
                      specialty={user.specialty}
                      email={user.email}
                      age={user.age}
                      comunity={user.comunity}
                      country={user.country}
                      tel={user.tel}
                    />
                  ),
                })),
              }}
            />
          </>
        ) : user1.role === "doctor" ? (
          <>
            <h1>{props.titulo}</h1>
            <MDBDataTableV5
              small
              hover
              entriesOptions={[3, 5, 15]}
              entries={3}
              pagesAmount={4}
              pagingTop
              searchTop
              searchBottom={false}
              data={{
                columns: [
                  {
                    label: "Nombre",
                    field: "fna",
                    sort: "asc",
                    width: 10,
                  },
                  {
                    label: "Apellido",
                    field: "lna",
                    sort: "asc",
                    width: 10,
                  },
                  {
                    label: "Especialidad",
                    field: "spe",
                    sort: "asc",
                    width: 10,
                  },
                  {
                    label: "Email",
                    field: "ema",
                    sort: "asc",
                    width: 10,
                  },
                  {
                    label: "Edad",
                    field: "age",
                    sort: "disabled",
                    width: 10,
                  },
                  {
                    label: "Comunidad",
                    field: "com",
                    sort: "disabled",
                    width: 10,
                  },
                  {
                    label: "Pais",
                    field: "cou",
                    sort: "disabled",
                    width: 10,
                  },
                  {
                    label: "Telefono",
                    field: "tel",
                    sort: "disabled",
                    width: 10,
                  },
                ],
                rows: data.map((user, i) => ({
                  fna: user.first_name,
                  lna: user.last_name,
                  spe: user.specialty,
                  ema: user.email,
                  age: user.age,
                  com: user.comunity,
                  cou: user.country,
                  tel: user.tel,
                })),
              }}
            />
          </>
        ) : user1.role === "user" ? (
          <>
            <MDBDataTableV5
              small
              hover
              entriesOptions={[3, 5, 15]}
              entries={3}
              pagesAmount={4}
              pagingTop
              searchTop
              searchBottom={false}
              data={{
                columns: [
                  {
                    label: "Nombre",
                    field: "fna",
                    sort: "asc",
                    width: 10,
                  },
                  {
                    label: "Apellido",
                    field: "lna",
                    sort: "asc",
                    width: 10,
                  },
                  {
                    label: "Especialidad",
                    field: "spe",
                    sort: "asc",
                    width: 10,
                  },
                  {
                    label: "Email",
                    field: "ema",
                    sort: "asc",
                    width: 10,
                  },
                  {
                    label: "Edad",
                    field: "age",
                    sort: "disabled",
                    width: 10,
                  },
                  {
                    label: "Comunidad",
                    field: "com",
                    sort: "disabled",
                    width: 10,
                  },
                  {
                    label: "Pais",
                    field: "cou",
                    sort: "disabled",
                    width: 10,
                  },
                  {
                    label: "Telefono",
                    field: "tel",
                    sort: "disabled",
                    width: 10,
                  },
                ],
                rows: data.map((user, i) => ({
                  fna: user.first_name,
                  lna: user.last_name,
                  spe: user.specialty,
                  ema: user.email,
                  age: user.age,
                  com: user.comunity,
                  cou: user.country,
                  tel: user.tel,
                })),
              }}
            />
          </>
        ) : undefined
      ) : undefined}
    </>
  );
}

export default AdminList;
