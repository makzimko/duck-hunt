import { configureStore } from "@reduxjs/toolkit";
import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from "react-redux";

import gameReducer from "./game.ts";

const store = configureStore({
  reducer: gameReducer,
});

export const useDispatch = useReduxDispatch.withTypes<typeof store.dispatch>();
export const useSelector =
  useReduxSelector.withTypes<ReturnType<typeof store.getState>>();

export default store;
