import type { FC } from "react";
import { Text } from "react-konva";
import type { ScoreDTO } from "types";

type ScoreProps = {
  value: ScoreDTO;
};

const Score: FC<ScoreProps> = ({ value }) => {
  return <Text text={JSON.stringify(value)} />;
};

export default Score;
