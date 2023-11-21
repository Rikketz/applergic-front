import React from "react";

import { ToggleButton } from "primereact/togglebutton";

export function ButtonIngredients({
  value,
  letra,
  onAlergenoSelect,
  selectedAlergenos,
}) {
  const handleToggle = (alergeno) => {
    if (typeof onAlergenoSelect === "function") {
      onAlergenoSelect({
        letra,
        alergeno,
        selected: !selectedAlergenos.some(
          (item) => item.letra === letra && item.alergeno === alergeno
        ),
      });
    }
  };

  return (
    <>
      {value.map((alergeno, index) => (
        <ToggleButton
          key={index}
          checked={selectedAlergenos.some(
            (item) => item.letra === letra && item.alergeno === alergeno
          )}
          onChange={() => handleToggle(alergeno)}
          onLabel={alergeno}
          offLabel={alergeno}
        />
      ))}
    </>
  );
}
