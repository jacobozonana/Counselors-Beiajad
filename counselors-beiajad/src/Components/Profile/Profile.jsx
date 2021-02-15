import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from '../../contexts/AuthContext';
import { Container } from "react-bootstrap";
import axios from "axios";
import EditUser from '../Editar/EditUser'
import '../../index.css'


function Profile(props) {

    const { isAuth, user1 } = useContext(AuthContext)
    const [data, setData] = useState([]);
    const URL_GET_INFO = `http://localhost:8000/api/v1/${props.lista}/${user1.id}`;
  
    useEffect(() => {
        axios.get(URL_GET_INFO, {
            headers: {
              Authorization: `Bearer: ${localStorage.getItem("app_token")}`,
            },
          })
          .then((data) => (setData(data.data)))
          .catch((err) => console.log(err));
      }, []);

    return (
        <>
        {isAuth ? (
            user1.role==="user" ? (
            <>
                <h1 className="mb-4 reg">Mi cuenta</h1>
                    <Container>
                        <h5>Nombre {data.first_name}</h5>
                        <h5>Apellido {data.last_name}</h5>
                        <h5>Edad {data.age}</h5>
                        <h5>Comunidad {data.comunity}</h5>
                        <h5>Pais {data.country}</h5>
                        <h5>Telefono {data.tel}</h5>
                        <h5>Email {data.email}</h5>
                        <EditUser route="editusers" id={data._id} age={data.age} comunity={data.comunity} country={data.country} tel={data.tel} email={data.email}/>
                    </Container>
          </>       
        ) : 
            user1.role==="doctor" ? (
            <>
                <h1 className="mb-4 reg">Mi cuenta</h1>
                    <Container>
                        <h5>Nombre {data.first_name}</h5>
                        <h5>Apellido {data.last_name}</h5>
                        <h5>Pais {data.country}</h5>
                        <h5>Telefono {data.tel}</h5>
                        <h5>Especialidad {data.specialty}</h5>
                        <h5>Email {data.email}</h5>
                        <EditUser route="editdoctors" id={data._id} country={data.country} tel={data.tel} specialty={data.specialty} email={data.email}/>
                    </Container>
          </>   
        ) : 
            user1.role==="admin" ? (
            <>
                <h1 className="mb-4 reg">Mi cuenta</h1>
                    <Container>
                        <h5>Nombre {data.first_name}</h5>
                        <h5>Apellido {data.last_name}</h5>
                        <h5>Telefono {data.tel}</h5>
                        <h5>Email {data.email}</h5>
                        <EditUser route="editadmins" id={data._id} tel={data.tel} email={data.email}/>
                    </Container>
          </>   
        ) : (
            undefined        
        )
        ) : (
            undefined
        )}
        </>
    );
}

export default Profile
