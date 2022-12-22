import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  questionRequests: [],
}

export const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    storeTest: (state, action) => {
      state.questionRequests = [...state.questionRequests, action.payload]
    },
    testQuestion: (state, action) => {
      state.questionRequests[action.payload.index].questionName =
        action.payload.question
    },
    optionOne: (state, action) => {
      state.questionRequests[action.payload.index].option_1 =
        action.payload.option_1
    },
    optionTwo: (state, action) => {
      state.questionRequests[action.payload.index].option_2 =
        action.payload.option_2
    },
    optionThree: (state, action) => {
      state.questionRequests[action.payload.index].option_3 =
        action.payload.option_3
    },
    optionFour: (state, action) => {
      state.questionRequests[action.payload.index].option_4 =
        action.payload.option_4
    },
    correctAns: (state, action) => {
      state.questionRequests[action.payload.index].correctAnswer =
        state.questionRequests[action.payload.index][action.payload.label]
    },
    deleteStatus: (state, action) => {
      state.questionRequests[action.payload.index].deleteStatus =
        action.payload.deleteStatus
    },
  },
})

export const {
  storeTest,
  testQuestion,
  optionOne,
  optionTwo,
  optionThree,
  optionFour,
  correctAns,
  deleteStatus,
} = testSlice.actions

export default testSlice
