import React from 'react'
import { Container, Row, Col } from 'reactstrap';
import './Seccion3.css'
import Foto1 from '../../Imagenes/secretaria.jpg'
import Manos from '../../Imagenes/libre.jpg'

function Seccion3() {
    return (
        <>
             <Container className="themed-container" fluid={true}>
             <Row>
              <Col className="Col" md="12" lg={{ size: 6}}>
                 <h4 className="pregunta">¿Que es el Counseling?</h4>
                 <h5 className="respuesta">
                 El Conseling, traducida como Consultoría Psicológica, es una profesión de ayuda que promueve el desarrollo personal. Ofrece una relación y espacio cálido para facilitar el autoconocimiento, invitando al consultante a descubrirse y explorar un nuevo modo de ser y estar en el mundo para una mejor calidad de vida.
                 <br/><br/>
                 Así también, actúa en el área de la prevención y promueve el despliegue de las potencialidades. 
                 Se acompaña y preserva el bienestar psiquíco-emocional para una óptima relación intra e interpersonal; es decir, consigo mismo y con los demás.   
                 </h5>          
              </Col>
              <Col className="Col" md="12" lg={{ size: 6}}>
                 <img className="Foto" src={Foto1} alt=""/>
              </Col>
             </Row>

             <Row>
              <Col className="Col" md="12" lg={{ size: 6}}>
                 <img className="Foto2" src={Manos} alt=""/>
              </Col>
              <Col className="Col" md="12" lg={{ size: 6}}>
                 <h4 className="pregunta">¿Cuándo debo considerar el Counseling como una opción?</h4>
                 <h5 className="respuesta">
                    Si estás atravesando cambios, conflictos, toma de decisiones, duelos, crisis vitales, dificultades... 
                    <br/>
                    Probá el counseling!!!
                    <br/>
                    Si estás confundido, bloqueado, algo desanimado... podemos orientarte, acompañarte  a que te conectes y encuentres la opción más efectiva para ti. 
                    <br/>
                    Nuestra ayuda esta dirigida a personas que necesitan un momento de escucha activa y contención emocional para lograr la mejor versión de sí mismos en cada momento de la vida y situación que se les presente.
                    <br/>
                    Si necesitas vivir de una manera más satisfactoria y plena, contáctanos!!!</h5>           
              </Col>
             </Row>
             
             </Container>
          
        </>
    )
}

export default Seccion3
