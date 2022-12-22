import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lesson: [],
};

export const LessonSlice = createSlice({
  name: 'lesson',
  initialState,
  reducers: {
    storelesson: (state, action) => {
      state.lesson = [...state.lesson, action.payload];
    },
  },
});

export const { storelesson } = LessonSlice.actions;

export default LessonSlice;
