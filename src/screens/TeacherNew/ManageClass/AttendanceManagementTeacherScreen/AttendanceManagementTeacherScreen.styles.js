import { Platform, StyleSheet } from "react-native";
import SmartScreenBase from "../../../../base/SmartScreenBase";
import { Colors } from "../../../../styleApp/color";
import { FontSize, FontWeight } from "../../../../styleApp/font";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors._F3FFFF,
    },
    listView: {
        marginHorizontal: SmartScreenBase.smBaseWidth * 30,
    },
    titleText: {
        paddingVertical: SmartScreenBase.smBaseHeight * 20,
        marginHorizontal: SmartScreenBase.smBaseWidth * 60,
        fontSize: FontSize.size55Font,
        ...FontWeight.SemiBold
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    emptyView: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: SmartScreenBase.smBaseHeight * 100,
    },
    emptyImage: {
        width: '100%',
        height: SmartScreenBase.smBaseHeight * 400
    },
    emptyText: {
        fontSize: FontSize.size55Font,
        textAlign: 'center',
        lineHeight: SmartScreenBase.smBaseHeight * 40,
        ...FontWeight.Bold,
        marginTop: SmartScreenBase.smBaseHeight * 30
    },
    itemBox: {
        paddingHorizontal: SmartScreenBase.smBaseWidth * 40,
        paddingVertical: SmartScreenBase.smBaseHeight * 10,
        backgroundColor: Colors.White,
        marginHorizontal: SmartScreenBase.smBaseWidth * 10,
        borderRadius: SmartScreenBase.smBaseWidth * 40,
        marginBottom: SmartScreenBase.smBaseHeight * 20
    },
    peopleIcon: {
        width: SmartScreenBase.smBaseWidth * 80,
        height: SmartScreenBase.smBaseWidth * 90
    },
    clockIcon: {
        width: SmartScreenBase.smBaseWidth * 80,
        height: SmartScreenBase.smBaseWidth * 80,
        resizeMode: "contain"
    },
    calendarText: {
        fontSize: FontSize.size50Font,
        ...FontWeight.SemiBold,
        color: Colors.Black,
        paddingTop: SmartScreenBase.smBaseHeight * 7,
        marginLeft: SmartScreenBase.smBaseWidth * 40

    },
    boxShadow: {
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.4,
        shadowColor: '#000000',
        elevation: 4,
    },
    itemInfoBox: {
        flex: 1
    },
    attendanceBox: {
        justifyContent: 'center'
    },
    attendanceText: {
        fontSize: FontSize.size50Font * 2,
        color: Colors._F6921E,
        ...FontWeight.Bold,
        marginLeft: SmartScreenBase.smBaseWidth * 20
    },
    button: {
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: SmartScreenBase.smBaseHeight * 20,
        marginBottom: SmartScreenBase.smBaseHeight * 30,
        borderRadius: SmartScreenBase.smBaseWidth * 100
    },
    buttonText: {
        color: Colors.White,
        ...FontWeight.Bold,
        marginLeft: SmartScreenBase.smBaseWidth * 30,
        fontSize: FontSize.size55Font
    },
    modalBox: {
        backgroundColor: Colors.White,
        height: SmartScreenBase.smBaseHeight * 450,
        paddingVertical: SmartScreenBase.smBaseHeight * 20,
        borderRadius: SmartScreenBase.smBaseWidth * 40,
        width: SmartScreenBase.smPercenWidth * 85
    },
    modalTitleText: {
        fontSize: FontSize.size65Font,
        textAlign: 'center',
        marginVertical: SmartScreenBase.smBaseHeight * 20
    },
    dateButton: {
        backgroundColor: Colors._green04,
        paddingVertical: SmartScreenBase.smBaseHeight * 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: SmartScreenBase.smBaseWidth * 100,
        marginHorizontal: SmartScreenBase.smBaseWidth * 40,
        flexDirection: 'row'
    },
    dateText: {
        fontSize: FontSize.size60Font,
        paddingTop: Platform.OS === 'ios' ? SmartScreenBase.smBaseHeight * 10 : 0,
    },
    calendarSelectIcon: {
        position: 'absolute',
        left: SmartScreenBase.smBaseWidth * 50
    },
    closeIcon: {
        width: SmartScreenBase.smBaseWidth * 56,
        height: SmartScreenBase.smBaseWidth * 56,
    },
    closeButton: {
        position: 'absolute',
        top: SmartScreenBase.smBaseHeight * 15,
        right: SmartScreenBase.smBaseWidth * 25
    },
    btnModal: {
        position: 'absolute', top: 0, left: 0, right: 0,
        bottom: 0, backgroundColor: Colors._00000090,
        alignItems: 'center', justifyContent: 'center',
    },
    flex: {
        flex: 1
    },
    deleteLay: {
        position: 'absolute',
        width: SmartScreenBase.smPercenWidth*13,
        height: SmartScreenBase.smPercenWidth*13,
        bottom: SmartScreenBase.smPercenWidth*0,
        right: SmartScreenBase.smPercenWidth*0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    clockIconDel: {
        width: SmartScreenBase.smBaseWidth * 50,
        height: SmartScreenBase.smBaseWidth * 60,
        resizeMode: 'contain',
        marginRight: SmartScreenBase.smBaseWidth * 20
    },
})