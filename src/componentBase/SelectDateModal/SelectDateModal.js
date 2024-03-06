import React, { useEffect } from 'react'
import Modal from "react-native-modal";
import { View, TouchableOpacity, Text, Image, Alert, StyleSheet } from "react-native";
import { TextBox } from "../TextBox";
import SmartScreenBase from '../../base/SmartScreenBase';
import { FontWeight } from '../../styleApp/font';
import { useState } from 'react';
import { LocaleConfig, Calendar } from 'react-native-calendars';
import moment from 'moment'
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../styleApp/color';
import { TimeTableJson } from '../../stringJSON';
import FontBase from '../../base/FontBase';
import { DatePicker } from '../TimePicker/DatePicker';

LocaleConfig.locales['vn'] = {
    monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
    monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
    dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
    dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
    today: 'Aujourd\'hui'
};


/**
 * @summary The SelectDateModal component
 *
 * @param {object} props
 * @property {date} props.rangeDate: chosen date
 * @property {function} props.requestClose: on cancel function
 * @property {function} props.onSave:  on save function
 * @property {any} others:  others props of Modal
 *
 * @returns {Component}
 */
export const SelectDateModal = (props) => {
    LocaleConfig.defaultLocale = 'vn';
    const [isSelectCalendar, setSelectCalendar] = useState(true)
    const [selectedDate, setSelectedDate] = useState(props.rangeDate || new Date())

    useEffect(() => {
        if (!!props.isVisible) {
            setSelectCalendar(true)
            setSelectedDate(props.rangeDate || new Date())
        }
    }, [props.isVisible])

    return (
        <Modal {...props} onBackdropPress={() => {
            props.requestClose(selectedDate)
            props.onSave(selectedDate)
        }}>
            <View style={styles.modalBox}>
                {isSelectCalendar ? <>
                    <View style={styles.headerBox}>
                        <LinearGradient colors={[Colors.LightGreen, Colors.BaseGreen]}
                            start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={styles.headerBackground}>

                        </LinearGradient>
                    </View>
                    <Calendar
                        current={moment(selectedDate).format('YYYY-MM-DD')}
                        minDate={props.minimunDate ? props.minimunDate : null}
                        maxDate={props.maximunDate ? props.maximunDate : null}
                        onDayPress={(day) => {
                            setSelectedDate(moment(day.timestamp).toDate())
                            // props.requestClose(moment(day.timestamp).toDate())
                            props.onSave(moment(day.timestamp).toDate())
                        }}
                        firstDay={1}
                        markedDates={{
                            [moment(selectedDate).format('YYYY-MM-DD')]: {
                                selected: true,
                                selectedColor: moment(selectedDate).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD') ? Colors.LightGreen : Colors.TransparentWhite,
                                selectedTextColor: moment(selectedDate).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD') ? Colors.White : Colors.Black,
                            },
                        }}
                        theme={{
                            backgroundColor: Colors.TransparentWhite,
                            calendarBackground: Colors.TransparentWhite,
                            textDayFontFamily: FontBase.MyriadPro_Regular,
                            textDayHeaderFontFamily: FontBase.MyriadPro_Regular,
                            textSectionTitleColor: Colors.Black,
                            textDayStyle: styles.textDayStyle,
                            // selectedDayBackgroundColor: '#00adf5',
                            // selectedDayTextColor: Colors.BaseGreen,
                            "stylesheet.day.basic": {
                                today: styles.day,
                                todayText: styles.todayText,
                                selected: styles.selectedDay,
                                selectedText: styles.selectedText,
                            }

                        }}
                        renderArrow={(direction) => {
                            if (direction === 'left') {
                                return (
                                    <Image source={{ uri: "imageback" }} style={styles.arrowIcon} resizeMode='contain' />
                                )
                            } else {
                                return (
                                    <Image source={{ uri: "imageback" }} style={[styles.arrowIcon, styles.reverseArrowIcon]} resizeMode='contain' />
                                )
                            }
                        }}
                        renderHeader={(date) => {
                            return (
                                <TouchableOpacity onPress={() => setSelectCalendar(!isSelectCalendar)}>
                                    <TextBox style={styles.headerText}>{TimeTableJson.Month} {moment(date.toString()).format('M/YYYY')}</TextBox>
                                </TouchableOpacity>
                            )
                        }}
                    />
                </> : <>
                    <TouchableOpacity onPress={() => setSelectCalendar(!isSelectCalendar)} style={styles.headerBtn}>
                        <TextBox style={styles.headerDateText}>{TimeTableJson.Month} {moment(selectedDate.toString()).format('M')} {TimeTableJson.Year} {moment(selectedDate.toString()).format('YYYY')}</TextBox>
                    </TouchableOpacity>
                    {console.log("=====props.minimunDate",props.minimunDate)}
                    {console.log("=====selectedDate",selectedDate)}
                    <View style={styles.wheelDateBox}>
                        <DatePicker
                            minDate={props.minimunDate ? props.minimunDate : null}
                            date={selectedDate}
                            onDateChange={setSelectedDate}
                            locale={'vi'}
                            mode="date"
                            androidVariant="iosClone"
                        // textColor={Colors.BaseGreen}
                        />
                    </View>
                </>}
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalBox: {
        backgroundColor: Colors.White,
        borderRadius: SmartScreenBase.smBaseWidth * 25,
        paddingBottom: SmartScreenBase.smPercenHeight * 1,
    },
    headerBox: { position: 'absolute', top: 0, left: 0, right: 0, },
    headerBackground: { height: 50, borderTopRightRadius: SmartScreenBase.smBaseWidth * 25, borderTopLeftRadius: SmartScreenBase.smBaseWidth * 25 },
    textDayStyle: {
        color: Colors.Black,
    },
    day: {
        backgroundColor: Colors.LightGreen,
        borderRadius: SmartScreenBase.smBaseWidth * 30,
    },
    todayText: {
        color: Colors.White,
    },
    selectedDay: {
        // backgroundColor: Colors.TransparentWhite,
        borderRadius: SmartScreenBase.smBaseWidth * 30,
        borderWidth: 1,
        borderColor: Colors._00A79D,
    },
    selectedText: {
        color: Colors.Black
    },
    arrowIcon: {
        width: SmartScreenBase.smBaseWidth * 60, height: SmartScreenBase.smBaseWidth * 60,
        tintColor: Colors.White,
    },
    reverseArrowIcon: {
        transform: [{ rotate: '180deg' }]
    },
    headerText: { textDecorationLine: 'underline', color: Colors.White, ...FontWeight.Bold },
    headerBtn: { alignItems: 'center', marginTop: SmartScreenBase.smBaseHeight * 20 },
    headerDateText: { textDecorationLine: 'underline', color: Colors.BaseGreen, ...FontWeight.Bold },
    wheelDateBox: { paddingVertical: SmartScreenBase.smBaseHeight * 10, alignItems: 'center' }
})
