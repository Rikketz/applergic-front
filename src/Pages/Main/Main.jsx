import BlueButtonWithBarcode from "../../Components/buttonGeneral/blueButtonWithBarcode";

import "./styles/styles.scss";
// import menu from "./assets/menu.png";
import logo from "../../assets/logoApplergicFinal.png";
import home from "../../assets/homeAzul.png";
import star from "../../assets/favorito.png";
import notebook from "../../assets/diario.png";
import share from "../../assets/red.png";
import { Link } from "react-router-dom";
import Logout from "../../Components/Logout/Logout";
import Hamburguesa from "../../Components/Hamburguesa/Hamburguesa";
import GreyButtonWithSearch from "../../Components/buttonGeneral/greyButtonWithSearch";
import PinkButton from "../../Components/buttonGeneral/pinkButton";


export default function Main() {
  return (
    <>
      <header className="header-main">
      <Hamburguesa/>
        {/* <img src={menu} alt="menu-logo" className="img-header-main-menu"></img> */}
        <Logout />
        {/* <img src={info} alt="info-logo" className="img-header-main"></img> */}
      </header>

      <main className="main-main">
        <img src={logo} alt="logo" className="img-main-main"></img>
        {/* <h1>Applergic</h1>
        <p className="p-main-main">Mi guia alimentaria</p> */}
        <Link to="/camerapage">
          <BlueButtonWithBarcode text={"Escanear"} />
        </Link>
        <p className="p-main-main">Escanea un nuevo producto</p>

        <GreyButtonWithSearch  text={"Buscar"}/>
        {/* <ButtonGeneral text={"Buscar"} /> */}
        <p className="p-main-main">Busca un comercio o restaurante para ti</p>
        {/* <ButtonGeneral text={"S.O.S."} /> */}
        <PinkButton text={"S.O.S."} />
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
