import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showNewPW: false,
};

export const showNewPWSlice = createSlice({
  name: 'showNewPW',
  initialState,
  reducers: {
    showNewPW: (state, action) => {
      state.showNewPW = action.payload;
    },
  },
});

export const { showNewPW } = showNewPWSlice.actions;

export default showNewPWSlice;
