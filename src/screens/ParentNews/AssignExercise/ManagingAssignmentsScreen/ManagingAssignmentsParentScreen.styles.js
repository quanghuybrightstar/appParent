import {Platform, StyleSheet} from 'react-native';
import FontBase from '../../../../base/FontBase';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import {Colors} from '../../../../styleApp/color';
import {FontSize, FontWeight} from '../../../../styleApp/font';

export const styles = StyleSheet.create({
  imageBanner: {
    alignSelf: 'center',
    marginTop: SmartScreenBase.smBaseHeight * 34,
    marginBottom: SmartScreenBase.smBaseHeight * 40,
    width: SmartScreenBase.smPercenWidth * 90,
    height: SmartScreenBase.smPercenHeight * 40,
  },
  txtContent: {
    fontSize: FontSize.size55Font,
    color: Colors._414141,
    marginHorizontal: SmartScreenBase.smPercenWidth * 10,
    textAlign: 'center',
    fontFamily: FontBase.MyriadPro_Light,
  },
  txtAssign: {
    fontSize: FontSize.size55Font,
    ...FontWeight.Bold,
  },
  btnAssign: {
    // flex: 1,
    // paddingHorizontal: SmartScreenBase.smBaseWidth * 178,
    justifyContent: 'center',
    alignItems: 'center',
    // paddingVertical: SmartScreenBase.smBaseWidth * 30,
    borderRadius: SmartScreenBase.smBaseWidth * 85,
  },
  txtTitle: {
    fontSize: FontSize.size55Font,
    ...FontWeight.SemiBold,
  },
  txtbtnAssign: {
    color: Colors.White,
    fontSize: FontSize.size55Font,
    ...FontWeight.SemiBold,
    textTransform: 'uppercase',
  },
  viewbtn: {
    position: 'absolute',
    bottom: SmartScreenBase.smBaseHeight * 40,
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  body: {
    flex: 1,
  },
  horizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SmartScreenBase.smBaseWidth * 50,
  },
  viewFilter: {
    borderWidth: 1,
    borderColor: Colors.BaseGreen,
    paddingHorizontal: SmartScreenBase.smBaseWidth * 25,
    paddingVertical: SmartScreenBase.smBaseHeight * 2,
    borderRadius: SmartScreenBase.smBaseWidth * 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconFilter: {
    width: SmartScreenBase.smBaseWidth * 45,
    height: SmartScreenBase.smBaseHeight * 24,
  },
  txtFilter: {
    fontSize: FontSize.size55Font,
    // ...FontWeight.Light,
    color: Colors.BaseGreen,
  },
  border: {
    borderRightWidth: 1,
    borderColor: Colors.BaseGreen,
    height: SmartScreenBase.smBaseHeight * 24,
    marginHorizontal: SmartScreenBase.smBaseWidth * 30,
  },
  viewItem: {
    marginTop: SmartScreenBase.smBaseHeight * 10,
    borderBottomWidth: 0.3,
    borderColor: Colors._777777,
    paddingVertical: SmartScreenBase.smBaseHeight * 10,
    paddingBottom: SmartScreenBase.smBaseHeight * 20,
  },
  itemImg: {
    width: SmartScreenBase.smBaseWidth * 178,
    height: SmartScreenBase.smBaseWidth * 163,
    borderRadius: SmartScreenBase.smBaseWidth * 20,
    marginRight: SmartScreenBase.smBaseWidth * 20,
  },
  footerItem: {
    position: 'absolute',
    bottom: SmartScreenBase.smBaseWidth * 20,
    right: 0,
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    // overflow: 'hidden',
    // marginTop: SmartScreenBase.smBaseHeight * 8
  },
  iconFavoite: {
    width: SmartScreenBase.smBaseWidth * 58,
    height: SmartScreenBase.smBaseWidth * 60,
    marginRight: SmartScreenBase.smBaseWidth * 20,
  },
  txtLevel: {
    color: Colors.White,
    ...FontWeight.Bold,
    fontSize: FontSize.size35Font,
  },
  txtTopic: {
    width: SmartScreenBase.smPercenWidth * 70,
    color: Colors._00A69C,
  },
  viewLevel: {
    paddingHorizontal: SmartScreenBase.smBaseWidth * 20,
    borderRadius: 5,
    // paddingVertical: SmartScreenBase.smPercenWidth * 0.35,
    height: FontSize.size55Font,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchFav: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    paddingTop: SmartScreenBase.smBaseWidth * 50,
    paddingLeft: SmartScreenBase.smBaseWidth * 50,
  },
  contentItem: {
    flexDirection: 'row',
  },
  viewFl: {
    marginVertical: SmartScreenBase.smBaseHeight * 10,
    paddingBottom: SmartScreenBase.smBaseHeight * 10,
    flex: 1,
  },
  lesson_topic: {
    ...FontWeight.Bold,
    lineHeight:
      Platform.OS === 'ios' ? FontSize.size50Font : FontSize.size55Font,
  },
  txtCurriculum: {width: SmartScreenBase.smPercenWidth * 75},
  txtTime: {
    width: SmartScreenBase.smPercenWidth * 75,
    fontSize: FontSize.size35Font,
  },
  txtStatus: {
    fontSize: FontSize.size40Font,
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: 6,
    color: '#84C241',
    borderColor: '#84C241',
    ...FontWeight.Bold,
    paddingTop: 6,
    paddingBottom: 3,
  },
  flex1: {flex: 1},
  btn: {
    alignSelf: 'center',
    marginVertical: SmartScreenBase.smBaseWidth * 60,
    marginTop: SmartScreenBase.smBaseWidth * 120,
  },
  txtEmpty: {
    alignSelf: 'center',
    marginVertical: SmartScreenBase.smBaseHeight * 15,
  },
  flatlist: {paddingHorizontal: SmartScreenBase.smBaseWidth * 50},
  loading: {
    paddingVertical: SmartScreenBase.smBaseHeight * 20,
  },
  imgLogo: {
    width: SmartScreenBase.smBaseWidth * 380,
    height: SmartScreenBase.smBaseHeight * 150,
    marginTop: SmartScreenBase.smPercenHeight * 3,
  },
  viewPoint: {
    width: SmartScreenBase.smBaseWidth * 83,
    height: SmartScreenBase.smBaseWidth * 83,
    backgroundColor: Colors._F70000,
    borderRadius: SmartScreenBase.smBaseWidth * 66,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  txtPoint: {
    fontSize: FontSize.size45Font,
    color: Colors.White,
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
});
