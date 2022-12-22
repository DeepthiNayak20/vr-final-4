import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: '',
  data: {},
  description: '',
}

export const videoAccordianSlice = createSlice({
  name: 'videoAccordian',
  initialState,
  reducers: {
    videoPlayerUpload: (state, action) => {
      state.description = action.payload
    },
  },
})

export const { videoPlayerUpload } = videoAccordianSlice.actions

export default videoAccordianSlice
