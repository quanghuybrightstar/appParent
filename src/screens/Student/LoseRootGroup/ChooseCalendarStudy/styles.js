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
    mainLay: {
        width: SmartScreenBase.smPercenWidth*100,
        height: SmartScreenBase.smPercenHeight*100,
        alignItems: 'center',
    },
    logoS:{
        width: SmartScreenBase.smPercenWidth*229/4,
        height: SmartScreenBase.smPercenWidth*98/4,
        resizeMode: 'contain',
    },
    textTittle:{
        width: SmartScreenBase.smPercenWidth*98,
        textAlign: 'center',
        fontFamily: FontBase.MyriadPro_Bold,
        fontSize: SmartScreenBase.smFontSize*70,
        color: Colors.DarkGray3,
        marginTop: SmartScreenBase.smPercenHeight*16,
        marginBottom: SmartScreenBase.smPercenHeight*3,
    },
    textGuiS:{
        width: SmartScreenBase.smPercenWidth*98,
        textAlign: 'center',
        fontFamily: FontBase.MyriadPro_Bold,
        fontSize: SmartScreenBase.smFontSize*110,
        color: Colors.DarkGray3,
        marginTop: SmartScreenBase.smPercenHeight*16,
        marginBottom: SmartScreenBase.smPercenHeight*3,
        lineHeight: SmartScreenBase.smPercenWidth*12,
    },
    tittleMono:{
        width: SmartScreenBase.smPercenWidth*90,
        textAlign: 'center',
        fontFamily: FontBase.MyriadPro_Bold,
        fontSize: SmartScreenBase.smFontSize*55,
        color: Colors.DarkGray3,
    },
    desMono:{
        width: SmartScreenBase.smPercenWidth*90,
        textAlign: 'center',
        fontFamily: FontBase.MyriadPro_Regular,
        fontSize: SmartScreenBase.smFontSize*45,
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
        height: SmartScreenBase.smPercenHeight*16,
    },
    monoLay: {
        width: SmartScreenBase.smPercenWidth*90,
        height: SmartScreenBase.smPercenWidth*14,
        borderColor: Colors.BaseGreen,
        borderWidth: 1,
        borderRadius: SmartScreenBase.smPercenWidth*20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: SmartScreenBase.smPercenWidth*4,
    },
    radioLay: {
        position: 'absolute',
        right: SmartScreenBase.smPercenWidth*3,
        top: SmartScreenBase.smPercenWidth*4
    },
    borderLine: {
        borderColor: Colors.BaseGreen,
    },
});
export default styles;