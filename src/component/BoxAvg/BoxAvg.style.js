import {StyleSheet} from 'react-native';
import SmartScreenBase from '../base/SmartScreenBase';
import {Colors} from '../../styleApp/color';
import FontBase from '../../base/FontBase';
import {FontSize, FontWeight} from '../../styleApp/font';

const styles = StyleSheet.create({
  boxDashboard: {
    borderWidth: 1,
    borderColor: Colors.BorderLight,
    paddingTop: SmartScreenBase.smBaseWidth * 30,
    paddingBottom: SmartScreenBase.smBaseWidth * 30,
    paddingHorizontal: SmartScreenBase.smBaseWidth * 50,
    backgroundColor: Colors.White,
    marginBottom: SmartScreenBase.smPercenWidth * 4,
  },
  titleBox: {
    fontSize: FontSize.size45Font,
    ...FontWeight.Bold,
  },
  textTypeTimeAvg: {
    color: Colors.TextLight,
    fontSize: SmartScreenBase.smFontSize * 45,
  },

  textTypeSelectedTime: {
    color: Colors.PrimaryOrange,
    textDecorationLine: 'underline',
    ...FontWeight.Bold,
  },
  textOrangeBottom: {
    color: Colors.PrimaryOrange,
    fontSize: FontSize.size37Font,
    ...FontWeight.Bold,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.BorderLight,
    paddingVertical: SmartScreenBase.smBaseWidth * 12,
    marginBottom: SmartScreenBase.smBaseWidth * 5,
  },
  textBlue: {
    ...FontWeight.Bold,
    fontSize: FontSize.size85Font,
    color: Colors.PrimaryBlue,
  },
  textComparation: {
    color: Colors.TextLight,
    fontSize: FontSize.size45Font,
    ...FontWeight.Bold,
    top: -SmartScreenBase.smBaseWidth * 13,
  },
  textUnderlineDetail: {
    textDecorationLine: 'underline',
    color: Colors.PrimaryOrange,
    fontSize: FontSize.size40Font,
  },
});

export default styles;
