import { StyleSheet } from "react-native";
import SmartScreenBase from "../../../base/SmartScreenBase";
import { Colors } from "../../../styleApp/color";
import { FontSize, FontWeight } from "../../../styleApp/font";
import stylesApp from "../../../styleApp/stylesApp";

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    bannerImg: {
        height: SmartScreenBase.smPercenHeight * 20
    },
    profileBox: {
        backgroundColor: Colors.White,
        borderRadius: SmartScreenBase.smBaseWidth * 30,
        marginHorizontal: SmartScreenBase.smBaseWidth * 40,
        marginTop: SmartScreenBase.smBaseHeight * -60
    },
    nameBox: {
        alignItems: 'center',
        marginTop: -SmartScreenBase.smPercenWidth * 22,
        paddingHorizontal: SmartScreenBase.smBaseWidth * 100
    },
    avatar: {
        width: SmartScreenBase.smPercenWidth * 35,
        height: SmartScreenBase.smPercenWidth * 35,
    },
    nameText: {
        fontSize: FontSize.size55Font,
        ...FontWeight.Bold,
        marginTop: SmartScreenBase.smBaseHeight * 20
    },
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
        borderRadius: SmartScreenBase.smBaseWidth * 100,
        backgroundColor: Colors.White
    },
    shadow: {
        shadowColor: Colors.Black,
        shadowOffset: {
            width: 1,
            height: 4,
        },
        shadowOpacity: 0.55,
        shadowRadius: 4,
        elevation: 8,
    },
    activeGenderContainer: {
        padding: SmartScreenBase.smPercenWidth * 3,
        borderRadius: SmartScreenBase.smBaseWidth * 100,
        backgroundColor: Colors.White
    },
    genderText: {
        fontSize: FontSize.size45Font,
        ...FontWeight.Light,
        marginTop: SmartScreenBase.smBaseWidth * 30,
    },
    dob: {
        alignItems: 'center',
        color: Colors.Black,
        fontSize: FontSize.size45Font,
        ...FontWeight.Regular,
        backgroundColor: Colors.White,
        borderRadius: SmartScreenBase.smBaseWidth * 40,
        paddingVertical: SmartScreenBase.smBaseWidth * 40,
        marginVertical: SmartScreenBase.smBaseWidth * 15,
        paddingHorizontal: SmartScreenBase.smBaseWidth * 70,

    },
    btnAvatar: {
        width: SmartScreenBase.smPercenWidth * 35,
        height: SmartScreenBase.smPercenWidth * 35,
        borderRadius: SmartScreenBase.smPercenWidth * 35 / 2,
        marginBottom: SmartScreenBase.smPercenHeight * 2,
        backgroundColor: Colors.White,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: Colors.White
    },
    viewIconCamera: {
        position: 'absolute',
        bottom: -2,
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
    },
    row: {
        flexDirection: "row", justifyContent: 'space-evenly', alignItems: 'center'
    },
    viewGender: {
        alignItems: "center"
    },
    viewDate: {
        width: "100%", marginVertical: SmartScreenBase.smBaseWidth * 10,
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
        marginBottom: SmartScreenBase.smBaseHeight * 20
    },
    viewBottom: {
    },
    viewBotCv: {
        height: SmartScreenBase.smPercenWidth * 20
    },
    viewbtn: {
        alignItems: 'center',
        width: '100%',
        paddingVertical: SmartScreenBase.smBaseWidth * 60
    },
    titleStyle: {
        ...FontWeight.SemiBold
    },
    textInput: {
        shadowColor: Colors.Black,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,

        elevation: 2,
    },
    keyboard: { paddingBottom: SmartScreenBase.smPercenHeight * 15 },
    ipName: {
        marginBottom: -5
    },
    marginBottom0: { marginBottom: 0 },
    width100: { width: '100%' },
    btnIPDate: { height: '100%', width: '100%', position: 'absolute', zIndex: 5 },
    marginBottom5: { marginBottom: -5 }
})