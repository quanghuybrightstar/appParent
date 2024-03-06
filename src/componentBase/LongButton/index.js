import * as React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Colors } from '../../styleApp/color'
import { FontSize, FontWeight } from '../../styleApp/font'
import { TextBox } from "../TextBox";
import LinearGradient from "react-native-linear-gradient";
import SmartScreenBase from '../../base/SmartScreenBase';
import FontBase from '../../base/FontBase';

export default LongButton = (props) => {
    const { text, children, style, color, hasBackground, textStyles, ...others } = props
    if (hasBackground) {
        return (
            <TouchableOpacity onPress={props.onPress} {...others}>
                <LinearGradient colors={[Colors.LightGreen, Colors.BaseGreen]}
                    start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }}
                    style={[styles.button, style]}
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

const styles = StyleSheet.create({
    button: {
        borderRadius: SmartScreenBase.smPercenWidth*8, alignItems: 'center', height: SmartScreenBase.smPercenWidth*11, width: SmartScreenBase.smPercenWidth*50, justifyContent: 'center',
        alignItems: 'center'
    },
    nonBackgroundButton: {
        borderWidth: 1, borderColor: Colors.BaseGreen
    },
    textSty: {
        fontSize: SmartScreenBase.convertSize(60), ...FontWeight.Bold, 
    }
})
