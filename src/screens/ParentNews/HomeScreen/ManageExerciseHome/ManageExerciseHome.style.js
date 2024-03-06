import {StyleSheet, Dimensions} from 'react-native';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import {Colors} from '../../../../styleApp/color';
import {FontSize, FontWeight} from '../../../../styleApp/font';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors._F3FFFF,
  },
  flex1: {flex: 1},
  contentExercise: {
    paddingVertical: 4 * SmartScreenBase.smPercenWidth,
    paddingHorizontal: SmartScreenBase.smBaseWidth * 35,
  },
});
