import "./App.css";
import type Konva from "konva";
import { useCallback, useState } from "react";
import { Layer, Stage } from "react-konva";
import useGame from "../useGame";
import Clouds from "./objects/Clouds";
import Pointer from "./objects/Pointer";
import Score from "./objects/Score";
import Target from "./objects/Target";
import Tile from "./objects/Tile";

const WIDTH = 1000;
const HEIGHT = 600;

function App() {
  const [pointer, setPointer] = useState<Konva.Vector2d>({ x: 0, y: 0 });

  const { onHit, onMiss, targets, score } = useGame();
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

  return (
    <Stage
      width={WIDTH}
      height={HEIGHT}
      onMouseMove={moveHandler}
      style={{ cursor: "pointer", background: "#4DA9FF" }}
    >
      <Layer>
        <Score value={score} />
        <Pointer x={pointer.x} y={pointer.y} />
        {targets.map((item) => (
          <Target
            key={item.id}
            {...item}
            layoutWidth={WIDTH}
            layoutHeight={HEIGHT}
            onHit={onHit}
            onMiss={onMiss}
          />
        ))}
      </Layer>
      <Layer>
        <Tile width={WIDTH} height={HEIGHT} />
        <Clouds width={WIDTH} height={HEIGHT} />
      </Layer>
    </Stage>
  );
}

export default App;
