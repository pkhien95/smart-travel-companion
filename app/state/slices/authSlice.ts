import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type State = {
  isLoggedIn: boolean
}

const initialState: State = {
  isLoggedIn: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload
    },
  },
})

export const { setIsLoggedIn } = authSlice.actions

const authReducer = authSlice.reducer

export default authReducer
