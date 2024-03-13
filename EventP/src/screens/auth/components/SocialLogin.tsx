import {View, Text, Image} from 'react-native';
import React from 'react';
import {
  ButtonComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../../components';
import {fontFamylies} from '../../../constants/fontFamily';
import {COLOR} from '../../../constants/color';
import {Google} from 'iconsax-react-native';

const SocialLogin = () => {
  return (
    <SectionComponent>
      <TextComponent
        font={fontFamylies.medium}
        color={COLOR.gray4}
        styles={{textAlign: 'center'}}
        text="OR"
        size={16}></TextComponent>
      <SpaceComponent height={16} />
      <ButtonComponent
        textFont={fontFamylies.regular}
        text="Login with google"
        icon={
          <Image
            source={require('../../../assets/image/google.png')}
            style={{width: 26, height: 26}}
          />
        }
        type="primary"
        iconFlex="left"
        color={COLOR.white}
        textColor={COLOR.text}
      />
      <ButtonComponent
        textFont={fontFamylies.regular}
        text="Login with facebook"
        icon={
          <Image
            source={require('../../../assets/image/facebook.png')}
            style={{width: 26, height: 26}}
          />
        }
        type="primary"
        iconFlex="left"
        color={COLOR.white}
        textColor={COLOR.text}
      />
    </SectionComponent>
  );
};

export default SocialLogin;
