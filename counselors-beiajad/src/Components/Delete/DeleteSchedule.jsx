import React, { useEffect } from 'react'
import axios from "axios";
import Swal from 'sweetalert2'

function DeleteSchedule(props) {

const URLDELETE = `http://localhost:8000/api/v1/schedule/${props.id}`;

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
              
            })  .catch((error) => {
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
           <button onClick={Borrar} className="btn btn-dark boton">Borrar</button> 
        </>
    )
}

export default DeleteSchedule
