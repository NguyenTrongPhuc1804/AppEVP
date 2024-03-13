import {View, Text, TextInput, StyleSheet, Alert} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {
  ButtonComponent,
  ContainerComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {COLOR} from '../../constants/color';
import {fontFamylies} from '../../constants/fontFamily';
import authApi from '../../services/authApi';
import {LoadingModal} from '../../../modals';
import {Scan} from 'iconsax-react-native';
const VerificationScreen = () => {
  const route: any = useRoute();

  const [codeValue, setCodeValue] = useState<string[]>([]);
  const [currentCode, setCurrentCode] = useState('');
  const [newCode, setNewCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messErr, setMessErr] = useState('');
  const [limit, setLimit] = useState(3);
  // const {email, password, code} = route.params;
  const ref1 = useRef<any>();
  const ref2 = useRef<any>();
  const ref3 = useRef<any>();
  const ref4 = useRef<any>();
  const email = 'ivngg123@gmail.com';
  const handleChangeCode = (value: string, index: number) => {
    const data = [...codeValue];
    data[index] = value;
    setCodeValue(data);
  };
  const handleResendVertifition = async () => {
    setCodeValue(['', '', '', '']);
    setNewCode('');
    setIsLoading(true);
    try {
      const {data} = await authApi.handleAuthentication(
        '/verification',
        'post',
        {
          email,
        },
      );
      setCurrentCode(data.sendMail.code);
      setIsLoading(false);
      setLimit(20);
    } catch (error) {
      console.log(error, 'cannot send email !!');
      setIsLoading(false);
    }
  };
  const handleVerification = () => {
    if (limit > 0) {
      if (newCode !== currentCode) {
        setMessErr('Invalid code');
      } else {
      }
    } else {
      setMessErr('Time out verification code , please resend new code!!');
    }
  };
  useEffect(() => {
    ref1.current.focus();
  }, []),
    useEffect(() => {
      let item = '';
      codeValue.forEach(value => (item += value));
      setNewCode(item);
    }, [codeValue]);
  useEffect(() => {
    const interval = setInterval(() => {
      if (limit == 0) {
        clearInterval(interval);
      } else {
        setLimit(limit => (limit -= 1));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [limit]);
  return (
    <ContainerComponent back isImageBackground>
      <SectionComponent>
        <TextComponent text="Verification" title />
        <TextComponent
          text={`we've send you the verification code on ${email.replace(
            /.{1,5}/,
            (m: string) => '*'.repeat(m.length),
          )}`}
        />
        <SpaceComponent height={26} />
        <RowComponent justify="space-around">
          <TextInput
            value={codeValue[0]}
            ref={ref1}
            maxLength={1}
            onChangeText={value => {
              value.length > 0 && ref2.current.focus();
              handleChangeCode(value, 0);
            }}
            style={[styles.input]}
            placeholder="-"
            keyboardType="number-pad"
          />
          <TextInput
            value={codeValue[1]}
            keyboardType="number-pad"
            ref={ref2}
            maxLength={1}
            onChangeText={value => {
              value.length > 0 && ref3.current.focus();
              handleChangeCode(value, 1);
            }}
            style={[styles.input]}
            placeholder="-"
          />
          <TextInput
            value={codeValue[2]}
            keyboardType="number-pad"
            ref={ref3}
            maxLength={1}
            onChangeText={value => {
              value.length > 0 && ref4.current.focus();
              handleChangeCode(value, 2);
            }}
            style={[styles.input]}
            placeholder="-"
          />
          <TextInput
            value={codeValue[3]}
            keyboardType="number-pad"
            ref={ref4}
            maxLength={1}
            onChangeText={value => {
              handleChangeCode(value, 3);
            }}
            style={[styles.input]}
            placeholder="-"
          />
        </RowComponent>
      </SectionComponent>

      <SectionComponent styles={{marginTop: 40}}>
        <ButtonComponent
          onPress={handleVerification}
          disable={newCode.length !== 4}
          text="Continute"
          type="primary"
        />

        {messErr && (
          <SectionComponent>
            <TextComponent
              text={messErr}
              color={COLOR.danger}
              styles={{textAlign: 'center'}}
            />
          </SectionComponent>
        )}
        {limit < 1 ? (
          <RowComponent justify="center">
            <ButtonComponent
              onPress={handleResendVertifition}
              text="Resend verification code to email !!"
              type="link"
            />
          </RowComponent>
        ) : (
          <RowComponent justify="center">
            <TextComponent text="Re-send code in " />
            <TextComponent text={`00:${limit}`} color={COLOR.primary} />
          </RowComponent>
        )}
      </SectionComponent>
      <LoadingModal visible={isLoading} />
    </ContainerComponent>
  );
};
const styles = StyleSheet.create({
  input: {
    width: 55,
    height: 55,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: COLOR.gray2,
    fontSize: 24,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: fontFamylies.bold,
    textAlign: 'center',
  },
});
export default VerificationScreen;
