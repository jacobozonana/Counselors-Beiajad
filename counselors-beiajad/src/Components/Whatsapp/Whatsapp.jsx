import React from "react";
import WhatsAppWidget from "react-whatsapp-widget";
import "react-whatsapp-widget/dist/index.css";

function Whatsapp() {
  return (
    <div className="fixed">
      <WhatsAppWidget phoneNumber={process.env.REACT_APP_WHATSAPP} textReplyTime="Nos toma poco tiempo contestar" companyName="Counselors Beiajad" sendButton='Enviar' message='Hola! 👋🏼, que podemos hacer por ti?'/>
    </div>
  );
}

export default Whatsapp;
