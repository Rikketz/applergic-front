import React, { useEffect, useState } from "react";
import axios from "axios";
import { Acordeon } from "../../Components/Acordeon/Acordeon";
import ButtonGeneral from "../../Components/buttonGeneral/buttonGeneral";
import { useLocation } from "react-router-dom";

export default function Ingredients() {
  const [alergenos, setAlergenos] = useState([]);
  const [selectedAlergenos, setSelectedAlergenos] = useState([]);

  
  const handleSave = async () => {
    console.log("Botón Guardar clickeado");

    try {
      

      const userId = localStorage.getItem("userId");
      console.log(userId);
      // Extraer solo las ID de los alérgenos seleccionados
      const alergenosIds = selectedAlergenos.map((alergeno) => alergeno._id);
  
      // Verificar que alergenosIds tenga valores antes de la solicitud
      console.log("Selected Alergenos IDs:", alergenosIds);
  
      const result = await axios.put(
        `http://localhost:5053/user/alergia/${userId}`,
        {alergia: alergenosIds }
      );
      console.log("Result from backend:", result);
      console.log("Selecciones de alérgenos guardadas:", result.data);
    } catch (error) {
      console.error("Hubo un error al guardar las selecciones:", error);
    }
  };

  useEffect(() => {
    // Obtén los alérgenos desde el backend
    axios.get("http://localhost:5053/alergeno")
      .then(response => {
        setAlergenos(response.data);
      })
      .catch(error => {
        console.error("Error al obtener alérgenos:", error);
      });
  }, []);

  // Función para manejar la selección de alérgenos
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
  };

// export default function Ingredients() {
//   const ingredientes = [
//     {
//       A: [
//         "Ácido benzoico",
//         "Almendras",
//         "Altramuces",
//         "Anacardo",
//         "Apio",
//         "Arroz",
//         "Avellana",
//       ],
//       C: ["Cacahuete", "Cacao", "Castaña", "Cereales", "Coco", "Crustáceos"],
//       F: [
//         "Fenilalanina",
//         "Fibras",
//         "Fresa",
//         "Fructosa",
//         "Frutas",
//         "Frutos con cáscara",
//         "Frutos rojos",
//       ],
//       G: ["Gelatina", "Gisante", "Glucosa", "Gluten"],
//       H: ["Huevo"],
//       K: ["Kiwi"],
//       L: ["Lactosa", "Leche", "Legumbres", "Lenteja", "Lino", "LTP"],
//       M: ["Maiz", "Marisco", "Melocotón", "Moluscos", "Mostaza"],
//       N: ["Nueces"],
//       P: ["Pescado", "Piñones", "Pistachos", "Plátano"],
//       R: ["Rosaceas"],
//       S: ["Sésamo", "Soja", "Sorbitol", "Sulfitos"],
//       T: ["Tomate", "Trazas", "trigo"],
//       U: ["Uva"],
//       V: ["Vitamina D", "Vitamina E"],
//       Y: ["Yuca"],
//     },
//   ];

  return (
    <>
      <header className="header-ingredients">
        <h2>Selecciona tus alergias e intolerancias.</h2>
        <h4>
          Los elementos marcados serán identificados en tus búsquedas como peligrosos para ti.
        </h4>
      </header>
      <main className="main-ingredients">
        <Acordeon
          alergenos={alergenos}
          setSelectedAlergenos={setSelectedAlergenos}
          onAlergenoSelect={handleAlergenoSelect}  
        />
      </main>
      <footer className="footer-ingredients">
      <div onClick={handleSave}>
        <ButtonGeneral text={"Guardar"} />
        </div>
      </footer>
    </>
  );
  
}
