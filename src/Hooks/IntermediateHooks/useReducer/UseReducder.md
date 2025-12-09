

## ⚛️ **1️⃣ What is `useReducer()`?**

### 🔹 Definition:

`useReducer` is a **React Hook** used to manage **complex state logic** — especially when multiple related states or transitions depend on each other.

It’s an **alternative to `useState`** when:

* You have **multiple sub-values** in state (like objects).
* You want to handle **state transitions in a predictable way**.
* You want **cleaner code** for complex updates (e.g., form handling, async states, counters, etc.).

---

## ⚙️ **2️⃣ Syntax**

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```

* **state** → current state value
* **dispatch** → function to send an action
* **reducer** → function that updates state
* **initialState** → starting value of the state

---

## 🔸 **3️⃣ Basic Example: Counter**

### 🧠 With `useState` (Simple)

```jsx
import { useState } from "react";

function CounterUseState() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
```

### ⚛️ With `useReducer` (Cleaner for complex logic)

```jsx
import { useReducer } from "react";

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    case "RESET":
      return { count: 0 };
    default:
      return state;
  }
}

function CounterUseReducer() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <h2>Count: {state.count}</h2>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>Increment</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>Decrement</button>
      <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>
    </div>
  );
}
```

✅ **Why better here?**
If you later add actions like “DOUBLE”, “HALVE”, or async updates, your logic stays in **one centralized place** — inside the reducer.

---

## 🧩 **4️⃣ Real-time Example: Form Handling**

Let’s now compare **form handling using `useState` vs `useReducer`**.

---

### 🧠 Example 1: Form using `useState`

```jsx
import { useState } from "react";

function FormUseState() {
  const [form, setForm] = useState({ name: "", email: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />
      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

✅ Works fine for **small forms**, but as soon as:

* You have 6+ fields,
* Need validation,
* Manage loading/error/success states,
  …it becomes messy.

---

### ⚛️ Example 2: Form using `useReducer`

```jsx
import { useReducer } from "react";

const initialState = {
  name: "",
  email: "",
  loading: false,
  error: "",
  submitted: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };
    case "SUBMIT_START":
      return { ...state, loading: true, error: "" };
    case "SUBMIT_SUCCESS":
      return { ...state, loading: false, submitted: true };
    case "SUBMIT_ERROR":
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
}

function FormUseReducer() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e) => {
    dispatch({
      type: "UPDATE_FIELD",
      field: e.target.name,
      value: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "SUBMIT_START" });

    // Simulate async API call
    setTimeout(() => {
      if (state.email.includes("@")) {
        dispatch({ type: "SUBMIT_SUCCESS" });
      } else {
        dispatch({ type: "SUBMIT_ERROR", error: "Invalid email address" });
      }
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="Name"
        value={state.name}
        onChange={handleChange}
      />
      <input
        name="email"
        placeholder="Email"
        value={state.email}
        onChange={handleChange}
      />
      <button type="submit" disabled={state.loading}>
        {state.loading ? "Submitting..." : "Submit"}
      </button>

      {state.error && <p style={{ color: "red" }}>{state.error}</p>}
      {state.submitted && <p style={{ color: "green" }}>Form submitted ✅</p>}
    </form>
  );
}
```

✅ **Advantages of `useReducer` here:**

* Single place to manage **state transitions**.
* Easy to handle **loading/error/success** logic.
* Scales better for large forms.

---

## 🧠 **5️⃣ Comparison — `useState` vs `useReducer`**

| Feature    | useState              | useReducer                       |
| ---------- | --------------------- | -------------------------------- |
| State Type | Simple or independent | Complex or interdependent        |
| Updates    | Direct (`setState`)   | Centralized (`dispatch`)         |
| Best For   | Small components      | Complex logic (forms, async ops) |
| Debugging  | Hard when many states | Easier (single reducer)          |
| Example    | Counter, toggle       | Form, Todo, API state            |

---

## 🚀 **6️⃣ Advanced Example — Form with Validation + Reset**

```jsx
import { useReducer } from "react";

const initialState = {
  username: "",
  password: "",
  error: "",
  isSubmitted: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value, error: "" };
    case "SUBMIT":
      if (!state.username || !state.password)
        return { ...state, error: "All fields required" };
      return { ...state, isSubmitted: true };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export default function LoginForm() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e) =>
    dispatch({ type: "UPDATE_FIELD", field: e.target.name, value: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "SUBMIT" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        placeholder="Username"
        value={state.username}
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={state.password}
        onChange={handleChange}
      />
      <button type="submit">Login</button>
      <button type="button" onClick={() => dispatch({ type: "RESET" })}>
        Reset
      </button>

      {state.error && <p style={{ color: "red" }}>{state.error}</p>}
      {state.isSubmitted && <p style={{ color: "green" }}>Login Successful ✅</p>}
    </form>
  );
}
```

✅ **This covers:**

* Field updates
* Validation
* Error handling
* Reset
* Submission tracking

---


