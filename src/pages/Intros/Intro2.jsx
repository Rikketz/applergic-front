import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import IntroImage2 from "../../assets/segundaImagen.png";
import Carrousel2 from "../../assets/punto2.png";
import "./Intro2.scss";
import Flecha from "../../assets/flecha1.png";

export default function Intro2() {
  return (
    <>
      <div className="Intro2">
        <img src={Logo} alt="Logo Applergic" className="Intro2__image--logo" />
        <img
          src={IntroImage2}
          alt="Imagen de persona escribiendo"
          className="Intro2__image"
        />
        <div className="Intro2__paragraph">
          <p>Lleva tu Diario de</p>
          <p>compras y actividades.</p>
        </div>
      </div>
      <div className="Intro2__carousel">
        <img src={Carrousel2} alt="Imagen de carrousel 1" />
      </div>
      <div className="Intro2__navigation">
        <Link to="/login" className="Intro2__navigation--left">
          <p>Saltar</p>
        </Link>
        <Link to="/intro3" className="Intro2__navigation--right">
          <p>Siguiente</p>
          <img className="flecha" src={Flecha} alt="flecha a la derecha"></img>
        </Link>
      </div>
    </>
  );
}
