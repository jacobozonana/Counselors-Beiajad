import React, { Component } from "react";
import Faq from "react-faq-component";
import { Container, Row, Col } from 'reactstrap';
import './Preguntas.css'

function Preguntas() {

    const data = {
        title: "¿Qué es y cómo funciona Counselors Beiajad?",
        rows: [
            {
                title: "Lorem ipsum dolor sit amet,",
                content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tempor sem. Aenean vel turpis feugiat, 
                  ultricies metus at, consequat velit. Curabitur est nibh, varius in tellus nec, mattis pulvinar metus. 
                  In maximus cursus lorem, nec laoreet velit eleifend vel. Ut aliquet mauris tortor, sed egestas libero interdum vitae. 
                  Fusce sed commodo purus, at tempus turpis.`,
            },
            {
                title: "Nunc maximus, magna at ultricies elementum",
                content:
                    "Nunc maximus, magna at ultricies elementum, risus turpis vulputate quam, vitae convallis ex tortor sed dolor.",
            },
            {
                title: "Curabitur laoreet, mauris vel blandit fringilla",
                content: `Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem. 
                Fusce tempor lacus ut libero posuere viverra. Nunc velit dolor, tincidunt at varius vel, laoreet vel quam. 
                Sed dolor urna, lobortis in arcu auctor, tincidunt mattis ante. Vivamus venenatis ultricies nibh in volutpat. 
                Cras eu metus quis leo vestibulum feugiat nec sagittis lacus.Mauris vulputate arcu sed massa euismod dignissim. `,
            },
            {
                title: "What is the package version",
                content: "v1.0.0",
            },
        ],
    };
    const data2 = {
        title: "Formas de pago",
        rows: [
            {
                title: "Lorem ipsum dolor sit amet,",
                content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tempor sem. Aenean vel turpis feugiat, 
                  ultricies metus at, consequat velit. Curabitur est nibh, varius in tellus nec, mattis pulvinar metus. 
                  In maximus cursus lorem, nec laoreet velit eleifend vel. Ut aliquet mauris tortor, sed egestas libero interdum vitae. 
                  Fusce sed commodo purus, at tempus turpis.`,
            },
            {
                title: "Nunc maximus, magna at ultricies elementum",
                content:
                    "Nunc maximus, magna at ultricies elementum, risus turpis vulputate quam, vitae convallis ex tortor sed dolor.",
            },
            {
                title: "Curabitur laoreet, mauris vel blandit fringilla",
                content: `Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem. 
                Fusce tempor lacus ut libero posuere viverra. Nunc velit dolor, tincidunt at varius vel, laoreet vel quam. 
                Sed dolor urna, lobortis in arcu auctor, tincidunt mattis ante. Vivamus venenatis ultricies nibh in volutpat. 
                Cras eu metus quis leo vestibulum feugiat nec sagittis lacus.Mauris vulputate arcu sed massa euismod dignissim. `,
            },
        ],
    };
     
    const styles = {
        bgColor: '#ffffff' ,
        titleTextColor: "black",
        rowTitleColor: "#003cff",
        rowContentColor: 'black',
        arrowColor: "blue",
        rowContentPaddingTop: '10px',
        rowContentPaddingRight: '15px',     
    };
     
    const config = {
        animate: true,
        arrowIcon: "↓",
    };

    return (
        <>

        <Container className="themed-container" fluid={true}>
         <h1 className="h1">Peguntas Frecuentes</h1>

         <Row>
          <Col  md="12" lg={{ size: 6}}>
            <div className="faq">
            <Faq data={data} styles={styles} config={config}/>
            </div>
          </Col>

          <Col md="12" lg={{ size: 6}}>
            <div  className="faq">
             <Faq  data={data2} styles={styles} config={config} />
            </div>
          </Col>
         </Row>

        </Container>  
        </>
    )
}

export default Preguntas
