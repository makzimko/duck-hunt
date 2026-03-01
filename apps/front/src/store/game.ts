import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ScoreDTO, TargetDTO } from "types";

type GameState = {
  score: ScoreDTO;
  targets: TargetDTO[];
};

const gameSlice = createSlice({
  name: "game",
  initialState: {
    score: { total: 0, hit: 0, miss: 0 },
    targets: [],
  } as GameState,
  reducers: {
    addTarget: (state, { payload }: PayloadAction<TargetDTO>) => {
      state.score.total += 1;
      state.targets.push(payload);
    },
    hitTarget: (state, { payload }: PayloadAction<TargetDTO["id"]>) => {
      state.score.hit += 1;
      state.targets = state.targets.filter(({ id }) => id !== payload);
    },
    missTarget: (state, { payload }: PayloadAction<TargetDTO["id"]>) => {
      state.score.miss += 1;
      state.targets = state.targets.filter(({ id }) => id !== payload);
    },
  },
});

export const { addTarget, hitTarget, missTarget } = gameSlice.actions;

export default gameSlice.reducer;
