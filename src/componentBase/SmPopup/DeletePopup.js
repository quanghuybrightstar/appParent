import * as React from 'react'
import { Modal, Platform, StyleSheet, Text, TextProps, TouchableOpacity, View } from 'react-native'
import SmartScreenBase from '../../base/SmartScreenBase'
import { CommonJson, StudyPlanJson } from '../../stringJSON'
import { Colors } from '../../styleApp/color'
import { FontSize, FontWeight } from '../../styleApp/font'
import { ShortMainButton } from '../ShortMainButton'
import { TextBox } from '../TextBox'

/**
 * @summary The DeletePopup component.
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
export const DeletePopup = React.memo((props) => {
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
        containerStyles
    } = props
    const [isDeleteAll, setDeleteAll] = React.useState(false)
    return (
        <Modal visible={visible} transparent animationType='fade'>
            <TouchableOpacity style={[styles.container, containerStyles]} activeOpacity={1} onPress={() => { }}>
                <View style={[styles.content, contentStyles]}>
                    {children ? children : <TextBox numberOfLines={5} style={[styles.message, messageStyle]}>
                        {message}
                    </TextBox>}
                    { props.isRepeat && <View style={styles.contentBtn}>
                        <TouchableOpacity style={styles.checkContainer} onPress={() => setDeleteAll(false)}>
                            <View style={styles.btnWrapper}>
                                {!isDeleteAll && <View style={styles.checked} />}
                            </View>
                            <TextBox style={styles.text}>
                                {"Chỉ xóa kế hoạch này"}
                            </TextBox>
                        </TouchableOpacity>
                        <View style={{ marginTop: 10 }} />
                        <TouchableOpacity style={styles.checkContainer} onPress={() => setDeleteAll(true)}>
                            <View style={styles.btnWrapper}>
                                {isDeleteAll && <View style={styles.checked} />}
                            </View>
                            <TextBox style={styles.text}>
                                {"Xóa tất cả chuỗi"}
                            </TextBox>
                        </TouchableOpacity>
                    </View>}
                    <View style={styles.btnContainer}>
                        {!!cancelText && <ShortMainButton style={[styles.normalBtnSize, cancelTextStyle]} text={cancelText} onPress={() => {
                            !!onClose && onClose()
                            !!cancelOnpress && cancelOnpress()
                        }} textStyles={styles.cancelText} />}
                        {!!confirmText && <ShortMainButton type={1}
                            style={[styles.normalBtnSize, confirmTextStyle]}
                            text={confirmText} onPress={() => {
                                !!onClose && onClose()
                                !!confirmOnpress && confirmOnpress(isDeleteAll)
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
        lineHeight: FontSize.size55Font + 5,
        paddingVertical: SmartScreenBase.smPercenHeight * 3,
    },
    btnContainer: {
        flexDirection: 'row', alignItems: "center", justifyContent: 'space-evenly', width: '100%',
        marginTop: SmartScreenBase.smPercenWidth * 7
    },
    normalBtnSize: {
        width: SmartScreenBase.smPercenWidth * 30,
    },
    cancelText: { color: Colors.BaseGreen },
    checkContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    btnWrapper: {
        width: SmartScreenBase.smBaseWidth * 68,
        height: SmartScreenBase.smBaseWidth * 68,
        borderRadius: SmartScreenBase.smBaseWidth * 34,
        padding: SmartScreenBase.smBaseWidth * 6,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'black'
    },
    checked: {
        backgroundColor: Colors._84C241,
        width: SmartScreenBase.smBaseWidth * 50,
        height: SmartScreenBase.smBaseWidth * 50,
        borderRadius: SmartScreenBase.smBaseWidth * 25,
    },
    text: {
        flex: 1,
        marginLeft: SmartScreenBase.smBaseWidth * 28
    },
    contentBtn: {
        width: '100%',
        paddingHorizontal: SmartScreenBase.smPercenWidth * 5,
        alignItems: 'center',
    }
});