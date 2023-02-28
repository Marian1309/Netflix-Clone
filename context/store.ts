import { combineReducers, configureStore } from '@reduxjs/toolkit'

import counterSlice from './slices/counterSlice'

const allReducers = combineReducers({ counter: counterSlice })

const store = configureStore({
  reducer: allReducers
})

export default store

export type GlobalState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
