import {StyleSheet} from "react-native";
import FontBase from "../../../base/FontBase";
import SmartScreenBase from "../../../base/SmartScreenBase";
import {Colors} from "../../../styleApp/color";
import { width } from "../../ListSkillScreen/style";

export default StyleSheet.create({

    centerLayout:{
        flex: 1
    },

    commentView:{
        marginLeft: SmartScreenBase.smPercenWidth*5,
        marginTop: SmartScreenBase.smPercenWidth*2.5,
        width: SmartScreenBase.smPercenWidth*90,
        flexDirection: 'column'

    },

    smallIconBt:{
        backgroundColor: Colors.BaseGreen,
        borderRadius: SmartScreenBase.smPercenWidth*2,
        width: SmartScreenBase.smPercenWidth*11,
        height: SmartScreenBase.smPercenWidth*8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    bigIconBt:{
        backgroundColor: Colors.Orange,
        borderRadius: SmartScreenBase.smPercenWidth*10,
        width: SmartScreenBase.smPercenWidth*32,
        height: SmartScreenBase.smPercenWidth*11,
        flexDirection: 'row',
        alignItems: 'center',
    },
 
    reusultAIBox:{
        marginTop: SmartScreenBase.smPercenWidth*2,
        marginLeft: SmartScreenBase.smPercenWidth*4,
        width: SmartScreenBase.smPercenWidth*92,
        height: SmartScreenBase.smPercenWidth*25,
        borderRadius: SmartScreenBase.smPercenWidth*5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },

    reusultAIMono:{
        width: SmartScreenBase.smPercenWidth*40,
        height: "100%",
        borderRadius: SmartScreenBase.smPercenWidth*5,
        flexDirection: 'column',
        alignItems: 'center',
    },

    ExcView:{
        marginLeft: SmartScreenBase.smPercenWidth*4,
        marginTop: SmartScreenBase.smPercenWidth*5.5,
        marginBottom: SmartScreenBase.smPercenWidth*2,
        width: SmartScreenBase.smPercenWidth*92,
        flexDirection: 'column'
    },

    ExcTop:{
        marginTop: SmartScreenBase.smPercenWidth*2.5,
        width: SmartScreenBase.smPercenWidth*92,
        position: 'absolute',
        top: -SmartScreenBase.smPercenWidth*5,
        left: SmartScreenBase.smPercenWidth,
        zIndex: 2,
        flexDirection: 'row',
        elevation: 6,
        alignItems: 'center'
    },

    textSum:{
        marginTop: SmartScreenBase.smPercenWidth*0.5,
        marginBottom: SmartScreenBase.smPercenWidth*2,
        width: SmartScreenBase.smPercenWidth*90,
        fontFamily: FontBase.MyriadPro_Bold,
        fontSize: SmartScreenBase.smFontSize*45,
        color: Colors.Black 
    },

    ExcBody:{
        backgroundColor: Colors.White,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: 'black',
        shadowOpacity: 0.3,
        elevation: 5,
        borderRadius: SmartScreenBase.smPercenWidth*3,
        marginTop: SmartScreenBase.smPercenWidth*3,
        paddingHorizontal: SmartScreenBase.smPercenWidth*2,
        paddingBottom: SmartScreenBase.smPercenWidth*2
    },

    BotButton:{
        marginTop: SmartScreenBase.smPercenWidth*3,
        marginBottom: SmartScreenBase.smPercenWidth*5,
        width: SmartScreenBase.smPercenWidth*100,
        alignItems: 'center'
    },

    TextSize: {
        fontSize: SmartScreenBase.smFontSize*50
    },

    TextAIScore: {
        fontSize: SmartScreenBase.convertSize(175),
        fontFamily: FontBase.MyriadPro_Bold,
        color: Colors.White
    },

    TextAISkill: {
        fontSize: SmartScreenBase.convertSize(60),
        fontFamily: FontBase.MyriadPro_Regular,
        color: Colors.White
    },
    modalTitleText:{
        color:'#4e5453',
        fontFamily : FontBase.MyriadPro_Regular,
        fontSize : SmartScreenBase.smFontSize*50,
        textAlign : 'center',
        marginTop : SmartScreenBase.smPercenWidth*3
    },
    modalBodyText:{
        color:'#4e5453',
        fontFamily : FontBase.MyriadPro_LightIt,
        fontSize : SmartScreenBase.smFontSize*50,
        textAlign : 'center',
        marginTop : SmartScreenBase.smPercenWidth*5
    },
});