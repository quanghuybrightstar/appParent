import {StyleSheet} from 'react-native';
import SmartScreenBase from "../base/SmartScreenBase";
import font from '../../base/FontBase';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
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
    buttonRight: {
        width: SmartScreenBase.smPercenWidth * 8,
        height: SmartScreenBase.smPercenWidth * 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: SmartScreenBase.smPercenWidth * 4
    },
    iconRight: {
        width: '90%',
        height: '90%',
        resizeMode: 'contain'
    },
    containerContent: {
        flex: 1,
        paddingVertical: SmartScreenBase.smPercenHeight * 4,
        paddingHorizontal: SmartScreenBase.smPercenWidth * 3
    },
    containerItem: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: SmartScreenBase.smPercenWidth * 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
        marginBottom: SmartScreenBase.smPercenHeight * 2,
        padding: SmartScreenBase.smPercenWidth * 2
    },
    viewSkill: {
        width: '100%',
        // paddingVertical: SmartScreenBase.smPercenHeight * 0.5,
        borderRadius: SmartScreenBase.smPercenWidth * 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: SmartScreenBase.smPercenWidth * 10,
    },
    textSkill: {
        fontFamily: font.MyriadPro_Light,
        fontSize: SmartScreenBase.smFontSize * 50,
        color: '#fff',
        marginVertical: SmartScreenBase.smPercenHeight * 0.5
    },
    viewScore1: {
        backgroundColor: '#fff',
        height: '100%',
        borderRadius: SmartScreenBase.smPercenWidth * 8
    },
    viewScore2: {
        flex: 1,
        paddingHorizontal: SmartScreenBase.smPercenWidth * 6,
        backgroundColor: '#00b9b7',
        borderRadius: SmartScreenBase.smPercenWidth * 8,
        marginLeft: SmartScreenBase.smPercenWidth * 1.5,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    textScore1: {
        fontFamily: font.MyriadPro_Bold,
        fontSize: SmartScreenBase.smFontSize * 50,
        color: '#fff',
    },
    textScore2: {
        fontFamily: font.MyriadPro_Bold,
        fontSize: SmartScreenBase.smFontSize * 31,
        color: '#fff',
        marginLeft: SmartScreenBase.smPercenWidth,
        marginTop: SmartScreenBase.smPercenHeight * 0.5
    },
    viewContentItem: {
        padding: SmartScreenBase.smPercenWidth * 2.5
    },
    textTopic: {
        fontFamily: font.MyriadPro_Bold,
        fontSize: SmartScreenBase.smFontSize * 45,
        color: '#00a69c'
    },
    textNameLesson: {
        fontFamily: font.MyriadPro_Bold,
        fontSize: SmartScreenBase.smFontSize * 45,
        color: '#00a69c',
    },
    textUnit: {
        fontFamily: font.MyriadPro_Light,
        fontSize: SmartScreenBase.smFontSize * 42,
        color: '#404041',
        marginTop: SmartScreenBase.smPercenHeight
    },
    textLastTime: {
        fontFamily: font.MyriadPro_Light,
        fontSize: SmartScreenBase.smFontSize * 42,
        color: '#404041',
        marginBottom: SmartScreenBase.smPercenHeight
    },
    viewLastLine: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textLevel: {
        color: '#bc202e',
        fontFamily: font.MyriadPro_Bold,
        fontSize: SmartScreenBase.smFontSize * 42,
    },
    viewLevel: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconLevel: {
        width: SmartScreenBase.smPercenWidth * 8,
        height: SmartScreenBase.smPercenHeight * 3,
        resizeMode: 'contain',
        marginLeft: SmartScreenBase.smPercenWidth * 2
    }
});

export default styles;
