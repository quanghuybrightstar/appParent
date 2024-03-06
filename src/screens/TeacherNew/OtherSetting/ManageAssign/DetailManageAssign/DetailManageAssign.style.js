import { Platform, StyleSheet } from "react-native";
import FontBase from "../../../../../base/FontBase";
import SmartScreenBase from "../../../../../base/SmartScreenBase";
import { Colors } from "../../../../../styleApp/color";
import { FontSize, FontWeight } from "../../../../../styleApp/font";

export const styles = StyleSheet.create({
    body: {
        paddingHorizontal: SmartScreenBase.smBaseWidth * 20,
        marginTop: SmartScreenBase.smBaseWidth * 20,
    },
    headerText: {
        fontSize: FontSize.size60Font
    },
    row: { flexDirection: 'row', flex: 1, alignItems: 'center', },
    viewTopic: {
        backgroundColor: Colors.White,
        borderRadius: SmartScreenBase.smBaseWidth * 24,
        padding: SmartScreenBase.smBaseWidth * 24,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    txtTopic: {
        ...FontWeight.Bold
    },
    viewTable: {
        marginTop: SmartScreenBase.smBaseWidth * 20,
        paddingHorizontal: SmartScreenBase.smBaseWidth * 20,
    },
    rowTitle: {
        flexDirection: 'row',
    },
    viewClass: {
        width: SmartScreenBase.smPercenWidth * 10,
        backgroundColor: Colors.White, justifyContent: 'center',
        alignItems: 'center',
        borderRadius: SmartScreenBase.smBaseWidth * 15,
        marginRight: SmartScreenBase.smPercenWidth
    },
    viewDate: {
        width: SmartScreenBase.smPercenWidth * 20,
        backgroundColor: Colors.White, justifyContent: 'center',
        alignItems: 'center',
        borderRadius: SmartScreenBase.smBaseWidth * 15,
        marginRight: SmartScreenBase.smPercenWidth
    },
    viewPoint: {
        width: SmartScreenBase.smPercenWidth * 56,
        backgroundColor: Colors.White,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: SmartScreenBase.smBaseWidth * 15,
        marginRight: SmartScreenBase.smPercenWidth,
        flex: 1,
        paddingVertical: 10,
    },
    paddingVertical2: {
        paddingVertical: SmartScreenBase.smPercenWidth * 2,
    },
    className: {
        paddingVertical: SmartScreenBase.smPercenWidth * 2,
        fontSize: FontSize.size45Font,
    },
    viewRank: {
        width: SmartScreenBase.smPercenWidth * 56 / 4.4,
        // backgroundColor: Colors.White,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: SmartScreenBase.smBaseWidth * 15,
        marginRight: SmartScreenBase.smPercenWidth,
    },
    viewNumber: {
        width: SmartScreenBase.smPercenWidth * 18,
        backgroundColor: Colors.White, justifyContent: 'center',
        alignItems: 'center',
        borderRadius: SmartScreenBase.smBaseWidth * 15,
        paddingVertical: SmartScreenBase.smBaseHeight * 5
    },
    txtTable: {
        fontSize: FontSize.size40Font,
        textAlign: 'center',
        ...FontWeight.SemiBold

    },
    txtValue: {
        marginTop: SmartScreenBase.smBaseHeight * 5,
        ...FontWeight.Regular,
        fontSize: FontSize.size40Font
    },
    btnAssign: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: SmartScreenBase.smBaseWidth * 65,
        marginBottom: SmartScreenBase.smPercenHeight * 2,
        marginTop: SmartScreenBase.smPercenHeight * 5

    },
    txtAssign: {
        color: Colors.White,
        fontSize: FontSize.size55Font,
        ...FontWeight.Light,
    },
    flex1: { flex: 1 },
    paddingVertical10: { paddingVertical: 10 }
})