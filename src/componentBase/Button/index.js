import * as React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Colors } from '../../styleApp/color'
import { FontSize, FontWeight } from '../../styleApp/font'
import { TextBox } from "../TextBox";
import LinearGradient from "react-native-linear-gradient";
import SmartScreenBase from '../../base/SmartScreenBase';
import FontBase from '../../base/FontBase';

/**
 * @summary The Button component 
 * 
 * @param {object} props 
 * @property {style} props.style: Style of the btn
 * @property {textStyles} props.textStyles: Style of the text
 * @property {text} props.text: text
 * @property {hasBackground} props.hasBackground: Props define btn type
 * @property {BigBtn} props.BigBtn: Props define btn is big or not
 * @property {color} props.color: color of the text
 * @property {object} other: others props of TouchableOpacity
 * 
 * @returns {Component}
 */

export const MyButton = (props) => {
    const { text, children, style, color, hasBackground, textStyles, BigBtn, isDisabled, ...others } = props
    if (hasBackground) {

        const linearColors = isDisabled
        ? ['#BCBDBF', '#BCBDBF']
        : [Colors.LightGreen, Colors.BaseGreen];

        return (
            <TouchableOpacity disabled={isDisabled} onPress={props.onPress} {...others}>
                <LinearGradient colors={linearColors}
                    start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }}
                    style={[BigBtn ? styles.bigButton : styles.button, style]}
                >
                    {children || <TextBox text={text} color={Colors.White} style={[styles.textSty, textStyles]} />}
                </LinearGradient>
            </TouchableOpacity>
        )
    } else {
        return (
            <TouchableOpacity {...others} style={[styles.button, styles.nonBackgroundButton, style]}>
                { children || <TextBox text={text} color={Colors.BaseGreen} style={[styles.textSty, textStyles]} />}
            </TouchableOpacity >
        )
    }
}
// Thêm trạng thái disable của nút (màu xám, ko click dc) 

// Sửa, bổ sung style defaut 
const styles = StyleSheet.create({
    button: {
        borderRadius: SmartScreenBase.smPercenWidth * 6, alignItems: 'center', height: SmartScreenBase.smPercenWidth * 11, justifyContent: 'center',
        marginVertical: SmartScreenBase.smBaseHeight * 4, height: SmartScreenBase.smPercenWidth*11
    },
    bigButton: {
        borderRadius: SmartScreenBase.smPercenWidth * 8, alignItems: 'center', height: SmartScreenBase.smPercenWidth * 13, justifyContent: 'center',
        marginVertical: SmartScreenBase.smBaseHeight * 4
    },
    nonBackgroundButton: {
        borderWidth: 1, borderColor: Colors.BaseGreen
    },
    textSty: {
        fontSize: SmartScreenBase.convertSize(50), fontFamily: FontBase.MyriadPro_Bold, 
    }
})
