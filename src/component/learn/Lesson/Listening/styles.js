import { Dimensions, StyleSheet } from "react-native";
const BaseWidth = Dimensions.get('window').width / 100;
const BaseHeight = Dimensions.get('window').height / 100;
const { width, height } = Dimensions.get('window');
export default StyleSheet.create({

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
    Sty_BorderD1: {
        width: BaseWidth * 90,
        padding: BaseHeight,
        marginTop: BaseHeight,
        borderRadius: BaseWidth * 3,
        backgroundColor: "rgba(255,255,255,0.95)"
    },
    Sty_Image_Large: {
        width: BaseWidth * 30,
        height: BaseWidth * 30,
        resizeMode: "contain"
    },
    txt:{
        fontWeight:"400",
        fontSize:BaseWidth*3.5
    },
    Sty_Image_Small: {
        width: BaseWidth * 5,
        height: BaseWidth * 5,
        resizeMode: "contain"
    },
    RenderQuestionView:{
        paddingVertical:10,
        width:width*0.9,backgroundColor:'#FFF', borderRadius:10,marginLeft:width*0.05, marginTop:10,
    }
})
