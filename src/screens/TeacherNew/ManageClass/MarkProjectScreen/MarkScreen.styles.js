import {StyleSheet} from 'react-native';
import SmartScreenBase from '../../../../component/base/SmartScreenBase';
import {Colors} from '../../../../styleApp/color';

const smartScreenWidth = SmartScreenBase.smPercenWidth;
const smartScreenHeight = SmartScreenBase.smPercenHeight;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.LightGrayish,
  },
  body: {
    marginLeft: smartScreenWidth * 5,
    marginTop: smartScreenWidth * 5,
  },
  avatarContainer: {
    shadowOpacity: 0.8,
    shadowColor: Colors.BaseGreen,
    position: 'absolute',
    zIndex: 10000,
  },
  avatar: {
    width: SmartScreenBase.smBaseWidth * 200,
    height: SmartScreenBase.smBaseWidth * 200,
    zIndex: 1,
    top: 0,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: smartScreenWidth * 10,
    marginRight: smartScreenWidth * 5,
    height: SmartScreenBase.smBaseWidth * 200,
    justifyContent: 'center',
  },
  titleView: {
    marginLeft: smartScreenWidth * 5,
  },
  title: {
    fontSize: SmartScreenBase.smFontSize * 50,
    lineHeight: 30,
  },
  scoreTable: {
    marginHorizontal: smartScreenWidth * 5,
    backgroundColor: Colors.White,
    borderRadius: smartScreenWidth * 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: smartScreenHeight * 2,
    marginTop: smartScreenHeight * 5,
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
    color: Colors.Red_BE1,
    fontWeight: 'bold',
    fontSize: SmartScreenBase.smFontSize * 80,
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
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: smartScreenWidth * 10,
    margin: smartScreenWidth * 5,
    justifyContent: 'center',
    width: '50%',
    alignSelf: 'center',
    paddingVertical: smartScreenHeight * 2,
  },
  btnText: {
    fontSize: SmartScreenBase.smFontSize * 50,
    lineHeight: 30,
    color: Colors.White,
  },
});
