import { useState } from "react";

export default function Counter() {
  const [counter, setCounter] = useState(0);

  const incrementCounter = () => {
    setCounter((num) => num++);
  };

  return (
    <>
      <button onClick={incrementCounter}>Increment counter</button>
      <span>Counter: {counter}</span>
    </>
  );
}
