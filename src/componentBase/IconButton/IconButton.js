import * as React from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Colors } from '../../styleApp/color'
import { TextBox } from "../TextBox";
import LinearGradient from "react-native-linear-gradient";
import SmartScreenBase from '../../base/SmartScreenBase';
import FontBase from '../../base/FontBase';


/**
 * @summary The IconButton component 
 * 
 * @param {object} props 
 * @property {style} props.style:  style of the btn
 * @property {string} props.color
 * @property {number} props.type:  type of btn
 * @property {boolean} props.isDisabled:  check if btn is disabled
 * @property {string} props.size: type of size
 * @property {number} props.sizeIcon: size of icon
 * @property {any} others:  others props of TouchableOpacity
 * 
 * @returns {Component}
 */
export const IconButton = (props) => {
    const { size, color, style, icon, sizeIcon, onPress, isDisabled, ...others } = props
    const whsize = size == 'medium' ? SmartScreenBase.smPercenWidth * 10 : SmartScreenBase.smPercenWidth * 6
        return (
            <TouchableOpacity onPress={onPress} {...others} disabled={isDisabled}>
                <Image style={[styles.button,{height: whsize, width: whsize, opacity: isDisabled ? 0.3 : 1}]} source={icon}/>
            </TouchableOpacity >
        )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: SmartScreenBase.smPercenWidth * 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconSty: {
        width: SmartScreenBase.smPercenWidth*5, 
        height: SmartScreenBase.smPercenWidth*5,
        resizeMode: 'cover',
        borderRadius: SmartScreenBase.smPercenWidth*30,
    },
})
