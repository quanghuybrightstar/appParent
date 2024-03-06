import { Platform, StyleSheet } from "react-native";
import SmartScreenBase from "../../../../base/SmartScreenBase";
import { Colors } from "../../../../styleApp/color";

export const styles = StyleSheet.create({
  rightHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.White,
    borderRadius: SmartScreenBase.smBaseWidth * 100,
    paddingHorizontal: SmartScreenBase.smBaseWidth * 100,
    paddingVertical: SmartScreenBase.smBaseWidth * 30,
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
    marginBottom: Platform.OS === 'ios' ? -SmartScreenBase.smBaseHeight * 5 : 0,
    color: Colors.White
  },
  flex1: { flex: 1 }
})