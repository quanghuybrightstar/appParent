import { StyleSheet, Dimensions } from 'react-native';
import SmartScreenBase from '../../base/SmartScreenBase';
const { width, height } = Dimensions.get('window');
import DeviceInfo from 'react-native-device-info';

export default StyleSheet.create({
    container: {
        flex: 1
    },
    ViewHeaderContainer: {
        width,
        backgroundColor: '#22222280',
        flexDirection: 'row',
        paddingVertical: SmartScreenBase.smPercenHeight*2,
        paddingHorizontal: SmartScreenBase.smBaseHeight*10,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    viewBack: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingTop:DeviceInfo.hasNotch()?30:10,
    },
    iconBack: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
        marginRight: 15
    },
    titleHeader: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold'
    },
    ViewFlastList: {
        width,
        flex: 1,
        paddingTop: 30,
        paddingBottom:80
    },
    ViewContent: {
        alignItems:'flex-end',
        paddingHorizontal:10,
        width: width,
        marginBottom:30,
        justifyContent:'center',
    },
    viewAll:{
        backgroundColor: '#ecf6f8',
        width:width/1.2,
        paddingVertical: 10,
        paddingRight: 10,
        paddingLeft:'17%',
        borderRadius:25,
        height:height/7,
    },
    viewName: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems:'center',
        paddingRight:'5%'
    },
    titleName: {
        fontSize: 20,
        fontWeight: 'bold',
        width: '75%',
        marginBottom:2
    },
    titleTime: {
        fontSize: 14,
        width: '75%',
        marginBottom:2
    },
    titleMessenger: {
        fontSize: 18,
        fontWeight: 'bold',
        width: '75%',
        marginBottom:2
    },
    titleContent: {
        fontSize: 17,
        color: '#686868',
        width: '75%',
    },
    imageUser:{
        width:100,
        height:100,
        borderRadius:50,
        position:'absolute',
        left:width/30
    },
    butttonAddUser:{
        position:'absolute',
        right:20,
        bottom:height/9,
        width:55,
        height:55
    },
    iconAddUser:{
        width:'100%',
        height:'100%',
        resizeMode:'contain'
    }
})