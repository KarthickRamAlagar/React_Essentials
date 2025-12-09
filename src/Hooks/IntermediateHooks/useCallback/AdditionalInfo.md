## 🧩 1️⃣ Lists / Tables with Buttons — “Stable Row Handlers”

### ⚠️ Problem (without `useCallback`)
Each time the parent re-renders, **new handler functions** are created for every row →  
`React.memo` children still re-render unnecessarily.

```jsx
import React, { useState } from "react";

const ProductRow = React.memo(({ product, onAddToCart }) => {
  console.log("Rendered:", product.name);
  return (
    <tr>
      <td>{product.name}</td>
      <td>₹{product.price}</td>
      <td>
        <button onClick={() => onAddToCart(product.id)}>Add to Cart</button>
      </td>
    </tr>
  );
});

const ProductTable = () => {
  const [cart, setCart] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const products = [
    { id: 1, name: "Laptop", price: 50000 },
    { id: 2, name: "Headphones", price: 2000 },
    { id: 3, name: "Chair", price: 2500 },
  ];

  // ❌ This function changes on every render
  const addToCart = (id) => {
    setCart((prev) => [...prev, id]);
  };

  console.log("Parent Rendered");

  return (
    <div>
      <h3>Cart: {cart.length}</h3>
      <button onClick={() => setRefresh((p) => !p)}>Refresh Parent</button>
      <table border="1">
        <tbody>
          {products.map((p) => (
            <ProductRow key={p.id} product={p} onAddToCart={addToCart} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
```

🧨 Problem: Even clicking “Refresh Parent” re-renders **all ProductRow** components,  
because each one receives a *new `onAddToCart` function reference*.

---

### ✅ Solution (with `useCallback`)

```jsx
import React, { useState, useCallback } from "react";

const ProductRow = React.memo(({ product, onAddToCart }) => {
  console.log("Rendered:", product.name);
  return (
    <tr>
      <td>{product.name}</td>
      <td>₹{product.price}</td>
      <td>
        <button onClick={() => onAddToCart(product.id)}>Add to Cart</button>
      </td>
    </tr>
  );
});

const ProductTable = () => {
  const [cart, setCart] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const products = [
    { id: 1, name: "Laptop", price: 50000 },
    { id: 2, name: "Headphones", price: 2000 },
    { id: 3, name: "Chair", price: 2500 },
  ];

  // ✅ Stable reference due to useCallback
  const addToCart = useCallback((id) => {
    setCart((prev) => [...prev, id]);
  }, []);

  console.log("Parent Rendered");

  return (
    <div>
      <h3>Cart: {cart.length}</h3>
      <button onClick={() => setRefresh((p) => !p)}>Refresh Parent</button>
      <table border="1">
        <tbody>
          {products.map((p) => (
            <ProductRow key={p.id} product={p} onAddToCart={addToCart} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
```

✅ Now, when you click “Refresh Parent,”  
👉 Only the parent re-renders — not all rows.  
The child components **skip re-render** because the handler function didn’t change.

---

## 🧠 2️⃣ Debouncing Inputs — “Stable Function for Performance”

When you type in a search bar, you don’t want to call the API every keystroke —  
you want to wait until the user **stops typing**.  
That’s called **debouncing**, and it requires a *stable function reference* to work properly.

---

### ✅ Example: Search with Debouncing

```jsx
import React, { useState, useCallback, useEffect } from "react";

const useDebounce = (callback, delay) => {
  const [timer, setTimer] = useState(null);

  return useCallback(
    (...args) => {
      if (timer) clearTimeout(timer);
      const newTimer = setTimeout(() => {
        callback(...args);
      }, delay);
      setTimer(newTimer);
    },
    [callback, delay, timer]
  );
};

const SearchBox = () => {
  const [query, setQuery] = useState("");

  const handleSearch = useCallback((text) => {
    console.log("🔍 Fetching results for:", text);
  }, []);

  // ✅ Stable debounced function
  const debouncedSearch = useDebounce(handleSearch, 500);

  useEffect(() => {
    if (query.trim() !== "") debouncedSearch(query);
  }, [query, debouncedSearch]);

  return (
    <div>
      <h2>Debounced Search</h2>
      <input
        type="text"
        placeholder="Type to search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchBox;
```

### 🧩 How It Works:
- `useDebounce()` returns a stable debounced function.
- Because of `useCallback()`, this debounced function reference doesn’t change on every render.
- So your debounce logic remains efficient and consistent.

---

### ✅ Output:
Type “React” quickly:
```
R  → no log
Re → no log
Rea → no log
React → 🔍 Fetching results for: React (after 0.5s pause)
```

---

### 💡 Summary

| Use Case | Why `useCallback` Helps |
|-----------|-------------------------|
| 🧾 Table/List with buttons | Keeps button handlers stable and avoids re-rendering of memoized child rows |
| ⌨️ Debouncing/Throttling | Prevents re-creation of the debounced function, ensuring debounce timing is consistent |

---
