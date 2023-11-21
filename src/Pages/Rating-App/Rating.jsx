import React, { useState } from "react";
import axios from "axios";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "./styles/style.scss";

import applergic from "./assets/Logo.png";
import back from "./assets/back.png";

import ButtonGeneral from "../../Components/buttonGeneral/buttonGeneral";
import { Rating } from "primereact/rating";
import { Link } from "react-router-dom";

export default function RatingApp() {
  const [value, setValue] = useState(null);

  const enviarSugerencias = () => {
    if (value !== null) {
      const data = {
        ratingValue: value,
      };

      axios
        .post("http://localhost:5053/enviar-rating", data)
        .then((response) => {
          console.log("Respuesta de la API:", response.data);
        })
        .catch((error) => {
          console.error("Error al enviar el rating:", error);
        });
    }
  };

  return (
    <>
      <header className="header-rating">
        <Link to="/main">
          <div className="header-rating-div">
            <img
              src={back}
              alt="back-logo"
              className="img-header-rating-back"
            />
            <span className="span-header-rating">Volver</span>
          </div>
        </Link>
      </header>
      <main className="main-rating">
        <img src={applergic} alt="logo-applergic" className="img-main-rating" />
        <h3 className="h3-main-rating">¡Gracias por usar Applergic!</h3>
        <h4 className="h4-main-rating">Por favor, evalua tu experiencia.</h4>
        <Rating
          value={value}
          onChange={(e) => setValue(e.value)}
          cancel={false}
        />
      </main>
      <footer className="footer-rating">
        <Link to="/main">
          <ButtonGeneral text={"Enviar sugerencias"} />
        </Link>
      </footer>
    </>
  );
}
