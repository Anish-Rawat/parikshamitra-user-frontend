import { configureStore } from '@reduxjs/toolkit'
import classReducer from './slices/classSlice'
import subjectReducer from './slices/subjectSlice'
import QuestionReducer from './slices/questionSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      class:classReducer,
      subject: subjectReducer,
      question:QuestionReducer,

    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']