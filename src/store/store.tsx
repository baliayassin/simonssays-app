import { configureStore } from '@reduxjs/toolkit'
import sequenceReducer from '../../src/Features/sequenceSlice'
import simonReducer from '../../src/Features/simonSlice'
import modalReducer from '../../src/Features/modalSlice'

export const store = configureStore({
  reducer: {
    userSequence: sequenceReducer,
    simonSequence: simonReducer,
    nameModal: modalReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
