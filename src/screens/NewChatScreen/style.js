import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import DeviceInfo from 'react-native-device-info';
import FontBase from '../../base/FontBase';
import SmartScreenBase from '../../base/SmartScreenBase';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f7f3'
    },
    ViewHeaderContainer: {
        width,
        backgroundColor: '#52bbb3',
        paddingTop: height / 30,
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 10,
        paddingRight: 25,
        alignItems:'center'
    },
    viewBack: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop:DeviceInfo.hasNotch()?20:0,
    },
    iconBack: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
        marginRight: 10
    },
    titleHeader: {
        fontSize: SmartScreenBase.smFontSize*55,
        color: '#fff',
        fontFamily: FontBase.MyriadPro_Bold
        // fontWeight: 'bold'
    },
    ViewFlastList: {
        width,
        flex: 1,
        paddingTop: 30,
        paddingBottom: 15,
        // borderTopWidth:1,
        // borderTopColor:'#e9f3ed',
    },
    ViewContent: {
        alignItems: 'flex-end',
        paddingHorizontal: 10,
        width: width,
        marginBottom: SmartScreenBase.smPercenHeight*1.5,
        justifyContent: 'center',
    },
    viewAll: {
        backgroundColor: '#fefefe',
        width: width / 1.15,
        paddingVertical: 10,
        paddingLeft: 40,
        paddingRight: 10,
        borderRadius: 25,
        height: width / 4,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    viewName: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: '5%'
    },
    titleName: {
        fontSize: 20,
        fontWeight: 'bold',
        flex :1
    },
    titleTime: {
        fontSize: 14,
        marginTop: 6,
        fontWeight:'bold'
    },
    titleMessenger: {
        fontSize: SmartScreenBase.smFontSize*50,
        fontFamily:FontBase.MyriadPro_Bold,
        width: '75%',
        marginBottom: 2
    },
    titleContent: {
        fontSize: SmartScreenBase.smFontSize*50,
        flex: 1,
        marginTop:SmartScreenBase.smBaseHeight*4,
        fontFamily:FontBase.MyriadPro_Regular
    },
    imageUser: {
        width: width / 8,
        height: width / 8,
        borderRadius: 50,
        position: 'absolute',
        left: width / 16,
        top: 0
    },
    butttonAddUser: {
        position: 'absolute',
        right: 15,
        bottom: 15,
        width: 60,
        height: 60
    },
    iconAddUser: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    messageTitleSeenTxt: {
        fontFamily: FontBase.MyriadPro_Regular,
        color: '#000000'
    },
    messageContentSeenTxt: {
        fontFamily: FontBase.MyriadPro_Regular,
    }
})
