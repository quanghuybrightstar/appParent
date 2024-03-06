import { Platform, StyleSheet } from "react-native";
import FontBase from "../../../../base/FontBase";
import SmartScreenBase from "../../../../base/SmartScreenBase";
import { Colors } from "../../../../styleApp/color";
import { FontSize, FontWeight } from "../../../../styleApp/font";

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentItem: {
        flexDirection: 'row',
        // paddingBottom: SmartScreenBase.smBaseWidth * 70,
    },
    viewItem: {
        marginTop: SmartScreenBase.smBaseHeight * 10,
        borderBottomWidth: 1,
        borderColor: Colors._777777,
        paddingVertical: SmartScreenBase.smBaseHeight * 10,
    },
    paddingBot70: {
        // backgroundColor: 'red',
        flex: 1,
        paddingBottom: SmartScreenBase.smBaseWidth * 80
    },
    itemImg: {
        width: SmartScreenBase.smBaseWidth * 178,
        height: SmartScreenBase.smBaseWidth * 163,
        borderRadius: SmartScreenBase.smBaseWidth * 20,
        marginRight: SmartScreenBase.smBaseWidth * 20,
    },
    favTouch: {
        paddingVertical: SmartScreenBase.smBaseWidth * 50,
        paddingLeft: SmartScreenBase.smBaseWidth * 50,
    },
    footerItem: {
        position: 'absolute',
        bottom: -SmartScreenBase.smBaseWidth * 40,
        right: 0,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    footerItemParent: {
        position: 'absolute',
        bottom: -SmartScreenBase.smBaseWidth * 5,
        right: 0,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    iconFavoite: {
        width: SmartScreenBase.smBaseWidth * 58,
        height: SmartScreenBase.smBaseWidth * 60,
        marginRight: SmartScreenBase.smBaseWidth * 20
    },
    btnAssign: {
        // flex: 1,
        paddingHorizontal: SmartScreenBase.smBaseWidth * 100,
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
    },
    txtLevel: {
        color: Colors.White,
        ...FontWeight.Bold,
        fontSize: FontSize.size35Font,
    },
    txtTopic: {
        width: SmartScreenBase.smPercenWidth * 70,
        color: Colors._00A69C,
        ...FontWeight.Bold,
        lineHeight: FontSize.size50Font
    },
    txtName: {
        width: SmartScreenBase.smPercenWidth * 70,
        color: Colors._00A69C,
        ...FontWeight.Regular
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
    flatlist: { paddingHorizontal: SmartScreenBase.smBaseWidth * 35 },
    flex1: { flex: 1 },
    txtHeader: { textTransform: 'capitalize', fontSize: FontSize.size60Font }
})