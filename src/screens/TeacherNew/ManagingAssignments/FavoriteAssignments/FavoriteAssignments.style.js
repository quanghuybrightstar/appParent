import { Platform, StyleSheet } from "react-native";
import SmartScreenBase from "../../../../base/SmartScreenBase";
import { Colors } from "../../../../styleApp/color";
import { FontSize, FontWeight } from "../../../../styleApp/font";
import FontBase from "../../../../base/FontBase";

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentItem: {
    flexDirection: 'row',
  },
  txtEmptyContent: {
    fontFamily: FontBase.MyriadPro_Regular,
    textAlign: 'center',
    marginVertical: 50,
    fontSize: FontSize.size50Font
},
  favTouch: {
    paddingLeft: SmartScreenBase.smBaseWidth * 50,
    paddingVertical: SmartScreenBase.smBaseWidth * 50,
  },
  viewItem: {
    // marginTop: SmartScreenBase.smBaseHeight * 10,
    borderBottomWidth: 1,
    borderColor: Colors._777777,
    paddingVertical: SmartScreenBase.smBaseHeight * 15
  },
  itemImg: {
    width: SmartScreenBase.smBaseWidth * 178,
    height: SmartScreenBase.smBaseWidth * 163,
    borderRadius: SmartScreenBase.smBaseWidth * 20,
    marginRight: SmartScreenBase.smBaseWidth * 20,
  },
  footerItem: {
    position: 'absolute',
    bottom: -SmartScreenBase.smBaseWidth * 50, right: 0,
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconFavoite: {
    width: SmartScreenBase.smBaseWidth * 58,
    height: SmartScreenBase.smBaseWidth * 60,
    marginRight: SmartScreenBase.smBaseWidth * 20
  },
  btnAssign: {
    // flex: 1,
    paddingHorizontal: SmartScreenBase.smBaseWidth * 178,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SmartScreenBase.smBaseWidth * 30,
    borderRadius: SmartScreenBase.smBaseWidth * 65,
    marginBottom: SmartScreenBase.smPercenHeight * 2
  },
  txtLevel: {
    color: Colors.White,
    ...FontWeight.Bold,
    fontSize: FontSize.size35Font
  },
  txtTopic: {
    width: SmartScreenBase.smPercenWidth * 70,
    color: Colors._00A69C
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
    justifyContent: 'center'
  },
  horizontal: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  viewNumberExercise: {
    backgroundColor: Colors._FAAF40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SmartScreenBase.smBaseWidth * 30,
    borderRadius: SmartScreenBase.smBaseWidth * 20,
    paddingVertical: SmartScreenBase.smBaseWidth * 5,


  },
  txtNumber: {
    fontSize: FontSize.size35Font,
    color: Colors.White
  },
  txtRightHeader: {
    color: Colors.BaseGreen,
    marginBottom: Platform.OS === 'ios' ? -SmartScreenBase.smBaseHeight * 5 : 0
  },
  viewNumberAssign: {
    backgroundColor: Colors._F70000,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SmartScreenBase.smBaseWidth * 80,
    height: SmartScreenBase.smBaseWidth * 80,
    width: SmartScreenBase.smBaseWidth * 80,
    position: 'absolute',
    top: -SmartScreenBase.smBaseWidth * 5,
    right: -SmartScreenBase.smBaseWidth * 5,
  },
  txtNumberAssign: {
    marginBottom: Platform.OS === 'ios' ? -SmartScreenBase.smBaseHeight * 6 : 0,
    color: Colors.White
  },
  rightHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.White,
    borderRadius: SmartScreenBase.smBaseWidth * 100,
    paddingHorizontal: SmartScreenBase.smBaseWidth * 100,
    paddingVertical: SmartScreenBase.smBaseWidth * 30,
  },
  lesson_topic: { ...FontWeight.Bold, lineHeight: FontSize.size50Font },
  txtCurriculum: { color: Colors.Black },
  viewAssign: { marginTop: SmartScreenBase.smBaseHeight * 10 },
  txtHeader: { textTransform: 'capitalize', fontSize: FontSize.size60Font },
  flex1: { flex: 1 },
  flatlist: { paddingHorizontal: SmartScreenBase.smBaseWidth * 35, paddingBottom: SmartScreenBase.smBaseWidth * 35 },
  footerFlatlist: { marginVertical: 15 }
})