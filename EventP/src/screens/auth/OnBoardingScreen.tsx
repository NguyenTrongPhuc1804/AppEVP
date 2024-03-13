import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {globalStyle} from '../../styles/globalStyle';
import Swiper from 'react-native-swiper';
import {appInfo} from '../../constants/appInfo';
import {COLOR} from '../../constants/color';
import {
  useNavigation,
  ParamListBase,
  NavigationProp,
} from '@react-navigation/native';
import TextComponent from '../../components/TextComponent';
const OnBoardingScreen = () => {
  const navigate: NavigationProp<ParamListBase> = useNavigation();
  const [index, setIndex] = useState(0);
  return (
    <View style={[globalStyle.container]}>
      <Swiper
        loop={false}
        style={{}}
        index={index}
        activeDotColor={COLOR.white}
        onIndexChanged={num => setIndex(num)}>
        <Image
          resizeMode="cover"
          source={require('../../assets/image/Onboarding-6.png')}
          style={{
            flex: 1,
            width: appInfo.sizes.WIDTH,
            height: appInfo.sizes.HEIGHT,
          }}
        />
        <Image
          resizeMode="cover"
          source={require('../../assets/image/Onboarding-4.png')}
          style={{
            flex: 1,
            width: appInfo.sizes.WIDTH,
            height: appInfo.sizes.HEIGHT,
          }}
        />
        <Image
          resizeMode="cover"
          source={require('../../assets/image/Onboarding-5.png')}
          style={{
            flex: 1,
            width: appInfo.sizes.WIDTH,
            height: appInfo.sizes.HEIGHT,
          }}
        />
      </Swiper>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          left: 0,
          paddingHorizontal: 16,
          paddingVertical: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigate.navigate('LoginScreen');
          }}>
          <Text style={[styles.text, {color: COLOR.gray2}]}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            index < 2 ? setIndex(index + 1) : navigate.navigate('LoginScreen')
          }>
          <TextComponent text="Next" color={COLOR.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: COLOR.white,
  },
});
export default OnBoardingScreen;
