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
        backgroundColor: Colors.White,
        borderRadius: SmartScreenBase.smPercenWidth * 3,
        marginHorizontal: SmartScreenBase.smBaseWidth * 40,
        marginTop: SmartScreenBase.smBaseHeight * -60,
        marginBottom: SmartScreenBase.smBaseHeight * 25,
    },
    nameBox: {
        alignItems: 'center',
        marginTop: -SmartScreenBase.smPercenWidth * 35 / 2,
    },
    viewSchool: {
        flexDirection: 'row',
        marginHorizontal: SmartScreenBase.smPercenWidth * 10,
        marginVertical: SmartScreenBase.smBaseHeight * 5
    },
    iconSchool: {
        marginTop: Platform.OS === 'ios' ? 1 : 0,
        width: SmartScreenBase.smBaseWidth * 40,
        height: SmartScreenBase.smBaseWidth * 40,
        marginHorizontal: SmartScreenBase.smBaseWidth * 20
    },
    avatar: {
        borderWidth: SmartScreenBase.smBaseWidth * 6, 
        borderColor: Colors.White,
        backgroundColor: Colors.White
    },
    nameText: {
        fontSize: FontSize.size55Font,
        ...FontWeight.Bold,
        paddingBottom: SmartScreenBase.smBaseHeight * 10,
        paddingTop: SmartScreenBase.smBaseHeight * 20,
        textAlign: 'center',
        marginHorizontal: SmartScreenBase.smBaseWidth * 10
    },
    icon: {
        width: SmartScreenBase.smBaseWidth * 42,
        height: SmartScreenBase.smBaseWidth * 42,
        marginHorizontal: SmartScreenBase.smBaseWidth * 20,
        marginTop: SmartScreenBase.smBaseWidth * 5
    },
    accountStatusText: {
        width: SmartScreenBase.smPercenWidth*40,
        textAlign: 'left',
        color: Colors._00A79D,
        ...FontWeight.Bold,
    },
    textInfo: {
        // fontWeight: '400',
        // flexShrink: 1,
        // flexWrap: 'wrap'
        flex:1,
    },
    boxShadow: {
        elevation: 8,
        shadowOffset: { width: 0, height: 6},
        shadowColor: '#000',
        shadowOpacity: 0.25,
        backgroundColor: Colors.White
    },
    textDevices: {
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
        width: SmartScreenBase.smPercenWidth*65,
        justifyContent: "space-evenly",
        alignItems: 'center'
    },
    btnUpdate: {
        paddingHorizontal: SmartScreenBase.smBaseWidth * 40,
        height: 'auto',
        paddingVertical: SmartScreenBase.smPercenHeight * 0.3,
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
    rightHeader: {
        width: SmartScreenBase.smPercenWidth * 7,
        height: SmartScreenBase.smPercenWidth * 7,
    },
    viewInfo: {
        flexDirection: 'row',
        // alignItems: 'center',
        marginHorizontal: SmartScreenBase.smPercenWidth * 10,
        marginVertical: SmartScreenBase.smBaseHeight * 5
    },
    viewParent: {
        flexDirection: 'row', alignItems: 'center', marginHorizontal: SmartScreenBase.smBaseWidth * 50
    },
    imgParent: {
        width: SmartScreenBase.smPercenWidth * 10, height: SmartScreenBase.smPercenWidth * 10
    },
    nameParent: {
        fontWeight: '400', fontSize: FontSize.size50Font
    },
    viewInfoParent: {
        marginLeft: SmartScreenBase.smBaseWidth * 20
    },
    numberStatistic: {
        color: Colors._00A79D,
        ...FontWeight.Bold,
        fontSize: SmartScreenBase.smFontSize * 90
    },
    titleStatistic: {
        fontSize: SmartScreenBase.smFontSize * 40,
        color: Colors.Black
    },
    statisticContainer: {
        marginVertical: SmartScreenBase.smPercenHeight * 5,
        flexDirection: "row",
        width: '100%',
        justifyContent: 'center'
    },
    sideStatistic: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: SmartScreenBase.smPercenWidth * 20
    },
    middleStatistic: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginHorizontal: SmartScreenBase.smPercenWidth * 10
        // width: SmartScreenBase.smPercenWidth * 20
    },
    btnUpdateText: {
        fontFamily: FontBase.MyriadPro_Bold
    },
    fontWeight400: { fontWeight: '400' }
})