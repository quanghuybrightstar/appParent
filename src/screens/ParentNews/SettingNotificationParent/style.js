import {StyleSheet, Dimensions} from 'react-native';
import FontBase from '../../../base/FontBase';
import SmartScreenBase from '../../../base/SmartScreenBase';
import {Colors} from '../../../styleApp/color';
const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    width,
    marginTop: SmartScreenBase.smBaseHeight * 25,
    paddingHorizontal: SmartScreenBase.smBaseWidth * 28.8,
  },
  viewTop: {
    borderRadius: SmartScreenBase.smBaseWidth * 72,
    width: '100%',
    backgroundColor: Colors.White,
    paddingHorizontal: SmartScreenBase.smBaseWidth * 50,
    paddingVertical: SmartScreenBase.smBaseHeight * 25,
  },
  titleNotification: {
    fontSize: SmartScreenBase.smFontSize * 55,
    color: Colors.DarkGreen,
    marginBottom: SmartScreenBase.smBaseHeight * 8,
    fontFamily: FontBase.MyriadPro_Bold,
  },
  viewSetting: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: SmartScreenBase.smBaseHeight * 24.3,
  },
  iconNotification: {
    width: SmartScreenBase.smBaseWidth * 72,
    height: SmartScreenBase.smBaseHeight * 40.5,
    resizeMode: 'contain',
    marginRight: SmartScreenBase.smBaseWidth * 43.2,
  },
  viewTitleSetting: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleSetting: {
    fontSize: SmartScreenBase.smFontSize * 55,
    width: '75%',
    fontFamily: FontBase.MyriadPro_Regular,
  },
  buttonCheckSetting: {
    width: '20%',
    height: SmartScreenBase.smBaseHeight * 56.6,
  },
  iconSetting: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
  viewBottomContainer: {
    width,
    alignItems: 'center',
    marginVertical: SmartScreenBase.smBaseHeight * 25,
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
  hr: {
    width: '100%',
    height: SmartScreenBase.smBaseHeight * 1.21,
    backgroundColor: Colors.Gray,
    marginVertical: SmartScreenBase.smBaseHeight * 25,
  },
});
