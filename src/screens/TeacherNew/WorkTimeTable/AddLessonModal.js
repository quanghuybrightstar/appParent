import React, { useState, useEffect } from 'react'
import Modal from "react-native-modal";
import { View, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Alert, StyleSheet, Text } from "react-native";
import { TextBox } from "../../../componentBase/TextBox";
import SmartScreenBase from '../../../base/SmartScreenBase';
import { FontSize, FontWeight } from '../../../styleApp/font';
import { MyButton } from '../../../componentBase/Button';
const Tick = require('../../../assets/image/tick.png')
import moment from 'moment'
import API from '../../../API/APIConstant';
import MyData from '../../../component/MyData';
import axios from 'axios';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { CommonJson, PlanModalJson, TimeTableJson } from '../../../stringJSON';
import APIBase from '../../../base/APIBase';
import { Colors } from '../../../styleApp/color';
import { SmallCheckBox } from '../../../componentBase/SmallCheckBox';
import { AddLessonStyle as styles } from "./TimeTable.style";
import { SelectHourButton } from "../../../componentBase/SelectHourButton";
import { CommonDropdown } from "../../../componentBase/Dropdown";
import { ShortMainButton } from '../../../componentBase/ShortMainButton';
import { FullScreenLoadingIndicator } from '../../../componentBase/indicator/FullScreenLoadingIndicator';

/**
 *  add lession modal
 * @param {object} props
 * @property {boolean} visible visible of modal
 * @property {function} requestClose requestClose function
 * @property {object} selectedLesson selectedLesson
 * @property {object} other others modal props
 * @returns
 */
export const AddLessionModal = (props) => {

    const { language } = props
    const { TeachingScheduleScreen } = language
    //Check if notify
    const [isNotify, setIsNotify] = useState(true)
    //Minute of notify
    const [minutes, setMinutes] = useState('10')
    //Lesson name
    const [lesson, setLesson] = useState('')
    //Loading flag
    const [isLoading, setLoading] = useState(false)
    //Start time of lesson
    const [startTime, setStartTime] = useState('')
    //End time of Lesson
    const [endTime, setEndTime] = useState('')
    //Selected Day
    const [selectedDay, setSelectedDay] = useState(0)
    //disable button
    const [disable, setDisable] = useState(false)
    //Error message
    const [errorDate, setErrorDate] = useState('')
    const DOW = [TeachingScheduleScreen.Select1Modal, TeachingScheduleScreen.Select2Modal, TeachingScheduleScreen.Select3Modal, TeachingScheduleScreen.Select4Modal, TeachingScheduleScreen.Select5Modal, TeachingScheduleScreen.Select6Modal, TeachingScheduleScreen.Select7Modal]
    useEffect(() => {
        if (!props.isVisible) {
            setLesson('')
            setMinutes('10')
            setIsNotify(true)
        } else {
            setStartTime(!!props.selectedLesson ? props.selectedLesson.start_time : props.selectedTime)
            setEndTime(!!props.selectedLesson ? props.selectedLesson.end_time : moment(props.selectedTime, 'HH:mm').add(45, 'm').format('H:mm'))
            setSelectedDay(props.selectedDay)
            setLesson(!!props.selectedLesson ? props.selectedLesson.class_name : '')
            setMinutes(!!props.selectedLesson && props.selectedLesson.remind == 1 ? props.selectedLesson.remind_time : '10')
            setIsNotify(!!props.selectedLesson && props.selectedLesson.remind == 0 ? false : true)
        }
    }, [props.isVisible])
    /**
     * Check disable button
     */
    useEffect(() => {
        const startTimeString = moment(startTime, 'H:mm').format('HH:mm')
        const endTimeString = moment(endTime, 'H:mm').format('HH:mm')

        if (startTimeString >= endTimeString) {
            setErrorDate('Giờ kết thúc phải lớn hơn giờ bắt đầu')
            setDisable(true)
        } else {
            setDisable(false)
            setErrorDate('')
        }

        if (lesson.trim() == '') {
            setDisable(true)
        }

    }, [startTime, endTime, lesson])

    /**
     * Create new lession
     */
    const onSave = async () => {
        setLoading(true);
        const url = API.baseurl + API.addLessonTimeTable;
        const start_time = `${moment(startTime, 'H:mm').format('HH:mm')}`
        const end_time = `${moment(endTime, 'H:mm').format('HH:mm')}`
        // const end_time = `${moment(startTime, 'H:mm').add(45, 'm').format('HH:mm')}`
        try {
            const res = await APIBase.postDataJson('post', url, {
                start_time: start_time,
                end_time: end_time,
                class_name: lesson.trim(),
                remind: isNotify ? "1" : "0",
                remind_time: minutes,
                day_name: moment().isoWeekday(selectedDay + 1).format('dddd')
            })
            let data = res.data;
            setLoading(false);
            console.log("----- data.status", data);
            if (data.status) {
                props.callBack()
                props.requestClose()
            } else {
                console.log("----- data.msg", data.msg);
                setTimeout(() => {
                    Alert.alert('', data.msg)
                }, 500)
            }

        } catch (error) {
            console.log("-----error", error);
            setLoading(false);
            setTimeout(() => {
                Alert.alert('', error.response.data);
            }, 500)
        }
    }

    /**
     * edit current lession
     */
    const onEdit = async () => {
        setLoading(true);
        const url = API.baseurl + API.addLessonTimeTable;
        try {
            const start_time = `${moment(startTime, 'H:mm').format('HH:mm')}`
            const end_time = `${moment(endTime, 'H:mm').format('HH:mm')}`
            // const end_time = `${moment(startTime, 'H:mm').add(45, 'm').format('HH:mm')}`

            const res = await APIBase.postDataJson('put', url, {
                id: props.selectedLesson.id,
                start_time: start_time,
                end_time: end_time,
                class_name: lesson.trim(),
                remind_time: minutes,
                remind: isNotify ? 1 : 0,
                day_name: moment().isoWeekday(selectedDay + 1).format('dddd')

            })
            let data = res.data;
            setLoading(false);
            console.log("----- data.status", data);
            if (data.status) {
                props.callBack()
                props.requestClose()
            } else {
                console.log("----- data.msg", data.msg);
                setTimeout(() => {
                    Alert.alert('', data.msg)
                }, 500)
            }

        } catch (error) {
            console.log("-----error", error);
            setLoading(false);
            setTimeout(() => {
                Alert.alert('', error.response.data);
            }, 500)
        }
    }

    /**
     * Check minute
     * @param {string} value minute
     */
    const checkMinute = (value) => {
        if (!value) {
            setMinutes('')
            return;
        }
        const regex = /^\d+$/;
        if (regex.test(value)) {
            setMinutes(value)
        }
    }

    return (
        <Modal {...props} style={styles.modalWrapper}>
            <KeyboardAwareScrollView contentContainerStyle={styles.modalContent} bounces={false}  >
                <View style={styles.content}>
                    <CommonDropdown selected={selectedDay} item={DOW.map((a, idx) => {
                        return {
                            label: a,
                            value: idx
                        }
                    })} onChange={setSelectedDay} dropStyle={styles.drop} />
                    <View>
                        <TextBox numberOfLines={undefined} style={styles.title}>{TeachingScheduleScreen.TimeTittleModal}</TextBox>
                        <View style={styles.timeSelect}>
                            <SelectHourButton btnStyle={styles.startTime} time={startTime} onChangeHour={setStartTime}>
                                <TextBox text={TeachingScheduleScreen.StartModal} style={[FontWeight.LightItalic]} />
                                <TextBox text={startTime} style={FontWeight.Bold} />
                            </SelectHourButton>
                            <SelectHourButton btnStyle={styles.endTime} time={endTime} onChangeHour={setEndTime}>
                                <TextBox text={TeachingScheduleScreen.EndModal} style={[FontWeight.LightItalic]} />
                                <TextBox text={endTime} style={FontWeight.Bold} />
                            </SelectHourButton>
                        </View>
                    </View>
                    {!!errorDate && <TextBox style={styles.txtErr}>{errorDate}</TextBox>}
                    <View style={styles.sectionContainer}>
                        <TextBox numberOfLines={undefined} style={styles.title}>{TeachingScheduleScreen.ClassTittleModal}</TextBox>
                        <TextInput placeholder={TeachingScheduleScreen.ClassHoderModal}
                            value={lesson}
                            maxLength={20}
                            onChangeText={setLesson}
                            placeholderTextColor={Colors.LightGray}
                            style={styles.subject} />
                    </View>
                    <View style={styles.sectionContainer}>
                        <TextBox numberOfLines={undefined} style={styles.remindText}>{TeachingScheduleScreen.RemiderModal}</TextBox>
                        <View style={styles.remindSection}>
                            <SmallCheckBox
                                onPress={() => setIsNotify(!isNotify)}
                                isNotify={isNotify}
                            />
                            <TextBox text={`${TeachingScheduleScreen.RemiderBeforeModal}  `} style={[styles.minuteText, FontWeight.Light]} />
                            <TextInput
                                keyboardType="number-pad"
                                // placeholder={TeachingScheduleScreen.Minute}
                                value={minutes}
                                placeholderTextColor={Colors._ccc}
                                onBlur={() => {
                                    if (!minutes) setMinutes("0")
                                }}
                                onChangeText={(text) => {
                                    if (!text) {
                                        setMinutes("")
                                    }
                                    const regex = /^\d+$/;
                                    if (!regex.test(text)) return
                                    if (Number(text) < 61) {
                                        setMinutes(text)
                                    }
                                }}
                                style={styles.minuteInput} />
                            <TextBox text={` ${TeachingScheduleScreen.Minute.toLowerCase()}`} style={styles.minuteText} />

                        </View>
                    </View>
                    <TextBox text={language.CreatePlanScreen.ReminderWarning} style={styles.notyText} />
                    <View style={styles.btnContainer}>
                        <ShortMainButton
                            widthType="mini"
                            text={TeachingScheduleScreen.RejectBt}
                            style={styles.btn}
                            onPress={props.requestClose}
                        />
                        <ShortMainButton
                            isDisabled={disable}
                            widthType="mini"
                            type={1}
                            onPress={!!props.selectedLesson ? onEdit : onSave}
                            hasBackground
                            text={TeachingScheduleScreen.SaveBt}
                            style={styles.btn}
                        />
                    </View>
                </View>
            </KeyboardAwareScrollView >
            <FullScreenLoadingIndicator
                visible={isLoading}
            />
        </Modal >
    )
}

