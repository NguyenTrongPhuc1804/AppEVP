import AsyncStorage from '@react-native-async-storage/async-storage';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
interface AuthState {
  email: string;
  id: string;
  accessToken: string;
}

// Define the initial state using that type
const initialState: AuthState = {
  email: '',
  accessToken: '',
  id: '',
};

export const authReducer = createSlice({
  name: 'counter',
  initialState: {
    authData: initialState,
  },
  reducers: {
    addAuth: (state, action) => {
      state.authData = action.payload;
    },
    removeAuth: (state, action) => {
      state.authData = initialState;
    },
  },
});
export const {addAuth, removeAuth} = authReducer.actions;
export default authReducer.reducer;
