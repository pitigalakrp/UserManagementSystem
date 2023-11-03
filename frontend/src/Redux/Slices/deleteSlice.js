import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'

export const deleteUser = createAsyncThunk('userData/deleteUser', async (userId, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`http://127.0.0.1:5000/user/${userId}`);
  
      if (res.status === 200) {
        toast.success('DeleteSuccess');
        return userId; // Return the user ID to indicate success
      } else {
        toast.error('Fail');
        return rejectWithValue('Delete failed'); // Use rejectWithValue to pass an error message
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  });
  
