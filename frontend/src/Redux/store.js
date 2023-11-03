import { configureStore } from '@reduxjs/toolkit'
import userSlice from './Slices/userSlice'
import updateSlice from './Slices/updateUserSlice'


export default configureStore({
  reducer: {
    getUsers: userSlice,
    getUser:updateSlice
  }
})
