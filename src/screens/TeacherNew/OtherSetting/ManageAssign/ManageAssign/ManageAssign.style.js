
import { Platform, StyleSheet } from "react-native";
import SmartScreenBase from "../../../../../base/SmartScreenBase";
import { Colors } from "../../../../../styleApp/color";
import { FontSize, FontWeight } from "../../../../../styleApp/font";

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
        fontSize: FontSize.size55Font
    },
    contentItem: {
        flexDirection: 'row',
        marginVertical: SmartScreenBase.smBaseHeight * 13
    },
    viewItem: {
        borderBottomWidth: 1,
        borderColor: Colors._777777,
        paddingVertical: SmartScreenBase.smBaseHeight * 10,
        marginTop: SmartScreenBase.smBaseHeight * 13
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
        justifyContent: 'space-between',
        marginBottom: SmartScreenBase.smBaseHeight * 7,
        marginTop: SmartScreenBase.smBaseHeight * 5
    },

    row: {
        alignItems: 'center',
        flexDirection: 'row',
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
    touchFav: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        paddingTop: SmartScreenBase.smBaseWidth * 50,
        paddingLeft: SmartScreenBase.smBaseWidth * 50,
    },
    txtTopic: {
        width: SmartScreenBase.smPercenWidth * 70,
        color: Colors._00A69C,
        ...FontWeight.Bold,
        lineHeight: FontSize.size50Font,
        lineHeight: Platform.OS === 'ios' ? FontSize.size50Font : FontSize.size55Font
    },
    txtNameUnit: {
        width: SmartScreenBase.smPercenWidth * 70,
        color: Colors._00A69C
    },
    txtCurriculum: {
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
    btnAssign: {
        // flex: 1,
        paddingHorizontal: SmartScreenBase.smBaseWidth * 178,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: SmartScreenBase.smBaseWidth * 30,
        borderRadius: SmartScreenBase.smBaseWidth * 65,
        marginBottom: SmartScreenBase.smPercenHeight * 2
    },
    txtAssign: {
        color: Colors.White,
        fontSize: FontSize.size55Font,
        ...FontWeight.Light,

    },
    txtNumberAssign: {
        color: Colors.White

    },
    viewNumberAssign: {
        backgroundColor: Colors._FAAF40,
        borderRadius: SmartScreenBase.smBaseWidth * 24,
        paddingHorizontal: SmartScreenBase.smBaseWidth * 35,
        paddingVertical: SmartScreenBase.smBaseWidth * 5,
    },
    flex1: { flex: 1 },
    flatlist: { paddingHorizontal: SmartScreenBase.smBaseWidth * 30, paddingBottom: 10 },
    marginVertical15: { marginVertical: 15 },
    txtEmpty: { alignSelf: 'center', marginTop: SmartScreenBase.smPercenHeight * 7, fontSize: SmartScreenBase.smFontSize*50},
    loading: {
        justifyContent: 'center',
        paddingVertical: SmartScreenBase.smBaseHeight * 20
    }
})