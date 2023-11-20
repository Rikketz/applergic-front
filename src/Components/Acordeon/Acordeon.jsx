import React, { useEffect, useState } from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { Accordion, AccordionTab } from "primereact/accordion";
import ButtonIngredients from "../../Components/Button-Ingredients/ButtonIngredients";

export default function Acordeon({ ingredientes }) {
  const [activeIndex, setActiveIndex] = useState(
    Array.from({ length: 16 }, (_, i) => i)
  );

  const ClassChange = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  useEffect(() => {
    const accordionRef = document.querySelector(".p-accordion");

    if (accordionRef) {
      const accordionTabs = accordionRef.querySelectorAll(
        ".p-accordion-header"
      );

      accordionTabs.forEach((tab, index) => {
        const span = tab.querySelector("span");

        if (span) {
          const newClass =
            index === activeIndex ? "p-accordion-header-text-active" : "";
          const hasAccordionTextClass = span.classList.contains(
            "p-accordion-header-text"
          );

          const buttons = document.querySelectorAll(
            ".p-button.p-togglebutton.p-component.p-highlight"
          );

          buttons.forEach((button) => {
            if (
              button.classList.contains("p-button") &&
              button.classList.contains("p-togglebutton") &&
              button.classList.contains("p-component") &&
              button.classList.contains("p-highlight")
            ) {
              const areaValue = button.getAttribute("aria-pressed");

              if (areaValue === "true" && hasAccordionTextClass) {
                if (newClass !== "") {
                  span.classList.toggle(
                    "p-accordion-header-text-active",
                    index === activeIndex
                  );
                }
              } else {
                span.classList.remove("p-accordion-header-text-active");
              }
            }
          });
        }
      });
    }
  }, [activeIndex]);

  return (
    <section className="card">
      <Accordion multiple activeIndex={activeIndex}>
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
