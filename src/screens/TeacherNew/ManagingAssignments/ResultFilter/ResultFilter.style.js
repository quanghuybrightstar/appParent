import { StyleSheet } from "react-native";
import SmartScreenBase from "../../../../base/SmartScreenBase";
import { Colors } from "../../../../styleApp/color";
import { FontSize, FontWeight } from "../../../../styleApp/font";

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    viewItem: {
        paddingTop: SmartScreenBase.smBaseHeight * 30,
        paddingBottom: SmartScreenBase.smBaseHeight * 30,
        paddingHorizontal: SmartScreenBase.smBaseWidth * 30,
        borderBottomWidth: 1,
        borderColor: Colors._777777
    },
    txtCurriculum: {
        fontSize: FontSize.size55Font, ...FontWeight.SemiBold
    },
    contentItem: {
        flexDirection: 'row',
        marginVertical: 10
    },
    viewItem: {
        borderBottomWidth: 1,
        borderColor: Colors._777777,
        paddingVertical: SmartScreenBase.smBaseHeight * 10,
        paddingBottom: SmartScreenBase.smBaseWidth * 70,
    },
    itemImg: {
        width: SmartScreenBase.smBaseWidth * 178,
        height: SmartScreenBase.smBaseWidth * 163,
        borderRadius: SmartScreenBase.smBaseWidth * 20,
        marginRight: SmartScreenBase.smBaseWidth * 20,
    },
    footerItem: {
        alignItems: 'center',
        flexDirection: 'row',
        bottom: -SmartScreenBase.smBaseWidth * 30,
        justifyContent: 'flex-end',
        position: 'absolute',
        right: SmartScreenBase.smBaseWidth * 10,
    },
    favTouch: {
        paddingVertical: SmartScreenBase.smBaseWidth * 50,
        paddingLeft: SmartScreenBase.smBaseWidth * 50,
    },
    iconFavoite: {
        width: SmartScreenBase.smBaseWidth * 58,
        height: SmartScreenBase.smBaseWidth * 60,
        marginRight: SmartScreenBase.smBaseWidth * 20
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
        lineHeight: FontSize.size50Font
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
    btnAssign: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: SmartScreenBase.smBaseWidth * 65,
        marginVertical: SmartScreenBase.smBaseHeight * 10,
        marginBottom: SmartScreenBase.smPercenHeight * 2
    },
    txtAssign: {
        color: Colors.White,
        fontSize: FontSize.size55Font,
        ...FontWeight.Light,

    },
    ls_name: {
        width: SmartScreenBase.smPercenWidth * 75,
        color: Colors._00A69C,
        ...FontWeight.Light,
        fontSize: FontSize.size45Font,
        marginVertical: SmartScreenBase.smBaseHeight * 5
    },
    ttx_unit_name: {
        width: SmartScreenBase.smPercenWidth * 75,
        ...FontWeight.Light,
        fontSize: FontSize.size40Font,
    },
    box: {
        width: 80,
        height: 80,
        borderRadius: 8,
        backgroundColor: 'rgb(39,43,50)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtHeader: { fontSize: FontSize.size60Font },
    txtRightHeader: { tintColor: Colors.White },
    flex1: { flex: 1 },
    viewLoading: { justifyContent: 'center', alignItems: 'center', backgroundColor: Colors._33333303, flex: 1 },
    flatlist: { paddingHorizontal: SmartScreenBase.smBaseWidth * 30, paddingBottom: 10 },
    viewEmpty: { flex: 1, alignSelf: 'center', marginTop: SmartScreenBase.smBaseHeight * 35 }
})