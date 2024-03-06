import { Dimensions, StyleSheet } from "react-native";
const BaseWidth = Dimensions.get('screen').width / 100;
const BaseHeight = Dimensions.get("window").height / 100;

export default StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "100%"
    },
    Sty_Width_Screen: {
        width: BaseWidth * 100,
        flexDirection: "row",
        alignItems: "center", justifyContent: "center"
    },
    View_Process: {
        width: BaseWidth * 80,
        height: BaseHeight * 2.5,
        borderRadius: BaseHeight * 2.5 / 2,
        alignItems: "flex-start", justifyContent: "center",
        backgroundColor: "rgba(255,255,255,0.4)"
    },
    Process: {
        height: BaseHeight * 2.5 - 2,
        borderRadius: BaseHeight * 2.5 / 2,
        backgroundColor: "rgba(255,255,255,0.9)",
    },
    Sty_txt: {
        fontSize: BaseWidth * 4,
        textAlign: "center"
    },
    Sty_But_Check: {
        width: BaseWidth * 65,
        height: BaseHeight * 6, borderRadius: BaseHeight * 3,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#01283A"
    },
    Sty_Text_Check: {
        fontSize: BaseHeight * 2.5,
        color: "white",
        fontWeight: "700"
    },
    Sty_Check_Micro: {
        width: BaseHeight * 15,
        height: BaseHeight * 15,
        borderRadius: BaseHeight * 15 / 2,
        borderWidth: 1, borderColor: 'blue',
        alignItems: "center", justifyContent: "center"
    },
    Sty_ImageB3: {
        width: BaseWidth * 90,
        height: BaseHeight * 25,
        borderRadius: 20
    },
    Sty_AnswerB3: {
        width: BaseWidth * 100,
        height: BaseHeight * 10,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderColor: "lightgray",
        alignItems: "center",
        justifyContent: "center",
        marginTop: BaseHeight * 5
    },
    Sty_Txt_CheckResuilt: {
        fontSize: BaseHeight * 5,
        fontWeight: "bold"
    },
    Sty_boder: {
        height: BaseHeight * 5,
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: BaseWidth * 2,
        paddingRight: BaseWidth * 2,
        borderRadius: BaseHeight * 2.5,
        backgroundColor: "lightgreen",
        marginLeft: BaseWidth * 3,
        marginTop: BaseHeight
    },
    Sty_BorderB7: {
        height: BaseWidth * 20,
        width: BaseWidth * 35,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    Sty_Tyle_Lesson: {
        alignSelf: "center",
        width: BaseWidth * 85,
        height: BaseWidth * 12,
        borderRadius: BaseWidth * 6,
        backgroundColor: "rgba(0,0,0,0.3)",
        alignItems: "center",
        justifyContent: "center",
        marginTop: BaseHeight * 3
    },
    Sty_Text_Type_Lesson: {
        fontSize: BaseWidth * 4.5,
        color: "white",
        textAlign: "center",
        fontWeight: "600",
        marginLeft:BaseWidth*15
    },
    Sty_BorderB4: {
        alignSelf: "center",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255,255,255,0.95)",
        borderRadius: BaseWidth * 4,
        borderWidth: BaseWidth * 1.5,
        borderColor: "#56C110",
        paddingTop: BaseWidth * 5,
        paddingBottom: BaseWidth * 5,
        marginTop: BaseHeight * 5
    },
    Sty_BorderB4_Input: {
        width: BaseWidth * 89,
        alignSelf: "center",
        height: BaseHeight * 20,
        backgroundColor: "rgba(255,255,255,0.9)",
        borderRadius: BaseWidth * 4,
        marginTop: BaseWidth * 5,
        padding:BaseWidth*3
    }


})