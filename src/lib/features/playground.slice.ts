import { createSlice } from "@reduxjs/toolkit";

const playgroundSlice = createSlice({
  name: "playground",
  initialState: {
    isActive: true,
  },

  reducers: {
    setIsActive: (state) => {
      state.isActive = !state.isActive;
      // console.log(state.isActive);
    },
  },
});

export const { setIsActive } = playgroundSlice.actions;
export default playgroundSlice.reducer;
