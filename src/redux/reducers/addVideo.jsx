import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: '',
  data: {},
  description: '',
}

export const addVideoSlice = createSlice({
  name: 'addVideo',
  initialState,
  reducers: {
    videoPlayerUpload: (state, action) => {
      state.description = action.payload
    },
  },
})

export const { videoPlayerUpload } = addVideoSlice.actions

export default addVideoSlice
