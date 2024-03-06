import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window');
import SmartScreenBase from '../../base/SmartScreenBase'
export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: width * 1,
        marginTop: SmartScreenBase.smPercenHeight * 1,
        justifyContent: 'center',
    },
    controlV: {
        width: '100%', 
        height: SmartScreenBase.smPercenWidth*15, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center', 
        borderRadius: SmartScreenBase.smPercenWidth*10, 
    },
    ViewButtonPlay: {
        width: SmartScreenBase.smPercenWidth * 8,
        height: SmartScreenBase.smPercenWidth * 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconPlay: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    sliderStyles: {
        width: SmartScreenBase.smPercenWidth * 80,
    },
    trackStyle: {
        height: SmartScreenBase.smPercenHeight * 0.5
    },
    thumbStyle: {
        width: SmartScreenBase.smPercenWidth * 4,
        height: SmartScreenBase.smPercenWidth * 4,
        borderRadius: SmartScreenBase.smPercenWidth * 50
    }
})
