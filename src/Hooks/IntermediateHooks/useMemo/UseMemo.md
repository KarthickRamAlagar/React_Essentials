## **🔹 useMemo() – Complete Guide**

### **1️⃣ Concept**

`useMemo` is a **React hook** that **memoizes a computed value** — i.e., it caches the result of a function **so it doesn’t get recalculated unnecessarily on every render**.

**Syntax:**

```javascript
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

* **Callback function:** `() => computeExpensiveValue(a, b)` → the computation you want to memoize.
* **Dependency array:** `[a, b]` → recalculate only if `a` or `b` change.
* **Returns:** the memoized value.

**Key idea:** `useMemo` **does not prevent re-rendering**. It **only prevents expensive recalculation of values**.

---

### **2️⃣ When to Use `useMemo`**

1. **Expensive calculations** that slow down your UI.
2. **Derived state** — values computed from props/state.
3. **Prevent unnecessary re-renders** in combination with `React.memo()` (though `useCallback` is for functions).
4. **Complex object/array creation** passed as props to child components (avoids reference inequality triggering re-renders).

---

### **3️⃣ Basic Example**

```javascript
import React, { useState, useMemo } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  // Expensive function simulation
  const expensiveCalculation = (num) => {
    console.log("Calculating...");
    for (let i = 0; i < 1e8; i++) {} // simulate heavy computation
    return num * 2;
  };

  const doubleCount = useMemo(() => expensiveCalculation(count), [count]);

  return (
    <div>
      <h1>Count: {count}</h1>
      <h2>Double Count (Memoized): {doubleCount}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <input
        type="text"
        placeholder="Type here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
}

export default App;
```

✅ **Explanation:**

* Without `useMemo`, `expensiveCalculation` runs **on every render**, even when `text` changes.
* With `useMemo`, `expensiveCalculation` runs **only when `count` changes**.

---

### **4️⃣ Real-World Use Cases**

1. **Filtering or Sorting Large Lists**

```javascript
const filteredItems = useMemo(
  () => items.filter(item => item.name.includes(searchTerm)),
  [items, searchTerm]
);
```

* Prevents re-filtering **every render**.
* Useful in **tables, product lists, dashboards**.

2. **Derived Computed Values**

```javascript
const totalPrice = useMemo(
  () => cart.reduce((sum, item) => sum + item.price * item.qty, 0),
  [cart]
);
```

* Recalculates **only when `cart` changes**.
* Perfect for **shopping cart totals**.

3. **Passing Memoized Objects to Children**

```javascript
const config = useMemo(() => ({ theme: "dark", showSidebar: true }), []);
<ChildComponent config={config} />
```

* Prevents child components wrapped in `React.memo()` from re-rendering unnecessarily.

4. **Expensive Animations or Layout Calculations**

* Compute **canvas drawing points**, chart positions, or **complex layout calculations** once, then reuse.

---

### **5️⃣ Key Points & Best Practices**

* `useMemo` is **performance optimization**, **not a solution for every render**.
* Avoid overusing it; sometimes recalculating is cheaper than memoizing.
* Always include **all relevant dependencies** in the dependency array.
* **Do not use `useMemo` for side effects** — it’s only for memoizing values.

---

### **6️⃣ Interview Tips**

* **Explain difference with `useCallback`:**

  * `useMemo` → memoizes **values**.
  * `useCallback` → memoizes **functions**.
* **Real-world example question:**
  *“You have a large list of users filtered by a search input. How do you optimize renders?”* → use `useMemo` to memoize filtered list.
* **Common mistake:** forgetting dependencies → stale or incorrect values.

---

### **7️⃣ Quick Quiz**

1. Does `useMemo` prevent re-renders? → ❌ No, only memoizes **values**.
2. What happens if the dependency array is empty? → Memoized value calculated **once** and never recalculated.
3. Can you use `useMemo` to fetch data? → ❌ No, use `useEffect` for side effects.

---

