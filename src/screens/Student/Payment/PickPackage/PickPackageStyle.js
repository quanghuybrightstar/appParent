import {StyleSheet, Platform, Dimensions, View} from 'react-native';
import SmartScreenBase from "../../../../base/SmartScreenBase";
import React from 'react';
import FontBase from '../../../../base/FontBase';
import { Colors } from '../../../../styleApp/color';
import stylesApp from '../../../../styleApp/stylesApp'
export default StyleSheet.create({
    ButtonSty:{
        flexDirection: 'row',
        height: SmartScreenBase.smPercenWidth*16,
        width: SmartScreenBase.smPercenWidth*90,
        borderRadius: SmartScreenBase.smPercenWidth*2,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SmartScreenBase.smPercenWidth*3.5,
    },
    ButtonAddSty:{
        borderColor: Colors.LightGreen, 
        borderWidth: SmartScreenBase.smPercenWidth*0.5
    },
    ImageSty:{
        height: SmartScreenBase.smBaseWidth*110,
        width: SmartScreenBase.smBaseWidth*120,
    },
    textBtnSty:{
        fontFamily: FontBase.MyriadPro_Bold,
        fontSize: SmartScreenBase.smFontSize*50,
        color: Colors.White
    },
    textAddBtnSty:{
        fontFamily: FontBase.MyriadPro_Bold,
        fontSize: SmartScreenBase.smFontSize*50,
        color: Colors.LightGreen, 
    },
    layoutBtnSty:{
        width: SmartScreenBase.smPercenWidth*100,
        height: SmartScreenBase.smPercenWidth*36,
        position: 'absolute',
        bottom: SmartScreenBase.smPercenWidth*8,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    boxContainSty:{
        marginVertical: SmartScreenBase.smPercenWidth*1,
        width: SmartScreenBase.smPercenWidth*100,
        height: SmartScreenBase.smPercenWidth*22,
        backgroundColor: "#fff",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    boxImageSty:{
        width: SmartScreenBase.smPercenWidth*22,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    boxImagePackageSty:{
        width: SmartScreenBase.smBaseWidth*205,
        height: SmartScreenBase.smBaseWidth*205,
        justifyContent: 'center',
        alignItems: 'center'
    },
    boxBodySty:{
        width: SmartScreenBase.smPercenWidth*50,
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    boxButtonSty:{
        width: SmartScreenBase.smPercenWidth*28,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    miniButtonSty:{
        width: SmartScreenBase.smPercenWidth*24,
        height: SmartScreenBase.smPercenWidth*7,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: SmartScreenBase.smPercenWidth*10
    },
    textminiButtonSty:{
        fontFamily: FontBase.MyriadPro_Bold,
        fontSize: SmartScreenBase.smFontSize*45,
        color: Colors.White,
    },
    package_name:{
        fontFamily: FontBase.MyriadPro_Bold
    },
    textBoldPopupSty:{
        fontFamily: FontBase.MyriadPro_Bold,
        fontSize: SmartScreenBase.smFontSize*45,
        color: Colors.NearBlack,
        textAlign: 'center',
    },
    textRegularPopupSty:{
        marginTop: SmartScreenBase.smPercenWidth,
        fontFamily: FontBase.MyriadPro_Regular,
        fontSize: SmartScreenBase.smFontSize*45,
        color: Colors.NearBlack,
        textAlign: 'center',
    },
});
