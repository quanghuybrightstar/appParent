import React, { Component, useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, RefreshControl, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { PickDateBox } from '../../../../componentBase/PickDateBox';

import { TextBox } from '../../../../componentBase/TextBox';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from './StudyDiaryTeacherScreen.styles';
import { useSelector } from 'react-redux';
import { MyButton } from '../../../../componentBase/Button';
import { AppHeader } from '../../../../componentBase/AppHeader';
import { diaryMethod } from './StudyDiaryTeacherScreen.logic';
import { TeacherTextJson } from '../../../../stringJSON/TeacherTextJson';
import { FontSize, FontWeight } from '../../../../styleApp/font';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import { Colors } from '../../../../styleApp/color';
import API from '../../../../API/APIConstant';
import moment from "moment";
import { StudyPlanJson } from '../../../../stringJSON';
import MyData from '../../../../component/MyData'
import stringUtils from '../../../../utils/stringUtils';

/**
 * Convert second to minute
 * @param {string} second 
 */
const calculateMunite = (second) => {
    let minute = Number(second) / 60;
    return Math.round(minute * 100) / 100
}

/**
 * @summary Working schedule by day screen.
 * 
 * @param {object} props 
 * @property {object} navigation: The navigation object
 * 
 * @returns {Component}
 */
export const StudyDiaryTeacherScreen = (props) => {
    const language = useSelector(state => state.LanguageStackReducer.language);
    const dataLogin = useSelector(state => state.AuthStackReducer.dataLogin);
    let user = props.navigation.getParam('user')
    const {
        studyData,
        loading,
        getData,
        firstLoad,
        setCurrentDate,
        currentDate, calculateTime,
        getDataWithOutLoading
    } = diaryMethod(props)

    /**
     *  Function render Plan in a list
     */
    const renderPlanItem = useCallback(({ item, index }) => {
        return (
            <View style={styles.itemContainer}>
                <View style={styles.itemFirstLine}>
                    <TextBox style={styles.time} >{moment(item.time).format("HH:mm")}</TextBox>
                    <View style={styles.flex}>
                        <TextBox style={styles.lessonName} textBreakStrategy="simple" numberOfLines={null}>{item.lesson_name}</TextBox>
                    </View>
                </View>
                <View style={{ paddingLeft: SmartScreenBase.smPercenWidth * 15 }}>
                    <TextBox numberOfLines={null} style={styles.courseName}>{item.curriculum_name}</TextBox>
                    <TextBox numberOfLines={null} style={styles.courseName}>{item.unit_name} - <TextBox style={[styles.courseName, styles.txtSkill]}>{item.skill}</TextBox></TextBox>
                    <TextBox style={[styles.courseName, FontWeight.LightItalic]} numberOfLines={null}>
                        <TextBox style={[FontWeight.LightItalic]}>{language.StudyDiaryTeacherScreen.StudyTime + ": "}</TextBox>{!!item?.duration ? (calculateTime(item?.duration)) : "..."}</TextBox>
                        {(item.status && item.status == 1 || item.score > 0) ? <TextBox style={styles.itemPoint} >{stringUtils.roundOne(item.score) + " " + language.StudyDiaryTeacherScreen.Score}</TextBox> : null}
                </View>
            </View>
        )
    }, [studyData])

    /**
     *  Function render the top data list
     */
    const renderEmptyComponent = useCallback((text) => {
        return (
            <View style={styles.emptyContainer}>
                <Image
                    source={{ uri: "schedule_image" }}
                    style={styles.emptyImage}
                    resizeMode='contain'
                />
                <TextBox style={styles.emptyText} numberOfLines={3}>{text}</TextBox>
            </View>
        )
    }, [studyData, firstLoad])
    console.log('studyData', studyData)
    return (
        <View style={styles.container}>
            <AppHeader
                navigation={props.navigation}
                title={user.fullname}
                leftIconOnPress={() => {
                    props.navigation.pop()
                }}
            />
            <PickDateBox
                urlApi = {API.baseurl + API.student_log_learning_status + "student_id=" + user.id + (dataLogin.role === "student" ? "" : `&class_id=${MyData.classID}`) }
                onSelect={setCurrentDate} />
            <FlatList
                indicatorStyle={'black'}
                style={styles.listContainer}
                // refreshControl={
                //     <RefreshControl
                //         refreshing={false}
                //         tintColor="black"
                //         size={1}
                //         onRefresh={getDataWithOutLoading}
                //     />}
                data={studyData}
                keyExtractor={(item, index) => item.time + item.name + index.toString()}
                renderItem={renderPlanItem}
                contentContainerStyle={styles.flatlist}
                ListHeaderComponent={loading ? <View style={styles.loadingIndi}>
                    <ActivityIndicator color="black" size='small' />
                </View> : null}
                ListEmptyComponent={() => !firstLoad && !loading ? renderEmptyComponent(
                    currentDate === moment().format("YYYY-MM-DD") ?
                        language.StudyDiaryTeacherScreen.EmptyListText.toUpperCase() :
                        StudyPlanJson.EmptyDiaryToday

                ) : null}
            />
        </View>
    )
}
