import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: '',
  data: {},
  courseId: '',
}

export const courseIdSlice = createSlice({
  name: 'courseId',
  initialState,
  reducers: {
    storecourseId: (state, action) => {
      console.log('courseId slice', action.payload)
      state.courseId = action.payload
    },
  },
})

export const { storecourseId } = courseIdSlice.actions

export default courseIdSlice
