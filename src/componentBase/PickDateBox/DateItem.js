

import React, { useState } from 'react';
import { Image, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import moment from 'moment'
import { TextBox } from '../TextBox';
import { Colors } from '../../styleApp/color';
import LinearGradient from 'react-native-linear-gradient';
import SmartScreenBase from '../../base/SmartScreenBase';
import LogBase from '../../base/LogBase';


/**
 * @summary The date component in the calendar
 * 
 * @param {object} props
 * @property {object} item: The date information 
 * @property {function} setDate: Function that save date when chosing a date
 * @property {object} selectedDate: The current chosen date information 
 * 
 * @returns {Component}
 */
export const DateItem = (props) => {
    let { item, setDate, selectedDate, isReportStatus } = props
    const today = moment().format("MM-DD-YYYY")
    const curDate = moment(item.date,'MM/DD/YYYY').format("MM-DD-YYYY")
    let selected = moment(selectedDate.date,'MM/DD/YYYY').format("MM-DD-YYYY")
    const style = today == curDate ? styles.today : {}
    LogBase.log("=====today",today)
    LogBase.log("=====curDate",curDate + "|" + item.date)
    LogBase.log("=====selected",selected + "|" + selectedDate.date)
    if (today == curDate) return (
        <TouchableOpacity onPress={() => setDate(item)}>
            <View
                // colors={[Colors.LightGreen, Colors.LightGreen]}
                // start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }}
                style={[styles.normal, styles.chosen, selected == curDate ? styles.today : {}]}
            >
                <TextBox
                    style={{ color: Colors.White, ...styles.text }}
                    text={Number(moment(item.date,'MM/DD/YYYY').format("DD"))}
                />
            </View>
            {item.completeStatus !== -1 && <View style={styles.status}>

                {isReportStatus ?
                    <Image source={{ uri: 'inactive_icon' }} style={[styles.image, styles.tintColor, styles.selected]} resizeMode='contain' />
                    : <Image source={{ uri: item.completeStatus === 0 ? 'inactive_icon' : 'tick_icon' }} style={styles.image} resizeMode='contain' />}

            </View>}
        </TouchableOpacity>
    )
    else if (selected == curDate) {
        return (
            <TouchableOpacity style={[styles.normal, styles.today]} onPress={() => setDate(item)}>
                <TextBox
                    style={{ color: item.index % 2 === 0 ? Colors.Black : Colors.Gray, ...styles.text }}
                    text={Number(moment(item.date,'MM/DD/YYYY').format("DD"))}
                />
                {item.completeStatus !== -1 && <View style={styles.status}>
                    {isReportStatus ?
                        <Image source={{ uri: 'inactive_icon' }} style={[styles.image, styles.tintColor, styles.selected]} resizeMode='contain' />
                        : <Image source={{ uri: item.completeStatus === 0 ? 'inactive_icon' : 'tick_icon' }} style={styles.image} resizeMode='contain' />}
                </View>}
            </TouchableOpacity>
        )
    }
    return (
        <TouchableOpacity style={[styles.normal]} onPress={() => setDate(item)}>
            <TextBox
                style={{ color: 
                    // item.index % 2 == 0 ? 
                    Colors.Black
                    //  : Colors.Gray, ...styles.text 
                    }}
                text={Number(moment(item.date,'MM/DD/YYYY').format("DD"))}
            />
            {item.completeStatus !== -1 && <View style={styles.status}>
                {isReportStatus ?
                    <Image source={{ uri: 'inactive_icon' }} style={[styles.image, styles.tintColor, { top: 0, right: 0 }]} resizeMode='contain' />
                    : <Image source={{ uri: item.completeStatus === 0 ? 'inactive_icon' : 'tick_icon' }} style={styles.image} resizeMode='contain' />}
            </View>}
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    normal: {
        width: SmartScreenBase.smBaseWidth * 80,
        height: SmartScreenBase.smBaseWidth * 80,
        alignItems: "center",
        justifyContent: 'center',
    },
    today: {
        borderRadius: SmartScreenBase.smBaseWidth * 30,
        borderWidth: 1,
        borderColor: Colors.BaseGreen,
    },
    chosen: {
        backgroundColor: Colors.LightGreen,
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: SmartScreenBase.smBaseWidth * 30, overflow: 'hidden',
    },
    text: {
    },
    status: {
        position: 'absolute',
        top: 0,
        right: 0,

    },
    image: {
        width: SmartScreenBase.smBaseWidth * 30, height: SmartScreenBase.smBaseWidth * 30,
    },
    tintColor: {
        tintColor: Colors.SuccessGreen,
    },
    selected: {
        width: SmartScreenBase.smBaseWidth * 30, height: SmartScreenBase.smBaseWidth * 30,
        borderColor: Colors.White
    },
    selectedView: {
        width: SmartScreenBase.smBaseWidth * 30, height: SmartScreenBase.smBaseWidth * 30,
        borderRadius: 6,
    },
})


