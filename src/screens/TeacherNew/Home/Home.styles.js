import { Platform, StyleSheet } from "react-native";
import SmartScreenBase from "../../../base/SmartScreenBase";
import { Colors } from "../../../styleApp/color";
import { FontSize, FontWeight } from "../../../styleApp/font";
import stylesApp from "../../../styleApp/stylesApp";

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
        planInfo: {
            ...FontWeight.Regular,
            fontSize: FontSize.size40Font,
        },
        width80: {
            flex: 1,
            // width: '80%'
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
            fontSize: FontSize.size40Font,
            color: Colors.BaseGreen,
            flex: 1,
            ...FontWeight.Bold,
            textAlign: "center",
            marginRight: SmartScreenBase.smPercenWidth,
            lineHeight: SmartScreenBase.smPercenHeight * 3,
        },
        emptyImage: {
            width: SmartScreenBase.smPercenWidth * 100,
            height: SmartScreenBase.smPercenHeight * 23,
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

        imageForward: {
            marginRight: 15,
            width: SmartScreenBase.smBaseWidth * 50,
            height: SmartScreenBase.smBaseWidth * 50,
            resizeMode: 'contain',
            transform: [{ rotate: '180deg' }],
            tintColor: Colors.White
        },
        viewPlan: {
            paddingVertical: SmartScreenBase.smPercenWidth * 3,
            // width: "70%",
            flex: 1,
            paddingLeft: SmartScreenBase.smPercenWidth * 7,
        },
        viewDone: {
            flexDirection: "row", position: 'absolute',
            top: 5, right: -35,
            alignItems: 'center',
            width: SmartScreenBase.smPercenWidth * 30,
        },
        iconSucces: {
            width: SmartScreenBase.smBaseWidth * 50,
            height: SmartScreenBase.smBaseWidth * 50,
            resizeMode: 'contain',
            marginRight: 5
        },
        imageBack: {
            marginRight: 15,
            width: SmartScreenBase.smBaseWidth * 50,
            height: SmartScreenBase.smBaseWidth * 50,
            resizeMode: 'contain',
            tintColor: Colors.White
        },
        imgPlus: {
            width: SmartScreenBase.smBaseWidth * 35,
            height: SmartScreenBase.smBaseWidth * 35,
            tintColor: Colors.White,
            marginRight: SmartScreenBase.smPercenWidth * 5
        },
        iconHidden: {
            width: SmartScreenBase.smBaseWidth * 100,
            height: SmartScreenBase.smBaseWidth * 100
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
        createBtn: {
            paddingHorizontal: 15,
            paddingVertical: 5,
            height: 'auto',
            marginTop: 15,
        },
        btnText: {
            fontSize: SmartScreenBase.smFontSize * 60
        },
        dotContainer: {
            width: 12,
            height: 12,
            borderRadius: 6,
            borderWidth: 1,
            borderColor: Colors.DarkGreen,
            backgroundColor: "transparent",
            alignItems: "center",
            justifyContent: 'center',
            marginHorizontal: 5
        },
        dotActive: {
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: Colors.DarkGreen,
        },
        paging: {
            height: 30,
            // position: "absolute",
            // bottom: 0,
            width: "100%",
            paddingVertical: 0
        },
        carouselContainer: {
            justifyContent: "center",
            backgroundColor: Colors._A9ECE8
        },
        carouselItem: { width: '100%', padding: 10 },
        classItem: {
            width: '100%',
            padding: 10,
            flexDirection: 'row',
            backgroundColor: 'white',
            ...stylesApp.shadow,
            borderRadius: 10,
        },
        classImage: {
            width: SmartScreenBase.smPercenHeight * 13,
            height: SmartScreenBase.smPercenHeight * 13,
            borderRadius: 10,
        },
        content: {
            width: '100%',
            paddingHorizontal: 5
        },
        classNameContainer: {
            width: '100%',
            // height: 30,
            paddingVertical: SmartScreenBase.smPercenHeight * 0.7,
            borderRadius: 50,
            justifyContent: 'center',
            paddingHorizontal: SmartScreenBase.smPercenWidth * 3,
        },
        className: {
            color: 'white',
            fontSize: SmartScreenBase.smFontSize * 40,
        },
        classTypeContainer: {
            borderRadius: 50,
            backgroundColor: 'white',
            padding: 5,
            position: "absolute",
            right: 0
        },
        classType: {
            padding: 8,
            borderRadius: 50,
            backgroundColor: Colors.BaseGreen,
            justifyContent: 'center',
            alignItems: "center",
        },
        classTypeName: {
            color: 'white',
            ...FontWeight.Bold,
        },
        emptyChart: {
            textAlign: 'center'
        },
        chartContainer: {
            height: SmartScreenBase.smPercenHeight * 7,
            width: SmartScreenBase.smPercenHeight * 7,
            borderRadius: SmartScreenBase.smPercenHeight * 3.5,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: "center",
            ...stylesApp.shadow
        },
        chart: {
            height: SmartScreenBase.smPercenHeight * 7.5,
            width: SmartScreenBase.smPercenHeight * 7.5
        },
        statisticContainer: {
            // flexDirection: 'row',
            // flex: 1,
            // alignItems: 'center',
            paddingHorizontal: SmartScreenBase.smBaseHeight * 10,
            marginTop: SmartScreenBase.smBaseHeight * 10,
        },
        statisticDataContainer: { flex: 1, justifyContent: 'space-evenly', marginLeft: 10 },
        statisticItem: { flexDirection: "row", alignItems: "center", flex: 1 },
        statisticType: {
            width: SmartScreenBase.smPercenHeight * 1.5,
            height: SmartScreenBase.smPercenHeight * 0.8,
            marginRight: 5,
        },
        statisticText: {
            fontSize: SmartScreenBase.smFontSize * 25,
            flex: 1,
            marginBottom: Platform.OS === 'ios' ? -3 : 0
        },
        averageContainer: {
            marginTop: 5,
        },
        averageText: {
            fontSize: SmartScreenBase.smFontSize * 30,
        },
        averagePoint: {
            fontSize: SmartScreenBase.smFontSize * 40,
            ...FontWeight.Bold,
            color: Colors.DarkGreen
        },
        container: { flex: 1, backgroundColor: Colors._F3FFFF, }
    })