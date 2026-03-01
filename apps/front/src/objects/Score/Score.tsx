import type { FC } from "react";
import { Text } from "react-konva";

type ScoreProps = {
  value: number;
};

const Score: FC<ScoreProps> = ({ value }) => {
  return <Text text={value.toString()} />;
};

export default Score;
