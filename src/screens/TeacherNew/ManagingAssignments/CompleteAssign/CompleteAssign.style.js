import { Platform, StyleSheet } from "react-native";
import SmartScreenBase from "../../../../base/SmartScreenBase";
import { Colors } from "../../../../styleApp/color";
import { FontSize, FontWeight } from "../../../../styleApp/font";

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentItem: {
    flexDirection: 'row',
  },
  viewItem: {
    marginTop: SmartScreenBase.smBaseHeight * 10,
    borderBottomWidth: 1,
    borderColor: Colors._777777,
    paddingVertical: SmartScreenBase.smBaseHeight * 10
  },
  itemImg: {
    width: SmartScreenBase.smBaseWidth * 178,
    height: SmartScreenBase.smBaseWidth * 163,
    borderRadius: SmartScreenBase.smBaseWidth * 20,
    marginRight: SmartScreenBase.smBaseWidth * 20,
  },
  footerItem: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  footerItemParent: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    top: -6,
  },
  iconFavoite: {
    width: SmartScreenBase.smBaseWidth * 58,
    height: SmartScreenBase.smBaseWidth * 60,
    marginRight: SmartScreenBase.smBaseWidth * 10
  },
  txtLevel: {
    color: Colors.White,
    ...FontWeight.Bold,
    fontSize: FontSize.size35Font
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
    justifyContent: 'center'
  },
  iconFile: {
    width: SmartScreenBase.smBaseWidth * 62,
    height: SmartScreenBase.smBaseWidth * 62,
    marginRight: SmartScreenBase.smBaseWidth * 30
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SmartScreenBase.smBaseHeight * 10
  },
  txtfile: {
    color: Colors._F16522,
    fontSize: FontSize.size40Font,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginHorizontal: SmartScreenBase.smPercenWidth * 4,
    marginVertical: SmartScreenBase.smBaseHeight * 10
  },
  btnAssign: {
    // flex: 1,
    // paddingHorizontal: SmartScreenBase.smBaseWidth * 178,
    width: SmartScreenBase.smPercenWidth * 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SmartScreenBase.smBaseWidth * 65,
    marginBottom: SmartScreenBase.smPercenHeight * 2
  },
  txtAssign: {
    color: Colors.White,
    fontSize: FontSize.size55Font,
    ...FontWeight.SemiBold,

  },
  viewModal: {
    flex: 0.25,
    marginHorizontal: SmartScreenBase.smPercenWidth * 5,
    backgroundColor: Colors.White,
    borderRadius: SmartScreenBase.smBaseWidth * 30,
    justifyContent: 'center',
    paddingHorizontal: SmartScreenBase.smBaseHeight * 10,
    paddingVertical: SmartScreenBase.smBaseHeight * 20
  },
  contentModal: {
    color: Colors._424143,
    fontSize: FontSize.size55Font,
    textAlign: 'center',
    lineHeight: 24,
    width: SmartScreenBase.smPercenWidth * 65,
    alignSelf: 'center'
  },
  btnDelete: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SmartScreenBase.smBaseWidth * 65,
    marginHorizontal: SmartScreenBase.smBaseWidth * 24
  },
  btnCancel: {
    width: SmartScreenBase.smPercenWidth * 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SmartScreenBase.smBaseWidth * 15,
    borderRadius: SmartScreenBase.smBaseWidth * 65,
    borderWidth: 1,
    borderColor: Colors._00B9B6,
    marginHorizontal: SmartScreenBase.smBaseWidth * 24
  },
  horizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txtCancel: {
    color: Colors._00B9B6,
    fontSize: FontSize.size55Font,
    fontWeight: '500',

  },
  lesson_topic: { lineHeight: FontSize.size50Font, ...FontWeight.Bold, },
  txtCurriculum: { fontSize: FontSize.size40Font, ...FontWeight.Light, flex: 1 },
  txtHeader: { fontSize: FontSize.size60Font },
  paddingHorizontal35: { paddingHorizontal: SmartScreenBase.smBaseWidth * 35 },
  viewBtn: {
    alignItems: 'center',
    marginHorizontal: SmartScreenBase.smPercenWidth * 4,
    marginVertical: SmartScreenBase.smBaseHeight * 10
  },
  viewmodal: {
    margin: 0,
    justifyContent: 'center'
  },
  btnModal: { marginTop: SmartScreenBase.smPercenHeight * 5, justifyContent: 'center' },
  viewEmpty: {
    marginTop: SmartScreenBase.smBaseHeight * 35,
    alignSelf: 'center'
  }
})
