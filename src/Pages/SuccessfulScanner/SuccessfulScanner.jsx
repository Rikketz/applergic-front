import React from "react";

// import "./styles/style.scss";

import  ButtonGeneral from "../../Components/buttonGeneral/buttonGeneral";

export function SuccessfulScanner() {
  return (
    <>
      <header className="header-scanner"></header>
      <main className="main-scanner">
        <img src="./assets/gesto-ok.jpg" alt="imagen-gesto" />
        <h4>Hemos terminado, ya puedes escanear tu primer producto.</h4>
      </main>
      <footer className="footer-scanner">
        <ButtonGeneral text={"Escanea un producto"} />
      </footer>
    </>
  );
}
