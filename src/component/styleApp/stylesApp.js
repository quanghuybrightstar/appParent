
import {Platform, StyleSheet,Dimensions} from 'react-native';
import FontBase from '../../base/FontBase';
import SmartScreenBase from '../../base/SmartScreenBase';
const { width, height } = Dimensions.get('window')

SmartScreenBase.baseSetup();
export default StyleSheet.create({
  container: {
    width: SmartScreenBase.smPercenWidth * 100,
    height: SmartScreenBase.smPercenHeight * 100,
    marginTop: Platform.OS === 'ios' ? height / 60 : 0,
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
    fontFamily: FontBase.MyriadPro_Regular,
    fontSize: SmartScreenBase.smPercenWidth * 3,
    color: 'black',
  },
  txt_Title: {
    fontFamily: FontBase.MyriadPro_Bold,
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
    width: SmartScreenBase.smPercenWidth * 60,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SmartScreenBase.smPercenHeight * 2,
    borderRadius: SmartScreenBase.smPercenWidth * 60,
    backgroundColor: '#f08b01',
  },
  Sty_Button_disable: {
    width: SmartScreenBase.smPercenWidth * 60,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SmartScreenBase.smPercenHeight * 2,
    borderRadius: SmartScreenBase.smPercenWidth * 60,
    backgroundColor: '#b7b7b7',
  },
  Sty_Text_Button: {
    fontSize: SmartScreenBase.smFontSize * 50,
    color: 'white',
    textTransform: 'uppercase',
    fontFamily: FontBase.MyriadPro_Regular
  },
  Sty_View_Border: {
    width: SmartScreenBase.smPercenWidth * 90,
    borderRadius: SmartScreenBase.smPercenWidth * 3,
    backgroundColor: 'rgba(255,255,255,0.95)',
    padding: SmartScreenBase.smPercenHeight,
    alignSelf: 'center',
    alignItems: 'center',
  },
  Sty_ShortButton: {
    width: SmartScreenBase.smPercenWidth * 35,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SmartScreenBase.smPercenHeight * 2,
    borderRadius: SmartScreenBase.smPercenWidth * 10,
    backgroundColor: '#f08b01',
    marginHorizontal: 10
  },
  Sty_Marid_Bold_50:{
    fontFamily:Platform.OS==='ios'?'MyriadPro-Bold':'myriadpro_bold',
    fontSize:SmartScreenBase.smFontSize * 50
  }
});
