import React, { useState, useEffect } from 'react'
import Modal from "react-native-modal";
import { View, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Alert, StyleSheet } from "react-native";
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
import LogBase from '../../../base/LogBase';
import { useSelector } from 'react-redux';
const DOW = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật']

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
    const language = useSelector(state => state.LanguageStackReducer.language);
    //Check if notify is chosen
    const [isNotify, setIsNotify] = useState(true)
    //Minute before notify
    const [minutes, setMinutes] = useState('10')
    //lesson name
    const [lesson, setLesson] = useState('')
    //Loading flag
    const [isLoading, setLoading] = useState(false)
    //selected Day
    const [selectedDay, setSelectedDay] = useState(0)
    //lesson start time
    const [startTime, setStartTime] = useState('')
    //lesson end time
    const [endTime, setEndTime] = useState('')
    // disable button save 
    const [disable, setDisable] = useState(true)
    //Error message
    const [errorDate, setErrorDate] = useState('')

    useEffect(() => {
        if (!props.isVisible) {
            setErrorDate('')
            setLesson('')
            setMinutes('10')
            setIsNotify(true)
        } else {
            console.log("----props.selectedLesson", props.selectedLesson);
            setStartTime(!!props.selectedLesson ? props.selectedLesson.start_time : props.selectedTime)
            setEndTime(!!props.selectedLesson ? props.selectedLesson.end_time : moment(props.selectedTime, 'HH:mm').add(45, 'm').format('H:mm'))
            setSelectedDay(props.selectedDay)
            setLesson(!!props.selectedLesson ? props.selectedLesson.class_name : '')
            setMinutes(!props.selectedLesson || props?.selectedLesson?.remind === '0' ? '10' : props.selectedLesson.remind_time)
            setIsNotify((props.selectedLesson && props.selectedLesson.remind != 0) ? true : props.selectedLesson ? false : true)
        }
    }, [props.isVisible])

    useEffect(() => {
        const hourStart = moment(startTime, 'H:mm').format('H');
        const hourEnd = moment(endTime, 'H:mm').format('H');
        const minStart = moment(startTime, 'H:mm').format('mm');
        const minEnd = moment(endTime, 'H:mm').format('mm');
        if (Number(hourStart) > Number(hourEnd)) {
            setErrorDate('Giờ kết thúc không được nhỏ hơn giờ bắt đầu.')
            setDisable(true)
        } else {
            if (Number(hourStart) == Number(hourEnd) && Number(minStart) > Number(minEnd)) {
                setErrorDate('Giờ kết thúc không được nhỏ hơn giờ bắt đầu.')
                setDisable(true)
            } else {
                setDisable(false)
                setErrorDate('')
            }
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
            var reqData = {
                start_time: start_time,
                end_time: end_time,
                class_name: lesson.trim(),
                remind_time: minutes,
                remind: isNotify ? 1 : 0,
                day_name: moment().isoWeekday(selectedDay + 1).format('dddd')
            }
            const res = await APIBase.postDataJson('post', url, reqData)
            let data = res.data;
            setLoading(false);
            console.log("----- data.status", reqData, data);
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
            postData = {
                id: props.selectedLesson.id,
                start_time: start_time,
                end_time: end_time,
                class_name: lesson.trim(),
                remind_time: minutes,
                remind: isNotify ? 1 : 0,
                day_name: moment().isoWeekday(selectedDay + 1).format('dddd')

            }
            const res = await APIBase.postDataJson('put', url, postData)
            let data = res.data;
            setLoading(false);
            LogBase.log("=====postData", postData, data.status);
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

    return (
        <Modal {...props} style={{ margin: 0, ...props.style }}>
            <KeyboardAwareScrollView bounces={false} enableOnAndroid={true} contentContainerStyle={styles.modalContent} >
                <View style={styles.content}>
                    <CommonDropdown selected={selectedDay} item={DOW.map((a, idx) => {
                        return {
                            label: a,
                            value: idx
                        }
                    })} onChange={setSelectedDay} />
                    <View>
                        <TextBox numberOfLines={undefined} style={styles.title}>{PlanModalJson.Time}</TextBox>
                        <View style={styles.timeSelect}>
                            <SelectHourButton btnStyle={styles.startTime} time={startTime} onChangeHour={setStartTime}>
                                <TextBox text={TimeTableJson.TimeStart} style={styles.timeText} />
                                <TextBox text={startTime} style={FontWeight.Bold} />
                            </SelectHourButton>
                            <SelectHourButton btnStyle={styles.endTime} time={endTime} onChangeHour={setEndTime}>
                                <TextBox text={TimeTableJson.TimeEnd} style={styles.timeText} />
                                <TextBox text={endTime} style={FontWeight.Bold} />
                            </SelectHourButton>
                        </View>
                    </View>
                    {!!errorDate && <TextBox style={styles.txtErr}>{errorDate}</TextBox>}
                    <View style={styles.sectionContainer}>
                        <TextBox numberOfLines={undefined} style={styles.title}>{TimeTableJson.Subject}</TextBox>
                        <View style={styles.shadow}>
                            <TextInput placeholder={TimeTableJson.LessonPlaceHolder}
                                value={lesson}
                                maxLength={20}
                                onChangeText={setLesson}
                                placeholderTextColor={Colors._ccc}
                                style={styles.subject} />
                        </View>
                    </View>
                    <View style={styles.sectionContainer}>
                        <TextBox numberOfLines={undefined} style={styles.remindText}>{TimeTableJson.RemindTitle}</TextBox>
                        <View style={styles.remindSection}>
                            <View style={styles.checkBox}>
                                <SmallCheckBox
                                    onPress={() => setIsNotify(!isNotify)}
                                    isNotify={isNotify}
                                />
                            </View>
                            <TextBox text={`${TimeTableJson.RemindBefore}   `} style={FontWeight.Light} />
                            <View style={styles.shadow}>
                                <TextInput
                                    keyboardType="decimal-pad"
                                    value={minutes}
                                    maxLength={2}
                                    placeholderTextColor={Colors._ccc}
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
                                    onBlur={() => {
                                        if (!minutes) setMinutes("0")
                                    }}
                                    style={styles.minuteInput} />
                            </View>
                            <TextBox text={` ${TimeTableJson.Minute.toLowerCase()}`} style={styles.minuteText} />
                            {/* <View style={{ width: 10 }} /> */}
                        </View>
                    </View>
                    <TextBox text={language.CreatePlanScreen.ReminderWarning} style={styles.notyText} />
                    <View style={styles.btnContainer}>
                        <ShortMainButton
                            text={CommonJson.Cancel}
                            style={styles.btn}
                            onPress={props.requestClose}
                        />
                        <ShortMainButton
                            isDisabled={disable}
                            onPress={!!props.selectedLesson ? onEdit : onSave}
                            type={1}
                            text={CommonJson.Save}
                            style={styles.btn}
                        />
                    </View>
                </View>
            </KeyboardAwareScrollView>
            <FullScreenLoadingIndicator
                visible={isLoading}
            />
        </Modal >
    )
}

