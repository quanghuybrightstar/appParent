import { Platform, StyleSheet } from "react-native";
import SmartScreenBase from "../../../base/SmartScreenBase";
import { Colors } from "../../../styleApp/color";
import { FontSize, FontWeight } from "../../../styleApp/font";
import stylesApp from "../../../styleApp/stylesApp";
import FontBase from "../../../base/FontBase";

export
    const styles = StyleSheet.create({
        rightHeaderComponent: {
            justifyContent: 'center',
            paddingHorizontal: SmartScreenBase.smPercenWidth * 5,
            paddingVertical: SmartScreenBase.smPercenWidth * 1.5,
            borderRadius: SmartScreenBase.smPercenWidth * 5,
            overflow: "hidden",
        },
        italic: {
            ...FontWeight.LightItalic
        },
        title: {
            marginTop: SmartScreenBase.smPercenWidth * 5,
            fontSize: FontSize.size55Font,
            ...FontWeight.Bold,
            marginLeft: SmartScreenBase.smPercenWidth * 5,
            flex: 1,
        },
        createPlanText: {
            color: Colors.BaseGreen
        },
        timeSelect: {
            flexDirection: 'row',
            backgroundColor: Colors._A0F1E7, borderRadius: 7,
            height: SmartScreenBase.smBaseHeight * 90,
            marginHorizontal: SmartScreenBase.smPercenWidth * 5,
            marginTop: SmartScreenBase.smPercenWidth * 2,
        },
        dateText: {
            ...FontWeight.Bold,
            fontSize: FontSize.size65Font,
        },
        dateComp: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors._4DE8D6, borderRadius: SmartScreenBase.smBaseWidth * 20 },
        inputContainer: {
            // marginTop: 15
        },
        titleInput: {
            marginTop: SmartScreenBase.smPercenWidth * 2,
            backgroundColor: Colors.White,
            marginHorizontal: SmartScreenBase.smPercenWidth * 5,
            borderWidth: 1, borderColor: Colors._ccc,
            borderRadius: 25, paddingHorizontal: SmartScreenBase.smBaseWidth * 30,
            height: SmartScreenBase.smBaseHeight * 70,
            fontStyle: 'normal',
            fontSize: FontSize.size50Font,
            fontFamily: FontBase.MyriadPro_Regular,
            color: Colors.Black
        },
        required: {
            color: Colors.Red
        },
        paddingHorizontal: {
            paddingHorizontal: SmartScreenBase.smPercenWidth * 5,
        },
        remindContainer: {
            marginTop: SmartScreenBase.smPercenWidth * 2,
            marginHorizontal: SmartScreenBase.smPercenWidth * 5,
            flexDirection: 'row', alignItems: 'center', paddingRight: SmartScreenBase.smBaseWidth15,
        },
        remindInput: {
            color: Colors.Black,
            borderWidth: 1,
            borderColor: Colors._ccc, borderRadius: SmartScreenBase.smBaseWidth * 100,
            fontStyle: 'normal',
            backgroundColor: Colors.White,
            fontFamily: FontBase.MyriadPro_Regular,
            paddingHorizontal: SmartScreenBase.smBaseWidth * 30,
            height: SmartScreenBase.smBaseWidth * 90,
            minWidth: SmartScreenBase.smBaseWidth * 250, textAlign: 'center',
            fontSize: SmartScreenBase.smFontSize*50,
            padding: 0
        },
        repeatTypeText: {
            fontSize: FontSize.size55Font,
            ...FontWeight.Regular,
            marginLeft: SmartScreenBase.smPercenWidth * 5,
        },
        notyText: {marginLeft: SmartScreenBase.smPercenWidth*14, marginTop: SmartScreenBase.smPercenWidth*2, textAlign: 'left', width: SmartScreenBase.smPercenWidth*82, fontFamily: FontBase.MyriadPro_It },
        validToContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: SmartScreenBase.smPercenWidth * 5,
            paddingHorizontal: SmartScreenBase.smPercenWidth * 5,
            alignItems: "center",
        },
        validToSelectorContainer: {
            flexDirection: 'row',
            alignItems: 'center'
        },
        validToText: {
            fontSize: FontSize.size55Font,
            ...FontWeight.Regular,
        },
        validToSelectorText: {
            color: Colors.BaseGreen,
        },
        repeatContainer: {
            flexDirection: 'row',
            marginTop: SmartScreenBase.smPercenWidth * 5,
            alignItems: "center",
            paddingHorizontal: SmartScreenBase.smPercenWidth * 10,
        },
        btnLogout: {
            marginVertical: SmartScreenBase.smPercenHeight * 1.5,
            // paddingHorizontal: SmartScreenBase.smPercenWidth * 20,
            alignSelf: 'center',

            // paddingVertical: SmartScreenBase.smPercenHeight * 1.5,
            // height: 'auto',
            // width: 'auto',
            // borderRadius: SmartScreenBase.smPercenWidth * 15,
            // fontSize: FontSize.size60Font,
            // ...FontWeight.Bold
        },
        viewBotCv: {
            height: SmartScreenBase.smPercenWidth * 20
        },
        btnDone: {
            alignItems: 'center',
            width: '100%',
            paddingVertical: SmartScreenBase.smBaseWidth * 60
        },
        dateContainer: {
            flex: 1,
            paddingHorizontal: SmartScreenBase.smPercenWidth * 5,
            backgroundColor: Colors._00000090,
            justifyContent: 'center'
        },
        container: {
            backgroundColor: Colors._00000090,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: SmartScreenBase.smPercenWidth * 5
        },
        content: {
            backgroundColor: Colors.White,
            width: '100%',
            borderRadius: SmartScreenBase.smPercenWidth * 5,
            paddingVertical: SmartScreenBase.smPercenHeight * 5,
            paddingHorizontal: SmartScreenBase.smPercenWidth * 10,
            alignItems: "center",
            justifyContent: 'space-evenly'
        },
        message: {
            textAlign: 'center',
            width: "100%",
            color: Colors.Black,
            fontSize: FontSize.size55Font,
            paddingVertical: SmartScreenBase.smPercenHeight * 3,
        },
        btnContainer: {
            flexDirection: 'row', alignItems: "center", justifyContent: 'space-between',
            marginTop: SmartScreenBase.smPercenWidth * 7,
        },
        btnCancel: {
            marginRight: SmartScreenBase.smPercenWidth * 5,
        },
        cancelText: { color: Colors.BaseGreen },
        checkContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
        },
        btnWrapper: {
            width: SmartScreenBase.smBaseWidth * 65,
            height: SmartScreenBase.smBaseWidth * 65,
            borderRadius: SmartScreenBase.smBaseWidth * 100,
            padding: 2,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: Colors.Black
        },
        checked: {
            backgroundColor: Colors._84C241,
            width: SmartScreenBase.smBaseWidth * 50,
            height: SmartScreenBase.smBaseWidth * 50,
            borderRadius: SmartScreenBase.smBaseWidth * 100,
        },
        text: {
            flex: 1,
            marginLeft: SmartScreenBase.smBaseWidth * 30
        },
        contentBtn: {
            width: '100%',
            paddingHorizontal: SmartScreenBase.smPercenWidth * 5,
            alignItems: 'center',
        },
        flex1: { flex: 1 },
        flexGrow: { flexGrow: 1 },
        drop: {
            borderWidth: 1
        },
        padding10: { paddingHorizontal: SmartScreenBase.smBaseWidth * 30 },
        paddingHorizontal10: { paddingHorizontal: SmartScreenBase.smBaseWidth * 30 },
        marginTop10: { marginTop: SmartScreenBase.smBaseWidth * 30 },
        ratioWrapper: {
            borderColor: Colors.DarkGray,
            borderWidth: 1,
            width: SmartScreenBase.smBaseWidth * 50,
            height: SmartScreenBase.smBaseWidth * 50,
            borderRadius: SmartScreenBase.smBaseWidth * 200,
            alignItems: 'center',
            justifyContent: 'center'
        },
        selectedRatio: {
            width: SmartScreenBase.smBaseWidth * 50 - 5,
            alignSelf: 'center',
            height: SmartScreenBase.smBaseWidth * 50 - 5,
            borderRadius: SmartScreenBase.smBaseWidth * 200,
            backgroundColor: Colors.SuccessGreen
        }
    })
