import {Colors} from '../../../../styleApp/color';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import {Platform, StyleSheet} from 'react-native';
import FontBase from '../../../../base/FontBase';

const smartScreenWidth = SmartScreenBase.smPercenWidth;
const smartScreenHeight = SmartScreenBase.smPercenHeight;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.LightGrayish,
  },
  body: {
    marginTop: smartScreenWidth * 5,
    marginBottom: SmartScreenBase.smPercenHeight * 4,
  },
  body2: {
    marginTop: smartScreenWidth * 5,
  },
  avatarContainer: {
    position: 'absolute',
    zIndex: 10000,
    width: SmartScreenBase.smBaseWidth * 150,
    height: SmartScreenBase.smBaseWidth * 150,
    borderRadius: SmartScreenBase.smBaseWidth * 100,
    shadowOpacity: 0.5,
    shadowColor: Colors.BaseGreen,
    shadowOffset: {
      width: 0,
      height: SmartScreenBase.smBaseHeight * 6,
    },
    shadowRadius: 3.84,
    elevation: 2,
    backgroundColor: Colors.White,
    marginLeft: 3,
  },
  avatar: {
    width: SmartScreenBase.smBaseWidth * 150,
    height: SmartScreenBase.smBaseWidth * 150,
    zIndex: 1,
  },
  mark: {
    width: SmartScreenBase.smBaseWidth * 90,
    height: SmartScreenBase.smBaseWidth * 85,
    zIndex: 1,
    position: 'absolute',
    right: SmartScreenBase.smBaseWidth * 20,
    bottom: -SmartScreenBase.smBaseWidth * 35,
  },
  markContainer: {
    backgroundColor: Colors.White,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: smartScreenWidth * 10,
    height: SmartScreenBase.smBaseWidth * 150,
    justifyContent: 'center',
  },
  titleView: {
    alignItems: 'center',
    width: '60%',
  },
  title: {
    fontSize: SmartScreenBase.smFontSize * 45,
    lineHeight: 30,
    textAlign: 'center',
    fontFamily: FontBase.MyriadPro_Regular,
  },
  title2: {
    fontSize: SmartScreenBase.smFontSize * 60,
  },
  scoreTable: {
    backgroundColor: Colors.White,
    borderRadius: smartScreenWidth * 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: smartScreenHeight * 2,
    paddingBottom: smartScreenHeight * 5,
  },
  scoreContainer: {
    width: '30%',
    alignItems: 'center',
    paddingHorizontal: smartScreenWidth * 3,
  },
  score: {
    borderRadius: smartScreenWidth * 3,
    borderWidth: SmartScreenBase.smBaseWidth * 1.44,
    width: '100%',
    height: smartScreenHeight * 10,
    borderColor: Colors.DarkGrayish,
    marginTop: smartScreenHeight,
    textAlign: 'center',
    color: Colors.StrongRed,
    fontSize: SmartScreenBase.smFontSize * 80,
    fontFamily: FontBase.MyriadPro_Bold,
  },
  reviewContainer: {
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: smartScreenWidth * 5,
  },
  review: {
    borderRadius: smartScreenWidth * 3,
    borderWidth: SmartScreenBase.smBaseWidth * 1.44,
    width: '100%',
    height: smartScreenHeight * 25,
    borderColor: Colors.DarkGrayish,
    marginTop: smartScreenHeight,
    paddingHorizontal: smartScreenWidth * 3,
    fontSize: SmartScreenBase.smFontSize * 50,
    fontFamily: FontBase.MyriadPro_LightIt,
    textAlignVertical: 'top',
    color: Colors.Black
  },
  review1: {
    borderRadius: smartScreenWidth * 3,
    borderWidth: SmartScreenBase.smBaseWidth * 1.44,
    width: '100%',
    height: smartScreenHeight * 25,
    borderColor: Colors.DarkGrayish,
    marginTop: smartScreenHeight,
    paddingHorizontal: smartScreenWidth * 3,
    fontFamily: FontBase.MyriadPro_LightIt,
  },
  review2: {
    fontSize: SmartScreenBase.smFontSize * 50,
    textAlignVertical: 'top',
    fontFamily: FontBase.MyriadPro_LightIt,
    marginTop: SmartScreenBase.smPercenWidth*2.4,
    color: Colors.Black
  },
  btnContainer: {
    alignItems: 'center',
    borderRadius: smartScreenWidth * 10,
    justifyContent: 'center',
    width: '60%',
    alignSelf: 'center',
    marginVertical: SmartScreenBase.smPercenHeight * 5,
    paddingVertical: smartScreenHeight * 1,
    height: 'auto',
  },
  btnText: {
    fontSize: SmartScreenBase.smFontSize * 55,
    lineHeight: 30,
    color: Colors.White,
    fontFamily: FontBase.MyriadPro_Bold,
    marginTop: Platform.OS === 'android' ? 0 : SmartScreenBase.smBaseHeight * 8,
  },
  paddingBody: {
    paddingHorizontal: smartScreenWidth * 5,
  },
});

export default styles;
