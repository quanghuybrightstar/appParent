import {StyleSheet, Platform, Dimensions, View} from 'react-native';
import SmartScreenBase from "../../../base/SmartScreenBase";
import React from 'react';

const {height, width} = Dimensions.get('window');
export default StyleSheet.create({
    styleBody: {
        height: height / 2,
        width: SmartScreenBase.smPercenWidth * 90,
        borderRadius: SmartScreenBase.smPercenWidth * 5,
        padding: SmartScreenBase.smPercenHeight,
        justifyContent: 'space-between',
        alignSelf: 'center',
        flexDirection: "row",
    },
    styleView: {
        marginLeft: SmartScreenBase.smPercenWidth * 10,
        height: SmartScreenBase.smPercenHeight * 5,
        flexDirection: "row",
        alignItems: 'center',
    },
    stylebutton1: {
        width: SmartScreenBase.smPercenWidth * 40,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: SmartScreenBase.smPercenHeight * 1.4,
        borderRadius: SmartScreenBase.smPercenWidth * 8,
        backgroundColor: '#01283A',
    },
    stylebutton2: {
        width: SmartScreenBase.smPercenWidth * 40,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: SmartScreenBase.smPercenHeight * 1.4,
        borderRadius: SmartScreenBase.smPercenWidth * 8,
        backgroundColor: '#fd990c',
    },

    hearder_1: {
        alignItems: "center",
        justifyContent: "center",
        width: width,
        height: height / 3
    },
    fontFamilyText: {
        alignItems: 'center',
        textAlign: 'center',
        width: SmartScreenBase.smPercenWidth * 60,
        fontSize: SmartScreenBase.smPercenWidth * 6,
        color: '#fd990c',
        fontFamily: 'iCielSoupofJustice',
    },
    fontFamilyText2: {
        height: SmartScreenBase.smPercenHeight * 5,
        fontSize: SmartScreenBase.smPercenWidth * 6,
        color: '#fd990c',
        fontFamily: 'iCielSoupofJustice',
    },
    fontFamilyText3: {
        color: '#0B0B3B',
        alignItems: 'center',
        textAlign: "center",
        fontSize: SmartScreenBase.smPercenWidth * 5,
        fontWeight: 'bold'
    },
    levelAchieved: {
        flexDirection: 'row',
        marginLeft: SmartScreenBase.smPercenWidth * 5
    },
    styleTime: {
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Result: {
        marginHorizontal: SmartScreenBase.smPercenWidth * 2,
        height: SmartScreenBase.smPercenHeight * 20,
        width: width / 4,
        borderRadius: SmartScreenBase.smPercenWidth * 2,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    sty_Resultpoint: {
        alignItems: 'center',
        justifyContent: 'center',
        height: SmartScreenBase.smPercenHeight * 10,
    },
    Resultpoint: {
        width: width / 4.3,
        height: SmartScreenBase.smPercenHeight * 10,
        backgroundColor: '#848484',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: SmartScreenBase.smPercenWidth * 2,
    }

});
