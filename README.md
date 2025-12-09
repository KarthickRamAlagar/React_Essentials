# React Architecture, Folder Structure & Hooks Guide

<div>
<img  src='/public/banner1.png' width="800px" height="500px"/>

</div>
<h3>This folder provides a complete breakdown of **React Architecture Flow**, including both **Client-Side Rendering (CSR)** and **Server-Side Rendering (SSR)** approaches. It also covers best practices for **React Folder Structure** and offers a structured explanation of **React Hooks**, categorized into three levels: **Basic**, **Intermediate**, and **Custom Hooks**.
</h3>
---

## 🚀 1. React Architecture Flow

### 🔹 **Client-Side Rendering (CSR)**

- Initial HTML served with minimum content
- JavaScript bundle is downloaded by browser
- React initializes and renders UI on the client
- Faster navigation after first load
- Good for SPAs and interactive UIs

### 🔹 **Server-Side Rendering (SSR)**

- HTML is rendered on the server
- Faster Time-To-Content (TTC)
- SEO-Friendly
- Client-side hydration takes over after HTML load
- Commonly used in frameworks like **Next.js**

---

## 🗂️ 2. Recommended Folder Structure

```
src/
│── assets/
│── components/
│── hooks/
│── pages/
│── context/
│── services/
│── utils/
│── layouts/
│── App.js
│── main.jsx
```

---

## 🧩 3. React Hooks (Three Categories)

React Hooks in this folder are organized into **three parts** for structured learning and clarity.

---

# 📌 PART 1 — Basic React Hooks

(Used in almost every project)

### **1. useState**

- Manages local component state
- Used for toggles, inputs, counters, UI updates

### **2. useEffect**

- Runs side effects
- API calls, subscriptions, event listeners, timers

### **3. useContext**

- Global state sharing across components
- Avoids prop drilling

---

# 📌 PART 2 — Intermediate React Hooks

(Used for performance optimization and advanced logic)

### **1. useRef**

- Access DOM elements
- Store mutable values without re-rendering

### **2. useMemo**

- Memoizes expensive calculations
- Prevents unnecessary recalculations

### **3. useCallback**

- Memoizes callback functions
- Prevents unnecessary re-renders in child components

### **4. useReducer**

- Best for complex state logic
- Alternative to useState
- Similar to Redux reducer pattern

### **5. useLayoutEffect**

- Runs synchronously before the browser paints
- Useful for layout measurements

---

# 📌 PART 3 — Custom Hooks

(Reusable logic extracted into functions)

### **1. useFetch**

- Fetch API data
- Handles loading and error states

### **2. useDebounce**

- Delay execution of a function
- Useful for search bars, API calls

### **3. useLocalStorage**

- Sync state with localStorage
- Persistent state across reloads

### **4. useFormHandler**

- Manage form inputs, validation, errors

### **5. useTheme**

- Light/Dark mode logic
- Stores preference in localStorage

### **6. useToggler**

- Simple toggle logic
- Reusable for menus, modals, accordions

---

## 🎯 Purpose of This Folder

This folder is built to provide:

✔️ A complete understanding of **React Architecture**
✔️ Industry-level **folder structure**
✔️ A categorized **Hooks reference** for beginners → advanced learners
✔️ Reusable custom hooks to speed up development
✔️ A real-world learning guide for production-ready React applications

---
