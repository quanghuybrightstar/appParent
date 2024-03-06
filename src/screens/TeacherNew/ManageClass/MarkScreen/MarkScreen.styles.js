import {Platform, StyleSheet} from 'react-native';
import FontBase from '../../../../base/FontBase';
import SmartScreenBase from '../../../../component/base/SmartScreenBase';
import {Colors} from '../../../../styleApp/color';
import {FontSize} from '../../../../styleApp/font';

export const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  child20: {width: '20%'},
  child75: {width: '75%'},
  levelContainer: {
    position: 'absolute',
    height: SmartScreenBase.smPercenWidth*5,
    borderRadius: SmartScreenBase.smPercenWidth * 1.5,
    minWidth: SmartScreenBase.smFontSize * 45 * 4.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  level: {
    color: Colors.White,
    fontSize: SmartScreenBase.smFontSize * 37,
    textAlign: 'center',
    fontFamily: FontBase.MyriadPro_Bold,
    marginTop: SmartScreenBase.smBaseHeight * 5,
    lineHeight: SmartScreenBase.smFontSize * 35,
  },
  exerciseTopic: {
    fontSize: SmartScreenBase.smFontSize * 45,
    color: Colors.DarkCyan,
    fontFamily: FontBase.MyriadPro_Bold,
    lineHeight: SmartScreenBase.smFontSize * 55,
  },
  exerciseName: {
    fontSize: SmartScreenBase.smFontSize * 45,
    color: Colors.DarkCyan,
    fontFamily: FontBase.MyriadPro_Light,
  },
  curriculumName: {
    fontSize: SmartScreenBase.smFontSize * 40,
    fontFamily: FontBase.MyriadPro_Light,
  },
  container1: {
    flexDirection: 'row',
    marginTop: SmartScreenBase.smPercenWidth * 3,
  },
  submit: {
    width: '45%',
    backgroundColor: Colors.DarkYellow,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SmartScreenBase.smPercenWidth * 3,
    marginRight: '5%',
  },
  submitNumber: {
    color: Colors.White,
    fontSize: SmartScreenBase.smFontSize * 42,
    fontFamily: FontBase.MyriadPro_Regular,
  },
  submitNumber2: {
    color: Colors.White,
    fontSize: SmartScreenBase.smFontSize * 40,
    fontFamily: FontBase.MyriadPro_Bold,
  },
  remark: {
    width: '45%',
    backgroundColor: Colors.LimeGreen,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SmartScreenBase.smPercenWidth * 3,
  },
  emptyContainer: {
    marginHorizontal: SmartScreenBase.smPercenWidth * 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SmartScreenBase.smPercenWidth * 3,
    paddingVertical: SmartScreenBase.smPercenWidth * 5,
    paddingHorizontal: SmartScreenBase.smPercenWidth * 5,
  },
  emptyText: {
    fontSize: FontSize.size50Font,
    color: Colors.BaseGreen,
    textAlign: 'center',
    marginTop: SmartScreenBase.smPercenHeight * 2,
    fontFamily: FontBase.MyriadPro_Bold,
  },
  emptyImage: {
    width: '100%',
    height: SmartScreenBase.smBaseWidth * 400,
  },
  hr: {
    width: '98%',
    height: SmartScreenBase.smBaseHeight * 1.2,
    backgroundColor: Colors.Gray,
    marginVertical: SmartScreenBase.smBaseHeight * 25,
    alignSelf: 'flex-end',
  },
  hr1: {
    width: '98%',
    backgroundColor: Colors.Gray,
    marginTop: SmartScreenBase.smBaseHeight * 25,
    alignSelf: 'flex-end',
  },
  title: {
    fontSize: SmartScreenBase.smFontSize * 60,
  },
});
