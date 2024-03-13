import {View, Text, Image, Switch, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
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
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {LoadingModal} from '../../../modals';
import authApi from '../../services/authApi';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {ErrorMessage} from '@hookform/error-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {addAuth} from '../../redux/reducer/authReducer';

export default function SignUpScreen() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const navigate: any = useNavigation();
  //validate react hook form
  const schema = yup
    .object({
      username: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().required(),
      confirmPassword: yup
        .string()
        .required('Please retype your password.')
        .oneOf([yup.ref('password')], 'Your confirm passwords do not match.'),
    })
    .required();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const onSubmit = handleSubmit(async values => {
    setIsLoading(true);
    try {
      const {data} = await authApi.handleAuthentication(
        '/register',
        'post',
        values,
      );
      dispatch(addAuth(data.newUser));
      await AsyncStorage.setItem('auth', JSON.stringify(data.newUser));
      setIsLoading(false);
    } catch (error) {
      console.log(error, 'err');
      setIsLoading(false);
    }
  });
  const handleVerification = handleSubmit(async values => {
    setIsLoading(true);
    try {
      const {data} = await authApi.handleAuthentication(
        '/verification',
        'post',
        {
          email: values.email,
        },
      );
      navigate.navigate('VerificationScreen', {
        code: data.sendMail.code,
        email: values.email,
        password: values.password,
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error, 'error send email');
      setIsLoading(false);
    }
  });
  return (
    <ContainerComponent isImageBackground isScroll back>
      <SectionComponent>
        <TextComponent text="Sign up" title size={24} />
        <SpaceComponent height={21} />
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <InputComponent
              allowClear
              placeholder="username"
              value={value}
              onChange={onChange}
              affix={<Sms size={22} color={COLOR.gray} />}
              errMess={errors.username?.message}
            />
          )}
          name="username"
        />

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
              isPassword
              allowClear
              placeholder="password"
              value={value}
              onChange={onChange}
              affix={<Lock size={22} color={COLOR.gray} />}
              errMess={errors.password?.message}
            />
          )}
          name="password"
        />
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <InputComponent
              isPassword
              allowClear
              placeholder="confirmPassword"
              value={value}
              onChange={onChange}
              affix={<Lock size={22} color={COLOR.gray} />}
              errMess={errors.confirmPassword?.message}
            />
          )}
          name="confirmPassword"
        />
      </SectionComponent>

      <SectionComponent>
        <ButtonComponent
          onPress={handleVerification}
          text="SIGN IN"
          type="primary"
        />
      </SectionComponent>
      <SocialLogin />
      <SectionComponent>
        <RowComponent justify="center">
          <TextComponent text="Dont't have an account? " />
          <ButtonComponent text="Sign in" type="link" />
        </RowComponent>
      </SectionComponent>
      <LoadingModal visible={isLoading} />
    </ContainerComponent>
  );
}
