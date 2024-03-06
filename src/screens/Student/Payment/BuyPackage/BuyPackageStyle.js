import {StyleSheet, Platform, Dimensions, View} from 'react-native';
import SmartScreenBase from "../../../../base/SmartScreenBase";
import React from 'react';
import FontBase from '../../../../base/FontBase';
import { Colors } from '../../../../styleApp/color';
import stylesApp from '../../../../styleApp/stylesApp'
export default StyleSheet.create({
    contain:{
        flex: 1
    },
    imgLayoutSt:{
        marginTop: SmartScreenBase.smPercenWidth*5,
        flexDirection: 'column',
        width: SmartScreenBase.smPercenWidth*100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageSty:{
        height: SmartScreenBase.smPercenWidth*30,
        width: SmartScreenBase.smPercenWidth*30,
        borderRadius: SmartScreenBase.smPercenWidth*2,
    },
    tittleLayoutSt:{
        flexDirection: 'column',
        width: SmartScreenBase.smPercenWidth*100,
        borderRadius: SmartScreenBase.smPercenWidth*2,
        alignItems: 'center',
        marginTop: SmartScreenBase.smPercenWidth*5,
    },
    tittleSty:{
        width: SmartScreenBase.smPercenWidth*90,
        fontFamily: FontBase.MyriadPro_Bold,
        fontSize: SmartScreenBase.smFontSize*45,
        textAlign: 'center'
    },
    bodyLaySt:{
        flexDirection: 'column',
        width: SmartScreenBase.smPercenWidth*100,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: SmartScreenBase.smPercenWidth*5,
        marginBottom: SmartScreenBase.smPercenWidth*5,
    },
    lineLaySt:{
        flexDirection: 'row',
        marginBottom: Platform.OS == 'ios' ? 0 : SmartScreenBase.smPercenWidth*1.5
    },
    bodySty:{
        width: SmartScreenBase.smPercenWidth*64,
        fontFamily: FontBase.MyriadPro_Regular,
        fontSize: SmartScreenBase.smFontSize*45,
    },
    ImageTickSty:{
        width: SmartScreenBase.smBaseWidth*50,
        height: SmartScreenBase.smBaseWidth*50,
        marginRight: SmartScreenBase.smPercenWidth*2,
    },
    priceBgSt:{
        position: 'absolute',
        bottom: SmartScreenBase.smPercenWidth*5,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: SmartScreenBase.smPercenWidth*100,
        backgroundColor: Colors.White
    },
    boxPriceSt:{
        marginTop: SmartScreenBase.smPercenWidth*2,
        flexDirection: 'row',
        alignItems: 'center',
        width: SmartScreenBase.smPercenWidth*96,
        height: SmartScreenBase.smPercenWidth*12,
        borderRadius: SmartScreenBase.smPercenWidth*3,
        paddingLeft: SmartScreenBase.smPercenWidth*4,
    },
    radioLaySt:{
        width: SmartScreenBase.smPercenWidth*6.5,
        height: SmartScreenBase.smPercenWidth*6.5,
        borderRadius: SmartScreenBase.smPercenWidth*5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    radio_onSt:{
        width: SmartScreenBase.smPercenWidth*3.8,
        height: SmartScreenBase.smPercenWidth*3.8,
    },
    packNameLaySt:{
        paddingLeft: SmartScreenBase.smPercenWidth*2,
        width: SmartScreenBase.smPercenWidth*44,
    },
    packNameTextSt:{
        width: SmartScreenBase.smPercenWidth*35,
        fontFamily: FontBase.MyriadPro_Regular,
        fontSize: SmartScreenBase.smFontSize*45
    },
    priceLaySt:{
        flexDirection: 'column',
        width: SmartScreenBase.smPercenWidth*25,
    },
    oldPriceSt:{
        width: SmartScreenBase.smPercenWidth*25,
        fontFamily: FontBase.MyriadPro_Regular,
        fontSize: SmartScreenBase.smFontSize*40,
        textDecorationLine: "line-through",
        textAlign: 'right',
        paddingRight: SmartScreenBase.smPercenWidth*1.6
    },
    vndOldPriceSt:{
        width: SmartScreenBase.smPercenWidth*7,
        fontFamily: FontBase.MyriadPro_Regular,
        fontSize: SmartScreenBase.smFontSize*30,
        color: Colors.Black,
        position: 'absolute',
        textAlign: 'right',
        right: 0
    },
    newPriceSt:{
        width: SmartScreenBase.smPercenWidth*25,
        fontFamily: FontBase.MyriadPro_Bold,
        fontSize: SmartScreenBase.smFontSize*55,
        color: Colors.Red,
        textAlign: 'right',
        paddingRight: SmartScreenBase.smPercenWidth*2
    },
    vndPriceSt:{
        width: SmartScreenBase.smPercenWidth*7,
        fontFamily: FontBase.MyriadPro_Bold,
        fontSize: SmartScreenBase.smFontSize*40,
        color: Colors.Red,
        position: 'absolute',
        textAlign: 'right',
        right: 0
    },
    discoutSt:{
        width: SmartScreenBase.smPercenWidth*14,
        marginLeft: SmartScreenBase.smPercenWidth,
    },
    discoutTextTopSt:{
        width: SmartScreenBase.smPercenWidth*14,
        fontFamily: FontBase.MyriadPro_Bold,
        fontSize: SmartScreenBase.smFontSize*40,
        color: Colors.BaseGreen,
        textAlign: 'center'
    },
    discoutTextBotSt:{
        width: SmartScreenBase.smPercenWidth*14,
        fontFamily: FontBase.MyriadPro_Bold,
        fontSize: SmartScreenBase.smFontSize*55,
        color: Colors.BaseGreen,
        textAlign: 'center'
    },
    boxLaySt:{
        width: SmartScreenBase.smPercenWidth*80,
        backgroundColor: Colors.White,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: SmartScreenBase.smPercenWidth*5,
        borderRadius: SmartScreenBase.smPercenWidth*3,
        elevation: 8,
        shadowOffset: { width: 0, height: 2},
        shadowColor: '#000',
        shadowOpacity: 0.25,
    },
    scrollLay:{
        width: SmartScreenBase.smPercenWidth*100,
        alignItems: 'center',
        marginTop: SmartScreenBase.smPercenWidth*8,
    },
    headerLay:{
        width: '100%',
        height: SmartScreenBase.smPercenWidth*15,
        backgroundColor: Colors.Red_EB5,
        borderTopRightRadius: SmartScreenBase.smPercenWidth*3,
        borderTopLeftRadius: SmartScreenBase.smPercenWidth*3,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: SmartScreenBase.smPercenWidth*0,
    },
    tittlePack:{
        width: SmartScreenBase.smPercenWidth*60,
        fontFamily: FontBase.MyriadPro_Bold,
        fontSize: SmartScreenBase.smFontSize*55,
        color: Colors.White,
        textAlign: 'center'
    },
    desPack:{
        width: SmartScreenBase.smPercenWidth*60,
        fontFamily: FontBase.MyriadPro_Regular,
        fontSize: SmartScreenBase.smFontSize*50,
        color: Colors.White,
        textAlign: 'center'
    },
    priceRootPack:{
        fontFamily: FontBase.MyriadPro_Regular,
        fontSize: SmartScreenBase.smFontSize*55,
        color: Colors.DarkGray3,
        textDecorationLine: "line-through",
        textAlign: 'center'
    },
    priceRootDongPack:{
        fontFamily: FontBase.MyriadPro_Regular,
        fontSize: SmartScreenBase.smFontSize*40,
        color: Colors.DarkGray3,
        textAlign: 'center'
    },
    priceRealDongPack:{
        fontFamily: FontBase.MyriadPro_Bold,
        fontSize: SmartScreenBase.smFontSize*60,
        color: Colors.Red_EB5,
        textAlign: 'center'
    },
    priceRealPack:{
        fontFamily: FontBase.MyriadPro_Bold,
        fontSize: SmartScreenBase.smFontSize*90,
        color: Colors.Red_EB5,
        textAlign: 'center'
    },
    priceRootLay:{
        flexDirection: 'row',
        width: '100%',
        height: SmartScreenBase.smPercenWidth*6,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    priceRealLay:{
        flexDirection: 'row',
        width: '100%',
        height: SmartScreenBase.smPercenWidth*12,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
});
