import { StyleSheet,Dimensions} from 'react-native';
import SmartScreenBase from '../../../../../base/SmartScreenBase';
SmartScreenBase.baseSetup();
const { height, width } = Dimensions.get('window');
const smartScreen = SmartScreenBase.smPercenHeight;
export default StyleSheet.create({
  HeightExercise: {
    height: SmartScreenBase.smPercenHeight * 90,
    alignSelf: 'center',
  },
  Sty_Width_Screen: {
    width: SmartScreenBase.smPercenWidth * 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  View_Process: {
    width: SmartScreenBase.smPercenWidth * 80,
    height: SmartScreenBase.smPercenHeight * 2.5,
    borderRadius: (SmartScreenBase.smPercenHeight * 2.5) / 2,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  Process: {
    height: SmartScreenBase.smPercenHeight * 2.5 - 2,
    borderRadius: (SmartScreenBase.smPercenHeight * 2.5) / 2,
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  Sty_Tyle_Lesson: {
    alignSelf: 'center',
    width: SmartScreenBase.smPercenWidth * 85,
    borderRadius: SmartScreenBase.smPercenWidth * 6,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: SmartScreenBase.smPercenHeight * 2,
  },
  Sty_Text_Type_Lesson: {
    fontSize: SmartScreenBase.smPercenWidth * 4,
    color: 'white',
    textAlign: 'center',
    fontWeight: '500',
    marginLeft: SmartScreenBase.smPercenWidth * 15,
    marginVertical: SmartScreenBase.smPercenHeight * 2,
    marginRight: SmartScreenBase.smPercenWidth,
  },
  Sty_ImageTyle_1: {
    width: SmartScreenBase.smBaseWidth * 207,
    height: SmartScreenBase.smBaseWidth * 199,
    resizeMode: 'contain',
  },
  Sty_ImageTyle_sen: {
    width: SmartScreenBase.smBaseWidth * 300,
    height: SmartScreenBase.smBaseWidth * 300,
    resizeMode: 'contain',
  },
  Sty_ImageTyle_1_1: {
    width: SmartScreenBase.smBaseWidth * 100,
    height: SmartScreenBase.smBaseWidth * 100,
    resizeMode: 'contain',
  },
  Sty_ImageTyle_1_1_2: {
    width: SmartScreenBase.smBaseWidth * 100,
    height: SmartScreenBase.smBaseWidth * 100,
    resizeMode: 'contain',
    marginLeft: 10,
  },
  Sty_ImageTyleiconD3: {
    width: SmartScreenBase.smBaseWidth * 50,
    height: SmartScreenBase.smBaseWidth * 50,
  },
  Sty_ImageTyle_1_1_2D3: {
    width: SmartScreenBase.smBaseWidth * 100,
    height: SmartScreenBase.smBaseWidth * 100,
    resizeMode: 'contain',
  },
  Sty_ImageTyledd1D3: {
    width: SmartScreenBase.smBaseWidth * 100,
    height: SmartScreenBase.smBaseWidth * 100,
    resizeMode: 'contain',
  },
  Sty_ImageTyledd2D3: {
    margin: 10,
    width: SmartScreenBase.smBaseWidth * 300,
    height: SmartScreenBase.smBaseWidth * 300,
    resizeMode: 'contain',
  },
  showmodal: {
    top: SmartScreenBase.smPercenHeight * 30,
    width: '80%',
    borderColor: '#C6E50E',
    borderWidth: 1,
    borderRadius: 20,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: '#FFFFFF'
  },
  Sty_ImageTyle_1_2_1: {
    width: SmartScreenBase.smBaseWidth * 300,
    height: SmartScreenBase.smBaseWidth * 300,
    resizeMode: 'contain',
  },
  Sty_ImageTyle_1_4_3: {
    width: SmartScreenBase.smBaseWidth * 700,
    height: SmartScreenBase.smBaseWidth * 300,
    resizeMode: 'contain',
  },
  micro: {
    marginTop: SmartScreenBase.smPercenHeight * 1.3,
    justifyContent: 'center',
    alignItems: 'center',
    width: SmartScreenBase.smPercenWidth * 100,
  },
  micro2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: SmartScreenBase.smPercenWidth * 100,
  },
  Sty_ImageTyle_2: {
    width: SmartScreenBase.smBaseWidth * 89,
    height: SmartScreenBase.smBaseWidth * 83,
  },
  Sty_ImageTyle_2starD2: {
    width: SmartScreenBase.smBaseWidth * 89,
    height: SmartScreenBase.smBaseWidth * 83,
    margin:5,
  },
  Sty_statustarD2: {
    width: SmartScreenBase.smBaseWidth * 40,
    height: SmartScreenBase.smBaseWidth * 40,
  },
  Sty_ImageTyle_2_speakingD2: {
    width: SmartScreenBase.smBaseWidth * 89,
    height: SmartScreenBase.smBaseWidth * 83,
  },
  Sty_ImageTyle_2_1: {
    width: SmartScreenBase.smBaseWidth * 130,
    height: SmartScreenBase.smBaseWidth * 130,
    resizeMode: 'contain',
    margin: 10,
    backgroundColor: 'red',
    zIndex: 100,
  },
  styleanswer: {
    marginTop: SmartScreenBase.smPercenHeight * 2,
    width: '80%',
    borderRadius: 10,
    borderColor: '#00CC00',
    borderWidth: 1,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  Sty_ImageTyle_03_03: {
    width: SmartScreenBase.smBaseWidth * 100,
    height: SmartScreenBase.smBaseWidth * 100,
    resizeMode: 'contain',
    margin: 5,
  },
  Styletext: {
    width: '50%',
    alignItems: 'center',
  },
  Position_ImageType1: {
    position: 'absolute',
    left: -SmartScreenBase.smPercenWidth * 5,
    top: -SmartScreenBase.smPercenHeight,
  },
  Position_ImageType2: {
    zIndex: 100,
    position: 'absolute',
    right: -SmartScreenBase.smPercenWidth * 3,
    bottom: -SmartScreenBase.smPercenWidth * 2,
  },
  Text_Title: {
    fontWeight: 'bold',
    fontSize: SmartScreenBase.smPercenWidth * 4.5,
    color: 'white',
  },
  Sty_Image_Notify: {
    width: SmartScreenBase.smBaseWidth * 903,
    height: SmartScreenBase.smBaseWidth * 306,
    resizeMode: 'contain',
  },
  Sty_ImageList: {
    width: SmartScreenBase.smBaseWidth * 1081,
    height: SmartScreenBase.smBaseWidth * 80,
    resizeMode: 'contain',
  },
  Sty_View_Border: {
    width: SmartScreenBase.smPercenWidth * 90,
    borderRadius: SmartScreenBase.smPercenWidth * 3,
    backgroundColor: 'rgba(255,255,255,0.95)',
    padding: SmartScreenBase.smPercenHeight,
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: SmartScreenBase.smPercenHeight * 2,

  },
  Sty_Image_Small_Answer: {
    width: SmartScreenBase.smBaseWidth * 112,
    height: SmartScreenBase.smBaseWidth * 112,
    resizeMode: 'contain',
  },
  Sty_ViewChooseSendTo: {
    height: SmartScreenBase.smPercenHeight * 3,
    width: SmartScreenBase.smPercenWidth * 80,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: SmartScreenBase.smPercenWidth * 3,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  ImageExit: {
    width: SmartScreenBase.smBaseWidth * 54,
    height: SmartScreenBase.smBaseWidth * 54,
    resizeMode: 'contain',
  },
  Sty_Image_Large_Answer: {
    width: SmartScreenBase.smBaseWidth * 281,
    height: SmartScreenBase.smBaseWidth * 324,
    resizeMode: 'contain',
  },
  Image_reuilt: {
    width: SmartScreenBase.smBaseWidth * 130,
    height: SmartScreenBase.smBaseWidth * 130,
    resizeMode: 'contain',
  },
  Image_CheckPlaySound: {
    width: SmartScreenBase.smBaseWidth * 97,
    height: SmartScreenBase.smBaseWidth * 97,
    resizeMode: 'contain',
  },
  Image_Sound: {
    width: SmartScreenBase.smBaseWidth * 118,
    height: SmartScreenBase.smBaseWidth * 118,
    resizeMode: 'contain',
  },
  Image_Explain: {
    width: SmartScreenBase.smBaseWidth * 50,
    height: SmartScreenBase.smBaseWidth * 50,
    resizeMode: 'contain',
  },
  ImageHint: {
    width: SmartScreenBase.smBaseWidth * 120,
    height: SmartScreenBase.smBaseWidth * 120,
    resizeMode: 'contain',
  },
  ImageRecorder: {
    width: SmartScreenBase.smBaseWidth * 590,
    height: SmartScreenBase.smBaseWidth * 590,
    resizeMode: 'contain',
  },
  ImageListenRecorder: {
    width: SmartScreenBase.smBaseWidth * 128,
    height: SmartScreenBase.smBaseWidth * 128,
    resizeMode: 'contain',
  },
  Sty_ImageList: {
    width: SmartScreenBase.smBaseWidth * 1081,
    height: SmartScreenBase.smBaseWidth * 500,
    resizeMode: 'contain',
  },
  Border_View: {
    marginHorizontal: SmartScreenBase.smPercenWidth * 2,
    paddingHorizontal: SmartScreenBase.smPercenWidth * 2,
    borderWidth: SmartScreenBase.smPercenWidth / 2,
    borderRadius: SmartScreenBase.smPercenWidth * 3,
    marginTop: SmartScreenBase.smPercenHeight,
  },
  viewCheckD3: {
    position: 'absolute',
    bottom: smartScreen * 3,
    paddingHorizontal: smartScreen * 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonCheckD3: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00283A',
    marginBottom: smartScreen * 2,
    borderRadius: (width - (smartScreen * 6)) / 2,
    width: width - (smartScreen * 6),
    height: smartScreen * 6
  },
});
