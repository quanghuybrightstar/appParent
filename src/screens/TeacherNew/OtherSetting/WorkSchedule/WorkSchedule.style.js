import { Platform, StyleSheet } from "react-native";
import SmartScreenBase from "../../../../base/SmartScreenBase";
import { Colors } from "../../../../styleApp/color";
import { FontSize, FontWeight } from "../../../../styleApp/font";
import FontBase from "../../../../base/FontBase";

export const styles = StyleSheet.create({
    viewYear: {
        alignSelf: 'center',
        marginVertical: SmartScreenBase.smBaseHeight * 30,
        paddingVertical: SmartScreenBase.smBaseHeight * 20,
        borderRadius: SmartScreenBase.smBaseWidth * 70,
        width: SmartScreenBase.smPercenWidth * 60,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // opacity: 0.3

    },
    iconControl: {
        width: SmartScreenBase.smBaseWidth * 21,
        height: SmartScreenBase.smBaseWidth * 41,
        marginHorizontal: SmartScreenBase.smBaseWidth * 55
    },
    txtYear: {
        fontSize: FontSize.size55Font,
        fontFamily: FontBase.MyriadPro_Bold,
        color: Colors.White,
    },
    body: {
        flex: 1,
        marginHorizontal: SmartScreenBase.smBaseWidth * 30,
        marginBottom: 30,
        borderRadius: 10
    },
    row: {
        flexDirection: 'row'
    },
    viewMonth: {
        borderRadius: SmartScreenBase.smBaseWidth * 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.White,
        width: SmartScreenBase.smPercenWidth * 30,
        marginRight: SmartScreenBase.smBaseWidth * 30,
    },
    viewContent: {
        borderRadius: SmartScreenBase.smBaseWidth * 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.White,
        flex: 1,
        paddingHorizontal: SmartScreenBase.smBaseWidth * 30,
        paddingVertical: SmartScreenBase.smBaseWidth * 25,
    },
    txtMonth: {
        fontSize: FontSize.size55Font,
        ...FontWeight.Bold,
    },
    btnUpdate: {
        alignSelf: 'flex-end'
    },
    txtUpdate: {
        textDecorationLine: 'underline',
        color: Colors._00A79D,
        ...FontWeight.Bold,
        // fontStyle: 'italic',
        marginTop: SmartScreenBase.smBaseWidth * 15

    },
    flex1: { flex: 1 },
    viewHeader: { marginHorizontal: SmartScreenBase.smBaseWidth * 32, marginVertical: 5 },
    backgroundColor: { backgroundColor: Colors._00A79D, },
    flatlist: { marginHorizontal: SmartScreenBase.smBaseWidth * 32 }
})