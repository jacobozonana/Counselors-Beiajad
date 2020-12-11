import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import './Apointment.css'
import { AuthContext } from '../../contexts/AuthContext';
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";
import { Container, Row, Col } from 'reactstrap';
import Citas from '../Citas/Citas'
import Swal from 'sweetalert2'

function Apointment() {
  
  let d = new Date();
  let year = d.getFullYear();
  let month = d.getMonth()+1;
  let day = d.getDate();

  const defaultValue = {
    year: year,
    month: month,
    day: day,
  };
  
    const { user1 } = useContext(AuthContext)    
    const URL = "http://localhost:8000/api/v1/schedule/"
    const [schedule, setSchedule] = useState([]);
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [note, setNote] = useState('Escribe aqui algun comentario a tu cita')
    const [user] = useState(user1.id)
    const [selectedDay, setSelectedDay] = useState(defaultValue);
    const [fecha, setFecha] = useState('')
    const [data, setData] = useState([]);
    const [botones, setBotones] = useState (["10:00","11:00","12:00","13:00","14:00","15:00"])
    const [borbot, setBorbot] = useState ([])
    const [apa, setApa] = useState("btn btn-info boton apagado")
    const [sinHoras, setSinHoras] = useState (false) 
    const excludeColumns = ["_id", "is_active", "createdAt", "updatedAt"];   // excluye datos del arreglo del filtro
    
    
    useEffect(() => {
      axios
        .get(URL, {
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

    const saveDate = ()=>{
      Swal.fire({
        title: `Tu cita sera programada para el ${fecha.replace("T", " a las")} hrs.`,
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar cita',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          axios.post(URL, {
        
            date,
            time,
            note,
            user,
      
           },
           {
            headers: {
              Authorization: `Bearer: ${localStorage.getItem("app_token")}`,
            },
          }
           ).then(()=>{
               Swal.fire({
                icon: 'success',
                title: 'Nos vemos pronto',
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
               console.log(error)
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
      <div className="calendar">
        <Container fluid>
          <Row >
            <Col s="4">  

              <h1>Escoge tu cita</h1>
              <Calendar
                value={selectedDay}
                onChange={setSelectedDay, (e)=>{diaSeleccionado(e)}}
                shouldHighlightWeekends
                //calendarTodayClassName="custom-today-day"
              />                     
                
            </Col>
            <Col s="2">

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
                  <h6 className="CitaSeleccionada">Fecha escogida:</h6>

                  <h5 className="CitaSeleccionada">{fecha.replace("T", " ")}</h5>

                  <div className="absolute2">
                    <button type="submit" onClick={() => {saveDate()}} className="btn btn-danger boton">Siguiente</button>
                  </div>

                </div>                

              </div>              
               
            </Col>
            <Col lg="6">              
              <Citas />
            </Col>
          </Row>
        </Container>

    </div>
    </>
    )
}

export default Apointment