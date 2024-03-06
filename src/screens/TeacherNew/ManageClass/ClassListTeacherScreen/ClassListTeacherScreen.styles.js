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
    loading: {
        flex: 1, position: 'absolute', zIndex: 100000,
    },
    imgLogo: {
        width: SmartScreenBase.smBaseWidth * 380,
        height: SmartScreenBase.smBaseHeight * 150,
        marginTop: SmartScreenBase.smPercenHeight * 3,
    },
    viewAdd: {
        height: 'auto',
        borderRadius: SmartScreenBase.smBaseHeight * 50,
        marginVertical: SmartScreenBase.smBaseHeight * 15,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    iconadd: {
        tintColor: Colors.White,
        width: SmartScreenBase.smBaseWidth * 50,
        height: SmartScreenBase.smBaseWidth * 50,
        marginRight: SmartScreenBase.smBaseHeight * 25,
    },
    txtAdd: {
        color: Colors.White,
        fontSize: FontSize.size55Font,
        ...FontWeight.SemiBold,
        marginTop: Platform.OS ? 3 : 0
    },
    emptyContainer: {
        // marginTop: SmartScreenBase.smPercenHeight * 10
    },
    emptyImage: {
        width: SmartScreenBase.smPercenWidth * 100,
        height: SmartScreenBase.smPercenHeight * 35,
    },
    emptyText: {
        marginTop: SmartScreenBase.smPercenHeight * 5,
        width: '80%',
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: FontSize.size55Font,
        ...FontWeight.Regular
    },
    plus: {
        width: SmartScreenBase.smBaseWidth * 55,
        height: SmartScreenBase.smBaseWidth * 55,
        marginVertical: SmartScreenBase.smBaseWidth * 25,
        marginRight: SmartScreenBase.smBaseWidth * 30,
    },
    textSty: {
        fontSize: FontSize.size55Font,
        ...FontWeight.Bold,
        color: Colors.White,
    },
    imgClass: {
        backgroundColor: Colors.Gray,
        width: SmartScreenBase.smPercenWidth * 35,
        height: SmartScreenBase.smPercenHeight * 15,
        marginRight: SmartScreenBase.smPercenWidth * 2,
        borderRadius: SmartScreenBase.smBaseWidth * 15
    },
    classNameContainer: {
        borderRadius: SmartScreenBase.smPercenWidth * 15,
        // paddingHorizontal: SmartScreenBase.smPercenWidth * 5,
        alignItems: 'center',
        paddingVertical: SmartScreenBase.smPercenHeight * 0.5,
    },
    className: {
        color: Colors.White,
        fontSize: FontSize.size50Font,
        lineHeight: FontSize.size50Font * 1.2,
        ...FontWeight.Bold,
        // color: Colors.BaseGreen,
        textAlign: "center",
        marginHorizontal: SmartScreenBase.smPercenWidth * 5,
        paddingHorizontal: SmartScreenBase.smBaseWidth * 2,
    },
    classFullName: {
        color: Colors.Black,
        fontSize: FontSize.size50Font,
        ...FontWeight.SemiBold,
    },
    marginTop: {
        marginTop: SmartScreenBase.smPercenHeight * 2
    },
    normalText: {
        color: Colors.Black,
        fontSize: FontSize.size40Font,
        ...FontWeight.SemiBold,
        marginTop: Platform.OS ? 3 : 0
    },
    online: {
        color: Colors._00A69C
    },
    offline: {
        color: Colors._BE1E2D
    },
    itemOuter: { padding: SmartScreenBase.smPercenWidth * 4 },
    itemContainer: {
        flexDirection: "row",
        backgroundColor: 'white',
        width: '100%',
        borderRadius: SmartScreenBase.smPercenWidth * 2,
        padding: SmartScreenBase.smPercenWidth * 2,
        ...stylesApp.shadow
    },
    itemInfo: { flex: 1, paddingHorizontal: SmartScreenBase.smPercenWidth * 2 },
    flex1: { flex: 1 },
    flatlist: { flex: 1, marginTop: SmartScreenBase.smBaseHeight * 50 }

})