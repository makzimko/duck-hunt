import type Konva from "konva";
import { type FC, useEffect, useRef } from "react";
import { Sprite } from "react-konva";
import useImage from "use-image";

type PointerProps = {
  x: number;
  y: number;
};

const SIZE = 42;

const animations = {
  basic: [5, 10, SIZE, SIZE, 57, 10, SIZE, SIZE],
};

const Pointer: FC<PointerProps> = ({ x, y }) => {
  const [image, status] = useImage("/sight.png");
  const ref = useRef<Konva.Sprite>(null);

  useEffect(() => {
    if (status === "loaded") {
      ref.current?.start();
    }
  }, [status]);

  return (
    image && (
      <Sprite
        x={x - SIZE / 2}
        y={y - SIZE / 2}
        image={image}
        animation="basic"
        animations={animations}
        frameRate={5}
        frameIndex={0}
        ref={ref}
      />
    )
  );
};

export default Pointer;
