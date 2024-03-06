

import React, { useReducer, forwardRef, useImperativeHandle } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { useMemo } from 'react';
import { Image, StyleSheet, TouchableOpacity, View, Text, Dimensions, FlatList, Platform, ActivityIndicator } from 'react-native';
import moment from 'moment'
import { TextBox } from '../TextBox';
import { Colors } from "../../styleApp/color";
import { DateItem } from './DateItem';
import { DateHelper } from './DateHelper';
import { FontSize, FontWeight } from '../../styleApp/font';
import { useEffect } from 'react';
import SmartScreenBase from '../../base/SmartScreenBase';
import { useSelector } from 'react-redux';
import API from '../../API/APIConstant';
import APIBase from '../../base/APIBase';
import { FullScreenLoadingIndicator } from '../indicator/FullScreenLoadingIndicator';
import FontBase from '../../base/FontBase';
import LogBase from '../../base/LogBase';

/**
 * @summary The calendar component
 * 
 * @param {object} props
 * @param {object} disableStatus: disable status in day
 * @param {object} urlApi: API url checking status
 * @param {object} isReloadData: reload Data flag
 * 
 * @returns {Component}
 */
export const PickDateBox = forwardRef((props, ref ) => {
    let { urlApi, isReloadData } = props
    let currentDay = useRef(new Date())
    let [currentMonth, setMonth] = useState(currentDay.current.getMonth())
    let [currentMonthRef, setMonthRef] = useState(currentDay.current.getMonth())
    let chosenMonth = useRef(currentDay.current.getMonth());
    let [isOpen, setOpen] = useState(false)
    let [isLoadding, setLoading] = useState(false)
    let [currentYear, setYear] = useState(currentDay.current.getFullYear())
    let [currentDaysInMonth, setDayInMonth] = useState(DateHelper.getDates(currentMonth + 1, currentYear))
    let [selectedDate, setDate] = useState({ date: moment().format('l'), index: 0 })
    const dataLogin = useSelector(state => state.AuthStackReducer.dataLogin);
    const language = useSelector(state => state.LanguageStackReducer.language);
    const DAY_IN_WEEK = [
        language.TeachingScheduleScreen?.Column1 || 'T2',
        language.TeachingScheduleScreen?.Column2 || 'T3',
        language.TeachingScheduleScreen?.Column3 || 'T4',
        language.TeachingScheduleScreen?.Column4 || 'T5',
        language.TeachingScheduleScreen?.Column5 || 'T6',
        language.TeachingScheduleScreen?.Column6 || 'T7',
        language.TeachingScheduleScreen?.Column7 || 'CN'
    ]

    let week = useMemo(() => {
        let now = new moment().format('l')
        let currIndex = -1
        if (chosenMonth.current === moment(selectedDate.date, 'l').toDate().getMonth()) {
            currIndex = currentDaysInMonth.findIndex((i) => i.date === selectedDate.date);
        } else {
            currIndex = currentDaysInMonth.findIndex((i) => i.date === now);
        }
        return Math.floor(currIndex / 7)
    }, [currentDaysInMonth, selectedDate.date, currentMonthRef])

    useEffect(() => {
        let dateList = DateHelper.getDates(currentMonth + 1, currentYear)
        getStudyPlan(dateList);
    }, [currentMonth, currentYear, isReloadData])

    useEffect(() => {
        props.onSelect(moment(selectedDate.date, 'l').format('YYYY-MM-DD'))
    }, [selectedDate])

    const onRefresh = () => {
        LogBase.log("go to")
        let dateList = DateHelper.getDates(currentMonth + 1, currentYear)
        getStudyPlan(dateList);
    }

    //todo: truyền vào ref hàm onRefresh
    useImperativeHandle(ref, () => ({
        onRefresh,
      }));

    /**
     * Get study data
     * @param {array} dateList list data
     * @returns null
     */
    const getStudyPlan = async (dateList) => {
        if (dateList.length < 1 || isLoadding) return;
        if (props.disableStatus) {
            setDayInMonth(dateList.map(item => ({ ...item, completeStatus: -1 })))
            return;
        }
        setLoading(true)
        // let start_time = moment(dateList[0].date, 'M/D/YYYY').format('YYYY-MM-DD') + " 00:00:00"
        // let end_time = moment(dateList[dateList.length - 1].date, 'M/D/YYYY').format('YYYY-MM-DD') + " 00:00:00"
        const url = !!urlApi
            ? (urlApi + `&month=${currentMonth + 1}&year=${currentYear}`)
            : (API.baseurl + API.getPlanByMonth + `?month=${currentMonth + 1}&year=${currentYear}`)
            LogBase.log("=====plan1", url)
        try {
            const res = await APIBase.postDataJson('get', url);
            chosenMonth.current = currentMonth
            setMonthRef(currentMonth)
            // console.log("APIBase----res", res);
            let dataResponse = res.data.data
            if (!!urlApi) {
                if (!res.data || !res.data.data) {
                    dataResponse = []
                }
                let temp = dateList.map((item) => {
                    const dataIndex = dataResponse.findIndex((i) => moment(i.date, "YYYY-MM-DD").format("M/D/YYYY") === item.date)
                    // console.log("----dataResponse", dataIndex);
                    
                    let completeStatus = -1
                    if (dataIndex !== -1) {
                        completeStatus = dataResponse[dataIndex].number_log > 0 ? 0 : -1
                    }
                    return {
                        ...item,
                        completeStatus
                    }
                })
                setLoading(false)
                setDayInMonth(temp)
            } else {
                if (!res.data || !res.data.data) {
                    dataResponse = []
                }
                let temp = dateList.map((item) => {
                    const filterData = dataResponse.filter((i) => moment(i.date, "YYYY-MM-DD").format("M/D/YYYY") === item.date)[0]
                    let completeStatus = -1
                    setLoading(false)
                    if (!filterData) return {
                        ...item,
                        completeStatus

                    }
                    switch (filterData.status) {
                        case "in_complete":
                            completeStatus = 0;
                            break;
                        case "complete":
                            completeStatus = 1;
                            break;
                        default:
                            completeStatus = -1;
                    }
                    return {
                        ...item,
                        completeStatus
                    }
                })
                setDayInMonth(temp)
            }

        } catch (error) {
            setLoading(false)
            console.log('err1', error);
            setDayInMonth([])
        }
    }

    /**
     * @summary Function handle the change when user click on the arrows
     * @param {boolean} isNext 
     */
    const handleChangeMonth = (isNext) => () => {
        if (isLoadding) return;
        if (currentMonth === 11 && isNext) {
            setYear(currentYear + 1)
            setMonth(0)
        } else if (currentMonth === 0 && !isNext) {
            setYear(currentYear - 1)
            setMonth(11)
        } else {
            setMonth(isNext ? currentMonth + 1 : currentMonth - 1)
        }
    }

    /**
     * @summary Function handle the change when user click on a day
     * @param {object} item 
     */
    const selectDate = (item) => {
        if (item.index < 0) {
            handleChangeMonth(false)()
            setDate(item)
        } else if (item.index > 0) {
            handleChangeMonth(true)()
            setDate(item)
        } else {
            setDate(item)
        }
    }

    return (
        <>
            <View style={{ paddingBottom: 25, }}>
                <View
                    style={[styles.itemPlan]}>
                    <View style={styles.calendar}>
                        <View style={styles.calendarHeader}>
                            <TouchableOpacity onPress={handleChangeMonth(false)}>
                                <Image source={{ uri: "arrow_down_gray" }} style={[styles.arrow, {
                                    transform: [{ rotate: '90deg' }]
                                }]} resizeMode='contain' />
                            </TouchableOpacity>
                            <TextBox
                                style={styles.currentMonth}
                                text={(language?.PickDateBox?.Month || 'Tháng') + " " + (currentMonth + 1) + '/' + currentYear}
                            />
                            <TouchableOpacity onPress={handleChangeMonth(true)}>
                                <Image source={{ uri: "arrow_down_gray" }} style={{
                                    ...styles.arrow,
                                    transform: [{ rotate: '270deg' }]
                                }} resizeMode='contain' />
                            </TouchableOpacity>
                        </View>
                        <View style={{ paddingTop: 15 }}>
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((_, i) => {
                                if (i === 0) return (
                                    <View key={i + "row"} style={{ flexDirection: "row", justifyContent: "space-evenly", width: '100%' }}>
                                        {DAY_IN_WEEK.map((item, index) => (
                                            <TextBox
                                                style={styles.textBox}
                                                key={index + "title"}
                                                text={item}
                                            />
                                        ))}
                                    </View>
                                )

                                let dateList = currentDaysInMonth.filter((_, index) => index >= (i - 2) * 7 && index < (i - 1) * 7)
                                let firstWeek = i == 1 ? currentDaysInMonth.filter((_, index) => index >= 0 && index < 7) : []
                                let shortDateList = currentDaysInMonth.filter((_, index) => index >= (i - 2) * 7 && index < (i - 1) * 7 && Math.floor(index / 7) === week)
                                let shownData = isOpen ? dateList : (chosenMonth.current === moment(selectedDate.date, 'l').toDate().getMonth() || week !== -1 ? shortDateList : firstWeek)
                                if (shownData.length === 0 && i !== 1) shownData = firstWeek
                                let isNotChosenMonth = shownData.filter((dayFilter, index) => moment(dayFilter.date, 'l').toDate().getMonth() === chosenMonth.current) < 1
                                LogBase.log("=====shownData",shownData)
                                if (isNotChosenMonth && isOpen && i > 5) return;
                                else {
                                    return (
                                        <View key={i + "row"} style={{ flexDirection: "row", justifyContent: "space-evenly", width: '100%', marginBottom: isOpen ? 8 : 0}}>
                                            {shownData.map((item, index) => (
                                                <DateItem
                                                    isReportStatus={!!urlApi}
                                                    selectedDate={selectedDate}
                                                    setDate={selectDate}
                                                    key={index + "value"} item={item}
                                                />
                                            ))}
                                        </View>
                                    )
                                }
                            })}
                            {!!isLoadding && <View
                                style={{
                                    position: 'absolute',
                                    height: '100%',
                                    width: '100%',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <ActivityIndicator size='small' color='black' />
                            </View>}
                        </View>
                    </View>

                </View>
                <TouchableOpacity activeOpacity={1} style={[styles.btnCloseShadow]} onPress={() => {
                    setOpen(!isOpen)
                }}>
                    <Image source={{ uri: "arrow_down_gray" }} style={{
                        ...styles.image,
                        marginTop: !isOpen ? 10 : 0,
                        transform: [{ rotate: !isOpen ? '0deg' : '180deg' }]
                    }} resizeMode='contain' />
                </TouchableOpacity>
            </View>
            {/* <FullScreenLoadingIndicator
                visible={isLoadding}
            /> */}
        </>
    )
})


const styles = StyleSheet.create({
    itemPlan: {
        shadowColor: Colors.Black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 1,
        backgroundColor: "white",
        borderBottomLeftRadius: SmartScreenBase.smBaseWidth * 40,
        borderBottomRightRadius: SmartScreenBase.smBaseWidth * 40,
        // overflow: 'hidden'
    },
    btnCloseShadow: {
        shadowColor: Colors.Black,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        backgroundColor: "white",
        borderRadius: SmartScreenBase.smBaseWidth * 500,
        shadowOpacity: 0.18,
        shadowRadius: 0,
        elevation: 1,
        // zIndex: 1,
        alignSelf: "center",
        // width: 50, height: 50,
        width: SmartScreenBase.smBaseWidth * 125, height: SmartScreenBase.smBaseWidth * 125,
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? 5 : 4,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10
    },
    arrow: {
        width: SmartScreenBase.smBaseWidth * 50,
        height: SmartScreenBase.smBaseWidth * 50,
        tintColor: Colors.BaseGreen,
    },
    currentMonth: {
        textAlign: 'center',
        alignSelf: "center",
        fontSize: FontSize.size50Font,
        color: Colors.BaseGreen,
        marginHorizontal: SmartScreenBase.smBaseWidth * 30,
        ...FontWeight.Bold
    },
    calendar: {
        alignItems: 'center',
        width: "100%",
        marginBottom: SmartScreenBase.smBaseWidth * 40,
        overflow: 'hidden',
        padding: SmartScreenBase.smBaseWidth * 40,
    },
    calendarHeader: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: 'center',
        width: '100%',
    },
    image: {
        width: SmartScreenBase.smBaseWidth * 50,
        height: SmartScreenBase.smBaseWidth * 50,
        tintColor: Colors.BaseGreen,
    },
    textBox: {
        width: SmartScreenBase.smBaseWidth * 80,
        height: SmartScreenBase.smBaseWidth * 80,
        textAlign: 'center',
        fontFamily: FontBase.MyriadPro_Bold
    }
})