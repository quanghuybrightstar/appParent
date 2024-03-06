import { Platform, StyleSheet } from "react-native";
import SmartScreenBase from "../../../../base/SmartScreenBase";
import { Colors } from "../../../../styleApp/color";
import { FontWeight } from "../../../../styleApp/font";

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    textInput: {
        flex: 1,
        // height: Platform.OS === 'ios' ? SmartScreenBase.smBaseHeight * 40 : SmartScreenBase.smBaseHeight * 60,
        color: Colors.Black,
        ...FontWeight.Regular,
        margin: 0,
        fontSize: SmartScreenBase.smFontSize*48,
        padding: Platform.OS === 'ios' ? SmartScreenBase.smBaseWidth * 15 : 0,
    },
    textInputBox: {
        flexDirection: 'row',
        borderWidth: 0.7,
        borderColor: Colors._389199,
        borderRadius: SmartScreenBase.smBaseWidth * 500,
        paddingVertical: SmartScreenBase.smBaseHeight * 5,
        paddingHorizontal: SmartScreenBase.smBaseWidth * 30,
        marginTop: SmartScreenBase.smBaseHeight * 20,
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
        ...FontWeight.Bold
    },
    subTitle: {
        textAlign: 'center'
    },
    errText: {
        color: Colors._E41E27,
        textAlign: 'center',
        fontWeight: '400',
        marginTop: SmartScreenBase.smBaseHeight * 30
    },
    imgHeader: {
        height: SmartScreenBase.smPercenWidth * 100 * (839/1121), zIndex: 1,
        width: SmartScreenBase.smPercenWidth * 100,
        top: -5
    },
    gradient: {
        height: SmartScreenBase.smPercenWidth * 10, position: 'absolute', bottom: SmartScreenBase.smPercenWidth * 5, zIndex: 2, left: 0, right: 0
    },
    body: {
        marginHorizontal: SmartScreenBase.smPercenWidth * 10,
        height: SmartScreenBase.smPercenHeight * 25,
        marginTop: SmartScreenBase.smBaseHeight * 0
    },
    imgCode: {
        width: 20, height: 20, marginRight: SmartScreenBase.smBaseWidth * 20
    },
    btnLink: {
        // position: 'absolute',
        bottom: 30,
        // alignItems: 'center'
    },
    flex1: { flex: 1 },
    flexGrow1: { flexGrow: 1 },
    imgcanhbao: { width: 20, height: 20 }
})