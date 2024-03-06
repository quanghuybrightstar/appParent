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
    imgClass: {
        backgroundColor: Colors.Gray,
        width: SmartScreenBase.smPercenWidth * 30,
        height: SmartScreenBase.smPercenWidth * 30,
        marginRight: SmartScreenBase.smBaseHeight * 5,
        borderRadius: SmartScreenBase.smBaseWidth * 15
    },
    rightHeader: {
        width: SmartScreenBase.smPercenWidth * 7,
        height: SmartScreenBase.smPercenWidth * 7,
    },
    classNameContainer: {
        borderRadius: SmartScreenBase.smPercenWidth * 15,
        // paddingHorizontal: SmartScreenBase.smPercenWidth * 15,
        alignItems: 'center',
        paddingVertical: SmartScreenBase.smPercenHeight * 0.5,
    },
    className: {
        textAlign: 'center',
        color: Colors.White,
        fontSize: FontSize.size50Font,
        ...FontWeight.Bold,
        marginTop: Platform.OS ? 3 : 0
    },
    classFullName: {
        color: Colors.Black,
        fontSize: FontSize.size50Font,
        ...FontWeight.SemiBold,
    },
    normalText: {
        color: Colors.Black,
        fontSize: FontSize.size40Font,
        ...FontWeight.SemiBold,
        marginTop: Platform.OS ? 3 : 0
    },
    online: {
        fontSize: FontSize.size55Font,
        color: Colors._00A69C
    },
    offline: {
        fontSize: FontSize.size55Font,
        color: Colors._BE1E2D
    },
    itemOuter: { padding: SmartScreenBase.smPercenWidth * 4, paddingBottom: 0 },
    itemContainer: {
        flexDirection: "row",
        backgroundColor: Colors.White,
        width: '100%',
        borderRadius: SmartScreenBase.smPercenWidth * 2,
        padding: SmartScreenBase.smPercenWidth * 3,
        ...stylesApp.shadow
    },
    itemInfo: { flex: 1, paddingLeft: SmartScreenBase.smPercenWidth * 4 },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // width: '100%',
    },
    infoText: {
        // position: 'absolute',
        width: '80%',
        // left: SmartScreenBase.smPercenWidth * 7,
        ...FontWeight.Regular,
        fontSize: FontSize.size40Font,
        marginLeft: SmartScreenBase.smPercenWidth * 2,
    },
    infoImg: {
        width: SmartScreenBase.smBaseWidth * 50,
        height: SmartScreenBase.smBaseHeight * 50,
    },
    codeImg: {
        width: SmartScreenBase.smBaseWidth * 40,
        height: SmartScreenBase.smBaseHeight * 40,
        marginLeft: SmartScreenBase.smBaseHeight * 3
    },
    codeText: {
        position: 'absolute',
        width: '80%',
        left: SmartScreenBase.smPercenWidth * 7,
        ...FontWeight.Regular,
        fontSize: FontSize.size50Font,
    },
    title: {
        ...FontWeight.Bold,
        fontSize: FontSize.size45Font,
    },
    sectionContainer: {
        backgroundColor: Colors.White,
        width: '100%',
        borderRadius: SmartScreenBase.smPercenWidth * 2,
        padding: SmartScreenBase.smPercenWidth * 3,
        ...stylesApp.shadow
    },
    sectionItem: {
        width: SmartScreenBase.smBaseWidth * 50,
        height: SmartScreenBase.smBaseHeight * 50,
    },
    sectionText: {
        flex: 1,
        ...FontWeight.Regular,
        fontSize: FontSize.size40Font,
        marginHorizontal: SmartScreenBase.smPercenWidth * 2,
    },
    iconNext: {
        width: SmartScreenBase.smBaseWidth * 25,
        height: SmartScreenBase.smBaseHeight * 25,
        tintColor: Colors.Black,
        marginRight: SmartScreenBase.smPercenWidth * 2,
        transform: [
            { rotate: '180deg' }
        ]
    },
    classOuter: { marginBottom: SmartScreenBase.smBaseHeight * 10 },
    function: {
        flexWrap: "wrap",
        justifyContent: 'center',
        flexDirection: "row",
        marginBottom: 30
    },
    row: {
        flexDirection: 'row',
        alignItems: "center",
    },
})