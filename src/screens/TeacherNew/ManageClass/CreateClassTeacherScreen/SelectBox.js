import * as React from 'react'
import { Platform, TouchableOpacity, View } from 'react-native'
import SmartScreenBase from '../../../../base/SmartScreenBase'
import { TextBox } from '../../../../componentBase/TextBox'
import { FontSize, FontWeight } from '../../../../styleApp/font'
import { useState } from 'react'
import { Colors } from '../../../../styleApp/color'


import { StyleSheet } from "react-native"
import { forwardRef } from 'react'


/**
 * 
 * @param {object} props 
 * @property {object} ref Ref of select box
 * @returns {Component}
 */
export const SelectBox = forwardRef((props, ref) => {
    let [isOnline, setIsOnline] = useState(false)
    React.useImperativeHandle(ref, () => ({
        getValue: () => isOnline,
    }));
    return (
        <View style={styles.container}>
            <TouchableOpacity disabled={!isOnline ? true : false} style={styles.selectBtn} onPress={() => setIsOnline(false)}>
                <View style={styles.btnOuter} >
                    <View style={[styles.selected, {
                        backgroundColor: !isOnline ? Colors.DarkGreen : 'transparent',
                    }]} />
                </View>
                <TextBox style={styles.title}>{'Offline'}</TextBox>
            </TouchableOpacity>
            <TouchableOpacity disabled={isOnline ? true : false} style={styles.selectBtn} onPress={() => setIsOnline(true)}>
                <View style={styles.btnOuter} >
                    <View style={[styles.selected, {
                        backgroundColor: isOnline ? Colors.DarkGreen : 'transparent',
                    }]} />
                </View>
                <TextBox style={styles.title}>{'Online'}</TextBox>
            </TouchableOpacity>

        </View>
    )
})

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-evenly'
    },
    selectBtn: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    btnOuter: {
        borderRadius: SmartScreenBase.smPercenWidth * 5,
        padding: SmartScreenBase.smPercenWidth * 0.5,
        borderWidth: 1,
        marginRight: SmartScreenBase.smPercenWidth * 2,

    },
    selected: {

        width: SmartScreenBase.smPercenWidth * 4,
        height: SmartScreenBase.smPercenWidth * 4,
        borderRadius: SmartScreenBase.smPercenWidth * 2,
    },
    title: {
        ...FontWeight.Regular,
        fontSize: FontSize.size50Font,
    }
})