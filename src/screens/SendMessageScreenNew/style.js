import { StyleSheet, Dimensions } from 'react-native';
import SmartScreenBase from '../../base/SmartScreenBase';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1
    },
    ViewHeaderContainer: {
        width,
        backgroundColor: '#22222280',
        flexDirection: 'row',
        paddingVertical: SmartScreenBase.smPercenHeight,
        paddingHorizontal: SmartScreenBase.smPercenWidth*3,
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    viewBack: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between'
    },
    iconBack: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
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
        paddingBottom: 80
    },
    ViewContent: {
        alignItems: 'flex-end',
        paddingHorizontal: 10,
        width: width,
        marginBottom: 30,
        justifyContent: 'center',
    },
    V_SJ: {
        width,
        justifyContent: 'center',
        alignItems: 'center'
    },
    V_SJ_C: {
        height: height / 12,
        backgroundColor: '#fff',
        flexDirection: 'row',
        width: width / 1.2,
        paddingHorizontal: 10,
        borderRadius: 15,
        marginTop: 20
    },
    I_C: {
        height: '100%',
        width: '100%',
        fontSize: 20,
        fontWeight: 'bold'
    },
    V_SMS_C: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    V_SMS: {
        marginTop: 30,
        width: width / 1.2,
        flex: 6,
        borderRadius: 25, backgroundColor: '#fff',
        padding: 15,
        maxHeight: height / 3.5
    },
    I_SMS: {
        fontSize: 15,
        textAlign: 'justify',
        height:50,
        alignItems:'flex-start'
    },
    V_B_C:{
        width,
        flex:4,
        justifyContent:'center',
        alignItems:'center'
    },
    buttonBottom: {
        backgroundColor: '#01283A',
        paddingHorizontal: 30,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        position:'absolute',
        width:width/1.3,
        bottom:10
    },
    T_B: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff'
    }

})