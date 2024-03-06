import { StyleSheet } from "react-native";
import SmartScreenBase from "../../../../base/SmartScreenBase";
import { Colors } from "../../../../styleApp/color";
import { FontSize, FontWeight } from "../../../../styleApp/font";
import { styles as baseStyles } from '../AttendancePaperTeacherScreen/AttendancePaperTeacherScreen.styles'

export const styles = StyleSheet.create({
    ...baseStyles,
    tickIcon: {
        width: SmartScreenBase.smBaseWidth * 45,
        height: SmartScreenBase.smBaseWidth * 45,
    },
    successText: {
        color: Colors._84C241,
        fontSize: FontSize.size35Font,
        ...FontWeight.SemiBold,
        marginLeft: SmartScreenBase.smBaseWidth * 10
    },
    background: { backgroundColor: Colors._F3FFFF },
    padding0: { padding: 0 },
    viewModal: {
        margin: 0,
        backgroundColor: Colors._00000090
    },
    marginBotton: { marginBottom: 15 },
    viewPopup: { marginVertical: 0, paddingVertical: 0 },
    txtMessage: { paddingVertical: 0 },
    viewDrop: {
        width: SmartScreenBase.smBaseWidth * 380
    }
})