import {StyleSheet, Platform, Dimensions, View} from 'react-native';
import SmartScreenBase from "../../../../base/SmartScreenBase";
import React from 'react';
import FontBase from '../../../../base/FontBase';
import { Colors } from '../../../../styleApp/color';
import stylesApp from '../../../../styleApp/stylesApp'
import { FontWeight } from '../../../../styleApp/font';
export default StyleSheet.create({
    contain:{
        flex: 1
    },
    headerBoxTextSty:{
        color: Colors.White,
        marginLeft: SmartScreenBase.smPercenWidth*2,
        textAlign: 'left',
        width: SmartScreenBase.smPercenWidth*50,
        fontSize: SmartScreenBase.smFontSize*55,
        ...FontWeight.Bold,
    },
    headerBoxSty:{
        backgroundColor: Colors.BlueSky,
        height: SmartScreenBase.smPercenWidth*9,
        width: SmartScreenBase.smPercenWidth*100,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    hisBoxSty:{
        backgroundColor: Colors.White,
        borderBottomWidth: 2,
        borderBottomColor: '#AAAAAA',
        height: SmartScreenBase.smPercenWidth*15,
        width: SmartScreenBase.smPercenWidth*100,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    imageLaySty:{
        // backgroundColor: Colors._00A69C,
        width: SmartScreenBase.smPercenWidth*15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageSty:{
        height: SmartScreenBase.smPercenWidth*11,
        width: SmartScreenBase.smPercenWidth*11,
    },
    bodyLaySty: {
        // backgroundColor: Colors._00adf5,
        height: SmartScreenBase.smPercenWidth*13,
        width: SmartScreenBase.smPercenWidth*52,
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingLeft: SmartScreenBase.smPercenWidth,
    },
    firstTextBodySty: {
        textAlign: 'left',
        width: SmartScreenBase.smPercenWidth*50,
        fontSize: SmartScreenBase.smFontSize*40,
        ...FontWeight.Regular,
    },
    secondTextBodySty: {
        textAlign: 'left',
        marginTop: SmartScreenBase.smPercenWidth,
        width: SmartScreenBase.smPercenWidth*40,
        fontSize: SmartScreenBase.smFontSize*40,
        ...FontWeight.Regular,
    },
    tailLaySty: {
        // backgroundColor: Colors._02283A,
        textAlign: 'left',
        height: SmartScreenBase.smPercenWidth*13,
        width: SmartScreenBase.smPercenWidth*32,
        justifyContent: 'center',
        alignItems: 'center',
        ...FontWeight.Regular,
    },
    tailTextSty: {
        textAlign: 'left',
        width: SmartScreenBase.smPercenWidth*30,
        textAlign: 'center',
        fontSize: SmartScreenBase.smFontSize*40,
        ...FontWeight.Regular,
    },
    layoutEmptySty:{
        width: SmartScreenBase.smPercenWidth*100,
        marginTop: SmartScreenBase.smPercenWidth*6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ImageEmptySty:{
        height: SmartScreenBase.smBaseWidth*700,
        width: SmartScreenBase.smBaseWidth*700,
    },
    TextEmptyTopSty: {
        fontFamily: FontBase.MyriadPro_Bold,
        fontSize: SmartScreenBase.smFontSize*65,
        color: Colors.Black
    },
    TextEmptyBopSty: {
        marginTop: SmartScreenBase.smPercenWidth*1.5,
        fontFamily: FontBase.MyriadPro_Regular,
        fontSize: SmartScreenBase.smFontSize*45,
        color: Colors.Black
    },
});
