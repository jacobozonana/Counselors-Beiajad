import React from 'react'
import { Card, CardImg, CardTitle, CardText, CardGroup, CardBody, Row, Col } from 'reactstrap';
  import './Seccion2.css'
  import tel from '../../Imagenes/tel1.png'
  import confia1 from '../../Imagenes/confia1.png'
  import diploma from '../../Imagenes/diploma1.png'
  import happi from '../../Imagenes/happi1.png'


function Seccion2() {
    return (
      <CardGroup className="seccion2">
      <Row>
      <Col  md={{ size: 3}}>
      <Card className="card">
          <CardImg top width="50%" className="imagen" src={tel} alt="Card image cap" />
            <CardBody>
              <CardTitle className="texto">Llamadas Anonimas</CardTitle>
              <CardText className="texto">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt molestiae, harum sint voluptate nihil cupiditate expedita.</CardText>
            </CardBody>
          </Card>
      </Col>
      <Col md={{ size: 3}}>
      <Card className="card">
            <CardImg top width="50%" className="imagen" src={confia1} alt="Card image cap" />
            <CardBody>
              <CardTitle className="texto">Confianza y Discrecion</CardTitle>
              <CardText className="texto">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt molestiae, harum sint voluptate nihil cupiditate expedita.</CardText>            </CardBody>
          </Card>   
      </Col>
      <Col md={{ size: 3}}>
      <Card className="card">
            <CardImg top width="50%" className="imagen" src={diploma} alt="Card image cap" />
            <CardBody>
              <CardTitle className="texto">Personal Calificado</CardTitle>
              <CardText className="texto">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt molestiae, harum sint voluptate nihil cupiditate expedita.</CardText>            </CardBody>
          </Card>   
      </Col>
      <Col md={{ size: 3}}>
      <Card className="card">
            <CardImg top width="50%" className="imagen" src={happi} alt="Card image cap" />
            <CardBody>
              <CardTitle className="texto">Felicidad</CardTitle>
              <CardText className="texto">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt molestiae, harum sint voluptate nihil cupiditate expedita.</CardText>            </CardBody>
          </Card>  
      </Col>
     </Row>         
     </CardGroup>
      );
    };

export default Seccion2
