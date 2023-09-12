import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IBook {
  title: string;
  author: string;
}

const initialState: IBook = {
  title: '',
  author: '',
};

const BookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    setPriceRange: (state, action: PayloadAction<string>) => {
      state.author = action.payload;
    },
  },
});

export const { setPriceRange } = BookSlice.actions;

export default BookSlice.reducer;
