import {StyleSheet} from 'react-native';
import SmartScreenBase from '../../../base/SmartScreenBase';
import font from '../../../base/FontBase';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerInfo: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: 'white',
        flex: 1,
        borderRadius: SmartScreenBase.smPercenWidth * 4,
        margin: SmartScreenBase.smPercenWidth * 4,
        marginTop: SmartScreenBase.smPercenHeight * 5,
    },
    containerContent: {
        flex:1,
        paddingHorizontal: SmartScreenBase.smPercenWidth * 6,
        paddingTop: SmartScreenBase.smPercenHeight * 15,
        overflow: 'hidden',
        borderRadius: SmartScreenBase.smPercenWidth * 4,
    },
    imageBackgroundContent:{
        // borderRadius: SmartScreenBase.smPercenWidth * 4,
        top: -10
    },
    textTitleContent: {
        fontFamily: font.MyriadPro_Bold,
        fontSize: SmartScreenBase.smFontSize * 45,
        marginBottom:SmartScreenBase.smPercenHeight,
    },
    viewLineContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: SmartScreenBase.smPercenHeight * 2,
    },
    iconContent: {
        width: SmartScreenBase.smPercenWidth * 8,
        height: SmartScreenBase.smPercenWidth * 8,
        resizeMode: 'contain',
    },
    textContent: {
        flex: 1,
        marginLeft: SmartScreenBase.smPercenWidth * 4,
        fontFamily: font.MyriadPro_Light,
        fontSize: SmartScreenBase.smFontSize * 40,
    },
    border: {
        height: SmartScreenBase.smPercenHeight * 0.1,
        backgroundColor: '#cccccc',
        width: '100%',
        marginVertical: SmartScreenBase.smPercenHeight * 2,
    },
});

export default styles;
