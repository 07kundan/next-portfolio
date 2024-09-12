import { createSlice } from "@reduxjs/toolkit";

const playgroundSlice = createSlice({
  name: "playground",
  initialState: {
    isActive: false,
  },

  reducers: {
    setIsActive: (state) => {
      // console.log("payload", action.payload);
      // if (action.payload === "toggle") {
      state.isActive = !state.isActive;

      // }
    },
  },
});

export const { setIsActive } = playgroundSlice.actions;
export default playgroundSlice.reducer;
