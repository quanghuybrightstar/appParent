import {Platform, StyleSheet} from 'react-native';
import FontBase from '../../../../base/FontBase';
import SmartScreenBase from '../../../../component/base/SmartScreenBase';
import {Colors} from '../../../../styleApp/color';
import {FontSize} from '../../../../styleApp/font';

const smartScreenHeight = SmartScreenBase.smPercenHeight;
const smartScreenWidth = SmartScreenBase.smPercenWidth;
const smartFont = SmartScreenBase.smFontSize;
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.LightGrayish,
  },
  tabBar: {
    borderBottomWidth: 0,
    backgroundColor: Colors.BrightOrange,
  },
  tabBarContainer: {
    backgroundColor: 'transparent',
    elevation: 0,
    marginHorizontal: SmartScreenBase.smPercenWidth * 3,
  },
  labelStyle: {
    fontSize: FontSize.size45Font,
    color: Colors.Black,
    paddingTop: Platform.OS === 'ios' ? smartScreenWidth : 0,
  },
  itemContainer: {
    borderRadius: smartScreenWidth * 6,
    backgroundColor: Colors.White,
    marginRight: smartScreenWidth * 5,
    marginLeft: smartScreenWidth * 15,
    paddingVertical: smartScreenWidth,
    flexDirection: 'row',
  },
  avatar: {
    width: SmartScreenBase.smBaseWidth * 180,
    height: SmartScreenBase.smBaseWidth * 180,
    resizeMode: 'stretch',
    flex: 1,
  },
  avatar2: {
    width: SmartScreenBase.smBaseWidth * 200,
    height: SmartScreenBase.smBaseWidth * 200,
    marginLeft: -SmartScreenBase.smBaseWidth * 110,
  },
  avatarContainer: {
    width: SmartScreenBase.smBaseWidth * 190,
    height: SmartScreenBase.smBaseWidth * 190,
    borderRadius: SmartScreenBase.smBaseWidth * 95,
    marginLeft: -SmartScreenBase.smBaseWidth * 110,
    marginTop: SmartScreenBase.smPercenWidth*0.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.White,
    borderWidth: SmartScreenBase.smBaseWidth * 5.76,
  },
  detailContainer: {
    marginLeft: smartScreenWidth * 3,
    justifyContent: 'center',
  },
  name: {
    width: SmartScreenBase.smPercenWidth*40,
    fontSize: SmartScreenBase.smFontSize * 50,
    fontFamily: FontBase.MyriadPro_Regular,
    color: Colors.Black
  },
  submitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clock: {
    width: SmartScreenBase.smBaseWidth * 70,
    height: SmartScreenBase.smBaseWidth * 70,
  },
  time: {
    fontSize: SmartScreenBase.smFontSize * 40,
    marginLeft: smartScreenWidth * 2,
    fontFamily: FontBase.MyriadPro_Regular,
    marginTop: Platform.OS === 'android' ? 0 : SmartScreenBase.smBaseHeight * 5,
  },
  pointContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SmartScreenBase.smPercenHeight * 2,
    borderRadius: smartScreenWidth * 10,
    top: SmartScreenBase.smPercenWidth * 1,
    right: SmartScreenBase.smPercenWidth * 7,
    justifyContent: 'center',
    width: SmartScreenBase.smPercenWidth * 25,
  },
  score: {
    color: Colors.White,
    fontSize: SmartScreenBase.smFontSize * 70,
    fontFamily: FontBase.MyriadPro_Bold_It,
  },
  score2: {
    color: Colors.White,
    fontSize: SmartScreenBase.smFontSize * 50,
    alignSelf: 'center',
    marginTop: Platform.OS === 'android' ? 0 : SmartScreenBase.smBaseHeight * 8,
    fontFamily: FontBase.MyriadPro_It,
  },
  markedContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: smartScreenWidth,
  },
  maxScore: {
    flexDirection: 'column',
    alignItems: 'center',
    height: SmartScreenBase.smPercenWidth*22,
    width: '50%',
  },
  score3: {
    color: Colors.DarkCyan2,
    fontSize: smartFont * 80,
    padding: smartScreenHeight,
    fontFamily: FontBase.MyriadPro_Bold,
  },
  barie: {
    height: smartScreenHeight * 12,
    width: SmartScreenBase.smBaseWidth * 2.88,
    backgroundColor: Colors.ModerateCyan,
    marginVertical: smartScreenHeight * 2,
  },
  score4: {
    fontFamily: FontBase.MyriadPro_Light,
    fontSize: SmartScreenBase.smFontSize * 40,
  },
  emptyContainer: {
    marginHorizontal: SmartScreenBase.smPercenWidth * 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SmartScreenBase.smPercenWidth * 3,
    paddingVertical: SmartScreenBase.smPercenWidth * 5,
    paddingHorizontal: SmartScreenBase.smPercenWidth * 5,
  },
  emptyText: {
    fontSize: FontSize.size45Font,
    color: Colors.BaseGreen,
    textAlign: 'center',
    marginTop: SmartScreenBase.smPercenHeight * 5,
    fontFamily: FontBase.MyriadPro_Bold,
  },
  emptyImage: {
    width: '100%',
    height: SmartScreenBase.smBaseWidth * 400,
  },
  title: {
    fontSize: SmartScreenBase.smFontSize * 60,
  },
});
