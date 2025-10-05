import { createSlice } from '@reduxjs/toolkit';

const initialTheme = localStorage.getItem('streamify-theme') || 'coffee';

const themeSlice = createSlice({
  name: 'theme',
  initialState: { theme: initialTheme },
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem('streamify-theme', action.payload);
    },
  },
});

export const { setTheme } = themeSlice.actions;
export const selectTheme = (state) => state.theme.theme;
export default themeSlice.reducer; 