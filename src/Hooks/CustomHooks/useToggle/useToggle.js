import React, { useState } from "react";

// useCases -> Model Openinig/Closing ,Password Show/Hide , Dark/Loght Theme  by Button Clicking
const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);
  const toggleValue = () => {
    setValue((prev) => !prev);
  };
  return[value,toggleValue]
};

export default useToggle;
