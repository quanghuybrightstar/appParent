import { StyleSheet } from "react-native";
import { Colors } from "../../../styleApp/color";
import { FontSize, FontWeight } from "../../../styleApp/font";
import SmartScreenBase from "../../../base/SmartScreenBase";
export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    viewTitleGrammar: {
        backgroundColor: Colors._47A797,
        paddingVertical: SmartScreenBase.smPercenWidth * 5,
        paddingHorizontal: SmartScreenBase.smPercenWidth * 5
    },
    txtTitle: {
        width: '90%',
        ...FontWeight.Bold,
        fontSize: FontSize.size50Font,
        color: Colors.White
    },
    viewVideo: {
        alignItems: 'center'
    },
    htmlStyle: {
        width: SmartScreenBase.smPercenWidth * 90,
        overflow: 'scroll',
        alignSelf: 'center',
    },
    video: {
        height: SmartScreenBase.smPercenWidth * 70,
        width: SmartScreenBase.smPercenWidth * 100,
        backgroundColor: Colors.Gray
    },
    viewContentGrammar: {
        flex: 1,
        backgroundColor: Colors.White,
        paddingVertical: SmartScreenBase.smPercenWidth * 5,
        marginVertical: SmartScreenBase.smPercenWidth * 3,
        marginHorizontal: SmartScreenBase.smPercenWidth * 1.5,
        borderRadius: SmartScreenBase.smPercenWidth * 4
    },
    txtContent: {
        ...FontWeight.Light,
        fontSize: FontSize.size45Font,
    },
    ImageBackGround: {
        width: SmartScreenBase.smPercenWidth * 100,
        height: SmartScreenBase.smPercenHeight * 100,
        resizeMode: 'cover',
    },
    loading: { flex: 1, position: 'absolute', zIndex: 1000 }

})