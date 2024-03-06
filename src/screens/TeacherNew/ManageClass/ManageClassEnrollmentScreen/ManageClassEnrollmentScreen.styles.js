import { StyleSheet } from "react-native";
import SmartScreenBase from "../../../../base/SmartScreenBase";
import { FontSize, FontWeight } from "../../../../styleApp/font";
import { Colors } from "../../../../styleApp/color";

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    checkBox: {
        width: SmartScreenBase.smBaseWidth * 60,
        height: SmartScreenBase.smBaseWidth * 60,
    },
    button: {
    },
    bottomBox: {
        marginBottom: SmartScreenBase.smBaseHeight * 15
    },
    confirmText: {
        fontSize: FontSize.size60Font,
    },
    selectAllButton: {
        flexDirection: 'row',
        alignItems: 'center',
        height: SmartScreenBase.smBaseHeight * 60,
        alignSelf: 'flex-end',
        marginRight: SmartScreenBase.smBaseWidth * 65
    },
    selectAllText: {
        fontSize: FontSize.size50Font,
        ...FontWeight.Bold,
        marginRight: SmartScreenBase.smBaseWidth * 40
    },
    listView: {
        marginHorizontal: SmartScreenBase.smBaseWidth * 30,
        backgroundColor: Colors.White,
        borderRadius: SmartScreenBase.smBaseWidth * 40,
        paddingTop: SmartScreenBase.smBaseHeight * 10,
        marginBottom: SmartScreenBase.smBaseHeight * 10
    },
    itemBox: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: SmartScreenBase.smBaseHeight * 15,
        marginHorizontal: SmartScreenBase.smBaseWidth * 30,
        // borderTopColor: Colors.SuperLightGray,
        // borderTopWidth: 0.75,
        // marginBottom:
    },
    indexText: {
        fontSize: FontSize.size55Font,
        ...FontWeight.Bold,
        marginRight: SmartScreenBase.smBaseWidth * 40
    },
    infoBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: SmartScreenBase.smBaseHeight * 5
    },
    nameText: {
        flex: 1,
        fontSize: FontSize.size50Font
    },
    acceptButton: {
        flex: 1,
        paddingVertical: SmartScreenBase.smPercenHeight * 0.5,
        height: 'auto',
        backgroundColor: Colors._EB8923,
        borderWidth: 0,
        borderRadius: 500,
        marginRight: SmartScreenBase.smBaseWidth * 10
    },
    rejectButton: {
        flex: 1,
        borderWidth: 0,
        height: 'auto',
        borderRadius: 500,
        paddingVertical: SmartScreenBase.smPercenHeight * 0.5,
        backgroundColor: Colors._BCBDBF,
        marginLeft: SmartScreenBase.smBaseWidth * 10
    },
    buttonText: {
        color: Colors.White,
        fontSize: FontSize.size45Font,
    },
    infoContainer: {
        flex: 1,
        marginLeft: SmartScreenBase.smBaseWidth * 40
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
    backgroundColor: { backgroundColor: Colors._F3FFFF, },
    padding0: { padding: 0 },
    borderTopWidth0: { borderTopWidth: 0 }
})