import {Platform, StyleSheet} from 'react-native';
import SmartScreenBase from '../../../../base/SmartScreenBase';
SmartScreenBase.baseSetup();
export default StyleSheet.create({
  container: {
    width: SmartScreenBase.smPercenWidth * 100,
    height: SmartScreenBase.smPercenHeight * 100,
    marginTop: Platform.OS === 'ios' ? 35 : 0,
  },
  ImageBackGround: {
    width: SmartScreenBase.smPercenWidth * 100,
    height: SmartScreenBase.smPercenHeight * 100,
    resizeMode: 'cover',
  },
  ImageBottomBar: {
    width: SmartScreenBase.smBaseWidth * 1079,
    height: SmartScreenBase.smBaseWidth * 165,
    resizeMode: 'contain',
  },
  txt: {
    fontWeight: '400',
    fontSize: SmartScreenBase.smPercenWidth * 4,
    color: 'black',
  },
  txt_Title: {
    fontWeight: '700',
    fontSize: SmartScreenBase.smPercenWidth * 4.5,
    color: 'black',
  },
  containerModal: {
    width: SmartScreenBase.smPercenWidth * 90,
    height: SmartScreenBase.smPercenWidth * 50,
    borderRadius: SmartScreenBase.smPercenWidth * 3,
    backgroundColor: 'rgba(255,255,255,0.95)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Sty_Button: {
    width: SmartScreenBase.smPercenWidth * 65,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SmartScreenBase.smPercenHeight * 1.4,
    borderRadius: SmartScreenBase.smPercenWidth * 5,
    backgroundColor: '#01283A',
  },
  Sty_Buttonseve: {
    width: SmartScreenBase.smPercenWidth * 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SmartScreenBase.smPercenHeight * 1.4,
    borderRadius: SmartScreenBase.smPercenWidth * 5,
    backgroundColor: '#01283A',
  },
  Style_Buttonseve:{
    width: SmartScreenBase.smPercenWidth * 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SmartScreenBase.smPercenHeight * 1.4,
    borderRadius: SmartScreenBase.smPercenWidth * 5,
    backgroundColor: '#01283A',
  },

  Sty_Text_Buttonsave: {
    fontWeight: '600',
    color: 'white',
  },
  Sty_Text_Buttonsen:{
    fontWeight: '600',
    color: 'white',
  },
  Sty_View_Border: {
    width: SmartScreenBase.smPercenWidth * 90,
    borderRadius: SmartScreenBase.smPercenWidth * 3,
    backgroundColor: 'rgba(255,255,255,0.95)',
    padding: SmartScreenBase.smPercenHeight,
    alignSelf: 'center',
    alignItems: 'center',
  },
});
