import {StyleSheet} from 'react-native';
import SmartScreenBase from "../../../../component/base/SmartScreenBase";
import FontBase from '../../../../base/FontBase';
import { Colors } from '../../../../styleApp/color';
import stylesApp from '../../../../styleApp/stylesApp';
import { FontSize, FontWeight } from '../../../../styleApp/font';

const styles = StyleSheet.create({
    container: {
        width: SmartScreenBase.smPercenWidth*100,
        height: SmartScreenBase.smPercenHeight*100,
        resizeMode: 'cover',
    },
    containerMono: {
      flex: 1
    },
    listLay: {
      width: SmartScreenBase.smPercenWidth*100,
      height: SmartScreenBase.smPercenHeight*76,
    },
    programLay: {
        width: SmartScreenBase.smPercenWidth*100,
        alignItems: 'center',
        backgroundColor: Colors.White,
        borderColor: Colors.Gray_E5,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    leftLay: {
        width: SmartScreenBase.smPercenWidth*86,
        alignItems: 'flex-start',
        paddingLeft: SmartScreenBase.smPercenWidth*4,
    },
    rightLay: {
        width: SmartScreenBase.smPercenWidth*14,
        alignItems: 'center'
    },
    iconArr: {
        height: SmartScreenBase.smPercenWidth * 6,
        width: SmartScreenBase.smPercenWidth * 6,
        resizeMode: 'contain'
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
    nameStuS: {
        fontSize: SmartScreenBase.smFontSize*50,
        fontFamily: FontBase.MyriadPro_Bold,
        textAlign: 'left',
        width: SmartScreenBase.smPercenWidth*80,
        color: Colors.Black,
        marginTop: SmartScreenBase.smPercenWidth*2,
        marginBottom: SmartScreenBase.smPercenWidth*1,
    },
    mailS: {
        fontSize: SmartScreenBase.smFontSize*45,
        fontFamily: FontBase.MyriadPro_It,
        textAlign: 'left',
        width: SmartScreenBase.smPercenWidth*80,
        color: Colors.Black,
        marginBottom: SmartScreenBase.smPercenWidth*2,
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
    fixModal:{
      position: 'absolute',
      width: SmartScreenBase.smPercenWidth*100,
      height: SmartScreenBase.smPercenHeight*100,
      alignItems: 'center',
      justifyContent: 'center',
  },
    buttonLay:{
        width: '100%',
        height: SmartScreenBase.smPercenWidth*20,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    adding: {
        height: SmartScreenBase.smPercenHeight*8,
    },
    viewItem: {
        borderBottomWidth: 1,
        borderColor: Colors.Gray_E5,
        paddingVertical: SmartScreenBase.smBaseHeight * 10
      },
      itemImg: {
        width: SmartScreenBase.smBaseWidth * 178,
        height: SmartScreenBase.smBaseWidth * 163,
        borderRadius: SmartScreenBase.smBaseWidth * 20,
        marginRight: SmartScreenBase.smBaseWidth * 20,
        marginLeft: SmartScreenBase.smPercenWidth * 2,
      },
      footerItem: {
        alignItems: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'space-between'
      },
      txtLevel: {
        color: Colors.White,
        ...FontWeight.Bold,
        fontSize: FontSize.size35Font
      },
      txtTopic: {
        width: SmartScreenBase.smPercenWidth * 70,
        color: Colors._00A69C,
      },
      viewLevel: {
        paddingHorizontal: SmartScreenBase.smBaseWidth * 20,
        borderRadius: 5,
        // paddingVertical: SmartScreenBase.smPercenWidth * 0.35,
        height: FontSize.size55Font,
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        left: 0,
        alignItems: 'center',
        justifyContent: 'center'
      },
      iconFile: {
        width: SmartScreenBase.smBaseWidth * 62,
        height: SmartScreenBase.smBaseWidth * 62,
        marginRight: SmartScreenBase.smBaseWidth * 30
      },
      row: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: SmartScreenBase.smBaseHeight * 10
      },
      txtfile: {
        color: Colors._F16522,
        fontSize: FontSize.size40Font,
      },
      deleteLay: {
        padding: SmartScreenBase.smPercenWidth,
      },
      deleteImaS: {
        width: SmartScreenBase.smPercenWidth * 7,
        height: SmartScreenBase.smPercenWidth * 7,
        resizeMode: 'contain',
        marginRight: SmartScreenBase.smPercenWidth*2,
      },
      contentItem: {
        flexDirection: 'row',
      },
      txtCurriculum: { fontSize: FontSize.size40Font, ...FontWeight.Light, flex: 1 },
      lesson_topic: { lineHeight: FontSize.size50Font, ...FontWeight.Bold, },
      addBtnLay: {
        width: '100%',
        height: SmartScreenBase.smPercenWidth * 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      addIconS: {
        width: SmartScreenBase.smPercenWidth * 6,
        height: SmartScreenBase.smPercenWidth * 6,
        resizeMode: 'contain',
      },
      addTextS:{
        textAlign: 'left',
        fontFamily: FontBase.MyriadPro_Bold,
        fontSize: SmartScreenBase.smFontSize*50,
        color: Colors.White,
        marginLeft: SmartScreenBase.smPercenWidth * 2,
    },
    viewBtn: {
      alignItems: 'center',
      marginHorizontal: SmartScreenBase.smPercenWidth * 4,
      marginVertical: SmartScreenBase.smBaseHeight * 10
    },
    viewmodal: {
      margin: 0,
      justifyContent: 'center'
    },
    btnModal: { marginTop: SmartScreenBase.smPercenHeight * 5, justifyContent: 'center' },
    horizontal: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    editImgS: {
      height: SmartScreenBase.smPercenWidth*7,
      width: SmartScreenBase.smPercenWidth*7,
      resizeMode: 'contain'
  },
});
export default styles;