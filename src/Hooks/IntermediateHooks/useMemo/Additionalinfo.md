

## **1️⃣ Filtering/Search Example**

Imagine a **large list of products** and a **search input**:

```javascript
import React, { useState, useMemo } from "react";

const products = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Smartphone" },
  { id: 3, name: "Headphones" },
  { id: 4, name: "Keyboard" },
  { id: 5, name: "Mouse" },
  // imagine 1000+ products
];

function ProductList() {
  const [search, setSearch] = useState("");

  // useMemo to filter products only when search changes
  const filteredProducts = useMemo(
    () =>
      products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  return (
    <div>
      <h1>Products</h1>
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
```

✅ **Why `useMemo` is useful here:**

* Without `useMemo`, the **filter operation runs on every render**, even when typing in other unrelated inputs.
* With `useMemo`, the list **only recalculates when `search` changes**.
* Great for **large datasets** or **complex filtering logic**.

---

## **2️⃣ useMemo + Expensive Computation Example**

Let’s combine **`count` + heavy computation**:

```javascript
function ExpensiveCounter() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  const doubleCount = useMemo(() => {
    console.log("Heavy calculation running...");
    let total = 0;
    for (let i = 0; i < 1e7; i++) total += i; // simulate heavy task
    return count * 2;
  }, [count]);

  return (
    <div>
      <h1>Count: {count}</h1>
      <h2>Double Count: {doubleCount}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <input
        type="text"
        placeholder="Type something..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
}
```

* Typing in input → **no re-calculation** of heavy loop.
* Clicking Increment → recalculation happens.

💡 **Interview Tip:** You can explain this as **optimization for expensive operations**.

---

## **3️⃣ useMemo + React.memo Example**

Imagine a child component that **receives an object prop**:

```javascript
import React, { useState, useMemo } from "react";

// Child component
const Child = React.memo(({ config }) => {
  console.log("Child rendered");
  return <div>Theme: {config.theme}</div>;
});

function App() {
  const [count, setCount] = useState(0);

  // Without useMemo, config object recreated on every render → Child re-renders
  const config = useMemo(() => ({ theme: "dark" }), []);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Child config={config} />
    </div>
  );
}

export default App;
```

✅ **Explanation:**

* `React.memo` prevents **re-render if props don’t change**.
* Objects are **reference types**. Without `useMemo`, `{ theme: "dark" }` is a **new object each render**, causing Child to re-render unnecessarily.
* `useMemo` ensures the object **stays the same between renders** unless dependencies change.

---

## **4️⃣ Key Real-World Use Cases for Interviews**

| Use Case                                      | Why useMemo?                                      |
| --------------------------------------------- | ------------------------------------------------- |
| Filtering/searching large lists               | Avoid recalculating filtered list on every render |
| Expensive computations                        | Avoid heavy CPU tasks repeatedly                  |
| Derived values (totals, averages, charts)     | Only recalculate when source data changes         |
| Passing objects/arrays to React.memo children | Prevent unnecessary child re-renders              |
| Complex layouts or canvas/chart calculations  | Save time on layout/position calculations         |

---

💡 **Interview Tip:**

* Always mention **“optimization”** when describing `useMemo`.
* Highlight **dependency array correctness**.
* Distinguish it from **`useCallback`**, which is for memoizing **functions**, not values.
* Stress that **`useMemo` does not prevent re-renders**, only recalculation of values.

---

Perfect! Let’s clearly **differentiate** `useMemo()` and `React.memo` because they often confuse people. I’ll explain in simple terms, with examples and interview-ready clarity.

---

## **1️⃣ useMemo()**

**Definition:**
`useMemo` is a **React hook** that **memoizes a computed value**. It **prevents expensive calculations from running unnecessarily** on every render.

**Key Points:**

* Returns a **value**.
* Recomputes **only when dependencies change**.
* Does **not prevent re-renders**; it optimizes **value computation**.
* Used for **heavy calculations, filtering, sorting, derived data**.
* **Not for side effects** (use `useEffect` for that).

**Example:**

```javascript
import React, { useState, useMemo } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  const doubleCount = useMemo(() => {
    console.log("Calculating double count...");
    return count * 2;
  }, [count]);

  return (
    <div>
      <h1>Count: {count}</h1>
      <h2>Double Count: {doubleCount}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <input value={text} onChange={(e) => setText(e.target.value)} />
    </div>
  );
}
```

✅ **Explanation:**

* Typing in `text` → **no recomputation**.
* Clicking Increment → recomputation happens because `count` changed.

---

## **2️⃣ React.memo**

**Definition:**
`React.memo` is a **Higher Order Component (HOC)** that **memoizes the rendered output of a component**.
It **prevents unnecessary re-renders** if the component’s **props haven’t changed**.

**Key Points:**

* Used for **function components**.
* Returns a **memoized component**.
* Re-renders **only when props change**.
* Often used with `useMemo` or `useCallback` to **avoid reference inequality**.

**Example:**

```javascript
import React, { useState } from "react";

// Child component wrapped with React.memo
const Child = React.memo(({ name }) => {
  console.log("Child rendered");
  return <div>Child: {name}</div>;
});

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Child name="Karthick" />
    </div>
  );
}
```

✅ **Explanation:**

* Child does **not re-render** when `count` changes because its **props didn’t change**.
* Console will only log `"Child rendered"` **once**.

---

## **3️⃣ Key Difference Between useMemo and React.memo**

| Feature           | `useMemo`                            | `React.memo`                               |
| ----------------- | ------------------------------------ | ------------------------------------------ |
| Type              | Hook                                 | HOC (Higher Order Component)               |
| Purpose           | Memoize a **computed value**         | Memoize **component rendering**            |
| Returns           | Value                                | Component                                  |
| Re-render Control | Does **not prevent re-renders**      | Prevents **re-renders if props unchanged** |
| Use Case          | Expensive calculation, derived data  | Functional child components                |
| Dependency        | Array of dependencies `[dep1, dep2]` | Props change                               |

---

💡 **Interview Tip:**

* `useMemo` → optimize **values**
* `React.memo` → optimize **components**
* Often used **together**: memoized value passed to memoized child component to fully avoid unnecessary work.

---


