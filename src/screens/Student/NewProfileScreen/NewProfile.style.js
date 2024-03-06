import { Platform, StyleSheet } from "react-native";
import FontBase from "../../../base/FontBase";
import SmartScreenBase from "../../../base/SmartScreenBase";
import { Colors } from "../../../styleApp/color";
import { FontSize, FontWeight } from "../../../styleApp/font";
import stylesApp from "../../../styleApp/stylesApp";

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    bannerImg: {
        height: SmartScreenBase.smPercenHeight * 25,
    },
    profileBox: {
        ...stylesApp.shadow,
        backgroundColor: Colors.White,
        borderRadius: SmartScreenBase.smBaseWidth * 30,
        marginHorizontal: SmartScreenBase.smBaseWidth * 40,
        marginTop: SmartScreenBase.smBaseHeight * -60
    },
    nameBox: {
        paddingHorizontal: SmartScreenBase.smPercenWidth * 5,
        alignItems: 'center',
        marginTop: -SmartScreenBase.smPercenWidth * 35 / 2,
    },
    avatar: {
        borderWidth: 2,
        borderColor: Colors.White,
        margin: SmartScreenBase.smBaseWidth * 5,
        backgroundColor: Colors.White,
        marginRight: SmartScreenBase.smBaseWidth * 10,
        elevation: 2
    },
    nameText: {
        width: '100%',
        textAlign: 'center',
        fontSize: FontSize.size60Font,
        lineHeight: SmartScreenBase.smBaseHeight * 45,
        ...FontWeight.Bold,
        marginTop: SmartScreenBase.smBaseHeight * 15
    },
    userCode: {
        width: '100%',
        textAlign: 'center',
        fontSize: FontSize.size45Font,
        ...FontWeight.Regular,
        marginBottom: SmartScreenBase.smBaseHeight * 15
    },
    icon: {
        width: SmartScreenBase.smBaseWidth * 42,
        height: SmartScreenBase.smBaseWidth * 42,
        marginTop: SmartScreenBase.smBaseWidth * 6,
        marginHorizontal: SmartScreenBase.smBaseWidth * 20
    },
    iconSchool: {
        marginTop: Platform.OS === 'ios' ? 4 : 0,
        width: SmartScreenBase.smBaseWidth * 40,
        height: SmartScreenBase.smBaseWidth * 40,
        marginHorizontal: SmartScreenBase.smBaseWidth * 20
    },
    accountStatusText: {
        color: Colors._00A79D,
        ...FontWeight.Bold,
    },
    textInfo: {

    },
    boxShadow: {
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.4,
        shadowColor: Colors.Black,
        elevation: 2,
    },
    androidSmallShadow: {
        elevation: 2,
    },
    viewAccount: {
        marginHorizontal: SmartScreenBase.smPercenWidth * 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: SmartScreenBase.smBaseWidth * 20
    },
    row: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: 'center'
    },
    btnUpdate: {
        paddingHorizontal: SmartScreenBase.smBaseWidth * 40,
        height: 'auto',
        paddingVertical: SmartScreenBase.smPercenHeight * 0.3,
    },
    btnUpdateText: {
        fontFamily: FontBase.MyriadPro_Bold
    },
    viewBtnUpdate: {
        flex: 1,
        alignItems: 'flex-end'
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        marginHorizontal: SmartScreenBase.smBaseWidth * 50,
        marginVertical: SmartScreenBase.smBaseHeight * 25
    },
    imgAdd: {
        width: SmartScreenBase.smBaseWidth * 65, height: SmartScreenBase.smBaseWidth * 65, marginRight: SmartScreenBase.smBaseWidth * 15
    },
    btnAdd: {
        flexDirection: 'row', alignItems: 'center'
    },
    txtAdd: {
        color: Colors._00B9B6,
    },
    rightHeader: {
        width: SmartScreenBase.smPercenWidth * 7,
        height: SmartScreenBase.smPercenWidth * 7,
    },
    viewInfo: {
        flexDirection: 'row',
        marginHorizontal: SmartScreenBase.smPercenWidth * 10,
        marginVertical: SmartScreenBase.smBaseHeight * 5
    },
    viewSchool: {
        flexDirection: 'row',
        marginHorizontal: SmartScreenBase.smPercenWidth * 10,
        marginVertical: SmartScreenBase.smBaseHeight * 5
    },
    viewParent: {
        flexDirection: 'row', alignItems: 'center', marginHorizontal: SmartScreenBase.smBaseWidth * 50,
        marginBottom: SmartScreenBase.smBaseHeight * 25
    },
    imgParent: {
        width: SmartScreenBase.smPercenWidth * 10, height: SmartScreenBase.smPercenWidth * 10,
    },
    nameParent: {
        fontWeight: '400', fontSize: FontSize.size50Font
    },
    viewInfoParent: {
        marginLeft: SmartScreenBase.smBaseWidth * 20
    },
    parentText: {
        ...FontWeight.Bold,
        fontSize: FontSize.size50Font
    },
    lingkingText: { fontWeight: '400', fontSize: FontSize.size35Font }
})