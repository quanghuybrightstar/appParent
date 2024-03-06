import { Dimensions, StyleSheet } from "react-native";
const BaseWidth = Dimensions.get('screen').width / 100;
const BaseHeight = Dimensions.get('screen').height / 100;

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
        borderWidth: 1, borderRadius: BaseHeight * 2.5 / 2,
        alignItems: "flex-start", justifyContent: "center"
    },
    Process: {
        height: BaseHeight * 2.5 - 2,
        borderRadius: BaseHeight * 2.5 / 2,
        backgroundColor: "green",
    },
    Sty_txt: {
        fontSize: BaseHeight * 2.3,
        textAlign: "center"
    },
    Sty_But_Check: {
        width: BaseWidth * 65,
        height: BaseHeight * 6, borderRadius: BaseHeight * 3,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "blue"
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
    Sty_Boder_D1:{
        width:BaseWidth*35,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"lightgray",
        marginTop:BaseWidth*2
    },
    Sty_Txt_CheckResuilt:{
        fontSize:BaseHeight*5,
        fontWeight:"bold"
    },
    Sty_Boder_D2:{
        borderWidth:2,
        borderRadius:20,
        justifyContent:"space-evenly",
        height:BaseHeight*16,
        width:BaseWidth*90,
        alignItems:"flex-start",
        paddingLeft:BaseWidth*5,
        marginTop:BaseHeight,
        borderColor:'#E8E8E8'
    },
    modalContent: {
        backgroundColor: "white",
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        borderColor: "rgba(0, 0, 0, 0.1)"
      },

})