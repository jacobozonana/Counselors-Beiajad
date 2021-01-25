import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../contexts/AuthContext';
import { Calendar } from "react-modern-calendar-datepicker";
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios'
import Citas from '../Citas/Citas'
import Swal from 'sweetalert2'
import '../../index.css'
import "react-modern-calendar-datepicker/lib/DatePicker.css";

function Apointment() {


//---------------All this its react-modern-calendar-datepicker config---------------------------------
  const myCustomLocale = {
    // months list by order
    months: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
    ],
  
    // week days by order
    weekDays: [
      {
        name: 'Domingo', // used for accessibility 
        short: 'D', // displayed at the top of days' rows
        isWeekend: true, // is it a formal weekend or not?
      },
      {
        name: 'Lunes',
        short: 'L',
      },
      {
        name: 'Martes',
        short: 'M',
      },
      {
        name: 'Miercoles',
        short: 'M',
      },
      {
        name: 'Jueves',
        short: 'J',
      },
      {
        name: 'Viernes',
        short: 'V',
      },
      {
        name: 'Sabado',
        short: 'S',
        isWeekend: true,
      },
    ],
  
    // just play around with this number between 0 and 6
    weekStartingIndex: 0,
  
    // return a { year: number, month: number, day: number } object
    getToday(gregorainTodayObject) {
      return gregorainTodayObject;
    },
  
    // return a native JavaScript date here
    toNativeDate(date) {
      return new Date(date.year, date.month - 1, date.day);
    },
  
    // return a number for date's month length
    getMonthLength(date) {
      return new Date(date.year, date.month, 0).getDate();
    },
  
    // return a transformed digit to your locale
    transformDigit(digit) {
      return digit;
    },
  
    // texts in the date picker
    nextMonth: 'Next Month',
    previousMonth: 'Previous Month',
    openMonthSelector: 'Open Month Selector',
    openYearSelector: 'Open Year Selector',
    closeMonthSelector: 'Close Month Selector',
    closeYearSelector: 'Close Year Selector',
    defaultPlaceholder: 'Select...',
   
    // used for input value when multi dates are selected
    digitSeparator: ',',
  
    // if your provide -2 for example, year will be 2 digited
    yearLetterSkip: 0,
  
    // is your language rtl or ltr?
    isRtl: false,
  }
  
  let d = new Date();
  let year = d.getFullYear();
  let month = d.getMonth()+1;
  let day = d.getDate();

  const defaultValue = {
    year: year,
    month: month,
    day: day,
  };

//-------------------------------------------------------------------------------------------------


    const { user1, isAuth } = useContext(AuthContext)    
    const DOCGET = `http://localhost:8000/api/v1/doctors/${user1.id}`
    const SCHPOST = `http://localhost:8000/api/v1/schedule/${user1.id}`
    const [schedule, setSchedule] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [note, setNote] = useState('Escribe aqui algun comentario a tu cita')
    const [user] = useState(user1.id)
    const [doctor, setDoctor] = useState(user1.id)
    const [usrdates, setUsrdates] = useState([])
    const [usdat, setUsdat] = useState([])
    const [selectedDay, setSelectedDay] = useState(defaultValue);
    const [fecha, setFecha] = useState('')
    const [data, setData] = useState([]);
    const [botones, setBotones] = useState (["10:00","11:00","12:00","13:00","14:00","15:00"])
    const [borbot, setBorbot] = useState ([])
    const [apa, setApa] = useState("btn btn-info boton apagado")
    const [sinHoras, setSinHoras] = useState (false) 
    const excludeColumns = ["_id", "is_active", "createdAt", "updatedAt"];   // excluye datos del arreglo del filtro
    const SCHDOCGET = `http://localhost:8000/api/v1/schedulesbydoctor/${user1.id}/${doctor}`
    const SCHUSRGET = `http://localhost:8000/api/v1/schedulesbyuser/${user1.id}/${user1.id}`
   
//---------------All this its react-modern-calendar-datepicker config---------------------------------
  
    const disabledDays = usdat;
    const handleDisabledSelect = disabledDay => {
      console.log('Tried selecting a disabled day', disabledDay);
    };
    
//------------------------------------------------------------------------------------------------------

    
    useEffect(() => {
        axios.get(SCHUSRGET, {
          headers: {
            Authorization: `Bearer: ${localStorage.getItem("app_token")}`,
          },
        })
        .then((data) => (setUsrdates(data.data)))
        .catch((err) => console.log(err));

        axios.get(DOCGET, {
          headers: {
            Authorization: `Bearer: ${localStorage.getItem("app_token")}`,
          },
        })
        .then((data) => (setDoctors(data.data)))
        .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
      axios.get(SCHDOCGET, {
        headers: {
          Authorization: `Bearer: ${localStorage.getItem("app_token")}`,
        },
      })
      .then((data) => (setSchedule(data.data)))
      .catch((err) => console.log(err));
    }, [doctor])

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

     useEffect(() => {
      udates()
    }, [usrdates])
    
      const udates = () => {
        let usdates = [] 
          usrdates.map((info) => (           
          usdates.push(info.date)))  
          let year = usdates.map(v => parseInt( v.slice(0, 4)))
          let month = usdates.map(v => parseInt(v.slice(5, 7)))
          let day = usdates.map(v => parseInt(v.slice(8, 10)))
          let datos  = [];
      
          for(var i= 0; i < year.length; i++) {
            datos.push({ 
                  "year"    : year[i],
                  "month"  : month[i],
                  "day"    : day[i] 
              });
              setUsdat(datos)
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
          axios.post(SCHPOST, {
        
            date,
            time,
            note,
            user: user,
            doctor: doctor,
      
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
     {isAuth ? (
        <div className="calendar1">
          <Container fluid>
            <Row >
              <Col s="4">
                
                <label className="bienvenido">Escoge tu doctor</label>
                  <select onChange={(e) => {setDoctor(e.target.value)}}>
                    {doctors.map((user, i) => (
                      <option key={i} value={user._id}>{user.first_name}</option>
                     ))}
                  </select>  

                <h1>Escoge tu cita</h1>
                <Calendar
                  value={selectedDay}
                  onChange={setSelectedDay, (e)=>{diaSeleccionado(e)}}
                  colorPrimary="#25a1b7"
                  calendarClassName="responsive-calendar" // added this
                  locale={myCustomLocale} // custom locale object
                  disabledDays={disabledDays} // here we pass them
                  onDisabledDayError={handleDisabledSelect} // handle error
                  shouldHighlightWeekends
                  ClassName="custom-today-day"
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
                    {botones.map((hora, i) => ( 
                      <button onClick={() => escogeHora(hora, i)} key={i} className={apa}>{hora}</button>
                  ))}
                    </>
                  )}
                  
                  <div className="absolute">
                    
                    <label className="CitaSeleccionada">Nota</label> 
                    <textarea
                    className="note"
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
      ) : (
        undefined
      )} 
    </>
    )
}

export default Apointment