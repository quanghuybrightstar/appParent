
import * as React from 'react'
import { Platform, StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { useSelector } from 'react-redux'
import SmartScreenBase from '../../../../base/SmartScreenBase'
import { TextBox } from '../../../../componentBase/TextBox'
import { Colors } from '../../../../styleApp/color'
import { FontSize, FontWeight } from '../../../../styleApp/font'
import stylesApp from '../../../../styleApp/stylesApp'
import API from '../../../../API/APIConstant'
import APIBase from '../../../../base/APIBase'
import { useEffect, useState } from 'react'
import moment from "moment";
import { FullScreenLoadingIndicator } from '../../../../componentBase/indicator/FullScreenLoadingIndicator'
import { PieChartComponent } from '../../../../componentBase/Chart'

/**
 * 
 * @param {object} props props from redux and navigation
 * @property {Date} lastDay 
 * @property {Date} firstDay
 * @returns 
 */
export const ChartReport = (props) => {
    const language = useSelector(state => state.LanguageStackReducer.language)
    let id = props.navigation.getParam('id')
    console.log("----id", id);
    //Number of Student
    const [numOfMem, setNumOfMem] = useState(0)
    //Total score
    const [totalScore, setTotalScore] = useState(0)
    // Average score of the class
    const [avgScore, setAvgScore] = useState(0)
    // Loading flag
    const [loading, setLoading] = useState(false)
    // First chart data
    const [fChart, setFChart] = useState([
        {
            key: '1',
            svg: { fill: Colors._00AEEF },
            value: 0,
            title: language.StudyReportTeacherScreen.Item1Chart1
        },
        {
            key: '2',
            svg: { fill: Colors._00CC7E },
            value: 0,
            title: language.StudyReportTeacherScreen.Item2Chart1
        },
        {
            key: '3',
            svg: { fill: Colors.Orange },
            value: 0,
            title: language.StudyReportTeacherScreen.Item3Chart1
        },
        {
            key: '4',
            svg: { fill: Colors._BE1E2D },
            value: 0,
            title: language.StudyReportTeacherScreen.Item4Chart1
        }
    ])
    //Second Chart data
    const [lChart, setLChart] = useState([
        {
            key: '1',
            svg: { fill: Colors._8DC63F },
            value: 0,
            title: language.StudyReportTeacherScreen.Item1Chart2
        },
        {
            key: '2',
            svg: { fill: Colors._D0D2D3 },
            value: 0,
            title: language.StudyReportTeacherScreen.Item2Chart2
        },
    ])
    
    useEffect(() => {
        getStatistic()
    }, [props.firstDay, props.lastDay])

    /**
     * get statistic by time range
     */
    const getStatistic = async () => {
        setLoading(true)
        let url = API.baseurl + API.ReportByClass + "?class_id=" + id + "&from_date=" + moment(props.firstDay, "DD/MM/YYYY").format("YYYY-MM-DD HH:mm:ss") + "&to_date=" + moment(props.lastDay, "DD/MM/YYYY").format("YYYY-MM-DD HH:mm:ss")
        try {
            let res = await APIBase.tokenAPI('get', url)
            if (!!res && !!res.data) {
                let scoreKey = Object.keys(res.data.overview_score);
                setFChart(fChart.map((item, index) => ({
                    ...item,
                    value: res.data.overview_score[scoreKey[index]]
                })))
                setLChart(lChart.map((item, index) => ({
                    ...item,
                    value: index === 0 ? (res.data.overview_exercise.total - res.data.overview_exercise.total_not_done) : res.data.overview_exercise.total_not_done
                })))
                setNumOfMem(res.data.total_student)
                setAvgScore(res.data.avg)
                setTotalScore(res.data.total_exercise)
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
            console.log("----error", error);
        }
    }

    return (
        <LinearGradient
            style={styles.container}
            colors={[Colors._C5F3F1, Colors._F3FFFF, Colors._F3FFFF]}
            start={{ x: 1, y: 0 }} end={{ x: 1, y: 1 }}>
            <View style={styles.spacing} />
            <ScrollView style={styles.flex1}>
                <View style={[styles.outerView, styles.marginTop15]}>
                    <View style={[stylesApp.shadow, styles.innerView]}>
                        <TextBox>
                            <TextBox style={[styles.normalText, FontWeight.SemiBold]}>
                                {language.StudyReportTeacherScreen.SumBox + ": "}
                            </TextBox>
                            <TextBox style={[styles.normalText, FontWeight.Bold, styles.greenText]}>
                                {numOfMem}
                            </TextBox>
                            <TextBox style={[styles.normalText, FontWeight.SemiBold, styles.greenText]}>
                                {" " + language.StudyReportTeacherScreen.StudentBox}
                            </TextBox>
                        </TextBox>
                    </View>
                </View>
                <View style={styles.outerView}>
                    <View style={styles.statisticContainer}>
                        <TextBox
                            style={styles.titleChar1}>
                            {language.StudyReportTeacherScreen.TittleChart1}
                        </TextBox>
                        <PieChartComponent
                            big
                            data={fChart}
                            statisticTitle={language.StudyReportTeacherScreen.SpecialItemChart1}
                            statisticPoint={!!avgScore && avgScore > 0 ? Number(avgScore).toFixed(2) : "0"}
                        />
                    </View>

                    {/* {renderPieChart({
                        data: fChart,
                        title: language.StudyReportTeacherScreen.TittleChart1,
                        statisticTitle: language.StudyReportTeacherScreen.SpecialItemChart1,
                        statisticPoint: !!avgScore && avgScore > 0 ? Number(avgScore).toFixed(2) : "0"
                    })} */}
                </View>
                <View style={styles.spacing} />
                <View style={styles.outerView}>
                    <View style={styles.statisticContainer}>
                        <TextBox
                            numberOfLines={2}
                            style={styles.titleChar1}>
                            {language.StudyReportTeacherScreen.TittleChart2}
                        </TextBox>
                        <PieChartComponent
                            data={lChart}
                            invertedStatistic={true}
                            statisticTitle={language.StudyReportTeacherScreen.SpecialItemChart2}
                            statisticPoint={`${totalScore}`}
                        />
                    </View>
                    {/* {renderPieChart({
                        data: lChart,
                        title: language.StudyReportTeacherScreen.TittleChart2,
                        statisticTitle: language.StudyReportTeacherScreen.SpecialItemChart2,
                        statisticPoint: totalScore
                    })} */}
                </View>
                <View style={styles.spacing} />
            </ScrollView>
            <FullScreenLoadingIndicator
                visible={loading}
            />
        </LinearGradient>
    )
}


const styles = StyleSheet.create({
    marginTop15: { marginTop: SmartScreenBase.smBaseHeight * 15 },
    flex1: { flex: 1 },
    container: {
        flex: 1,
    },
    spacing: {
        marginTop: SmartScreenBase.smPercenWidth * 2,
    },
    outerView: {
        padding: SmartScreenBase.smPercenWidth * 2,
        marginHorizontal: SmartScreenBase.smPercenWidth * 3,
    },
    innerView: {
        paddingHorizontal: SmartScreenBase.smPercenWidth * 5,
        paddingVertical: SmartScreenBase.smPercenWidth * 2,
        backgroundColor: 'white',
        textAlign: 'center',
        alignSelf: "center",
        borderRadius: SmartScreenBase.smPercenWidth * 50,
    },
    normalText: {
        fontSize: FontSize.size50Font,
        lineHeight: SmartScreenBase.smBaseHeight * 35
    },
    greenText: {
        color: Colors.BaseGreen
    },
    chartContainer: {
        height: SmartScreenBase.smPercenWidth * 36,
        width: SmartScreenBase.smPercenWidth * 36,
        borderRadius: SmartScreenBase.smPercenWidth * 18,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: "center",
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
    statisticDataContainer: { flex: 1, justifyContent: 'space-evenly', marginLeft: 10 },
    statisticItem: { flexDirection: "row", alignItems: "center", flex: 1 },
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
        // marginTop: 5,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    averageText: {
        fontSize: SmartScreenBase.smFontSize * 40,
        lineHeight: SmartScreenBase.smBaseHeight * 40,
    },
    averagePoint: {
        fontSize: SmartScreenBase.smFontSize * 60,
        ...FontWeight.Bold,
        color: Colors.DarkGreen,
        lineHeight: SmartScreenBase.smBaseHeight * 40,
        marginLeft: SmartScreenBase.smBaseWidth * 20
    },
    titleChar1: {
        alignSelf: 'flex-start',
        ...FontWeight.SemiBold,
        fontSize: SmartScreenBase.smFontSize*48,
        marginBottom: SmartScreenBase.smPercenHeight * 1,
        lineHeight: SmartScreenBase.smBaseHeight * 35
    }
});