import React, { useEffect, useState } from "react";
import axios from "axios";
import { Acordeon } from "../../Components/Acordeon/Acordeon";
import ButtonGeneral from "../../Components/buttonGeneral/buttonGeneral";


export default function Ingredients() {
  const [alergenos, setAlergenos] = useState([]);
  const [selectedAlergenos, setSelectedAlergenos] = useState([]);

  
  const handleSave = async () => {
    console.log("Botón Guardar clickeado");


    try {
      

      const userId = localStorage.getItem("userId");
      console.log(userId);
      const alergenosIds = selectedAlergenos.map((alergeno) => alergeno._id);
  

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
    axios.get("http://localhost:5053/alergeno")
      .then(response => {
        setAlergenos(response.data);
        console.log("Alergenos:", response.data);
      })
      .catch(error => {
        console.error("Error al obtener alérgenos:", error);
      });
  }, []);

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
