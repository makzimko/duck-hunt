import type { FC } from "react";
import { Image } from "react-konva";

type DigitProps = {
  value: string;
  image: CanvasImageSource;
  x: number;
};

const DIGITS_OFFSET: Record<string, number> = {
  0: 2,
  1: 34,
  2: 66,
  3: 98,
  4: 130,
  5: 162,
  6: 194,
  7: 226,
  8: 258,
  9: 290,
  "-": 322,
};

const Digit: FC<DigitProps> = ({ value, image, x }) => {
  return (
    <Image
      image={image}
      width={30}
      height={30}
      crop={{ x: DIGITS_OFFSET[value], y: 1, width: 30, height: 30 }}
      x={x}
    />
  );
};

export default Digit;
