import {StyleSheet} from 'react-native';
import SmartScreenBase from "../../base/SmartScreenBase";
import font from '../../../base/FontBase';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerAudio: {
        backgroundColor: '#fff',
        width: '90%',
        height: SmartScreenBase.smPercenHeight * 25,
        justifyContent: 'space-between',
        paddingVertical: SmartScreenBase.smPercenHeight * 2.5,
        borderRadius: SmartScreenBase.smPercenWidth * 4
    },
    viewProcess: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SmartScreenBase.smPercenWidth * 3
    },
    slider: {
        flex: 1,
        marginHorizontal: SmartScreenBase.smPercenWidth * 3
    },
    trackStyle: {
        height: SmartScreenBase.smPercenWidth * 1.5,
    },
    thumbStyle: {
        width: SmartScreenBase.smPercenWidth * 4,
        height: SmartScreenBase.smPercenWidth * 4,
    },
    textTime: {
        fontFamily: font.MyriadPro_Light,
        fontSize: SmartScreenBase.smFontSize * 40,
        minWidth: SmartScreenBase.smPercenWidth * 15
    },
    viewControl: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonNext: {
        width: SmartScreenBase.smPercenWidth * 12,
        height: SmartScreenBase.smPercenWidth * 12,
    },
    icon: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    buttonPlay: {
        width: SmartScreenBase.smPercenWidth * 17,
        height: SmartScreenBase.smPercenWidth * 17,
        marginHorizontal: SmartScreenBase.smPercenWidth * 6
    }
});

export default styles;
