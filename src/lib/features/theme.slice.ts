import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    theme: "dark",
  },

  reducers: {
    toggleTheme: (state, action) => {
      if (action.payload) {
        state.theme = action.payload;
      } else {
        const newTheme = state.theme === "light" ? "dark" : "light";
        state.theme = newTheme;
      }

      // Update the HTML class and save the new theme in localStorage
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(state.theme);
      localStorage.setItem("theme", state.theme);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
