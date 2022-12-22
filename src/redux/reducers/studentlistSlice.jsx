import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  message: '',
  data: [],
  headers: [],
  isSuccess: false,
  isRejected: false,
  loading: false,
}

export const studentListThunk = createAsyncThunk(
  'studentListSlice/studentListThunk',
  async () => {
    try {
      const fetchedData = await axios.request({
        method: 'get',
        url: `http://virtuallearnadmin-env.eba-vvpawj4n.ap-south-1.elasticbeanstalk.com/admin/studentList?pageNumber=1&limit=9`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      })

      return fetchedData
    } catch (err) {
      console.log('error', err)
      // return rejectWithValue(
      //   error && error.response && error.response.data && error.response.data,
      // )
    }
  },
)

export const studentListSlice = createSlice({
  name: 'studentList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(studentListThunk.pending, (state, action) => {
      // Add user to the state array
      state.loading = true
    })
    builder.addCase(studentListThunk.fulfilled, (state, action) => {
      console.log('studentlist :data fetched successfully')
      state.loading = false
      state.data = action.payload
      state.headers = action
      state.isSuccess = true
    })
    builder.addCase(studentListThunk.rejected, (state, action) => {
      console.log('super admin :data rejected')
      state.message = action.payload
      state.loading = false
      state.isRejected = true
    })
  },
})

export default studentListSlice
