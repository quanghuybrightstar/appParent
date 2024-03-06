import moment from 'moment'
import * as React from 'react'
import { Platform, Text, TextProps, View, StyleSheet } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import SmartScreenBase from '../../base/SmartScreenBase'
import { Colors } from '../../styleApp/color'
import { FontSize, FontWeight } from '../../styleApp/font'
import { ParallelPicker } from './Lib'



/**
 * Get list 12 Month
 */
const MONTH = Array.from(Array(12).keys()).map((value, index) => ({
    name: `TH${value + 1}`,
    id: value + 1
}))

const START_YEAR = 1935;
const YEAR_STEP = 50;
console.log("=====getFullYear 2")
const currentYear = (new Date()).getFullYear();
const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step));

/**
 * Get list Year
 */
const YEAR = range(START_YEAR, currentYear + YEAR_STEP, 1).map((value, index) => ({
    name: value,
    id: value
}));



/**
 * Get number of days
 * @param {number} month
 * @param {number} year
 * @returns {Number}
 */
const days = function (month, year) {
    return new Date(year, month, 0).getDate();
};


const NumberHeight = SmartScreenBase.smPercenWidth * 10

const getDefaultValue = (list, date, type) => {
    const currentDay = new Date();
    let value = "";
    console.log("=====getFullYear 1", type)
    switch (type) {
        case 'month':
            value = !!date ? (date.getMonth() + 1) : (currentDay.current.getMonth() + 1)
            break;
        case 'year':
            value = !!date ? date.getFullYear() : currentDay.current.getFullYear()
            break;
        case 'day':
            value = !!date ? date.getDate() : currentDay.current.getDate()
            break;
        default:
            value = !!date ? date.getFullYear() : currentDay.current.getFullYear()
            break;
    }
    const index = list.findIndex((i, index) => Number(i.id) === Number(value));
    return index
}

/**
 * Get list 30 Days
 */
const calculateDays = (month, year) => {
    return Array.from(Array(days(month, year)).keys()).map((value, index) => ({
        name: (value + 1) > 9 ? `${value + 1}` : `0${value + 1}`,
        id: value + 1
    }))
}

/**
 * @summary DatePicker component using library which is cloned from internet.
 *
 * @param {object} props
 * @property {date} minDate: minimun date
 * @property {date} date: chosen date
 * @property {function} onDateChange
 *
 * @returns {Component}
 */
export const DatePicker = React.memo((props) => {
    const { minDate = null } = props
    const { onDateChange, date = new Date(), } = props
    const defaultYear = React.useRef(getDefaultValue(YEAR, date, 'year'))
    const defaultMonth = React.useRef(getDefaultValue(MONTH, date, 'month'))
    const [DAY, setDay] = React.useState(calculateDays(MONTH[defaultMonth.current].id, YEAR[defaultYear.current].id))
    const defaultDay = React.useRef(getDefaultValue(DAY, date, 'day'))

    const oldDay = React.useRef(defaultDay.current)
    const oldMonth = React.useRef(defaultMonth.current)
    const oldYear = React.useRef(defaultYear.current)

    return (
        <View style={styles.container}>
            <View style={{ width: '100%' }}>
                <View style={styles.topIndicator} />
                <View style={styles.botIndicator} />
                {React.useMemo(() => {
                    return (
                        <ParallelPicker
                            defaultValueIndexes={[defaultDay.current, defaultMonth.current, defaultYear.current]}
                            dataSource={[DAY, MONTH, YEAR]}
                            textProps={{
                                style: styles.text
                            }}
                            pickerStyle={{
                                visibleNum: 3,
                                itemHeight: NumberHeight,
                                activeFontSize: FontSize.size50Font,
                                normalFontSize: FontSize.size35Font,
                                activeBgColor: "transparent",
                                normalBgColor: "transparent",
                                activeFontColor: Colors._00cbad,
                                normalFontColor: Colors.Gray,
                                activeBgOpacity: 1,
                                normalBgOpacity: 0.4
                            }}
                            onceChange={(dataArr, temp) => {
                                if (dataArr.length < 3) return;
                                const dayValue = dataArr[0].name;
                                const monthValue = dataArr[1].id;
                                const yearValue = dataArr[2].id;
                                const date = `${dayValue}-${monthValue > 9 ? monthValue : ("0" + monthValue)}-${yearValue}`
                                const convertedDate = moment.utc(date, 'DD-MM-YYYY').toDate()
                                if (!!minDate && convertedDate.getTime() < minDate.getTime()) {
                                    return;
                                }
                                let dayIndex = DAY.findIndex((item, index) => item.id === dataArr[0].id)
                                oldDay.current = dayIndex
                                let monthIndex = MONTH.findIndex((item, index) => item.id === dataArr[1].id)
                                let yearIndex = YEAR.findIndex((item, index) => item.id === dataArr[2].id)
                                if (oldMonth.current !== monthIndex || oldYear.current !== yearIndex) {
                                    let days = calculateDays(monthValue, yearValue)
                                    if (days.length !== DAY.length) {
                                        setDay(days)
                                        oldDay.current = days.length - 1
                                    }
                                }
                                oldMonth.current = monthIndex
                                oldYear.current = yearIndex
                                console.log("------convertedDate", convertedDate);
                                !!onDateChange && onDateChange(convertedDate)
                            }}
                            customHead={<View />}
                        />
                    )
                }, [DAY])}
            </View>
        </View>
    )
})


const styles = StyleSheet.create({
    container: {
        marginVertical: SmartScreenBase.smPercenHeight * 2,
        paddingHorizontal: SmartScreenBase.smPercenWidth * 12,
        width: '100%',
        alignItems: "center",
    },
    topIndicator: {
        position: 'absolute',
        borderTopColor: Colors.Gray,
        borderTopWidth: 1,
        width: '100%',
        top: NumberHeight
    },
    botIndicator: {
        position: 'absolute',
        borderTopColor: Colors.Gray,
        borderTopWidth: 1,
        width: '100%',
        top: NumberHeight * 2
    },
    carouselContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center',
        paddingHorizontal: SmartScreenBase.smPercenWidth * 12,
    },
    itemWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    text: {
        ...FontWeight.Bold,
    }
})
