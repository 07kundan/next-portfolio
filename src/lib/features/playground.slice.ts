import { createSlice } from "@reduxjs/toolkit";

const playgroundSlice = createSlice({
  name: "playground",
  initialState: {
    isActive: true,
  },

  reducers: {
    setIsActive: (state, action) => {
      // console.log("payload", action.payload);

      if (action.payload === "toggle") {
        state.isActive = !state.isActive;
      } else {
        if (action.payload === "/") {
          state.isActive = true;
        } else {
          state.isActive = false;
        }
      }
    },
  },
});

export const { setIsActive } = playgroundSlice.actions;
export default playgroundSlice.reducer;
