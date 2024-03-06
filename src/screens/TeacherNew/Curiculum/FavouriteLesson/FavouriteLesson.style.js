import FontBase from "../../../../base/FontBase";
import { Platform, StyleSheet } from "react-native";
import SmartScreenBase from "../../../../base/SmartScreenBase";
import { Colors } from "../../../../styleApp/color";
import { FontSize, FontWeight } from "../../../../styleApp/font";

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentItem: {
        flexDirection: 'row',
    },
    viewItem: {
        // marginTop: SmartScreenBase.smBaseHeight * 10,
        borderBottomWidth: 1,
        borderColor: Colors._777777,
        paddingTop: SmartScreenBase.smBaseHeight * 10,
        paddingBottom: SmartScreenBase.smBaseHeight * 15,
    },
    itemImg: {
        width: SmartScreenBase.smBaseWidth * 178,
        height: SmartScreenBase.smBaseWidth * 163,
        borderRadius: SmartScreenBase.smBaseWidth * 20,
        marginRight: SmartScreenBase.smBaseWidth * 20,
    },
    footerItem: {
        position: 'absolute',
        bottom: -SmartScreenBase.smBaseWidth * 60,
        right: 0,
        alignItems: 'center',
        overflow: 'hidden',
        flexDirection: 'row',
    },
    iconFavoite: {
        width: SmartScreenBase.smBaseWidth * 58,
        height: SmartScreenBase.smBaseWidth * 60,
        marginRight: SmartScreenBase.smBaseWidth * 20
    },
    favTouch: {
        paddingVertical: SmartScreenBase.smBaseWidth * 60,
        paddingLeft: SmartScreenBase.smBaseWidth * 60,
    },
    btnAssign: {
        paddingHorizontal: SmartScreenBase.smBaseWidth * 178,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: SmartScreenBase.smBaseWidth * 10,
        borderRadius: SmartScreenBase.smBaseWidth * 65,
        marginBottom: SmartScreenBase.smPercenHeight * 2,
    },
    txtAssign: {
        color: Colors.White,
        fontSize: FontSize.size55Font,
        ...FontWeight.Light,

    },
    txtLevel: {
        color: Colors.White,
        ...FontWeight.Bold,
        fontSize: FontSize.size35Font
    },
    txtTopic: {
        width: SmartScreenBase.smPercenWidth * 70,
        color: Colors._00A69C,
        ...FontWeight.Bold,
        lineHeight: FontSize.size45Font
    },
    txtEmptyContent: {
        fontFamily: FontBase.MyriadPro_Regular,
        textAlign: 'center',
        marginVertical: 50,
        fontSize: FontSize.size50Font
    },
    txtExercise: {
        width: SmartScreenBase.smPercenWidth * 70,
        color: Colors._00A69C,
        ...FontWeight.Light,
        fontSize: FontSize.size45Font,
    },
    txtCurriculum: {
        ...FontWeight.Light,
        fontSize: FontSize.size40Font,
        width: SmartScreenBase.smPercenWidth * 70,
    },
    viewLevel: {
        paddingHorizontal: SmartScreenBase.smBaseWidth * 20,
        borderRadius: 5,
        // paddingVertical: SmartScreenBase.smPercenWidth * 0.35,
        height: FontSize.size55Font,
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        left: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    horizontal: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    viewNumberExercise: {
        backgroundColor: Colors._FAAF40,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: SmartScreenBase.smBaseWidth * 30,
        borderRadius: SmartScreenBase.smBaseWidth * 20

    },
    txtNumber: {
        fontSize: FontSize.size35Font,
        color: Colors.White,
    },
    colorBlack: { color: Colors.Black },
    marginTop: { marginTop: SmartScreenBase.smBaseHeight * 10 },
    txtHeader: { textTransform: 'capitalize', fontSize: FontSize.size60Font },
    gradient: { flex: 1, paddingHorizontal: SmartScreenBase.smBaseWidth * 35 },
    marginVertical15: { marginVertical: 15 },
    flex1: { flex: 1 }
})
