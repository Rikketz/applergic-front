import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import IntroImage4 from "../../assets/cuartaImagen.png";
import Carrousel4 from "../../assets/punto4.png";
import "./Intro4.scss";

export default function Intro4() {
  return (
    <>
      <div className="Intro4">
        <img src={Logo} alt="Logo Applergic" className="Intro4__image--logo" />
        <img
          src={IntroImage4}
          alt="Imagen de ambulancia"
          className="Intro4__image"
        />
        <div className="Intro4__paragraph">
          <p>Viaja donde quieras. Tendrás a tu</p>
          <p>disposición un traductor off-line y tu</p>
          <p>informe de alergias e intolerancias</p>
          <p>traducido al idioma local.</p>
        </div>
      </div>
      <div className="Intro4__carousel">
        <img src={Carrousel4} alt="Imagen de carrousel 1" />
      </div>
      <div className="Intro4__navigation">
        <Link to="/login" className="Intro2__navigation--left">
          <p>Saltar</p>
        </Link>
        <Link to="/login" className="Intro4__navigation--right">
          <p>Terminar</p>
        </Link>
      </div>
    </>
  );
}
