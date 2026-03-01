import "./App.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "./store";
import { addTarget } from "./store/game.ts";

function App() {
  const dispatch = useDispatch();
  const targets = useSelector((state) => state.targets);

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => dispatch(addTarget(data)));
  }, [dispatch]);

  return <h1>{JSON.stringify(targets)}</h1>;
}

export default App;
