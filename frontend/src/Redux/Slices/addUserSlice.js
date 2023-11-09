import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'

export const addUser = createAsyncThunk('userData/addUser', async state => {
  try {
    const js = JSON.stringify(state)
    const res = await axios.post(`http://127.0.0.1:5000/users`, js, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (res.status === 200) {
      toast.success('Added')
      
    } else {
      toast.error('Fail')
    }

    return res.data
  } catch (error) {
    throw toast.error(error.message)
  }
})
