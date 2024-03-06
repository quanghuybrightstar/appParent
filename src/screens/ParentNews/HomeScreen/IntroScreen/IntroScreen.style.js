import {Platform, StyleSheet} from 'react-native';
import FontBase from '../../../../base/FontBase';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import {Colors} from '../../../../styleApp/color';
import {FontSize, FontWeight} from '../../../../styleApp/font';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerContent: {
    backgroundColor: Colors._F3FFFF,
    width: '100%',
    position: 'relative',
    // flex: 1,
    // padding: SmartScreenBase.smPercenWidth * 2,
    // marginTop: SmartScreenBase.smBaseHeight * 50,
  },
  flex1: {
    flex: 1,
  },
  imgIntro: {
    marginBottom: SmartScreenBase.smPercenWidth * 10,
  },
  textTitleIntro: {
    color: Colors.PrimaryOrange,
    ...FontWeight.Bold,
    textTransform: 'uppercase',
    fontSize: SmartScreenBase.smFontSize * 57,
    textAlign: 'center',
    paddingTop: SmartScreenBase.smPercenWidth * 1,
  },
  textDetailIntro: {
    textAlign: 'center',
    marginTop: -SmartScreenBase.smPercenWidth * 3,
    fontSize: SmartScreenBase.smFontSize * 43,
    color: Colors.Black,
  },
  textSubTitleIntro: {
    color: Colors.PrimaryOrange,
    ...FontWeight.Bold,
    fontSize: SmartScreenBase.smFontSize * 57,
    textAlign: 'center',
  },
  btnChangeItem: {
    width: SmartScreenBase.smBaseWidth * 90,
    width: SmartScreenBase.smBaseWidth * 90,
  },
});

export default styles;
