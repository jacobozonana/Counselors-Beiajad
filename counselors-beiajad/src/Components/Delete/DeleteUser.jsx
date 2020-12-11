import React, { useState, useEffect } from 'react'
import axios from "axios";
import Swal from 'sweetalert2'

function DeleteUser (props) {
       
    const [schedule, setSchedule] = useState([]);
    const URL_GET_USER = `http://localhost:8000/api/v1/schedule/`;
     
    useEffect(() => {

      axios.get(URL_GET_USER, {
        headers: {
          Authorization: `Bearer: ${localStorage.getItem("app_token")}`,
        },
      })
      .then((data) => setSchedule(data.data))
      .catch((err) => console.log(err))
    }, []);  

   const Borrar = () => {

    const IdUser = schedule.filter((idUsuario) => {
      if(idUsuario.user[0]._id === props.id){
        return idUsuario  
      }
    });

    const usuarioFiltrado = IdUser.map((user) => {
      return user._id
    })

    for (let i = 0; i < usuarioFiltrado.length; i++) {

      const URLDELETECITAS = `http://localhost:8000/api/v1/schedule/${usuarioFiltrado[i]}`;

      axios.delete(URLDELETECITAS, {
        headers: {
          Authorization: `Bearer: ${localStorage.getItem("app_token")}`,
        },
      })
      .then((response)=> {
          console.log(response.data)    
    }) 
    .catch((error) => {
          console.log(error)
    })

    }
  }

  
    const BorrarUser =  () => {

      const URLDELETE = `http://localhost:8000/api/v1/users/${props.id}`;

       axios.delete(URLDELETE, {
          headers: {
            Authorization: `Bearer: ${localStorage.getItem("app_token")}`,
          },
        })
        .then((response)=> {
            console.log(response.data)
           
     
     })  .catch((error) => {
            console.log(error)
     
     })
  }

     const Eliminate =  () => {

      Swal.fire({
        title: '¿Estas seguro?',
        text: "Esta acción no se puede revertir",
        icon: 'warning',
        showDenyButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: `Borrar`,
        denyButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
          Borrar()
          BorrarUser()
          Swal.fire({
            icon: 'success',
            title: 'Se elimino con exito',
            confirmButtonText: `Ok`,
            timer: 3000,
            timerProgressBar: true,
            })
          .then(() => {
            window.location.reload()
          })
          .catch((error) => {
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
           <button onClick={Eliminate} className="btn btn-dark boton">Borrar</button> 
        </>
    )
}

export default DeleteUser