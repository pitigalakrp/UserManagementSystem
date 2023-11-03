import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'


const initialState = {
  userState: null,
  error: null,
  loading: false
}

export const getUsers = createAsyncThunk('userData/getUsers', async () => {
  try {
    const response = await axios.get(`http://127.0.0.1:5000/users`)

    
    return response.data
  } catch (error) {
    throw toast.error(error.message)
  }
})

const userSlice = createSlice({
  name: 'getUsers',
  initialState,
  reducers: [],
  extraReducers: builder => {
    builder
      .addCase(getUsers.pending, (state, action) => {
        state.userState = null
        state.error = null
        state.loading = true
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.userState = action.payload
        state.error = null
        state.loading = false
        toast.success("load")
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.error = action.error.message
        state.loading = false
      })
  }
})

export default userSlice.reducer
