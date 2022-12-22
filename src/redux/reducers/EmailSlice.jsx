import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: '',
  data: {},
  emailId: '',
}

export const EmailSlice = createSlice({
  name: 'emailSend',
  initialState,
  reducers: {
    storeEmailForgot: (state, action) => {
      console.log('EmailSlice', action.payload)
      state.emailId = action.payload
    },
  },
})

export const { storeEmailForgot } = EmailSlice.actions

export default EmailSlice
