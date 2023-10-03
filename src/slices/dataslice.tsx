import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState = {
  arrayData: []
}
export const counterSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (state: any, action:PayloadAction<string>) => {
      state.arrayData.push(action.payload);
    },
    update: (state: any, action) => {
      state.arrayData.map((item: any, index: any) => {
        if (index === action.payload.id) {
          state.arrayData[index] = action.payload.data;
        }
      })
    },
    deletes: (state, action) => {
      console.log(action.payload);
      state.arrayData = state.arrayData.filter((item:string) => item !== action.payload);

    }
  },
})

// Action creators are generated for each case reducer function
export const { add, update, deletes} = counterSlice.actions

export default counterSlice.reducer