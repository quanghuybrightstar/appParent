import {Dimensions} from 'react-native';
import FontBase from '../../../base/FontBase';
import SmartScreenBase from '../../../base/SmartScreenBase';
import { HEIGHT_DESIGN, WIDTH_DESIGN } from '../../../utils/configs';
const BaseHeight = Dimensions.get('screen').height / 100;
const BaseWidth = Dimensions.get('screen').width / 100;

SmartScreenBase.baseSetup();

export default {
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
    },
    imageContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems:'center',
    },
    txt_Note:{
        fontSize:BaseHeight * 2.3,
        color:'#CCCCCC',
        width:BaseWidth * 70,
    }
    ,
    txt:{
        fontSize:BaseHeight * 2.7,
        color:'white',
    },
    title:{
        marginTop:BaseHeight,
        marginBottom:BaseHeight * 5,
        alignItems:'center',
        color:'white',
        fontSize:BaseHeight * 5,

    },
    formlogin:{
        backgroundColor:'rgba(0,0,0,0.4)',
        width:BaseWidth * 80,
        height:BaseHeight * 60 ,
        borderRadius:20,
        borderWidth:1,
        borderColor:'white',
        alignItems:'center',

    },
    sty_Button:{
        height:BaseHeight * 5,
        backgroundColor:'#FFCC00',
        borderRadius:BaseHeight * 5 / 2,
    },
    txtnote:{
        fontSize:BaseHeight,
        color:'red',
    },
    txt_title:{
        fontSize:BaseHeight * 3,
        color:'white',
    },
    sizetxt:{
        fontSize:BaseHeight * 2,
    },
    sizeicon:{
        fontSize:BaseHeight * 3,
        color:'#CCCCCC',
        marginRight:'5%',
    },
    sizeerror:{
        fontSize:BaseHeight * 2,
        color:'#FF0033',
    },
    StyButton:{
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#012738',
        width:BaseWidth * 70,
        height:BaseHeight * 6,
        borderRadius:20,
    },


    btnViewChungSty:{
        width: SmartScreenBase.smPercenWidth * 68,
        height: SmartScreenBase.smPercenWidth * 11,
    },

    fullMHSty:{
        width: SmartScreenBase.smPercenWidth * 100,
        height: SmartScreenBase.smPercenHeight * 100,
        flexDirection: 'column',
    },

    formChungSty:{
        width: SmartScreenBase.smPercenWidth * 78,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.35)',
        borderRadius: SmartScreenBase.smPercenWidth * 4,
    },

    longInputWidth: SmartScreenBase.smPercenWidth * 65,
    shortInputWidth: SmartScreenBase.smPercenWidth * 32,

    textSSize: SmartScreenBase.smPercenWidth * 4,

    textColor: '#ffffff',
    textColorTran: 'rgba(255,255,255,0.8)',
    textColorGray: '#555555',
    textColorRed: '#DD0000',

    btnTextColor1: '#ffffff',
    btnBgColor1: '#01283A',

    btnTextColor2: '#01283A',
    btnBgColor2: 'rgba(255,255,255,0.8)',
    formLoginNew: {
        backgroundColor: '#F3FFFF',
        flex: 1,
        paddingTop: 20,
        alignItems: 'center',
    },
    forgotPassword: {
        //fontFamily:FontBase.MyriadPro_Bold,
        //fontSize: SmartScreenBase.smFontSize * 45,
        //color: '#4A4848',
        textAlign: 'right',
    },
    containerButtonLogin: {
        marginTop: BaseHeight * 3,
    },
    txtButtonLogin: {
        fontFamily:FontBase.MyriadPro_Regular,
        fontSize: SmartScreenBase.smFontSize * 55,
        color: '#fff',
        width: SmartScreenBase.smPercenWidth * 50,
        textAlign: 'center',
        paddingVertical: SmartScreenBase.smPercenWidth * 3,
    },
    orContainer: {
        width: '100%',
        height: SmartScreenBase.smPercenHeight * (155 / HEIGHT_DESIGN) * 100,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    orText: {
        fontFamily:FontBase.MyriadPro_Regular,
        fontSize: SmartScreenBase.smFontSize * 40,
        color: '#4A4848',
        marginHorizontal:  SmartScreenBase.smPercenWidth * (20 / WIDTH_DESIGN) * 100,
    },
    icon_social: {
        width: SmartScreenBase.smPercenWidth * (142 / WIDTH_DESIGN) * 100,
        height: SmartScreenBase.smPercenWidth * (142 / WIDTH_DESIGN) * 100,
    },
    noHaveAccount: {
        fontFamily:FontBase.MyriadPro_Regular,
        fontSize: SmartScreenBase.smFontSize * 45,
        color: '#4A4848',
    },
    signup: {
        fontFamily:FontBase.MyriadPro_Bold,
        fontSize: SmartScreenBase.smFontSize * 45,
        color: '#00B9B7',
        textDecorationLine: 'underline',
    },

    containerNew: {
        flex: 1,
        backgroundColor: '#F3FFFF',
        alignItems: 'center',
    },
    description: {
        fontFamily:FontBase.MyriadPro_Bold,
        fontSize: SmartScreenBase.smFontSize * 45,
        textAlign: 'center',
        color:'#4A4848',
        width: SmartScreenBase.smPercenWidth * (834 / WIDTH_DESIGN) * 100,
        marginTop: SmartScreenBase.smPercenHeight * (82 / HEIGHT_DESIGN) * 100,
        marginBottom: SmartScreenBase.smPercenHeight * (51 / HEIGHT_DESIGN) * 100,
    },
    iconEmailLock: {
        width: SmartScreenBase.smPercenWidth * (187 / WIDTH_DESIGN) * 100,
        height: SmartScreenBase.smPercenHeight * (120 / HEIGHT_DESIGN) * 100,
        marginVertical: SmartScreenBase.smPercenHeight * (100 / HEIGHT_DESIGN) * 100,
    },
    emailDesc: {
        color: '#00A69C',
    },
    errorText: {
        fontSize: SmartScreenBase.smFontSize * 45,
        fontFamily:FontBase.MyriadPro_Bold_It,
        color: '#CC0000',
        width: SmartScreenBase.smPercenWidth * (925 / WIDTH_DESIGN) * 100,
    },
    resendEmailText: {
        fontSize: SmartScreenBase.smFontSize * 50,
        fontFamily: FontBase.MyriadPro_Regular,
        color: '#00A69C',
        textAlign: 'center',
        width: SmartScreenBase.smPercenWidth * (800 / WIDTH_DESIGN) * 100,
        alignSelf: 'center',
        paddingTop: 12,
        textDecorationLine: 'underline',
    },
};
