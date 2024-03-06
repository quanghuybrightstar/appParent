import { StyleSheet } from "react-native";
import SmartScreenBase from "../../../../component/base/SmartScreenBase";
import { Colors } from "../../../../styleApp/color";
import { FontSize, FontWeight } from "../../../../styleApp/font";
import stylesApp from "../../../../styleApp/stylesApp";
import FontBase from "../../../../base/FontBase";


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
        justifyContent: 'space-between',

    },
    iconControl: {
        width: SmartScreenBase.smBaseWidth * 21,
        height: SmartScreenBase.smBaseWidth * 41,
        marginHorizontal: SmartScreenBase.smBaseWidth * 55,
    },
    txtYear: {
        fontSize: FontSize.size55Font,
        fontFamily: FontBase.MyriadPro_Bold,
        color: Colors.White,
    },
    tabBar: {
        // height: SmartScreenBase.smPercenHeight * 0.5,
        width: SmartScreenBase.smPercenWidth * 44,
        marginHorizontal: SmartScreenBase.smPercenWidth * 3,
        borderColor: Colors.Orange,
        borderBottomWidth: 3
    },
    tabBarContainer: {
        backgroundColor: 'transparent',
    },
    tabbar: {
        fontSize: FontSize.size45Font,
        lineHeight: SmartScreenBase.smBaseHeight * 35,
    }
})