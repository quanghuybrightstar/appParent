import * as React from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import SmartScreenBase from '../../base/SmartScreenBase';
import { Colors } from '../../styleApp/color';
const Tick = require('../../assets/image/tick.png')

/**
 * @summary The checkbox component 
 * 
 * @param {object} props 
 * @property {boolean} props.isNotify: state of the checkbox
 * @property {function} props.onPress: onPress function
 * 
 * @returns {Component}
 */
export const SmallCheckBox = (props) => {
    const { onPress, isNotify, style, size = SmartScreenBase.smBaseWidth * 70, disabled = false } = props
    return (
        <TouchableOpacity onPress={onPress} disabled={disabled} activeOpacity={0.7} style={[styles.tickContainer, style, {
            width: size,
            height: size,
        }]}>
            {isNotify && <Image source={Tick} style={[style, {
                width: size * 0.9,
                height: size * 0.9,
                marginTop: -size * 0.3,
                marginLeft: size * 0.1,
            }]} />}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    tickContainer: {
        width: SmartScreenBase.smBaseWidth * 70,
        height: SmartScreenBase.smBaseWidth * 70,
        borderRadius: 3,
        borderColor: Colors._ED8A22,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: "center",
    },
})
