import * as React from 'react'
import { Modal, StyleSheet, Text, TextProps, TouchableOpacity, View } from 'react-native'
import SmartScreenBase from '../../base/SmartScreenBase'
import { CommonJson, StudyPlanJson } from '../../stringJSON'
import { Colors } from '../../styleApp/color'
import { FontSize, FontWeight } from '../../styleApp/font'
import { MyButton } from '../Button'
import { TextBox } from '../TextBox'

/**
 * @summary The text component with app's font family and default font size.
 * 
 * @param {object} props 
 * @property {boolean} visible
 * @property {string} cancelText
 * @property {function} cancelOnpress
 * @property {TextStyle} cancelTextStyle
 * @property {string} confirmText
 * @property {function} confirmOnpress
 * @property {string} cancelText
 * @property {TextStyle} confirmTextStyle
 * @property {string} message
 * @property {TextStyle} messageStyle
 * @property {function} onClose
 * 
 * @returns {Component}
 */

export const NotifyModal = React.memo((props) => {
    const {
        onClose = () => { },
        confirmText = CommonJson.Confirm,
        confirmOnpress = () => { },
        confirmTextStyle = {},
        message = "",
        messageStyle = {},
        visible = false,
        children,
        contentStyles = {},
        containerStyles
    } = props
    return (
        <Modal visible={visible} transparent animationType='fade'>
            <TouchableOpacity style={[styles.container, containerStyles]} activeOpacity={1} onPress={() => { !!onClose && onClose() }}>
                <View style={[styles.content, contentStyles]}>
                    {children ? children : <TextBox numberOfLines={5} style={[styles.message, messageStyle]}>
                        {message}
                    </TextBox>}
                    <View style={styles.btnContainer}>
                        {!!confirmText && <MyButton hasBackground
                            style={[styles.normalBtnSize, confirmTextStyle]}
                            text={confirmText} onPress={() => {
                                !!onClose && onClose()
                                !!confirmOnpress && confirmOnpress()
                            }} />}
                    </View>
                </View>
            </TouchableOpacity>
        </Modal>
    )
})



const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors._00000090,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: SmartScreenBase.smPercenWidth * 5
    },
    content: {
        backgroundColor: Colors.White,
        width: '100%',
        borderRadius: SmartScreenBase.smPercenWidth * 5,
        paddingVertical: SmartScreenBase.smPercenHeight * 5,
        paddingHorizontal: SmartScreenBase.smPercenWidth * 10,
        alignItems: "center",
        justifyContent: 'space-evenly'
    },
    message: {
        textAlign: 'center',
        width: "100%",
        color: Colors.Black,
        fontSize: FontSize.size55Font,
        paddingVertical: SmartScreenBase.smPercenHeight * 3,
    },
    btnContainer: {
        flexDirection: 'row', alignItems: "center", justifyContent: 'space-evenly', width: '100%',
        marginTop: SmartScreenBase.smPercenWidth * 10
    },
    normalBtnSize: {
        width: SmartScreenBase.smPercenWidth * 30,
    },
    cancelText: { color: Colors.BaseGreen }
});