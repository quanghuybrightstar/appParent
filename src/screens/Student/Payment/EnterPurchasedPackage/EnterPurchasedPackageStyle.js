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
    imageSty:{
        height: SmartScreenBase.smPercenWidth*67.8,
        width: SmartScreenBase.smPercenWidth*100,
    },
    body: {
        marginHorizontal: SmartScreenBase.smPercenWidth * 5, 
        height: SmartScreenBase.ratio <= 1.7 ? SmartScreenBase.smPercenHeight * 30 : SmartScreenBase.ratio < 2 ? SmartScreenBase.smPercenHeight * 40 : SmartScreenBase.smPercenHeight * 45,
        marginTop: SmartScreenBase.smPercenWidth * 4,
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
        width: SmartScreenBase.smPercenWidth*80,
        ...FontWeight.Regular,
    },
    bottomBox: { alignItems: 'center' },
    subTitle: {
        textAlign: 'center',
        color: Colors._02283A,
        ...FontWeight.Bold,
    },
    boxErrText: {
        height: SmartScreenBase.smPercenWidth*7.5,
        width: SmartScreenBase.smPercenWidth*85,
        marginTop: SmartScreenBase.smPercenWidth * 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    errText: {
        color: Colors._E41E27,
        textAlign: 'center',
        ...FontWeight.Light,
    },
    errIcon: { width: SmartScreenBase.smBaseWidth * 52, height: SmartScreenBase.smBaseWidth * 52 },
    retakeSty: {
        height: SmartScreenBase.smPercenWidth*8,
        width: '100%',
        marginTop: SmartScreenBase.smPercenWidth * 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    retakeTextSty: {
        color: Colors.BaseGreen,
        textAlign: 'center',
        ...FontWeight.Bold,
        textDecorationLine: 'underline'
    },
    textInput: {
        flex: 1,
        padding: 0,
        margin: 0,
        fontStyle: 'normal',
        textAlign: 'center',
        fontSize: SmartScreenBase.smFontSize*45,
        ...FontWeight.Regular,
        color: Colors.Black
    },
    textInputBox: {
        // width: SmartScreenBase.smPercenWidth*90,
        // backgroundColor: '#ff0',
        flexDirection: 'row',
        borderWidth: 0.7,
        borderColor: Colors._389199,
        borderRadius: SmartScreenBase.smPercenWidth * 50,
        paddingVertical: SmartScreenBase.smPercenHeight * 1,
        paddingHorizontal: SmartScreenBase.smPercenWidth * 3,
        marginTop: SmartScreenBase.smPercenWidth * 0,
        alignItems: 'center'
    },
    imgCode: {
        width: SmartScreenBase.smBaseWidth * 50, height: SmartScreenBase.smBaseWidth * 50, marginRight: SmartScreenBase.smBaseWidth * 20
    },
});
