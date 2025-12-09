
## **`useState` — Complete Guide**

### **1️⃣ Definition**

> **`useState` is a React Hook that allows you to add and manage local, dynamic state inside functional components.**
> When state changes, React automatically re-renders the component to reflect the updated state in the UI.

* Introduced in **React 16.8**.
* Replaces the need for class-based state (`this.state`).

---

### **2️⃣ Syntax**

```javascript
const [stateVariable, setStateFunction] = useState(initialValue);
```

**Explanation:**

| Part               | Meaning                                                                                    |
| ------------------ | ------------------------------------------------------------------------------------------ |
| `stateVariable`    | Current state value (read-only)                                                            |
| `setStateFunction` | Function to update state (triggers re-render)                                              |
| `initialValue`     | Optional default value for the state (can be number, string, array, object, boolean, etc.) |

---

### **3️⃣ Inputs (What you provide to `useState`)**

1. **Initial state value**

   * Can be **primitive** (number, string, boolean) or **complex** (array, object, function).
   * Optional: If omitted, the initial value is `undefined`.

**Examples:**

```javascript
const [count, setCount] = useState(0); // number
const [name, setName] = useState(""); // string
const [isOpen, setIsOpen] = useState(false); // boolean
const [items, setItems] = useState([]); // array
const [user, setUser] = useState({ name: "", age: 0 }); // object
```

2. **Lazy initialization (optional)**

   * If the initial state is expensive to compute, you can provide a **function** to calculate it only once:

```javascript
const [data, setData] = useState(() => computeExpensiveValue());
```

---

### **4️⃣ Outputs (What `useState` gives you)**

`useState` always returns an **array with two elements**:

1. **Current state** — the value stored in the component.
2. **Updater function** — a function to update the state; can accept:

   * **Direct value** → `setCount(5)`
   * **Function** → `setCount(prev => prev + 1)` (useful when new state depends on previous state)

---

### **5️⃣ How It Works (Lifecycle of `useState`)**

1. Component renders → React sets `stateVariable` to `initialValue`.
2. User interacts or logic triggers `setStateFunction`.
3. `setStateFunction` schedules an **update**, React **re-renders** the component.
4. The updated value is now available in `stateVariable`.
5. Previous state is **replaced**, not merged (unlike class `setState`).

---

### **6️⃣ Key Points / Rules**

1. Only call `useState` **inside functional components** (or custom hooks).
2. **Never call `useState` inside loops, conditions, or nested functions.**
3. State updates are **asynchronous**, but React batches them for performance.
4. For **objects/arrays**, you must manually merge/update state:

```javascript
const [user, setUser] = useState({ name: "", age: 0 });

// Correct way to update name
setUser(prev => ({ ...prev, name: "John" }));
```

---

### **7️⃣ Examples (Real Use Cases)**

**Example 1 — Counter**

```javascript
const [count, setCount] = useState(0);

<button onClick={() => setCount(count + 1)}>Increase</button>
```

**Example 2 — Toggle Modal**

```javascript
const [isOpen, setIsOpen] = useState(false);

<button onClick={() => setIsOpen(!isOpen)}>Toggle Modal</button>
```

**Example 3 — Form Input**

```javascript
const [name, setName] = useState("");

<input
  type="text"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>
```

---

### **8️⃣ Summary Table**

| Aspect      | Details                                                             |
| ----------- | ------------------------------------------------------------------- |
| Definition  | Add/manage local dynamic state in functional components             |
| Input       | Initial value (primitive, object, array, function for lazy init)    |
| Output      | `[stateVariable, setStateFunction]`                                 |
| Usage       | User interactions, API responses, UI toggles, form inputs, etc.     |
| Key Rules   | Only in function components, avoid conditional calls, async updates |
| Differences | Unlike class `setState`, does not merge objects automatically       |

---

