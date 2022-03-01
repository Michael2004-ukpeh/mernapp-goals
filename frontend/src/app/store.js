import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import  authReducer from "../features/auth/authSlice"
import goalsReducer from '../features/goals/goalsSlice'
export const store = configureStore({
  reducer: {
   auth: authReducer,
   goals:goalsReducer
  },
  // middleware: getDefaultMiddleware =>
  //   getDefaultMiddleware({
  //     serializableCheck: false,
  //   }),
});


