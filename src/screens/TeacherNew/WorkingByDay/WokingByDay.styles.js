import { Platform, StyleSheet } from "react-native";
import SmartScreenBase from "../../../base/SmartScreenBase";
import { Colors } from "../../../styleApp/color";
import { FontSize, FontWeight } from "../../../styleApp/font";
import stylesApp from "../../../styleApp/stylesApp";

export
    const styles = StyleSheet.create({
        rightHeaderComponent: {
            backgroundColor: Colors.White,
            justifyContent: 'center',
            paddingHorizontal: SmartScreenBase.smPercenWidth * 5,
            paddingVertical: SmartScreenBase.smPercenWidth * 1.5,
            borderRadius: SmartScreenBase.smPercenWidth * 5,
            overflow: "hidden",
        },
        title: {
            marginVertical: SmartScreenBase.smPercenWidth * 5,
            fontSize: FontSize.size55Font,
            ...FontWeight.Bold,
            marginLeft: SmartScreenBase.smPercenWidth * 5,
            flex: 1,
        },
        createPlanText: {
            color: Colors.BaseGreen
        },
        planInfo: {
            ...FontWeight.Regular,
            fontSize: FontSize.size40Font
        },
        createBtn: {
            flexDirection: "row",
            marginRight: SmartScreenBase.smPercenWidth * 5,
            paddingVertical: SmartScreenBase.smPercenWidth,
            paddingHorizontal: SmartScreenBase.smPercenWidth * 5,
            borderRadius: SmartScreenBase.smPercenWidth * 5,
            alignItems: 'center',
        },
        emptyContainer: {
            marginHorizontal: SmartScreenBase.smPercenWidth * 5,
            alignItems: "center",
            marginBottom: SmartScreenBase.smPercenWidth * 3,
            paddingVertical: SmartScreenBase.smPercenWidth * 5,
            paddingHorizontal: SmartScreenBase.smPercenWidth * 5
        },
        emptyText: {
            fontSize: FontSize.size50Font,
            lineHeight: SmartScreenBase.smPercenHeight * 4,
            color: Colors.BaseGreen,
            flex: 1,
            ...FontWeight.Bold,
            textAlign: "center",
            marginRight: SmartScreenBase.smPercenWidth,
            textTransform: 'uppercase'
        },
        emptyImage: {
            width: SmartScreenBase.smPercenWidth * 80,
            height: SmartScreenBase.smPercenWidth * 60,
        },
        actionBtn: {
            position: 'absolute',
            right: 0,
            width: SmartScreenBase.smPercenWidth * 40,
            flexDirection: "row",
            alignItems: 'center',
            height: '100%',
            justifyContent: "space-evenly",
        },
        actionBtnContainer: {
            backgroundColor: Colors.BlurGreen,
            width: '100%',
            height: '100%',
            borderRadius: SmartScreenBase.smPercenWidth * 2,
            overflow: 'hidden',
        },
        itemNameClassSchedule: {
            flex: 1, paddingLeft: SmartScreenBase.smPercenWidth * 7,
            ...FontWeight.Bold,
            fontSize: FontSize.size50Font,
        },
        itemTimeSchedule: {
            paddingRight: SmartScreenBase.smPercenWidth * 5, ...FontWeight.Bold,
            fontSize: FontSize.size40Font,
            color: Colors.DarkGray
        },
        txtComplete: {
            color: Colors._84C241,

        },
        txtOverTime: {
            color: Colors._BE1E2D,

        },
        txtUpcoming: {
            color: Colors.Orange,

        },
        iconHidden: {
            width: SmartScreenBase.smBaseWidth * 100,
            height: SmartScreenBase.smBaseWidth * 100
        },
        txtTitleHidden: {
            ...FontWeight.Light,
            textAlign: 'center',
            fontSize: FontSize.size35Font,

        },
        viewHiddenItem: {
            flexDirection: 'row',
            width: '100%',
            height: '100%',
            paddingHorizontal: SmartScreenBase.smPercenWidth * 5,
            paddingBottom: SmartScreenBase.smPercenWidth * 2,
        },
        hiddenItem: {
            width: SmartScreenBase.smBaseWidth * 140,
            alignItems: 'center',
            justifyContent: 'center',
            height: Platform.OS === 'ios' ? SmartScreenBase.smBaseWidth * 120 + 7 : SmartScreenBase.smBaseWidth * 120,
        },
        flex1: { flex: 1 }
    })