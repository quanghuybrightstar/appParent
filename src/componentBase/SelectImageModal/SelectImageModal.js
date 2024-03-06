import * as React from 'react'
import { Linking, StyleSheet, Text, TextProps, TouchableOpacity, View } from 'react-native'
import SmartScreenBase from '../../base/SmartScreenBase'
import { Colors } from '../../styleApp/color'
import { FontSize, FontWeight } from '../../styleApp/font'
import { CommonJson } from "../../stringJSON";
import { TextBox } from '../TextBox'
import ImagePickerLib, { Options } from 'react-native-image-crop-picker';
import Modal from 'react-native-modal'
import { StudentGrammarJson } from '../../stringJSON/StudentGrammarJson'
import { SmPopup } from '../SmPopup'
import moment from 'moment'
/**
 * @summary The Modal for selecting image.
 * 
 * @param {object} props 
 * @property {boolean} visible
 * @property {function} onCancel: dismiss the modal
 * @property {function} onDone: funtion handle image after chosen
 * 
 * @returns {Component}
 */

const options = {
    mediaType: 'photo',
    cropping: false,
    forceJpg: true,
}

export const SelectImageModal = React.memo((props) => {
    const { onCancel, visible, onDone } = props
    //Error Modal visible
    const [showErrorModal, setErrorModal] = React.useState(false)

    return (
        <>
            <Modal visible={visible} animationType="fade" style={{ backgroundColor: '#00000030', margin: 0 }} >
                <View style={styles.container}>
                    <View style={styles.box}>
                        <TouchableOpacity style={styles.textContainer}
                            onPress={() => {
                                ImagePickerLib.openCamera(options).then((image) => {
                                    onCancel()
                                    onDone && onDone({ ...image, name: moment().format("YYYY_MM_DD_HH_mm_ss") + "client_image.jpg", type: 'image/jpeg', uri: image.path });
                                }).catch(err => {
                                    console.log("----er", err.message);
                                    console.log("----er", err.code);
                                    onCancel()
                                    setTimeout(() => {
                                        if (err.code === "E_PERMISSION_MISSING" || err.code === 'E_PICKER_NO_CAMERA_PERMISSION')
                                            setErrorModal(true)
                                    }, 500)
                                });
                            }}>
                            <TextBox style={styles.text}>{CommonJson.TakePhoto}</TextBox>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            ...styles.textContainer,
                            borderTopColor: Colors.Gray,
                            borderTopWidth: 1,
                            borderBottomColor: Colors.Gray,
                            borderBottomWidth: 1,
                        }}
                            onPress={() => {
                                ImagePickerLib.openPicker(options).then((image) => {
                                    onCancel()
                                    onDone && onDone({ ...image, name: moment().format("YYYY_MM_DD_HH_mm_ss") + "client_image.jpg", type: 'image/jpeg', uri: image.path });
                                }).catch(err => {
                                    console.log("----er", err.code);
                                    console.log("----er", err.message);
                                    onCancel()
                                    setTimeout(() => {
                                        if (err.code === "E_PERMISSION_MISSING" || err.code === 'E_PICKER_NO_CAMERA_PERMISSION')
                                            setErrorModal(true)
                                    }, 500)
                                });
                            }}>
                            <TextBox style={styles.text}>{CommonJson.UploadPhoto}</TextBox>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.textContainer}
                            onPress={() => {
                                onCancel()
                            }}>
                            <TextBox style={styles.text}>{CommonJson.Cancel}</TextBox>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <SmPopup visible={showErrorModal}
                message={StudentGrammarJson.MediaError}
                cancelText={CommonJson.Cancel}
                confirmText={CommonJson.Confirm}
                contentStyles={styles.modalBox}
                messageStyle={[styles.messageModalStyle, styles.messageDeleteStyle]}
                cancelOnpress={() => setErrorModal(false)}
                confirmOnpress={() => {
                    setErrorModal(false)
                    Linking.openSettings()
                }}
            />
        </>
    )
})

const styles = StyleSheet.create({
    modalBox: {
        paddingBottom: SmartScreenBase.smBaseHeight * 40,
        paddingTop: SmartScreenBase.smBaseHeight * 40,
    },
    messageModalStyle: {
        marginBottom: SmartScreenBase.smBaseHeight * 20,
        color: Colors.Black,
        fontSize: FontSize.size55Font,
        lineHeight: SmartScreenBase.smBaseHeight * 40
    },
    messageDeleteStyle: {
        marginBottom: 0,
        paddingBottom: 0
    },
    container: {
        flex: 1,
        backgroundColor: 'rgba(51,51,51,0.65)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    box: {
        width: SmartScreenBase.smPercenWidth * 65,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
        backgroundColor: Colors.White,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        width: '100%',
        paddingVertical: 15,
        alignItems: 'center',
    },
    text: {
        ...FontWeight.Regular,
        fontSize: FontSize.size45Font
    }
});