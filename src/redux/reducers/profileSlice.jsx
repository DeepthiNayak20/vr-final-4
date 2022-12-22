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

export const profileAsyncThunk = createAsyncThunk(
  'profileSlice/profileAsyncThunk',
  async () => {
    try {
      const fetchedData = await axios.request({
        method: 'get',
        url: `http://virtuallearnadmin-env.eba-vvpawj4n.ap-south-1.elasticbeanstalk.com/admin/getProfile`,
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

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(profileAsyncThunk.pending, (state, action) => {
      // Add user to the state array
      state.loading = true
    })
    builder.addCase(profileAsyncThunk.fulfilled, (state, action) => {
      console.log('profile :data fetched successfully')
      state.loading = false
      state.data = action.payload
      state.headers = action
      state.isSuccess = true
    })
    builder.addCase(profileAsyncThunk.rejected, (state, action) => {
      console.log('profile :data rejected')
      state.message = action.payload
      state.loading = false
      state.isRejected = true
    })
  },
})

export default profileSlice
