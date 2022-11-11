import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { Location } from '../classes/Location'

// Define a type for the slice state
export interface LineState {
  lines : {id:string,start : {lat:number,lon:number}, end :{lat:number,lon:number}}[]
}

// Define the initial state using that type
const initialState: LineState = {
  lines : []
}

export const lineSlice = createSlice({
  name: 'lines',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    
    // Use the PayloadAction type to declare the contents of `action.payload`
    setLine: (state, action: PayloadAction<any>) => {
      state = action.payload
    },
  },
})

export const { setLine } = lineSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectLine = (state: RootState) => state.lines

export default lineSlice.reducer