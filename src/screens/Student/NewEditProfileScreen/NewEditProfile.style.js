import { Platform, StyleSheet } from "react-native";
import SmartScreenBase from "../../../base/SmartScreenBase";
import { Colors } from "../../../styleApp/color";
import { FontSize, FontWeight } from "../../../styleApp/font";
import stylesApp from "../../../styleApp/stylesApp";
import FontBase from "../../../base/FontBase";

export const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    insideContainer: { paddingBottom: SmartScreenBase.smPercenHeight * 15 },
    bannerImg: {

        height: SmartScreenBase.smPercenHeight * 20
    },
    profileBox: {
        backgroundColor: Colors.White,
        borderRadius: 10,
        marginHorizontal: SmartScreenBase.smBaseWidth * 40,
        marginTop: SmartScreenBase.smBaseHeight * -60
    },
    nameBox: {
        alignItems: 'center',
        marginTop: -SmartScreenBase.smPercenWidth * 22,
        paddingHorizontal: SmartScreenBase.smBaseWidth * 100,
        paddingBottom : SmartScreenBase.smPercenWidth * 5,
    },
    avatar: {
        width: SmartScreenBase.smPercenWidth * 35,
        height: SmartScreenBase.smPercenWidth * 35,
    },
    fullWidth: { width: '100%' },
    nameText: {
        fontSize: FontSize.size55Font,
        ...FontWeight.Bold,
        marginTop: SmartScreenBase.smBaseHeight * 20
    },
    dateButton: { height: '100%', width: '100%', position: 'absolute', zIndex: 5 },
    accountStatusText: {
        color: Colors._00A79D,
        ...FontWeight.Bold
    },
    genderIcon: {
        width: SmartScreenBase.smPercenWidth * 5,
        height: SmartScreenBase.smPercenWidth * 5,
    },
    activeGenderIcon: {
        tintColor: Colors._22B3C3
    },
    activeGenderFemaleIcon: {
        tintColor: Colors._F25A92
    },
    genderContainer: {
        padding: SmartScreenBase.smPercenWidth * 3,
        borderRadius: 500,
        backgroundColor: Colors.White
    },
    shadow: {
        shadowColor: Colors.Black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 2,
    },
    titleStyle: {
        ...FontWeight.SemiBold
    },
    activeGenderContainer: {
        padding: SmartScreenBase.smPercenWidth * 3,
        borderRadius: 500,
        backgroundColor: Colors.White
    },
    genderText: {
        fontSize: FontSize.size45Font,
        ...FontWeight.Regular,
        marginTop: SmartScreenBase.smBaseHeight * 13,
    },
    dob: {
        flexDirection: "row",
        alignItems: 'center',
        backgroundColor: Colors.White,
        borderRadius: SmartScreenBase.smBaseWidth * 40,
        paddingVertical: SmartScreenBase.smBaseWidth * 40,
        marginVertical: SmartScreenBase.smBaseWidth * 30,
        paddingHorizontal: SmartScreenBase.smBaseWidth * 70,
    },
    btnAvatar: {
        width: SmartScreenBase.smPercenWidth * 35,
        height: SmartScreenBase.smPercenWidth * 35,
        borderRadius: SmartScreenBase.smPercenWidth * 35 / 2,
        marginBottom: SmartScreenBase.smPercenHeight * 2,
        borderWidth: SmartScreenBase.smPercenWidth*0.6,
        borderColor: Colors.White,
        backgroundColor: Colors.White,
        overflow: 'hidden'
    },
    viewIconCamera: {
        position: 'absolute',
        bottom: -SmartScreenBase.smBaseHeight * 3,
        backgroundColor: Colors.White,
        width: '100%',
        alignItems: 'center',
    },
    iconCamera: {
        width: SmartScreenBase.smPercenWidth * 8,
        height: SmartScreenBase.smPercenWidth * 5,
        marginVertical: SmartScreenBase.smPercenWidth * 2,
    },
    txtOption: {
        color: Colors.Black,
        fontSize: FontSize.size50Font,
        paddingHorizontal: SmartScreenBase.smBaseWidth * 70,
        marginBottom: SmartScreenBase.smBaseHeight * 10,
    },
    row: {
        flexDirection: "row", justifyContent: 'space-evenly', alignItems: 'center'
    },
    viewGender: {
        alignItems: "center",
    },
    viewDate: {
        width: "100%", marginVertical: SmartScreenBase.smBaseWidth * 30,
    },
    ipDate: {
        color: Colors.Black,
        fontSize: FontSize.size45Font,
        ...FontWeight.Regular,
    },
    viewBtnSave: {
        // position: "absolute",
        width: '100%',
        // bottom: 0,
        alignItems: "center",
        marginBottom: SmartScreenBase.smBaseHeight * 20,
        marginTop: SmartScreenBase.smBaseHeight * 20
    },
    viewBottom: {
        marginBottom: SmartScreenBase.smBaseHeight * 120
    },
    btnSave: {
        width: SmartScreenBase.smBaseWidth * 580,
        borderRadius: SmartScreenBase.smBaseHeight * 50,
    },
    dateInput: {
        color: Colors.Black,
        fontSize: FontSize.size45Font,
        ...FontWeight.Regular,
        backgroundColor: Colors.White,
        borderRadius: SmartScreenBase.smBaseWidth * 40,
        paddingVertical: SmartScreenBase.smBaseWidth * 40,
        marginVertical: SmartScreenBase.smBaseWidth * 30,
        paddingHorizontal: SmartScreenBase.smBaseWidth * 70,
        fontStyle: "normal",
        // ...stylesApp.shadow,
    },
    textInput: {
        shadowColor: Colors.Black,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 2,
        fontSize: FontSize.size45Font,
        ...FontWeight.Regular,
    },
    rightHeaderComponent: {
        backgroundColor: Colors.White,
        justifyContent: 'center',
        paddingHorizontal: SmartScreenBase.smPercenWidth * 7,
        paddingVertical: SmartScreenBase.smPercenWidth * 1.5,
        borderRadius: SmartScreenBase.smPercenWidth * 5,
        overflow: "hidden",
    },
    createPlanText: {
        color: Colors.BaseGreen,
        fontFamily: FontBase.MyriadPro_Bold,
        fontSize: SmartScreenBase.smFontSize * 40
    },
})