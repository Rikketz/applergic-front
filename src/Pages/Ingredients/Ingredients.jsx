import React from "react";

import "./styles/style.scss";

import { Acordeon } from "../../Components/Acordeon/Acordeon";
import ButtonGeneral from "../../Components/buttonGeneral/buttonGeneral";

export function Ingredients() {
  const ingredientes = [
    {
      A: [
        "Ácido benzoico",
        "Almendras",
        "Altramuces",
        "Anacardo",
        "Apio",
        "Arroz",
        "Avellana",
      ],
      C: ["Cacahuete", "Cacao", "Castaña", "Cereales", "Coco", "Crustáceos"],
      F: [
        "Fenilalanina",
        "Fibras",
        "Fresa",
        "Fructosa",
        "Frutas",
        "Frutos con cáscara",
        "Frutos rojos",
      ],
      G: ["Gelatina", "Gisante", "Glucosa", "Gluten"],
      H: ["Huevo"],
      K: ["Kiwi"],
      L: ["Lactosa", "Leche", "Legumbres", "Lenteja", "Lino", "LTP"],
      M: ["Maiz", "Marisco", "Melocotón", "Moluscos", "Mostaza"],
      N: ["Nueces"],
      P: ["Pescado", "Piñones", "Pistachos", "Plátano"],
      R: ["Rosaceas"],
      S: ["Sésamo", "Soja", "Sorbitol", "Sulfitos"],
      T: ["Tomate", "Trazas", "trigo"],
      U: ["Uva"],
      V: ["Vitamina D", "Vitamina E"],
      Y: ["Yuca"],
    },
  ];

  return (
    <>
      <header className="header-ingredients">
        <h2>Ahora selecciona tus alerias e intolerancias.</h2>
        <h4>
          Los elementos marcados serán identificados en tus busquedas como
          peligrosos para ti.
        </h4>
      </header>
      <main className="main-ingredients">
        <Acordeon ingredientes={ingredientes} />
      </main>
      <footer className="footer-ingredients">
        <ButtonGeneral text={"Guardar"} />
      </footer>
    </>
  );
}
