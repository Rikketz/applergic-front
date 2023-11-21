import { useContext, useState } from 'react';
import './Hamburguesa.scss';
import 'animate.css';
import fotoPerfil from '../../assets/pictures/usuario.png';
import fotoFavorito from '../../assets/pictures/estrella.png';
import fotoDiario from '../../assets/pictures/diario.png';
import fotoCompartir from '../../assets/pictures/compartir.png';
import fotoTraducir from '../../assets/pictures/traductor.png';
import fotoHoja from '../../assets/pictures/documento.png';
import fotoSalir from '../../assets/pictures/salida-de-emergencia.png';
import { Contexto } from "../../App";
import { Link, useNavigate } from 'react-router-dom';



export default function Hamburguesa() {

    const navigate = useNavigate();
    const { setToken } = useContext(Contexto);

    const [buttonIsActivated, setButtonIsActivated] = useState(false);



    let toggleButton = function(){
            setButtonIsActivated(!buttonIsActivated);
            console.log(buttonIsActivated);
        }

    

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId"); 
        setToken(null);
        navigate("/login");
        };

    return(<>
        {buttonIsActivated && <div className='haFondoGris'> </div> }

        {buttonIsActivated && 
        <div className="haMenu animate__animated animate__fadeInLeft">
            <div className='haMenu__div'>
                <button onClick={toggleButton} className='haMenu__div--button'> <img className='haMenu__div--button--img' src='https://cdn.zeplin.io/5e2a11b5ca786f8064774510/assets/9419C1A3-4787-4177-B727-B2338C933115.png' alt=''/> </button>
            </div>
            <Link to={'/userprofile'}><p className="haMenu--a" > <img className="haMenu--a--img" src={fotoPerfil} alt=''></img> Perfil</p></Link>
            <p className="haMenu--a"> <img className="haMenu--a--img" src={fotoFavorito} alt=''></img> Favorito</p>
            <p className="haMenu--a"> <img className="haMenu--a--img" src={fotoDiario} alt=''></img> Diario</p>
            <p className="haMenu--a"> <img className="haMenu--a--img" src={fotoCompartir} alt=''></img> Compartir</p>
            <p className="haMenu--a"> <img className="haMenu--a--img" src={fotoTraducir} alt=''></img> Traductor</p>
            <p className="haMenu--a"> <img className="haMenu--a--img" src={fotoHoja} alt=''></img> Términos</p>
            <p className="haMenu--a blue-text"> <img className="haMenu--a--img" onClick={handleLogout} src={fotoSalir} alt=''></img> Salir</p>
            
        </div>}

        <div className="Hamburguesa">
            <button className='Hamburguesa__toggleButton' onClick={toggleButton}> <img className='Hamburguesa__toggleButton--img' src='https://cdn.zeplin.io/5e2a11b5ca786f8064774510/assets/CBFCD905-C712-401A-8FF1-7B5C8274A64A.png' alt='threelinesbutton'></img> </button>
        </div>        
</>
    )
}