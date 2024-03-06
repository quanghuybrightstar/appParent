import { Platform, StyleSheet } from "react-native";
import SmartScreenBase from "../../../base/SmartScreenBase";
import { Colors } from "../../../styleApp/color";
import { FontSize, FontWeight } from "../../../styleApp/font";
import stylesApp from "../../../styleApp/stylesApp";

export
    const styles = StyleSheet.create({
        container: { flex: 1 },
        rightHeaderComponent: {
            backgroundColor: Colors.White,
            justifyContent: 'center',
            paddingHorizontal: SmartScreenBase.smPercenWidth * 5,
            paddingVertical: SmartScreenBase.smPercenWidth * 1.5,
            borderRadius: SmartScreenBase.smPercenWidth * 5,
            overflow: "hidden",
        },
        headerRightText: { marginTop: 0, color: Colors.BaseGreen },
        row: { flexDirection: 'row', alignItems: 'center' },
        title: {
            paddingVertical: SmartScreenBase.smPercenWidth * 5,
            fontSize: FontSize.size55Font,
            ...FontWeight.Bold,
            marginLeft: SmartScreenBase.smPercenWidth * 5,
            flex: 1,
        },
        planItemContainer: { marginHorizontal: SmartScreenBase.smPercenWidth * 5 },
        planInfo: {
            ...FontWeight.Regular,
            fontSize: FontSize.size40Font
        },
        btnMoreContainer: {
            position: 'relative', right: -20,
        },
        btnMore: {
            borderRadius: 500,
            width: SmartScreenBase.smBaseWidth * 120,
            height: SmartScreenBase.smBaseWidth * 120,
            alignItems: 'center', justifyContent: 'center'
        },
        createBtn: {
            flexDirection: "row",
            marginRight: SmartScreenBase.smPercenWidth * 5,
            paddingVertical: SmartScreenBase.smPercenWidth,
            paddingHorizontal: SmartScreenBase.smPercenWidth * 3,
            borderRadius: SmartScreenBase.smPercenWidth * 5,
            alignItems: 'center',
            borderLeftWidth: 1,
            borderLeftColor: Colors.White,
        },
        border: {
            // width: SmartScreenBase.smBaseWidth * 35,
            // height: SmartScreenBase.smBaseWidth * 35,
            // backgroundColor: Colors.White,
            borderLeftColor: Colors.White,
            borderLeftWidth: 1
        },
        createText: {
            fontSize: FontSize.size40Font,
            color: Colors.White,
            paddingLeft: SmartScreenBase.smPercenWidth * 5,
        },
        emptyContainer: {
            marginHorizontal: SmartScreenBase.smPercenWidth * 5,
            backgroundColor: Colors.White,
            borderRadius: SmartScreenBase.smPercenWidth * 5,
            flexDirection: "row",
            ...stylesApp.shadow,
            marginBottom: SmartScreenBase.smPercenWidth * 3,
            alignItems: 'center',
            paddingVertical: SmartScreenBase.smPercenWidth * 5,
            paddingHorizontal: SmartScreenBase.smPercenWidth * 5
        },
        emptyText: {
            fontSize: FontSize.size40Font,
            lineHeight: SmartScreenBase.smPercenHeight * 3,
            color: Colors.BaseGreen,
            flex: 1,
            textAlign: "center",
            marginRight: SmartScreenBase.smPercenWidth,
        },
        emptyImage: {
            width: SmartScreenBase.smBaseWidth * 400,
            height: SmartScreenBase.smBaseWidth * 300,
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
        viewPlan: {
            paddingVertical: SmartScreenBase.smPercenWidth * 3,
            // width: "70%",
            flex: 1,
            paddingLeft: SmartScreenBase.smPercenWidth * 7,
        },
        viewDone: {
            flexDirection: "row",
             position: 'absolute',
            top: 5, right: -20,
            alignItems: 'flex-start',
            width: SmartScreenBase.smPercenWidth * 30,
        },
        iconSucces: {
            width: SmartScreenBase.smBaseWidth * 50,
            height: SmartScreenBase.smBaseWidth * 50,
            resizeMode: 'contain',
            marginRight: 5
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
        imageBack: {
            marginRight: 15,
            width: SmartScreenBase.smBaseWidth * 50,
            height: SmartScreenBase.smBaseWidth * 50,
            resizeMode: 'contain',
            tintColor: Colors.White
        },
        imageForward: {
            marginRight: 15,
            width: SmartScreenBase.smBaseWidth * 50,
            height: SmartScreenBase.smBaseWidth * 50,
            resizeMode: 'contain',
            transform: [{ rotate: '180deg' }],
            tintColor: Colors.White
        },
        imgPlus: {
            width: SmartScreenBase.smBaseWidth * 35,
            height: SmartScreenBase.smBaseWidth * 35,
            tintColor: Colors.White,
            marginRight: SmartScreenBase.smPercenWidth * 4
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
    })