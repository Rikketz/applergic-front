import React, { useState } from "react";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "./styles/style.scss";

import  ButtonGeneral  from "../../Components/buttonGeneral/buttonGeneral";
import { Rating } from "primereact/rating";

export function RatingApp() {
  const [value, setValue] = useState(null);

  return (
    <>
      <header className="header-rating"></header>
      <main className="main-rating">
        <img src="./assets/Logo.png" alt="logo-applergic" />
        <h5>¡Gracias por usar Applergic!</h5>
        <h6>Por favor, evalua tu experiencia.</h6>
        <Rating
          value={value}
          onChange={(e) => setValue(e.value)}
          cancel={false}
        />
      </main>
      <footer className="footer-rating">
        <ButtonGeneral text={"Enviar sugerencias"} />
      </footer>
    </>
  );
}
