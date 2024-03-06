import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window');
import SmartScreenBase from '../../base/SmartScreenBase'
export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: width * 0.9,
        marginTop: SmartScreenBase.smPercenHeight * 0.5,
        //justifyContent: 'center',
        marginLeft: SmartScreenBase.smPercenHeight*2,
    },
    ViewButtonPlay: {
        width: SmartScreenBase.smPercenWidth * 7,
        height: SmartScreenBase.smPercenWidth * 7,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconPlay: {
        width: SmartScreenBase.smBaseWidth * 112,
        height: SmartScreenBase.smBaseWidth * 112,
        //marginLeft: SmartScreenBase.smPercenHeight,
        resizeMode: 'contain',
        marginRight:SmartScreenBase.smPercenHeight,
        backgroundColor: 'white'
    },
    sliderStyles: {
        width: SmartScreenBase.smPercenWidth * 70,
        marginLeft: SmartScreenBase.smPercenHeight,
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
