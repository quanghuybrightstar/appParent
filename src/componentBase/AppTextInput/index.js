import * as React from 'react'
import { StyleSheet, Text, TextInput, TextProps, View } from 'react-native'
import SmartScreenBase from '../../base/SmartScreenBase'
import { Colors } from '../../styleApp/color'
import { FontSize, FontWeight } from '../../styleApp/font'
import stylesApp from '../../styleApp/stylesApp'
import { TextBox } from '../TextBox'

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

export const AppTextInput = React.memo((props) => {
    const {
        title,
        titleStyle = {},
        value,
        onChangeText,
        style = {},
        containerStyle = {},
        textError = "",
        onEndEditing,
    } = props
    return (
        <View style={[styles.container, containerStyle]}>
            {!!title && <Text numberOfLines={1} allowFontScaling={false} style={[styles.titleText, titleStyle]}>
                {title}
            </Text>}
            {textError.length >0 ? <TextBox numberOfLines={2} text={textError} style={styles.errorText}/> : null}
            <TextInput
                {...props}
                value={value}
                placeholderTextColor={Colors._BBBDBF}
                onChangeText={onChangeText}
                containerStyle={styles.container}
                style={[styles.textInput, style]}
                onBlur={()=> {
                    onChangeText(value.trim())
                }}
                onEndEditing={onEndEditing}
            />
        </View>
    )
})

const styles = StyleSheet.create({
    textInput: {
        color: Colors.Black,
        fontSize: FontSize.size45Font,
        ...FontWeight.Regular,
        backgroundColor: Colors.White,
        borderRadius: SmartScreenBase.smBaseWidth * 40,
        paddingVertical: SmartScreenBase.smBaseWidth * 40,
        marginVertical: SmartScreenBase.smBaseWidth * 30,
        paddingHorizontal: SmartScreenBase.smBaseWidth * 70,
        fontStyle: "normal",
        ...stylesApp.shadow,
         elevation: 2,
    },
    titleText: {
        color: Colors.Black,
        fontSize: FontSize.size50Font,
        ...FontWeight.Regular,
        paddingHorizontal: SmartScreenBase.smBaseWidth * 70,
    },
    errorText: {
        color: Colors.Red_BE1,
        fontSize: FontSize.size45Font,
        ...FontWeight.Regular,
        marginTop: SmartScreenBase.smPercenWidth,
        paddingHorizontal: SmartScreenBase.smBaseWidth * 70,
    },
    container: {
        width: '100%'
    }
})