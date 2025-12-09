import React, { useContext, createContext, useState, useEffect } from "react";

// 1. Create a Context
const ThemeContext = createContext();

// 2. Create a Provider Component
export const ThemeProvider = () => {
  const [theme, setTheme] = useState("light");

  // flow ->  setting theme in local storage and allowing toggling themes

  // 3️⃣ Load theme from localStorage on first render
  useEffect(() => {
    const savedTheme = localStorage.getItem("app-theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.add(savedTheme);
    }
  }, []);

  // 4️⃣ Toggle function
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("app-theme", newTheme);

    // Update body or root class for CSS themes
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {/* children components will go here */}
    </ThemeContext.Provider>
  );
};

// 5️⃣ Custom Hook
export const useTheme = () => {
  return useContext(ThemeContext);
};
