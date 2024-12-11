import { createSlice } from '@reduxjs/toolkit';

const INIT_STATE = JSON.parse(localStorage.getItem('flashCards')) || [];
 
const cardSlice = createSlice({
  name: 'cards',
  initialState: INIT_STATE,
  reducers: {
    createCard: (state, action) => {
      state.push(action.payload);
    },
    deleteCard: (state, action) => {
      const updatedCards = state.filter((_, index) => index !== action.payload);
      localStorage.setItem('flashCards', JSON.stringify(updatedCards));
      return updatedCards;
    },
  },
});

export const { createCard, deleteCard } = cardSlice.actions;
export default cardSlice.reducer;
