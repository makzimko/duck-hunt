import "./App.css";
import { useCallback, useEffect } from "react";
import { Layer, Stage } from "react-konva";
import Target from "./objects/Target/Target.tsx";
import { useDispatch, useSelector } from "./store";
import { addTarget, hitTarget, missTarget } from "./store/game.ts";

function App() {
  const dispatch = useDispatch();
  const targets = useSelector((state) => state.targets);

  const hitHandler = useCallback(
    (id: number) => dispatch(hitTarget(id)),
    [dispatch],
  );
  const missHandler = useCallback(
    (id: number) => dispatch(missTarget(id)),
    [dispatch],
  );

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => dispatch(addTarget(data)));
  }, [dispatch]);

  return (
    <Stage width={800} height={600}>
      <Layer>
        {targets.map((item) => (
          <Target
            key={item.id}
            {...item}
            layoutWidth={800}
            layoutHeight={600}
            onHit={hitHandler}
            onMiss={missHandler}
          />
        ))}
      </Layer>
    </Stage>
  );
}

export default App;
