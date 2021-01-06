import React from 'react'
import { Card, Row, Col } from 'react-bootstrap';
import tel from '../../Imagenes/tel1.png'
import confia1 from '../../Imagenes/confia1.png'
import diploma from '../../Imagenes/diploma1.png'
import happi from '../../Imagenes/happi1.png'
import './Seccion2.css'



function Seccion2() {
    return (
      <Row className="seccion2">
      <Col  md={{ size: 3}}>
      <Card className="card">
          <Card.Img top width="50%" className="imagen" src={tel} alt="Card image cap" />
            <Card.Body>
              <Card.Title className="texto">Llamadas Anonimas</Card.Title>
              <Card.Text className="texto">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt molestiae, harum sint voluptate nihil cupiditate expedita.</Card.Text>
            </Card.Body>
          </Card>
      </Col>
      <Col md={{ size: 3}}>
      <Card className="card">
            <Card.Img top width="50%" className="imagen" src={confia1} alt="Card image cap" />
            <Card.Body>
              <Card.Title className="texto">Confianza y Discrecion</Card.Title>
              <Card.Text className="texto">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt molestiae, harum sint voluptate nihil cupiditate expedita.</Card.Text>            
              </Card.Body>
          </Card>   
      </Col>
      <Col md={{ size: 3}}>
      <Card className="card">
            <Card.Img top width="50%" className="imagen" src={diploma} alt="Card image cap" />
            <Card.Body>
              <Card.Title className="texto">Personal Calificado</Card.Title>
              <Card.Text className="texto">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt molestiae, harum sint voluptate nihil cupiditate expedita.</Card.Text>            
              </Card.Body>
          </Card>   
      </Col>
      <Col md={{ size: 3}}>
      <Card className="card">
            <Card.Img top width="50%" className="imagen" src={happi} alt="Card image cap" />
            <Card.Body>
              <Card.Title className="texto">Felicidad</Card.Title>
              <Card.Text className="texto">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt molestiae, harum sint voluptate nihil cupiditate expedita.</Card.Text>            
              </Card.Body>
          </Card>  
      </Col>
     </Row>         
      );
    };

export default Seccion2
