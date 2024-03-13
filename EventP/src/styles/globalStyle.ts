import {StyleSheet} from 'react-native';
import {COLOR} from '../constants/color';
import {fontFamylies} from '../constants/fontFamily';

export const globalStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  text: {
    fontFamily: fontFamylies.regular,
    fontSize: 14,
    color: COLOR.text,
  },
  button: {
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.white,
    paddingHorizontal: 16,
    paddingVertical: 16,
    minHeight: 56,
    flexDirection: 'row',
  },
  section: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  shadow: {
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
});
