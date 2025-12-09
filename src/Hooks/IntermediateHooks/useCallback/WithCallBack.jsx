import { useState, useCallback } from "react";

//Child Component
const Child = ({ handleClick }) => {
  console.log("Child Component Rendered");
  return <button onClick={handleClick}>Click Child</button>;
};

// Example with useCallback
//Parent Component
const WithUseCallBack = () => {
  const [count, setCount] = useState(0);

  // new Function will created on every render
  const handleClick = useCallback(() => {
    console.log("Clicked");
  },[]);

  return (
    <div>
      <button onClick={() => setCount((prev) => prev + 1)}>Increment</button>
      <Child handleClick={handleClick} />
    </div>
  );
};

export default WithUseCallBack;
