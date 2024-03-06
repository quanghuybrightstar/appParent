import {
    StyleSheet,
    Platform
} from 'react-native';
import FontBase from '../../base/FontBase';
import SmartScreenBase from '../../base/SmartScreenBase';

const smartScreenHeight = SmartScreenBase.smPercenHeight;
const smartScreenWidth = SmartScreenBase.smPercenWidth;
const smartFont = SmartScreenBase.smFontSize;

export const styles = StyleSheet.create({
    _v_f: {
        height: smartScreenHeight * 10,
        paddingHorizontal: smartScreenWidth * 2.5,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    _v_f_c: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
    },
    _v_f_c_c: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        width: smartScreenWidth * 45,
        height: smartScreenHeight * 6,
        borderRadius: smartScreenWidth * 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: smartScreenHeight,
    },
    _v_d_d: {
        width: '25%',
        borderRightWidth: 1,
        borderColor: '#fff',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    _v_d_c: {
        width: '75%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    defaultText: {
        color: '#fff',
        fontSize: smartFont * 45,
        fontFamily: FontBase.MyriadPro_Regular
    },
    _itemTabBar: {
        flex: 1,
        height: smartScreenHeight * 5,
        borderBottomColor: '#f5bb43',
    },
    _btnItemTb: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    _txtItemTb: {
        color: '#fff',
        fontSize: smartFont * 45,
        fontFamily: FontBase.MyriadPro_Regular
    },
    _r_tb: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
        marginTop: smartScreenHeight,
    },
    scene: {
        flex: 1,
        paddingHorizontal: smartScreenWidth * 2.5,
        backgroundColor: '#f5f8fc',
    },
    _viewRenderData: {
        flexDirection: 'row',
        paddingVertical: smartScreenHeight * 1.5,
        height: smartScreenHeight * 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    _s_img: {
        width: SmartScreenBase.smPercenWidth * 5,
        height: SmartScreenBase.smPercenWidth * 5,
    },
    view_content: {
        marginTop: SmartScreenBase.smPercenHeight * 5,
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: smartScreenWidth * 5,
    },
    list_address: {
        height: SmartScreenBase.smPercenHeight * 25,
        backgroundColor: '#fff',
        borderRadius: smartScreenWidth * 6,
        zIndex: 1,
        overflow:'hidden',
        borderBottomWidth:1,
        borderRightWidth:1,
        borderBottomRightRadius:SmartScreenBase.smPercenWidth*6,
        borderColor:'#ececec'
    },
    _r_i_a: {
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 0.5,
    },
    addressTxt: {
        fontSize: SmartScreenBase.smFontSize * 45,
        padding: SmartScreenBase.smPercenHeight,
        fontFamily: FontBase.MyriadPro_Regular,
    },
    _view_fl: {
        // marginTop: SmartScreenBase.smPercenHeight * 4,
        paddingHorizontal: SmartScreenBase.smPercenWidth * 2,
    },
    _view_pos: {
        backgroundColor: '#022839',
    },
    btnModal:{
        position: 'absolute',
        backgroundColor:'#fff',
        borderRadius:SmartScreenBase.smPercenWidth*6,
        height:SmartScreenBase.smPercenHeight*25,
        width:SmartScreenBase.smPercenWidth*45 ,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    btnTouch:{
        backgroundColor:'#00837E',
        height:SmartScreenBase.smPercenHeight*6,
        borderRadius:SmartScreenBase.smPercenWidth*6,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems: 'center',
        paddingVertical:SmartScreenBase.smPercenHeight
    }
});

export const stylesTrueFalse = StyleSheet.create({
    view_item_tf: {
        minHeight: SmartScreenBase.smPercenWidth*6.2,
        flexDirection: 'row',
        // justifyContent: 'center',
        //alignItems: 'center',
        marginTop: SmartScreenBase.smPercenHeight * 2,
        paddingLeft: SmartScreenBase.smPercenWidth * 7,
        paddingHorizontal: SmartScreenBase.smPercenWidth * 5
    },
    img_radio: {
        width: SmartScreenBase.smPercenWidth * 5,
        height: SmartScreenBase.smPercenWidth * 5,
    },
    viewRadio: {
        width: SmartScreenBase.smPercenWidth * 5,
        height: SmartScreenBase.smPercenWidth * 5,
        borderRadius: SmartScreenBase.smPercenWidth * 5,
        borderWidth: 1,
        borderColor: '#5C5C5C',
        marginTop:(Platform.OS==='android'?3:-1)
    },
    moViewRadioSty: {
        width: SmartScreenBase.smPercenWidth * 11,
        height: SmartScreenBase.smPercenWidth * 5,
        marginLeft: -SmartScreenBase.smPercenWidth * 7,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
    },
    txt: {
        fontSize: SmartScreenBase.smFontSize * 50,
        paddingLeft: SmartScreenBase.smPercenWidth * 5,
        fontFamily:FontBase.MyriadPro_Regular
    },
    txt_def: {
        fontSize: SmartScreenBase.smFontSize * 50,
        fontFamily:FontBase.MyriadPro_Regular
    },
});

export const stylesFillTheBlank = StyleSheet.create({
    viewQuestion: {
    },
    textInput: {
        marginVertical: 0,
        paddingVertical: 0,
        fontSize: SmartScreenBase.smFontSize * 40,
        fontFamily: FontBase.MyriadPro_Bold,
        minWidth: SmartScreenBase.smPercenWidth * 20,
        height: SmartScreenBase.smPercenHeight * 4,
        paddingHorizontal: SmartScreenBase.smPercenWidth * 3,
        borderWidth: 1,
        borderRadius: SmartScreenBase.smPercenWidth * 2,
        marginLeft: SmartScreenBase.smPercenWidth
    },
});

export const stylesAnswerTheQuestion = StyleSheet.create({
    viewQuestion: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    textInput: {
        marginVertical: 0,
        paddingVertical: 0,
        color:'black',
        fontSize: SmartScreenBase.smFontSize * 40,
        fontFamily: FontBase.MyriadPro_Regular,
        // fontWeight: 'bold',
        // width: SmartScreenBase.smPercenWidth * 80,
        height: SmartScreenBase.smPercenHeight * 6,
        paddingHorizontal: SmartScreenBase.smPercenWidth * 3,
        borderWidth: 1,
        borderRadius: SmartScreenBase.smPercenWidth * 2,
        // marginLeft: SmartScreenBase.smPercenWidth
    },
});
