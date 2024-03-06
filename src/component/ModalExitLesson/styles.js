import {StyleSheet, Platform} from 'react-native';
import SmartScreenBase from "../../base/SmartScreenBase";

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: SmartScreenBase.smPercenWidth * 100,
        height: SmartScreenBase.smPercenHeight * 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00000070'
    },
    containerContent: {
        width: SmartScreenBase.smPercenWidth * 80,
        backgroundColor: '#fff',
        padding: SmartScreenBase.smPercenWidth * 2,
        paddingTop: 0,
        alignItems: 'center',
        borderRadius: SmartScreenBase.smPercenWidth * 4
    },
    image: {
        width: SmartScreenBase.smPercenWidth * 35,
        height: SmartScreenBase.smPercenWidth * 35 * 2215/2565,
        resizeMode: 'contain',
        marginBottom: SmartScreenBase.smPercenHeight * 2
    },
    viewButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: SmartScreenBase.smPercenWidth * 4,
        marginTop: SmartScreenBase.smPercenHeight * 4
    },
    button: {
        width: '47%',
        alignItems: 'center',
        paddingVertical: SmartScreenBase.smPercenWidth * 1.5,
        borderRadius: SmartScreenBase.smPercenWidth * 5,
        backgroundColor: '#01283A',
        justifyContent:'center'
    },
    textButton: {
        fontFamily: Platform.OS === 'ios' ? 'MyriadPro-Bold' : 'myriadpro_bold',
        color: '#fff',
        fontSize: SmartScreenBase.smFontSize * 42
    },
    text1: {
        fontFamily: Platform.OS === 'ios' ? 'MyriadPro-Bold' : 'myriadpro_bold',
        color: '#000',
        fontSize: SmartScreenBase.smFontSize * 40
    },
    text2: {
        fontFamily: Platform.OS === 'ios' ? 'MyriadPro-Light' : 'myriadpro_light',
        color: '#686969',
        fontSize: SmartScreenBase.smFontSize * 40
    }
});

export default styles;
