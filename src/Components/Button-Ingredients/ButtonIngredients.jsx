import React, { useEffect, useState } from "react";

import { ToggleButton } from "primereact/togglebutton";

// export function ButtonIngredients({ value, onClassChange }) {
//   const [checkedItems, setCheckedItems] = useState(
//     new Array(value.length).fill(false)
//   );

//   const handleToggle = (index) => {
//     const newCheckedItems = [...checkedItems];
//     newCheckedItems[index] = !newCheckedItems[index];
//     setCheckedItems(newCheckedItems);

//     if (typeof onClassChange === "function") {
//       onClassChange(newCheckedItems);
//     }
//   };

//   return (
//     <>
//       {value.map((ingrediente, index) => (
//         <ToggleButton
//           key={index}
//           checked={checkedItems[index]}
//           onChange={() => handleToggle(index)}
//           onLabel={ingrediente}
//           offLabel={ingrediente}
//         />
//       ))}
//     </>
//   );
// }

export function ButtonIngredients({ value, letra, onAlergenoSelect, selectedAlergenos }) {
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
