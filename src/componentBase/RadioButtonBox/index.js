import * as React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../styleApp/color';
import images from '../../assets/images';
import SmartScreenBase from '../../base/SmartScreenBase';
/**
 * @summary The checkbox component
 *
 * @param {object} props
 * @property {boolean} props.isNotify: state of the checkbox
 * @property {function} props.isNotify: onPress function
 *
 * @returns {Component}
 */
export const RadioButtonBox = (props) => {
    const { onPress, isNotify, color, style} = props;
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={[styles.tickContainer, style]}>
            {
                isNotify && <View style={[styles.onRad, {backgroundColor: color ? color : Colors._84C241}]}/>
            }
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    tickContainer: {
        width: SmartScreenBase.smBaseWidth * 55,
        height: SmartScreenBase.smBaseWidth * 55,
        justifyContent: 'center',
        borderRadius: 99999,
        borderWidth: 1,
        borderColor: '#000',
        alignItems: 'center'
    },
    onRad: {
        width: SmartScreenBase.smBaseWidth * 40,
        height: SmartScreenBase.smBaseWidth * 41,
        borderRadius: 9999,
    },
});
