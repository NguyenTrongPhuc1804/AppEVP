import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import React, {ReactNode} from 'react';
import {TextComponent} from '.';
import {globalStyle} from '../styles/globalStyle';
import {COLOR} from '../constants/color';
import {fontFamylies} from '../constants/fontFamily';
interface Props {
  icon?: ReactNode;
  text: string;
  type?: 'primary' | 'text' | 'link';
  color?: string;
  styles?: StyleProp<ViewStyle>;
  textColor?: string;
  textStyle?: StyleProp<TextStyle>;
  textFont?: string;
  onPress?: () => void;
  iconFlex?: 'right' | 'left';
  disable?: boolean;
}
const ButtonComponent = (props: Props) => {
  const {
    icon,
    text,
    type,
    color,
    styles,
    textColor,
    textStyle,
    iconFlex,
    textFont,
    onPress,
    disable,
  } = props;
  return type === 'primary' ? (
    <View style={{alignItems: 'center'}}>
      <TouchableOpacity
        onPress={onPress}
        disabled={disable ?? false}
        style={[
          globalStyle.button,
          globalStyle.shadow,
          {
            backgroundColor: color
              ? color
              : disable
              ? COLOR.gray4
              : COLOR.primary,
            marginBottom: 17,
            width: '80%',
          },
          styles,
        ]}>
        {icon && iconFlex === 'left' && icon}
        <TextComponent
          text={text}
          color={textColor ?? COLOR.white}
          styles={[
            textStyle,
            {marginLeft: icon ? 12 : 0, fontSize: 16, textAlign: 'center'},
          ]}
          flex={icon && iconFlex === 'right' ? 1 : 0}
          font={textFont ?? fontFamylies.medium}
        />
        {icon && iconFlex === 'right' && icon}
      </TouchableOpacity>
    </View>
  ) : (
    <TouchableOpacity onPress={onPress}>
      <TextComponent
        text={text}
        color={type === 'link' ? COLOR.primary : COLOR.text}
      />
    </TouchableOpacity>
  );
};

export default ButtonComponent;
