import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categoryName: '',
  subCategoryName: '',
  courseTagLine: '',
  courseName: '',
  description: '',
  learningOutCome: '',
  requirements: '',
  coursePhoto: '',
  previewVideo: '',
  difficultyLevel: ' ',
  courseKeyword: '',
}

export const overViewDataSlice = createSlice({
  name: 'overViewData',
  initialState,
  reducers: {
    storeoverViewData: (state, action) => {
      console.log('overViewDataSlice', action.payload)
      state.categoryName = action.payload.videoCategory
      state.subCategoryName = action.payload.videoSubCategory
      state.courseTagLine = action.payload.tagline
      state.courseName = action.payload.videoTitle
      state.description = action.payload.description
      state.learningOutCome = action.payload.courseOutcome
      state.requirements = action.payload.requirements
      state.difficultyLevel = action.payload.difficultyLevel
      state.courseKeyword = action.payload.courseKeyWord
    },
    storeoverViewVideo: (state, action) => {
      state.previewVideo = action.payload.videoUpload
    },
    storeoverViewPhoto: (state, action) => {
      state.coursePhoto = action.payload.imageUpload
    },
  },
})

export const {
  storeoverViewData,
  storeoverViewVideo,
  storeoverViewPhoto,
} = overViewDataSlice.actions

export default overViewDataSlice
