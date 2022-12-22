import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showOtp: false,
};

export const showOtpSlice = createSlice({
  name: 'showOtp',
  initialState,
  reducers: {
    showOtp: (state, action) => {
      state.showOtp = action.payload;
    },
  },
});

export const { showOtp } = showOtpSlice.actions;

export default showOtpSlice;
