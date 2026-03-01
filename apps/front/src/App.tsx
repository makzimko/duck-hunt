import "./App.css";
import type Konva from "konva";
import { useCallback, useEffect, useState } from "react";
import { Layer, Stage } from "react-konva";
import Pointer from "./objects/Pointer";
import Score from "./objects/Score";
import Target from "./objects/Target";
import { useDispatch, useSelector } from "./store";
import { addTarget, hitTarget, missTarget } from "./store/game";

function App() {
  const dispatch = useDispatch();
  const targets = useSelector((state) => state.targets);
  const score = useSelector((state) => state.score);
  const [pointer, setPointer] = useState<Konva.Vector2d>({ x: 0, y: 0 });

  const hitHandler = useCallback(
    (id: number) => dispatch(hitTarget(id)),
    [dispatch],
  );
  const missHandler = useCallback(
    (id: number) => dispatch(missTarget(id)),
    [dispatch],
  );
  const moveHandler = useCallback(
    (event: Konva.KonvaEventObject<MouseEvent>) => {
      const stage = event.target.getStage();
      const position = stage?.getPointerPosition();
      if (position) {
        setPointer(position);
      }
    },
    [],
  );

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => dispatch(addTarget(data)));
  }, [dispatch]);

  return (
    <Stage
      width={800}
      height={600}
      onMouseMove={moveHandler}
      style={{ cursor: "none" }}
    >
      <Layer>
        <Pointer x={pointer.x} y={pointer.y} />
        <Score value={score} />
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
