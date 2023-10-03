import { configureStore } from '@reduxjs/toolkit'
import dataStore from './slices/dataslice';
export const store = configureStore({
  reducer: {
    crudredux: dataStore,
  },
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


