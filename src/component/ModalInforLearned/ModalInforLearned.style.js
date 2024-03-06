import {StyleSheet} from 'react-native';
import SmartScreenBase from '../base/SmartScreenBase';
import {Colors} from '../../styleApp/color';
import {FontSize, FontWeight} from '../../styleApp/font';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: -SmartScreenBase.smPercenWidth * 1.5,
    marginTop: SmartScreenBase.smPercenWidth * 2,
    backgroundColor: '#E3FFFE',
    borderRadius: 18 * SmartScreenBase.smBaseWidth,
    paddingHorizontal: SmartScreenBase.smPercenWidth * 5,
    paddingVertical: SmartScreenBase.smPercenWidth * 4,
    // width: '100%',
    height: '100%',
  },
  inforTimeLearning: {},
  boxTimeLearning: {
    width: SmartScreenBase.smBaseWidth * 165,
    height: SmartScreenBase.smBaseWidth * 165,
    borderColor: Colors.PrimaryOrange,
    borderWidth: 1,
    borderRadius: SmartScreenBase.smPercenWidth * 30,
    marginBottom: SmartScreenBase.smBaseWidth * 20,
  },
  listDetailTimeLearning: {
    paddingLeft: SmartScreenBase.smPercenWidth * 3,
    marginLeft: SmartScreenBase.smPercenWidth * 4,
    borderLeftColor: Colors.DarkGrayish,
    borderLeftWidth: 1,
    maxWidth: '70%',
    width: '70%',
  },
  flatListDetail: {
    width: '100%',
  },
  detailItem: {
    paddingHorizontal: 1.6 * SmartScreenBase.smPercenWidth,
    paddingVertical: 1.5 * SmartScreenBase.smPercenWidth,
    width: '50%',
  },
});

export default styles;
