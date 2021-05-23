import React from "react";
import WhatsAppWidget from "react-whatsapp-widget";
import "react-whatsapp-widget/dist/index.css";
import useWindowWidthAndHeight from "../useWindowWidthAndHeight/useWindowWidthAndHeight";
import { Form, Button, Modal, Col } from "react-bootstrap";

function Whatsapp() {
  const [width, height] = useWindowWidthAndHeight();

  return (
    <div className="fixed">
      {width > 1000 ? (
        <WhatsAppWidget
          phoneNumber={process.env.REACT_APP_WHATSAPP}
          textReplyTime="Nos toma poco tiempo contestar"
          companyName="Counselors Beiajad"
          sendButton="Enviar"
          message="Hola! 👋🏼, que podemos hacer por ti?"
        />
      ) : (
        <a
          href="https://wa.me/525552987646?text=Hola!%20Me%20gustaría%20saber%20mas%20informacion"
          class="whatsapp"
          target="_blank"
        >
          {" "}
          <i className="fa fa-whatsapp whatsapp-icon"></i>
        </a>
      )}
    </div>
  );
}

export default Whatsapp;
