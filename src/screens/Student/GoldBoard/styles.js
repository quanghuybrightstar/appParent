import {StyleSheet} from 'react-native';
import SmartScreenBase from "../../../base/SmartScreenBase";
import font from '../../../base/FontBase';
import FontBase from '../../../base/FontBase';
import { Colors } from '../../../styleApp/color';

const itemRankRightWidth = SmartScreenBase.smPercenWidth * 22

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    containerContent: {
        flex: 1,
        margin: SmartScreenBase.smPercenWidth * 4
    },
    containerViewTop: {
        backgroundColor: '#fff',
        width: '100%',
        borderRadius: SmartScreenBase.smPercenWidth * 4,
    },
    viewAchievement: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: SmartScreenBase.smPercenHeight
    },
    backgroundImageAchieve: {
        width: SmartScreenBase.smPercenWidth * 25,
        height: SmartScreenBase.smPercenWidth * 25
    },
    imageWreath: {
        width: '60%',
        height: '60%',
        resizeMode: 'contain',
        position: 'absolute',
        top: '15%',
        left: '20%'
    },
    imageAvatar: {
        width: '55%',
        height: '55%',
        resizeMode: 'contain',
        position: 'absolute',
        top: '17%',
        left: '22.5%',
        resizeMode: 'cover',
        borderRadius: SmartScreenBase.smPercenWidth * 100
    },
    numberContainer: {
        position: 'absolute',
        width: SmartScreenBase.smPercenHeight * 3.2,
        height: SmartScreenBase.smPercenHeight * 3.2,
        bottom: 0,
        justifyContent: 'center',
        alignItems:'center',
        alignSelf: 'center',
        backgroundColor: '#FFFFFFEE',
        borderRadius: SmartScreenBase.smPercenHeight * 3.2,
        borderWidth: 1,
    },
    smallNumberContainer: {
        width: SmartScreenBase.smPercenHeight * 2.6,
        height: SmartScreenBase.smPercenHeight * 2.6,
        borderRadius: SmartScreenBase.smPercenHeight * 2.6,
    },
    numberTxt: {
        textAlign: 'center',
        top: 1,
        fontSize: SmartScreenBase.smPercenHeight * 2.2,
        fontFamily: FontBase.MyriadPro_Bold,
    },
    smallTopTxt: {
        fontSize: SmartScreenBase.smPercenHeight * 1.6,
    },
    backgroundScore: {
        minWidth: SmartScreenBase.smPercenWidth * 18,
        minHeight: SmartScreenBase.smPercenWidth * 6,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: SmartScreenBase.smPercenWidth * 2,
        marginBottom: SmartScreenBase.smPercenHeight * 2,
        // resizeMode: 'contain'
    },
    textScore: {
        color: '#fff',
        fontFamily: font.MyriadPro_Bold,
        fontSize: SmartScreenBase.smFontSize * 40
    },
    textFullName: {
        color: '#000',
        fontFamily: font.MyriadPro_Light,
        textAlign: 'center'
    },
    containerViewContent: {
        flex:1,
        marginTop: SmartScreenBase.smPercenHeight * 2,
        backgroundColor: '#fff',
        width: '100%',
        borderRadius: SmartScreenBase.smPercenWidth * 4,
        paddingTop: SmartScreenBase.smPercenHeight * 2,
        paddingLeft: SmartScreenBase.smPercenWidth * 5
    },
    viewItemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SmartScreenBase.smPercenHeight * 2,
    },
    itemRankContainer: {
        flexDirection: 'row',
        flex:1,
        minWidth: itemRankRightWidth,
        justifyContent: 'flex-end',
        marginRight: SmartScreenBase.smBaseWidth *20,
    },
    itemRankBox: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        width: itemRankRightWidth,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    itemRankChangeBox: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemRankChangeTxt: {
        fontSize: SmartScreenBase.smFontSize * 40,
        // fontWeight: 'bold',
        fontFamily: FontBase.MyriadPro_Bold
    },
    totalScoreContainer: {
        marginLeft: SmartScreenBase.smPercenWidth * 2,
        borderRadius: SmartScreenBase.smPercenHeight * 1,
        backgroundColor: Colors._BE1E2D,
        paddingVertical:SmartScreenBase.smBaseHeight * 2,
        width: SmartScreenBase.smPercenWidth * 12,
        paddingHorizontal: SmartScreenBase.smBaseWidth * 25,
    },
    totalScoreTxt: {
        fontSize: SmartScreenBase.smFontSize * 50,
        color: 'white',
        fontFamily: FontBase.MyriadPro_Bold,
        textAlign: 'center'
    },
    textRank: {
        fontFamily: font.MyriadPro_Bold,
        color: '#000',
        fontSize: SmartScreenBase.smFontSize * 40
    },
    avatarViewContent: {
        width: SmartScreenBase.smPercenWidth * 14,
        height: SmartScreenBase.smPercenWidth * 14,
        resizeMode: 'center',
        marginHorizontal: SmartScreenBase.smPercenWidth * 2,
        borderRadius: SmartScreenBase.smPercenWidth * 100

    },
    textNameViewContent: {
        fontFamily: font.MyriadPro_Light,
        textAlign: 'left',
        flex:1,
        fontSize: SmartScreenBase.smFontSize * 40
    }
});

export default styles
