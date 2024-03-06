import { Platform, StyleSheet } from "react-native";
import SmartScreenBase from "../../../../base/SmartScreenBase";
import { Colors } from "../../../../styleApp/color";
import { FontSize, FontWeight } from "../../../../styleApp/font";
import stylesApp from "../../../../styleApp/stylesApp";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors._F3FFFF,
    },
    imgLogo: {
        width: SmartScreenBase.smBaseWidth * 380,
        height: SmartScreenBase.smBaseHeight * 150,
        marginTop: SmartScreenBase.smPercenHeight * 3
    },
    scrollview: {
        flex: 1,
        marginTop: SmartScreenBase.ratio >= 1.85 ? SmartScreenBase.smPercenHeight * 5 : 0,
        //height: SmartScreenBase.smPercenWidth* 127,
        // paddingBottom: SmartScreenBase.smPercenHeight * 10
    },
    content: {
        height: SmartScreenBase.smPercenWidth* 138,
        width: SmartScreenBase.smPercenWidth* 100,
    },
    body: {
        paddingHorizontal: SmartScreenBase.smPercenWidth * 6
    },
    txtCurriSundayEnglish: {
        fontSize: FontSize.size55Font,
        ...FontWeight.Bold,

    },
    horizontal: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    viewFilter: {
        borderWidth: 1,
        borderColor: Colors.BaseGreen,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: SmartScreenBase.smBaseWidth * 40,
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconFilter: {
        width: SmartScreenBase.smBaseWidth * 45,
        height: SmartScreenBase.smBaseHeight * 24,
    },
    txtFilter: {
        fontSize: FontSize.size40Font,
        color: Colors.BaseGreen,
        ...FontWeight.SemiBold

    },
    border: {
        borderRightWidth: 1,
        borderColor: Colors.BaseGreen,
        height: SmartScreenBase.smBaseHeight * 24,
        marginHorizontal: 10

    },
    renderTabbar: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: SmartScreenBase.smPercenHeight,
        width: SmartScreenBase.smPercenWidth * 80,
        marginHorizontal: SmartScreenBase.smPercenWidth * 4,
    },
    renderItemTabbar: {
        height: SmartScreenBase.smPercenWidth * 6,
        borderBottomColor: Colors._f5bb43,
    },
    scene: {
        flex: 1,
        marginTop: SmartScreenBase.smPercenHeight * 2,
        // paddingHorizontal: SmartScreenBase.smPercenWidth * 5
    },
    renderItem: {
        width: SmartScreenBase.smPercenWidth * 45,
        // height: SmartScreenBase.smPercenWidth * 45,
        marginBottom: SmartScreenBase.smBaseWidth * 40,
        marginRight: SmartScreenBase.smBaseWidth * 20,
        borderRadius: SmartScreenBase.smBaseWidth * 20,
        backgroundColor: Colors.White,
        // justifyContent: 'center',
        paddingHorizontal: SmartScreenBase.smBaseWidth * 15,
        // marginTop: 10,
        paddingVertical: SmartScreenBase.smBaseWidth * 20,
        shadowColor: Colors.Black,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    imgItem: {
        // backgroundColor: 'red',
        width: SmartScreenBase.smPercenWidth * 42,
        height: SmartScreenBase.ratio >= 1.85 ? SmartScreenBase.smPercenWidth * 30 : SmartScreenBase.smPercenWidth * 28,
        borderRadius: SmartScreenBase.smBaseWidth * 20,
    },
    txtNameItem: {
        marginTop: SmartScreenBase.smBaseWidth * 20,
        fontSize: FontSize.size40Font,
        ...FontWeight.SemiBold,
        color: Colors._00A69C
    },
    txtNumberCount: {
        fontSize: FontSize.size40Font,
        ...FontWeight.Light,
    },
    btnTab: {
        flex: 1, justifyContent: 'center', alignItems: 'center',
    },
    viewAdd: {
        paddingHorizontal: SmartScreenBase.smPercenWidth * 3,
        paddingVertical: 2,
        borderRadius: SmartScreenBase.smBaseWidth * 40,
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconadd: {
        tintColor: Colors.White,
        width: SmartScreenBase.smBaseWidth * 40,
        height: SmartScreenBase.smBaseHeight * 20,
        marginRight: SmartScreenBase.smBaseHeight * 15,
    },
    txtAdd: {
        color: Colors.White,
        fontSize: FontSize.size40Font,
        ...FontWeight.Regular
    },
    tabview1: { 
        height: SmartScreenBase.ratio >= 1.85 ? SmartScreenBase.smPercenWidth*63 : SmartScreenBase.smPercenWidth*61 
    },
    tabview2: { 
        height: SmartScreenBase.ratio >= 1.85 ? SmartScreenBase.smPercenWidth*63 : SmartScreenBase.smPercenWidth*61 
    },
    width4: { width: (SmartScreenBase.smPercenWidth * 65 / 4) },
    width2: { width: (SmartScreenBase.smPercenWidth * 65 / 2) },
    flex1: { flex: 1 },
    flatlist: { justifyContent: 'center', paddingHorizontal: SmartScreenBase.smPercenWidth * 5 },
    viewFav: { paddingHorizontal: SmartScreenBase.smPercenWidth * 5 },
    txtEmpty: {
        flex: 1,
        width: SmartScreenBase.smPercenWidth * 90
    }

})