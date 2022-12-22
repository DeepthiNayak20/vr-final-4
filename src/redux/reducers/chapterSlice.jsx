import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  chapterDataRequestList: [],
}

export const chapterSlice = createSlice({
  name: 'chapter',
  initialState,
  reducers: {
    storechapter: (state, action) => {
      state.chapterDataRequestList = [
        ...state.chapterDataRequestList,
        action.payload,
      ]
    },
    chapterName: (state, action) => {
      console.log('chapter name', action.payload)
      state.chapterDataRequestList[action.payload.index].chapterName =
        action.payload.chapter
    },
    lessonList: (state, action) => {
      state.chapterDataRequestList[action.payload.index].lessonsList = [
        ...state.chapterDataRequestList[action.payload.index].lessonsList,
        action.payload.lesson,
      ]
    },
  },
})

export const { storechapter, chapterName, lessonList } = chapterSlice.actions

export default chapterSlice
