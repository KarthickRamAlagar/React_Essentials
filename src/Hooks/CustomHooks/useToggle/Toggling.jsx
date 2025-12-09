import React from "react";
import useToggle from "./useToggle";

//Example 1: Light/Dark Mode Toggle
// const Toggling = () => {
//  const[isDarkTheme,toggleTheme]=useToggle(false)
//   return (
//     <div
//       style={{
//         backgroundColor: isDarkTheme ? "#333" : "#fff",
//         color: isDarkTheme ? "#fff" : "#000",
//         minHeight: "100vh",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <h2>{isDarkTheme ? "🌙 Dark Mode" : "☀️ Light Mode"}</h2>
//       <button
//         onClick={toggleTheme}
//         style={{
//           padding: "10px 20px",
//           border: "none",
//           borderRadius: "8px",
//           cursor: "pointer",
//           backgroundColor: isDarkTheme ? "#555" : "#ddd",
//         }}
//       >
//         Toggle Theme
//       </button>
//     </div>
//   );
// }

// export default Toggling



const Toggling = () => {
  const [showPassword, togglePassword] = useToggle(false);
  return (
    <div style={{ margin: "40px" }}>
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Enter your password"
        style={{ padding: "8px" }}
      />
      <button onClick={togglePassword} style={{ marginLeft: "10px" }}>
        {showPassword ? "Hide" : "Show"}
      </button>
    </div>
  );
};

export default Toggling;
