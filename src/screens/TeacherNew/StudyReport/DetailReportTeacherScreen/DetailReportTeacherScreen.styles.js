import { StyleSheet } from "react-native";
import SmartScreenBase from "../../../../component/base/SmartScreenBase";
import { Colors } from "../../../../styleApp/color";
import { FontSize, FontWeight } from "../../../../styleApp/font";
import stylesApp from "../../../../styleApp/stylesApp";


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors._F3FFFF
    },
    viewYear: {
        alignSelf: 'center',
        marginVertical: SmartScreenBase.smBaseHeight * 15,
        paddingVertical: SmartScreenBase.smBaseHeight * 20,
        borderRadius: SmartScreenBase.smBaseWidth * 55,
        // width: SmartScreenBase.smPercenWidth * 60,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'white',
        ...stylesApp.shadow,
        justifyContent: 'space-between',

    },
    diaryBtnText: {
        fontSize: FontSize.size40Font,
        ...FontWeight.SemiBold
    },
    diaryBtn: {

    },
    khungIcon: {
        width: SmartScreenBase.smBaseWidth * 125,
        height: SmartScreenBase.smBaseWidth * 60,
        alignItems: "center",
        justifyContent: "center",
    },
    iconControl: {
        width: SmartScreenBase.smBaseWidth * 36,
        height: SmartScreenBase.smBaseWidth * 60,
        tintColor: Colors.BaseGreen,
        marginHorizontal: SmartScreenBase.smBaseWidth * 55
    },
    txtYear: {
        fontSize: FontSize.size55Font,
        ...FontWeight.SemiBold,
    },
    infoIcon: {
        width: SmartScreenBase.smBaseWidth * 40,
        height: SmartScreenBase.smBaseWidth * 40,
    },
    name: {
        fontSize: FontSize.size65Font,
        ...FontWeight.SemiBold,
    },
    infoOuter: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SmartScreenBase.smPercenWidth * 5,
        paddingTop: SmartScreenBase.smPercenWidth * 3
    },
    infoContainer: {
        flex: 1,
        marginLeft: SmartScreenBase.smPercenWidth * 5,
        paddingRight: SmartScreenBase.smPercenWidth * 5,
    },
    morInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    morInfoText: {
        fontSize: FontSize.size40Font,
        ...FontWeight.Regular,
        marginLeft: SmartScreenBase.smPercenWidth * 2,
    },
    outerView: {
        padding: SmartScreenBase.smPercenWidth * 2,
        marginHorizontal: SmartScreenBase.smPercenWidth * 3,
    },
    scoreContainer: {
        backgroundColor: 'white',
        width: '100%',
        borderRadius: SmartScreenBase.smPercenWidth * 4,
        ...stylesApp.shadow,
        padding: SmartScreenBase.smPercenWidth * 3,
    },
    scoreHeaderContainer: {
        flexDirection: "row",
        alignItems: 'center',
        marginBottom: SmartScreenBase.smPercenHeight * 1.5,
    },
    loading: {
        flex: 1, position: 'absolute', zIndex: 100000,
    },
    scoreHeader: {
        flex: 1,
        ...FontWeight.Bold,
        fontSize: FontSize.size45Font
    },
    rowOuter: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SmartScreenBase.smPercenHeight,
    },
    normalRow: {
        flex: 1,
        marginRight: SmartScreenBase.smPercenWidth,
        borderRadius: SmartScreenBase.smPercenWidth * 2,
        paddingVertical: SmartScreenBase.smPercenWidth * 1.5,
        paddingHorizontal: SmartScreenBase.smPercenWidth * 2,
    },
    normalValueRow: {
        width: SmartScreenBase.smPercenWidth * 15,
        borderRadius: SmartScreenBase.smPercenWidth * 2,
        paddingVertical: SmartScreenBase.smPercenWidth * 1.5,
        paddingHorizontal: SmartScreenBase.smPercenWidth * 2,
        alignItems: 'center',
    },
    titleSection: {
        backgroundColor: Colors.GrayB6,
    },
    valueSection: {
        backgroundColor: Colors._green04,
    },
    valueText: {
        fontSize: FontSize.size40Font
    },
    avgSection: {
        marginRight: SmartScreenBase.smPercenWidth,
        borderRadius: SmartScreenBase.smPercenWidth * 2,
        paddingVertical: SmartScreenBase.smPercenWidth * 1.5,
        paddingHorizontal: SmartScreenBase.smPercenWidth * 2,
        marginBottom: SmartScreenBase.smPercenHeight,
        justifyContent: "center",
        width: SmartScreenBase.smPercenWidth * 20,
    }
})