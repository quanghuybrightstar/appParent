import {StyleSheet} from 'react-native';
import FontBase from '../../../../base/FontBase';
import { Colors } from '../../../../styleApp/color';
import stylesApp from '../../../../styleApp/stylesApp';
import { Platform } from 'react-native';
import SmartScreenBase from '../../../../base/SmartScreenBase';

const styles = StyleSheet.create({
    container: {
        width: SmartScreenBase.smPercenWidth*100,
        height: SmartScreenBase.smPercenHeight*100,
        resizeMode: 'cover',
    },
    programLay: {
        width: SmartScreenBase.smPercenWidth*92,
        minheight: SmartScreenBase.smPercenWidth*22,
        paddingVertical: SmartScreenBase.smPercenWidth*4,
        alignItems: 'center'
    },
    sliderS: {
        width: SmartScreenBase.smPercenWidth*76,
    },
    trackStyle: {
        height: SmartScreenBase.smPercenWidth * 3,
        borderRadius: SmartScreenBase.smPercenWidth * 5,
    },
    thumbStyle: {
        width: SmartScreenBase.smPercenWidth * 5,
        height: SmartScreenBase.smPercenWidth * 5,
        borderColor: Colors.Orange_F8,
        borderWidth: 1,
        ...stylesApp.shadow
    },
    tittleMonoS: {
        textAlign: 'left',
        width: SmartScreenBase.smPercenWidth*76,
        color: Colors.BaseGreen,
        fontFamily: FontBase.MyriadPro_Bold
    },
    botMonoLay: {
        width: SmartScreenBase.smPercenWidth*76,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    pracT: {
        fontSize: SmartScreenBase.smFontSize*42,
        fontFamily: FontBase.MyriadPro_It,
        textAlign: 'left',
        width: SmartScreenBase.smPercenWidth*30,
        color: Colors.Black
    },
    learnT: {
        fontSize: SmartScreenBase.smFontSize*42,
        fontFamily: FontBase.MyriadPro_It,
        textAlign: 'right',
        width: SmartScreenBase.smPercenWidth*40,
        color: Colors.Black
    },
    mainLay: {
        width: SmartScreenBase.smPercenWidth*100,
        height: SmartScreenBase.smPercenHeight*100,
        alignItems: 'center',
    },
    iconPro:{
        width: SmartScreenBase.smPercenWidth*27/4,
        height: SmartScreenBase.smPercenWidth*27/4,
        resizeMode: 'contain',
        marginLeft: SmartScreenBase.smPercenWidth*3,
    },
    tittleS:{
        textAlign: 'left',
        width: SmartScreenBase.smPercenWidth*48,
        fontSize: SmartScreenBase.smFontSize*50,
    },
    tittleLay:{
        width: SmartScreenBase.smPercenWidth*90,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: Platform.OS == 'android' && SmartScreenBase.ratio <= 1.85 ? SmartScreenBase.smPercenWidth*2 : SmartScreenBase.smPercenWidth*5
    },
    unitLay:{
        width: SmartScreenBase.smPercenWidth*41,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    unitS:{
        textAlign: 'center',
        fontFamily: FontBase.MyriadPro_Bold,
        width: SmartScreenBase.smPercenWidth*20,
        fontSize: SmartScreenBase.smFontSize*45,
    },
    tittleLastS:{
        textAlign: 'left',
        width: SmartScreenBase.smPercenWidth*90,
        fontSize: SmartScreenBase.smFontSize*50,
        marginTop: Platform.OS == 'android' && SmartScreenBase.ratio <= 1.85 ? SmartScreenBase.smPercenHeight*1 : SmartScreenBase.smPercenHeight*4,
    },
    detailLay:{
        padding: SmartScreenBase.smPercenWidth*1,
    },
    detailS:{
        textAlign: 'right',
        width: SmartScreenBase.smPercenWidth*78,
        fontSize: SmartScreenBase.smFontSize*45,
        textDecorationLine: 'underline',
        color: Colors.Orange_F8,
        fontFamily: FontBase.MyriadPro_Bold
    },
    noteS:{
        textAlign: 'left',
        width: SmartScreenBase.smPercenWidth*90,
        fontSize: SmartScreenBase.smFontSize*40,
        marginTop: SmartScreenBase.smPercenHeight*1,
    },
    buttonLay:{
        width: '100%',
        height: SmartScreenBase.smPercenWidth*20,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    adding: {
        height: SmartScreenBase.smPercenHeight*100,
    },
    grayBGLay:{
        width: SmartScreenBase.smPercenWidth*100,
        height: SmartScreenBase.smPercenHeight*100,
        backgroundColor: Colors.BlackOpacity,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalLay:{
        width: SmartScreenBase.smPercenWidth*84,
        minHeight: SmartScreenBase.smPercenWidth*80,
        backgroundColor: Colors.White,
        borderRadius: SmartScreenBase.smPercenWidth*4,
    },
    closeBtnLay:{
        width: SmartScreenBase.smPercenWidth*13,
        height: SmartScreenBase.smPercenWidth*13,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: -SmartScreenBase.smPercenWidth*5,
        right: -SmartScreenBase.smPercenWidth*5,
    },
    closeBtn:{
        width: SmartScreenBase.smPercenWidth*10,
        height: SmartScreenBase.smPercenWidth*10,
        resizeMode: 'contain',
    },
    tittleModalLay:{
        flexDirection: 'row',
        width: '100%',
        height: SmartScreenBase.smPercenWidth*16,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: SmartScreenBase.smPercenWidth*6,
    },
    contentModalLay:{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: SmartScreenBase.smPercenWidth*2,
    },
    tittleModal:{
        textAlign: 'center',
        width: SmartScreenBase.smPercenWidth*38,
        fontSize: SmartScreenBase.smFontSize*50,
        color: Colors.Red_BE1,
        fontFamily: FontBase.MyriadPro_Bold
    },
    skillInfoLay:{
        width: '100%',
        height: SmartScreenBase.smPercenWidth*10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    notBlueS:{
        width: SmartScreenBase.smPercenWidth*2,
        height: SmartScreenBase.smPercenWidth*2,
        backgroundColor: Colors.BaseGreen,
        borderRadius: SmartScreenBase.smPercenWidth*10,
    },
    skillInfoS:{
        textAlign: 'left',
        width: SmartScreenBase.smPercenWidth*34,
        fontSize: SmartScreenBase.smFontSize*45,
        color: Colors.Black,
        marginLeft: SmartScreenBase.smPercenWidth*3,
    },
    levelInfoS:{
        textAlign: 'center',
        width: SmartScreenBase.smPercenWidth*28,
        fontSize: SmartScreenBase.smFontSize*45,
        color: Colors.Black,
    },
    eleLine:{
        width: SmartScreenBase.smPercenWidth*70,
        height: 1,
        backgroundColor: Colors.GrayB6,
    },
});
export default styles;