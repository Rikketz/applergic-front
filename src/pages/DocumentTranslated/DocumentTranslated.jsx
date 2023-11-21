import React, { useContext, useEffect, useState } from "react";
import { Contexto } from "../../App";
import html2pdf from "html2pdf.js";
import DocumentTranslator from "../../Components/DocumentTranslator/DocumentTranslator";
import ButtonGeneral from "../../Components/buttonGeneral/buttonGeneral";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./DocumentTranslated.scss";

export default function DocumentTranslated() {
    const [username, setUsername] = useState("");
    const [alergiaLista, setAlergiaLista] = useState();
    const [resultadoIngredientes, setResultadoIngredientes] = useState();

  // ENTORNO DE PRUEBAS


  // FIN ENTORNO DE PRUEBAS

    const {
        setIdioma,
        languageSelectedList,
        codigoParaPasar,
    } = useContext(Contexto);
    const [idiomaNombre, setIdiomaNombre] = useState("");
    const [infoProduct, setInfoProduct] = useState([]);
    const [ingredientString, setIngredientString] = useState();
    const navigate = useNavigate();
    let codIdioma = languageSelectedList[0];
    const goBack = () => {
        window.history.back();
    };

    // PARA PREGUNTAR A JOSE

    // if (languageSelectedList[0] === "es") {
    //     setIdiomaNombre("Español");
    //     console.log(idiomaNombre);
    // }

//   console.log(codigoParaPasar);

  useEffect(() => {
    setIdioma(codIdioma);
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = jwtDecode(token);

      if (decodedToken) {
        const { id, alergia } = decodedToken;
        fetch(`http://localhost:5053/user/getuser/${id}`)
          .then((response) => response.json())
          .then((data) => {
            const nombreCompleto = data.user.nombreCompleto;
            setUsername(nombreCompleto);
            
            const alergiaList = data.user.alergia;
            const alergiaString = alergiaList.join(", ");
            setAlergiaLista(alergiaString);
          })
          .catch((error) => {
            console.error("Error al obtener el nombre del usuario:", error);
          });
      }
    }

    fetch(`http://localhost:5053/product/code/${codigoParaPasar}`)
        .then((response) => response.json())
        .then((data) => {
            const arrayProduct = [data.nombre, data.foto, data.ingredientes, data.createdAt];
            const ingredientsSeparator = arrayProduct[2];
            const ingredientsString = ingredientsSeparator.join(", ");
            setResultadoIngredientes(ingredientsString);
            setInfoProduct(arrayProduct);
            // console.log(infoProduct[2]);
            const ingredientList = infoProduct[2] || [];
            // console.log(resultadoIngredientes);
            let testeos = ingredientList.join(", ");
            setIngredientString(testeos);
            // console.log(ingredientString);
        })
        .catch((error) => {
            console.error("Error al obtener información del producto:", error);
        });
    }, []);

  const nextDoc = () => {
    codIdioma = languageSelectedList[1];
    navigate("/generateInform/inform2");
  };
  const generarPDF = () => {
    const input = document.querySelector(".documentTranslatedMainDiv");
    const pdfOptions = {
      margin: 10,
      filename: "documento.pdf",
      image: { type: "jpeg", quality: 0.98 },
    };

    html2pdf(input, pdfOptions)
      .from(input)
      .outputPdf()
      .then((pdf) => {
        const blob = new Blob([pdf], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "documento.pdf";
        link.click();
      });
  };


  return (
    <>
      <div className="documentTranslatedMainDiv">
        <div className="documentTranslatedMainDiv__superior">
          <img
            onClick={goBack}
            className="documentTranslatedMainDiv__superior--img"
            src="https://cdn.zeplin.io/5e2a11b5ca786f8064774510/assets/778C0600-375F-416A-AEB4-8241161DC7CF.png"
            alt=""
          />
          <Link to={"/main"}>
            <img
              className="documentTranslatedMainDiv__superior--img"
              src="https://cdn.zeplin.io/5e2a11b5ca786f8064774510/assets/517E8F96-1F82-4480-82FB-A847C7B97F91.png"
              alt=""
            />
          </Link>
        </div>
        <div className="documentTranslatedMainDiv__infoSuperior">
          <h3 className="documentTranslatedMainDiv__infoSuperior--h3">
            Este es el informe
          </h3>
          <h3 className="documentTranslatedMainDiv__infoSuperior--h3">
            basado en tu Diario.
          </h3>
          <h4 className="documentTranslatedMainDiv__infoSuperior--h4">
            Actividad del mes de 'MES' 'AÑO'.
          </h4>
          <h5 className="documentTranslatedMainDiv__infoSuperior--h5">
            {idiomaNombre}
          </h5>
        </div>
        <div className="documentTranslatedMainDiv__middleDiv">
          <h5 className="documentTranslatedMainDiv__middleDiv--nombre">
            {" "}
            <DocumentTranslator codIdioma={codIdioma} texto1={"Nombre"} />:{" "}
            {username}.
          </h5>
          <p className="documentTranslatedMainDiv__middleDiv--allergy">
            {" "}
            <DocumentTranslator
              codIdioma={codIdioma}
              texto1={"Alérgico a"}
            />:{" "}
            <DocumentTranslator codIdioma={codIdioma} texto1={alergiaLista} />{" "}
          </p>
          <p className="documentTranslatedMainDiv__middleDiv--date">
            {" "}
            <DocumentTranslator codIdioma={codIdioma} texto1={"Fecha"} />:{" "}
            <DocumentTranslator
              codIdioma={codIdioma}
              texto1={"23 de Noviembre de 2023"}
            />{" "}
          </p>
          <p className="documentTranslatedMainDiv__middleDiv--newProducts">
            {" "}
            <DocumentTranslator
              codIdioma={codIdioma}
              texto1={"Nuevos productos aptos incluidos en tu diario"}
            />
            .{" "}
          </p>
        </div>
        <div className="documentTranslatedMainDiv__infoInferior">
          <div className="documentTranslatedMainDiv__infoInferior__divFoto">
            <img
              className="documentTranslatedMainDiv__infoInferior__divFoto--img"
              src={infoProduct[1]}
              alt=""
            />
            <div className="documentTranslatedMainDiv__infoInferior__divFoto__textos">
              <p className="documentTranslatedMainDiv__infoInferior__divFoto__textos--date">
                {" "}
                <DocumentTranslator
                  codIdioma={codIdioma}
                  texto1={infoProduct[3]}
                />{" "}
                </p>
                <p className="documentTranslatedMainDiv__infoInferior__divFoto__textos--name">
                {" "}
                {infoProduct[0]}{" "}
                </p>
            </div>
            </div>
            <div className="documentTranslatedMainDiv__infoInferior__divIngredients">
            <p className="documentTranslatedMainDiv__infoInferior__divIngredients--ingredients">
                <span className="negrita">
                {" "}
                <DocumentTranslator
                    codIdioma={codIdioma}
                    texto1={"Ingredientes"}
                />{" "}
                </span>
                :{" "}
                <DocumentTranslator
                codIdioma={codIdioma}
                texto1={resultadoIngredientes}
                />{" "}
            </p>
            </div>
        </div>

        <div className="documentTranslatedSemiFinal">
            <div  className="documentTranslatedSemiFinal" onClick={generarPDF}>
                <ButtonGeneral
                    text={
                    <DocumentTranslator
                        codIdioma={codIdioma}
                        texto1={"Guardar en PDF"}
                    />
                    }
                />
            </div> 
        </div>
            {languageSelectedList.length === 2 &&  <div className="documentTranslatedFinal" onClick={nextDoc}><p className="documentTranslatedMainDiv--nextDoc"><DocumentTranslator codIdioma={codIdioma} texto1={"Ir a informe siguiente"}/></p>
            </div>}
        </div>
        
    </>
    );
}
