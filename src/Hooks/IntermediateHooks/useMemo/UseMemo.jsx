import React, { useState, useMemo } from "react";

function UseMemo() {
  const [count, setCount] = useState(0);

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
    </div>
  );
}

export default UseMemo;
