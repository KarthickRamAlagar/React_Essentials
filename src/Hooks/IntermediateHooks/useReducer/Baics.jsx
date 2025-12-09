// // with useState
// import React,{useState} from "react";

// const Baics = () => {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//   });
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(form);
//     setForm({
//       name: "",
//       email: "",
//     });
//   };
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev)=>({
//         ...prev,
//         [name]:value
//     }))
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={form.name}
//           placeholder="Name"
//           onChange={handleChange}
//           name="name"
//         />
//         <input
//           type="email"
//           value={form.email}
//           placeholder="Email"
//           onChange={handleChange}
//           name="email"
//         />
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default Baics;

import React, { useReducer } from "react";

const Baics = () => {
  const initialState = {
    name: "",
    email: "",
    loading: false,
    error: "",
    submitted: false,
  };
  const reducerFn = (state, action) => {
    switch (action.type) {
      case "UPDATE_FIELD":
        return { ...state, [action.payload.name]: action.payload.value };
      case "SUBMIT_START":
        return { ...state, loading: true, error: "", submitted: false };
      case "SUBMIT_SUCCESS":
        return {
          ...state,
          loading: false,
          submitted: true,
          name: "",
          email: "",
        };
      case "SUBMIT_ERROR":
        return {
          ...state,
          loading: false,
          error: action.error,
          submitted: false,
        };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducerFn, initialState);

  const handleChange = (e) => {
    dispatch({
      type: "UPDATE_FIELD",
      //   name: e.target.name,
      //   value: e.target.value,
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "SUBMIT_START" });

    // Simulate API Call
    setTimeout(() => {
      if (state.email.includes("@")) {
        dispatch({ type: "SUBMIT_SUCCESS" });
      } else {
        dispatch({ type: "SUBMIT_ERROR", error: "Invalid email address" });
      }
    }, 1000);
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="name"
          onChange={handleChange}
          name="name"
          value={state.name}
        />
        <input
          type="email"
          onChange={handleChange}
          placeholder="email"
          name="email"
          value={state.email}
        />
        <button type="submit" disabled={state.loading}>
          {state.loading ? "Submitting..." : "Submit"}
        </button>
        {state.error && <p style={{ color: "red" }}>{state.error}</p>}
        {state.submitted && <p style={{ color: "green" }}> Form Submitted</p>}
      </form>
    </div>
  );
};

export default Baics;
