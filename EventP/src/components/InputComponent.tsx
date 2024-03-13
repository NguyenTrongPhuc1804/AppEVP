import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardType,
} from 'react-native';
import React, {ReactNode, useState} from 'react';
import {EyeSlash, PasswordCheck} from 'iconsax-react-native';
import {COLOR} from '../constants/color';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {globalStyle} from '../styles/globalStyle';
import {SpaceComponent, TextComponent} from '.';
interface Props {
  value: string;
  onChange: (value: string) => void;
  affix?: ReactNode;
  placeholder?: string;
  suffix?: ReactNode;
  isPassword?: boolean;
  allowClear?: boolean;
  type?: KeyboardType;
  errMess?: string;
}
const InputComponent = (props: Props) => {
  const {
    value,
    isPassword,
    onChange,
    affix,
    placeholder,
    suffix,
    type,
    allowClear,
    errMess,
  } = props;
  const [isShowPass, setIsShowPass] = useState(isPassword ?? false);
  return (
    <View>
      <View style={[styles.inputContainer]}>
        {affix ?? affix}
        <TextInput
          style={[styles.input, globalStyle.text]}
          value={value}
          placeholder={placeholder ?? ''}
          onChangeText={e => onChange(e)}
          secureTextEntry={isShowPass}
          placeholderTextColor={'#747688'}
          keyboardType={type ?? 'default'}
          // autoCapitalize="none"
        />
        {suffix ?? suffix}
        <TouchableOpacity
          onPress={
            isPassword ? () => setIsShowPass(!isShowPass) : () => onChange('')
          }>
          {isPassword ? (
            <EyeSlash size={22} color={COLOR.gray} />
          ) : (
            value.length > 0 &&
            allowClear && (
              <AntDesign name="close" size={22} color={COLOR.text} />
            )
          )}
        </TouchableOpacity>
      </View>

      {errMess ? (
        <TextComponent
          styles={{marginBottom: 19}}
          text={errMess}
          color={COLOR.danger}
        />
      ) : (
        <SpaceComponent height={19} />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: COLOR.white,
    borderColor: COLOR.gray3,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
    paddingHorizontal: 14,
    margin: 0,
    padding: 0,
  },
});
export default InputComponent;
