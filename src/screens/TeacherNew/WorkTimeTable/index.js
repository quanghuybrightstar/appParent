import React, { useEffect } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions, Image, Platform, Alert, ActivityIndicator } from 'react-native'
import SmartScreenBase from '../../../base/SmartScreenBase';
import { AppHeader } from '../../../componentBase/AppHeader'
import moment from 'moment'
import { ConfirmResetModal } from "./ConfirmResetModal";
import { AddLessionModal } from "./AddLessonModal";
import { useState } from 'react';
import API from '../../../API/APIConstant';
import { TextBox } from "../../../componentBase/TextBox";
import { FontSize, FontWeight } from '../../../styleApp/font';
import { SelectDateModal } from "../../../componentBase/SelectDateModal/";
import { Colors } from '../../../styleApp/color';
import { styles } from './TimeTable.style';
import APIBase from '../../../base/APIBase';
import { useSelector } from 'react-redux';
import { MyButton } from '../../../componentBase/Button';
import { DetailLessonModal } from "./DetailLessonModal";
import { ShortMainButton } from "../../../componentBase/ShortMainButton";
import { FullScreenLoadingIndicator } from '../../../componentBase/indicator/FullScreenLoadingIndicator';
import LogBase from '../../../base/LogBase';
const RefreshIcon = require('../../../assets/image/refreshIcon.png')

const BaseWidth = Dimensions.get('screen').width;
const ItemWidth = (BaseWidth - 60) / 7


const HourItemHeight = SmartScreenBase.smBaseWidth * 240

/**
 * Generate array of hour
 * @returns array
 */
const generateHour = () => {
    let hours = [];

    for (let hour = 4; hour < 24; hour++) {
        hours.push(moment({ hour }).format('H:mm'));
        hours.push(
            moment({
                hour,
                minute: 30
            }).format('H:mm')
        );
    }
    return hours
}

const dataHour = generateHour()

/**
 * Calculate height of hour
 * @param {*} start state date
 * @param {*} end end date
 * @returns number
 */
const calculateHeight = (start, end = dataHour[0]) => {
    let totalStartTime = Number(start.split(':')[0]) * 60 + Number(start.split(':')[1])
    let totalEndTime = Number(end.split(':')[0]) * 60 + Number(end.split(':')[1])
    if (end === dataHour[0]) {
        return (totalStartTime - totalEndTime) * (HourItemHeight / 30) + HourItemHeight
    } else {
        return (totalEndTime - totalStartTime) * (HourItemHeight / 30)
    }
}


/**
 * TimeTatle object
 * @param {object} props props from redux and navigtaion
 * @returns Object
 */
export const WorkTimeTable = (props) => {
    const language = useSelector(state => state.LanguageStackReducer.language)
    const { TeachingScheduleScreen } = language
    const [isResetModalVisible, setResetModalVisible] = useState(false)
    const [isAddLessonModalVisible, setLessonModalVisible] = useState(false)
    const [isDetailLessonModalVisible, setDetailLessonModalVisible] = useState(false)
    const [isCalendarVisible, setCalendarVisible] = useState(false)
    const [selectedTime, setSelectedTime] = useState('')
    const [selectedDay, setSelectedDay] = useState('')
    const [isLoading, setLoading] = useState(false)
    const [rangeDate, setRangeDate] = useState(new Date())

    const [lessonList, setLessonList] = useState([])
    const [selectedLesson, setSelectedLesson] = useState()
    const DOW = [TeachingScheduleScreen.Column1, TeachingScheduleScreen.Column2, TeachingScheduleScreen.Column3, TeachingScheduleScreen.Column4, TeachingScheduleScreen.Column5, TeachingScheduleScreen.Column6, TeachingScheduleScreen.Column7]

    /**
     * Save Date which is selected
     * @param {date} selectedDate
     */
    const onSaveDate = async (selectedDate) => {
        setRangeDate(selectedDate)
        const url = API.baseurl + API.updateScheduleConfig;
        try {
            const res = await APIBase.postDataJson('put', url, {
                valid_to: selectedDate
            })
            let data = res.data;
        } catch (error) {
            Alert.alert('', error.response.data);
        } finally {
        }
    }


    /**
     * Filter data by date of week
     */
    const filterByDow = (dow) => {
        return lessonList.filter(a => moment().isoWeekday(dow + 1).format('dddd') === a.day_name)
    }

    useEffect(() => {
        getData()
    }, [])

    /**
     * Press onto a time to create Plan
     * @param {any} time selected time
     * @param {any} day selected day
     */
    const onPress = (time, day) => {
        setSelectedLesson(null)
        setSelectedDay(day)
        setSelectedTime(time)
        setLessonModalVisible(true)
    }

    /**
    * Press onto a plan to edit
    * @param {any} time selected time
    * @param {any} day selected day
    */
    const onSelectLesson = (item, day) => {
        setSelectedLesson(item)
        setSelectedTime(item.start_time)
        setSelectedDay(day)
        setDetailLessonModalVisible(true)
    }

    /**
     * Edit lession show modal
     */
    const onEditLesson = () => {
        setDetailLessonModalVisible(false)
        setTimeout(() => {
            setLessonModalVisible(true)
        }, Platform.OS === 'ios' ? 500 : 300);
    }

    /**
     * Get data of time table this week
     */
    const getData = async () => {
        const url = API.baseurl + API.getLessonTimeTable + `?start_time=${moment().isoWeekday(1).format('YYYY-MM-DD')} 06:00:00&end_time=${moment().isoWeekday(7).format('YYYY-MM-DD')} 23:00:00`;
        try {
            setLoading(true)
            const res = await APIBase.postDataJson('get', url)
            setLoading(false)
            let data = res.data;
            console.log("=====DataLich", data);
            if(res.data.status){
                if (data.data) {
                    setRangeDate(data.valid_to)
                    setLessonList(data.data)
                } else {
                    setLessonList([])
                }
            }
        } catch (error) {
            Alert.alert('', error.response.data);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.flex1}>
            <AppHeader title={language.TeachingScheduleScreen.Header} leftIconOnPress={() => {
                props.navigation.pop()
            }}
                rightImage={lessonList.length > 0 ? RefreshIcon : null}
                rightIconOnPress={() => setResetModalVisible(true)}
            />
            <View style={[styles.container, lessonList.length > 0 ? styles.containerWithButton : styles.containerWithoutButton]}>

                <View style={styles.viewWeekend}>
                    <View style={[styles.headerBox, styles.width50]} />
                    {DOW.map((a, index) => {
                        return (
                            <View style={[styles.headerBox, { width: ItemWidth }]}>
                                <TextBox style={styles.textHeader}>{a}</TextBox>
                            </View>
                        )
                    })}
                </View>
                <ScrollView>
                    <View style={styles.viewItemCalendar}>
                        <View>
                            {dataHour.map((h) => {
                                return (
                                    <View style={[styles.hourBox, styles.width50]}>
                                        <TextBox style={styles.textHour}>{h}</TextBox>
                                    </View>
                                )
                            })}
                        </View>
                        { !isLoading ? <>
                        {DOW.map((a, idx) => {
                            let lesson = filterByDow(idx)
                            return (
                                <View>
                                    {dataHour.map((h, index, hours) => {
                                        if (index > 0) {
                                            return (
                                                <TouchableOpacity activeOpacity={0.6} onPress={() => onPress(hours[index - 1], idx)} style={[styles.itemBox, { width: ItemWidth }]}>
                                                    {/* <TextBox style={styles.textHeader}>{h}</TextBox> */}
                                                </TouchableOpacity>
                                            )
                                        } else {
                                            return (
                                                <View style={[styles.itemBox, { width: ItemWidth }]}>
                                                </View>
                                            )
                                        }
                                    })}
                                    {lesson.length > 0 && lesson.map(l => {
                                        return (
                                            <TouchableOpacity onPress={() => onSelectLesson(l, idx)} style={[styles.lessionItem, { top: calculateHeight(l.start_time), height: calculateHeight(l.start_time, l.end_time), backgroundColor: moment().isoWeekday() === idx + 1 ? '#01A79E' : '#00E2A0', }]}>
                                                <TextBox numberOfLines={3} style={[styles.classText, { textAlign: 'center' }]}>{l.class_name}</TextBox>
                                                <TextBox style={styles.lessonText}>{l.start_time}</TextBox>
                                                <TextBox style={styles.lessonText}>{l.end_time}</TextBox>
                                            </TouchableOpacity>
                                        )
                                    })}
                                </View>
                            )
                        })}
                    </> : <FullScreenLoadingIndicator visible={isLoading}/>}
                    </View>
                </ScrollView>
                {lessonList.length > 0 && <View style={styles.footer}>
                    <TextBox style={styles.applyText}>{TeachingScheduleScreen.ApplyText}</TextBox>
                    <TouchableOpacity onPress={() => setCalendarVisible(true)} style={styles.dateBox}>
                        <TextBox style={styles.dateText}>{moment(rangeDate).format('DD/MM/YYYY')}</TextBox>
                        <Image source={{ uri: "imageback" }} style={styles.dateIcon} resizeMode='contain' />
                    </TouchableOpacity>
                </View>}
                { !isLoading ?
                    <ShortMainButton
                        onPress={() => { onPress(dataHour[0], 0) }}
                        type={1}
                        widthType={'full'}
                        text={lessonList.length === 0 ? TeachingScheduleScreen.CreateBt : TeachingScheduleScreen.UpdateBt}
                        isDisabled={isLoading}
                        style={styles.btn}
                    />
                : null}
            </View>
            <DetailLessonModal
                language={language}
                isVisible={isDetailLessonModalVisible}
                requestClose={() => setDetailLessonModalVisible(false)}
                selectedLesson={selectedLesson}
                callBack={getData}
                onEditPress={onEditLesson} />
            <ConfirmResetModal
                language={language}
                isVisible={isResetModalVisible}
                requestClose={() => setResetModalVisible(false)}
                callBack={getData}
            />
            <SelectDateModal
                minimunDate={new Date()}
                rangeDate={moment(rangeDate).toDate()}
                isVisible={isCalendarVisible}
                requestClose={(date) => {
                    setCalendarVisible(false)
                    if (!!date) {
                        setRangeDate(date)
                    }
                }}
                onSave={onSaveDate}
                 />
            <AddLessionModal
                language={language}
                isVisible={isAddLessonModalVisible}
                selectedTime={selectedTime}
                requestClose={() => setLessonModalVisible(false)}
                selectedLesson={selectedLesson}
                selectedDay={selectedDay}
                callBack={getData} />
        </View >
    )
}

