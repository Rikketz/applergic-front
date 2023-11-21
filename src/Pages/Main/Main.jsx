import ButtonGeneral from "../../Components/buttonGeneral/buttonGeneral";

import "./styles/styles.scss";
import menu from "./assets/menu.png";
import info from "./assets/info.png";
import logo from "./assets/Logo.png";
import home from "./assets/home-activate.png";
import star from "./assets/star.png";
import notebook from "./assets/notebook.png";
import share from "./assets/share.png";
import { Link } from "react-router-dom";
import Logout from "../../Components/Logout/Logout";

export default function Main() {
  return (
    <>
      <header className="header-main">
        <img src={menu} alt="menu-logo" className="img-header-main-menu"></img>
        <Logout/>
        {/* <img src={info} alt="info-logo" className="img-header-main"></img> */}
      </header>
      <main className="main-main">
        <img src={logo} alt="logo" className="img-main-main"></img>
        <h1>Applergic</h1>
        <p className="p-main-main">Mi guia alimentaria</p>
        <Link to="/camerapage"><ButtonGeneral text={"Escanear"} /></Link>
        <p className="p-main-main">Escanea un nuevo producto</p>
        <ButtonGeneral text={"Buscar"} />
        <p className="p-main-main">Busca un comercio o restaurante para ti</p>
        <ButtonGeneral text={"S.O.S."} />
        <p className="p-main-main">
          ¿Necesitas ayuda urgente? contactamos con emergencias.
        </p>
      </main>
      <footer className="footer-main">
        <img
          src={home}
          alt="logo-home-activate"
          className="img-footer-main"
        ></img>
        <Link to="/valoracion">
          <img src={star} alt="logo-star" className="img-footer-main" />
        </Link>
        <img
          src={notebook}
          alt="logo-notebook"
          className="img-footer-main"
        ></img>
        <img src={share} alt="logo-share" className="img-footer-main"></img>
      </footer>
    </>
  );
}
