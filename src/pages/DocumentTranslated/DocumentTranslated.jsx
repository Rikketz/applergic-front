import React, { useContext, useEffect, useState } from 'react';
import { Contexto } from '../../App';
import html2pdf from 'html2pdf.js';
import DocumentTranslator from '../../Components/DocumentTranslator/DocumentTranslator';
import ButtonGeneral from '../../Components/buttonGeneral/buttonGeneral';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";


export default function DocumentTranslated() {


    // ENTORNO DE PRUEBAS

    const [username, setUsername] = useState('');


    // FIN ENTORNO DE PRUEBAS

    const { setIdioma, languageSelectedList, setLanguageSelectedList } = useContext(Contexto);
    const navigate = useNavigate();
    let codIdioma = languageSelectedList[0];
    console.log(languageSelectedList);
    const goBack = () => {
        window.history.back();
    };

    useEffect(() => {
        setIdioma(codIdioma);
        const token = localStorage.getItem('token'); // Obtener el token del localStorage
        if (token) {
            const decodedToken = jwtDecode(token); // Decodificar el token para obtener los datos del usuario
            if (decodedToken) {
                const { id, email } = decodedToken; // Obtener el id y el email del usuario
                fetch(`http://localhost:5053/user/getuser/${id}`) // Hacer una petición GET al backend
                .then((response) => response.json())
                .then((data) => {
                console.log(data);
                
                
            const alergiaLista = data.user.alergia;
            if (alergiaLista.length === 0) {
                console.log('No hay alergias');
            }
            const  nombreCompleto  = data.user.nombreCompleto; // Suponiendo que el nombre del usuario está en la propiedad 'name' de la respuesta del servidor
            console.log(nombreCompleto);
            setUsername(nombreCompleto); // Actualizar el estado con el nombre del usuario
            
            })
            .catch((error) => {
            console.error('Error al obtener el nombre del usuario:', error);
            });
        }}
    }, [languageSelectedList, setIdioma, codIdioma, setUsername]);

    const nextDoc = () => {
        codIdioma = languageSelectedList[1];
        navigate('/generateInform/inform2');
    }

    const generarPDF = () => {
        const input = document.querySelector('.documentTranslatedMainDiv');
        const pdfOptions = {
            margin: 10,
            filename: 'documento.pdf',
            image: { type: 'jpeg', quality: 0.98 }
        };

        html2pdf(input, pdfOptions)
            .from(input)
            .outputPdf()
            .then((pdf) => {
                const blob = new Blob([pdf], { type: 'application/pdf' });
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = 'documento.pdf';
                link.click();
            });
    }

    return (<>
    <div className="documentTranslatedMainDiv">
        <div className="documentTranslatedMainDiv__superior">
            <img onClick={goBack} className="documentTranslatedMainDiv__superior--img" src="https://cdn.zeplin.io/5e2a11b5ca786f8064774510/assets/778C0600-375F-416A-AEB4-8241161DC7CF.png" alt=""/>
            <Link to={'/'}><img className="documentTranslatedMainDiv__superior--img" src="https://cdn.zeplin.io/5e2a11b5ca786f8064774510/assets/517E8F96-1F82-4480-82FB-A847C7B97F91.png" alt=""/></Link>
        </div>
        <div className="documentTranslatedMainDiv__infoSuperior">
            <h3 className="documentTranslatedMainDiv__infoSuperior--h3">Este es el informe</h3>
            <h3 className="documentTranslatedMainDiv__infoSuperior--h3">basado en tu Diario.</h3>
            <h4 className="documentTranslatedMainDiv__infoSuperior--h4">Actividad del mes de 'MES' 'AÑO'.</h4>
            <h5 className="documentTranslatedMainDiv__infoSuperior--h5">IDIOMA</h5>
        </div>
        <div className="documentTranslatedMainDiv__middleDiv">
            <h5 className="documentTranslatedMainDiv__middleDiv--nombre"> <DocumentTranslator codIdioma={codIdioma} texto1={'Nombre'} />: {username}.</h5>
            <p className="documentTranslatedMainDiv__middleDiv--allergy"> <DocumentTranslator codIdioma={codIdioma} texto1={'Alérgico a'} />: <DocumentTranslator codIdioma={codIdioma} texto1={'Lista de alergias'} /> </p>
            <p className="documentTranslatedMainDiv__middleDiv--date"> <DocumentTranslator codIdioma={codIdioma} texto1={'Fecha'} />: <DocumentTranslator codIdioma={codIdioma} texto1={'23 de Noviembre de 2023'} /> </p>
            <p className="documentTranslatedMainDiv__middleDiv--newProducts"> <DocumentTranslator codIdioma={codIdioma} texto1={'Nuevos productos aptos incluidos en tu diario'} />. </p>
        </div>
        <div className="documentTranslatedMainDiv__infoInferior">
            <div className="documentTranslatedMainDiv__infoInferior__divFoto">
                <img className="documentTranslatedMainDiv__infoInferior__divFoto--img" src="https://cdn.zeplin.io/5e2a11b5ca786f8064774510/assets/14C0AA54-BB74-4621-9768-CF1FE99FCE4E.png" alt=""/>
                <div className="documentTranslatedMainDiv__infoInferior__divFoto__textos">
                    <p className="documentTranslatedMainDiv__infoInferior__divFoto__textos--date"> <DocumentTranslator codIdioma={codIdioma} texto1={'FECHA'} /> </p>
                    <p className="documentTranslatedMainDiv__infoInferior__divFoto__textos--name"> Nesquik 400g </p>
                </div>
            </div>
            <div className="documentTranslatedMainDiv__infoInferior__divIngredients">
                <p className="documentTranslatedMainDiv__infoInferior__divIngredients--ingredients"><span className="negrita"> <DocumentTranslator codIdioma={codIdioma} texto1={'Ingredientes'} /> </span>: <DocumentTranslator codIdioma={codIdioma} texto1={'INGREDIENTES SACADOS DE LA BASE DE DATOS DE DETERMINADO PRODUCTO'} /> </p>
            </div>
        </div>
        
        <div onClick={generarPDF}><ButtonGeneral text={<DocumentTranslator codIdioma={codIdioma} texto1={'Guardar en PDF'} />} /></div>
        <div onClick={nextDoc}><p className="documentTranslatedMainDiv--nextDoc"><DocumentTranslator codIdioma={codIdioma} texto1={'Ir a informe siguiente'} /></p></div>
    </div>
    </>);
}

