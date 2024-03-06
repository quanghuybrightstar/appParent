import React, { Component } from 'react';

import { useSelector } from 'react-redux';
import { AppHeader } from '../../../componentBase/AppHeader';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import { TextBox } from '../../../componentBase/TextBox';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import SmartScreenBase from '../../../base/SmartScreenBase';
import { FontSize, FontWeight } from '../../../styleApp/font';
import moment from "moment";
import stylesApp from '../../../styleApp/stylesApp';
import { Colors } from '../../../styleApp/color';
import { TeacherTextJson } from '../../../stringJSON/TeacherTextJson';
import FontBase from '../../../base/FontBase';

/**
 * @summary Detail plan screen.
 * 
 * @param {object} props 
 * @property {object} navigation: The navigation object
 * 
 * @returns {Component}
 */
export const DetailPlan = (props) => {
    const language = useSelector(state => state.LanguageStackReducer.language);
    let oldData = props.navigation.getParam('data')
    console.log("-----oldaData", oldData);

    const ITEM = [
        { color: Colors.SuccessGreen, name: language.CreatePlanScreen.SelectItem1, type: "personal" },
        { color: Colors._00AEEF, name: language.CreatePlanScreen.SelectItem2, type: "teaching_work" },
        { color: Colors.Orange, name: language.CreatePlanScreen.SelectItem3, type: "professional_activities" },
        { color: Colors._C367F4, name: language.CreatePlanScreen.SelectItem4, type: "test_evaluation" },
        { color: Colors._BE1E2D, name: language.CreatePlanScreen.SelectItem5, type: "other" },
    ]

    let chosenType = ITEM.find((item) => item.type === oldData.type) || ITEM[4]

    /**
     * Check type of repeat
     * @param {string} type 
     */
    const repeatType = (type) => {
        switch (type) {
            case 'day':
                return TeacherTextJson.DetailPlan.Everyday
            case 'week':
                return TeacherTextJson.DetailPlan.EveryWeek
            case 'month':
                return TeacherTextJson.DetailPlan.EveryMonth
            case 'year':
                return TeacherTextJson.DetailPlan.EveryYear
            default:
                return 'none'
        }
    }
    return (
        <>
            <LinearGradient
                style={styles.flex1}
                colors={[Colors._E1FEF0, Colors._E1FEF0, Colors.White, Colors.White]}
                start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1 }}>
                <AppHeader
                    navigation={props.navigation}
                    title={TeacherTextJson.DetailPlan.Header}
                    leftIconOnPress={() => {
                        props.navigation.pop()
                    }}
                />
                <KeyboardAwareScrollView style={styles.flex1}>
                    <View style={styles.nameContainer}>
                        <TextBox style={styles.name}>
                            {chosenType.name}
                        </TextBox>
                    </View>
                    <TextBox numberOfLines={undefined} style={styles.title}>{language.DetailPlanScreen.StartTime}</TextBox>
                    <View
                        style={styles.timeSelect}>
                        <View style={styles.dateComp}>
                            <TextBox text={moment(oldData.start_time).format("HH:mm, DD/MM/YYYY")} style={styles.dateText} />
                        </View>
                    </View>
                    {!!oldData?.content && <>
                        <TextBox numberOfLines={undefined} style={styles.title}>{language.DetailPlanScreen.Describe}</TextBox>
                        <View style={styles.contentContainer}>
                            <TextBox text={oldData.content} style={styles.content} />
                        </View>
                    </>}
                    {!!oldData?.repeat_type && repeatType(oldData.repeat_type) != 'none' && <View style={styles.repeat}>
                        <TextBox numberOfLines={undefined} style={styles.repeatTitle}>{TeacherTextJson.DetailPlan.Repeat + " "}</TextBox>
                        <TextBox numberOfLines={undefined} style={styles.repeatType}>{repeatType(oldData.repeat_type)}</TextBox>
                    </View>
                    }

                    {oldData?.remind === '1' && oldData?.status !== "over_time" && <View style={styles.repeat}>
                        <TextBox numberOfLines={undefined} style={styles.repeatTitle}>{TeacherTextJson.DetailPlan.Remind + " "}</TextBox>
                        <TextBox numberOfLines={undefined} style={styles.repeatType}>{oldData?.remind_time + " " + TeacherTextJson.DetailPlan.Minute}</TextBox>
                    </View>
                    }
                    {oldData?.remind === '1' && oldData?.status === "over_time" && <View style={styles.repeat}>
                        <TextBox numberOfLines={undefined} style={styles.repeatTitle}>{TeacherTextJson.DetailPlan.Reminded}</TextBox>
                    </View>
                    }
                </KeyboardAwareScrollView>
            </LinearGradient>
        </>
    )
}


const styles = StyleSheet.create({
    repeat: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: "flex-end",
        marginTop: SmartScreenBase.smBaseWidth * 30
    },
    repeatTitle: {
        fontSize: FontSize.size50Font,
        fontFamily: FontBase.MyriadPro_Regular,
    },
    repeatType: {
        // fontFamily: FontBase.BO,
        fontFamily: FontBase.MyriadPro_Bold_It,
        fontStyle: Platform.OS === 'ios' ? 'italic' : 'normal',
        fontSize: FontSize.size55Font,
    },
    flex1: { flex: 1 },
    title: {
        marginTop: SmartScreenBase.smPercenWidth * 5,
        fontSize: FontSize.size55Font,
        ...FontWeight.Bold,
        marginLeft: SmartScreenBase.smPercenWidth * 5,
        flex: 1,
    },
    timeSelect: {
        flexDirection: 'row',
        backgroundColor: Colors._A0F1E7, borderRadius: 7,
        height: 70,
        marginHorizontal: SmartScreenBase.smPercenWidth * 5,
        marginTop: SmartScreenBase.smPercenWidth * 2,
    },
    dateText: {
        ...FontWeight.Bold,
        fontSize: FontSize.size65Font,
    },
    dateComp: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "#4DE8D6", borderRadius: 7 },
    contentContainer: {
        backgroundColor: 'white',
        marginHorizontal: SmartScreenBase.smPercenWidth * 5,
        borderColor: Colors.SuperLightGray,
        borderRadius: SmartScreenBase.smPercenWidth*3,
        marginVertical: SmartScreenBase.smPercenHeight * 2,
        paddingVertical: SmartScreenBase.smPercenHeight * 2,
        paddingHorizontal: SmartScreenBase.smPercenWidth * 4,
        ...stylesApp.shadow
    },
    content: {
        ...FontWeight.Regular,
        fontSize: FontSize.size45Font,
    },
    nameContainer: {
        marginTop: SmartScreenBase.smPercenHeight * 3,
        width: SmartScreenBase.smPercenWidth * 70,
        height: SmartScreenBase.smPercenHeight * 6,
        borderRadius: 60,
        alignItems: "center",
        justifyContent: 'center',
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: Colors.SuperLightGray
    },
    name: {
        ...FontWeight.Bold,
        fontSize: FontSize.size55Font,
    }
})