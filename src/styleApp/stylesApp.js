import {StyleSheet, Platform} from 'react-native';
import FontBase from '../base/FontBase';
import SmartScreenBase from '../base/SmartScreenBase';
SmartScreenBase.baseSetup();
import {Colors} from './color';
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
    fontSize: SmartScreenBase.smPercenWidth * 3.5,
    color: 'black',
  },
  txtContent: {
    fontSize: SmartScreenBase.smFontSize * 45,
    color: 'black',
    fontFamily: FontBase.MyriadPro_Regular,
  },
  txt_Title: {
    fontFamily: FontBase.MyriadPro_Regular,
    fontSize: SmartScreenBase.smPercenWidth * 4.5,
    color: 'black',
  },
  containerModal: {
    width: SmartScreenBase.smPercenWidth * 90,
    borderRadius: SmartScreenBase.smPercenWidth * 3,
    backgroundColor: 'rgba(255,255,255,0.95)',
    padding: SmartScreenBase.smPercenHeight,
    alignSelf: 'center',
    alignItems: 'center',
  },
  Sty_Button: {
    width: SmartScreenBase.smPercenWidth * 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SmartScreenBase.smPercenWidth * 3,
    borderRadius: SmartScreenBase.smPercenWidth * 60,
    backgroundColor: '#f08b01',
  },
  Sty_Button_disable: {
    width: SmartScreenBase.smPercenWidth * 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SmartScreenBase.smPercenWidth * 3,
    borderRadius: SmartScreenBase.smPercenWidth * 60,
    backgroundColor: '#b7b7b7',
  },
  Sty_Text_Button: {
    fontFamily: FontBase.MyriadPro_Regular,
    fontSize: SmartScreenBase.smFontSize * 50,
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
  Sty_ShortButton: {
    width: SmartScreenBase.smPercenWidth * 35,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SmartScreenBase.smPercenHeight * 2,
    borderRadius: SmartScreenBase.smPercenWidth * 10,
    backgroundColor: '#f08b01',
  },
  Sty_SmallButton: {
    width: SmartScreenBase.smPercenWidth * 25,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SmartScreenBase.smPercenHeight,
    borderRadius: SmartScreenBase.smPercenWidth * 10,
  },
  Sty_MediumButton: {
    width: SmartScreenBase.smPercenWidth * 33,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SmartScreenBase.smPercenHeight,
    borderRadius: SmartScreenBase.smPercenWidth * 10,
  },
  view_header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    flexDirection: 'row',
  },
  view_content_header: {
    marginLeft: SmartScreenBase.smPercenWidth * 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SmartScreenBase.smPercenHeight * 3,
  },
  img_back: {
    width: SmartScreenBase.smPercenWidth * 5,
    height: SmartScreenBase.smPercenWidth * 5,
  },
  title: {
    color: 'white',
    // marginLeft: SmartScreenBase.smPercenWidth * 5,
    fontSize: SmartScreenBase.smPercenWidth * 5,
    padding: SmartScreenBase.smPercenHeight,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  flexJusBetween: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flexJusStartBetween: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flexJusEvenly: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  flexAlignCenter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexAlignStart: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  flexAlignEnd: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  flexAlignWrap: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  flexCenterColumn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  flexAllCenterColumn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexJusCenter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  flexJusEnd: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  textColorLight: {
    color: Colors.TextLight,
  },
  textLowerCase: {
    textTransform: 'lowercase',
  },
  textAlignCenter: {
    textAlign: 'center'
  },
  flexOnlyJusCenter: {
    display: 'flex',
    justifyContent: 'center'
  }
});
