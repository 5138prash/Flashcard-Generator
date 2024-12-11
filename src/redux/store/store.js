import { configureStore } from '@reduxjs/toolkit';
import cardReducer from '../reducers/cardSlice';

export const store = configureStore({
  reducer: {
    cards: cardReducer,
  },
});
