import { configureStore } from "@reduxjs/toolkit";
import playgroundSlice from "./features/playground.slice";
import svgPositionSlice from "./features/svgPosition.slice";
import themeSlice from "./features/theme.slice";
// Global state
export const makeStore = () => {
  return configureStore({
    reducer: {
      playgroud: playgroundSlice,
      svgPosition: svgPositionSlice,
      themeStatus: themeSlice,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
