import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext';
import axios from "axios";
import Swal from 'sweetalert2'


function DeleteSchedule(props) {

const { user1 } = useContext(AuthContext)
const URLDELETE = `http://localhost:8000/api/v1/schedule/${user1.id}/${props.id}`;

const Borrar = () => {
    Swal.fire({
        title: '¿Estas seguro?',
        text: "Esta acción no se puede revertir",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Borrar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
            axios.delete(URLDELETE, {
                headers: {
                  Authorization: `Bearer: ${localStorage.getItem("app_token")}`,
                },
              })
              .then(()=>{
                Swal.fire({
                 icon: 'success',
                 title: 'Se elimino con exito',
                 confirmButtonText: `Ok`,
                 timer: 3000,
                 timerProgressBar: true,
                 }).then(() => {
                   window.location.reload()
                 })
              
            }).catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Lo sentimos esta acción no se pudo completar',
                  })
           })
        }
      })
  }
    

    return (
        <>
           <button onClick={Borrar} className="btn btn-dark boton"><i className="far fa-trash-alt"></i></button> 
        </>
    )
}

export default DeleteSchedule
