import { View, Text, ImageBackground, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import { appInfo } from '../constants/appInfo'
import SpaceComponent from '../components/SpaceComponent'
import { COLOR } from '../constants/color'

const SplashScreen = () => {
  return (
   <ImageBackground style={{flex:1,justifyContent:"center",alignItems:"center"}} source={require("../assets/image/Splash-Screen-Background.png")}>
    <Image source={require("../assets/image/Logo-Splash.png")} style={{width:appInfo.sizes.WIDTH*0.7,resizeMode:"contain" }}/>
    <SpaceComponent height={16}/>
    <ActivityIndicator color={COLOR.gray} size={22}/>
   </ImageBackground >
  )
}

export default SplashScreen