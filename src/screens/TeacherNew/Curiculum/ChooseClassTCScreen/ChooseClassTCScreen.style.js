import { StyleSheet } from "react-native";
import FontBase from "../../../../base/FontBase";
import SmartScreenBase from "../../../../base/SmartScreenBase";
import { Colors } from "../../../../styleApp/color";
import { FontSize, FontWeight } from "../../../../styleApp/font";

export const styles = StyleSheet.create({
    body: {
        // paddingVertical: SmartScreenBase.smBaseWidth * 35,
        flex: 1,
    },
    loading: {
        flex: 1, position: 'absolute', zIndex: 100000,
    },
    txtChooseClass: {
        fontSize: FontSize.size55Font,
        marginVertical: SmartScreenBase.smBaseHeight * 40,
        marginHorizontal: SmartScreenBase.smBaseWidth * 35,
        ...FontWeight.Bold
    },
    viewItem: {
        backgroundColor: Colors.White,
        borderRadius: SmartScreenBase.smBaseWidth * 53,
        padding: SmartScreenBase.smBaseWidth * 30,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    imageItem: {
        backgroundColor: Colors.Gray,
        width: SmartScreenBase.smBaseWidth * 357,
        height: SmartScreenBase.smBaseWidth * 357,
        marginRight: SmartScreenBase.smBaseWidth * 50,
        borderRadius: SmartScreenBase.smBaseWidth * 15,

    },
    txtNameClass: {
        color: Colors._00A69C,
        // color: Colors.White,
        fontSize: FontSize.size50Font,
        lineHeight: FontSize.size50Font * 1.2,
        ...FontWeight.Bold,
        // color: Colors.BaseGreen,
        textAlign: "center",
        // marginHorizontal: SmartScreenBase.smPercenWidth * 5,
        paddingHorizontal: SmartScreenBase.smBaseWidth * 2,
    },
    txtNameSchool: {
        fontSize: FontSize.size45Font,
        marginTop: SmartScreenBase.smBaseHeight * 10,
        alignSelf: 'flex-start',
        ...FontWeight.Regular,
        overflow: 'visible',
    },
    viewContent: { flex: 1, alignItems: 'center' },
    flex1: { flex: 1 },
    flatlist: { paddingHorizontal: SmartScreenBase.smBaseWidth * 35, },
})