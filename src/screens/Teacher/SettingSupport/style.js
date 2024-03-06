import {StyleSheet} from 'react-native';
import FontBase from '../../../base/FontBase';
import SmartScreenBase from '../../../base/SmartScreenBase';
import {Colors} from '../../../styleApp/color';

export default StyleSheet.create({
  textContainer: {
    marginHorizontal: SmartScreenBase.smBaseWidth * 50,
    marginVertical: SmartScreenBase.smBaseWidth * 50,
    marginTop: SmartScreenBase.smPercenHeight * 5, 
  },
  text: {
    textAlign: "center",
    width: SmartScreenBase.smPercenWidth * 90,
    fontSize: SmartScreenBase.smFontSize * 50,
    fontFamily: FontBase.MyriadPro_Regular,
  },
  contactContainer: {
    borderRadius: SmartScreenBase.smBaseWidth * 24,
    borderWidth: SmartScreenBase.smBaseWidth,
    borderColor: Colors.DarkGray,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: SmartScreenBase.smBaseWidth * 50,
    paddingVertical: SmartScreenBase.smBaseHeight * 20,
    marginTop: SmartScreenBase.smPercenHeight * 3,
  },
  contact: {
    color: Colors.BaseGreen,
    fontSize: SmartScreenBase.smFontSize * 50,
    marginTop: SmartScreenBase.smBaseHeight * 10,
    fontFamily: FontBase.MyriadPro_Bold,
    paddingTop: SmartScreenBase.smBaseWidth * 10,
  },
  icon: {
    width: SmartScreenBase.smBaseWidth * 200,
    height: SmartScreenBase.smBaseWidth * 200,
  },
  titleHeader: {
    fontSize: SmartScreenBase.smFontSize * 60,
  },
});
