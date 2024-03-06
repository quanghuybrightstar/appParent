import {Dimensions} from 'react-native';

class SmartScreenBase {
  static smBaseWidth = 0;
  static smBaseHeight = 0;

  static smPercenWidth = 0;
  static smPercenHeight = 0;

  static smFontSize = 0;

  static hello() {
    // console.log('helloWidth:' + SmartScreenBase.smBaseWidth);
    // console.log('helloHeight:' + SmartScreenBase.smBaseHeight);
  }

  static baseSetup() {
    if (SmartScreenBase.smPercenWidth == 0) {
      var sWidth = Dimensions.get('window').width;
      var sHeight = Dimensions.get('window').height;
      //console.log("sWidth:"+sWidth);
      //console.log("sHeight:"+sHeight);

      SmartScreenBase.smPercenWidth = sWidth / 100;
      SmartScreenBase.smPercenHeight = sHeight / 100;

      if (sHeight / sWidth >= 1.5) {
        SmartScreenBase.smBaseWidth = sWidth / 1080;
        SmartScreenBase.smBaseHeight = sHeight / 1080;
        SmartScreenBase.smFontSize = sWidth / 1080;
      } else {
        SmartScreenBase.smBaseWidth = sWidth / 1668;
        SmartScreenBase.smBaseHeight = sHeight / 1668;
        SmartScreenBase.smFontSize = sWidth / 1668;
      }
      //console.log("smBaseWidth:"+SmartScreenBase.smBaseWidth);
      //console.log("smBaseHeight:"+SmartScreenBase.smBaseHeight);
    }
  }
}
export default SmartScreenBase;
