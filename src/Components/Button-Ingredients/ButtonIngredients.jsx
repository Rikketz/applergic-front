import React, { useState } from "react";

import { ToggleButton } from "primereact/togglebutton";

export function ButtonIngredients({ value, onClassChange }) {
  const [checkedItems, setCheckedItems] = useState(
    new Array(value.length).fill(false)
  );

  const handleToggle = (index) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);

    if (typeof onClassChange === "function") {
      onClassChange(newCheckedItems);
    }
  };

  return (
    <>
      {value.map((ingrediente, index) => (
        <ToggleButton
          key={index}
          checked={checkedItems[index]}
          onChange={() => handleToggle(index)}
          onLabel={ingrediente}
          offLabel={ingrediente}
        />
      ))}
    </>
  );
}
