import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import ButtonGeneral from "../../Components/buttonGeneral/buttonGeneral";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "./styles/style.scss";

import close from "./assets/close.png";
// import back from "./assets/back.png";
import arrow from "../../assets/left-arrow.png";
import { useNavigate } from "react-router-dom";
import { Accordion, AccordionTab } from "primereact/accordion";
import { ButtonIngredients } from "../../Components/Button-Ingredients/ButtonIngredients";
import { Contexto } from "../../App";
import { Link } from "react-router-dom";
import { Chip } from "primereact/chip";

export default function IngredientsTest() {
  const [activeIndex, setActiveIndex] = useState(
    Array.from({ length: 99 }, (_, i) => i)
  );

  const [alergenosPorLetra, setAlergenosPorLetra] = useState({});
  const [selectedAlergenos, setSelectedAlergenos] = useState([]);
  const { alergenos } = useContext(Contexto);
  const navigate = useNavigate();
  const [showIngredients, setShowIngredients] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const goBack = () => {
    window.history.back();
  };

  const handleClassChange = () => {
    setShowIngredients(false);
    setShowConfirmation(true);
  };

  const handleClassInvert = () => {
    setShowIngredients(true);
    setShowConfirmation(false);
  };

  const handleSave = async () => {
    console.log("Botón Guardar clickeado");

    try {
      const userId = localStorage.getItem("userId");
      console.log(userId);

      console.log("Selected Alergenos IDs:", selectedAlergenos);

      const result = await axios.put(
        `http://localhost:5053/user/alergia/${userId}`,
        { alergia: selectedAlergenos.map((alergeno) => alergeno.alergeno) }
      );
      // console.log("Result from backend:", result);
      // console.log("Selecciones de alérgenos guardadas:", result.data);
      // navigate("/login");
    } catch (error) {
      console.error("Hubo un error al guardar las selecciones:", error);
    }
  };

  useEffect(() => {
    const groupedAlergenos = alergenos.reduce((result, alergeno) => {
      const primeraLetra = alergeno.nombre[0].toUpperCase();
      if (!result[primeraLetra]) {
        result[primeraLetra] = [];
      }
      result[primeraLetra].push(alergeno);
      result[primeraLetra] = result[primeraLetra].sort((a, b) =>
        a.nombre.localeCompare(b.nombre)
      );
      return result;
    }, {});

    const sortedLetters = Object.keys(groupedAlergenos).sort();

    const orderedAlergenosPorLetra = {};
    sortedLetters.forEach((letra) => {
      orderedAlergenosPorLetra[letra] = groupedAlergenos[letra];
    });

    console.log("Alergenos seleccionados:", selectedAlergenos);
    setAlergenosPorLetra(orderedAlergenosPorLetra);
  }, [alergenos, selectedAlergenos]);

  const handleAlergenoSelect = ({ letra, alergeno, selected }) => {
    if (selected) {
      setSelectedAlergenos([...selectedAlergenos, { letra, alergeno }]);
    } else {
      setSelectedAlergenos(
        selectedAlergenos.filter(
          (item) => !(item.letra === letra && item.alergeno === alergeno)
        )
      );
    }
  };

  console.log("ingredientes", showIngredients);
  console.log("confirmacion", showConfirmation);

  return (
    <>
      <section
        className={`section-ingredients ${showIngredients ? "" : "hidden"}`}
      >
 <div className="mini-header">
        <div className="volver-div">
          <div className="volver-div__content">
            <img className="left-arrow" src={arrow} alt="arrow icon" />
            <p className="p-volver" onClick={goBack}>Volver</p>
          </div>
          <p className="p-numbers">3 de 4</p>
          <div className="home-icon-div">
          </div>
        </div>
        </div>

        {/* <div className="header-ingredients-div-link">
            <Link to="/main" className="a-header-ingredients">
              <div className="header-ingredients-div">
                <img
                  src={back}
                  alt="back-logo"
                  className="img-header-ingredients-back"
                />
                <span className="span-header-ingredients">Volver</span>
              </div>
            </Link>
            <span className="span-header-scanner">3 de 4</span>
          </div> */}

        <header className="header-ingredients" id="header-ingredients">
          <div className="header-ingredients-div-title">
            <h2>Selecciona tus alergias e intolerancias.</h2>
            <h4>
              Los elementos marcados serán identificados en tus búsquedas como
              peligrosos para ti.
            </h4>
          </div>
        </header>
        <main className="main-ingredients">
          <section className="main-ingredients-section">
            <div>
              {Object.keys(alergenosPorLetra).map((letra, index) => (
                <span key={index}>
                  <a href={`#span-${letra}`}>{letra}</a>
                </span>
              ))}
            </div>
          </section>
          <section className="card">
            <Accordion
              multiple
              activeIndex={activeIndex}
              onTabChange={(e) => setActiveIndex(e.index)}
            >
              {Object.keys(alergenosPorLetra).map((letra, index) => (
                <AccordionTab key={index} header={letra} id={`span-${letra}`}>
                  <ButtonIngredients
                    value={alergenosPorLetra[letra].map(
                      (alergeno) => alergeno.nombre
                    )}
                    letra={letra}
                    selectedAlergenos={selectedAlergenos}
                    onAlergenoSelect={handleAlergenoSelect}
                  />
                </AccordionTab>
              ))}
            </Accordion>
          </section>
        </main>
        <footer className="footer-ingredients">
          <div onClick={handleClassChange}>
            <ButtonGeneral text={"Guardar"} />
          </div>
        </footer>
      </section>
      <section
        className={`section-confirm ${showConfirmation ? "" : "hidden"}`}
      >
        <header className="header-confirm">
          <a
            className="a-header-confirm-close"
            href="#header-ingredients"
            onClick={handleClassInvert}
          >
            <img
              src={close}
              alt="close-logo"
              className="img-header-confirm-close"
            />
          </a>
        </header>
        <main className="main-confirm">
          <h2 className="h2-main-confirm">Confirma tu selección.</h2>
          <h4>
            A continuación te resumimos los alimentos registrados como
            peligrosos para ti.
          </h4>
          <div className="chips-main">
            {selectedAlergenos.map((item, index) => (
              <Chip key={index} label={item.alergeno} />
            ))}
          </div>
          <a href="#header-ingredients" onClick={handleClassInvert}>
            <button className="main-button-toggle">Añadir nuevos</button>
          </a>
        </main>
        <footer className="footer-confirm">
          <Link to="/escaner" onClick={handleSave}>
            <ButtonGeneral text={"Confirmar"} />
          </Link>
        </footer>
      </section>
    </>
  );
}
