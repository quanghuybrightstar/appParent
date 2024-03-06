import FontBase from '../../../base/FontBase';
import {
    StyleSheet,
    Platform
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const smartScreenHeight = SmartScreenBase.smPercenHeight;
const smartScreenWidth = SmartScreenBase.smPercenWidth;
const smartFont = SmartScreenBase.smFontSize;

import SmartScreenBase from '../../../base/SmartScreenBase';

export const stylesHistory = StyleSheet.create({
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
        fontFamily: FontBase.MyriadPro_Regular,
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
        fontFamily: FontBase.MyriadPro_Regular,
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
        height: smartScreenHeight * 11,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal:smartScreenWidth*2,
        borderBottomWidth:1,
        borderBottomColor:'#dcdcdc'
    },
    _s_img: {
        width: SmartScreenBase.smPercenWidth * 5,
        height: SmartScreenBase.smPercenWidth * 5,
    },
    view_content: {
        marginTop: SmartScreenBase.smPercenHeight ,
        flex: 1,
        backgroundColor: '#fff',
    },
    list_address: {
        height: SmartScreenBase.smPercenHeight * 25,
        backgroundColor: '#fff', borderRadius: smartScreenWidth * 4,
        position: 'absolute',
        zIndex: 9,
        width: smartScreenWidth * 45,
        top: SmartScreenBase.smPercenHeight * 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        paddingTop: SmartScreenBase.smPercenHeight * 3,

    },
    _r_i_a: {
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 0.5,
    },
    addressTxt: {
        fontSize: SmartScreenBase.smFontSize * 45,
        fontFamily: FontBase.MyriadPro_Regular,
        padding: SmartScreenBase.smPercenHeight,
    },
    _view_fl: {
        // marginTop: SmartScreenBase.smPercenHeight * 4,
        paddingHorizontal: SmartScreenBase.smPercenWidth * 2,
    },
    row1: {
        width: smartScreenWidth * 14,
        height: '100%',
        justifyContent: 'flex-start',
        alignItems:'center'
    },
    img_mu: {
        width: smartScreenWidth * 10,
        height: smartScreenWidth * 10,
    },
    row_2: {
        flex:1,
        height: '100%',
        paddingTop:SmartScreenBase.smBaseHeight*6,
        justifyContent: 'space-between'
    },
    row_3: {
        width: smartScreenWidth * 20,
        paddingTop:SmartScreenBase.smBaseHeight*10,
        height: '100%',
        justifyContent: 'flex-end',
        alignItems:'center',
    },
    row_4: {
        width: smartScreenWidth * 20,
        paddingTop:SmartScreenBase.smBaseHeight*10,
        height: '100%',
        justifyContent: 'space-between',
        alignItems:'center',
    },
    exam_name: {
        fontSize: smartFont * 45,
        fontFamily: FontBase.MyriadPro_Bold,
    },
    text_df: {
        fontSize: smartFont * 40,
        fontFamily: FontBase.MyriadPro_Regular,
    },
    text_df2: {
        fontSize: smartFont * 40,
        fontFamily: FontBase.MyriadPro_Bold,
    },
    loading: {
        flex: 1, position: 'absolute', zIndex: 100000,
    },
});

export const stylesIndex = StyleSheet.create({
    _v_f: {
        height: smartScreenHeight * 10,
        paddingHorizontal: smartScreenWidth * 2.5,
        justifyContent: 'center',
        alignItems: 'center',
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
        fontFamily: FontBase.MyriadPro_Regular,
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
        paddingHorizontal: smartScreenWidth * 1.5,
        backgroundColor: '#f5f8fc',
    },
    _viewRenderData: {
        flexDirection: 'row',
        paddingVertical: smartScreenHeight * 1,
        height: smartScreenHeight * 11,
        justifyContent: 'space-around',
        alignItems: 'center',
        borderBottomWidth:1,
        borderBottomColor:'#dcdcdc',
        marginHorizontal:smartScreenWidth*2
    },
    _s_img: {
        width: SmartScreenBase.smPercenWidth * 5,
        height: SmartScreenBase.smPercenWidth * 5,
    },
});

export const stylesHeader = StyleSheet.create({
    view_header: {
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        flexDirection: 'row',
        padding: 10
    },
    view_content: {
        // marginLeft: SmartScreenBase.smPercenWidth * 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Platform.OS === 'ios' ? SmartScreenBase.smPercenHeight * 3 : 0,
    },
    img_back: {
        width: SmartScreenBase.smPercenWidth * 5,
        height: SmartScreenBase.smPercenWidth * 5,
    },
    title: {
        color: 'white',
        // marginLeft: SmartScreenBase.smPercenWidth * 5,
        fontSize: SmartScreenBase.smPercenWidth * 5,
        padding: smartScreenHeight,
        fontFamily: FontBase.MyriadPro_Regular
    },
    img_history: {
        width: SmartScreenBase.smPercenWidth * 10,
        height: SmartScreenBase.smPercenWidth * 7,
    },
    btn_his: {
        marginTop: Platform.OS === 'ios' ? SmartScreenBase.smPercenHeight * 3 : 0,
    },
});

export const stylesDetails = StyleSheet.create({
    _v_f: {
        paddingHorizontal: smartScreenWidth * 5,
    },
    title: {
        paddingTop: smartScreenHeight * 3,
        fontSize: smartFont * 55,
        color: '#fff',
        fontFamily: FontBase.MyriadPro_Bold
    },
    tutorialText: {
        fontSize: smartFont * 45,
        fontFamily: FontBase.MyriadPro_Regular,
    },
    tutorialTextSmall: {
        fontSize: smartFont * 42,
        fontFamily: FontBase.MyriadPro_Regular,
    },
    tutorialTextBold: {
        fontFamily: FontBase.MyriadPro_Bold
    },
    title2: {
        fontSize: smartFont * 45,
        color: '#fff',
        fontFamily: FontBase.MyriadPro_Bold
    },
    _v_c: {
        flex: 1,
        marginTop: smartScreenHeight * 2,
        backgroundColor: '#fff',
        borderTopRightRadius: smartScreenWidth * 5,
        borderTopLeftRadius: smartScreenWidth * 5,
    },
    _v_header: {
        width: '100%',
        height: smartScreenHeight * 8,
        flexDirection: 'row',
    },
    _v_row: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    _v_content: {
        flex: 1,
        paddingHorizontal: smartScreenWidth * 5,
        maxHeight: SmartScreenBase.smPercenHeight * 52
    },
    _v_c_t: {
        flex: 1,
        backgroundColor: '#e6e7e8',
        borderRadius: smartScreenWidth * 5,
        alignItems: 'center',
    },
    _v_footer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    _btn: {
        width: smartScreenWidth * 50,
        height: smartScreenHeight * 6,
        backgroundColor: '#f08b01',
        borderRadius: smartScreenWidth * 60,
        justifyContent: 'center',
        alignItems: 'center',
        margin: smartScreenHeight * 3,
    },
    _c_h_d_h_t: {
        width: '100%',
    },
    _item_hdht: {
        flexDirection: 'row',
        width: '100%',
        marginTop: smartScreenHeight,
    },
    _item_img: {
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    _item_content: {
        width: '80%',
        justifyContent: 'center',
        paddingHorizontal: smartScreenWidth * 2,
    },
    notes: {
        margin: smartScreenHeight,
        paddingHorizontal: smartScreenWidth * 2,
    },
});

export const stylesExam = StyleSheet.create({
    view_header: {
        height: SmartScreenBase.smPercenHeight * 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn_send: {
        width: SmartScreenBase.smPercenWidth * 55,
        borderRadius: SmartScreenBase.smPercenWidth * 55,
        backgroundColor: '#022839',
        justifyContent: 'center',
        alignItems: 'center',
    },
    txt: {
        fontSize: SmartScreenBase.smFontSize * 55,
        color: '#fff',
        padding: SmartScreenBase.smPercenHeight * 2,
        fontFamily: FontBase.MyriadPro_Bold
    },
    contents: {
        flex: 1,
        backgroundColor: '#F5F9FC',
        paddingHorizontal: SmartScreenBase.smPercenWidth * 5,
    },
    header_content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop:SmartScreenBase.smPercenHeight
    },
    preview: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    img_checkbox: {
        width: SmartScreenBase.smPercenWidth * 5,
        height: SmartScreenBase.smPercenWidth * 5,
    },
    text_def: {
        fontSize: SmartScreenBase.smFontSize * 50,
        fontFamily: FontBase.MyriadPro_Regular
    },
    total_question: {
        width: SmartScreenBase.smPercenWidth * 25,
        borderRadius: SmartScreenBase.smPercenWidth * 10,
        backgroundColor: '#FEB605',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        marginTop: SmartScreenBase.smPercenHeight * 3,
        height: SmartScreenBase.smPercenHeight * 52,
        backgroundColor: '#fff',
        borderRadius: SmartScreenBase.smPercenWidth * 3,
        paddingHorizontal: SmartScreenBase.smPercenWidth * 3,
    },
    content2: {
        marginTop: SmartScreenBase.smPercenHeight * 3,
        flex:1,
        backgroundColor: '#fff',
        borderRadius: SmartScreenBase.smPercenWidth * 3,
        paddingVertical:SmartScreenBase.smPercenHeight,
        zIndex:99999,
        elevation:9999
    },
    content3: {
        marginTop: SmartScreenBase.smPercenHeight * 3,
        flex:1,
        backgroundColor: '#fff',
        borderRadius: SmartScreenBase.smPercenWidth * 3,
        paddingVertical:SmartScreenBase.smPercenHeight,
        paddingHorizontal: SmartScreenBase.smPercenWidth * 3,
    },
    content4: {
        marginTop: SmartScreenBase.smPercenHeight * 3,
        flex:1,
        backgroundColor: '#fff',
        borderRadius: SmartScreenBase.smPercenWidth * 3,
        paddingHorizontal: SmartScreenBase.smPercenWidth * 3,
    },
    view_question: {
        flex: 1,
    },
    footer: {
        height: SmartScreenBase.smPercenHeight * 12,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: SmartScreenBase.smPercenWidth * 10,
        zIndex:0,
    },
    img_nextback: {
        width: SmartScreenBase.smPercenWidth * 14,
        height: SmartScreenBase.smPercenWidth * 8,
    },
    time: {
        width: SmartScreenBase.smPercenWidth * 30,
        height: SmartScreenBase.smPercenHeight * 7,
        borderRadius: SmartScreenBase.smPercenWidth * 3,
        backgroundColor: '#fff',
        borderWidth: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    timer: {
        fontSize: SmartScreenBase.smFontSize * 70,
        fontFamily: FontBase.MyriadPro_Regular
    },
    viewModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000080',
    },
    viewContentModal: {
        //height: SmartScreenBase.smPercenHeight * 30,
        width: SmartScreenBase.smPercenWidth * 80,
        borderRadius: SmartScreenBase.smPercenWidth * 5,
        backgroundColor: "#fff",
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: SmartScreenBase.smPercenHeight * 2
    },
    viewChildModal: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: SmartScreenBase.smPercenWidth * 3,
        paddingTop: SmartScreenBase.smPercenWidth * 5,
    },
    viewBtnModal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: SmartScreenBase.smPercenWidth * 80,
        marginTop: 25
        // position: 'absolute',
        // bottom: - SmartScreenBase.smPercenHeight * 9
    },
    btnModal: {
        width: SmartScreenBase.smPercenWidth * 30,
        height: SmartScreenBase.smPercenHeight * 5,
        borderRadius: SmartScreenBase.smPercenWidth * 30,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

