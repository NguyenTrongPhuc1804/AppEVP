import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  ForgotPasswordScreen,
  LoginScreen,
  VerificationScreen,
} from '../screens';
import OnBoardingScreen from '../screens/auth/OnBoardingScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthNavigator = () => {
  const Stack = createNativeStackNavigator();
  // const [isExistuser, setIsExistUser] = useState(false);
  // const checkExistUSer = async () => {
  //   const res = await AsyncStorage.getItem('auth');
  //   res && setIsExistUser(true);
  // };
  // useEffect(() => {
  //   checkExistUSer();
  // }, []);
  return (
    <Stack.Navigator
      initialRouteName="VerificationScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="OnbordingScreen"
        component={OnBoardingScreen}></Stack.Screen>

      <Stack.Screen name="LoginScreen" component={LoginScreen}></Stack.Screen>
      <Stack.Screen name="SignUpScreen" component={SignUpScreen}></Stack.Screen>
      <Stack.Screen
        name="VerificationScreen"
        component={VerificationScreen}></Stack.Screen>
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default AuthNavigator;
