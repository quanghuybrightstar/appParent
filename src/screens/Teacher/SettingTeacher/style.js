import {StyleSheet, Dimensions, Platform} from 'react-native';
import FontBase from '../../../base/FontBase';
import SmartScreenBase from '../../../base/SmartScreenBase';
import {Colors} from '../../../styleApp/color';
const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    width,
    marginTop: SmartScreenBase.smBaseHeight * 30,
    paddingHorizontal: SmartScreenBase.smBaseWidth * 50,
  },
  viewTop: {
    borderRadius: SmartScreenBase.smBaseWidth * 72,
    width: '100%',
    backgroundColor: Colors.White,
    paddingLeft: SmartScreenBase.smBaseWidth * 57.6,
    paddingRight: SmartScreenBase.smBaseWidth * 28.8,
    paddingVertical: SmartScreenBase.smBaseHeight * 25,
  },
  titleNotification: {
    fontSize: SmartScreenBase.smFontSize * 55,
    color: Colors.BaseGreen,
    fontFamily: FontBase.MyriadPro_Bold,
  },
  viewSetting: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: SmartScreenBase.smBaseHeight * 5,
    alignItems: 'center',
  },
  iconNotification: {
    width: SmartScreenBase.smBaseWidth * 72,
    height: SmartScreenBase.smBaseHeight * 40,
    resizeMode: 'contain',
    marginRight: SmartScreenBase.smBaseWidth * 43.2,
  },
  viewTitleSetting: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '70%',
  },
  titleSetting: {
    fontSize: SmartScreenBase.smFontSize * 45,
    fontFamily: FontBase.MyriadPro_Regular,
  },
  buttonCheckSetting: {
    width: '20%',
    height: SmartScreenBase.smBaseHeight * 60,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  languageSetting: {
    width: '30%',
    height: SmartScreenBase.smBaseHeight * 50,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  language: {
    fontSize: SmartScreenBase.smFontSize * 45,
    textDecorationStyle: 'solid',
    color: Colors.BaseGreen,
    fontFamily: FontBase.MyriadPro_Bold,
    textDecorationLine: 'underline',
  },
  version: {
    fontSize: SmartScreenBase.smFontSize * 45,
    color: Colors.DarkGreen,
    fontFamily: FontBase.MyriadPro_Bold,
    marginRight: SmartScreenBase.smPercenHeight * 2,
  },
  iconSetting: {
    width: '85%',
    height: '85%',
    left: SmartScreenBase.smPercenWidth * 2,
    resizeMode: 'contain',
  },
  iconSetting2: {
    width: '80%',
    height: '87%',
    resizeMode: 'contain',
  },
  viewBottomContainer: {
    position: 'absolute',
    width,
    alignItems: 'center',
    bottom: height / 12,
  },
  buttonSave: {
    backgroundColor: Colors.DarkBlue2,
    width: width / 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: width / 3,
    height: height / 14,
  },
  titleSave: {
    fontSize: SmartScreenBase.smFontSize * 55,
    color: Colors.White,
    fontFamily: FontBase.MyriadPro_Bold,
  },
  numberContainer: {
    width: '55%',
    borderWidth: 1,
    borderTopLeftRadius: SmartScreenBase.smBaseWidth * 20,
    borderBottomLeftRadius: SmartScreenBase.smBaseWidth * 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 0,
  },
  number: {
    fontSize: SmartScreenBase.smFontSize * 50,
    fontFamily: FontBase.MyriadPro_Bold,
    marginTop: Platform.OS === 'android' ? 0 : SmartScreenBase.smBaseHeight * 8,
  },
  btnContainer: {
    width: '45%',
    borderTopRightRadius: SmartScreenBase.smBaseWidth * 20,
    borderBottomRightRadius: SmartScreenBase.smBaseWidth * 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hr: {
    width: '100%',
    height: SmartScreenBase.smBaseHeight * 1.22,
    backgroundColor: Colors.Gray,
    marginVertical: SmartScreenBase.smBaseHeight * 25,
  },
});
