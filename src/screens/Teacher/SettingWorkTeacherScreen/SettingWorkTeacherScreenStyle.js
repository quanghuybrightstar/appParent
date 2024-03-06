import {StyleSheet, Dimensions, Platform, Image} from 'react-native';
import SmartScreenBase from "../../../base/SmartScreenBase";
import React from "react";

export default StyleSheet.create({
    container: {
        flex:1,
        resizeMode:"stretch",
    },
    ViewBody:{
        flex:1,
        padding:SmartScreenBase.smPercenWidth * 5
    },
    ViewHeaderBody:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:SmartScreenBase.smPercenWidth*2,
        borderBottomWidth:1,
        borderBottomColor:'#fff'
    },
    TextHeaderBody:{
        color: 'white' ,
        fontWeight:"bold",
        fontSize:SmartScreenBase.smPercenWidth*4
    },
    TextAll:{
        color: 'white' ,
        fontWeight:"bold",
        fontSize:SmartScreenBase.smPercenWidth*4,
        marginRight: SmartScreenBase.smPercenWidth*3,
    },
    ButtonAll:{
        width: SmartScreenBase.smPercenWidth * 6,
        height: SmartScreenBase.smPercenWidth * 6,
    },
    ImageTick:{
        position:'absolute',
        right:0,
        width: SmartScreenBase.smPercenWidth * 5,
        height: SmartScreenBase.smPercenWidth * 5,
        resizeMode: "contain",
        zIndex:100
    },
    ImageBorder:{
        zIndex:1,
        width: SmartScreenBase.smPercenWidth * 6,
        height: SmartScreenBase.smPercenWidth * 6,
    },
    TextAllow:{
        color: 'white' ,
        fontWeight:"400",
        fontSize:SmartScreenBase.smPercenWidth*4
    },
    TextContinue:{
        color: '#fff' ,
        fontWeight:"bold",
        fontSize:SmartScreenBase.smPercenWidth*5,
        textAlign:'center',
        textAlignVertical:'center'
    },
    ImageTick1:{
        position:'absolute',
        top:0,
        width: SmartScreenBase.smPercenWidth * 5,
        height: SmartScreenBase.smPercenWidth * 5,
        resizeMode: "contain",
        zIndex:100,

    }


});
