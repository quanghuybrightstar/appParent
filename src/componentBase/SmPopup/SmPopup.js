import * as React from 'react'
import { Keyboard, Modal, StyleSheet, Text, TextProps, TouchableOpacity, View } from 'react-native'
import SmartScreenBase from '../../base/SmartScreenBase'
import { CommonJson, StudyPlanJson } from '../../stringJSON'
import { Colors } from '../../styleApp/color'
import { FontSize, FontWeight } from '../../styleApp/font'
import { MyButton } from '../Button'
import { ShortMainButton } from '../ShortMainButton'
import { TextBox } from '../TextBox'
import FontBase from '../../base/FontBase'

/**
 * @summary The SmPopup component
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

export const SmPopup = React.memo((props) => {
    const {
        cancelText = CommonJson.Cancel,
        cancelOnpress = () => { },
        onClose = () => { },
        cancelTextStyle = {},
        confirmText = CommonJson.Confirm,
        confirmOnpress = () => { },
        confirmTextStyle = {},
        message = "",
        messageStyle = {},
        visible = false,
        children,
        contentStyles = {},
        containerStyles,
        confirmDisable = false,
        tittleText = "",
        hideCancelText = false,
    } = props
    return (
        <Modal visible={visible} transparent animationType='fade'>
            <TouchableOpacity style={[styles.container, containerStyles]} activeOpacity={1} onPress={() => { Keyboard.dismiss() }}>
                <View style={[styles.content, contentStyles]}>
                    {tittleText.length > 0 ? <TextBox style={[styles.tittleSty]}>{tittleText}</TextBox> : null}
                    {children ? children : <TextBox numberOfLines={5} style={[styles.message, messageStyle]}>
                        {message}
                    </TextBox>}
                    <View style={styles.btnContainer}>
                        {!!cancelText && !hideCancelText && <ShortMainButton style={[styles.normalBtnSize, cancelTextStyle]} text={cancelText} onPress={() => {
                            !!onClose && onClose()
                            !!cancelOnpress && cancelOnpress()
                        }} textStyles={styles.cancelText} />}
                        {!!confirmText && <ShortMainButton type={1} isDisabled={confirmDisable}
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
        paddingVertical: SmartScreenBase.smPercenWidth * 4,
        paddingHorizontal: SmartScreenBase.smPercenWidth * 5,
        alignItems: "center",
        justifyContent: 'space-evenly'
    },
    message: {
        textAlign: 'center',
        width: "100%",
        color: Colors.Black,
        fontSize: FontSize.size55Font,
        paddingVertical: SmartScreenBase.smPercenWidth * 5.5,
    },
    tittleSty: {
        textAlign: 'center',
        fontFamily: FontBase.MyriadPro_Bold,
        width: "100%",
        color: Colors.Black,
        fontSize: FontSize.size55Font,
        paddingVertical: SmartScreenBase.smPercenWidth * 5.5,
    },
    btnContainer: {
        flexDirection: 'row', alignItems: "center", justifyContent: 'space-evenly', width: '100%',
        marginTop: SmartScreenBase.smPercenWidth * 7
    },
    normalBtnSize: {
        width: SmartScreenBase.smPercenWidth * 36,
        borderRadius: SmartScreenBase.smBaseWidth * 100
    },
    cancelText: { color: Colors.BaseGreen }
});