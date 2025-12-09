# useContext() ->Context API

---

### **1️⃣ Create Context**

```javascript
export const UserContext = createContext();
```

* `createContext()` is a **React function** that creates a global container to hold data.
* `UserContext` is like a **box** where we can store our users and functions.
* Any component inside this context can **access the data** without passing props manually.

---

### **2️⃣ Provider Component**

```javascript
export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
```

* `UserProvider` is a **special wrapper component** that gives access to the context.
* `users` → This is a **state array** that stores all user objects.
* `setUsers` → This is the **function to update** the users array.

---

### **3️⃣ Add User Function**

```javascript
const addUser = (userData) => setUsers((prev) => [...prev, userData]);
```

* `addUser` is a **helper function** to add a new user.
* `prev` → represents the **current state of users**.
* `[...prev, userData]` → keeps all existing users and adds the new one at the end.

---

### **4️⃣ Update User Function**

```javascript
const updateUser = (index, newData) => {
  setUsers((prev) => {
    const copy = [...prev];
    copy[index] = newData;
    return copy;
  });
};
```

* `updateUser` lets you **edit a user at a specific index**.
* Steps:

  1. Make a **copy** of the current users array.
  2. Replace the user at the given `index` with the new data.
  3. Return the updated array → `setUsers` updates the state globally.

---

### **5️⃣ Delete User Function**

```javascript
const deleteUser = (index) => {
  setUsers((prev) => prev.filter((_, i) => i !== index));
};
```

* `deleteUser` removes a user from the array.
* `filter` keeps all users **except the one at the index** we want to remove.

---

### **6️⃣ Provide Context to Children**

```javascript
return (
  <UserContext.Provider value={{ users, addUser, updateUser, deleteUser }}>
    {children}
  </UserContext.Provider>
);
```

* `<UserContext.Provider>` is like opening the **box for children components**.
* `value={{ users, addUser, updateUser, deleteUser }}` → These are the **things we share globally**.
* `{children}` → All components wrapped inside `UserProvider` can now access the **users and functions**.

---

### ✅ **Simple Analogy**

Think of `UserProvider` as a **big shared notebook**:

* `users` → pages in the notebook with user info.
* `addUser` → pen to write a new user.
* `updateUser` → pen to edit a page.
* `deleteUser` → eraser to remove a page.
* Any child component can **see or use the notebook** without asking its parent every time.

---
Perfect! I understand — you want to **replace your local `users` state with a global `UserContext` store** so that all your form data is saved globally. Essentially, instead of using:

```javascript
const [users, setUsers] = useState([]);
```

…you want to use your `UserContext` (`users`, `addUser`, `updateUser`, `deleteUser`) to manage users.

I’ll guide you step by step:

---

### **1️⃣ Wrap your app with `UserProvider`**

In your `main.jsx` or `App.jsx` (root of your React app):

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { UserProvider } from "./UserContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserProvider>
    <App />
  </UserProvider>
);
```

Now **all components** inside `<App />` can access `users` globally.

---

### **2️⃣ Import and use context inside your form**

In your `GroupDataSending.jsx`:

```jsx
import React, { useRef, useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext"; // import context

const GroupDataSending = () => {
  const { users, addUser, updateUser, deleteUser } = useContext(UserContext);
```

* `users` → global array of users
* `addUser` → adds a new user globally
* `updateUser(index, newData)` → updates a user at index
* `deleteUser(index)` → deletes a user at index

You **no longer need** your local `users` state (`useState([])`).

---

### **3️⃣ Replace `setUsers` with context functions**

Inside `handleSubmit`:

```jsx
if (editIndex !== null) {
  updateUser(editIndex, groupedData); // update global store
  setEditIndex(null);
} else {
  addUser(groupedData); // add to global store
}
```

Inside `handleDelete`:

```jsx
const handleDelete = (index) => {
  deleteUser(index); // delete from global store
};
```

You also **can remove your local storage logic** (or you can implement it inside the `UserProvider` if needed globally).

---

### **4️⃣ Editing works the same**

The `handleEdit` logic stays almost the same. Just remember to call `updateUser` when saving after editing.

---

### ✅ **Summary of Changes**

1. Import `useContext` and `UserContext`.
2. Replace your local `users` state with context values.
3. Replace `setUsers([...])` calls with `addUser` / `updateUser` / `deleteUser`.
4. Now your users are stored **globally** and accessible by any component inside the provider.

---



