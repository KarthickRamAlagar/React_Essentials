// Parent–Child React component flow that logs lifecycle events using useEffect

import React, { useState, useEffect } from "react";

// Child Component
function Child({ count }) {
  // runs only once when the component is mounted and unmounted
  useEffect(() => {
    console.log("Child Mounted");

    return () => {
      console.log("Child Unmounted");
    };
  }, []);

  // runs whenever the value of count changes
  useEffect(() => {
    console.log("Child Updated , count=", count);
  }, [count]);

  return (
    <div style={{ border: "1px solid green", padding: "10px", margin: "10px" }}>
      <h3>Child Component</h3>
      <p>Count : {count}</p>
    </div>
  );
}

//Parent Component
export default function Parent() {
  const [count, setCount] = useState(1);
  const [showChild, setShowChild] = useState(true);
  return (
    <div style={{ padding: "20px" }}>
      <h2>Parent Component </h2>
      <button onClick={() => setShowChild((prev) => !prev)}>
        {showChild ? "Hide Child" : "Show Child"}
      </button>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <p>Parent Count: {count}</p>
      {showChild && <Child count={count} />}
    </div>
  );
}



// What this demonstrates:

// Mounting:

// When the Child component first appears, Child Mounted is logged.

// Updating:

// When the parent increments count, Child Updated: count = ... is logged.

// Unmounting:

// When the parent hides the child, Child Unmounted is logged.