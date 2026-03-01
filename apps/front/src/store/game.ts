import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Target } from "types";

type GameState = {
  score: number;
  targets: Target[];
};

const gameSlice = createSlice({
  name: "game",
  initialState: { score: 0, targets: [] } as GameState,
  reducers: {
    addTarget: (state, { payload }: PayloadAction<Target>) => {
      state.targets.push(payload);
    },
    shootTarget: (_, { payload }: PayloadAction<Target["id"]>) => {
      console.log("shoot target", payload);
    },
  },
});

export const { addTarget, shootTarget } = gameSlice.actions;

export default gameSlice.reducer;
