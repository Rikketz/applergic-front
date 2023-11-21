import React from "react";

import "./styles/style.scss";

import gesto from "./assets/gesto-ok.jpg";
import back from "./assets/back.png";
import close from "./assets/close.png";
import ButtonGeneral from "../../Components/buttonGeneral/buttonGeneral";
import { Link } from "react-router-dom";

export default function FirstScanner() {
  return (
    <>
      <header className="header-scanner">
        <div className="header-scanner-div">
          <img src={back} alt="back-logo" className="img-header-scanner-back" />
          <span className="span-header-scanner">Volver</span>
        </div>
        <span className="span-header-scanner">4 de 4</span>
        <Link to="/Main" className="a-header-scanner-close">
          <img
            src={close}
            alt="close-logo"
            className="img-header-scanner-close"
          />
        </Link>
      </header>
      <main className="main-scanner">
        <img src={gesto} alt="imagen-gesto" className="img-main-scanner" />
        <h2 className="h2-main-scanner">
          Hemos terminado, ya puedes escanear tu primer producto.
        </h2>
      </main>
      <footer className="footer-scanner">
        <Link to="/Main">
          <ButtonGeneral text={"Escanea un producto"} />
        </Link>
      </footer>
    </>
  );
}
