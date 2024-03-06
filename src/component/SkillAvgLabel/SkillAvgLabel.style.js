import {StyleSheet} from 'react-native';
import SmartScreenBase from '../base/SmartScreenBase';
import {Colors} from '../../styleApp/color';
import {FontSize, FontWeight} from '../../styleApp/font';

const styles = StyleSheet.create({
  container: {},
  skillContainer: {
    width: SmartScreenBase.smPercenWidth * 41,
    paddingVertical: SmartScreenBase.smBaseWidth * 8,
  },
  skillLabel: {
    width: '88%',
    backgroundColor: Colors.PrimaryBlue,
    paddingVertical: SmartScreenBase.smBaseWidth * 3,
    position: 'relative',
    height: SmartScreenBase.smBaseWidth * 75,
  },
  textScore: {
    ...FontWeight.Bold,
    fontSize: FontSize.size75Font,
    color: Colors.PrimaryBlue,
  },
  textComparation: {
    color: Colors.TextLight,
    fontSize: FontSize.size40Font,
    ...FontWeight.Bold,
    top: -SmartScreenBase.smBaseWidth * 13,
  },
  textLabel: {
    fontSize: SmartScreenBase.smFontSize * 40,
    color: Colors.White,
  },
  skillLabelCenter: {},
  skillLabelRight: {},
  skillLabelLeft: {
    borderTopColor: 'transparent',
    borderTopWidth: 0,

    borderBottomColor: 'transparent',
    borderBottomWidth: 0,

    borderLeftColor: Colors.PrimaryBlue,
  },
});

export default styles;
