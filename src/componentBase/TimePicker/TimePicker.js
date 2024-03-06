import moment from 'moment'
import * as React from 'react'
import { Platform, Text, TextProps, View, StyleSheet } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import SmartScreenBase from '../../base/SmartScreenBase'
import { Colors } from '../../styleApp/color'
import { FontSize, FontWeight } from '../../styleApp/font'
import { ParallelPicker } from './Lib'

const MINUTE = Array.from(Array(60).keys()).map((value, index) => ({
    name: value > 9 ? `${value}` : `0${value}`,
    id: index
}))
const HOUR = Array.from(Array(24).keys()).map((value, index) => ({
    name: value > 9 ? `${value}` : `0${value}`,
    id: index
}))

const NumberHeight = SmartScreenBase.smPercenWidth * 10

/**
 * @summary Time picker component using library which is cloned from internet.
 * 
 * @param {object} props 
 * @property {string} hour: chosen hour
 * @property {string} minute: chosen minute
 * 
 * @returns {Component}
 */
export const TimePicker = React.memo((props) => {
    const { onChange } = props
    const defaultHour = !!props.hour ? Number(props.hour) : 0
    const defaultMinute = !!props.minute ? Number(props.minute) : 0
    return (
        <View style={styles.container}>
            <View style={{ width: '100%' }}>
                <View style={styles.topIndicator} />
                <View style={styles.botIndicator} />
                <ParallelPicker
                    defaultValueIndexes={[defaultHour, defaultMinute]}
                    dataSource={[HOUR, MINUTE]}
                    textProps={{
                        style: styles.text
                    }}
                    pickerStyle={{
                        visibleNum: 3,
                        itemHeight: NumberHeight,
                        activeFontSize: FontSize.size75Font,
                        normalFontSize: FontSize.size35Font,
                        activeBgColor: "transparent",
                        normalBgColor: "transparent",
                        activeFontColor: Colors._00cbad,
                        normalFontColor: Colors.Gray,
                        activeBgOpacity: 1,
                        normalBgOpacity: 0.4
                    }}
                    onceChange={(dataArr) => {
                        if (dataArr.length < 2) return;
                        console.log("---dataArr", dataArr);
                        !!onChange && onChange(dataArr[0].name + ":" + dataArr[1].name)
                    }}
                    customHead={<View />}
                />
            </View>
        </View>
    )
})


const styles = StyleSheet.create({
    container: {
        marginVertical: SmartScreenBase.smPercenHeight * 5,
        paddingHorizontal: SmartScreenBase.smPercenWidth * 28,
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
        // fontSize: 25
    }
})