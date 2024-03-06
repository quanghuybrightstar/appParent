import { StyleSheet } from "react-native";
import SmartScreenBase from "../../../../base/SmartScreenBase";
import { Colors } from "../../../../styleApp/color";
import { FontSize, FontWeight } from "../../../../styleApp/font";
import stylesApp from "../../../../styleApp/stylesApp";

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    iconBtn: {
        marginLeft: SmartScreenBase.smBaseWidth * 20
    },
    icon: {
        width: SmartScreenBase.smBaseWidth * 100,
        height: SmartScreenBase.smBaseWidth * 100,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerBox: {
        justifyContent: 'space-between',
        marginHorizontal: SmartScreenBase.smBaseWidth * 30,
        marginVertical: SmartScreenBase.smBaseHeight * 20
    },
    headerText: {
        fontSize: FontSize.size50Font,
        ...FontWeight.Bold
    },
    listView: {
        flex: 1,
        marginHorizontal: SmartScreenBase.smBaseWidth * 30,
        backgroundColor: Colors.White,
        borderRadius: SmartScreenBase.smBaseWidth * 40,
        paddingTop: SmartScreenBase.smBaseHeight * 10,
        marginVertical: SmartScreenBase.smBaseHeight * 10,
        marginBottom: SmartScreenBase.smBaseHeight * 20,
        ...stylesApp.shadow
    },
    itemBox: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: SmartScreenBase.smBaseHeight * 15,
        marginHorizontal: SmartScreenBase.smBaseWidth * 30,
    },
    indexText: {
        fontSize: FontSize.size55Font,
        ...FontWeight.Bold,
        width: 25
    },
    infoContainer: {
        flex: 1,
        marginLeft: SmartScreenBase.smBaseWidth * 40
    },
    infoBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: SmartScreenBase.smBaseHeight * 5
    },
    nameText: {
        // flex: 1,
        fontSize: FontSize.size45Font
    },
    emptyView: {
        height: SmartScreenBase.smPercenHeight * 70,
        // justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: SmartScreenBase.smBaseHeight * 100
    },
    emptyImage: {
        width: '100%',
        height: SmartScreenBase.smBaseHeight * 400
    },
    emptyText: {
        fontSize: FontSize.size55Font,
        textAlign: 'center',
        lineHeight: SmartScreenBase.smBaseHeight * 40
    },
    trashIcon: {
        height: SmartScreenBase.smBaseWidth * 50, width: SmartScreenBase.smBaseHeight * 50,
        resizeMode: 'contain', tintColor: Colors._00cbad
    },
    deleteText: {
        fontSize: FontSize.size50Font
    },
    deleteNameText: {
        fontSize: FontSize.size50Font,
        ...FontWeight.Bold,
        textAlign:'center'
    },
    countBox: {
        position: 'absolute',
        top: - SmartScreenBase.smBaseHeight * 8,
        right: -SmartScreenBase.smBaseWidth * 15,
        width: SmartScreenBase.smBaseWidth * 55,
        height: SmartScreenBase.smBaseWidth * 55,
        borderRadius: SmartScreenBase.smBaseWidth * 55 / 2,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    },
    countText: {
        color: Colors.White,
        lineHeight: SmartScreenBase.smBaseWidth * 55,
        fontSize: FontSize.size35Font,
        ...FontWeight.Bold
    },
    background: { backgroundColor: Colors._F3FFFF },
    marginLeft40: { marginLeft: SmartScreenBase.smBaseWidth * 40 },
    borderTopWidth: { borderTopWidth: 0 },
    borderRadius30: { borderRadius: SmartScreenBase.smPercenWidth * 30 }

})