import {StyleSheet} from 'react-native';
import SmartScreenBase from '../../../base/SmartScreenBase';
import font from '../../../base/FontBase';
import { Colors } from '../../../styleApp/color';

const SHADOW_STYLE = {
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerHeader: {
        width: '100%',
        alignItems: 'center',
        marginTop: SmartScreenBase.smPercenHeight * 4,
    },
    carouselContainer: {
        paddingTop: 10,
        paddingBottom: 20,
        paddingLeft: 3,
        paddingRight:3,
    },
    itemCarouselHeader: {
        flexDirection: 'row',
        backgroundColor: Colors.White,
        borderRadius: SmartScreenBase.smPercenWidth * 4,
        paddingVertical: 10,
        paddingLeft: 10,
        borderWidth: SmartScreenBase.smBaseWidth * 5,
        borderColor: Colors.BaseGreen,
        ...SHADOW_STYLE,
    },
    imageItemCarouselHeader: {
        width: SmartScreenBase.smPercenWidth * 35,
        height: SmartScreenBase.smPercenWidth * 35,
        resizeMode: 'contain',
        borderRadius: SmartScreenBase.smPercenWidth * 3,
    },
    contentItemCarouselHeader: {
        flex: 1,
        justifyContent: 'space-around',
        paddingLeft: SmartScreenBase.smPercenWidth * 3,
    },
    viewNameClassItemCarouselHeader: {
        borderRadius: SmartScreenBase.smPercenWidth * 4,
        paddingHorizontal: SmartScreenBase.smPercenWidth * 2,
        paddingVertical:SmartScreenBase.smPercenHeight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textNameClassItemCarouselHeader: {
        color: Colors.BaseGreen,
        fontFamily: font.MyriadPro_Bold,
        fontSize: SmartScreenBase.smFontSize * 45,
        textAlign:'center',
    },
    textDateItemCarouselHeader: {
        fontSize: SmartScreenBase.smFontSize * 41,
        fontFamily: font.MyriadPro_Light,
    },
    textGradeItemCarouselHeader: {
        fontSize: SmartScreenBase.smFontSize * 41,
        fontFamily: font.MyriadPro_Bold,
    },
    containerContent: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: SmartScreenBase.smPercenHeight * 5,
    },
    viewItemContent: {
        width: SmartScreenBase.smPercenWidth * 70,
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginBottom: SmartScreenBase.smPercenWidth * 6,
    },
    viewTextItemContent: {
        backgroundColor: '#fff',
        // paddingVertical: SmartScreenBase.smPercenWidth * 3,
        borderRadius: SmartScreenBase.smPercenWidth * 8,
        width: '90%',
        height: SmartScreenBase.smPercenWidth * 12,
        justifyContent: 'center',
        alignItems: 'center',
    },

    shawdow: {
        ...SHADOW_STYLE,
    },

    textItemContent: {
        color: '#000',
        fontFamily: font.MyriadPro_Light,
        fontSize: SmartScreenBase.smFontSize * 45,
    },
    iconItemContent: {
        position: 'absolute',
        left: 0,
        width: SmartScreenBase.smPercenWidth * 20,
        height: SmartScreenBase.smPercenWidth * 20,
        resizeMode: 'contain',
        zIndex: 1,
        ...SHADOW_STYLE,
    },
    containerRegisterScreen: {
        flex: 1,
        alignItems: 'center',
    },
    imageDDHTRegisterScreen: {
        marginTop: SmartScreenBase.smPercenHeight * 14,
        width: SmartScreenBase.smPercenWidth * 80,
        height: SmartScreenBase.smPercenWidth * 80 * 869 / 971,
        resizeMode: 'contain',
    },
    textContentRegisterScreen: {
        color: '#00A69C',
        textAlign: 'center',
        fontSize: SmartScreenBase.smFontSize * 45,
        marginVertical: SmartScreenBase.smPercenHeight * 5,
        fontFamily: font.MyriadPro_Light,
    },
    buttonRegister: {
        paddingVertical: SmartScreenBase.smPercenWidth * 3,
        paddingHorizontal: SmartScreenBase.smPercenWidth * 8,
        borderRadius: SmartScreenBase.smPercenWidth * 8,
    },
    textButtonRegister: {
        color: '#fff',
        fontFamily: font.MyriadPro_Light,
        fontSize: SmartScreenBase.smFontSize * 45,
    },
});

export default styles;
