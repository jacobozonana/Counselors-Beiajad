import React from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Container, Button } from 'react-bootstrap';
import Apointment from '../../Components/Apointment/Apointment'
import Header from '../../Components/Layout/Header/Header'
import Seccion3 from '../../Components/Seccion3/Seccion3'
import Seccion2 from '../../Components/Seccion2/Seccion2'
import Footer from '../../Components/Layout/Footer/Footer';
import './Home.css'

function Home() {
  
  const { user1, isAuth } = React.useContext(AuthContext)

  return (
    <>    
        {isAuth ? (
        <>  
          <Header /> 
          <div id="start" className="seccion1">
            <Container className="themed-container" fluid={true}>
            <h1 className="bienvenido">Hola, {user1.first_name }{user1.last_name }</h1>
            <Apointment />
            </Container>
          </div>
          <Seccion2 />
          <Seccion3 />
          <Footer/>        
        </>
      ) : (
        <>
          <Header />
          <div id="start" className="seccion1">
            <Container className="themed-container" fluid={true}>
              <h1 className="texto1">Estabilidad emocional para tu vida diaria</h1>
              <Button  href="/register" variant="info">Comienza ahora</Button>{' '}
              <h4 className="texto2">Habla de forma segura y privada con una consultora psicológica de confianza cuando lo necesites.</h4>
            </Container>
          </div>
          <Seccion2 />
          <Seccion3 />
          <Footer/>
        </>
      )}
    </>
  );
}

export default Home;
