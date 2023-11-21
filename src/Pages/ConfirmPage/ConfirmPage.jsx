import React from "react";

import "./styles/style.scss";

import close from "./assets/close.png";
import ButtonGeneral from "../../Components/buttonGeneral/buttonGeneral";

import { Link } from "react-router-dom";

export default function ConfirmPage() {
  return (
    <>
      <header className="header-confirm">
        <Link to="/main" className="a-header-confirm-close">
          <img
            src={close}
            alt="close-logo"
            className="img-header-confirm-close"
          />
        </Link>
      </header>
      <main className="main-confirm">
        <h2 className="h2-main-confirm">Confirma tu selección.</h2>
        <h4>
          A continuación te resumimos los alimentos registrados como peligrosos
          para ti.
        </h4>
      </main>
      <footer className="footer-confirm">
        <Link to="/escaner">
          <ButtonGeneral text={"Confirmar"} />
        </Link>
      </footer>
    </>
  );
}
