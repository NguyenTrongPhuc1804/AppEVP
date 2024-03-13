import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {ArrowRight, Sms} from 'iconsax-react-native';
import {COLOR} from '../../constants/color';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  return (
    <ContainerComponent isImageBackground back>
      <SectionComponent>
        <TextComponent text="Resset Password" title />
        <TextComponent text="Please enter your email address to request a password reset" />
        <SpaceComponent height={26} />
        <InputComponent
          value={email}
          onChange={val => setEmail(val)}
          placeholder="email"
          affix={<Sms size={22} color={COLOR.gray4} />}
        />
        <SectionComponent>
          <ButtonComponent
            text="SEND"
            type="primary"
            iconFlex="right"
            icon={<ArrowRight size={22} color={COLOR.white} />}
          />
        </SectionComponent>
      </SectionComponent>
    </ContainerComponent>
  );
};

export default ForgotPasswordScreen;
