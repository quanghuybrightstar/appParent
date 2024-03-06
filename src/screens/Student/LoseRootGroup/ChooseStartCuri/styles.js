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
        width: SmartScreenBase.smPercenWidth*95,
        height: SmartScreenBase.smPercenWidth*68,
        resizeMode: 'contain',
        marginBottom: SmartScreenBase.smPercenWidth*5,
    },
    curiActiveBg: {
        width: SmartScreenBase.smPercenWidth*100,
        height: SmartScreenBase.smPercenWidth*68,
        resizeMode: 'contain',
        marginBottom: SmartScreenBase.smPercenWidth*5,
    },
    curiLay: {
        width: SmartScreenBase.smPercenWidth*95,
        height: SmartScreenBase.smPercenWidth*68,
    },
    curiActiveLay: {
        width: SmartScreenBase.smPercenWidth*100,
        height: SmartScreenBase.smPercenWidth*68,
    },
    mainLay: {
        width: SmartScreenBase.smPercenWidth*100,
        height: SmartScreenBase.smPercenHeight*100,
        alignItems: 'center',
    },
    logoS:{
        width: SmartScreenBase.smPercenWidth*93/4,
        height: SmartScreenBase.smPercenWidth*35/4,
        resizeMode: 'contain',
        position: 'absolute',
        bottom: SmartScreenBase.smPercenWidth*9.5,
        right: SmartScreenBase.smPercenWidth*6,
    },
    logoActiveS:{
        width: SmartScreenBase.smPercenWidth*93/4,
        height: SmartScreenBase.smPercenWidth*35/4,
        resizeMode: 'contain',
        position: 'absolute',
        top: SmartScreenBase.smPercenWidth*9,
        right: SmartScreenBase.smPercenWidth*8.5,
    },
    textTittle:{
        width: SmartScreenBase.smPercenWidth*98,
        textAlign: 'center',
        fontFamily: FontBase.MyriadPro_Bold,
        fontSize: SmartScreenBase.smFontSize*80,
        color: Colors.DarkGray3,
        marginTop: SmartScreenBase.smPercenHeight*12,
        marginBottom: SmartScreenBase.smPercenWidth*7
    },
    textBody:{
        width: SmartScreenBase.smPercenWidth*80,
        textAlign: 'left',
        fontFamily: FontBase.MyriadPro_Regular,
        fontSize: SmartScreenBase.smFontSize*50,
        color: Colors.DarkGray3,
        marginTop: SmartScreenBase.smPercenWidth*32,
        marginLeft: SmartScreenBase.smPercenWidth*10
    },
    buttonLay:{
        position: 'absolute',
        width: '100%',
        height: SmartScreenBase.smPercenWidth*20,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    addvoid:{
        width: '100%',
        height: SmartScreenBase.smPercenHeight*10,
    },
});
export default styles;