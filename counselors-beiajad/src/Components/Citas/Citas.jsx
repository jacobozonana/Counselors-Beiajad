import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { MDBDataTable } from 'mdbreact';
import DeleteSchedule from "../Delete/DeleteSchedule";
import axios from "axios";
import EditSchedule from '../Editar/EditSchedule';
import '../../index.css'

function Citas() {

  const { user1, isAuth } = useContext(AuthContext)
  const [schedule, setSchedule] = useState([]);
  const URL_GET_USER = `http://localhost:8000/api/v1/schedulesbyuser/${user1.id}/${user1.id}`;

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
    <>    
      <MDBDataTable 
      scrollX
      scrollY
      maxHeight="300px"
      striped
      bordered
      paging={false}
      searching={true}
      responsive
      data={{
        columns: [
          {
            label: 'Fecha',
            field: 'dat',
            sort: 'asc',
            width: 115
          },
          {
            label: 'Hora',
            field: 'tim',
            sort: 'asc',
            width: 30
          },
          {
            label: 'Nota',
            field: 'not',
            sort: 'asc',
            width: 370
          },
          {
            label: 'Doctor',
            field: 'doc',
            sort: 'asc',
            width: 100
          },
          {
            label: 'Editar',
            field: 'edi',
            sort: 'asc',
            width: 70
          },
          {
            label: 'Borrar',
            field: 'del',
            sort: 'asc',
            width: 70
          }
        ],
        rows: IdUser.map((date, i) => (
          {
            dat: date.date.split("T")[0],
            tim: date.time,
            not: date.note,
            doc: date.doctor[0].first_name,
            edi: <EditSchedule id={date._id}/>,
            del: <DeleteSchedule id={date._id}/>,
            }
          ))
      }}
    />    
  </>
      ) : (        
        undefined        
      )}
</>     
  ); 
}

export default Citas;