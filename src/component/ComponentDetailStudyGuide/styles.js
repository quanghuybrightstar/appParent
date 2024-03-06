import {StyleSheet} from 'react-native';
import SmartScreenBase from "../base/SmartScreenBase";
import font from '../../base/FontBase'

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        flexDirection: 'row',
        padding: SmartScreenBase.smPercenWidth * 2,
        paddingBottom: SmartScreenBase.smPercenHeight,
        backgroundColor: '#00B8B5'
    },
    buttonBack: {
        width: SmartScreenBase.smPercenWidth * 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: SmartScreenBase.smPercenWidth * 10
    },
    iconBack: {
        width: '60%',
        height: '60%',
        resizeMode: 'contain'
    },
    title: {
        color: 'white',
        fontSize: SmartScreenBase.smPercenWidth * 5,
        marginLeft: SmartScreenBase.smPercenWidth * 2,
        fontFamily: font.MyriadPro_Light,
        fontWeight: 'normal',
        flex: 1,
        marginRight: SmartScreenBase.smPercenWidth * 5
    },
    buttonRotate: {
        width: SmartScreenBase.smPercenWidth * 8,
        height: SmartScreenBase.smPercenWidth * 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: SmartScreenBase.smPercenWidth
    },
    iconRotate: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    containerContent: {
        flex: 1
    }
});

export default styles;
