import React, { useRef, useEffect, useState, useMemo, } from 'react';
import { Image, Platform, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ModalDropdown from 'react-native-modal-dropdown';
import { useSelector } from 'react-redux';
import SmartScreenBase from '../../base/SmartScreenBase';
import { Colors } from '../../styleApp/color';
import { FontSize, FontWeight } from '../../styleApp/font';
import { TextBox } from '../TextBox';
import { PieChart } from 'react-native-svg-charts'
import stylesApp from '../../styleApp/stylesApp';

/**
 * @summary The PieChartComponent 
 * 
 * @param {object} props 
 * @property {Array} data: list of value
 * @property {string} statisticTitle: title of statistic
 * @property {number} chartSize: size of Chart
 * @property {ViewStyles} containerStyle: container
 * @property {TextStyles} statisticTextStyle: style of statistic text
 * @property {ViewStyles} statisticTypeStyle: style of statistic type
 * @property {TextStyles} averageTextStyle: style of average text
 * @property {TextStyles} averagePointStyle: style of average point
 * 
 * @returns {Component}
 */
export const PieChartComponent = (props) => {
    let {
        big,
        invertedStatistic,
        data,
        statisticTitle,
        statisticPoint,
        chartSize = SmartScreenBase.smPercenWidth * 32,
        statisticTextStyle = {},
        statisticTypeStyle = {},
        averageTextStyle = {},
        averagePointStyle = {},
        containerStyle = {}
    } = props

    const convertedData = useMemo(() => {
        let total = 0
        data.forEach((item) => { total = total + item.value })
        let percent = 100;
        let tempData = data.map((i, index) => ({
            ...i,
            percent: 0,
            index,
        }))
        console.log("-----");

        let filteredData = tempData.filter((i) => i.value !== 0)
        let checkPercentArr = filteredData.map((i, index) => {
            const p = Math.round(total > 0 ? (i.value / total * 100) : 0)
            const itemPercent = index === (filteredData.length - 1) ? percent : p
            percent = percent - p;
            return {
                ...i,
                percent: itemPercent
            }
        })
        let output = checkPercentArr.concat(tempData.filter((i) => i.value === 0))//

        return output.sort((a, b) => a.index - b.index)
    }, [data])
    /**
     * render each statistic item
     */
    const renderStatisticItem = React.useCallback((type, color, numOfStudent, percent) => {
        return (
            <View style={styles.statisticItem}>
                <View style={[styles.statisticType, { backgroundColor: color }, statisticTypeStyle]} />
                <TextBox
                    numberOfLines={2}
                    style={[styles.statisticText, statisticTextStyle]}>
                    {!invertedStatistic ?
                        `${type}: ${numOfStudent} (${percent}%)` :
                        `${numOfStudent} ${type} (${percent}%)`
                    }
                </TextBox>
            </View>
        )
    }, [])

    return (

        <View style={[styles.flexRow, containerStyle]}>
            <View style={{
                height: chartSize + chartSize * 0.05,
                width: chartSize + chartSize * 0.05,
                justifyContent: 'center',
            }}>
                <View style={[styles.chartContainer, {
                    height: chartSize*1.0,
                    width: chartSize*1.0,
                }]}>
                    <PieChart
                        animate
                        animationDuration={1000}
                        padAngle={0}
                        style={{
                            height: chartSize-SmartScreenBase.smPercenWidth*2,
                            width: chartSize-SmartScreenBase.smPercenWidth*2,
                            padding: SmartScreenBase.smPercenWidth
                        }}
                        data={convertedData}
                    />
                </View>
            </View>
            <View style={[styles.statisticDataContainer,{height: big ? SmartScreenBase.smPercenWidth*27 : SmartScreenBase.smPercenWidth*18}]}>
                {convertedData.map((item) => {
                    return renderStatisticItem(item.title, item.svg.fill, item.value, item.percent)
                })}
                <View style={styles.averageContainer} numberOfLines={1}>
                    <TextBox
                        style={[styles.averageText, averageTextStyle]}
                    >{statisticTitle + ": "}</TextBox>
                    <TextBox
                        style={[styles.averagePoint, averagePointStyle]}
                    >{statisticPoint}</TextBox>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    flexRow: { flexDirection: 'row' },
    chartContainer: {
        borderRadius: SmartScreenBase.smPercenWidth * 50,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: "center",
        // alignSelf: 'center',
        ...stylesApp.shadow
    },
    chart: {
        height: SmartScreenBase.smPercenWidth * 32,
        width: SmartScreenBase.smPercenWidth * 32
    },
    statisticContainer: {
        ...stylesApp.shadow,
        backgroundColor: 'white',
        borderRadius: SmartScreenBase.smPercenWidth * 3,
        alignItems: 'center',
        padding: SmartScreenBase.smPercenWidth * 3,
    },
    statisticDataContainer: { flex: 1, justifyContent: 'space-evenly', marginLeft: 10},
    statisticItem: { flexDirection: "row", alignItems: "center", flex: 1},
    statisticType: {
        width: SmartScreenBase.smPercenWidth * 5,
        height: SmartScreenBase.smPercenWidth * 3,
        marginRight: SmartScreenBase.smPercenWidth * 3,
    },
    statisticText: {
        fontSize: SmartScreenBase.smFontSize * 33,
        flex: 1,
        marginBottom: Platform.OS === 'ios' ? -3 : 0
    },
    averageContainer: {
        marginBottom: -SmartScreenBase.smPercenWidth * 2,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    averageText: {
        fontSize: SmartScreenBase.smFontSize * 40,
        lineHeight: SmartScreenBase.smPercenWidth * 6.5,
    },
    averagePoint: {
        fontSize: SmartScreenBase.smFontSize * 60,
        ...FontWeight.Bold,
        color: Colors.DarkGreen,
        lineHeight: SmartScreenBase.smPercenWidth * 7,
        marginLeft: SmartScreenBase.smBaseWidth * 20
    },
    titleChar1: {
        alignSelf: 'flex-start',
        ...FontWeight.SemiBold,
        fontSize: FontSize.size50Font,
        marginBottom: SmartScreenBase.smPercenHeight * 1,
        lineHeight: SmartScreenBase.smBaseHeight * 35
    }
})