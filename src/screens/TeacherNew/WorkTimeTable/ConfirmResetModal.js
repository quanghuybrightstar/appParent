import React from 'react'
import Modal from "react-native-modal";
import { View, Alert } from "react-native";
import { TextBox } from "../../../componentBase/TextBox";
import { MyButton } from '../../../componentBase/Button';
import { useState } from 'react';
import API from '../../../API/APIConstant';
import APIBase from '../../../base/APIBase';
import { ConfirmResetStyle as styles } from "./TimeTable.style";
import { ShortMainButton } from '../../../componentBase/ShortMainButton';
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

    const { language } = props
    const { TeachingScheduleScreen } = language

    const [loading, setLoading] = useState(false)

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
                    <TextBox numberOfLines={undefined} style={styles.resetTitle}>{TeachingScheduleScreen.ResetCalenderPopup} ?</TextBox>
                    <TextBox numberOfLines={undefined} style={styles.resetMessage}>{TeachingScheduleScreen.DescriptionResetPopup}.</TextBox>
                </View>
                <View style={styles.btnContainer}>
                    <ShortMainButton
                        type={2}
                        onPress={() => props.requestClose()}
                        text={TeachingScheduleScreen.RejectBt}
                        style={styles.btn}
                        widthType={'popup'}
                    />
                    <ShortMainButton
                        type={1}
                        onPress={onCancel}
                        text={TeachingScheduleScreen.ResetBt}
                        style={styles.btn}
                        widthType={'popup'}
                    />

                </View>
            <FullScreenLoadingIndicator
                visible={loading}
            />
            </View>
        </Modal>
    )
}
