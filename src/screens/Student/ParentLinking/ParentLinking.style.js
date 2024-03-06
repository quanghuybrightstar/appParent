import { StyleSheet } from "react-native";
import SmartScreenBase from "../../../base/SmartScreenBase";
import { Colors } from "../../../styleApp/color";
import { FontSize, FontWeight } from "../../../styleApp/font";

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    textInput: {
        flex: 1,
        padding: 0,
        margin: 0,
        fontStyle: 'normal',
        ...FontWeight.Regular,
        color: Colors.Black
    },
    textInputBox: {
        flexDirection: 'row',
        borderWidth: 0.7,
        borderColor: Colors._389199,
        borderRadius: SmartScreenBase.smPercenWidth * 500,
        paddingVertical: SmartScreenBase.smPercenHeight * 1,
        paddingHorizontal: SmartScreenBase.smPercenWidth * 3,
        marginTop: SmartScreenBase.smPercenHeight * 3,
        alignItems: 'center'
    },
    title: {
        textAlign: 'center',
        ...FontWeight.Regular
    },
    subTitle: {
        textAlign: 'center',
        color: Colors._02283A,
        ...FontWeight.Bold,
    },
    errText: {
        color: Colors._E41E27,
        textAlign: 'center',
        ...FontWeight.Light,
        marginTop: SmartScreenBase.smBaseHeight * 30
    },
    errIcon: { width: SmartScreenBase.smBaseWidth * 55, height: SmartScreenBase.smBaseWidth * 55 },
    imgHeader: {
        height: SmartScreenBase.smPercenHeight * 30, zIndex: 1
    },
    gradient: {
        height: SmartScreenBase.smPercenHeight * 10, position: 'absolute', bottom: 0, zIndex: 2, left: 0, right: 0
    },
    body: {
        marginHorizontal: SmartScreenBase.smPercenWidth * 10, 
        height: SmartScreenBase.ratio <= 1.7 ? SmartScreenBase.smPercenHeight * 30 : SmartScreenBase.ratio < 2 ? SmartScreenBase.smPercenHeight * 40 : SmartScreenBase.smPercenHeight * 45,
        marginTop: SmartScreenBase.smBaseHeight * 60,
        display: 'flex',
        alignItems: 'center',
    },
    imgCode: {
        width: SmartScreenBase.smBaseWidth * 50, height: SmartScreenBase.smBaseWidth * 50, marginRight: SmartScreenBase.smBaseWidth * 20
    },
    btnLink: {
        // borderRadius: SmartScreenBase.smPercenWidth * 100,
        // paddingHorizontal: SmartScreenBase.smPercenWidth * 15,
        bottom: 30,
    },
    bottomBox: { alignItems: 'center' },
    messageStyle: {
        lineHeight: SmartScreenBase.smFontSize * 65,
        fontSize: FontSize.size55Font,
    },
    tileParent: {
        width: SmartScreenBase.smPercenWidth * 50,
    }
})