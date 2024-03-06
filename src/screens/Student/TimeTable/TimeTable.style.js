import { Platform, StyleSheet } from "react-native";
import FontBase from "../../../base/FontBase";
import SmartScreenBase from "../../../base/SmartScreenBase";
import { Colors } from "../../../styleApp/color";
import { FontSize, FontWeight } from "../../../styleApp/font";
import stylesApp from "../../../styleApp/stylesApp";
const HourItemHeight = SmartScreenBase.smBaseWidth * 240
export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    containerWithButton: {
        paddingBottom: SmartScreenBase.smPercenHeight * 26
    },
    containerWithoutButton: {
        paddingBottom: SmartScreenBase.smPercenHeight * 20
    },
    headerBox: {
        height: SmartScreenBase.smBaseHeight * 65,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: SmartScreenBase.smBaseHeight * 15
    },
    textHeader: {
        color: Colors.White,
        fontSize: SmartScreenBase.smPercenHeight * 2.5,
        ...FontWeight.Bold,
        fontSize: FontSize.size45Font
    },
    textHour: {
        backgroundColor: Colors.White,
        marginBottom: -3,
        width: '90%',
        textAlign: 'right',
        fontSize: FontSize.size40Font,
        ...FontWeight.Bold,
    },
    hourBox: {
        height: HourItemHeight,
        borderWidth: 0.7,
        borderColor: Colors._ccc,
        borderTopWidth: 0,
        borderRightWidth: 0,
        justifyContent: 'flex-end'
    },
    itemBox: {
        height: HourItemHeight,
        borderWidth: 0.7,
        borderColor: Colors._ccc,
        borderRightWidth: 0,
        borderTopWidth: 0
    },
    lessionItem: {
        position: 'absolute',
        borderRadius: 7,
        left: 1, right: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    lessonText: {
        color: Colors.White,
        fontSize: SmartScreenBase.smPercenHeight * 2,
        ...FontWeight.Bold,
        lineHeight: SmartScreenBase.smPercenHeight * 2.2,

    },
    viewWeekend: { flexDirection: 'row', paddingRight: SmartScreenBase.smBaseWidth * 25, backgroundColor: Colors._01A79E },
    viewItemCalendar: {
        flexDirection: 'row', marginRight: SmartScreenBase.smBaseWidth * 15, marginTop: -SmartScreenBase.smBaseHeight * 50,
    },
    footer: {
        flexDirection: "row", justifyContent: 'space-between', alignItems: 'center',
        marginVertical: SmartScreenBase.smBaseHeight * 10,
        marginHorizontal: SmartScreenBase.smBaseWidth * 30,
        paddingVertical: SmartScreenBase.smBaseHeight * 30,
    },
    loadingView: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors._gray06,
        paddingBottom: SmartScreenBase.smPercenHeight * 26 + 35
    },
    applyText: {
        ...FontWeight.Bold,
        fontSize: FontSize.size45Font
    },
    dateText: {
        color: Colors.BaseGreen,
        ...FontWeight.Bold,
        fontSize: FontSize.size45Font
    },
    dateIcon: {
        width: SmartScreenBase.smBaseWidth * 55, height: SmartScreenBase.smBaseWidth * 55,
        tintColor: Colors.BaseGreen,
        transform: [{ rotate: '180deg' }]
    },
    dateBox: { flexDirection: 'row', alignItems: 'center' },
    flex1: { flex: 1 },
    detailSubjectInput: {
        backgroundColor: Colors.White,
        borderRadius: SmartScreenBase.smBaseWidth * 500,
        borderWidth: 0.5,
        marginVertical: SmartScreenBase.smBaseWidth * 45,
        borderColor: Colors._707070,
        shadowColor: Colors.Black,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        height: SmartScreenBase.smBaseHeight * 65,
        elevation: 3,
        alignItems: 'center', justifyContent: 'center'
    },
    remindWrapper: {
        alignItems: 'center',
        marginBottom: SmartScreenBase.smBaseWidth * 30,
    }
})


export const AddLessonStyle = StyleSheet.create({
    modalContent: { flexGrow: 1, justifyContent: 'center', marginHorizontal: SmartScreenBase.smBaseWidth * 50 },
    content: {
        backgroundColor: Colors.White, borderRadius: 10,
        paddingTop: SmartScreenBase.smPercenHeight * 2,
        paddingBottom: SmartScreenBase.smPercenHeight * 2,
        paddingHorizontal: SmartScreenBase.smBaseWidth * 50
    },
    txtErr: {
        color: Colors.Red,
        marginTop: SmartScreenBase.smBaseHeight * 15,
        ...FontWeight.LightItalic,
        // alignSelf: 'center',
        // marginBottom: -SmartScreenBase.smBaseHeight * 30,
    },
    title: { ...FontWeight.Bold, fontSize: FontSize.size55Font, marginBottom: SmartScreenBase.smBaseHeight * 10 },
    timeSelect: { flexDirection: 'row', backgroundColor: Colors._A0F1E7, borderRadius: SmartScreenBase.smBaseWidth * 15, height: SmartScreenBase.smBaseHeight * 90 },
    startTime: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors._4DE8D6, borderRadius: SmartScreenBase.smBaseWidth * 15 },
    endTime: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    sectionContainer: { marginTop: SmartScreenBase.smBaseHeight * 30 },
    subject: {
        color: Colors.Black,
        paddingVertical: Platform.OS === 'ios' ? SmartScreenBase.smBaseWidth * 35 : SmartScreenBase.smBaseWidth * 15,
        color: Colors.Black,
        ...FontWeight.Regular
    },
    timeText: {
        ...FontWeight.LightItalic, fontSize: FontSize.size50Font
    },
    remindText: { ...FontWeight.Bold, fontSize: FontSize.size55Font },
    remindSection: { flexDirection: 'row', alignItems: 'center', paddingRight: SmartScreenBase.smBaseWidth15, marginTop: SmartScreenBase.smBaseHeight * 10 },
    minuteInput: {
        color: Colors.Black,
        ...FontWeight.Regular,
        textAlign: 'center',
        minWidth: SmartScreenBase.smBaseWidth * 170,
        paddingVertical: Platform.OS === 'ios' ? SmartScreenBase.smBaseWidth * 25 : SmartScreenBase.smBaseWidth * 5,
    },
    minuteText: { paddingHorizontal: SmartScreenBase.smBaseWidth * 30, fontFamily: FontBase.MyriadPro_Regular },
    notyText: { marginLeft: SmartScreenBase.smPercenWidth*9, marginTop: SmartScreenBase.smPercenWidth*2, textAlign: 'left', width: SmartScreenBase.smPercenWidth*82, fontFamily: FontBase.MyriadPro_It },
    btnContainer: { flexDirection: 'row', justifyContent: 'space-evenly', marginTop: SmartScreenBase.smBaseHeight * 30 },
    btn: { width: SmartScreenBase.smPercenWidth * 30 },
    checkBox: {
        marginRight: SmartScreenBase.smBaseWidth * 30,
    },
    shadow: {
        ...stylesApp.shadow,
        backgroundColor: Colors.White,
        borderWidth: 1, borderColor: Colors._ccc,
        borderRadius: SmartScreenBase.smBaseWidth * 65,
        paddingHorizontal: SmartScreenBase.smBaseWidth * 30,
        marginHorizontal: SmartScreenBase.smBaseWidth * 5
    },
})

export const ConfirmResetStyle = StyleSheet.create({
    container: {
        backgroundColor: Colors.White, borderRadius: 10,
        paddingTop: SmartScreenBase.smPercenHeight * 3,
        paddingBottom: SmartScreenBase.smPercenHeight * 2,
        paddingHorizontal: SmartScreenBase.smPercenHeight * 2
    },
    resetTitle: { ...FontWeight.SemiBold, fontSize: FontSize.size55Font, textAlign: 'center' },
    resetMessage: {
        fontSize: SmartScreenBase.smPercenHeight * 2,
        fontStyle: "normal",
        textAlign: 'center',
        ...FontWeight.LightItalic,
        color: Colors._424143,
        marginHorizontal: SmartScreenBase.smPercenWidth * 8,
        marginBottom: SmartScreenBase.smBaseHeight * 30,
        marginTop: SmartScreenBase.smBaseHeight * 20
    },
    btnContainer: { flexDirection: 'row', justifyContent: 'space-evenly', marginTop: SmartScreenBase.smBaseHeight * 10 },
    btn: { width: SmartScreenBase.smPercenWidth * 30 }
})