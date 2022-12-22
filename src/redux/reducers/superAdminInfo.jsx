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

export const superAdminThunk = createAsyncThunk(
  'superAdminInfo/superAdminThunk',
  async () => {
    try {
      const fetchedData = await axios.request({
        method: 'get',
        url: `http://virtuallearnadmin-env.eba-vvpawj4n.ap-south-1.elasticbeanstalk.com/superAdmin/admins`,
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

export const superAdminInfo = createSlice({
  name: 'superAdmin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(superAdminThunk.pending, (state, action) => {
      // Add user to the state array
      state.loading = true
    })
    builder.addCase(superAdminThunk.fulfilled, (state, action) => {
      console.log('super admin :data fetched successfully')
      state.loading = false
      state.data = action.payload
      state.headers = action
      state.isSuccess = true
    })
    builder.addCase(superAdminThunk.rejected, (state, action) => {
      console.log('super admin :data rejected')
      state.message = action.payload
      state.loading = false
      state.isRejected = true
    })
  },
})

export default superAdminInfo
