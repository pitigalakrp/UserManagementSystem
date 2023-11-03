import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'

const initialState = {
  userState: null,
  error: null,
  loading: false
}

export const updateUser = createAsyncThunk('userData/getUser', async id => {
  try {
    const response = await axios.get(`http://127.0.0.1:5000/user/${id}`)
    return response.data
  } catch (error) {
    throw toast.error(error.message)
  }
})

export const addUpdatedUser = createAsyncThunk(
  'userData/addUser',
  async ({ state, id }) => {
    try {
      const js = JSON.stringify(state)
      const res = await axios.put(`http://127.0.0.1:5000/user/${id}`, js, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (res.status === 200) {
        toast.success('update success')
      } else {
        toast.error('Fail')
      }

      return res.data
    } catch (error) {
      throw toast.error(error.message)
    }
  }
)

const updateSlice = createSlice({
  name: 'updateUser',
  initialState,
  reducers: [],
  extraReducers: builder => {
    builder
      .addCase(updateUser.pending, (state, action) => {
        state.userState = null
        state.error = null
        state.loading = true
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.userState = action.payload
        state.error = null
        state.loading = false
        toast.warn('Update the Document')
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.error.message
        state.loading = false
      })
  }
})

export default updateSlice.reducer
