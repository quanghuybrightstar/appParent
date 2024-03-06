import { StyleSheet } from "react-native";
import SmartScreenBase from "../../../../base/SmartScreenBase";
import { Colors } from "../../../../styleApp/color";
import { FontSize, FontWeight } from "../../../../styleApp/font";

export const styles = StyleSheet.create({
  viewItem: {
    backgroundColor: Colors.White,
    borderRadius: SmartScreenBase.smBaseWidth * 30,
    marginTop: SmartScreenBase.smBaseHeight * 20,
    paddingVertical: SmartScreenBase.smBaseHeight * 10,
    paddingLeft: SmartScreenBase.smPercenWidth * 10,
    marginLeft: SmartScreenBase.smPercenWidth * 10,
    paddingRight: SmartScreenBase.smBaseWidth * 30
  },
  horizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  iconCheck: {
    width: SmartScreenBase.smBaseWidth * 51,
    height: SmartScreenBase.smBaseWidth * 53,
  },
  txtName: {
    flex: 1,
    marginRight: SmartScreenBase.smBaseWidth * 15
  },
  txtDate: {
    fontSize: FontSize.size35Font,
    marginVertical: SmartScreenBase.smBaseHeight * 5
  },
  txtSkill: {
    color: Colors._00A79D,
    fontSize: FontSize.size35Font,
  },
  imgType: {
    width: SmartScreenBase.smBaseWidth * 182,
    height: SmartScreenBase.smBaseWidth * 182,
    position: 'absolute',
    left: - SmartScreenBase.smBaseHeight * 50,
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
    // paddingVertical: SmartScreenBase.smBaseWidth * 30,
    borderRadius: SmartScreenBase.smBaseWidth * 65,
    marginBottom: SmartScreenBase.smPercenHeight * 2
  },
  txtAssign: {
    color: Colors.White,
    fontSize: FontSize.size55Font,
    ...FontWeight.Light,

  },
  banner: {
    alignSelf: 'center',
    marginTop: SmartScreenBase.smPercenHeight * 5,
    marginBottom: SmartScreenBase.smBaseHeight * 40,
    width: SmartScreenBase.smPercenWidth * 90,
    height: SmartScreenBase.smPercenHeight * 45
  },
  content1: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: FontSize.size55Font,
    width: SmartScreenBase.smPercenWidth * 75
  },
  viewbtn: { position: 'absolute', bottom: 30, alignSelf: 'center' },
  vieItem: { justifyContent: 'center' },
  txtHeader: { fontSize: FontSize.size60Font },
  flex1: { flex: 1 },
  fontWeight: { ...FontWeight.Bold },
  btnEmpty: {
    position: 'absolute',
  },
  alignSeft: {
    alignSelf: 'center',
    bottom: 30
  },
  content2: {
    textTransform: 'lowercase',
    fontSize: FontSize.size55Font,
  },
  viewEmpty: {
    alignSelf: 'center',
    marginTop: SmartScreenBase.smBaseHeight * 35
  }

})