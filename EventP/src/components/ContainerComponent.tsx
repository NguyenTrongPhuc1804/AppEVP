import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, {ReactNode} from 'react';
import {globalStyle} from '../styles/globalStyle';
import {RowComponent, TextComponent} from '.';
import {ArrowLeft} from 'iconsax-react-native';
import {COLOR} from '../constants/color';
import {fontFamylies} from '../constants/fontFamily';
import {useNavigation} from '@react-navigation/native';
interface Props {
  isImageBackground?: boolean;
  isScroll?: boolean;
  title?: string;
  children: ReactNode;
  back?: boolean;
}
const ContainerComponent = (props: Props) => {
  const {children, isImageBackground, isScroll, title, back} = props;
  const navigate: any = useNavigation();
  const headerComponent = () => {
    return (
      <View style={{flex: 1, paddingTop: 30}}>
        {(back || title) && (
          <RowComponent
            styles={{
              paddingHorizontal: 16,
              paddingVertical: 10,
              minWidth: 48,
              minHeight: 48,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigate.goBack();
              }}>
              <ArrowLeft size={22} color={COLOR.text} />
            </TouchableOpacity>
            {title && (
              <TextComponent
                text={title}
                size={16}
                font={fontFamylies.medium}
                flex={1}
              />
            )}
          </RowComponent>
        )}
        {returnContainer}
      </View>
    );
  };

  const returnContainer = isScroll ? (
    <ScrollView showsHorizontalScrollIndicator={false}>{children}</ScrollView>
  ) : (
    <View>{children}</View>
  );
  return isImageBackground ? (
    <ImageBackground
      source={require('../assets/image/Splash-Screen-Background.png')}
      style={{flex: 1}}
      imageStyle={{flex: 1}}>
      {headerComponent()}
    </ImageBackground>
  ) : (
    <SafeAreaView style={[globalStyle.container]}>
      <View style={[globalStyle.container]}>{headerComponent()}</View>
    </SafeAreaView>
  );
};

export default ContainerComponent;
