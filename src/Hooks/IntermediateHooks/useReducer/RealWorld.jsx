// import { useState } from "react";

// // without UseReucer  -> with useState
// const RealWorld = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(formData);
//     setFormData({
//         username: "",
//         email: "",
//         password: "",
//     })
//   };

//   return (
//     <div>
//       <h2>User Form - by using UseState</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={formData.username}
//           placeholder="User_Name"
//           onChange={handleChange}
//           name="username"
//         />
//         <br />
//         <input
//           type="email"
//           value={formData.email}
//           name="email"
//           onChange={handleChange}
//           placeholder="Email"
//         />
//         <br />
//         <input
//           type="password"
//           value={formData.password}
//           name="password"
//           onChange={handleChange}
//           placeholder="Password"
//         />
//         <br />
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default RealWorld;

import { useReducer } from "react";

const initialState = {
  userName: "",
  email: "",
  password: "",
  loading: false, 
  error: "",
  submitted: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "Update-Field":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "Submit-start":
      return {
        ...state,
        loading: true,
        error: "",
        submitted: false,
      };
    case "Submit-Success":
      const updatedState = {
        ...state,
        loading: false,
        userName: state.userName,
        email: state.email,
        password: state.password,
        submitted: true,
      };
      console.log("Updated state:", updatedState);
      return updatedState;
    case "Submit-Error":
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
const RealWorld = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e) => {
    dispatch({
      type: "Update-Field",
      field: e.target.name,
      value: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "Submit-start" });

    //Simulating API Call
    setTimeout(() => {
      if (state.userName && state.email && state.password) {
        dispatch({ type: "Submit-Success" });
      } else {
        dispatch({ type: "Submit-Error", error: "All fields are required" });
      }
    }, 1500);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>User Form - by using UseReducer </h2>
        <input
          type="text"
          name="userName"
          placeholder="User_Name"
          onChange={handleChange}
          value={state.userName}
        />
        <br />
        <input
          type="email"
          name="email"
          placeholder="User_Email"
          onChange={handleChange}
          value={state.email}
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={state.password}
        />
        <br />
        <button type="submit">{state.loading ? "Submitting" : "Submit"}</button>
        {state.error && <p style={{ color: "red" }}>{state.error}</p>}
        {state.submitted && (
          <p style={{ color: "green" }}>Form Submitted Successfully!</p>
        )}
      </form>
    </div>
  );
};

export default RealWorld;
