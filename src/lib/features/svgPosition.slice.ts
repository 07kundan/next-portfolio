import { createSlice } from "@reduxjs/toolkit";

const svgPositionSlice = createSlice({
  name: "svgPosition",
  initialState: {
    triggered: true,
  },

  reducers: {
    toggleTriggered: (state) => {
      state.triggered = !state.triggered;
    },
  },
});

export const { toggleTriggered } = svgPositionSlice.actions;
export default svgPositionSlice.reducer;
