import { Platform, StyleSheet } from "react-native";
import SmartScreenBase from "../../../../base/SmartScreenBase";
import { Colors } from "../../../../styleApp/color";
import { FontSize, FontWeight } from "../../../../styleApp/font";

export const styles = StyleSheet.create({
    fontSize: { fontSize: FontSize.size60Font },
    body: {
        paddingHorizontal: SmartScreenBase.smBaseWidth * 20,
        paddingVertical: SmartScreenBase.smBaseHeight * 20,
        flex: 1
    },
    errText: {
        color: Colors._E41E27,
        marginTop: SmartScreenBase.smBaseWidth * 25,
        alignSelf: 'center',
        width: '90%',
        fontSize: FontSize.size40Font
    },  
    marginLeft: {
        marginLeft: SmartScreenBase.smBaseWidth * 43,
    },
    viewStudent: {
        backgroundColor: Colors.White,
        borderRadius: SmartScreenBase.smBaseWidth * 43,
        padding: SmartScreenBase.smBaseWidth * 35,
    },
    txtChooseStudent: {
        fontSize: FontSize.size55Font
    },
    txtStartAfter: {
        fontSize: FontSize.size55Font,
        width: SmartScreenBase.smPercenWidth * 90
    },
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
        width: SmartScreenBase.smPercenWidth * 47,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: SmartScreenBase.smBaseWidth * 30
    },
    iconRight: {
        width: SmartScreenBase.smBaseWidth * 52,
        height: SmartScreenBase.smBaseWidth * 52,
        // marginTop: SmartScreenBase.smBaseWidth * 30,
        // marginHorizontal: SmartScreenBase.smBaseWidth * 30,
    },
    date: {
        fontSize: FontSize.size55Font
    },
    viewStartAfter: {
        marginVertical: 20, flexDirection: 'row'
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
        position: Platform.OS === 'ios' ? "absolute" : 'relative',
        backgroundColor: Colors._F3FFFF
    },
    txtAssign: {
        color: Colors.White,
        fontSize: FontSize.size55Font,
        ...FontWeight.Light,
        fontWeight: '400',

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
        marginHorizontal: 5,
        paddingHorizontal: SmartScreenBase.smBaseWidth * 15,
        paddingVertical: SmartScreenBase.smBaseWidth * 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5
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
        fontStyle: 'normal',
        color: Colors.Black
    },
    ipRemind: { ...FontWeight.LightItalic, fontSize: FontSize.size45Font, height: SmartScreenBase.smPercenHeight * 10, color: Colors.Black },
    ipAndroid: {
        ...FontWeight.Regular,
        width: SmartScreenBase.smPercenWidth * 20,
        fontSize: FontSize.size55Font,
        textAlign: 'center',
        fontStyle: 'normal',
        height: FontSize.size55Font * 1.15,
        flex: 1,
        margin: 0, padding: 0,
        color: Colors.Black
    },
    flex1: { flex: 1 },
    flexGrow1: { flexGrow: 1 },
    marginVertical10: { marginVertical: 10 },
    marginRight30: { marginRight: SmartScreenBase.smBaseWidth * 30 },
    marginBottom20: { marginBottom: SmartScreenBase.smBaseHeight * 20, },
    marginTop10: { marginTop: SmartScreenBase.smBaseHeight * 10, alignSelf: 'center' },
    txtErr: { color: Colors.Red, alignSelf: 'center' },
    width50: { width: SmartScreenBase.smPercenWidth * 49 },
    marginBt10: { marginBottom: 10 },
    borderRadius30: { borderRadius: SmartScreenBase.smBaseWidth * 30 },
    SemiBold: { ...FontWeight.SemiBold }
})