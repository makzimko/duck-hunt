import type { FC } from "react";
import { Rect } from "react-konva";

type PointerProps = {
  x: number;
  y: number;
};

const Pointer: FC<PointerProps> = ({ x, y }) => {
  return <Rect width={10} height={10} x={x} y={y} fill="lightgreen" />;
};

export default Pointer;
