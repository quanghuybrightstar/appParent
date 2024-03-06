import * as React from 'react'
import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native'
import { Colors } from '../../styleApp/color'
import { TextBox } from "../TextBox";
import LinearGradient from "react-native-linear-gradient";
import SmartScreenBase from '../../base/SmartScreenBase';
import FontBase from '../../base/FontBase';


/**
 * @summary The ShortMainButton component 
 * 
 * @param {object} props 
 * @property {string} props.text: text
 * @property {any} props.children
 * @property {style} props.style:  style of the btn
 * @property {string} props.color
 * @property {number} props.type:  type of btn
 * @property {TextStyle} props.textStyles:  text style
 * @property {boolean} props.isDisabled:  check if btn is disabled
 * @property {boolean} props.loading: check if btn is clicked and is loading
 * @property {string} props.widthType: type of width
 * @property {any} others:  others props of TouchableOpacity
 * 
 * @returns {Component}
 */
export const ShortMainButton = (props) => {
    const { text, children, style, color, type, textStyles, isDisabled = false, justDisabled = false, loading = false, widthType, heightType, ...others } = props
    const width = widthType === 'mega' ? SmartScreenBase.smPercenWidth * 90: widthType==='extra' ? SmartScreenBase.smPercenWidth * 80  : widthType === 'full' ? SmartScreenBase.smBaseWidth * 580 : (widthType === 'mini' ? SmartScreenBase.smBaseWidth * 380 : (widthType === 'popup' ? SmartScreenBase.smBaseWidth * 380 : (widthType === 'smPopup' ? SmartScreenBase.smBaseWidth * 350 : 0)))
    const height = heightType === 'smPopup' ? SmartScreenBase.smBaseWidth * 110 : SmartScreenBase.smBaseWidth * 125
    if (type === 1) {
        const linearColors = isDisabled ? [Colors._BCBDBF, Colors._BCBDBF] : [Colors.LightGreen, Colors.BaseGreen]
        return (
            <TouchableOpacity onPress={props.onPress} disabled={loading || isDisabled || justDisabled} {...others}>
                <LinearGradient colors={linearColors}
                    start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }}
                    style={[styles.button, !!width ? { ...style, width: width, height: height, ...styles.fullSizeButton } : style]}
                >
                    <>
                        {loading ? <ActivityIndicator color={Colors.White} /> :
                            <>{children || <TextBox text={text} color={Colors.White} style={[styles.textSty, textStyles]} />}</>}
                    </>
                </LinearGradient>
            </TouchableOpacity >
        )
    } else {
        return (
            <TouchableOpacity {...others} style={[styles.button, styles.nonBackgroundButton, isDisabled ? { backgroundColor: Colors._BCBDBF, borderWidth: 0} : {}, !!width ? { ...style, width: width, height: height, ...styles.fullSizeButton } : style]} disabled={isDisabled || justDisabled}>
                { children || <TextBox text={text} color={isDisabled ? Colors.White : Colors.BaseGreen} style={[styles.textSty, textStyles]} />}
            </TouchableOpacity >
        )
    }
}

const styles = StyleSheet.create({
    button: {
        height: SmartScreenBase.smBaseWidth * 125,
        borderRadius: SmartScreenBase.smBaseWidth * 500,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: SmartScreenBase.smBaseWidth * 15
    },
    nonBackgroundButton: {
        borderWidth: SmartScreenBase.smBaseHeight * 1.5,
        borderColor: Colors.BaseGreen,
        paddingHorizontal: SmartScreenBase.smBaseWidth * 20
    },
    textSty: {
        fontSize: SmartScreenBase.convertSize(50),
        fontFamily: FontBase.MyriadPro_Bold,
        marginTop: Platform.OS === 'android' ? -SmartScreenBase.smPercenWidth * 0.4 : 0,
    },
    fullSizeButton: {
        paddingHorizontal: 0,
        borderRadius: SmartScreenBase.smBaseWidth * 500
    },
    miniSizeButton: {
        paddingHorizontal: 0,
        borderRadius: SmartScreenBase.smBaseWidth * 500
    }
})
