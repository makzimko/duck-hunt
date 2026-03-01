import "./App.css";
import { useEffect, useState } from "react";
import type { TestResponse } from "types";

function App() {
  const [data, setData] = useState<TestResponse>();

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  return <h1>{JSON.stringify(data)}</h1>;
}

export default App;
