import {StyleSheet} from 'react-native';
import SmartScreenBase from '../../base/SmartScreenBase';
import font from '../../../base/FontBase';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerVideo: {
    width: '100%',
    backgroundColor: '#000',
    // height: SmartScreenBase.smPercenHeight * 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  viewControl: {
    zIndex: 99999,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#00000060',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewTopControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonNext: {
    width: SmartScreenBase.smPercenWidth * 10,
    height: SmartScreenBase.smPercenWidth * 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: SmartScreenBase.smPercenWidth * 7,
  },
  iconNext: {
    width: '70%',
    height: '70%',
    resizeMode: 'contain',
  },
  buttonPlay: {
    width: SmartScreenBase.smPercenWidth * 17,
    height: SmartScreenBase.smPercenWidth * 17,
  },
  iconPlay: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  viewProcess: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SmartScreenBase.smPercenWidth * 2,
    justifyContent: 'space-between',
  },
  textTime: {
    fontFamily: font.MyriadPro_Light,
    fontSize: SmartScreenBase.smFontSize * 35,
    minWidth: SmartScreenBase.smPercenWidth * 15,
    color: '#fff',
  },
  slider: {
    flex: 1,
    marginRight: SmartScreenBase.smPercenWidth * 2,
  },
  trackStyle: {
    height: SmartScreenBase.smPercenWidth * 1.5,
  },
  thumbStyle: {
    width: SmartScreenBase.smPercenWidth * 4,
    height: SmartScreenBase.smPercenWidth * 4,
  },
  buttonZoom: {
    width: SmartScreenBase.smPercenWidth * 4,
    height: SmartScreenBase.smPercenWidth * 4,
  },
  containerModal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000000',
  },
});

export default styles;
