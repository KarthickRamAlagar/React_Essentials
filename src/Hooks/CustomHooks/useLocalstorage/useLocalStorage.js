import React, { useState } from "react";

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch (e) {
      console.error("Error reading localStorage key “" + key + "”: ", e);
      return initialValue;
    }
  });

  const setValueInLocalStorage = (newValue) => {
    try {
      setValue(newValue);
      localStorage.setItem(key, JSON.stringify(newValue));
    } catch (e) {
      console.error("Error setting localStorage key “" + key + "”: ", e);
    }
  };

  return [value, setValueInLocalStorage];
};

export default useLocalStorage;
