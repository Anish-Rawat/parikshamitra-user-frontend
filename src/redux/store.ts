import { configureStore } from '@reduxjs/toolkit'
import classReducer from '../redux/slices/classSlice'
import subjectReducer from '../redux/slices/subjectSlice'
import QuestionReducer from '../redux/slices/questionSlice'
import authReducer from '../redux/slices/authentication/auth.slice'
import testReducer from '../redux/slices/test/test.slice'
import answerReducer from '../redux/slices/test/answer.slice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      class:classReducer,
      subject: subjectReducer,
      question:QuestionReducer,
      auth: authReducer,
      test: testReducer,
      answer: answerReducer
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']