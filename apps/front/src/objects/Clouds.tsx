import { type FC, useMemo } from "react";
import { Image } from "react-konva";
import useImage from "use-image";

type TileProps = {
  width: number;
  height: number;
};

type CloudItem = {
  x: number;
  y: number;
  id: number;
};

const Clouds: FC<TileProps> = ({ width, height }) => {
  const [image] = useImage("/cloud.png");
  const clouds = useMemo<CloudItem[]>(
    () =>
      [0, 1, 2].map((i) => ({
        id: i,
        x: (i * width) / 3 + width * 0.1,
        y: (Math.random() * height) / 3 + height * 0.1,
      })),
    [width, height],
  );

  const imageWidth = width * 0.1;
  const imageHeight = imageWidth * 0.75;

  return clouds.map(({ id, x, y }) => (
    <Image
      key={id}
      image={image}
      width={imageWidth}
      height={imageHeight}
      x={x}
      y={y}
    />
  ));
};

export default Clouds;
