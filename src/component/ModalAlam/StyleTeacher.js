import {StyleSheet} from "react-native"
import SmartScreenBase from "../../base/SmartScreenBase";
SmartScreenBase.baseSetup();
export default StyleSheet.create({
    ImageBackGround :{
        width:SmartScreenBase.smPercenWidth*100,
        height:SmartScreenBase.smPercenHeight*100,
        resizeMode:"stretch"
    },
    LogoTeacher:{
        width:SmartScreenBase.smBaseWidth*480,
        height:SmartScreenBase.smBaseWidth*289,
        resizeMode:"contain",
        position:"absolute",
        top:-SmartScreenBase.smPercenHeight*2,
        left:-SmartScreenBase.smPercenWidth*5
    },
    ViewHeader:{
        width:SmartScreenBase.smPercenWidth*100,
        height:SmartScreenBase.smPercenWidth*12,
        backgroundColor:"rgba(0,0,0,0.3)",
        flexDirection:"row"
    },
    Item_View_Class:{
        width:SmartScreenBase.smPercenWidth*90,
        paddingVertical:SmartScreenBase.smPercenHeight,
        borderRadius:SmartScreenBase.smPercenWidth*3,
        backgroundColor:"rgba(255,255,255,0.95)",
        alignItems:"center",
        justifyContent:"center",
        marginTop:SmartScreenBase.smPercenHeight*2
    },
    txt_Title:{
        fontWeight:"800",
        color:"black",
        fontSize:SmartScreenBase.smPercenWidth*5
    },
    imageFooter:{
        width:SmartScreenBase.smBaseWidth*1144,
        height:SmartScreenBase.smBaseWidth*207,
        resizeMode:"contain",
        position:"absolute",
        bottom:200,
    },
    Sty_Button:{
        width:SmartScreenBase.smPercenWidth*30,
        height:SmartScreenBase.smPercenWidth*8,
        backgroundColor:"rgb(238,140,34)",
        alignItems:"center",
        justifyContent:"center",
        borderRadius:SmartScreenBase.smPercenWidth*3
    },
    Sty_TXT_Button:{
        fontSize:SmartScreenBase.smPercenWidth*4,
        color:"white",
        fontWeight:"400"
    },
    Header_Delete:{
        width:SmartScreenBase.smPercenWidth*100,
        height:SmartScreenBase.smPercenHeight*15,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"rgba(255,255,255,0.9)"
    },
    txt:{
        fontSize:SmartScreenBase.smPercenWidth*4,
        color:"black"
    },
    ImageList:{
        width:SmartScreenBase.smPercenWidth*100,
        height:SmartScreenBase.smPercenHeight*4,
        resizeMode:"cover",
        transform:[{rotate:"180deg"}]
    },
    ImageItem:{
        width:SmartScreenBase.smBaseWidth*145,
        height:SmartScreenBase.smBaseWidth*250,
        resizeMode:"contain"
    },
    ImageFunction:{
        width:SmartScreenBase.smBaseWidth*350,
        height:SmartScreenBase.smBaseWidth*350,
        resizeMode:"contain"
    },
    ViewItemList:{
        width:SmartScreenBase.smPercenWidth*90,
        padding:SmartScreenBase.smPercenWidth*2,
        backgroundColor:"white",
        borderRadius:SmartScreenBase.smPercenWidth*3,
        flexDirection:"row",
        marginTop:SmartScreenBase.smPercenHeight
    },
    modalContent: {
        backgroundColor: "white",
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        borderColor: "rgba(0, 0, 0, 0.1)"
    },
    Sty_View_Func_item_1:{
        width:SmartScreenBase.smPercenWidth*100,
        backgroundColor:"rgba(255,255,255,0.9)",
        paddingVertical:SmartScreenBase.smPercenHeight,
        alignItems:"center"
    },
    Sty_View_Func_item_2:{
        width:SmartScreenBase.smPercenWidth*90,
        justifyContent:"space-between",
        flexDirection:"row",
        paddingVertical:SmartScreenBase.smPercenHeight*1.5,
        borderBottomWidth:1,
        borderColor:"#CCCCCC"
    }
});
