import { configureStore } from '@reduxjs/toolkit'
import classReducer from '../redux/slices/classSlice'
import subjectReducer from '../redux/slices/subjectSlice'
import QuestionReducer from '../redux/slices/questionSlice'
import authReducer from '../redux/slices/authentication/auth.slice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      class:classReducer,
      subject: subjectReducer,
      question:QuestionReducer,
      auth: authReducer,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']