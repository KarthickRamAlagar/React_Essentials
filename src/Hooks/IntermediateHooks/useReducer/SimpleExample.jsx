// import { useState } from "react";

// const SimpleExample = () => {
//   const [count, setCount] = useState(0);

//   return (
//     <div>
//       <h2>Count: {count}</h2>
//       <button onClick={() => setCount(count + 1)}>Increment</button>
//       <button onClick={() => setCount(count - 1)}>Decrement</button>
//       <button onClick={() => setCount(0)}>Reset</button>
//     </div>
//   );
// };

// export default SimpleExample;


import {useReducer} from 'react'

const initialState={
    count:0
}

function reducer(state,action){
    switch(action.type){
        case'Increment':
          return{count:state.count+1};
        case'Decrement':
          return{count:state.count-1};
        case'Reset':
          return{count:0};
        default:
            return state;  
    }
}
const SimpleExample = () => {
  
    const[state,dispatch]= useReducer(reducer,initialState)

  return (
    <div>
      <h2>Count:{state.count}</h2>
      <h3>From UseReducer Hook</h3>
      <button onClick={() => dispatch({ type: "Increment" })}>Increment</button>
      <button onClick={() => dispatch({ type: "Decrement" })}>Decrement</button>
      <button onClick={() => dispatch({ type: "Reset" })}>Reset</button>
    </div>
  );
}

export default SimpleExample