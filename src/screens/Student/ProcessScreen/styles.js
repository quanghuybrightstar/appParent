import { Dimensions ,StyleSheet} from "react-native";
const BaseWidth = Dimensions.get("window").width/100;
const BaseHeight = Dimensions.get("window").height/100;
export default StyleSheet.create({
    Txt_Title:{
        fontWeight:"700",
        fontSize:BaseWidth*5,
        color:"white",
        textAlign:"center"
    },
    Sty_View:{
        width:BaseWidth*90,
        alignSelf:"center",
        borderRadius:BaseWidth*3,
        backgroundColor:"rgba(0,0,0,0.2)",
        alignItems:"center",
        justifyContent:"center"
    },
    Sty_Process:{
        width:BaseWidth*70,
        height:BaseWidth*6,
        borderRadius:BaseWidth,
        backgroundColor:"rgba(255,255,255,0.95)",
        alignItems:"flex-start",
        justifyContent:"center",
        padding:BaseWidth/2
    },
    Sty_View_TT:{
        width:BaseWidth*42,
        height:BaseWidth*42,
        borderRadius:BaseWidth*3,
        backgroundColor:"rgba(0,0,0,0.2)",
        alignItems:"center",
        justifyContent:"center"
    },
    Sty_Process_Skill:{
        width:BaseWidth*55,
        height:BaseWidth*3,
        borderRadius:BaseWidth,
        backgroundColor:"rgba(255,255,255,0.95)",
        alignItems:"flex-start",
        justifyContent:"center",

    }
})