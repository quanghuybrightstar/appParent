import * as React from 'react'
import { Platform, Text, TextProps } from 'react-native'
import SmartScreenBase from '../../base/SmartScreenBase'
import { Colors } from '../../styleApp/color'
import { FontSize, FontWeight } from '../../styleApp/font'

/**
 * @summary The text component with app's font family and default font size.
 * 
 * @param {object} props 
 * @property {string} text: The string will be display
 * @property {Component} children: The children component
 * @property {TextStyle} style: Style of the text
 * @property {string} color: Color of the text
 * @property {number} numberOfLines: Color of the text
 * 
 * @returns {Component}
 */

export const TextBox = React.memo((props) => {
    const { text, children, style, color, numberOfLines = 1 } = props
    return (
        <Text numberOfLines={numberOfLines} {...props} allowFontScaling={false} style={[FontWeight.Regular, {
            color: color ? color : Colors.Black, 
            fontSize: FontSize.size45Font,
        }, style]}>
            {children || text}
        </Text>
    )
})
