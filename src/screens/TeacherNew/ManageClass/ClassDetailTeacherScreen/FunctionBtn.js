import * as React from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import { StyleSheet, Text, TextProps } from 'react-native'
import SmartScreenBase from '../../../../base/SmartScreenBase'
import { TextBox } from '../../../../componentBase/TextBox'
import { FontSize, FontWeight } from '../../../../styleApp/font'
import stylesApp from '../../../../styleApp/stylesApp'

/**
 * @summary The text component with app's font family and default font size.
 * 
 * @param {object} props 
 * @property {String} image: The image string
 * @property {ImageStyle} imgStyle: Style of the Image
 * @property {string} title: title
 * @property {function} onPress: function trigger when click to item
 * 
 * @returns {Component}
 */

export const FunctionBtn = React.memo((props) => {
    const { image = "caculate_point_icon", imgStyle, title,onPress=()=>{} } = props
    return (
        <View style={styles.itemOuter}>
            <TouchableOpacity onPress={onPress} style={styles.itemContainer}>
                <Image source={{ uri: image }}
                    resizeMode="contain"
                    style={[styles.icon, imgStyle]} />
                <TextBox numberOfLines={2} style={styles.title}>{title}</TextBox>
            </TouchableOpacity>
        </View>
    )
})

const styles = StyleSheet.create({
    itemOuter: { padding: SmartScreenBase.smPercenWidth * 2, paddingBottom: 0 },
    itemContainer: {
        backgroundColor: 'white',
        alignItems: 'center',
        width: SmartScreenBase.smPercenWidth * 20,
        height: SmartScreenBase.smPercenWidth * 20,
        borderRadius: SmartScreenBase.smPercenWidth * 5,
        paddingHorizontal: SmartScreenBase.smPercenWidth * 1,
        justifyContent: 'space-evenly',
        ...stylesApp.shadow
    },
    icon: {
        width: SmartScreenBase.smBaseWidth * 100,
        height: SmartScreenBase.smBaseWidth * 100,
    },
    title: {
        textAlign: 'center',
        ...FontWeight.Regular,
        fontSize: FontSize.size35Font,
    }
})