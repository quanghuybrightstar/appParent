import {StyleSheet} from 'react-native';
import SmartScreenBase from "../../../../component/base/SmartScreenBase";
import FontBase from '../../../../base/FontBase';
import { Colors } from '../../../../styleApp/color';
import { abbrevs } from 'npm';

const styles = StyleSheet.create({
    container: {
        width: SmartScreenBase.smPercenWidth*100,
        height: SmartScreenBase.smPercenHeight*100,
        resizeMode: 'cover',
    },
    curiBg: {
        width: SmartScreenBase.smPercenWidth*92,
        height: SmartScreenBase.smPercenWidth*56,
        resizeMode: 'contain',
        marginBottom: SmartScreenBase.smPercenWidth*4
    },
    curiLay: {
        width: SmartScreenBase.smPercenWidth*92,
        height: SmartScreenBase.smPercenWidth*56,
    },
    mainLay: {
        width: SmartScreenBase.smPercenWidth*100,
        height: SmartScreenBase.smPercenHeight*100,
        alignItems: 'center',
        paddingTop: SmartScreenBase.smPercenHeight*2
    },
    scrollLay: {
        width: SmartScreenBase.smPercenWidth*100,
        height: SmartScreenBase.smPercenHeight*100-SmartScreenBase.smPercenWidth*44,
        alignItems: 'center',
        paddingTop: SmartScreenBase.smPercenHeight*2
    },
    scrollContain: {
        width: SmartScreenBase.smPercenWidth*100,
        alignItems: 'center',
    },
    logoS:{
        width: SmartScreenBase.smPercenWidth*93/4,
        height: SmartScreenBase.smPercenWidth*35/4,
        resizeMode: 'contain',
    },
    textTittle:{
        width: SmartScreenBase.smPercenWidth*98,
        textAlign: 'center',
        fontFamily: FontBase.MyriadPro_Bold,
        fontSize: SmartScreenBase.smFontSize*65,
        color: Colors.DarkGray3,
        marginTop: SmartScreenBase.smPercenWidth*2,
        marginBottom: SmartScreenBase.smPercenHeight*5,
    },
    smallTextTittle:{
        width: '100%',
        textAlign: 'center',
        fontFamily: FontBase.MyriadPro_Bold,
        fontSize: SmartScreenBase.smFontSize*65,
        color: Colors.White,
    },
    textBody:{
        width: SmartScreenBase.smPercenWidth*80,
        textAlign: 'left',
        fontFamily: FontBase.MyriadPro_Regular,
        fontSize: SmartScreenBase.smFontSize*50,
        color: Colors.DarkGray3,
    },
    buttonLay:{
        position: 'absolute',
        bottom: SmartScreenBase.smPercenWidth*8,
        width: '100%',
        height: SmartScreenBase.smPercenWidth*30,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    addvoid:{
        width: '100%',
        height: SmartScreenBase.smPercenHeight*10,
    },
    boxLay:{
        width: SmartScreenBase.smPercenWidth*86,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: Colors.White,
        borderRadius: SmartScreenBase.smPercenWidth*4,
        paddingBottom: SmartScreenBase.smPercenWidth*3,
    },
    headerLay:{
        width: SmartScreenBase.smPercenWidth*84,
        height: SmartScreenBase.smPercenWidth*42,
        marginTop: SmartScreenBase.smPercenWidth*10
    },
    topHeaderS:{
        width: '100%',
        height: SmartScreenBase.smPercenWidth*14.2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scoreLay:{
        width: SmartScreenBase.smPercenWidth*86,
        height: SmartScreenBase.smPercenWidth*42,
        position: 'absolute',
    },
    image_diem:{
        resizeMode: 'contain'
    },
    botHeaderS:{
        width: '100%',
        flexDirection: 'row',
        height: SmartScreenBase.smPercenWidth*27.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    botRightS:{
        width: SmartScreenBase.smPercenWidth*43,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#ff0'
    },
    botLeftS:{
        width: SmartScreenBase.smPercenWidth*43,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scoreT:{
        width: '100%',
        textAlign: 'center',
        fontFamily: FontBase.MyriadPro_Bold,
        fontSize: SmartScreenBase.smFontSize*115,
        color: Colors.Orange_F8,
    textShadowColor: Colors.White,
    textShadowRadius: 1,
    textShadowOffset: { 
      width: 2,
      height: 2,
    },
    },
    timeLay:{
        width: SmartScreenBase.smPercenWidth*30,
        height: SmartScreenBase.smPercenWidth*10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkLay:{
        width: SmartScreenBase.smPercenWidth*30,
        height: SmartScreenBase.smPercenWidth*8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    smallIconS:{
        width: SmartScreenBase.smPercenWidth*8,
        height: SmartScreenBase.smPercenWidth*8,
        resizeMode: 'contain'
    },
    smallTextT:{
        width: SmartScreenBase.smPercenWidth*20,
        height: SmartScreenBase.smPercenWidth*6,
        textAlign: 'left',
        fontFamily: FontBase.MyriadPro_Bold,
        fontSize: SmartScreenBase.smFontSize*50,
        color: Colors.White,
        marginLeft: SmartScreenBase.smPercenWidth*2,
    },
    notiT:{
        width: '100%',
        textAlign: 'center',
        fontFamily: FontBase.MyriadPro_Regular,
        fontSize: SmartScreenBase.smFontSize*65,
        color: Colors.DarkGray3,
        lineHeight: SmartScreenBase.smPercenWidth*8,
        marginTop: SmartScreenBase.smPercenWidth*3,
    },
    bodyLay:{
        width: SmartScreenBase.smPercenWidth*84,
        //height: SmartScreenBase.smPercenWidth*80,
        backgroundColor: Colors.White,
        borderRadius: SmartScreenBase.smPercenWidth*8,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingHorizontal: SmartScreenBase.smPercenWidth*5,
    },
    topBody:{
        width: '100%',
        flexDirection: 'row',
        height: SmartScreenBase.smPercenWidth*20,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    botBody:{
        width: '100%',
        height: SmartScreenBase.smPercenWidth*45,
    },
    tittleDV:{
        width: SmartScreenBase.smPercenWidth*45,
        textAlign: 'left',
        fontFamily: FontBase.MyriadPro_Bold,
        fontSize: SmartScreenBase.smFontSize*55,
        color: Colors.Red_EB5,
    },
    bodyDV:{
        width: '100%',
        textAlign: 'left',
        fontFamily: FontBase.MyriadPro_Regular,
        fontSize: SmartScreenBase.smFontSize*50,
        color: Colors.Black,
    },
});
export default styles;