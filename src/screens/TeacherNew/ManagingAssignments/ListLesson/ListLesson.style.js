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
        marginBottom: SmartScreenBase.smBaseWidth * 58
    },
    viewItem: {
        marginTop: SmartScreenBase.smBaseHeight * 10,
        borderBottomWidth: 1,
        borderColor: Colors._777777,
        paddingVertical: SmartScreenBase.smBaseHeight * 10
    },
    itemImg: {
        width: SmartScreenBase.smBaseWidth * 178,
        height: SmartScreenBase.smBaseWidth * 163,
        borderRadius: SmartScreenBase.smBaseWidth * 20,
        marginRight: SmartScreenBase.smBaseWidth * 20,
    },
    favTouch: {
        paddingLeft: SmartScreenBase.smBaseWidth * 50,
        paddingVertical: SmartScreenBase.smBaseWidth * 50,
    },
    footerItem: {
        alignItems: 'center',
        flexDirection: 'row',
        position: 'absolute',
        right: 0, bottom: -SmartScreenBase.smBaseWidth * 30,
        overflow: 'hidden',
        justifyContent: 'flex-end'
    },
    footerItemParent: {
        position: 'absolute',
        bottom: SmartScreenBase.smBaseWidth * 30,
        right: 0,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    iconFavoite: {
        width: SmartScreenBase.smBaseWidth * 58,
        height: SmartScreenBase.smBaseWidth * 60,
        marginRight: SmartScreenBase.smBaseWidth * 20,
    },
    rightHeader: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.White,
        borderRadius: SmartScreenBase.smBaseWidth * 100,
        paddingHorizontal: SmartScreenBase.smBaseWidth * 100,
        paddingVertical: SmartScreenBase.smBaseWidth * 30,
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
        width: SmartScreenBase.smPercenWidth * 75,
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
    txtRightHeader: {
        color: Colors.BaseGreen,
    },
    viewNumberAssign: {
        backgroundColor: Colors._F70000,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: SmartScreenBase.smBaseWidth * 80,
        height: SmartScreenBase.smBaseWidth * 80,
        width: SmartScreenBase.smBaseWidth * 80,
        position: 'absolute',
        top: -SmartScreenBase.smBaseWidth * 5,
        right: -SmartScreenBase.smBaseWidth * 5,
    },
    txtNumberAssign: {
        color: Colors.White,
        fontFamily: FontBase.MyriadPro_Bold
    },
    txtHeader: { textTransform: 'capitalize', fontSize: FontSize.size60Font },
    flatlist: { paddingHorizontal: SmartScreenBase.smBaseWidth * 35 }
})