import React, { useEffect } from 'react'
import { View, TouchableOpacity, Text, Image, Alert, Platform, StyleSheet } from "react-native";
import { TextBox } from "../TextBox";
import SmartScreenBase from '../../base/SmartScreenBase';
import { FontWeight } from '../../styleApp/font';
import { MyButton } from '../Button';
import { useState } from 'react';
import { LocaleConfig, Calendar } from 'react-native-calendars';
import moment from 'moment'
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../styleApp/color';
import { DatePicker } from '@davidgovea/react-native-wheel-datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CommonJson } from '../../stringJSON';
import { TimePicker } from '../TimePicker';
import FontBase from '../../base/FontBase';
import { ShortMainButton } from '../ShortMainButton'

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
 * @property {function} props.onCancel: on cancel function
 * @property {function} props.onSave:  on save function
 * 
 * @returns {Component}
 */
export const SelectDateModal = (props) => {
    LocaleConfig.defaultLocale = 'vn';
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [time, setTime] = useState(new Date())

    useEffect(() => {
        setSelectedDate(moment(props.rangeDate, "HH:mm, DD/MM/YYYY").toDate())
    }, [props.rangeDate])

    /**
     * save function
     */
    const save = () => {
        let date = time + ", " + moment(selectedDate).format('DD/MM/YYYY')
        props.onSave(date)
    }

    return (
        <View style={styles.container}>

            <View style={styles.viewWrapper}>
                <LinearGradient colors={[Colors.LightGreen, Colors.BaseGreen]}
                    start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={styles.gradientContainer}>

                </LinearGradient>
            </View>
            <Calendar
                current={moment(selectedDate).format('YYYY-MM-DD')}
                onDayPress={(day) => {
                    try {
                        setSelectedDate(moment(day.timestamp).toDate())
                    } catch (error) {
                    }
                }}
                markedDates={{
                    [moment(selectedDate).format('YYYY-MM-DD')]: {
                        selected: true,
                        selectedColor: moment(selectedDate).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD') ? Colors.LightGreen : 'transparent',
                        selectedTextColor: moment(selectedDate).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD') ? Colors.White : Colors.Black,
                    },
                }}
                firstDay={1}
                theme={{
                    backgroundColor: 'transparent',
                    calendarBackground: 'transparent',
                    textDayFontFamily: FontBase.MyriadPro_Regular,
                    textDayHeaderFontFamily: FontBase.MyriadPro_Regular,
                    textSectionTitleColor: Colors.Black,
                    textDayStyle: {
                        color: 'black',
                    },
                    // selectedDayBackgroundColor: 'red',
                    // selectedDayTextColor: Colors.BaseGreen,
                    "stylesheet.day.basic": {
                        today: {
                            backgroundColor: Colors.LightGreen,
                            borderRadius: 12,
                        },
                        todayText: {
                            color: Colors.White,
                        },
                        selected: {
                            // backgroundColor: 'transparent',
                            borderRadius: 12,
                            borderWidth: 1,
                            borderColor: Colors._00A79D,
                        },
                        selectedText: {
                            color: Colors.Black
                        },
                    }

                }}
                renderArrow={(direction) => {
                    if (direction === 'left') {
                        return (
                            <Image source={{ uri: "imageback" }} style={styles.arrowNext} resizeMode='contain' />
                        )
                    } else {
                        return (
                            <Image source={{ uri: "imageback" }} style={styles.arrowBack} resizeMode='contain' />
                        )
                    }
                }}
                renderHeader={(date) => {
                    return (
                        <TextBox style={styles.text}> {CommonJson.Month + " " + moment(date.toString()).format('M/YYYY')}</TextBox>
                    )
                }}
            />
            <TimePicker
                onChange={(date) => {
                    setTime(date)
                }}
                hour={moment(props.rangeDate, "HH:mm, DD/MM/YYYY").format('HH')}
                minute={moment(props.rangeDate, "HH:mm, DD/MM/YYYY").format('mm')}
            />
            <View style={styles.btnContainer}>
                <ShortMainButton
                    text={"Huỷ"}
                    style={styles.btnWidth}
                    widthType="mini"
                    onPress={props.onCancel}
                />
                <ShortMainButton
                    onPress={save}
                    type={1}
                    text={"Xong"}
                    widthType="mini"
                    style={styles.btnWidth}
                />
            </View>
        </View >
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.White, borderRadius: 10,
        paddingBottom: SmartScreenBase.smPercenHeight * 1,
    },
    btnWidth: {
        width: SmartScreenBase.smPercenWidth * 30
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: SmartScreenBase.smBaseHeight * 30
    },
    pickerContainer: { width: '60%', alignSelf: 'center' },
    arrowBack: {
        width: SmartScreenBase.smBaseWidth * 50, height: SmartScreenBase.smBaseWidth * 50,
        tintColor: Colors.White,
        transform: [{ rotate: '180deg' }]
    },
    arrowNext: {
        width: SmartScreenBase.smBaseWidth * 50, height: SmartScreenBase.smBaseWidth * 50,
        tintColor: Colors.White,
    },
    today: {
        backgroundColor: Colors.BaseGreen,
        borderRadius: SmartScreenBase.smBaseWidth * 24
    },
    todayText: {
        color: Colors.White
    },
    selected: {
        backgroundColor: 'transparent',
        borderRadius: SmartScreenBase.smBaseWidth * 24,
        borderWidth: 1,
        borderColor: Colors.BaseGreen
    },
    viewWrapper: { position: 'absolute', top: 0, left: 0, right: 0, },
    gradientContainer: { height: 50, borderTopRightRadius: SmartScreenBase.smBaseWidth * 25, borderTopLeftRadius: SmartScreenBase.smBaseWidth * 25 },
    text: { color: Colors.White, ...FontWeight.Bold }
})