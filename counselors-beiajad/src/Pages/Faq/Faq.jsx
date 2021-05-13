import React from "react";
import Preguntas from "../../Components/Preguntas/Preguntas";
import Header from "../../Components/Layout/Header/Header";
import Footer from "../../Components/Layout/Footer/Footer";
import Whatsapp from "../../Components/Whatsapp/Whatsapp";

function Faq() {
  return (
    <div>
      <Header />
      <Preguntas />
      <Footer />
      <Whatsapp />
    </div>
  );
}

export default Faq;
