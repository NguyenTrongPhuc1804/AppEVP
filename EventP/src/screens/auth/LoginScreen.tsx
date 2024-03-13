import {View, Text, Image, Switch} from 'react-native';
import React, {useState} from 'react';
import {globalStyle} from '../../styles/globalStyle';
import {
  ButtonComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {Lock, Sms} from 'iconsax-react-native';
import {COLOR} from '../../constants/color';
import ContainerComponent from '../../components/ContainerComponent';
import SocialLogin from './components/SocialLogin';
import {
  NavigationProp,
  useNavigation,
  ParamListBase,
} from '@react-navigation/native';
import authApi from '../../services/authApi';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {addAuth} from '../../redux/reducer/authReducer';
import {useDispatch} from 'react-redux';

export default function LoginScreen() {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const dispatch = useDispatch();
  //create state
  const [isRemember, setIsRemember] = useState(false);
  //validate form login
  const schema = yup
    .object({
      email: yup.string().email().required(),
      password: yup.string().required(),
    })
    .required();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = handleSubmit(async values => {
    console.log(values);
    try {
      const {data} = await authApi.handleAuthentication(
        '/login',
        'post',
        values,
      );
      dispatch(addAuth(data.userLogin));
      await AsyncStorage.setItem(
        'auth',
        isRemember ? data.userLogin : data.userLogin.email,
      );
    } catch (error) {
      console.log(error, 'err');
    }
  });

  return (
    <ContainerComponent isImageBackground isScroll>
      <SectionComponent
        styles={{justifyContent: 'center', alignItems: 'center'}}>
        <Image
          source={require('../../assets/image/Logo-text.png')}
          style={{width: 162, height: 114, marginTop: 72, marginBottom: 30}}
        />
      </SectionComponent>
      <SectionComponent>
        <TextComponent text="Sign in" title size={24} />
        <SpaceComponent height={21} />
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <InputComponent
              allowClear
              placeholder="email"
              value={value}
              onChange={onChange}
              affix={<Sms size={22} color={COLOR.gray} />}
              errMess={errors.email?.message}
            />
          )}
          name="email"
        />
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <InputComponent
              allowClear
              placeholder="password"
              value={value}
              onChange={onChange}
              affix={<Sms size={22} color={COLOR.gray} />}
              errMess={errors.password?.message}
            />
          )}
          name="password"
        />
        <RowComponent justify="space-between">
          <RowComponent>
            <Switch
              trackColor={{true: COLOR.primary}}
              thumbColor={COLOR.white}
              value={isRemember}
              onChange={() => {
                setIsRemember(!isRemember);
              }}
            />
            <SpaceComponent width={4} />
            <TextComponent text="Remember me"></TextComponent>
          </RowComponent>
          <ButtonComponent text="Forgot password" type="text" />
        </RowComponent>
      </SectionComponent>
      <SpaceComponent height={16} />
      <SectionComponent>
        <ButtonComponent onPress={onSubmit} text="SIGN IN" type="primary" />
      </SectionComponent>
      <SocialLogin />
      <SectionComponent>
        <RowComponent justify="center">
          <TextComponent text="Dont't have an account? " />
          <ButtonComponent
            text="Sign up"
            type="link"
            onPress={() => {
              navigation.navigate('SignUpScreen');
            }}
          />
        </RowComponent>
      </SectionComponent>
    </ContainerComponent>
  );
}
