import {View, Text} from 'react-native';
import React from 'react';
import {ButtonComponent, SectionComponent} from '../../components';
import {COLOR} from '../../constants/color';
import {globalStyle} from '../../styles/globalStyle';
import {useDispatch, useSelector} from 'react-redux';
import {removeAuth} from '../../redux/reducer/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootState} from '../../redux/store';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const {authData} = useSelector((state: RootState) => state.authReducer);
  return (
    <View
      style={[
        globalStyle.container,
        {
          padding: 16,
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}>
      <Text>HomeScreen</Text>
      <SectionComponent>
        <ButtonComponent
          type="primary"
          onPress={async () => {
            dispatch(removeAuth({}));
            await AsyncStorage.setItem('auth', authData.email);
          }}
          textColor={COLOR.text}
          text="LOGOUT"
          icon={
            <View>
              <Text>NNN</Text>
            </View>
          }
        />
      </SectionComponent>
    </View>
  );
};

export default HomeScreen;
