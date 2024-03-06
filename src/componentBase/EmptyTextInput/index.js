import * as React from 'react'
import { Text, TextInput, TextProps, View } from 'react-native'
import SmartScreenBase from '../../base/SmartScreenBase'
import { Colors } from '../../styleApp/color'
import { FontSize, FontWeight } from '../../styleApp/font'
import stylesApp from '../../styleApp/stylesApp'

/**
 * @summary The text input component with a title, app's font family and default font size.
 * 
 * @param {object} props 
 * @property {string} title: The title of the input
 * @property {TextStyle} titleStyle: Style of the title
 * @property {string} value: value of the input
 * @property {function} onChangeText
 * @property {TextInputStyle} style: Style of the input
 * @property {ViewStyle} containerStyle: Style of the container
 * 
 * @returns {Component}
 */

export const EmptyTextInput = React.memo((props) => {
    const {
        onChangeText,
        style = {},
        containerStyle = {},
    } = props
    return (
        <View style={{ width: '100%', ...containerStyle }}>
            <TextInput
                {...props}
                value={props.value}
                onChangeText={onChangeText}
                containerStyle={{ width: '100%' }}
                style={[{
                    color: Colors.NearBlack,
                    fontSize: FontSize.size45Font,
                    ...FontWeight.Light,
                    backgroundColor: Colors.NoColor,
                    paddingVertical: SmartScreenBase.smBaseWidth * 0,
                    marginVertical: SmartScreenBase.smBaseWidth * 0,
                    paddingHorizontal: SmartScreenBase.smBaseWidth * 0,
                    textAlign: 'center'
                }, style]}
            />
        </View>
    )
})
