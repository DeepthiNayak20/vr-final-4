import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  show: 'profile',
}

export const showProfileSlice = createSlice({
  name: 'showProfile',
  initialState,
  reducers: {
    showProfileFn: (state, action) => {
      state.show = action.payload
    },
  },
})

export const { showProfileFn } = showProfileSlice.actions

export default showProfileSlice
