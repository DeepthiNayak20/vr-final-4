import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  videoLink: '',
}

export const videoLinkSlice = createSlice({
  name: 'videoLink',
  initialState,
  reducers: {
    storevideoLink: (state, action) => {
      state.videoLink = action.payload
    },
  },
})

export const { storevideoLink } = videoLinkSlice.actions

export default videoLinkSlice
