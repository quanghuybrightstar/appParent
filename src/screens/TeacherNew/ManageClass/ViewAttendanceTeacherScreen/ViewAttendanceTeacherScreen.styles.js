import { StyleSheet } from "react-native";
import FontBase from "../../../../base/FontBase";
import SmartScreenBase from "../../../../base/SmartScreenBase";
import { Colors } from "../../../../styleApp/color";
import { FontSize, FontWeight } from "../../../../styleApp/font";
import { styles as baseStyles } from '../AttendancePaperTeacherScreen/AttendancePaperTeacherScreen.styles'

export const styles = StyleSheet.create({
    ...baseStyles,
    statusBox: {
        height: SmartScreenBase.smBaseHeight * 45,
        borderRadius: SmartScreenBase.smBaseWidth * 90,
        justifyContent: 'center',
        alignItems: 'center',
        width: SmartScreenBase.smBaseWidth * 340,
        alignSelf: 'flex-end',
        marginTop: SmartScreenBase.smBaseHeight * 10
        // overflow: 'hidden'
    },
    statusText: {
        color: Colors.White,
        // ...FontWeight.Bold,
        fontSize: FontSize.size40Font,
        fontFamily: FontBase.MyriadPro_LightIt
    },
    tickIcon: {
        width: SmartScreenBase.smBaseWidth * 50,
        height: SmartScreenBase.smBaseWidth * 50,
        marginTop: -SmartScreenBase.smBaseHeight * 12
    },
    successText: {
        color: Colors._84C241,
        fontSize: FontSize.size35Font,
        ...FontWeight.SemiBold,
        marginLeft: SmartScreenBase.smBaseWidth * 10
    }
})