import React, { useEffect, useState } from "react";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

import { Accordion, AccordionTab } from "primereact/accordion";
import { ButtonIngredients } from "../../Components/Button-Ingredients/ButtonIngredients";

// export function Acordeon({ ingredientes }) {
//   const [activeIndex, setActiveIndex] = useState(null);

//   const ClassChange = (index) => {
//     setActiveIndex(index === activeIndex ? null : index);
//   };

//   useEffect(() => {
//     const accordionTabs = document.querySelectorAll(".p-accordion-header");
//     accordionTabs.forEach((tab, index) => {
//       const span = tab.querySelector("span");
//       if (span) {
//         span.classList.toggle(
//           "p-accordion-header-text-active",
//           index === activeIndex
//         );
//       }
//     });
//   }, [activeIndex]);

//   return (
//     <section className="card">
//       <Accordion activeIndex={activeIndex}>
//         {Object.keys(ingredientes[0]).map((letra, index) => (
//           <AccordionTab key={index} header={letra}>
//             <ButtonIngredients
//               value={ingredientes[0][letra]}
//               onClassChange={() => ClassChange(index)}
//             />
//           </AccordionTab>
//         ))}
//       </Accordion>
//     </section>
//   );
// }
// Acordeon.jsx


export function Acordeon({ alergenos }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [alergenosPorLetra, setAlergenosPorLetra] = useState({});
  const [selectedAlergenos, setSelectedAlergenos] = useState([]);

  const handleAlergenoSelect = ({ letra, alergeno, selected }) => {
    // Maneja la selección/deselección de alérgenos
    if (selected) {
      setSelectedAlergenos([...selectedAlergenos, { letra, alergeno }]);
    } else {
      setSelectedAlergenos(
        selectedAlergenos.filter(
          (item) => !(item.letra === letra && item.alergeno === alergeno)
        )
      );
    }
    console.log(selectedAlergenos)
  };

  useEffect(() => {
    // Agrupa los alérgenos por la primera letra de su nombre y ordena por nombre
    const groupedAlergenos = alergenos.reduce((result, alergeno) => {
      const primeraLetra = alergeno.nombre[0].toUpperCase();
      if (!result[primeraLetra]) {
        result[primeraLetra] = [];
      }
      result[primeraLetra].push(alergeno);
      // Ordena los alérgenos por nombre
      result[primeraLetra] = result[primeraLetra].sort((a, b) =>
        a.nombre.localeCompare(b.nombre)
      );
      return result;
    }, {});

    // Ordena las letras
    const sortedLetters = Object.keys(groupedAlergenos).sort();

    // Crea un nuevo objeto ordenado
    const orderedAlergenosPorLetra = {};
    sortedLetters.forEach((letra) => {
      orderedAlergenosPorLetra[letra] = groupedAlergenos[letra];
    });

    setAlergenosPorLetra(orderedAlergenosPorLetra);
  }, [alergenos]);

  useEffect(() => {
    // Puedes hacer algo con los alérgenos seleccionados, por ejemplo, cambiar el color de los botones
    console.log("Alergenos seleccionados:", selectedAlergenos);
  }, [selectedAlergenos]);

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

