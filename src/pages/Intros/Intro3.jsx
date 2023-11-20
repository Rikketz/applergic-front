import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import IntroImage3 from "../../assets/tercerImagen.png";
import Carrousel3 from "../../assets/punto3.png";
import "./Intro3.scss";
import Flecha from "../../assets/flecha1.png";

export default function Intro3() {
  return (
    <>
      <div className="Intro3">
        <img src={Logo} alt="Logo Applergic" className="Intro3__image--logo" />
        <img
          src={IntroImage3}
          alt="Imagen de ambulancia"
          className="Intro3__image"
        />
        <div className="Intro3__paragraph">
          <p>En caso de emergencia nos</p>
          <p>pondremos en contacto con la</p>
          <p>persona que nos digas.</p>
        </div>
      </div>
      <div className="Intro3__carousel">
        <img src={Carrousel3} alt="Imagen de carrousel 1" />
      </div>
      <div className="Intro3__navigation">
        <Link to="/login" className="Intro2__navigation--left">
          <p>Saltar</p>
        </Link>
        <Link to="/intro4" className="Intro3__navigation--right">
          <p>Siguiente</p>
          <img className="flecha" src={Flecha} alt="flecha a la derecha"></img>
        </Link>
      </div>
    </>
  );
}
