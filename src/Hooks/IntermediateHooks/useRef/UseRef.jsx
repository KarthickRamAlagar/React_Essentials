import { useState, useEffect, useRef } from "react";

const UseRef = () => {
  console.log("Component Rendered");

  // Access DOM Elements Directly
  const inputRef = useRef(null);

  // Storing Mutuble value that doesn't re - renders
  const countRef = useRef(0);

  // Compare current vs previous state value
  const [count, setCount] = useState(0);
  const previousCountRef = useRef(count);

  // Focus input Feild when component Mounts
  useEffect(() => {
    inputRef.current.focus();
    console.log("Input Feild is Focused");
  }, []);

  // Track previous count after every renders
  useEffect(() => {
    previousCountRef.current = count;
  }, [count]);

  // Handler to update count
  const handleIncrement = () => {
    setCount(count + 1);
    console.log("State", count);
    console.log("Previous Count:", previousCountRef.current);
  };

  // Handler using ref (no re-render)
  const handleRefIncrement = () => {
    countRef.current += 1; // mutable update
    console.log("🧮 Ref Count:", countRef.current);
  };

  return (
    <div
      style={{
        fontFamily: "sans-serif",
        padding: "30px",
        background: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <h1>⚛️ useRef Complete Example</h1>
      <hr />

      {/* 1️⃣ DOM Access Example */}
      <section style={{ marginBottom: "25px" }}>
        <h2> DOM Access</h2>
        <input
          ref={inputRef}
          type="text"
          placeholder="Type something..."
          style={{
            padding: "10px",
            fontSize: "16px",
            width: "250px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
        <p>
          <em>
            👉 This input is focused automatically using <b>useRef</b>.
          </em>
        </p>
      </section>

      {/*  Mutable Object Example */}
      <section style={{ marginBottom: "25px" }}>
        <h2> Mutable Object (No Re-render)</h2>
        <button
          onClick={handleRefIncrement}
          style={{
            padding: "10px 20px",
            backgroundColor: "#333",
            color: "white",
            borderRadius: "8px",
            border: "none",
          }}
        >
          Increment Ref Count
        </button>
        <p>
          Open console 🔍 — You'll see <code>countRef.current</code> updating,
          but component won't re-render.
        </p>
      </section>

      {/* 3️⃣ Track Previous Value Example */}
      <section>
        <h2>3️⃣ Track Previous Value</h2>
        <h3>
          Current Count: <span style={{ color: "#0078ff" }}>{count}</span>
        </h3>
        <h3>
          Previous Count:{" "}
          <span style={{ color: "#ff4d4d" }}>{previousCountRef.current}</span>
        </h3>
        <button
          onClick={handleIncrement}
          style={{
            padding: "10px 20px",
            backgroundColor: "#0078ff",
            color: "white",
            borderRadius: "8px",
            border: "none",
          }}
        >
          Increment State Count
        </button>
        <p>
          Each render updates <b>prevCountRef.current</b> to store previous
          state.
        </p>
      </section>
    </div>
  );
};

export default UseRef;
