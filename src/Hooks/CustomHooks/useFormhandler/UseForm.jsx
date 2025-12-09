import React from "react";
import useFormHandler from "./useFormHandler";

const UseForm = () => {
  // 1️⃣ Initial form values
  const initialValues = { name: "", email: "" };

  // 2️⃣ Function to run when form is submitted
  const handleFormSubmit = (formData) => {
    alert(`Name: ${formData.name}\nEmail: ${formData.email}`);
  };

  // 3️⃣ Use our custom hook
  const { values, handleChange, handleSubmit } = useFormHandler(
    initialValues,
    handleFormSubmit
  );

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Simple User Form</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            style={{ padding: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Email: </label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            style={{ padding: "5px" }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "8px 15px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UseForm;
