import { Platform, StyleSheet } from "react-native";
import SmartScreenBase from "../../../../component/base/SmartScreenBase";
import { Colors } from "../../../../styleApp/color";
import { FontSize, FontWeight } from "../../../../styleApp/font";
import stylesApp from "../../../../styleApp/stylesApp";


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors._F3FFFF
    },
    errText: {
        color: Colors._E41E27,
        marginTop: SmartScreenBase.smBaseWidth * 25,
        alignSelf: 'center',
        width: '90%',
        fontSize: FontSize.size40Font
    },
    loading: {
        flex: 1, position: 'absolute', zIndex: 100000,
    },
    spacing: {
        marginTop: SmartScreenBase.smPercenHeight * 1.5
    },
    txtStartDate: {
        fontSize: FontSize.size55Font,
        // alignSelf: 'center'
    },
    viewDate: {
        paddingVertical: SmartScreenBase.smBaseHeight * 35,
        width: SmartScreenBase.smPercenWidth * 44,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: SmartScreenBase.smBaseWidth * 30,
    },
    space: {
        width: SmartScreenBase.smBaseWidth * 52,
        paddingHorizontal: SmartScreenBase.smBaseWidth * 30,
    },
    iconRight: {
        width: SmartScreenBase.smBaseWidth * 52,
        height: SmartScreenBase.smBaseWidth * 52,
    },
    title: {
        ...FontWeight.SemiBold,
        fontSize: FontSize.size55Font
    },
    titlePadding: {
        paddingBottom: SmartScreenBase.smBaseWidth * 30,
    },
    date: {
        fontSize: FontSize.size55Font
    },
    viewAdd: {
        marginVertical: SmartScreenBase.smBaseHeight * 15,
        alignSelf: 'center',
    },
    viewBotCv: {
        height: SmartScreenBase.smPercenWidth * 20
    },
    btnDone: {
        alignItems: 'center',
        width: '100%',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: SmartScreenBase.smPercenWidth * 5,
    },
    bgGreen: {
        backgroundColor: Colors._7AE1D4,
        borderRadius: SmartScreenBase.smBaseWidth * 30,
        overflow: 'hidden'
    },
    inputContainer: {
        marginHorizontal: SmartScreenBase.smPercenWidth * 5
    },
    imgContainer: {
        padding: SmartScreenBase.smPercenWidth * 5
    },
    required: {
        color: 'red'
    },
    imgPicker: {
        marginTop: SmartScreenBase.smPercenHeight * 0.5,
        width: '100%',
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: 'white',
        ...stylesApp.shadow,
        paddingVertical: SmartScreenBase.smPercenHeight * 2,
        borderRadius: SmartScreenBase.smPercenWidth * 4,
    },
    imgPlaceholder: {
        flexDirection: 'row',
        backgroundColor: Colors._7AE1D4,
        borderRadius: SmartScreenBase.smPercenWidth * 3,
        padding: SmartScreenBase.smPercenWidth * 3,
        alignItems: 'center',
    },
    imgHolderIcon: {
        width: SmartScreenBase.smBaseWidth * 150,
        height: SmartScreenBase.smBaseWidth * 100,
    },
    addImageTxt: {
        ...FontWeight.Light,
        marginLeft: SmartScreenBase.smPercenWidth * 4,
        fontSize: FontSize.size50Font,
    },
    choosenImage: {
        width: SmartScreenBase.smBaseWidth * 500,
        height: SmartScreenBase.smBaseWidth * 350,
    },
    drop: {
        borderWidth: 1
    },
    marginTop30: { marginTop: SmartScreenBase.smBaseHeight * 30 },
    width40: { width: SmartScreenBase.smPercenWidth * 40 }
})