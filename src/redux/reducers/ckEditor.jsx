import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: '',
  data: {},
  description: '',
}

export const descriptionSlice = createSlice({
  name: 'description',
  initialState,
  reducers: {
    storeDescription: (state, action) => {
      console.log('descriptionSlice', action.payload)
      state.description = action.payload
    },
  },
})

export const { storeDescription } = descriptionSlice.actions

export default descriptionSlice
