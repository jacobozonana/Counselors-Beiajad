import React from 'react'
import { Row, Col } from 'react-bootstrap';
import tel from '../../Imagenes/tel1.png'
import confia1 from '../../Imagenes/confia1.png'
import diploma from '../../Imagenes/diploma1.png'
import happi from '../../Imagenes/happi1.png'
import '../../index.css'



function Seccion2() {
    return (
      <Row className="seccion2">
          <Col  md={{ size: 3}}>
            <div className="card">
              <img src={tel} className="imagen" alt="Llamadas anonimas" />
              <div className="texto">
                <h5>Llamadas anónimas</h5>
                <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </div>
            </div>
          </Col>
          <Col  md={{ size: 3}}>
            <div className="card">
              <img src={confia1} className="imagen" alt="Llamadas anonimas" />
              <div className="texto">
                <h5>Confianza y discreción</h5>
                <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </div>
            </div>
          </Col>
          <Col  md={{ size: 3}}>
            <div className="card">
              <img src={diploma} className="imagen" alt="Llamadas anonimas" />
              <div className="texto">
                <h5>Personal calificado</h5>
                <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </div>
            </div>
          </Col>
          <Col  md={{ size: 3}}>
            <div className="card">
              <img src={happi} className="imagen" alt="Llamadas anonimas" />
              <div className="texto">
                <h5>Felicidad</h5>
                <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </div>
            </div>
          </Col>      
      </Row>         
      );
    };

export default Seccion2
