import {StyleSheet} from 'react-native';
import FontBase from '../../base/FontBase';
import SmartScreenBase from '../../base/SmartScreenBase';
import {Colors} from '../../styleApp/color';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  containerAudio: {
    backgroundColor: Colors.White,
    width: '100%',
    justifyContent: 'space-between',
    paddingVertical: SmartScreenBase.smPercenHeight * 2.5,
    borderRadius: SmartScreenBase.smPercenWidth * 4,
  },
  viewProcess: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: SmartScreenBase.smPercenWidth * 3,
  },
  slider: {
    flex: 1,
    marginHorizontal: SmartScreenBase.smPercenWidth * 3,
  },
  trackStyle: {
    height: SmartScreenBase.smPercenWidth * 1.5,
  },
  thumbStyle: {
    width: SmartScreenBase.smPercenWidth * 4,
    height: SmartScreenBase.smPercenWidth * 4,
  },
  textTime: {
    fontFamily: FontBase.MyriadPro_Light,
    fontSize: SmartScreenBase.smFontSize * 40,
    minWidth: SmartScreenBase.smPercenWidth * 15,
    fontStyle: 'normal',
  },
  viewControl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonNext: {
    width: SmartScreenBase.smPercenWidth * 12,
    height: SmartScreenBase.smPercenWidth * 12,
  },
  icon: {
    width: '120%',
    height: '100%',
  },
  buttonPlay: {
    width: SmartScreenBase.smPercenWidth * 15,
    height: SmartScreenBase.smPercenWidth * 15,
    marginHorizontal: SmartScreenBase.smPercenWidth * 6,
  },
});

export default styles;
