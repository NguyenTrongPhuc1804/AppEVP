import {View, Text, StyleProp, TextStyle} from 'react-native';
import React from 'react';
import {COLOR} from '../constants/color';
import {fontFamylies} from '../constants/fontFamily';
import {globalStyle} from '../styles/globalStyle';
interface Props {
  font?: string;
  color?: string;
  size?: number;
  flex?: number;
  text?: string;
  title?: boolean;
  styles?: StyleProp<TextStyle>;
}
const TextComponent = (props: Props) => {
  const {font, color, size, flex, text, styles, title} = props;
  return (
    <Text
      style={[
        globalStyle.text,
        {
          color: color ?? COLOR.text,
          fontSize: size ? size : title ? 24 : 14,
          flex: flex ?? 0,
          fontFamily: font
            ? font
            : title
            ? fontFamylies.medium
            : fontFamylies.regular,
        },
        styles,
      ]}>
      {text}
    </Text>
  );
};

export default TextComponent;
