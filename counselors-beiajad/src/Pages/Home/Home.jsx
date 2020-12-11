import React from 'react';
import Apointment from '../../Components/Apointment/Apointment'
import Header from '../../Components/Layout/Header/Header'
import Seccion3 from '../../Components/Seccion3/Seccion3'
import { AuthContext } from '../../contexts/AuthContext';
import { Button } from 'reactstrap';
import Seccion2 from '../../Components/Seccion2/Seccion2'
import Footer from '../../Components/Layout/Footer/Footer';
import './Home.css'
import { Container, Row, Col } from 'reactstrap';


function Home(props) {
  const { user1, isAuth } = React.useContext(AuthContext)
  return (
    <>
      <Header />    
      
      
        
        {isAuth ? (
        <>       
        <div id="start">
        <Container className="themed-container" fluid={true}>
        <h1 className="bienvenido">Hola, {user1.first_name }{user1.last_name }</h1>

        <Apointment />

        <Seccion2 />

        <Seccion3 />

        <Footer/>
        
        </Container>

       </div>
        </>
      ) : (
        <>
        <div id="start">
        <div className="seccion1">
                
                  <h1 className="texto1">Estabilidad emocional para tu vida diaria</h1>
                  <h4 className="texto2">Habla de forma segura y privada con una consultora psicológica de confianza cuando lo necesites.</h4>
                  <Button  href="/register" color="info">Comienza ahora</Button>{' '}
          
        </div>

        </div>
        <br/><br/>
        <Seccion2 />
        <br/><br/>
        <Seccion3 />
        <Footer/>
        </>
      )}

    </>
  );
}

export default Home;
