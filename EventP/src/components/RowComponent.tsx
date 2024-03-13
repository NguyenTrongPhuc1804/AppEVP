import {View, Text, StyleProp, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';
import {globalStyle} from '../styles/globalStyle';
interface Props {
  children: ReactNode;
  justify?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | undefined;
  styles?: StyleProp<ViewStyle>;
}
const RowComponent = ({children, justify, styles}: Props) => {
  return (
    <View style={[globalStyle.row, {justifyContent: justify}, styles]}>
      {children}
    </View>
  );
};

export default RowComponent;
