import flagSpain from '../../assets/pictures/flags/espana.png';
import flagFrance from '../../assets/pictures/flags/francia.png';
import flagPortugal from '../../assets/pictures/flags/portugal.png';
import flagGermany from '../../assets/pictures/flags/alemania.png';
import flagJapan from '../../assets/pictures/flags/japon.png';
import flagRussia from '../../assets/pictures/flags/rusia.png';
import flagUK from '../../assets/pictures/flags/reino-unido.png';
import flagItaly from '../../assets/pictures/flags/italia.png';
import flagSweden from '../../assets/pictures/flags/suecia.png';
import flagIndia from '../../assets/pictures/flags/india.png';
import flagChina from '../../assets/pictures/flags/porcelana.png';
import flagEmirates from '../../assets/pictures/flags/emiratos-arabes-unidos.png';
import ButtonGeneral from '../../Components/buttonGeneral/buttonGeneral';
import { Link, useNavigate } from 'react-router-dom';
import { Contexto } from "../../App";
import './GenerateInform.scss';
import { useContext, useEffect } from 'react';
import 'animate.css';



export default function GenerateInform() {
    

    const { languageSelectedList, setLanguageSelectedList } = useContext(Contexto);
    const navigate = useNavigate();

    console.log(languageSelectedList);

    const buttonChecker = () => {
        if (languageSelectedList.length === 0) {
            console.log("Selecciona al menos un idioma");
            
        } else if (languageSelectedList.length > 2) {
            console.log("Selecciona un máximo de 2 idiomas");
            
        } else {
            // setLanguageSelectedList(languageSelectedList);
            navigate('/generateInform/inform1');
            console.log("Todo correcto");
        }
    }

    useEffect(() => {
        
    }, [languageSelectedList]);


    

    let selectSpain = function(){
        if (!languageSelectedList.includes('es')) {
            document.querySelector('.separadorIdiomas--button--spain').classList.add('seleccionado');
            setLanguageSelectedList();
            languageSelectedList.push('es');
            console.log(languageSelectedList);
            console.log("Idioma añadido a la lista", languageSelectedList);
        } else if (languageSelectedList.includes('es')){
            document.querySelector('.separadorIdiomas--button--spain').classList.remove('seleccionado');
            languageSelectedList.splice(languageSelectedList.indexOf('es'), 1);
            console.log("Idioma eliminado de la lista", languageSelectedList);
        }
        
        // setIdioma("es");
        // console.log(idioma);
    }
    let selectFrance = function(){
        if (!languageSelectedList.includes('fr')) {
            document.querySelector('.separadorIdiomas--button--france').classList.add('seleccionado');
            languageSelectedList.push('fr');
            console.log("Idioma añadido a la lista", languageSelectedList);
        } else if (languageSelectedList.includes('fr')){
            document.querySelector('.separadorIdiomas--button--france').classList.remove('seleccionado');
            languageSelectedList.splice(languageSelectedList.indexOf('fr'), 1);
            console.log("Idioma eliminado de la lista", languageSelectedList);
        }
        // setIdioma("fr");
        // console.log(idioma);

    }
    let selectPortugal = function(){
        if (!languageSelectedList.includes('pt')) {
            document.querySelector('.separadorIdiomas--button--portugal').classList.add('seleccionado');
            languageSelectedList.push('pt');
            console.log("Idioma añadido a la lista", languageSelectedList);
        } else if (languageSelectedList.includes('pt')){
            document.querySelector('.separadorIdiomas--button--portugal').classList.remove('seleccionado');
            languageSelectedList.splice(languageSelectedList.indexOf('pt'), 1);
            console.log("Idioma eliminado de la lista", languageSelectedList);
        }
        // setIdioma("pt");
        // console.log(idioma);
    }
    let selectGermany = function(){
        if (!languageSelectedList.includes('de')) {
            document.querySelector('.separadorIdiomas--button--germany').classList.add('seleccionado');
            languageSelectedList.push('de');
            console.log("Idioma añadido a la lista", languageSelectedList);
        } else if (languageSelectedList.includes('de')){
            document.querySelector('.separadorIdiomas--button--germany').classList.remove('seleccionado');
            languageSelectedList.splice(languageSelectedList.indexOf('de'), 1);
            console.log("Idioma eliminado de la lista", languageSelectedList);
        }
        // setIdioma("de");
        // console.log(idioma);
    }
    let selectJapan = function(){
        if (!languageSelectedList.includes('ja')) {
            document.querySelector('.separadorIdiomas--button--japan').classList.add('seleccionado');
            languageSelectedList.push('ja');
            console.log("Idioma añadido a la lista", languageSelectedList);
        } else if (languageSelectedList.includes('ja')){
            document.querySelector('.separadorIdiomas--button--japan').classList.remove('seleccionado');
            languageSelectedList.splice(languageSelectedList.indexOf('ja'), 1);
            console.log("Idioma eliminado de la lista", languageSelectedList);
        }
        // setIdioma("ja");
        // console.log(idioma);
    }
    let selectRussia = function(){
        if (!languageSelectedList.includes('ru')) {
            document.querySelector('.separadorIdiomas--button--russia').classList.add('seleccionado');
            languageSelectedList.push('ru');
            console.log("Idioma añadido a la lista", languageSelectedList);
        } else if (languageSelectedList.includes('ru')){
            document.querySelector('.separadorIdiomas--button--russia').classList.remove('seleccionado');
            languageSelectedList.splice(languageSelectedList.indexOf('ru'), 1);
            console.log("Idioma eliminado de la lista", languageSelectedList);
        }
        // setIdioma("ru");
        // console.log(idioma);

    }
    let selectUK = function(){
        if (!languageSelectedList.includes('en')) {
            document.querySelector('.separadorIdiomas--button--uk').classList.add('seleccionado');
            languageSelectedList.push('en');
            console.log("Idioma añadido a la lista", languageSelectedList);
        } else if (languageSelectedList.includes('en')){
            document.querySelector('.separadorIdiomas--button--uk').classList.remove('seleccionado');
            languageSelectedList.splice(languageSelectedList.indexOf('en'), 1);
            console.log("Idioma eliminado de la lista", languageSelectedList);
        }
        // setIdioma("en");
        // console.log(idioma);

    }
    let selectItaly = function(){
        if (!languageSelectedList.includes('it')) {
            document.querySelector('.separadorIdiomas--button--italy').classList.add('seleccionado');
            languageSelectedList.push('it');
            console.log("Idioma añadido a la lista", languageSelectedList);
        } else if (languageSelectedList.includes('it')){
            document.querySelector('.separadorIdiomas--button--italy').classList.remove('seleccionado');
            languageSelectedList.splice(languageSelectedList.indexOf('it'), 1);
            console.log("Idioma eliminado de la lista", languageSelectedList);
        }
        // setIdioma("it");
        // console.log(idioma);

    }
    let selectSweden = function(){
        if (!languageSelectedList.includes('sv')) {
            document.querySelector('.separadorIdiomas--button--sweeden').classList.add('seleccionado');
            languageSelectedList.push('sv');
            console.log("Idioma añadido a la lista", languageSelectedList);
        } else if (languageSelectedList.includes('sv')){
            document.querySelector('.separadorIdiomas--button--sweeden').classList.remove('seleccionado');
            languageSelectedList.splice(languageSelectedList.indexOf('sv'), 1);
            console.log("Idioma eliminado de la lista", languageSelectedList);
        }
        // setIdioma("sv");
        // console.log(idioma);

    }
    let selectIndia = function(){
        if (!languageSelectedList.includes('hi')) {
            document.querySelector('.separadorIdiomas--button--india').classList.add('seleccionado');
            languageSelectedList.push('hi');
            console.log("Idioma añadido a la lista", languageSelectedList);
        } else if (languageSelectedList.includes('hi')){
            document.querySelector('.separadorIdiomas--button--india').classList.remove('seleccionado');
            languageSelectedList.splice(languageSelectedList.indexOf('hi'), 1);
            console.log("Idioma eliminado de la lista", languageSelectedList);
        }
        // setIdioma("hi");
        // console.log(idioma);
    }
    let selectChina = function(){
        if (!languageSelectedList.includes('zh')) {
            document.querySelector('.separadorIdiomas--button--china').classList.add('seleccionado');
            languageSelectedList.push('zh');
            console.log("Idioma añadido a la lista", languageSelectedList);
        } else if (languageSelectedList.includes('zh')){
            document.querySelector('.separadorIdiomas--button--china').classList.remove('seleccionado');
            languageSelectedList.splice(languageSelectedList.indexOf('zh'), 1);
            console.log("Idioma eliminado de la lista", languageSelectedList);
        }
        // setIdioma("zh");
        // console.log(idioma);
    }
    let selectEmirates = function(){
        if (!languageSelectedList.includes('ar')) {
            document.querySelector('.separadorIdiomas--button--arab').classList.add('seleccionado');
            languageSelectedList.push('ar');
            console.log("Idioma añadido a la lista", languageSelectedList);
        } else if (languageSelectedList.includes('ar')){
            document.querySelector('.separadorIdiomas--button--arab').classList.remove('seleccionado');
            languageSelectedList.splice(languageSelectedList.indexOf('ar'), 1);
            console.log("Idioma eliminado de la lista", languageSelectedList);
        }
        // setIdioma("ar");
        // console.log(idioma);
    }




    return (<>
    <div className='generateInform'>
        <div className='generateInform__cerrar'>
            <Link to={'/main'}> <img className='generateInform__cerrar--img' src='https://cdn.zeplin.io/5e2a11b5ca786f8064774510/assets/9419C1A3-4787-4177-B727-B2338C933115.png' alt=''/> </Link>
        </div>
        <div className='generateInform__titulo'>
            <h2 className='generateInform__titulo--h2'>Vamos a generar el</h2>
            <h2 className='generateInform__titulo--h2'>informe de tu Diario.</h2>
        </div>
        <div className='generateInform__descripcion'>
            <h3 className='generateInform__descripcion--h3'>Selecciona un período, personaliza tu</h3>
            <h3 className='generateInform__descripcion--h3'>informe mediante filtro y elige un idioma.</h3>
        </div>



        <div className='generateInform__selectorFechas'>
            <input className='generateInform__selectorFechas--input' type='date' placeholder='Fecha inicio'/>
            <input className='generateInform__selectorFechas--input' type='date' placeholder='Fecha fin'/>
        </div>


    </div>
    <div className="selectLanguage">
        <div className="selectLanguage__divFlags1">
            <div className='separadorIdiomas'><img className='separadorIdiomas--img' onClick={selectSpain} src={flagSpain} alt="spain" /> <button onClick={selectSpain} className='separadorIdiomas--button--spain seleccionado'>Español</button> </div>

            <div className='separadorIdiomas'><img className='separadorIdiomas--img' onClick={selectFrance} src={flagFrance} alt="france" /><button onClick={selectFrance} className='separadorIdiomas--button--france'>Francés</button></div>

            <div className='separadorIdiomas'><img className='separadorIdiomas--img' onClick={selectPortugal} src={flagPortugal} alt="portugal" /><button  onClick={selectPortugal} className='separadorIdiomas--button--portugal'>Portugués</button></div>

            <div className='separadorIdiomas'><img className='separadorIdiomas--img' onClick={selectGermany} src={flagGermany} alt="germany" /><button onClick={selectGermany} className='separadorIdiomas--button--germany'>Alemán</button></div>

            <div className='separadorIdiomas'><img className='separadorIdiomas--img' onClick={selectJapan} src={flagJapan} alt="japan" /><button onClick={selectJapan} className='separadorIdiomas--button--japan'>Japonés</button></div>

            <div className='separadorIdiomas'><img className='separadorIdiomas--img' onClick={selectRussia} src={flagRussia} alt="russia" /><button onClick={selectRussia} className='separadorIdiomas--button--russia'>Ruso</button></div>
            
        </div>
        <div className="selectLanguage__divFlags2">
            <div className='separadorIdiomas'><img className='separadorIdiomas--img' onClick={selectUK} src={flagUK} alt="uk" /> <button onClick={selectUK} className='separadorIdiomas--button--uk'>Inglés</button> </div>

            <div className='separadorIdiomas'><img className='separadorIdiomas--img' onClick={selectItaly} src={flagItaly} alt="italy" /> <button onClick={selectItaly} className='separadorIdiomas--button--italy'>Italiano</button> </div>

            <div className='separadorIdiomas'><img className='separadorIdiomas--img' onClick={selectSweden} src={flagSweden} alt="sweden" /> <button onClick={selectSweden} className='separadorIdiomas--button--sweeden'>Sueco</button> </div>

            <div className='separadorIdiomas'><img className='separadorIdiomas--img' onClick={selectIndia} src={flagIndia} alt="india" /> <button onClick={selectIndia} className='separadorIdiomas--button--india'>Indú</button> </div>

            <div className='separadorIdiomas'><img className='separadorIdiomas--img' onClick={selectChina} src={flagChina} alt="china" /> <button onClick={selectChina} className='separadorIdiomas--button--china'>Chino</button> </div>

            <div className='separadorIdiomas'><img className='separadorIdiomas--img' onClick={selectEmirates} src={flagEmirates} alt="emirates" /> <button onClick={selectEmirates} className='separadorIdiomas--button--arab'>Árabe</button> </div>

        </div>

    </div>


    <div className='divBotonFinalCrear'>
    <p>Selecciona uno ó dos idiomas</p>
        <div className='botonFinalCrear' onClick={buttonChecker}><ButtonGeneral text='Crear' /></div>
    </div>
    
    </>);
}