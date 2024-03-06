import React, { useEffect } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions, Image, Platform, Alert, ActivityIndicator } from 'react-native'
import SmartScreenBase from '../../../base/SmartScreenBase';
import { AppHeader } from '../../../componentBase/AppHeader'
import moment from 'moment'
import { ConfirmResetModal } from "./ConfirmResetModal";
import { AddLessionModal } from "./AddLessonModal";
import { useState } from 'react';
import MyData from '../../../component/MyData';
import API from '../../../API/APIConstant';
import axios from 'axios';
import { TextBox } from "../../../componentBase/TextBox";
import { FontSize, FontWeight } from '../../../styleApp/font';
import { SelectDateModal } from "../../../componentBase/SelectDateModal/";
import { Colors } from '../../../styleApp/color';
import { StudyPlanJson, TimeTableJson } from '../../../stringJSON';
import { styles } from './TimeTable.style';
import APIBase from '../../../base/APIBase';
import { FullScreenLoadingIndicator } from '../../../componentBase/indicator/FullScreenLoadingIndicator';
import { DetailLessonModal } from '../../TeacherNew/WorkTimeTable/DetailLessonModal';
import { useSelector } from 'react-redux';

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

    for (let hour = 6; hour < 24; hour++) {
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
export const TimeTable = (props) => {

    const language = useSelector(state => state.LanguageStackReducer.language)
    const { TeachingScheduleScreen } = language
    const DOW = [TeachingScheduleScreen.Column1, TeachingScheduleScreen.Column2, TeachingScheduleScreen.Column3, TeachingScheduleScreen.Column4, TeachingScheduleScreen.Column5, TeachingScheduleScreen.Column6, TeachingScheduleScreen.Column7]

    const goBack = props.navigation.getParam('goBack')
    //Reset modal visble flag
    const [isResetModalVisible, setResetModalVisible] = useState(false)
    //Add data modal visble flag
    const [isAddLessonModalVisible, setLessonModalVisible] = useState(false)
    //Calendar modal visble flag
    const [isCalendarVisible, setCalendarVisible] = useState(false)
    //selected time
    const [selectedTime, setSelectedTime] = useState('')
    ///selected day
    const [selectedDay, setSelectedDay] = useState('')
    //Loading flag
    const [isLoading, setLoading] = useState(false)
    //Valid to data
    const [rangeDate, setRangeDate] = useState()
    //current lesson list
    const [lessonList, setLessonList] = useState([])
    //selected lesson
    const [selectedLesson, setSelectedLesson] = useState()
    //show DetailLessonModal
    const [isDetailLessonModalVisible, setDetailLessonModalVisible] = useState(false)

    useEffect(() => {
        getData()
    }, [])

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
        console.log("====filterByDow",lessonList)
        return lessonList.filter(a => moment().isoWeekday(dow + 1).format('dddd') === a.day_name)
    }

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
        setSelectedDay(day)
        setSelectedTime(item.start_time)
        // setLessonModalVisible(true)
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
        setLoading(true)
        try {
            const res = await APIBase.postDataJson('get', url)
            let data = res.data;
            console.log("=====dataday", data)
            if (data.hasOwnProperty('data') && data.data) {
                setLessonList(data.data)
                setRangeDate(data.valid_to)
            } else {
                setLessonList([])
            }

        } catch (error) {
            Alert.alert('', error.response.data);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <AppHeader title={StudyPlanJson.ScheduleButton} leftIconOnPress={() => {
                props.navigation.pop()
                goBack && goBack()
            }}
                rightImage={lessonList.length > 0 ? RefreshIcon : null}
                rightIconOnPress={() => setResetModalVisible(true)}
            />
            
            <View style={[lessonList.length > 0 ? styles.containerWithButton : styles.containerWithoutButton]}>
                <View style={styles.viewWeekend}>
                    <View style={[styles.headerBox, { width: SmartScreenBase.smBaseWidth * 130 }]} />
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
                                    <View style={[styles.hourBox, { width: SmartScreenBase.smBaseWidth * 130 }]}>
                                        <TextBox style={styles.textHour}>{h}</TextBox>
                                    </View>
                                )
                            })}
                        </View>
                        {!isLoading ? DOW.map((a, idx) => {
                            let lesson = filterByDow(idx)
                            return (
                                <View>
                                    {dataHour.map((h, index, hours) => {
                                        if (index > 0) {
                                            return (
                                                <TouchableOpacity activeOpacity={0.6} onPress={() => onPress(hours[index - 1], idx)} style={[styles.itemBox, { width: ItemWidth }]}>
                                                    <TextBox style={styles.textHeader}>{h}</TextBox>
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
                                            <TouchableOpacity onPress={() => onSelectLesson(l, idx)} style={[styles.lessionItem, { top: calculateHeight(l.start_time), height: calculateHeight(l.start_time, l.end_time), backgroundColor: moment().isoWeekday() === idx + 1 ? Colors._01A79E : Colors.LightGreen, }]}>
                                                <TextBox numberOfLines={3} style={[styles.lessonText, { textAlign: 'center' }]}>{l.class_name}</TextBox>
                                                <TextBox style={styles.lessonText}>{l.start_time}</TextBox>
                                                <TextBox style={styles.lessonText}>{l.end_time}</TextBox>
                                            </TouchableOpacity>
                                        )
                                    })}
                                </View>
                            )
                        }) : <FullScreenLoadingIndicator visible={isLoading}/>}
                    </View>

                </ScrollView>
                {lessonList.length > 0 &&
                    <View style={styles.footer}>
                        <TextBox style={styles.applyText}>{TimeTableJson.ApplyFrom}</TextBox>
                        {!!rangeDate && <TouchableOpacity onPress={() => setCalendarVisible(true)} style={styles.dateBox}>
                            <TextBox style={styles.dateText}>{moment(rangeDate).format('DD/MM/YYYY')}</TextBox>
                            <Image source={{ uri: "imageback" }} style={styles.dateIcon} resizeMode='contain' />
                        </TouchableOpacity>}
                    </View>
                }
                {/* {isLoading && <View style={styles.loadingView}>
                    <ActivityIndicator color={Colors.BaseGreen} />
                </View>} */}
            </View>
            <ConfirmResetModal isVisible={isResetModalVisible} requestClose={() => setResetModalVisible(false)} callBack={getData} />
            <SelectDateModal minimunDate={new Date()} rangeDate={moment(rangeDate).toDate()} isVisible={isCalendarVisible} requestClose={(date) => {
                setCalendarVisible(false)
                if (!!date) {
                    setRangeDate(date)
                }
            }}
                onSave={onSaveDate} />
            <AddLessionModal
                isVisible={isAddLessonModalVisible}
                selectedTime={selectedTime}
                requestClose={() => setLessonModalVisible(false)}
                selectedLesson={selectedLesson}
                selectedDay={selectedDay}
                callBack={getData} />
            <DetailLessonModal
                language={language}
                isVisible={isDetailLessonModalVisible}
                requestClose={() => setDetailLessonModalVisible(false)}
                selectedLesson={selectedLesson}
                callBack={getData}
                onEditPress={onEditLesson} />
        </View >
    )
}

