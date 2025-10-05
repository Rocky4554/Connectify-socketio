import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlice.js';
import useReducer from './userSlice.js'

const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: useReducer,
  },
});

export default store; 