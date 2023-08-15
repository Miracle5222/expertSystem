import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
export default function Overview() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>{count}</h1>
      <Button onClick={() => setCount(count + 1)}>Button</Button>
    </div>
  );
}
