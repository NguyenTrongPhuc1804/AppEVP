import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {addAuth} from '../redux/reducer/authReducer';
import {SplashScreen} from '../screens';

const AppRouter = () => {
  const dispatch = useDispatch();
  const {getItem} = useAsyncStorage('auth');

  const [isShowSplash, setIsShowSplash] = useState(true);

  useEffect(() => {
    checkLogin();
    const timeout = setTimeout(() => {
      setIsShowSplash(false);
    }, 1500);
    return () => clearTimeout(timeout);
  }, []);

  const checkLogin = async () => {
    const user = await getItem();
    user && dispatch(addAuth(JSON.parse(user)));
  };
  const {authData} = useSelector((state: RootState) => state.authReducer);

  return isShowSplash ? (
    <SplashScreen />
  ) : authData.accessToken ? (
    <MainNavigator />
  ) : (
    <AuthNavigator />
  );
};

export default AppRouter;
