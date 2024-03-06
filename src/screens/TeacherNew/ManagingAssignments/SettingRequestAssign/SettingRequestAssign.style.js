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
        paddingVertical: SmartScreenBase.smPercenWidth*5,
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
        color: Colors.BaseGreen
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
        paddingTop: SmartScreenBase.smPercenHeight*1,
    },
    fatherListLay: {
        height: SmartScreenBase.smPercenHeight*70
    },
    listLay: {
        width: SmartScreenBase.smPercenWidth*100,
        flexDirection: 'row',
        flexWrap: 'wrap',
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
        marginTop: SmartScreenBase.smPercenWidth*6
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
        marginTop: SmartScreenBase.smPercenHeight*4,
    },
    buttonLay:{
        width: '100%',
        height: SmartScreenBase.smPercenWidth*20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginTop: Platform.OS == 'android' && SmartScreenBase.ratio <= 1.85 ? SmartScreenBase.smPercenHeight*8 : SmartScreenBase.smPercenHeight*5,
    },
    buttonLayModal:{
        width: '100%',
        height: SmartScreenBase.smPercenWidth*16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginTop: Platform.OS == 'android' && SmartScreenBase.ratio <= 1.85 ? SmartScreenBase.smPercenHeight*1 : SmartScreenBase.smPercenHeight*7.5,
    },
    adding: {
        height: SmartScreenBase.smPercenHeight*8,
    },
    boxLay: {
        height: SmartScreenBase.smPercenWidth*34,
        width: SmartScreenBase.smPercenWidth*43,
        backgroundColor: Colors.White,
        borderRadius: SmartScreenBase.smPercenWidth*3,
        marginLeft: SmartScreenBase.smPercenWidth*5,
        marginBottom: SmartScreenBase.smPercenWidth*2,
        ...stylesApp.shadow
    },
    topBox: {
        height: SmartScreenBase.smPercenWidth*8,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SmartScreenBase.smPercenWidth*2,
    },
    bodyBox: {
        height: SmartScreenBase.smPercenWidth*12,
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    botBox: {
        height: SmartScreenBase.smPercenWidth*14,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tittleBox:{
        textAlign: 'left',
        width: SmartScreenBase.smPercenWidth*30,
        fontSize: SmartScreenBase.smFontSize*45,
        color: Colors.BaseGreen,
    },
    levelLay: {
        height: SmartScreenBase.smPercenWidth*8,
        width: SmartScreenBase.smPercenWidth*30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: SmartScreenBase.smPercenWidth*2,
        borderRadius: SmartScreenBase.smPercenWidth*30,
        marginLeft: SmartScreenBase.smPercenWidth*2

    },
    levelT:{
        textAlign: 'center',
        width: SmartScreenBase.smPercenWidth*18,
        fontFamily: FontBase.MyriadPro_Bold,
        fontSize: SmartScreenBase.smFontSize*40,
        color: Colors.White,
    },
    sumLay: {
        height: SmartScreenBase.smPercenWidth*10,
        width: SmartScreenBase.smPercenWidth*38,
        backgroundColor: Colors.White,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SmartScreenBase.smPercenWidth*1,
        borderRadius: SmartScreenBase.smPercenWidth*30,
        ...stylesApp.shadow
    },
    sumT:{
        textAlign: 'center',
        width: SmartScreenBase.smPercenWidth*16,
        fontFamily: FontBase.MyriadPro_Bold,
        fontSize: SmartScreenBase.smFontSize*45,
        color: Colors.Black,
    },
    sumImgS: {
        height: SmartScreenBase.smPercenWidth*9,
        width: SmartScreenBase.smPercenWidth*9,
        resizeMode: 'contain'
    },
    levelImg: {
        height: SmartScreenBase.smPercenWidth*5,
        width: SmartScreenBase.smPercenWidth*6,
        paddingLeft: SmartScreenBase.smPercenWidth*3,
        paddingRight: SmartScreenBase.smPercenWidth*3,
        resizeMode: 'contain'
    },
    noteS:{
        marginLeft: SmartScreenBase.smPercenWidth*6,
        textAlign: 'left',
        width: SmartScreenBase.smPercenWidth*44,
        fontSize: SmartScreenBase.smFontSize*40,
        color: Colors.Black,
    },
    opacityBg: {
        width: SmartScreenBase.smPercenWidth * 100,
        height: SmartScreenBase.smPercenHeight * 100,
        backgroundColor: Colors.BlackOpacity,
        alignItems: 'center',
        justifyContent: 'center'
      },
    modalLay: {
        width: SmartScreenBase.smPercenWidth * 96,
        borderRadius: SmartScreenBase.smPercenWidth * 5,
        backgroundColor: Colors.White,
        alignItems: 'center',
        justifyContent: 'center'
      },
});
export default styles;