import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link, Redirect } from 'react-router-dom'
import axios from "axios";
import { Table, Button, Container, Row, Col } from 'reactstrap';
import DeleteShedule from '../Delete/DeleteSchedule'
import EditSchedule from '../Editar/EditSchedule'
import Home from '../../Pages/Home/Home'

import { Calendar } from "react-modern-calendar-datepicker";
import './ScheduleList.css'
import { MDBContainer } from "mdbreact";
import Header from "../Layout/Header/Header";
import Footer from "../Layout/Footer/Footer";

function ScheduleList() {

  let d = new Date();
  let year = d.getFullYear();
  let month = d.getMonth()+1;
  let day = d.getDate();

  const defaultValue = {
    year: year,
    month: month,
    day: day,
  };


  const { isAuth } = useContext(AuthContext);
  const [schedule, setSchedule] = useState([]);
  const [data, setData] = useState([]);
  const [selectedDay, setSelectedDay] = useState(defaultValue);
  const [searchText, setSearchText] = useState()
  const [apa, setApa] = useState("btn btn-info off")
  const [apa1, setApa1] = useState("off")


  const excludeColumns = ["_id", "is_active", "createdAt", "updatedAt"];   // excluye datos del arreglo del filtro
  
  const scrollContainerStyle = { width: "100%", maxHeight: "400px" };
  
  
  const URL_GET_SCHEDULE = "http://localhost:8000/api/v1/schedule";

  useEffect(() => {
    axios
      .get(URL_GET_SCHEDULE, {
        headers: {
          Authorization: `Bearer: ${localStorage.getItem("app_token")}`,
        },
      })
      .then((data) => (setSchedule(data.data), setData(data.data)))
      .catch((err) => console.log(err));
  }, []);
     
  

  const toFind = (selectedDay) => {
    let dia = selectedDay.day
    let month = selectedDay.month
    let year = selectedDay.year
    if(month < 10){
      if(dia <10){
      filterData(`${year}-0${month}-0${dia}`);
      setSearchText(`0${dia}/0${month}/${year}`);
    }else{
      filterData(`${year}-0${month}-${dia}`);
      setSearchText(`${dia}/0${month}/${year}`);
    }
  }
  else {
    if (dia < 10) {
      filterData(`${year}-${month}-0${dia}`);
      setSearchText(`0${dia}/${month}/${year}`);
    }else{
      filterData(`${year}-${month}-${dia}`);
      setSearchText(`${dia}/${month}/${year}`);

      }
    }
  
    setApa("btn btn-info")
    setApa1("")

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

  const Todas = () => {
    setData(schedule)
    setSearchText(null);
    setApa("btn btn-info off")
    setApa1("off")
    }

   
  return (
    <>
    {isAuth ? (
      <> 
      <div className="headerSchedule">
      <Header/>
      </div>
     
    <Container className="themed-container" fluid={true}>
      <h1 className="titulo">Agenda</h1>
     <Row>
      <Col className="padCal"  xl={{ size: 4}}>

      <Calendar
      value={selectedDay}
      onChange={setSelectedDay, (e) => {toFind(e)}}
      shouldHighlightWeekends
      calendarTodayClassName="custom-today-day"
      />

      </Col>

     <Col xl={{ size: 8}}>

     <div className="fechaActual">
       <h1 id="searchText" className={apa1}>{searchText}</h1>
       <Button id="todas" className={apa} onClick={Todas}>Ver todas las citas</Button >
     </div>

     <MDBContainer>
      <div className="scrollbar scrollbar-info  mt-5 mx-auto" style={scrollContainerStyle}>
      <Table striped>
      <thead>
        <tr>
          
          <th className="absolute3">Fecha</th>
          <th className="absolute3">Hora</th>
          <th className="absolute3">Nota</th>
          <th className="absolute3">Nombre</th>
          <th className="absolute3">Apellido</th>
          <th className="absolute3">Tel</th>
          <th className="absolute3">Editar</th>
          <th className="absolute3">Borrar</th>

        </tr>
      </thead>
      <tbody>
      {data.map((user) => (
        <tr>         
          
          <td >{user.date.split("T")[0]}</td>
          <td >{user.time}</td>
          <td >{user.note}</td>
          <td >{user.user[0].first_name}</td>
          <td >{user.user[0].last_name}</td>
          <td >{user.user[0].tel}</td>
          <td><EditSchedule id={user._id}/></td>
          <td><DeleteShedule id={user._id}/></td>
            
        </tr>
        ))}
        
      </tbody>
    </Table>

    <div className="clearboth">
    {data.length === 0 && <span>Hoy no hay citas</span>}
    </div>

      </div>
    </MDBContainer>
   
      </Col>
    </Row>
   </Container>   
   
     
  
    <Footer/>
    </>
    ) : (
       <Home />
     )} 
    </>     
  );
}

export default ScheduleList;
