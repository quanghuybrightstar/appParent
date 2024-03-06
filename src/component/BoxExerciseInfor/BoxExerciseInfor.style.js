import {Platform, StyleSheet} from 'react-native';
import SmartScreenBase from '../base/SmartScreenBase';
import {Colors} from '../../styleApp/color';
import {FontSize, FontWeight} from '../../styleApp/font';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex1: {
    flex: 1,
  },
  boxShadow: {
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 1.5,
    },
    shadowOpacity: 0.5,
    shadowColor: Colors.Black,
    elevation: 3,
  },
  borderRadius30: {borderRadius: SmartScreenBase.smPercenWidth * 30},
  boxDashboard: {
    borderWidth: 1,
    borderColor: Colors.BorderLight,
    paddingTop: SmartScreenBase.smBaseWidth * 30,
    paddingBottom: SmartScreenBase.smBaseWidth * 23,
    paddingHorizontal: SmartScreenBase.smBaseWidth * 50,
    backgroundColor: Colors.White,
    marginBottom: SmartScreenBase.smPercenWidth * 4,
  },
  contentDashboard: {
    borderTopWidth: 1,
    borderTopColor: Colors.Gray_E5,
    paddingVertical: 3 * SmartScreenBase.smPercenWidth,
    paddingHorizontal: SmartScreenBase.smBaseWidth * 35,
  },
  positionAbs: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flex: 1,
    backgroundColor: Colors._black02,
  },
  positionRel: {
    position: 'relative',
  },
  titleBox: {
    fontSize: FontSize.size45Font,
    ...FontWeight.Bold,
  },
  detailExerciseLeft: {
    paddingRight: SmartScreenBase.smBaseWidth * 100,
  },
  textUnderlineDetail: {
    textDecorationLine: 'underline',
    color: Colors.PrimaryOrange,
    fontSize: FontSize.size40Font,
  },
  textOrange: {
    ...FontWeight.Bold,
    fontSize: FontSize.size85Font,
    color: Colors.PrimaryOrange,
  },
  textBlue: {
    ...FontWeight.Bold,
    fontSize: FontSize.size85Font,
    color: Colors.PrimaryBlue,
  },
  textRed: {
    ...FontWeight.Bold,
    fontSize: FontSize.size85Font,
    color: Colors.Red_EB5,
  },
  textPdTop: {
    paddingTop: SmartScreenBase.smPercenWidth * 3,
  },
  textTypeTimeAvg: {
    color: Colors.TextLight,
    fontSize: FontSize.size40Font,
  },
  textTypeSelectedTime: {
    color: Colors.PrimaryOrange,
    textDecorationLine: 'underline',
    ...FontWeight.Bold,
  },
  textComparation: {
    color: Colors.TextLight,
    fontSize: FontSize.size45Font,
    ...FontWeight.Bold,
    top: -SmartScreenBase.smBaseWidth * 13,
  },
  textOrangeBottom: {
    color: Colors.PrimaryOrange,
    fontSize: FontSize.size40Font,
    ...FontWeight.Bold,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.BorderLight,
    paddingVertical: SmartScreenBase.smBaseWidth * 12,
    marginBottom: SmartScreenBase.smBaseWidth * 5,
  },
});

export default styles;
