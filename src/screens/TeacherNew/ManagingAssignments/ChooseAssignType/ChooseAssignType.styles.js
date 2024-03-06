import {StyleSheet} from 'react-native';
import SmartScreenBase from "../../../../component/base/SmartScreenBase";
import FontBase from '../../../../base/FontBase';
import { Colors } from '../../../../styleApp/color';

const styles = StyleSheet.create({
    container: {
        width: SmartScreenBase.smPercenWidth*100,
        height: SmartScreenBase.smPercenHeight*100,
        resizeMode: 'cover',
    },
    programLay: {
        width: SmartScreenBase.smPercenWidth*92,
        minheight: SmartScreenBase.smPercenWidth*22,
        resizeMode: 'contain',
        marginBottom: SmartScreenBase.smPercenWidth*4,
        borderWidth: 1,
        borderColor: Colors.Gray,
        backgroundColor: Colors.White,
        borderRadius: SmartScreenBase.smPercenWidth*3,
        paddingBottom: SmartScreenBase.smPercenWidth*4,
    },
    topLay: {
        width: SmartScreenBase.smPercenWidth*92,
        height: SmartScreenBase.smPercenWidth*14,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    botLay: {
        width: SmartScreenBase.smPercenWidth*92,
    },
    checkboxS: {
        width: SmartScreenBase.smPercenWidth*92,
        height: SmartScreenBase.smPercenWidth*56,
    },
    mainLay: {
        width: SmartScreenBase.smPercenWidth*100,
        height: SmartScreenBase.smPercenHeight*100,
        alignItems: 'center',
        paddingTop: SmartScreenBase.smPercenHeight*6
    },
    iconPro:{
        width: SmartScreenBase.smPercenWidth*27/4,
        height: SmartScreenBase.smPercenWidth*27/4,
        resizeMode: 'contain',
        marginLeft: SmartScreenBase.smPercenWidth*3,
    },
    tittleS:{
        width: SmartScreenBase.smPercenWidth*69,
        fontFamily: FontBase.MyriadPro_Bold,
        fontSize: SmartScreenBase.smFontSize*50,
        color: Colors.BaseGreen,
        marginLeft: SmartScreenBase.smPercenWidth*3,
    },
    bodyText:{
        width: SmartScreenBase.smPercenWidth*80,
        textAlign: 'left',
        fontFamily: FontBase.MyriadPro_Regular,
        fontSize: SmartScreenBase.smFontSize*50,
        color: Colors.DarkGray3,
        marginLeft: SmartScreenBase.smPercenWidth*4,
    },
    buttonLay:{
        width: '100%',
        height: SmartScreenBase.smPercenWidth*20,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    adding: {
        height: SmartScreenBase.smPercenHeight*8,
    },
});
export default styles;