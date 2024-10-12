import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import deviceReducer from '../features/device/deviceSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    device: deviceReducer, 
  },
})