import { useState } from "react";

export default function Counter() {
  const [counter, setCounter] = useState(0);

  const incrementCounter = () => {
    console.log("Increasing counter...");
    setCounter((num) => num + 1);
  };

  return (
    <>
      <button onClick={incrementCounter}>Increment counter</button>
      <span>Counter: {counter}</span>
    </>
  );
}
