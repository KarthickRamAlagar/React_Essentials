import { useState, useCallback } from "react";

//Child Component
const Child = ({ handleClick }) => {
  console.log("Child Component Rendered");
  return <button onClick={handleClick}>Click Child</button>;
};

// Example without useCallback
//Parent Component
const WithoutUseCallBack = () => {
  const [count, setCount] = useState(0);

  // new Function will created on every render
  const handleClick = () => {
    console.log("Clicked");
  };

  return (
    <div>
      <button onClick={() => setCount((prev) => prev + 1)}>Increment</button>
      <Child handleClick={handleClick} />
    </div>
  );
};

export default WithoutUseCallBack;
