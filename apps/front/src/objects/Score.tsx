import { type FC, useMemo } from "react";
import { Group } from "react-konva";
import useImage from "use-image";
import { useSelector } from "../store";
import Digit from "./Digit.tsx";

type ScoreProps = {
  x: number;
  y: number;
};

const Score: FC<ScoreProps> = ({ x, y }) => {
  const [image] = useImage("/digits.png");
  const total = useSelector((state) => state.score.total);
  const hit = useSelector((state) => state.score.hit);

  const score = useMemo(
    () =>
      [...hit.toString().split(""), "-", ...total.toString().split("")].map(
        (value, i) => ({ value, id: i }),
      ),
    [hit, total],
  );

  return (
    image && (
      <Group x={x} y={y}>
        {score.map(({ value, id }) => (
          <Digit key={id} value={value} image={image} x={id * 30} />
        ))}
      </Group>
    )
  );
};

export default Score;
