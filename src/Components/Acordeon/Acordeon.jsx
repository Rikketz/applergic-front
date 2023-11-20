import React, { useEffect, useState } from "react";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

import { Accordion, AccordionTab } from "primereact/accordion";
import { ButtonIngredients } from "../../Components/Button-Ingredients/ButtonIngredients";


export function Acordeon({ alergenos }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [alergenosPorLetra, setAlergenosPorLetra] = useState({});
  const [selectedAlergenos, setSelectedAlergenos] = useState([]);


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
    console.log(selectedAlergenos[0])
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


  return (
    <section className="card">
      <Accordion activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
        {Object.keys(alergenosPorLetra).map((letra, index) => (
          <AccordionTab key={index} header={letra}>
            <ButtonIngredients
              value={alergenosPorLetra[letra].map((alergeno) => alergeno.nombre)}
              letra={letra}
              selectedAlergenos={selectedAlergenos}
              onAlergenoSelect={handleAlergenoSelect}
            />
          </AccordionTab>
        ))}
      </Accordion>
    </section>
  );
}

