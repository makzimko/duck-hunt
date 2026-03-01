export type TargetDTO = {
  id: number;
  duration: number;
  direction: "left" | "right";
};

export type ScoreDTO = {
  total: number;
  hit: number;
  miss: number;
};
