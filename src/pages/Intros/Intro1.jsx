import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import IntroImage1 from '../../assets/primeraImagen.png';
import Carrousel1 from '../../assets/punto1.png';
import './Intros.scss';
import Flecha from '../../assets/flecha1.png';

export default function Intro1(){

    return (
        <>
          <div className="Intro">
            <img src={Logo} alt="Logo Applergic" className="Intro__image--logo" />
            <img
              src={IntroImage1}
              alt="Imagen de scanear producto con codigo de barra"
              className="Intro__image"
            />
            <p className="Intro__paragraph--p">
              ¡Bienvenido a <span>Applergic!</span>
            </p>
            <div className="Intro__paragraph">
            <p>
              Escanea el código de barras
            </p>
            <p>de tu producto y Applergic te</p>
            <p>dirá si es apto para ti.</p>
            </div>
          </div>
          <div className="Intro__carousel">
            <img src={Carrousel1} alt="Imagen de carrousel 1" />
          </div>
          <div className="Intro__navigation">
            <Link to="/login" className="Intro__navigation--left">
              <p>Saltar</p>
            </Link>
            <Link to="/intro2" className="Intro__navigation--right">
              <p>Siguiente</p><img className='flecha' src={Flecha} alt='flecha a la derecha'></img>
            </Link>
          </div>
        </>
      );
    }