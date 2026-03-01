import "./App.css";
import type Konva from "konva";
import { useCallback, useState } from "react";
import { Layer, Stage, Text } from "react-konva";
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
  const [started, setStarted] = useState(false);

  const { onHit, onMiss, targets, start } = useGame();

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
  const startHandler = useCallback(() => {
    start();
    setStarted(true);
  }, [start]);

  return (
    <Stage
      width={WIDTH}
      height={HEIGHT}
      onMouseMove={moveHandler}
      style={{ cursor: "pointer", background: "#4DA9FF" }}
    >
      <Layer>
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
        {started && <Score x={WIDTH * 0.85} y={HEIGHT * 0.8} />}
        {!started && (
          <Text
            text="Click to start"
            fontSize={50}
            fontFamily="courier new"
            fontStyle="bold"
            align="center"
            width={WIDTH}
            height={HEIGHT}
            verticalAlign="middle"
            onClick={startHandler}
          />
        )}
      </Layer>
    </Stage>
  );
}

export default App;
