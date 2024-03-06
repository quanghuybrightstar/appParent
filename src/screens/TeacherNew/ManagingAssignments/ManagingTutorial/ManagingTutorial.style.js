import { StyleSheet, Platform } from "react-native";
import SmartScreenBase from "../../../../base/SmartScreenBase";
import { Colors } from "../../../../styleApp/color";
import { FontSize, FontWeight } from "../../../../styleApp/font";

export const styles = StyleSheet.create({
  body: {
    marginTop: SmartScreenBase.smBaseHeight * 35,
    paddingHorizontal: SmartScreenBase.smBaseWidth * 50,
    flex: 1
  },
  nameLesson: {
    fontSize: FontSize.size55Font,
    ...FontWeight.SemiBold,
    color: Colors._00A69C
  },
  txtTimeWork: {
    marginTop: SmartScreenBase.smBaseHeight * 25,
    marginBottom: SmartScreenBase.smBaseHeight * 10,
    fontSize: FontSize.size55Font,
    ...FontWeight.Bold
  },
  txtStartDate: {
    fontSize: FontSize.size55Font,
    alignSelf: 'center'
  },
  viewDate: {
    paddingVertical: SmartScreenBase.smBaseHeight * 35,
    width: SmartScreenBase.smPercenWidth * 49,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SmartScreenBase.smBaseWidth * 30
  },
  iconRight: {
    width: SmartScreenBase.smBaseWidth * 52,
    height: SmartScreenBase.smBaseWidth * 52,
    marginTop: SmartScreenBase.smBaseWidth * 30,
    marginHorizontal: SmartScreenBase.smBaseWidth * 30,
  },
  date: {
    fontSize: FontSize.size55Font
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  txtFileTutorial: {
    fontSize: FontSize.size55Font,
    ...FontWeight.Bold
  },
  txtAddTutorial: {
    textDecorationLine: 'underline',
    fontSize: FontSize.size50Font,
    // fontStyle: 'italic',
    ...FontWeight.Bold
  },
  iconFile: {
    width: SmartScreenBase.smBaseWidth * 62,
    height: SmartScreenBase.smBaseWidth * 62,
    marginRight: SmartScreenBase.smBaseWidth * 30
  },
  viewItem: {
    marginTop: SmartScreenBase.smBaseHeight * 10,
    marginHorizontal: SmartScreenBase.smPercenWidth * 5
  },
  nameItem: {
    flex: 1,
    paddingRight: SmartScreenBase.smBaseWidth * 50,
    fontSize: FontSize.size50Font,
    ...FontWeight.LightItalic,
  },
  iconDel: {
    width: SmartScreenBase.smBaseWidth * 47,
    height: SmartScreenBase.smBaseWidth * 59,
  },
  btnDelete: {
    width: SmartScreenBase.smPercenWidth * 37,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SmartScreenBase.smBaseWidth * 15,
    borderRadius: SmartScreenBase.smBaseWidth * 65,
  },
  txtAssign: {
    color: Colors.White,
    fontSize: FontSize.size55Font,
    ...FontWeight.Light,

  },
  errText: {
    color: Colors._E41E27,
    marginTop: SmartScreenBase.smBaseWidth * 25,
    alignSelf: 'center',
    width: '100%',
    fontSize: FontSize.size40Font
  },
  txtHeader: { fontSize: FontSize.size60Font },
  flex1: { flex: 1 },
  marginBottom10: { marginBottom: 10 },
  width49: {
    width: SmartScreenBase.smPercenWidth * 49,
    alignItems: 'flex-start',
  },
  borderRadius30: { borderRadius: SmartScreenBase.smBaseWidth * 30 },
  marginTop25: { marginTop: SmartScreenBase.smBaseHeight * 35 }
})