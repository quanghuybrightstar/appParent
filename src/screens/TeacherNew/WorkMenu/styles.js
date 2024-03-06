import { StyleSheet } from "react-native";
import SmartScreenBase from "../../../base/SmartScreenBase";
import { Colors } from "../../../styleApp/color";
import { FontSize, FontWeight } from "../../../styleApp/font";
import stylesApp from "../../../styleApp/stylesApp";

export const styles = StyleSheet.create({
    btnLogout: {
        paddingHorizontal: SmartScreenBase.smPercenWidth * 12,
        marginTop: SmartScreenBase.smPercenHeight * 5,
        alignSelf: 'center',
        paddingVertical: SmartScreenBase.smPercenHeight * 1.5,
        height: 'auto',
        width: 'auto',
        borderRadius: SmartScreenBase.smPercenWidth * 15,
        fontSize: FontSize.size60Font,
        ...FontWeight.Bold
    },
    loading: {
        flex: 1, position: 'absolute', zIndex: 100000,
    },
    viewOption: { flexDirection: 'row', marginTop: SmartScreenBase.smPercenHeight * 7, flexWrap: 'wrap', alignItems: "center", justifyContent: "center" },
    spacing: { marginVertical: SmartScreenBase.smPercenHeight * 3 },
    itemContainer: {
        marginHorizontal: SmartScreenBase.smPercenWidth * 10,
        paddingLeft: SmartScreenBase.smPercenWidth * 5,
        justifyContent: "center",
    },
    textContainer: {
        backgroundColor: Colors.White,
        borderRadius: SmartScreenBase.smPercenHeight * 3,
        width: '100%',
        height: SmartScreenBase.smPercenHeight * 13,
        paddingLeft: SmartScreenBase.smPercenWidth * 13,
        justifyContent: 'center',
        ...stylesApp.shadow,
    },
    imageContainer: {
        position: "absolute", left: 0,
        ...stylesApp.shadow
    },
    image: {
        width: SmartScreenBase.smPercenWidth * 16,
        height: SmartScreenBase.smPercenWidth * 16,
    },
    text: {
        fontSize: FontSize.size50Font,
        ...FontWeight.Bold,
        width: '85%',
        textAlign: "center"
    }
})