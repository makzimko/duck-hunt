import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TargetDTO } from "types";

type GameState = {
  score: number;
  targets: TargetDTO[];
};

const gameSlice = createSlice({
  name: "game",
  initialState: { score: 0, targets: [] } as GameState,
  reducers: {
    addTarget: (state, { payload }: PayloadAction<TargetDTO>) => {
      state.targets.push(payload);
    },
    hitTarget: (state, { payload }: PayloadAction<TargetDTO["id"]>) => {
      state.score += 10;
      state.targets = state.targets.filter(({ id }) => id !== payload);
      console.log("target hit", payload);
    },
    missTarget: (state, { payload }: PayloadAction<TargetDTO["id"]>) => {
      state.score -= 10;
      state.targets = state.targets.filter(({ id }) => id !== payload);
      console.log("target miss", payload);
    },
  },
});

export const { addTarget, hitTarget, missTarget } = gameSlice.actions;

export default gameSlice.reducer;
