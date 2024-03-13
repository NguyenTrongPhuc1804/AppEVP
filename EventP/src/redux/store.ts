import {configureStore, Action, combineReducers} from '@reduxjs/toolkit';
import {ThunkAction} from 'redux-thunk';
import authReducer from './reducer/authReducer';
import {useDispatch} from 'react-redux';

const store = configureStore({
  reducer: {
    authReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
