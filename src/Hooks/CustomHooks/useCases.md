

Now let’s move on to the next one — **`useToggle`**, which is simpler but extremely useful for **toggling states** like:

* dark/light theme 🌙☀️
* modal open/close
* dropdown expand/collapse
* show/hide password
* play/pause buttons

---

## ⚙️ **1️⃣ Concept: What is `useToggle`?**

`useToggle` is a custom hook used to **toggle a boolean value** (`true` ↔ `false`) easily.

Normally you would do this in a component:

```js
const [isOpen, setIsOpen] = useState(false);
const toggle = () => setIsOpen(prev => !prev);
```

But with a custom hook, we can **reuse** this logic across multiple components.

---

## 🧠 **2️⃣ Step-by-Step Building `useToggle`**

### **Step 1:** Create a new file

🗂️ `/src/hooks/useToggle.js`

### **Step 2:** Import `useState`

```js
import { useState } from "react";
```

### **Step 3:** Define the hook

```js
const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);

  const toggleValue = () => {
    setValue((prev) => !prev);
  };

  return [value, toggleValue];
};

export default useToggle;
```

---

## ⚡ **3️⃣ How to Use in a Component**

Let’s make a simple example for **theme toggle**:

### **Example 1: Light/Dark Mode Toggle**

```js
import React from "react";
import useToggle from "./useToggle";

const ThemeToggle = () => {
  const [isDarkMode, toggleTheme] = useToggle(false);

  return (
    <div
      style={{
        backgroundColor: isDarkMode ? "#333" : "#fff",
        color: isDarkMode ? "#fff" : "#000",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h2>{isDarkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}</h2>
      <button
        onClick={toggleTheme}
        style={{
          padding: "10px 20px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          backgroundColor: isDarkMode ? "#555" : "#ddd",
        }}
      >
        Toggle Theme
      </button>
    </div>
  );
};

export default ThemeToggle;
```

---

### **Example 2: Show/Hide Password**

```js
import React from "react";
import useToggle from "./useToggle";

const PasswordInput = () => {
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

export default PasswordInput;
```

---

## 💡 **4️⃣ Interview Insights**

| Question                                                                | Explanation                                                                      |
| ----------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| **Why create a `useToggle` hook instead of using `useState` directly?** | Reusability — avoids rewriting toggle logic in every component.                  |
| **Can you pass a default value?**                                       | Yes — `useToggle(true/false)` initializes it.                                    |
| **Can it toggle non-boolean values?**                                   | Yes — you can extend it for multiple states (like “on/off”, “yes/no”).           |
| **Where can it be used?**                                               | Any place you need a quick binary toggle — theme, modal, dropdown, sidebar, etc. |

---

## ✅ **5️⃣ Summary**

| Step | Description                                              |
| ---- | -------------------------------------------------------- |
| 1    | Create `useToggle.js` in `/src/hooks`                    |
| 2    | Import `useState`                                        |
| 3    | Manage a boolean state with toggle function              |
| 4    | Return `[value, toggleValue]`                            |
| 5    | Use in components like theme, modal, password visibility |

---
