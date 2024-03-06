import { Dimensions, StyleSheet } from "react-native";
const BaseWidth = Dimensions.get('screen').width / 100;
const BaseHeight = Dimensions.get('screen').height / 100;

export default StyleSheet.create({
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
    Sty_Tyle_Lesson: {
        alignSelf: "center",
        width: BaseWidth * 85,
        borderRadius: BaseWidth * 6,
        backgroundColor: "rgba(0,0,0,0.3)",
        alignItems: "center",
        justifyContent: "center",
        marginTop: BaseHeight * 3,
        paddingTop: BaseHeight,
        paddingBottom: BaseHeight,
        paddingRight: BaseWidth * 3
    },
    Sty_Text_Type_Lesson: {
        fontSize: BaseWidth * 4.5,
        color: "white",
        textAlign: "center",
        fontWeight: "600",
        marginLeft: BaseWidth * 15
    },
    Sty_BoderD1: {
        width: BaseWidth * 90,
        borderRadius: BaseWidth * 3,
        backgroundColor: "rgba(255,255,255,1)",
        marginTop:BaseHeight
    },
    Sty_But_Check: {
        width: BaseWidth * 65,
        height: BaseHeight * 5.5, borderRadius: BaseHeight * 3,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#01283A"
    },
    Sty_Text_Check: {
        fontSize: BaseHeight * 2.5,
        color: "white",
        fontWeight: "400"
    },
    Sty_BorderD2: {
        height: BaseWidth * 20,
        width: BaseWidth * 35,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    Sty_BorderD4:{
        width:BaseWidth*90,
        padding:BaseHeight,
        marginTop:BaseHeight,
        backgroundColor:"rgba(255,255,255,0.95)",
        borderRadius:BaseWidth*3
    }
})