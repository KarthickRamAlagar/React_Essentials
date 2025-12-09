import React, { useState } from "react";

const useFormHandler = (initialValue, onSubmit) => {
  // 1️⃣ Store form values in state
  const [values, setValues] = useState(initialValue);

  // 2️⃣ Function to handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 3️⃣ Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values); // pass  form value to parent
  };

  return { handleChange, handleSubmit, values };
};

export default useFormHandler;
