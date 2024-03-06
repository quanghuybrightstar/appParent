import {StyleSheet} from 'react-native';
import SmartScreenBase from "../../../base/SmartScreenBase";
import FontBase from '../../../base/FontBase';
import {Colors} from '../../../styleApp/color';

const styles = StyleSheet.create({
    ViewBoxBot: {
        flex: 3,
        alignItems: 'center',
        width: '100%'
    },
    ViewTextBox: {
        width: SmartScreenBase.smPercenWidth * 30,
        height: SmartScreenBase.smPercenHeight * 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.SuperLightGray,
        marginBottom: SmartScreenBase.smPercenWidth*1.5
    },
    textBody: {
        color: Colors.SuperLightGray, 
        fontSize: SmartScreenBase.smFontSize * 50, 
        fontFamily: FontBase.MyriadPro_Bold
    },
    textInputMd: {
        width: SmartScreenBase.smPercenWidth * 80,
        height: SmartScreenBase.smPercenHeight * 7,
        backgroundColor: '#d0d2d3',
        borderRadius: SmartScreenBase.smPercenWidth * 80,
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: SmartScreenBase.smFontSize * 50,
        fontFamily: FontBase.MyriadPro_Regular,
        textAlign: 'center'
    },
    contain: {
        width: SmartScreenBase.smPercenWidth*100, 
        alignContent: 'center', 
        alignItems: 'center'
    },
    subContain: {
        width: SmartScreenBase.smPercenWidth*90,
        height: SmartScreenBase.smPercenHeight * 27,
        borderRadius: SmartScreenBase.smPercenWidth * 5,
        backgroundColor: Colors.White
    },
    ViewTittle: {
        height: SmartScreenBase.smPercenHeight * 21,
        backgroundColor: Colors.White,
        borderBottomRightRadius: SmartScreenBase.smPercenWidth * 5,
        borderBottomLeftRadius: SmartScreenBase.smPercenWidth * 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    subViewTittle: {
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '90%',
        flex: 1,
    },
    textTittle: {
        fontSize: SmartScreenBase.smFontSize * 50,
        fontFamily: FontBase.MyriadPro_Bold,
    },
});

export default styles;
