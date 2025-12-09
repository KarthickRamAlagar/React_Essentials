## 🧠 **1️⃣ What is a Custom Hook?**

A **Custom Hook** is just a **JavaScript function** that:

- Starts with the word **“use”**, and
- Uses **one or more built-in React Hooks** (`useState`, `useEffect`, `useMemo`, etc.) inside it.

Its main purpose is to **reuse logic**, not UI.
You extract repetitive logic (like fetching, form handling, toggling) from components into a function.

---

## ⚙️ **2️⃣ Rules for Writing Custom Hooks**

Custom Hooks follow **the same rules** as normal React Hooks.

### 🧩 **Rule #1: Hook names must start with “use”**

```js
function useFetch() { ... }
function fetchData() { ... }
```

React uses this naming pattern to **detect Hooks** automatically and enforce rules.

---

### 🧩 **Rule #2: You can use Hooks (like useState/useEffect) inside Custom Hooks**

Yes — you **can and should** use React hooks **inside** your custom hook.

That’s the whole point!
Custom Hooks are **composed** of built-in hooks.

Example:

```js
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  const toggle = () => setValue((prev) => !prev);
  return [value, toggle];
}
```

This hook uses `useState` internally — totally valid.

---

### 🧩 **Rule #3: Never call Hooks conditionally**

Just like inside components, **don’t put hooks inside if/else, loops, or nested functions.**

Wrong:

```js
function useExample(condition) {
  if (condition) {
    useEffect(() => console.log("This breaks the rules"), []);
  }
}
```

Correct:

```js
function useExample(condition) {
  useEffect(() => {
    if (condition) console.log("This is fine");
  }, [condition]);
}
```

Hooks must always run in the same **order** for React to track them properly.

---

### 🧩 **Rule #4: Call Custom Hooks only from React functions**

You can only call:

- Built-in Hooks inside **functional components or custom hooks**, and
- Custom Hooks inside **functional components or other custom hooks**.

Valid:

```js
function MyComponent() {
  const [data] = useFetch("/api");
}
```

Invalid:

```js
function normalFunction() {
  const [data] = useFetch("/api"); //  Not allowed
}
```

---

### 🧩 **Rule #5: Return what’s necessary**

A custom hook can return **anything** — value, object, or array — depending on what’s needed.

Examples:

```js
// Return value + function
return [state, setState];

// Return object
return { data, loading, error };
```

---

# useFetch()-> Custom Hook

## 🪜 **3️⃣ Step-by-Step: How to Build a Custom Hook**

Let’s take one example — `useFetch`.

### **Step 1: Create the Hook file**

🗂️ `/src/hooks/useFetch.js`

### **Step 2: Import necessary hooks**

```js
import { useState, useEffect } from "react";
```

### **Step 3: Define the hook**

```js
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch");
        const result = await res.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
```

### **Step 4: Use it inside a component**

```js
import useFetch from "./hooks/useFetch";

const ProductList = () => {
  const { data, loading, error } = useFetch(
    "https://fakestoreapi.com/products"
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <ul>
      {data.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
};
```

---

## 🧩 **4️⃣ Why Use Custom Hooks?**

| Without Custom Hook                                  | With Custom Hook                       |
| ---------------------------------------------------- | -------------------------------------- |
| You duplicate fetching logic in multiple components. | You reuse `useFetch()` in many places. |
| Hard to maintain code.                               | Easy to update in one place.           |
| Repetitive states (loading/error).                   | Centralized reusable logic.            |

---

## **5️⃣ Quick Recap Rules Summary**

| Rule | Description                                                                   |
| ---- | ----------------------------------------------------------------------------- |
| 1    | Always start hook name with `use`.                                            |
| 2    | You **can use** built-in hooks (`useState`, `useEffect`) inside custom hooks. |
| 3    | Never call hooks inside loops, conditions, or nested functions.               |
| 4    | Call custom hooks only inside React components or other custom hooks.         |
| 5    | Return values/functions/objects from the custom hook as needed.               |

---

## 🧩 JS vs JSX — Which to Use for Custom Hooks

| Type       | File Extension                       | When to Use                                                                                 | Example                                             |
| ---------- | ------------------------------------ | ------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| **`.js`**  | ✅ Recommended for most hooks        | When your file **doesn’t return JSX** — i.e., only contains logic like state, effects, etc. | `useLocalStorage.js`, `useFetch.js`, `useToggle.js` |
| **`.jsx`** | Use only if the file **returns JSX** | When the file **renders UI** — components, elements, etc.                                   | `ThemeToggleButton.jsx`, `App.jsx`, `Users.jsx`     |

---
# useLocalstorage() -> Custom Hook

## useLocalStorage works in a real component — like saving a user’s name or theme that stays even after refresh.

```code
import { useState } from "react";

const useLocalStorage = (key, initialValue) => {
 const [value, setValue] = useState(() => {
   try {
     const storedValue = localStorage.getItem(key);
     return storedValue ? JSON.parse(storedValue) : initialValue;
   } catch (err) {
     console.error("Error reading localStorage:", err);
     return initialValue;
   }
 });

 const setStoredValue = (newValue) => {
   try {
     setValue(newValue);
     localStorage.setItem(key, JSON.stringify(newValue));
   } catch (err) {
     console.error("Error writing localStorage:", err);
   }
 };

 return [value, setStoredValue];
};

export default useLocalStorage;
```

### Step 2 — UserNameSaver.js

```code
import React from "react";
import useLocalStorage from "./useLocalStorage";

const UserNameSaver = () => {
  const [name, setName] = useLocalStorage("username", "");

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>👤 Welcome {name ? name : "Guest"}</h2>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: "8px", fontSize: "16px" }}
      />
      <p style={{ marginTop: "10px", color: "gray" }}>
        (Your name is saved in localStorage)
      </p>
    </div>
  );
};

export default UserNameSaver;
```

## 🧠 What Happens:

When the component first loads:

It checks localStorage for a saved username.

If none, it uses "" (empty string).

When you type a name:

It updates both React state and localStorage.

If you refresh:

The name appears again automatically (read from localStorage).

---

# useDebounce() -> Custom Hook

## 🧩 **What is Debouncing? (Simple Explanation)**

👉 Debouncing means **waiting for a pause in user activity before running a function**.

💬 Example:
If a user types `"React"` in a search box:

- Without debounce → fetch runs **5 times** (R, Re, Rea, Reac, React)
- With debounce → fetch runs **only once**, after user stops typing.

⏳ In short:

> Debounce = “Wait until the user stops typing for X milliseconds.”

---

## ⚙️ **Goal**

We’ll build a **custom hook** that delays updating a value until after a given time (delay).

---

## 🪶 Step 1 — Create `useDebounce.js`

```js
import { useState, useEffect } from "react";

/**
 * Custom Hook: useDebounce
 * Delays updating a value until after a given time of inactivity.
 */
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set a timer to update debouncedValue after delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup: if value changes before delay finishes, reset the timer
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  // Return the debounced version of value
  return debouncedValue;
};

export default useDebounce;
```

---

## 🧠 Step-by-Step Explanation

### 🔹 1️⃣ `useState(value)`

```js
const [debouncedValue, setDebouncedValue] = useState(value);
```

- We create a new piece of state that will store the **delayed version** of the input.
- Initially, it’s equal to the input value.

---

### 🔹 2️⃣ `useEffect` Setup

```js
useEffect(() => {
  const handler = setTimeout(() => {
    setDebouncedValue(value);
  }, delay);
```

- Each time the `value` or `delay` changes,
  we **start a timer** (`setTimeout`) to update `debouncedValue` after the delay period.
- For example, `delay = 500ms`.

---

### 🔹 3️⃣ Cleanup Function

```js
return () => {
  clearTimeout(handler);
};
```

- If the user types again **before** the timer finishes,
  we cancel the previous timer using `clearTimeout`.
- This prevents multiple updates from firing unnecessarily.

---

### 🔹 4️⃣ Returning the Debounced Value

```js
return debouncedValue;
```

- The component using this hook receives the **latest debounced value**,
  which only updates after the delay has passed without changes.

---

## 🧪 Step 2 — Example Usage: Search Input

Let’s see it in action 👇

### 🧾 File: `SearchBar.js`

```js
import React, { useState, useEffect } from "react";
import useDebounce from "./useDebounce";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500); // wait 500ms

  useEffect(() => {
    if (debouncedSearch) {
      console.log("Fetching results for:", debouncedSearch);
      // You can call your API fetch here
      // fetch(`https://api.example.com/search?q=${debouncedSearch}`)
    }
  }, [debouncedSearch]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>🔍 Debounced Search</h2>
      <input
        type="text"
        placeholder="Type to search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: "8px",
          fontSize: "16px",
          width: "250px",
        }}
      />
      <p style={{ color: "gray" }}>
        API will trigger only after you stop typing for 0.5s.
      </p>
    </div>
  );
};

export default SearchBar;
```

---

## 🎯 Step 3 — What Happens

| Step | Action                    | Behavior                          |
| ---- | ------------------------- | --------------------------------- |
| 1️⃣   | User types `"React"`      | `searchTerm` updates immediately  |
| 2️⃣   | `useDebounce` waits 500ms | If typing continues, timer resets |
| 3️⃣   | After typing stops        | Updates `debouncedSearch`         |
| 4️⃣   | `useEffect` fires         | Logs or fetches only once         |

---

## ✅ Final Result

- Super-smooth search input
- No unnecessary API calls
- Easy to reuse anywhere you need “wait before action” logic

---
# useFormHandle() ->Custom Hook
```code
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

```
```code 
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
```
---