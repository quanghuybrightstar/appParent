// Xem lại sau ghép code
import {StyleSheet, Dimensions,Platform} from 'react-native';
import SmartScreenBase from '../../base/SmartScreenBase';
import FontBase from '../../base/FontBase';
import { Colors } from '../../styleApp/color';
import { FontSize } from '../../styleApp/font';

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  rxItem: {
    width: SmartScreenBase.smPercenWidth * 45,
    borderRadius: SmartScreenBase.smPercenWidth * 3,
    backgroundColor: '#fff',
    marginLeft: SmartScreenBase.smPercenWidth * 3,
    height:SmartScreenBase.smPercenHeight*18,
  },
  rxActive: {
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height:2,
    },
    shadowOpacity: Platform.OS==='android'?1:0.5,
    shadowRadius: 3,
    elevation: 3,
    marginVertical:5,
    marginRight:5,
    height:SmartScreenBase.smPercenHeight*20,
  },
  rxView: {
    flex: 7,
    backgroundColor: '#ececec',
    borderTopLeftRadius: SmartScreenBase.smPercenWidth * 3,
    borderTopRightRadius: SmartScreenBase.smPercenWidth * 3,
  },
  rxImg: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: SmartScreenBase.smPercenWidth * 3,
    borderTopRightRadius: SmartScreenBase.smPercenWidth * 3,
  },
  rxTxtView: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal:SmartScreenBase.smPercenWidth*2
  },
  dotCon:{
    height:SmartScreenBase.smPercenHeight*4,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  cont1:{
    marginTop: SmartScreenBase.smPercenHeight * 10,
    paddingHorizontal: SmartScreenBase.smPercenWidth * 5,
    justifyContent:'flex-end'
  },
  cont2:{
    borderRadius:SmartScreenBase.smPercenWidth * 3,
    shadowColor: '#000',
    shadowOffset: {
        width: 2,
        height:2,
    },
    shadowOpacity: Platform.OS==='android'?1:0.3,
    shadowRadius: 3,
    elevation: 10,
    marginBottom: width / 30,
  },
  contTop:{
    width: '100%',
    borderTopLeftRadius: SmartScreenBase.smPercenWidth * 3,
    borderTopRightRadius: SmartScreenBase.smPercenWidth * 3,
    backgroundColor: '#d7f2f2',
    height: SmartScreenBase.smPercenHeight * 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtTop:{
    color: '#53bba0',
    fontFamily: FontBase.MyriadPro_Bold,
    fontSize: SmartScreenBase.smFontSize * 55,
    width: '100%',
    textAlign: 'center',
  },
  content:{
    width: '100%',
    height: SmartScreenBase.smPercenHeight * 17,
    backgroundColor: '#fff',
    borderBottomLeftRadius: SmartScreenBase.smPercenWidth * 3,
    borderBottomRightRadius: SmartScreenBase.smPercenWidth * 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SmartScreenBase.smPercenWidth * 3,
  },
  icon:{
    width: '25%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img:{
    resizeMode: 'contain',
    width: SmartScreenBase.smPercenWidth * 17,
    height: SmartScreenBase.smPercenWidth * 17,
  },
  cont3:{
    width: '75%',
    height: '100%',
    justifyContent: 'center',
    marginLeft: 10,
  },
  txt2:{
    fontSize: SmartScreenBase.smFontSize * 55,
    width: '100%',
    fontFamily: FontBase.MyriadPro_Bold,
    color: '#404041',
  },
  txt3:{
    fontSize: SmartScreenBase.smFontSize * 45,
    width: '100%',
    fontFamily: FontBase.MyriadPro_Regular,
    color: '#404041',
  },
  ls:{
    height: '100%',
    paddingVertical: SmartScreenBase.smPercenHeight,
  },
  modalBox: {
    paddingBottom: SmartScreenBase.smBaseHeight * 40,
    paddingTop: SmartScreenBase.smBaseHeight * 40,
  },
  messageModalStyle: {
    marginBottom: SmartScreenBase.smBaseHeight * 20,
    color: Colors.Black,
    fontSize: FontSize.size55Font,
    lineHeight: SmartScreenBase.smBaseHeight * 40
  },
  messageDeleteStyle: {
    marginBottom: 0,
    paddingBottom: 0
  },
  lsv:{
    backgroundColor: '#cdf1eb', 
    width: '100%',
    height:SmartScreenBase.smPercenHeight*24,
  },
  modal:{
    position:'absolute',
    left:0,
    right:0,
    bottom:0,
    top:0,
    backgroundColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center'
  }
});
