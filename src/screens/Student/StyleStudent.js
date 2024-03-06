import { Dimensions, StyleSheet } from "react-native";
import {Platform} from 'react-native';
import SmartScreenBase from "../../base/SmartScreenBase";
import font from '../../base/FontBase';

SmartScreenBase.baseSetup();
const wid = Dimensions.get('window').width;
const hei = Dimensions.get('window').height;
export default StyleSheet.create({
    text: {
        fontSize: SmartScreenBase.smPercenWidth * 4,
        textAlign: "center",
    },
    txt:{
        fontSize: SmartScreenBase.smPercenWidth * 4,
        fontFamily:font.MyriadPro_Light
    },
    container: {
        flex: 1,
        width: SmartScreenBase.smPercenWidth * 100,
        height: SmartScreenBase.smPercenHeight * 100,
    },
    txt_title: {
        fontSize: SmartScreenBase.smPercenWidth * 4.5,
        marginVertical:SmartScreenBase.smPercenHeight,
        fontFamily:font.MyriadPro_Bold
    },
    Sty_Buttom: {
        width: SmartScreenBase.smPercenWidth * 35,
        height: SmartScreenBase.smPercenHeight * 4,
        borderRadius: SmartScreenBase.smPercenWidth*5,
        alignItems: "center", justifyContent: "center",
        backgroundColor: "#EBB318"
    },
    Sty_txt_Buttom: {
        fontSize: SmartScreenBase.smPercenWidth * 4,
        textAlign: "center",
        color: "white"
    },
    Sty_Header:{
        width:SmartScreenBase.smPercenWidth*100,
        height:SmartScreenBase.smPercenWidth*15,
        backgroundColor:"rgba(0,0,0,0.3)",
        justifyContent:"center"
    },
    Sty_Text_Header: {
        fontSize: SmartScreenBase.smPercenWidth * 6,
        color:'white',
        fontWeight:'bold',
        marginLeft:SmartScreenBase.smPercenWidth
    },
    modalContent: {
        backgroundColor: "#FFF3FA",
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        borderColor: "rgba(0, 0, 0, 0.1)"
    },
    Sty_ImageBackground: {
        width: SmartScreenBase.smPercenWidth * 100,
        height: SmartScreenBase.smPercenHeight * 100,
        resizeMode: 'stretch'
    },
    imageFooter: {
        width: SmartScreenBase.smBaseWidth * 1144,
        height: SmartScreenBase.smBaseWidth * 207,
        resizeMode: "contain",
        position: "absolute",
        bottom: SmartScreenBase.smPercenHeight
    },
    ImageLogo: {
        width: SmartScreenBase.smBaseWidth * 369,
        height: SmartScreenBase.smBaseWidth * 236,
        resizeMode: "contain",
    },
    ViewButton: {
        width: SmartScreenBase.smPercenWidth * 60,
        height: SmartScreenBase.smPercenHeight * 6,
        borderRadius: SmartScreenBase.smPercenHeight * 3,
        backgroundColor: "#EBB318",
        alignItems: "center",
        justifyContent: "center"
    },
    ViewComponent:{
        width:SmartScreenBase.smPercenWidth*95,
        paddingTop:SmartScreenBase.smPercenWidth*2,
        backgroundColor:'rgba(255,255,255,0.9)',
        borderRadius:SmartScreenBase.smPercenWidth*3,
        paddingBottom:SmartScreenBase.smPercenHeight,
        marginTop:SmartScreenBase.smPercenHeight
    },
    ViewBoxTT:{
        backgroundColor:'#3399FF',
        width:SmartScreenBase.smPercenWidth*15,
        borderRadius:SmartScreenBase.smPercenWidth*2,
        alignItems:"center",
        justifyContent:"center",
        paddingVertical:SmartScreenBase.smPercenWidth,
        marginVertical:SmartScreenBase.smPercenHeight*2
    },
    FontText:{
        fontSize:hei/wid*5,
        color:"black",
        fontWeight:"500"
    },
    FontTextTitle:{
        fontSize:hei/wid*13,
        color:"black",
        fontWeight:"bold"
    },
    TextBold:{
        fontSize:SmartScreenBase.smPercenWidth*5,
        color:"#FFFF00",
        fontFamily:font.MyriadPro_Bold
    }
})