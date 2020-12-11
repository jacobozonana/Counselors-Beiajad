import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../Apointment/Apointment.css'
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";
import { Container, Row, Col, Modal, ModalFooter, Button } from 'reactstrap';
import Swal from 'sweetalert2'


function EditSchedule(props) {
  
  let d = new Date();
  let year = d.getFullYear();
  let month = d.getMonth()+1;
  let day = d.getDate();

  const defaultValue = {
    year: year,
    month: month,
    day: day,
  };
      
    const URLG = "http://localhost:8000/api/v1/schedule/"
    const URLP = `http://localhost:8000/api/v1/schedule/${props.id}`
    const [schedule, setSchedule] = useState([]);
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [note, setNote] = useState('Escribe aqui algun comentario a tu cita')
    const [modal, setModal] = useState(false);
    const [selectedDay, setSelectedDay] = useState(defaultValue);
    const [fecha, setFecha] = useState('')
    const [data, setData] = useState([]);
    const [botones, setBotones] = useState (["10:00","11:00","12:00","13:00","14:00","15:00"])
    const [borbot, setBorbot] = useState ([])
    const [apa, setApa] = useState("btn btn-info boton apagado")
    const [sinHoras, setSinHoras] = useState (false) 
    const excludeColumns = ["_id", "is_active", "createdAt", "updatedAt"];   // excluye datos del arreglo del filtro
    const toggle = () => setModal(!modal);
    const { className } = props;
    
    useEffect(() => {
      axios
        .get(URLG, {
          headers: {
            Authorization: `Bearer: ${localStorage.getItem("app_token")}`,
          },
        })
        .then((data) => (setSchedule(data.data)))
        .catch((err) => console.log(err));
    }, []);

    const diaSeleccionado = (selectedDay) => {

      setSinHoras(false)
      setBotones(["10:00","11:00","12:00","13:00","14:00", "15:00"])
      setBorbot([""])
      setApa("btn btn-info boton")

      if(selectedDay.month < 10){  
          if(selectedDay.day < 10){
            setDate(`${selectedDay.year}-0${selectedDay.month}-0${selectedDay.day}T`); 
            filterData(`${selectedDay.year}-0${selectedDay.month}-0${selectedDay.day}T`); 
            setFecha(`0${selectedDay.day}/0${selectedDay.month}/${selectedDay.year}T     `);
        }else{
            setDate(`${selectedDay.year}-0${selectedDay.month}-${selectedDay.day}T`);
            filterData(`${selectedDay.year}-0${selectedDay.month}-${selectedDay.day}T`);
            setFecha(`${selectedDay.day}/0${selectedDay.month}/${selectedDay.year}T     `);
        }
      }
      else {
          if (selectedDay.day < 10){
            setDate(`${selectedDay.year}-${selectedDay.month}-0${selectedDay.day}T`);
            filterData(`${selectedDay.year}-${selectedDay.month}-0${selectedDay.day}T`);
            setFecha(`0${selectedDay.day}/${selectedDay.month}/${selectedDay.year}T     `);
        }else{
            setDate(`${selectedDay.year}-${selectedDay.month}-${selectedDay.day}T`);
            filterData(`${selectedDay.year}-${selectedDay.month}-${selectedDay.day}T`);
            setFecha(`${selectedDay.day}/${selectedDay.month}/${selectedDay.year}T     `);
        }
      }
    }

    const escogeHora = (horario) => {
      setTime(horario) 
      let x = date.slice(0, 11)
      let y = fecha.slice(0, 11)
      setDate(`${x}${horario}`)
      setFecha(`${y}  ${horario}`)
    }
        
    const filterData = (value) => {
      const lowercasedValue = value.toLowerCase().trim();
      if (lowercasedValue === "") setData(schedule);
      else {
        const filteredData = schedule.filter(item => {
          return Object.keys(item).some(key =>
            excludeColumns.includes(key) ? false : item[key].toString().toLowerCase().includes(lowercasedValue) 
          )
        });
        setData(filteredData);       
      }
    }

    useEffect(() => {
      verify()
    }, [data])
      
    const verify = () => {
      data.map((info) => (     
      borbot.push(info.time)))
      const disponibles = botones.filter(item => !borbot.includes(item))
      
      if (disponibles.length === 0) { 
        setBotones(disponibles)
        setSinHoras(true)
  
       }else{
         setBotones(disponibles)
       }      
     }

    const editDate = ()=>{

      Swal.fire({
        title: `La cita sera reprogramada para el ${fecha.replace("T", " a las")} hrs.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          axios.patch(URLP, {
        
            date,
            time,
            note,
            
      
           },
           {
            headers: {
              Authorization: `Bearer: ${localStorage.getItem("app_token")}`,
            },
          }
           ).then(()=>{
               Swal.fire({
                icon: 'success',
                title: 'Se edito con exito',
                confirmButtonText: `Ok`,
                timer: 3000,
                timerProgressBar: true,
                }).then(() => {
                  window.location.reload()
                })
             
           })
           .catch((error)=>{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Lo sentimos esta acción no se pudo completar',
            })
           })
          
        }
      })
 
        }
       
   /*     
        ESTE CODIGOS SIRVE PARA HACER COMPARACIONES DE HORARIOS DESDE MONOG DB CON CAMBIO DE HORARIO LOCAL

        ----------------------------------
        LO QUE ESTAMOS HACIENDO ACA ES UNA VEZ OBTENIDO LA FECHA LA CORTABAMOS Y AGRAGABAMOS LA HORA ELEGIDA 
        POR EL USUARIO Y  LO SIGUIENE FUE AGREGAR COMO STRING LO RESTANTE PARA PODER IGUALARLO CON LA FECHA DE 
        LA API

        let x = date.slice(0, 11)
        setDate2(`${x}${horario}:00.000Z`)
       ------------------------------------

        let citaApi = new Date(info.date).valueOf()
        
        let pick = new Date(date2).valueOf()

        let horario = 1000 * 60 * 60 * 6; // aqui sumo 6 horas para México

        let escogida = pick+horario // aqui suma las horas de mexico

        console.log(citaApi + "cita de api");
        console.log(escogida + "escogida para comparar") 
      
  */

    return (
     <>
    <Button color="info boton" onClick={toggle}>Editar</Button>
        <Modal isOpen={modal} toggle={toggle} className={className}>
            <ModalFooter>
      <div className="calendar">
        <Container fluid>
          <Row >
            <Col s="6">  

              <h1>Escoge tu cita</h1>
              <Calendar
                value={selectedDay}
                onChange={setSelectedDay, (e)=>{diaSeleccionado(e)}}
                shouldHighlightWeekends
                //calendarTodayClassName="custom-today-day"
              />                     
                
            </Col>
            <Col s="6">

              <div className="fondoCita">
                <h4 className="CitaSeleccionada">Horas Disponibles</h4>

                {sinHoras ? (
                  <>
                  <h6 className="CitaSeleccionada sinhoras">Ups! no hay horas disponibles.<br></br>Escoge otro dia por favor</h6>
                  </>
                ):(
                  <>
                  {botones.map((hora) => ( 
                    <button onClick={() => escogeHora(hora)} className={apa}>{hora}</button>
                ))}
                  </>
                )}
                 
                <div className="absolute">
                  
                  <label className="CitaSeleccionada">Nota</label> 
                  <textarea
                  className="form-control note"
                  placeholder={note}
                  rows="3"
                  onChange={(e)=>{setNote(e.target.value)}}
                  />
                  <h6 className="CitaSeleccionada">Fecha escogida</h6>

                  <h5 className="CitaSeleccionada">{fecha.replace("T", " ")}</h5>

                  <div className="absolute2">
                    <button type="submit" onClick={() => {editDate()}} className="btn btn-danger boton">Siguiente</button>
                  </div>

                </div>                

              </div>              
               
            </Col>
          </Row>
        </Container>

    </div>
    </ModalFooter>
   </Modal>
    </>
    )
}

export default EditSchedule