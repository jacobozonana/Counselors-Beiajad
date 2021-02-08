import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { MDBDataTableV5 } from 'mdbreact';
import { Button, Modal} from 'react-bootstrap';
import DeleteSchedule from "../Delete/DeleteSchedule";
import axios from "axios";
import EditSchedule from '../Editar/EditSchedule';
import '../../index.css'

function Citas() {

  const { user1, isAuth } = useContext(AuthContext)
  const [schedule, setSchedule] = useState([]);
  const URL_GET_USER = `http://localhost:8000/api/v1/schedulesbyuser/${user1.id}/${user1.id}`;
  const [show, setShow] = useState(false);
  const [noteonmodal, setNoteonmodal] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
        user1.role==="user" ? (
          <>
            <MDBDataTableV5
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
                    label: 'Fecha',
                    field: 'dat',
                    width: 10
                  },
                  {
                    label: 'Hora',
                    field: 'tim',
                    width: 10
                  },            
                  {
                    label: 'Nombre Dr.',
                    field: 'docn',
                    width: 10
                  },
                  {
                    label: 'Apellido Dr.',
                    field: 'docl',
                    width: 10
                  },
                  {
                    label: 'Nota',
                    field: 'not',
                    sort: 'disabled',
                    width: 10
                  },
                  {
                    label: 'Editar',
                    field: 'edi',
                    sort: 'disabled',
                    width: 10
                  },
                  {
                    label: 'Cancelar',
                    field: 'del',
                    sort: 'disabled',
                    width: 10
                  }
                ],
                rows: IdUser.map((date, i) => (
                  {
                    dat: date.date.split("T")[0],
                    tim: date.time,              
                    docn: date.doctor[0].first_name,
                    docl: date.doctor[0].last_name,
                    not: <Button variant="warning" onClick={()=> (handleShow(),setNoteonmodal(date.note))}><i className="far fa-sticky-note"></i></Button>,
                    edi: <EditSchedule id={date._id} datee={date.date} timee={date.time} notee={date.note} doctore={date.doctor[0]._id} doctorefn={date.doctor[0].first_name} doctoreln={date.doctor[0].last_name} />,            del: <DeleteSchedule id={date._id}/>,
                    }
                  ))
              }}
            />
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Nota</Modal.Title>
              </Modal.Header>
              <Modal.Body>{noteonmodal}</Modal.Body>
            </Modal>
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

export default Citas;