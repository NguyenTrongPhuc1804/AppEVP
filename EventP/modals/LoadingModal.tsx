import {View, Text, Modal, ActivityIndicator} from 'react-native';
import React from 'react';
import {globalStyle} from '../src/styles/globalStyle';
import {TextComponent} from '../src/components';
import {COLOR} from '../src/constants/color';
interface Props {
  visible: boolean;
  mess?: string;
}
const LoadingModal = (props: Props) => {
  const {visible, mess} = props;
  return (
    <Modal
      visible={visible}
      transparent
      statusBarTranslucent
      style={[globalStyle.container]}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        <ActivityIndicator size={32} color={COLOR.white} />
        <TextComponent text="Loading" color={COLOR.white} flex={0} />
      </View>
    </Modal>
  );
};

export default LoadingModal;
