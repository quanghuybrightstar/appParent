import React, { useState, useEffect } from 'react'
import Modal from 'react-native-modal'
import { View, TouchableOpacity, Image, StyleSheet, KeyboardAvoidingView, Platform, TouchableNativeFeedback } from 'react-native'
import { TextBox } from '../TextBox/TextBox'
import { Colors } from '../../styleApp/color'
import SmartScreenBase from '../../base/SmartScreenBase'
import { FontSize, FontWeight } from '../../styleApp/font'
import { AppTextInput } from '../AppTextInput'
import { ShortMainButton } from '../ShortMainButton'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import FontBase from '../../base/FontBase'

/**
 * @summary The TextBoxModal component 
 * 
 * @param {object} props 
 * @property {string} props.defaultValue: default value of text
 * @property {boolean} props.isVisible: visible of modal
 * @property {string} props.title:  title of modal
 * @property {string} props.placeholderText: of input
 * @property {string} props.cancelText:  cancel text
 * @property {function} props.onCancel:  on cancel click
 * @property {string} props.submitText: submit text
 * @property {function} props.onSubmit: on submit click
 * @property {TextStyle} props.textTitleStyles
 * @property {TextStyle} props.textInputStyles
 * @property {boolean} props.showCloseIcon
 * @property {any} others:  others props of Modal
 * 
 * @returns {Component}
 */
export const TextBoxModal = (props) => {

    const { defaultValue, isVisible, title, placeholderText, cancelText, onCancel, submitText, onSubmit, textTitleStyles, textInputStyles, showCloseIcon = true, mChild, ...others } = props
    const [value, setValue] = useState('')

    useEffect(() => {
        if (!isVisible) {
            setValue('')
        } else {
            setValue(defaultValue)
        }
    }, [isVisible])

    useEffect(() => {
        console.log('🚀 ~ file: index.js ~ line 24 ~ useEffect ~ defaultValue', defaultValue)
        if (!!defaultValue) {
            setValue(defaultValue)
        }
    }, [defaultValue])

    const onSave = () => {
        onSubmit(value)
    }

    return (
        <Modal isVisible={isVisible} onBackdropPress={() => onCancel && onCancel()} {...others} >
            <KeyboardAwareScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center'}} showsVerticalScrollIndicator={false}>
                <TouchableNativeFeedback onPress={()=>onCancel && onCancel()}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                <View style={styles.container}>
                    <TextBox text={title} style={[styles.titleText, textTitleStyles]} />
                    <AppTextInput
                        placeholder={placeholderText}
                        multiline
                        placeholderTextColor={'#ccc'}
                        style={[styles.textInput, textInputStyles]}
                        value={value}
                        onChangeText={setValue}
                    />
                    {!!mChild && mChild()}
                    <View style={styles.row}>
                        {!!cancelText && <ShortMainButton
                            text={cancelText}
                            widthType="popup"
                        />}
                        <ShortMainButton
                            onPress={onSave}
                            text={submitText}
                            type={1}
                            style={styles.button}
                            isDisabled={value === ''}
                            widthType="popup"
                            textStyles={{ fontFamily: FontBase.MyriadPro_Bold, }}
                        />
                    </View>
                    {!!showCloseIcon && <TouchableOpacity style={styles.closeButton} onPress={() => onCancel && onCancel()}>
                        <Image source={{ uri: 'close_icon' }} style={styles.closeIcon} />
                    </TouchableOpacity>}
                </View>
                </View>
                </TouchableNativeFeedback>
            </KeyboardAwareScrollView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.White,
        paddingHorizontal: SmartScreenBase.smBaseWidth * 30,
        paddingTop: SmartScreenBase.smBaseHeight * 30,
        paddingBottom: SmartScreenBase.smBaseHeight * 20,
        borderRadius: SmartScreenBase.smBaseWidth * 30,
        // flex: 1
    },
    titleText: {
        fontSize: FontSize.size65Font
    },
    textInput: {
        height: SmartScreenBase.smBaseHeight * 150,
        paddingVertical: SmartScreenBase.smBaseHeight * 20,
        lineHeight: SmartScreenBase.smBaseHeight * 30,
        textAlignVertical: 'top',
        ...FontWeight.LightItalic
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    button: {
        alignSelf: 'center',
        paddingHorizontal: SmartScreenBase.smBaseWidth * 60
    },
    closeIcon: {
        width: SmartScreenBase.smBaseWidth * 50,
        height: SmartScreenBase.smBaseWidth * 50,
    },
    closeButton: {
        position: 'absolute',
        top: SmartScreenBase.smBaseHeight * 20,
        right: SmartScreenBase.smBaseWidth * 30
    }
})