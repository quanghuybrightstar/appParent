import { Platform, StyleSheet } from "react-native";
import SmartScreenBase from "../../../../base/SmartScreenBase";
import { Colors } from "../../../../styleApp/color";
import { FontSize, FontWeight } from "../../../../styleApp/font";
import stylesApp from "../../../../styleApp/stylesApp";

export
    const styles = StyleSheet.create({
        rightHeaderComponent: {
            backgroundColor: 'white',
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
        btnMoreContainer: {
            position: 'absolute', right: -20,
        },
        btnMore: {
            borderRadius: 500,
            width: SmartScreenBase.smBaseWidth * 120,
            height: SmartScreenBase.smBaseWidth * 120,
            alignItems: 'center', justifyContent: 'center'
        },
        contentList: {
            flex: 1,
            // backgroundColor: Colors.White
        },
        createBtn: {
            flexDirection: "row",
            marginRight: SmartScreenBase.smPercenWidth * 5,
            paddingVertical: SmartScreenBase.smPercenWidth,
            paddingHorizontal: SmartScreenBase.smPercenWidth * 5,
            borderRadius: SmartScreenBase.smPercenWidth * 5,
            alignItems: 'center',
        },
        createText: {
            fontSize: FontSize.size40Font,
            color: Colors.White,
            paddingLeft: SmartScreenBase.smPercenWidth * 2,
            borderLeftWidth: 0.8,
            borderColor: Colors.White
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
            color: Colors.BaseGreen,
            flex: 1,
            ...FontWeight.Bold,
            textAlign: "center",
            marginRight: SmartScreenBase.smPercenWidth,
        },
        emptyImage: {
            width: SmartScreenBase.smBaseWidth * 640,
            height: SmartScreenBase.smBaseHeight * 280,
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
            flexDirection: "row", height: '100%', marginRight: 24,
            justifyContent: "flex-end",
            marginTop: 15,
        },
        iconSucces: {
            width: SmartScreenBase.smBaseWidth * 50,
            height: SmartScreenBase.smBaseWidth * 50,
            resizeMode: 'contain',
            marginRight: 5
        },
        txtComplete: {
            color: Colors.LightGreen,

        },
        imageBack: {
            marginRight: 15,
            width: SmartScreenBase.smBaseWidth * 50,
            height: SmartScreenBase.smBaseWidth * 50,
            resizeMode: 'contain',
            tintColor: Colors.White
        },
        itemContainer: {
            marginHorizontal: SmartScreenBase.smPercenWidth * 3,
            borderBottomColor: Colors.Gray,
            borderBottomWidth: 1,
            paddingBottom: SmartScreenBase.smPercenHeight * 1,
            marginBottom: SmartScreenBase.smPercenHeight * 1
        },
        itemFirstLine: {
            flexDirection: 'row',
        },
        time: {
            fontSize: FontSize.size50Font,
            ...FontWeight.Bold,
            width: SmartScreenBase.smPercenWidth * 15,
        },
        flex: {
            flex: 1,
            paddingRight: SmartScreenBase.smBaseWidth * 30,
        },
        lessonName: {
            fontSize: FontSize.size50Font,
            ...FontWeight.Bold,
        },
        itemPoint: {
            fontSize: FontSize.size50Font,
            // width: SmartScreenBase.smPercenWidth * 25,
        },
        listContainer: {
            flex: 1, paddingHorizontal: SmartScreenBase.smPercenWidth * 3,
            marginBottom: SmartScreenBase.smBaseHeight * 15

        },
        loadingIndi: {
            paddingVertical: SmartScreenBase.smPercenHeight * 2
        },
        container: { flex: 1, backgroundColor: Colors.BlurGreen, },
        flatlist: {
            backgroundColor: Colors.White, paddingVertical: SmartScreenBase.smBaseHeight * 10,
            marginBottom: SmartScreenBase.smBaseHeight * 10, borderRadius: SmartScreenBase.smBaseWidth * 20
        },
        txtSkill: {
            textTransform: 'capitalize'
        }
    })