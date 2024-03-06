import React from 'react'
import Modal from "react-native-modal";
import { View, TouchableOpacity, Text, Alert, StyleSheet } from "react-native";
import { TextBox } from "../../../componentBase/TextBox";
import SmartScreenBase from '../../../base/SmartScreenBase';
import { FontWeight } from '../../../styleApp/font';
import { ShortMainButton } from '../../../componentBase/ShortMainButton';
import { useState } from 'react';
import API from '../../../API/APIConstant';
import { ConfirmResetStyle as styles } from "./TimeTable.style";
import { CommonJson, TimeTableJson } from '../../../stringJSON';
import APIBase from '../../../base/APIBase';
import { FullScreenLoadingIndicator } from '../../../componentBase/indicator/FullScreenLoadingIndicator';

/**
 *  confirm Reset data modal
 * @param {object} props 
 * @property {function} callBack callback function 
 * @property {function} requestClose requestClose function 
 * @property {object} other others modal props
 * @returns 
 */
export const ConfirmResetModal = (props) => {

    const [isLoading, setLoading] = useState(false)

    /**
     * on reset all data
     */
    const onCancel = async () => {
        setLoading(true);
        const url = API.baseurl + API.resetLessonTimeTable;
        try {
            const res = await APIBase.postDataJson('delete', url)
            let data = res.data;
            if (data.status) {
                props.callBack()
                props.requestClose()
            } else {
                Alert.alert('', data.msg)
            }

        } catch (error) {
            Alert.alert('', error.response.data);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Modal {...props}>
            <View style={styles.container}>
                <View>
                    <TextBox numberOfLines={undefined} style={styles.resetTitle}>{TimeTableJson.ResetTitle}</TextBox>
                    <TextBox numberOfLines={undefined} style={styles.resetMessage}>{TimeTableJson.ResetMessage}</TextBox>
                </View>
                <View style={styles.btnContainer}>
                    <ShortMainButton
                        onPress={() => props.requestClose()}
                        text={CommonJson.Cancel}
                        style={styles.btn}
                    />
                    <ShortMainButton
                        type={1}
                        onPress={onCancel}
                        text={CommonJson.Reset}
                        style={styles.btn}
                    />
                </View>
                <FullScreenLoadingIndicator
                visible={isLoading}
            />
            </View>
        </Modal>
    )
}
