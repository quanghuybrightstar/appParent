import { Platform, StyleSheet } from "react-native";
import SmartScreenBase from "../../../../base/SmartScreenBase";
import { Colors } from "../../../../styleApp/color";
import { FontSize, FontWeight } from "../../../../styleApp/font";
import FontBase from "../../../../base/FontBase";

export const styles = StyleSheet.create({
  body: {
    paddingHorizontal: SmartScreenBase.smBaseWidth * 20,
    paddingTop: SmartScreenBase.smBaseHeight * 20,
    // flexGrow: 1
  },
  viewStudent: {
    backgroundColor: Colors.White,
    borderRadius: SmartScreenBase.smBaseWidth * 43,
    padding: SmartScreenBase.smBaseWidth * 35,
  },
  txtChooseStudent: {
    fontSize: FontSize.size55Font,
    ...FontWeight.SemiBold
  },
  txtRemind: {
    fontSize: FontSize.size55Font,
  },
  errText: {
    color: Colors._E41E27,
    marginTop: SmartScreenBase.smBaseWidth * 25,
    alignSelf: 'center',
    width: '90%',
    fontSize: FontSize.size40Font
  },
  txtStartAfter: {
    fontSize: FontSize.size55Font,
    width: SmartScreenBase.smPercenWidth * 90
  },
  remindTextInput: { fontSize: FontSize.size45Font, lineHeight: FontSize.size45Font + 2, height: SmartScreenBase.smPercenHeight * 10, fontFamily: FontBase.MyriadPro_Regular, color: Colors.Black },
  viewChooseAll: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: Colors._559BB1,
    paddingBottom: SmartScreenBase.smBaseHeight * 10
  },
  iconCheck: {
    width: SmartScreenBase.smBaseWidth * 52,
    height: SmartScreenBase.smBaseWidth * 54,
    marginLeft: SmartScreenBase.smBaseWidth * 20,
    marginBottom: Platform.OS === 'ios' ? 6 : 0
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  zero: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SmartScreenBase.smPercenWidth * 10
  },
  zeroText: {
    width: SmartScreenBase.smPercenWidth * 80,
    fontFamily: FontBase.MyriadPro_Regular, 
    fontSize: SmartScreenBase.smFontSize * 55, 
    textAlign: 'center'
  },
  viewItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: SmartScreenBase.smBaseHeight * 20
  },
  txtStartDate: {
    fontSize: FontSize.size55Font,
    alignSelf: 'center',
    ...FontWeight.Bold
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
  viewStartAfter: {
    marginVertical: SmartScreenBase.smBaseHeight * 25, flexDirection: 'row'
  },
  btnAssign: {
    // flex: 1,
    alignSelf: 'center',
    marginBottom: SmartScreenBase.smPercenHeight * 2
  },
  viewBotCv: {
    height: SmartScreenBase.smPercenWidth * 20
  },
  btnDone: {
    alignItems: 'center',
    width: '100%',
    backgroundColor: Colors._F3FFFF
  },
  viewnote: {
    backgroundColor: Colors.White,
    borderRadius: SmartScreenBase.smBaseWidth * 25,
    padding: SmartScreenBase.smBaseWidth * 15,
    marginHorizontal: SmartScreenBase.smBaseWidth * 10
  },
  ipNumberDate: {
    backgroundColor: Colors.White,
    borderRadius: SmartScreenBase.smBaseWidth * 20,
    marginHorizontal: SmartScreenBase.smBaseWidth * 14,
    paddingHorizontal: SmartScreenBase.smBaseWidth * 15,
    paddingVertical: SmartScreenBase.smBaseWidth * 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SmartScreenBase.smBaseHeight * 7
  },
  shadow: {
    shadowColor: Colors.Black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  numberDate: {
    ...FontWeight.Regular,
    width: SmartScreenBase.smPercenWidth * 20,
    fontSize: FontSize.size55Font,
    textAlign: 'center',
    color: Colors.Black
  },
  errBorder: {
    borderWidth: 1,
    borderColor: Colors._E41E27
  },
  numberDateAndroid: {
    color: Colors.Black,
    ...FontWeight.Regular,
    width: SmartScreenBase.smPercenWidth * 20,
    fontSize: FontSize.size55Font,
    textAlign: 'center',
    height: SmartScreenBase.smBaseWidth * 60,
    margin: 0, padding: 0
  },
  flex1: { flex: 1 },
  flexGrow: { flexGrow: 1 },
  marginVertical10: { marginVertical: 10 },
  marginRight30: { marginRight: SmartScreenBase.smBaseWidth * 30 },
  marginLeft20: { marginLeft: SmartScreenBase.smBaseWidth * 20 },
  marginBottom20: { marginBottom: SmartScreenBase.smBaseHeight * 20, },
  marginTop10: { marginTop: SmartScreenBase.smBaseHeight * 20, alignSelf: 'center' },
  marginBottom10: { marginBottom: 10 },
  width49: { width: SmartScreenBase.smPercenWidth * 49 },
  borderRadius30: { borderRadius: SmartScreenBase.smBaseWidth * 30 }
})
