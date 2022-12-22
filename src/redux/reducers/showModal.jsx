import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showModal: false,
};

export const showModalSlice = createSlice({
  name: 'showModal',
  initialState,
  reducers: {
    showModal: (state, action) => {
      state.showModal = action.payload;
    },
  },
});

export const { showModal } = showModalSlice.actions;

export default showModalSlice;
