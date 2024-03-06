import * as React from 'react'
import { StyleSheet, TouchableOpacity, Image } from 'react-native'
import SmartScreenBase from '../../base/SmartScreenBase';


/**
 * @summary The Button with Plus icon component
 *
 * @param {object} props
 * @property {style} props.style: Style of the btn
 * @property {function} props.onPress: Action when click on right icon
 * @property {object} other: others props of TouchableOpacity
 *
 * @returns {Component}
 */
export const AddIconButton = (props) => {
    const { style, onPress, ...others } = props
    return (
        <TouchableOpacity
            style={[styles.button, style]}
            onPress={() => onPress()}
        >
            <Image
                source={{ uri: 'add_resource2' }}
                style={styles.Icon}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        bottom: SmartScreenBase.smPercenHeight * 3,
        right: SmartScreenBase.smPercenWidth * 3,
        width: SmartScreenBase.smPercenWidth * 18,
        height: SmartScreenBase.smPercenHeight * 18,
    },
    Icon: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    }
})
