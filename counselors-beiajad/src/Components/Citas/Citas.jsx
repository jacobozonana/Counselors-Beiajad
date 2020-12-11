import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from 'react-router-dom'
import { Table } from 'reactstrap';
import axios from "axios";
import EditSchedule from '../Editar/EditSchedule';
import '../Logi/Logi.css'
import './Citas.css'
import DeleteSchedule from "../Delete/DeleteSchedule";
import { MDBContainer } from "mdbreact";


function Citas() {

  const { user1, isAuth } = useContext(AuthContext)
  const [schedule, setSchedule] = useState([]);

  const scrollContainerStyle = { width: "100%", maxHeight: "400px" };

  const URL_GET_USER = `http://localhost:8000/api/v1/schedule/`;

  useEffect(() => {
    axios.get(URL_GET_USER, {
        headers: {
          Authorization: `Bearer: ${localStorage.getItem("app_token")}`,
        },
      })
      .then((data) => setSchedule(data.data))
      .catch((err) => console.log(err));
  }, []);

    const IdUser = schedule.filter((a) => {
    const fecha = new Date(a.date).valueOf()
    const now = Date.now()
    if(a.user[0]._id === user1.id && fecha >= now){
      return a
    }
    
  });
 


  
 
  return (
    <>
    {isAuth ? (
  
    <MDBContainer>
      
      <div className="scrollbar scrollbar-primary  mt-5 mx-auto" style={scrollContainerStyle}>   
    <Table className="citas" striped>
      <thead className="absolute3">
        <tr>
          <th className="absolute3">Fecha</th>
          <th className="absolute3">Hora</th>
          <th className="absolute3">Nota</th>
          <th className="absolute3">Editar</th>
          <th className="absolute3">Borrar</th>
        </tr>
      </thead>
      <tbody>
      {IdUser.map((user, i) => (
        <tr key={i}>   
             
          <td width="95">{user.date.split("T")[0]}</td>
          <td width="75">{user.time}</td>
          <td width="300">{user.note}</td>
          <td><EditSchedule id={user._id}/></td>
          <td><DeleteSchedule id={user._id}/></td>
  
          </tr>
          ))}

      </tbody>
    </Table>
    </div>
    </MDBContainer>

    
    
   
    ) : (
      <Link to="/login"> Ir a inicio </Link>  
    )} 
    </>     
  ); 
}

export default Citas;