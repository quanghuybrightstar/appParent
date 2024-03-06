import {StyleSheet, Dimensions, Platform} from 'react-native';
import FontBase from '../../../base/FontBase';
import SmartScreenBase from '../../../base/SmartScreenBase';
import {Colors} from '../../../styleApp/color';
const {width} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    width,
    marginTop: SmartScreenBase.smBaseHeight * 25,
    paddingHorizontal: SmartScreenBase.smBaseWidth * 28.8,
  },
  viewTop: {
    width: '100%',
    paddingHorizontal: SmartScreenBase.smBaseWidth * 50,
    paddingVertical: SmartScreenBase.smBaseHeight * 25,
  },
  titleNotification: {
    fontSize: SmartScreenBase.smFontSize * 50,
    fontWeight: 'bold',
    color: Colors.DarkGreen,
    marginBottom: SmartScreenBase.smBaseHeight * 8,
  },
  viewSetting: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: SmartScreenBase.smBaseWidth * 115.2,
    backgroundColor: Colors.White,
    paddingVertical: SmartScreenBase.smBaseWidth * 40,
    marginBottom: SmartScreenBase.smBaseHeight * 30,
    shadowColor: Colors.Black,
    shadowOffset: {
      width: 0,
      height: SmartScreenBase.smBaseHeight * 3.2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 2.22,
    elevation: 3,
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
    width: '20%',
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '60%',
  },
  input: {
    fontSize: SmartScreenBase.smFontSize * 50,
    width: '100%',
    paddingHorizontal: SmartScreenBase.smBaseWidth * 14.4,
    paddingVertical: SmartScreenBase.smBaseWidth * 9,
    color: Colors.Black,
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
    bottom: SmartScreenBase.smPercenWidth*5,
  },
  closeBtn: {
    alignItems: 'center',
    marginTop: SmartScreenBase.smBaseHeight * 25,
  },
  buttonSave: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: width / 3,
    paddingHorizontal: SmartScreenBase.smBaseWidth * 140,
    height: SmartScreenBase.smPercenHeight * 7,
    marginTop: SmartScreenBase.smPercenHeight * 5,
  },
  titleSave: {
    fontSize: SmartScreenBase.smFontSize * 55,
    color: Colors.White,
    fontFamily: FontBase.MyriadPro_Bold,
    marginTop: Platform.OS === 'ios' ? 5 : 0,
  },
  titleSave2: {
    fontSize: SmartScreenBase.smFontSize * 50,
    color: Colors.White,
    fontFamily: FontBase.MyriadPro_Bold,
    marginTop: Platform.OS === 'ios' ? 5 : 0,
  },
  hr: {
    width: '100%',
    height: SmartScreenBase.smBaseHeight * 1.21,
    backgroundColor: Colors.Gray,
    marginVertical: SmartScreenBase.smBaseHeight * 25,
  },
  close: {
    fontSize: SmartScreenBase.smFontSize * 50,
    color: Colors.Black,
    marginVertical: SmartScreenBase.smBaseHeight * 50,
    textAlign: 'center',
    fontFamily: FontBase.MyriadPro_Bold,
  },
  modalContainer: {
    width: '90%',
    height: SmartScreenBase.smPercenHeight * 30,
    backgroundColor: Colors.White,
    borderRadius: SmartScreenBase.smBaseWidth * 30,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: SmartScreenBase.smBaseWidth * 50,
  },
  errorText: {
    color: Colors.Red_BE1,
    alignSelf: 'center',
    marginBottom: SmartScreenBase.smPercenHeight * 2,
  },
  iconLock: {
    width: SmartScreenBase.smFontSize * 50,
    height: SmartScreenBase.smFontSize * 50,
  },
  titleHeader: {
    fontFamily: FontBase.MyriadPro_Regular,
    fontSize: SmartScreenBase.smFontSize * 50,
    color: Colors.White,
  },
  title2: {
    fontSize: SmartScreenBase.smFontSize * 60,
  },
});
