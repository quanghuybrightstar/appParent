import { StyleSheet, Dimensions } from 'react-native';
import SmartScreenBase from '../../../../../base/SmartScreenBase';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        marginBottom: height / 60,
        flexDirection: 'row',
        width: SmartScreenBase.smPercenWidth*80,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ViewContent: {
        width: SmartScreenBase.smPercenWidth*19,
        justifyContent:'flex-end',
        flexDirection:'row',
        alignItems:'flex-start',
    },
    titleContent:{
        fontSize:18,
        fontWeight:'bold',
        fontFamily:'iCielSoupofJustice',
        // paddingBottom:5,
        textTransform: 'uppercase'
    },
    boView: {
        width: SmartScreenBase.smPercenWidth*45,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    viewSlider: {
        backgroundColor: '#e6e6e6',
        width: SmartScreenBase.smPercenWidth*35,
        height: 22,
        borderRadius:50
    },
    iconListen: {
        width: 30,
        height: 30,
        resizeMode: 'contain'
    }
})