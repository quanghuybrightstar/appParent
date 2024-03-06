import {StyleSheet, Platform} from 'react-native';
import FontBase from '../../../base/FontBase';
import SmartScreenBase from '../../../base/SmartScreenBase';
import {Colors} from '../../../styleApp/color';

export default StyleSheet.create({
  child20: {
    width: '20%',
    alignItems: 'center',
  },
  child80: {
    width: '80%',
  },
  titleHeader: {
    fontSize: SmartScreenBase.smFontSize * 60,
  },
  contactSetting: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: SmartScreenBase.smPercenHeight * 11,
  },
  text: {
    fontSize: SmartScreenBase.smFontSize * 47,
    lineHeight: SmartScreenBase.smPercenHeight * 3,
    fontFamily: FontBase.MyriadPro_Regular,
    marginTop: Platform.OS === 'ios' ? SmartScreenBase.smBaseHeight * 8 : 0,
  },
  hr: {
    width: '100%',
    height: SmartScreenBase.smBaseHeight * 1.22,
    backgroundColor: Colors.Gray,
    marginVertical: SmartScreenBase.smPercenHeight * 2,
  },
});
