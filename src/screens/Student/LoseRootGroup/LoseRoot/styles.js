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
        paddingTop: SmartScreenBase.smPercenHeight*10
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
        fontSize: SmartScreenBase.smFontSize*90,
        color: Colors.DarkGray3,
        marginTop: SmartScreenBase.smPercenHeight*16
    },
    textBody:{
        width: SmartScreenBase.smPercenWidth*90,
        textAlign: 'center',
        fontFamily: FontBase.MyriadPro_Regular,
        fontSize: SmartScreenBase.smFontSize*50,
        color: Colors.DarkGray3,
        marginTop: SmartScreenBase.smPercenHeight*4
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
});
export default styles;