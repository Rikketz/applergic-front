import React, { useEffect, useState } from "react";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

import { Accordion, AccordionTab } from "primereact/accordion";
import { ButtonIngredients } from "../../Components/Button-Ingredients/ButtonIngredients";

export function Acordeon({ ingredientes }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const ClassChange = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  useEffect(() => {
    const accordionTabs = document.querySelectorAll(".p-accordion-header");
    accordionTabs.forEach((tab, index) => {
      const span = tab.querySelector("span");
      if (span) {
        span.classList.toggle(
          "p-accordion-header-text-active",
          index === activeIndex
        );
      }
    });
  }, [activeIndex]);

  return (
    <section className="card">
      <Accordion activeIndex={activeIndex}>
        {Object.keys(ingredientes[0]).map((letra, index) => (
          <AccordionTab key={index} header={letra}>
            <ButtonIngredients
              value={ingredientes[0][letra]}
              onClassChange={() => ClassChange(index)}
            />
          </AccordionTab>
        ))}
      </Accordion>
    </section>
  );
}
