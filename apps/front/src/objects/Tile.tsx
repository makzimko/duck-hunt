import type { FC } from "react";
import { Image } from "react-konva";
import useImage from "use-image";

type TileProps = {
  width: number;
  height: number;
};

const Tile: FC<TileProps> = ({ width, height }) => {
  const [image] = useImage("/tile.png");
  const imageHeight = width * 0.32;

  return (
    <Image
      image={image}
      width={width}
      height={imageHeight}
      y={height - imageHeight}
    />
  );
};

export default Tile;
