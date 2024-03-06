import { Platform, StyleSheet } from "react-native";
import FontBase from "../../../../base/FontBase";
import SmartScreenBase from "../../../../base/SmartScreenBase";
import { Colors } from "../../../../styleApp/color";
import { FontSize, FontWeight } from "../../../../styleApp/font";

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    rightHeaderComponent: {
        backgroundColor: Colors.White,
        justifyContent: 'center',
        paddingHorizontal: SmartScreenBase.smPercenWidth * 5,
        paddingVertical: SmartScreenBase.smBaseWidth * 30,
        borderRadius: SmartScreenBase.smPercenWidth * 100,
        overflow: "hidden",
    },
    rightHeaderText: {
        color: Colors.BaseGreen,
        fontFamily: FontBase.MyriadPro_Bold,
        fontSize: FontSize.size40Font
    },
    headerInfoBox: {
        marginTop: SmartScreenBase.smBaseHeight * 20
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    amountText: {
        marginLeft: SmartScreenBase.smBaseWidth * 30,
        fontSize: FontSize.size55Font
    },
    button: {
        paddingHorizontal: SmartScreenBase.smPercenWidth * 12
    },
    bottomBox: {
        marginBottom: SmartScreenBase.smBaseHeight * 15
    },
    selectAllButton: {
        flexDirection: 'row',
        alignItems: 'center',
        height: SmartScreenBase.smBaseHeight * 60,
        alignSelf: 'flex-end',
        marginRight: SmartScreenBase.smBaseWidth * 30
    },
    selectAllText: {
        fontSize: FontSize.size55Font,
        marginRight: SmartScreenBase.smBaseWidth * 40,
        fontFamily: FontBase.MyriadPro_Regular
    },
    listView: {
        marginVertical: SmartScreenBase.smBaseWidth * 20,
        borderRadius: SmartScreenBase.smBaseWidth * 40,
        paddingTop: SmartScreenBase.smBaseHeight * 10
    },
    itemBox: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: SmartScreenBase.smBaseHeight * 15,
        marginHorizontal: SmartScreenBase.smBaseWidth * 20,
        paddingHorizontal: SmartScreenBase.smBaseWidth * 20,
        backgroundColor: Colors.White,
        marginVertical: SmartScreenBase.smBaseHeight * 10,
        borderRadius: SmartScreenBase.smBaseWidth * 30
    },
    infoBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: SmartScreenBase.smBaseHeight * 5
    },
    nameBox: {
        marginVertical: SmartScreenBase.smBaseHeight * 10
    },
    nameText: {
        flex: 1,
        fontSize: FontSize.size45Font,
        fontFamily: FontBase.MyriadPro_Bold
    },
    acceptButton: {
        flex: 1,
        backgroundColor: Colors._EB8923,
        borderWidth: 0,
        marginRight: SmartScreenBase.smBaseWidth * 30,
        height: SmartScreenBase.smBaseHeight * 60,
        borderRadius: SmartScreenBase.smBaseWidth * 100
    },
    rejectButton: {
        flex: 1,
        borderWidth: 0,
        backgroundColor: Colors._BCBDBF,
        marginLeft: SmartScreenBase.smBaseWidth * 10
    },
    buttonText: {
        color: Colors.White,
        ...FontWeight.Regular,
        fontSize: FontSize.size40Font,
        fontWeight: '400',
        paddingTop: SmartScreenBase.smBaseWidth * 5
    },
    bottomButtonText: {
        fontSize: FontSize.size60Font,
        ...FontWeight.Bold,
    },
    infoContainer: {
        flex: 1,
        marginLeft: SmartScreenBase.smBaseWidth * 20
    },
    boxShadow: {
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.4,
        shadowColor: Colors.Black,
        elevation: 4,
    },
    commentTextLabel: {
        fontSize: FontSize.size35Font,
        ...FontWeight.Bold,
    },
    commentText: {
        fontSize: FontSize.size35Font,
        ...FontWeight.LightItalic,
        fontWeight: '400',
    },
    bottomButtonBox: {
        // marginVertical: SmartScreenBase.smBaseHeight * 20,
        alignItems: 'center'
    },
    bottomButton: {
        alignSelf: 'center',
        // paddingHorizontal: SmartScreenBase.smBaseWidth * 120,
        marginVertical: SmartScreenBase.smBaseHeight * 20,
    },
    textInputStyles: {
        height: SmartScreenBase.smBaseHeight * 200,
        paddingTop: SmartScreenBase.smBaseHeight * 10,
        ...FontWeight.LightItalic,
        color: Colors.Black,
        borderRadius: SmartScreenBase.smBaseWidth * 10,
        elevation: 0,
        shadowOpacity: 0,
        borderWidth: 1,
        borderColor: Colors._7F7F7F,
        paddingHorizontal: SmartScreenBase.smBaseHeight * 15
    },
    modal: {
        backgroundColor: Colors.White,
        borderRadius: SmartScreenBase.smBaseWidth * 30,
        padding: SmartScreenBase.smBaseHeight * 30,
        marginHorizontal: SmartScreenBase.smBaseWidth * 30
    },
    icon_close: {
        width: SmartScreenBase.smBaseWidth * 65,
        height: SmartScreenBase.smBaseWidth * 65,
    },
    btnClose: {
        alignSelf: 'flex-end'
    },
    txtTitleModal: {
        fontSize: FontSize.size65Font,
        marginBottom: SmartScreenBase.smBaseHeight * 40,
        ...FontWeight.Bold
    },
    attendanceOptionBox: {
        marginVertical: SmartScreenBase.smBaseHeight * 40,
        paddingHorizontal: SmartScreenBase.smBaseWidth * 20
    },
    rowSelection: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    ic_dot: {
        width: SmartScreenBase.smBaseWidth * 35,
        height: SmartScreenBase.smBaseWidth * 35,
    },
    viewDot: {
        borderWidth: 1,
        borderColor: Colors._686868,
        width: SmartScreenBase.smBaseWidth * 50,
        height: SmartScreenBase.smBaseWidth * 50,
        marginRight: SmartScreenBase.smBaseWidth * 15,
        borderRadius: SmartScreenBase.smPercenWidth * 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtValue: {
        fontSize: FontSize.size55Font,
        color: Colors._686868,
        fontFamily: FontBase.MyriadPro_Light,
    },
    btnSend: {
        alignSelf: 'center',
        marginTop: SmartScreenBase.smBaseHeight * 20,
    },
    padding0: { padding: 0 },
    viewModal: {
        margin: 0,
        backgroundColor: Colors._00000070
    },
    marginBottom15: { marginBottom: 15 },
    viewPopup: { marginVertical: 0, paddingVertical: 0 },
    txtMessage: { paddingVertical: 0 },
    txtbtn: { fontFamily: FontBase.MyriadPro_Bold },
    modalBox: {
        paddingBottom: SmartScreenBase.smBaseHeight * 40,
        paddingTop: SmartScreenBase.smBaseHeight * 40,
    },
    messageModalStyle: {
        marginBottom: SmartScreenBase.smBaseHeight * 20,
        color: Colors.Black,
        fontSize: FontSize.size55Font,
        lineHeight: SmartScreenBase.smBaseHeight * 40
    },
    messageDeleteStyle: {
        marginBottom: 0,
        paddingBottom: 0
    },
    childModal: {
        flexDirection: "row",
        width: "100%",
        height: SmartScreenBase.smPercenWidth * 10,
        alignItems: "center",
    },
})