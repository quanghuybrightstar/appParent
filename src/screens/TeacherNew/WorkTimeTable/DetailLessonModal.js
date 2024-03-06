import React, { useState } from 'react'
import Modal from "react-native-modal";
import { View, Alert, TextInput } from "react-native";
import { TextBox } from "../../../componentBase/TextBox";
import { MyButton } from '../../../componentBase/Button';
import moment from 'moment'
import { ConfirmResetStyle as styles } from "./TimeTable.style";
import API from '../../../API/APIConstant';
import APIBase from '../../../base/APIBase';
import { ShortMainButton } from '../../../componentBase/ShortMainButton';
import { Colors } from '../../../styleApp/color';
import { FullScreenLoadingIndicator } from '../../../componentBase/indicator/FullScreenLoadingIndicator';

/**
 *  add lession modal
 * @param {object} props
 * @property {boolean} visible visible of modal
 * @property {function} requestClose requestClose function
 * @property {function} onEditPress onEditPress function
 * @property {object} language language
 * @property {object} selectedLesson selectedLesson
 * @property {object} other others modal props
 * @returns
 */
export const DetailLessonModal = (props) => {

    const { language, requestClose, onEditPress, selectedLesson } = props
    const { TeachingScheduleScreen } = language
    const DOW = [TeachingScheduleScreen.Select1Modal, TeachingScheduleScreen.Select2Modal, TeachingScheduleScreen.Select3Modal, TeachingScheduleScreen.Select4Modal, TeachingScheduleScreen.Select5Modal, TeachingScheduleScreen.Select6Modal, TeachingScheduleScreen.Select7Modal]
    const EngDOW = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const [loading, setLoading] = useState(false)

    /**
     * Delete this lession
     */
    const onDelete = async () => {
        const url = API.baseurl + API.addLessonTimeTable;
        try {
            let qs = require('qs');
            let requestData = qs.stringify({
                id: selectedLesson.id
            });
            setLoading(true)
            const res = await APIBase.deleteWithData(url, requestData)
            setLoading(false)
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
        }
    }

    return (
        <Modal {...props} onBackdropPress={requestClose}>
            <View style={styles.container}>
                {!!selectedLesson && <View>
                    <View style={styles.flexRow}>
                        <TextBox numberOfLines={undefined} style={styles.dateText}>{DOW[EngDOW.findIndex(a => a == selectedLesson.day_name)]}</TextBox>
                        <TextBox style={styles.timeText}>{`  ${selectedLesson.start_time} - ${selectedLesson.end_time}`}</TextBox>
                    </View>

                    <View style={styles.detailSubjectInput}>
                        <TextBox style={[styles.subject,]}>
                            {selectedLesson.class_name}
                        </TextBox>
                    </View>
                    {console.log("=====selectedLesson",selectedLesson)}
                    {selectedLesson.remind === '1' &&
                        <View style={styles.remindWrapper}>
                            {
                                selectedLesson.remind_time === "0"
                                ?
                                <TextBox style={[styles.remindText, styles.detailRemindText]}>
                                    {TeachingScheduleScreen.RemindAtTheTime}
                                </TextBox>
                                :
                                <>
                                    <TextBox numberOfLines={undefined} style={[styles.remindText, styles.detailRemindText]}>
                                        {`${TeachingScheduleScreen.RemiderBeforeModal}`}
                                    </TextBox>
                                    <TextBox style={styles.minuteText}>{`${selectedLesson.remind_time}`}</TextBox>
                                    <TextBox numberOfLines={undefined} style={[styles.remindText, styles.detailRemindText]}>
                                        {`${TeachingScheduleScreen.Minute.toLocaleLowerCase()}`}
                                    </TextBox>
                                </>
                            }
                        </View>}
                </View>}
                <View style={styles.btnContainer}>
                    <ShortMainButton
                        type={1}
                        onPress={onDelete}
                        text={TeachingScheduleScreen.DeleteBtPopup}
                        style={styles.btn}
                        widthType={'popup'}
                    />
                    <ShortMainButton
                        type={1}
                        onPress={onEditPress}
                        text={TeachingScheduleScreen.EditBtPopup}
                        style={styles.btn}
                        widthType={'popup'}
                    />
                </View>
            </View>
            <FullScreenLoadingIndicator
                visible={loading}
            />
        </Modal>
    )
}
