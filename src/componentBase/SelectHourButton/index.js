import React, { useEffect, useRef, useState } from 'react';
import { Platform, StyleSheet, TouchableOpacity, View, } from "react-native";
import Modal from 'react-native-modal'
import { Colors } from '../../styleApp/color';
import { DatePicker as WheelDatePicker } from '@davidgovea/react-native-wheel-datepicker';
import moment from 'moment'
import Icon from 'react-native-vector-icons/FontAwesome'
import DatePicker from 'react-native-date-picker'
import { TimePicker } from '../TimePicker/TimePicker';

let timeTemp = ''
/**
 * @summary The SelectHourButton component 
 * 
 * @param {object} props 
 * @property {date} props.time: chosen time
 * @property {style} props.btnStyle: style of the Btn
 * @property {function} props.onChangeHour:  on change hour
 * @property {any} others:  others props of Modal
 * 
 * @returns {Component}
 */
export const SelectHourButton = (props) => {
    const { children, btnStyle, onChangeHour } = props
    const [isVisible, setVisible] = useState(false)
    const [time, setTime] = useState(moment(props.time, 'H:mm').toDate())

    useEffect(() => {
        if (isVisible) {
            timeTemp = props.time
        }
    }, [isVisible])

    useEffect(() => {
        !!props.time && setTime(moment(props.time, 'H:mm').toDate())
    }, [props.time])

    const onChange = (date) => {
        timeTemp = date
    }

    return (
        <>
            <TouchableOpacity onPress={() => {
                setVisible(true)
            }} activeOpacity={0.9} style={[styles.button, btnStyle]}>
                {children}
            </TouchableOpacity>
            <Modal isVisible={isVisible} onBackdropPress={() => {
                setVisible(false)
                setTime(moment(timeTemp, 'HH:mm').toDate())
                onChangeHour(moment(timeTemp, 'HH:mm').format('H:mm'))
            }}>
                <View style={styles.selectHourBox}>
                    {isVisible && <TimePicker hour={moment(time).format('HH')} minute={moment(time).format('mm')} onChange={onChange} />}
                </View>
            </Modal>

        </>
    )
}

const styles = StyleSheet.create({
    button: {

    },
    datePickerStyle: {
        backgroundColor: Colors.White
    },
    modalBox: {
        backgroundColor: Colors.White
    },
    selectHourBox: {
        backgroundColor: Colors.White
    }
})