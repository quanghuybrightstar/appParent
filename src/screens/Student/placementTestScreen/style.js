import {StyleSheet, Platform, Dimensions, View} from 'react-native';
import SmartScreenBase from "../../../base/SmartScreenBase";
import React from 'react';
const {height, width} = Dimensions.get('window');
export default StyleSheet.create({
    styleTime:{
        marginTop:SmartScreenBase.smPercenHeight *3,
        flexDirection: "row",
        justifyContent: "space-evenly",
        width:width,
    },
    fontFamilyText: {
        fontSize:SmartScreenBase.smPercenWidth * 8,
        color: '#0404B4',
        fontFamily: 'iCielSoupofJustice',
    },
    stylebutton:{
        width: SmartScreenBase.smPercenWidth * 30,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: SmartScreenBase.smPercenHeight * 1.4,
        borderRadius: SmartScreenBase.smPercenWidth * 3,
        backgroundColor: '#01283A',
    },
    styleBody:{
        height:height/2,
        width: SmartScreenBase.smPercenWidth * 90,
        borderRadius: SmartScreenBase.smPercenWidth * 5,
        backgroundColor: 'rgba(255,255,255,0.95)',
        padding: SmartScreenBase.smPercenHeight,
        alignSelf: 'center',
    },
    styleView:{
        marginLeft: SmartScreenBase.smPercenWidth * 10,
        height: SmartScreenBase.smPercenHeight * 5,
        flexDirection: "row",
        alignItems: 'center',
    },
    stylebutton1:{
        width: SmartScreenBase.smPercenWidth * 40,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: SmartScreenBase.smPercenHeight * 1.4,
        borderRadius: SmartScreenBase.smPercenWidth * 8,
        backgroundColor: '#01283A',
    },
    stylebutton2:{
        width: SmartScreenBase.smPercenWidth * 40,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: SmartScreenBase.smPercenHeight * 1.4,
        borderRadius: SmartScreenBase.smPercenWidth * 8,
        backgroundColor: '#fd990c',
    },
});
