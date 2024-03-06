
import * as React from 'react'
import { Image, RefreshControl, ScrollView, ImageBackground, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import API from '../../../../API/APIConstant'
import APIBase from '../../../../base/APIBase'
import SmartScreenBase from '../../../../base/SmartScreenBase'
import { AppHeader } from '../../../../componentBase/AppHeader'
import { RoundAvatar } from '../../../../componentBase/RoundAvatar'
import { ShortMainButton } from '../../../../componentBase/ShortMainButton'
import { TextBox } from '../../../../componentBase/TextBox'
import { FontWeight } from '../../../../styleApp/font'
import stylesApp from '../../../../styleApp/stylesApp'
import { useMethod } from './DetailReportTeacherScreen.logic'
import { styles } from './DetailReportTeacherScreen.styles'
import moment from "moment";
import Loading from '../../../../component/LoadingScreen'
import { TeacherTextJson } from '../../../../stringJSON/TeacherTextJson'
import { FullScreenLoadingIndicator } from '../../../../componentBase/indicator/FullScreenLoadingIndicator'
import dateTimeHelper from '../../../../utils/dateTimeHelper'
import stringUtils from '../../../../utils/stringUtils'


/**
 * Detail Report Teacher screen
 * @param {Object} props props from redux and navigation
 * @returns {Component}
 */
export const DetailReportTeacherScreen = (props) => {
    const language = useSelector(state => state.LanguageStackReducer.language)

    let {
        firstDay,
        lastDay,
        nextWeek,
        preWeek,
        getData,
        user,
        report, baseUrl,
        loading, firstLoading
    } = useMethod(props)


    /**
     * render header of student
     * @returns {Component}
     */
    const renderHeaderUser = () => {
        return (
            <View style={styles.infoOuter}>
                <RoundAvatar
                    avatar={`${baseUrl}${user.avatar}`}
                    width={SmartScreenBase.smBaseHeight * 150}
                    height={SmartScreenBase.smBaseHeight * 150}
                />
                <View style={styles.infoContainer}>
                    <TextBox
                        style={styles.name}
                    >{user.fullname}</TextBox>
                    <View style={styles.morInfoContainer}>
                        <Image
                            source={{ uri: 'email_icon' }}
                            style={styles.infoIcon}
                            resizeMode='contain'
                        />
                        <TextBox style={styles.morInfoText}>{user.email}</TextBox>
                    </View>
                    {/* <View style={styles.morInfoContainer}>
                        <Image
                            source={{ uri: 'course_book_icon' }}
                            style={styles.infoIcon}
                            resizeMode='contain'
                        />
                        <TextBox style={styles.morInfoText}>{"..."}</TextBox>
                    </View> */}
                </View>
            </View >
        )
    }

    /**
     * Render User score section
     * @returns {Component}
     */
    const renderScoreInfo = () => {
        return (
            <View style={styles.outerView}>
                <View style={styles.scoreContainer}>
                    <View style={styles.scoreHeaderContainer}>
                        <TextBox style={styles.scoreHeader}>{language.DetailReportTeacherScreen.TittleTable.toUpperCase()}</TextBox>
                        <ShortMainButton
                            onPress={() => {
                                props.navigation.navigate("StudyDiaryTeacherScreen", { user: user })
                            }}
                            type={2}
                            widthType='mini'
                            textStyles={styles.diaryBtnText}
                            text={language.DetailReportTeacherScreen.StudyDiaryBt}
                        />
                    </View>
                    {renderScoreRow(language.DetailReportTeacherScreen.Row1, !!report ? `${report.teacher_giving_homework}/${report.total_homework}` : "...")}
                    {renderScoreRow(language.DetailReportTeacherScreen.Row2, !!report ? `${report.deadline}` : "...")}
                    {renderScoreRow(language.DetailReportTeacherScreen.Row3, !!report ? `${report.lesson_done}` : "...")}
                    {renderScoreRow(language.DetailReportTeacherScreen.Row4, !!report ? `${report.number_done_in_master_unit}` : "...")}
                    {renderScoreRow(language.DetailReportTeacherScreen.Row5+" trong giáo trình", !!report && !!report?.total_vocab_learned ? `${report.total_vocab_learned}` : "0")}
                    <View style={{ flexDirection: 'row' }}>
                        <View style={[styles.avgSection, styles.titleSection]}>
                            <TextBox
                                numberOfLines={4}
                                style={[styles.valueText, FontWeight.Regular]}>
                                {language.DetailReportTeacherScreen.Row6}
                            </TextBox>
                        </View>
                        <View style={{ flex: 1 }}>
                            {renderScoreRow(TeacherTextJson.DetailReportTeacherScreen.Homework, !!report && !!report.user_assessment_log && report.user_assessment_log.exercise_score ? `${report.user_assessment_log.exercise_score}` : "...")}
                            {renderScoreRow(language.DetailReportTeacherScreen.Row6p1, !!report && !!report.user_assessment_log ? `${report.user_assessment_log.grammar_score ? stringUtils.roundOne(report.user_assessment_log.grammar_score) : '...'}` : "...")}
                            {renderScoreRow(language.DetailReportTeacherScreen.Row6p2, !!report && !!report.user_assessment_log ? `${report.user_assessment_log.reading_score ? stringUtils.roundOne(report.user_assessment_log.reading_score) : '...'}` : "...")}
                            {renderScoreRow(language.DetailReportTeacherScreen.Row6p3, !!report && !!report.user_assessment_log ? `${report.user_assessment_log.listening_score ? stringUtils.roundOne(report.user_assessment_log.listening_score) : '...'}` : "...")}
                            {renderScoreRow(language.DetailReportTeacherScreen.Row6p4, !!report && !!report.user_assessment_log ? `${report.user_assessment_log.speaking_score ? stringUtils.roundOne(report.user_assessment_log.speaking_score) :  '...'}` : "...")}
                            {renderScoreRow("Kỹ năng Pronunciation", !!report && !!report.user_assessment_log ? `${report.user_assessment_log.pronunciation_score ? stringUtils.roundOne(report.user_assessment_log.pronunciation_score) :  '...'}` : "...")}
                            {renderScoreRow(language.DetailReportTeacherScreen.Row6p5, !!report && !!report.user_assessment_log ? `${report.user_assessment_log.writing_score ? stringUtils.roundOne(report.user_assessment_log.writing_score) : '...'}` : "...")}
                            {renderScoreRow(language.DetailReportTeacherScreen.Row6p6, !!report && !!report.user_assessment_log ? `${report.user_assessment_log.test_score ? stringUtils.roundOne(report.user_assessment_log.test_score) : '...'}` : "...")}
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    /**
     * render scrore row
     * @param {string} title title of score section
     * @param {string} value value of score section
     * @returns {Component}
     */
    const renderScoreRow = (title, value) => {
        return (
            <View style={styles.rowOuter}>
                <View style={[styles.normalRow, styles.titleSection]}>
                    <TextBox style={[styles.valueText, FontWeight.Regular]}>{title}</TextBox>
                </View>
                <View style={[styles.normalValueRow, styles.valueSection]}>
                    <TextBox style={[styles.valueText, FontWeight.Bold]}>{value}</TextBox>
                </View>
            </View>
        )
    }

    // if (firstLoading) {
    //     return (
    //         <ImageBackground
    //             source={{ uri: 'imagebackground' }}
    //             imageStyle={stylesApp.ImageBackGround}
    //             style={styles.loading}>
    //             <Loading />
    //         </ImageBackground>
    //     )
    // }

    return (
        <>
            <View style={styles.container}>
                <AppHeader
                    title={language.DetailReportTeacherScreen.Header}
                    leftIconOnPress={() => {
                        props.navigation.pop()
                    }}
                />
                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}
                // refreshControl={<RefreshControl refreshing={loading} />}
                >
                    {renderHeaderUser()}
                    <View style={styles.viewYear}>
                        <TouchableOpacity onPress={preWeek}>
                            <Image
                                source={{ uri: 'iconleft' }}
                                resizeMode='contain'
                                style={styles.iconControl}
                            />
                        </TouchableOpacity>
                        <TextBox style={styles.txtYear}>{`${firstDay} >> ${lastDay}`}</TextBox>
                        <View style={styles.khungIcon}>
                        {dateTimeHelper.compareDate(moment(lastDay, "DD/MM/YYYY").toDate(), new Date()) == -1 && 
                            <TouchableOpacity onPress={nextWeek}>
                                <Image
                                    source={{ uri: 'iconright' }}
                                    resizeMode='contain'
                                    style={styles.iconControl}
                                />
                            </TouchableOpacity>}
                        </View>
                    </View>
                    {renderScoreInfo()}
                </ScrollView>
            </View>
            <FullScreenLoadingIndicator
                visible={loading}
            />
            <FullScreenLoadingIndicator
                visible={firstLoading}
            />
        </>
    )
}