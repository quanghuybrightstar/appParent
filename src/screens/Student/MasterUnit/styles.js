import {StyleSheet} from 'react-native';
import FontBase from '../../../base/FontBase';
import SmartScreenBase from '../../../base/SmartScreenBase';
import { Colors } from '../../../styleApp/color';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabBarIndicator: {
        backgroundColor: Colors.Orange,
        width: SmartScreenBase.smPercenWidth * 45
    },
    tabBarContainer: {
        backgroundColor: 'transparent', borderBottomWidth: 1, borderBottomColor: '#E5E3E3',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0,
        width: SmartScreenBase.smPercenWidth * 90,
        alignSelf: 'center',
    },
    tabBarLabel: {
        fontFamily: FontBase.MyriadPro_Light,
        fontSize: SmartScreenBase.smFontSize * 44,
    },
    header: {
        alignItems: 'center',
        flexDirection: 'row',
        padding: SmartScreenBase.smPercenWidth * 2,
        paddingBottom: SmartScreenBase.smPercenHeight,
        backgroundColor: '#00B8B5',
    },
    buttonBack: {
        width: SmartScreenBase.smPercenWidth * 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: SmartScreenBase.smPercenWidth * 10,
    },
    iconBack: {
        width: '60%',
        height: '60%',
        resizeMode: 'contain',
    },
    title: {
        color: 'white',
        fontSize: SmartScreenBase.smPercenWidth * 5,
        marginLeft: SmartScreenBase.smPercenWidth * 2,
        fontFamily: FontBase.MyriadPro_Light,
        flex: 1,
        marginRight: SmartScreenBase.smPercenWidth * 5,
    },
    buttonRight: {
        width: SmartScreenBase.smPercenWidth * 8,
        height: SmartScreenBase.smPercenWidth * 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: SmartScreenBase.smPercenWidth * 4,
    },
    iconRight: {
        width: '90%',
        height: '90%',
        resizeMode: 'contain',
    },
    containerContent: {
        paddingVertical: SmartScreenBase.smPercenHeight * 4,
        paddingHorizontal: SmartScreenBase.smPercenWidth * 3,
        flexGrow: 1,
    },
    containerItem: {
        backgroundColor: '#fff',
        borderRadius: SmartScreenBase.smPercenWidth * 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 4,
        marginBottom: SmartScreenBase.smPercenHeight * 2,
        paddingHorizontal: 10,
        paddingTop: 10,
        marginHorizontal: 6
    },
    shadowBox: {
        paddingTop: 4,
        // paddingBottom: 8,
        backgroundColor: '#fff',
        paddingHorizontal: 6,
    },
    viewSkill: {
        borderRadius: SmartScreenBase.smPercenWidth * 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    skillBox: {
        borderRadius: SmartScreenBase.smPercenWidth * 8,
        paddingHorizontal: SmartScreenBase.smBaseWidth * 57,
        paddingVertical: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textSkill: {
        fontFamily: FontBase.MyriadPro_Bold,
        fontSize: SmartScreenBase.smFontSize * 50,
        color: '#fff',
    },
    viewItemHeaderRight: {
        backgroundColor: '#fff',
        height: '100%',
        borderRadius: SmartScreenBase.smPercenWidth * 8,
    },
    viewResult: {
        // paddingHorizontal: SmartScreenBase.smPercenWidth * 6,
        transform: [{
            rotate: '3deg',
        }],
        marginLeft: SmartScreenBase.smPercenWidth * 1.5,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    textResult: {
        fontFamily: FontBase.MyriadPro_Bold,
        fontSize: SmartScreenBase.smFontSize * 50,
        color: Colors._BE1E2D,
    },
    textScore2: {
        fontFamily: FontBase.MyriadPro_Bold,
        fontSize: SmartScreenBase.smFontSize * 31,
        color: '#fff',
        marginLeft: SmartScreenBase.smPercenWidth,
        marginTop: SmartScreenBase.smPercenHeight * 0.5,
    },
    viewContentItem: {
        paddingTop: SmartScreenBase.smPercenWidth * 2.5,
        paddingLeft: SmartScreenBase.smPercenWidth * 2.5,
        paddingRight: SmartScreenBase.smPercenWidth * 2.5,
    },
    textTopic: {
        fontFamily: FontBase.MyriadPro_Bold,
        fontSize: SmartScreenBase.smFontSize * 45,
    },
    textNameLesson: {
        fontFamily: FontBase.MyriadPro_Regular,
        fontSize: SmartScreenBase.smFontSize * 45,
        color: '#000',
    },
    textUnit: {
        fontFamily: FontBase.MyriadPro_Light,
        fontSize: SmartScreenBase.smFontSize * 39,
        color: '#404041',
        marginTop: SmartScreenBase.smPercenHeight,
    },
    textLastTime: {
        fontFamily: FontBase.MyriadPro_Light,
        fontSize: SmartScreenBase.smFontSize * 42,
        color: '#404041',
        marginBottom: SmartScreenBase.smPercenHeight,
    },
    viewLastLine: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth:1,
        // paddingTop: 10,
        borderTopColor: Colors.GrayB6,
        marginTop: SmartScreenBase.smPercenHeight,
    },
    textLevel: {
        color: Colors.BaseGreen,
        fontFamily: FontBase.MyriadPro_Bold,
        fontSize: SmartScreenBase.smFontSize * 42,
        // marginLeft: SmartScreenBase.smPercenWidth * 2,
    },
    textScore: {
        color: Colors._BE1E2D,
        fontFamily: FontBase.MyriadPro_Bold,
        fontSize: SmartScreenBase.smFontSize * 42,
    },
    viewLevel: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconLevel: {
        width: SmartScreenBase.smPercenWidth * 8,
        height: SmartScreenBase.smPercenHeight * 3,
        resizeMode: 'contain',
        marginLeft: SmartScreenBase.smPercenWidth * 2,
    },
    emptyTitle: {
        fontFamily: FontBase.MyriadPro_Bold,
        fontSize: SmartScreenBase.smFontSize * 45,
        color: '#414042',
    },
    emptyContent: {
        fontFamily: FontBase.MyriadPro_Light,
        fontSize: SmartScreenBase.smFontSize * 45,
        color: '#414042',
    },


});

export default styles;
