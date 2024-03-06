import { Platform, StyleSheet } from "react-native";
import SmartScreenBase from "../../../../base/SmartScreenBase";
import { Colors } from "../../../../styleApp/color";
import { FontSize, FontWeight } from "../../../../styleApp/font";
import stylesApp from "../../../../styleApp/stylesApp";
import FontBase from "../../../../base/FontBase";

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    marginRight20: {
        marginRight: SmartScreenBase.smBaseWidth * 20
    },
    viewTopic: {
        backgroundColor: Colors.White,
        borderRadius: SmartScreenBase.smBaseWidth * 20,
        margin: SmartScreenBase.smBaseWidth * 20,
        paddingHorizontal: SmartScreenBase.smBaseWidth * 20,
        paddingVertical: SmartScreenBase.smBaseWidth * 15,
        shadowColor: Colors.Black,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    txtTopic: {
        fontSize: FontSize.size55Font,
        ...FontWeight.Bold,
    },
    txtNameItem: {
        fontSize: FontSize.size50Font,
        marginVertical: SmartScreenBase.smBaseWidth * 10
    },
    txtTimeTopic: {
        color: Colors._00A69C,
        fontSize: FontSize.size35Font
    },
    carouselItem: { height: SmartScreenBase.smPercenWidth * 35, width: '100%', padding: 10 },
    classItem: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        // backgroundColor: 'white',
        // ...stylesApp.shadow,
    },
    statisticContainer: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    chartContainer: {
        height: SmartScreenBase.smPercenWidth * 27,
        width: SmartScreenBase.smPercenWidth * 27,
        borderRadius: SmartScreenBase.smPercenWidth * 13,
        backgroundColor: Colors.White,
        alignItems: 'center',
        justifyContent: "center",
        ...stylesApp.shadow,
        marginRight: 20
    },
    chart: {
        height: SmartScreenBase.smPercenWidth * 27,
        width: SmartScreenBase.smPercenWidth * 27,
    },
    statisticDataContainer: { flex: 1, justifyContent: 'space-evenly', marginLeft: 10 },
    statisticItem: { flexDirection: "row", alignItems: "center", flex: 1 },
    statisticType: {
        width: SmartScreenBase.smBaseWidth * 50,
        height: SmartScreenBase.smBaseWidth * 25,
        marginRight: 5,
    },
    statisticText: {
        fontSize: SmartScreenBase.smFontSize * 35,
        // flex: 1,
    },
    viewStudentComplete: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: SmartScreenBase.smBaseHeight * 5
    },
    txtNumberStudent: {
        fontSize: FontSize.size45Font,
        color: Colors._00A79D,
        ...FontWeight.Bold
    },
    viewTab: {
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    btnTab: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: SmartScreenBase.smBaseHeight * 25,
        marginHorizontal: SmartScreenBase.smBaseWidth * 20
    },
    titleTabText: {
        lineHeight: 20,
    },
    horizontal: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    itemAvatar: {
        width: SmartScreenBase.smBaseWidth * 164,
        height: SmartScreenBase.smBaseWidth * 164,
        borderRadius: SmartScreenBase.smBaseWidth * 82,
        borderWidth: 1,
        borderColor: Colors.Orange,
    },
    item: {
        marginTop: SmartScreenBase.smBaseHeight * 10,
        // marginHorizontal: SmartScreenBase.smBaseWidth * 80,
    },
    txtTime: {
        fontSize: SmartScreenBase.smFontSize * 30,
        color: Colors._5E5E5E,
    },
    iconTime: {
        width: SmartScreenBase.smBaseWidth * 38,
        height: SmartScreenBase.smBaseWidth * 38,
        marginRight: 3
    },
    flex1: {
        flex: 1
    },
    infoWrapper: {
        flex: 1,
        justifyContent: 'space-evenly',
        paddingVertical: SmartScreenBase.smBaseWidth * 18,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    flexAndRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1
    },
    viewNotAs: {
        width: SmartScreenBase.smPercenWidth * 12,
        height: SmartScreenBase.smPercenWidth * 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtNotAs: {
        fontSize: SmartScreenBase.smFontSize*42,
        color: Colors.DarkBaseGreen,
        fontFamily: FontBase.MyriadPro_Bold,
        textAlign: "center"
    },
    viewPoint: {
        width: SmartScreenBase.smBaseWidth * 113,
        height: SmartScreenBase.smBaseWidth * 113,
        backgroundColor: Colors._F70000,
        borderRadius: SmartScreenBase.smBaseWidth * 66,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtPoint: {
        fontSize: FontSize.size60Font,
        color: Colors.White,
    },
    viewUnfinished: {
        flex: 1,
        paddingTop: SmartScreenBase.smBaseWidth * 20,
        backgroundColor: Colors.White,
        borderRadius: 15,
        shadowColor: Colors.Black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        marginBottom: SmartScreenBase.smBaseHeight * 10
    },
    viewComplete: {
        flex: 1,
        paddingTop: SmartScreenBase.smBaseWidth * 20,
        backgroundColor: Colors.White,
        borderRadius: 15,
        shadowColor: Colors.Black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        marginBottom: SmartScreenBase.smBaseHeight * 10
    },
    viewRemind: {
        paddingHorizontal: SmartScreenBase.smBaseWidth * 80,
        paddingVertical: SmartScreenBase.smBaseWidth * 20,
        borderRadius: SmartScreenBase.smBaseWidth * 40
    },
    txtRemind: {
        fontSize: FontSize.size40Font,
        color: Colors.White,
        ...FontWeight.SemiBold,
    },
    iconCheck: {
        width: SmartScreenBase.smBaseWidth * 52,
        height: SmartScreenBase.smBaseWidth * 54,
        marginLeft: SmartScreenBase.smBaseWidth * 20
    },
    selectAll: {
        fontSize: FontSize.size40Font,
        ...FontWeight.Bold
    },
    txtReminded: {
        fontSize: SmartScreenBase.smFontSize * 28,
        color: Colors._BB2027,
    },
    viewReminded: {
        borderWidth: 1,
        borderColor: Colors._BB2027,
        padding: SmartScreenBase.smBaseWidth * 5
    },
    viewBodyTab: {
        // backgroundColor: Colors.White,
        marginTop: SmartScreenBase.smBaseHeight * 20,
        flex: 1,
        borderRadius: SmartScreenBase.smBaseWidth * 20,
        marginHorizontal: SmartScreenBase.smBaseWidth * 20
    },
    txtHeader: { fontSize: FontSize.size60Font },
    rightHeader: { width: SmartScreenBase.smBaseWidth * 80, height: SmartScreenBase.smBaseWidth * 80, tintColor: Colors.White },
    marginTop10: { marginTop: SmartScreenBase.smBaseHeight * 10 },
    marginRight40: { marginRight: SmartScreenBase.smBaseWidth * 40 },
    viewEmpty: { alignSelf: 'center', marginTop: 20 },
    chosenAll: { marginHorizontal: SmartScreenBase.smBaseWidth * 20 },
    marginVertical10: { marginVertical: SmartScreenBase.smBaseHeight * 10, paddingHorizontal: SmartScreenBase.smBaseWidth * 80, },
    headerRemind: { marginVertical: SmartScreenBase.smBaseHeight * 10, paddingHorizontal: SmartScreenBase.smBaseWidth * 80, paddingRight: SmartScreenBase.smBaseWidth * 40, },
    marginBottom30: { marginBottom: SmartScreenBase.smBaseHeight * 30, paddingHorizontal: SmartScreenBase.smBaseWidth * 80, },
    flatListContent: { marginBottom: SmartScreenBase.smBaseHeight * 30, paddingLeft: SmartScreenBase.smBaseWidth * 80, paddingRight: SmartScreenBase.smBaseWidth * 40, },
    completeBox: {
        flex: 1, backgroundColor: Colors.White,
        borderRadius: 15
    },
    fontWeight500: { fontWeight: '500' },
    icRemind: {
        width: SmartScreenBase.smBaseWidth * 190,
        height: SmartScreenBase.smBaseWidth * 60,
    },
    txtName: {
        ...FontWeight.Bold,
        flex: 1,
    }
})