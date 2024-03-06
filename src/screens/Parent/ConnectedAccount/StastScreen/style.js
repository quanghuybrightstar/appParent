import React from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';
import SmartScreenBase from '../../../../base/SmartScreenBase';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    StyleclassData: {
        marginTop: height / 24,
        backgroundColor:"#00000050",
        flexDirection: 'row',
        minHeight: height / 5.5,
        width: '100%',
        borderRadius:SmartScreenBase.smBaseHeight*20
    },
    Imageclass: {
        justifyContent:'center',
        alignItems:'center',
        width: height / 5.5,
        height: height / 5.5,
    },
    styleImage:{
        width: height / 6,
        height: height / 6,
    },
    classname:{
        minHeight:SmartScreenBase.smBaseHeight*80,
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#fff',
        width:'80%',
    },
    title:{
        width:'60%',
        alignItems:'center',
        justifyContent:"center"
    },
    titledate: {
        marginVertical:5,
        flexDirection: 'row',
    },
    txt1:{
        color:'#fff'
    }
})