import { Dimensions, StyleSheet } from "react-native";
import SmartScreenBase from "../../../base/SmartScreenBase";
SmartScreenBase.baseSetup();
export default StyleSheet.create({
    Container: {
        width: SmartScreenBase.smPercenHeight * 100,
        height: SmartScreenBase.smPercenHeight * 100,
    },
    imageBG: {
        width: SmartScreenBase.smPercenHeight * 100,
        height: SmartScreenBase.smPercenHeight * 100,
        alignItems: "center",

    },
    header: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        backgroundColor: "rgba(232 ,232, 232, 0.4)",
        width: SmartScreenBase.smPercenHeight * 100
    },
    flexHeader: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row"
    },
    sty_Icon: {
        fontSize: SmartScreenBase.smPercenHeight * 4
    },
    txt: {
        fontSize: SmartScreenBase.smPercenHeight * 2.5
    },
    contentUnit: {
        alignItems: "center",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        paddingTop: SmartScreenBase.smPercenHeight * 2,
        zIndex: 0,
        width: SmartScreenBase.smPercenWidth * 100
    },
    contentFirst: {
        width: SmartScreenBase.smPercenWidth * 94,
        height: SmartScreenBase.smPercenHeight * 25,
        alignItems: "center",
        borderRadius: 20,
        justifyContent: "space-evenly", backgroundColor: "rgba(255,255,255,0.95)",
        marginHorizontal: SmartScreenBase.smPercenHeight * 3,

    },
    contentScro: {
        width: SmartScreenBase.smPercenHeight * 25,
        height: SmartScreenBase.smPercenHeight * 13,
        alignItems: "center", marginRight: SmartScreenBase.smPercenHeight * 1.5,
        borderRadius: SmartScreenBase.smPercenWidth * 5,
        justifyContent: "space-evenly", backgroundColor: "rgba(255,255,255,0.95)"
    },
    sty_footer: {
        backgroundColor: "#006633",
        height: SmartScreenBase.smPercenHeight * 7,
        width: SmartScreenBase.smPercenHeight * 100,
        flexDirection: "row",
        justifyContent: "space-evenly",
        position: "absolute", bottom: 0
    },
    sty_footer_tap: {
        alignItems: "center", justifyContent: "center", height: SmartScreenBase.smPercenHeight * 7
    },
    Sty_Content_Teach: {
        width: SmartScreenBase.smPercenWidth * 29,
        height: SmartScreenBase.smPercenHeight * 20,
        alignItems: "center",
        borderRadius: 45, justifyContent: "space-evenly", backgroundColor: "rgba(0,0,0,0.5)",
        borderTopLeftRadius: SmartScreenBase.smPercenWidth * 10,
        borderTopRightRadius: SmartScreenBase.smPercenWidth * 10
    }
})