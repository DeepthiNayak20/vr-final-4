import { createSlice } from '@reduxjs/toolkit'

const initialState = {}
export const videoAccordianSlice = createSlice({
  name: 'videoAccordian',
  initialState,
  reducers: {
    videoAccordion: (state, action) => {
      state.description = action.payload
    },
  },
})

export const { videoAccordion } = videoAccordianSlice.actions

export default videoAccordianSlice
