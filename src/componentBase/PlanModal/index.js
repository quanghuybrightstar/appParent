import React, { useState, useEffect } from 'react'
import Modal from "react-native-modal";
import { View, TouchableOpacity, Image, TextInput, StyleSheet, Platform } from "react-native";
import { TextBox } from "../TextBox";
import SmartScreenBase from '../../base/SmartScreenBase';
import { FontSize, FontWeight } from '../../styleApp/font';
import { MyButton } from '../../componentBase/Button';
import moment from "moment";
import { SelectDateModal } from './SelectDateWithHour';

import { PlanModalJson, CommonJson, TimeTableJson } from "../../stringJSON";
import { SmallCheckBox } from '../SmallCheckBox';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ShortMainButton } from '../ShortMainButton';
import { Colors } from '../../styleApp/color';
import stylesApp from '../../styleApp/stylesApp';
import FontBase from '../../base/FontBase';
import { useSelector } from 'react-redux';

/**
 * @summary The PlanModal component 
 * 
 * @param {object} props 
 * @property {any} props.defaultValue: default value when edit
 * @property {function} props.onCancel: on cancel function
 * @property {function} props.onSave:  on save function
 * @property {any} props.others: Others Modal props
 * 
 * @returns {Component}
 */
export const PlanModal = (props) => {
    let {
        defaultValue = {},
        onCancel = () => { },
        onSave = () => { },
        currentDate = null,
        visible = false
    } = props
    const language = useSelector(state => state.LanguageStackReducer.language);
    //Check if notify is chosen
    const [isNotify, setIsNotify] = useState(!!defaultValue && !!defaultValue.remind && defaultValue.remind === '0' ? false : true)
    //minute before notify
    const [minutes, setMinutes] = useState(!!defaultValue && defaultValue.remind === '1' ? defaultValue.remind_time : "10")
    //title of plan
    const [title, setTitle] = useState(!!defaultValue && !!defaultValue.title ? defaultValue.title : "")
    //content name
    const [lesson, setLesson] = useState(!!defaultValue && !!defaultValue.content ? defaultValue.content : "")
    //created date
    const [date, setDate] = useState(!!defaultValue && !!defaultValue.start_time ?
        moment(defaultValue.start_time).format('HH:mm, DD/MM/YYYY') :
        currentDate ? moment(currentDate).format('HH:mm, DD/MM/YYYY') : moment().format('HH:mm, DD/MM/YYYY'))
    useEffect(() => {
        if (!!defaultValue && !!defaultValue.start_time)
            setData()
    }, [defaultValue])

    useEffect(() => {
        setData()
    }, [visible])

    /**
     * reset data to null
     */
    const reset = () => {
        setIsNotify(true)
        setMinutes('10')
        setTitle("")
        setLesson("")
    }

    const isDataNotOk = () => {
        if(title.trim() == ''){
            return true
        }else{
            return false
        }
    }

    /**
     * set default data on init
     */
    const setData = () => {
        setIsNotify(!!defaultValue && !!defaultValue.remind && defaultValue.remind === '0' ? false : true)
        setMinutes(!!defaultValue && defaultValue.remind === '1' ? defaultValue.remind_time : "10")
        setTitle(!!defaultValue && !!defaultValue.title ? defaultValue.title : "")
        setLesson(!!defaultValue && !!defaultValue.content ? defaultValue.content : "")
        setDate(!!defaultValue && !!defaultValue.start_time ?
            moment(defaultValue.start_time).format('HH:mm, DD/MM/YYYY') :
            currentDate ? moment(currentDate).format('HH:mm, DD/MM/YYYY') : moment().format('HH:mm, DD/MM/YYYY'))
    }

    /**
     * Save data function
     */
    const save = () => {
        onCancel()
        let isOverTime = moment(date, "HH:mm, DD/MM/YYYY").toDate().getTime() < moment().toDate().getTime()
        let params = {
            start_time: moment(date, "HH:mm, DD/MM/YYYY").format("HH:mm"),
            // end_time: moment(date, "HH:mm, DD/MM/YYYY").format("HH:mm"),
            type: 'personal',
            title: title.trim(),
            content: lesson.trim(),
            remind_time: isNotify ? minutes : 0,
            remind: isNotify ? 1 : 0,
            // repeat_type: "day",
            // status: !isOverTime ? 'no_status' : 'over_time',
            valid_from: moment(date, "HH:mm, DD/MM/YYYY").format("YYYY-MM-DD"),
            // valid_to: moment(date, "HH:mm, DD/MM/YYYY").format("YYYY-MM-DD"),
            date: date,
        }
        if (!defaultValue) {
            params.status = !isOverTime ? 'no_status' : 'over_time';
        }
        if (!!defaultValue && !!defaultValue.id) params.id = defaultValue.id
        onSave(params)
        reset()
    }
    let [showDatePicker, setShowDatePicker] = useState(false)
    return (
        <Modal
            {...props}
            onBackdropPress={() => { }}
            backdropOpacity={1}
            onBackButtonPress={() => { }}
            hasBackdrop avoidKeyboard
            style={styles.modal}
        >
            <KeyboardAwareScrollView extraScrollHeight={-SmartScreenBase.smPercenHeight*22} showsVerticalScrollIndicator={false} bounces={false} contentContainerStyle={styles.contentContainerStyle}>
                {!showDatePicker ? <>
                    <View style={styles.datePicker}>
                        <View>
                            <TextBox numberOfLines={undefined} style={styles.title}>{PlanModalJson.Time}<TextBox style={styles.required}>*</TextBox></TextBox>
                            <TouchableOpacity
                                onPress={() => setShowDatePicker(true)}
                                style={styles.timeSelect}>
                                <View style={styles.dateComp}>
                                    <TextBox text={date} style={[styles.timeText, FontWeight.Bold]} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextBox
                                numberOfLines={undefined}
                                style={styles.title}
                            >{CommonJson.Title}<TextBox style={styles.required}>*</TextBox></TextBox>
                            <View style={styles.shadow}>
                                <TextInput placeholder={PlanModalJson.EnterTitle}
                                    value={title}
                                    maxLength={50}
                                    placeholderTextColor={Colors.SuperLightGray}
                                    onChangeText={setTitle}
                                    style={[styles.titleInput]} />
                            </View>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextBox
                                numberOfLines={undefined}
                                style={styles.title}
                            >{PlanModalJson.Description}</TextBox>
                            <View style={styles.shadow}>
                                <TextInput placeholder={PlanModalJson.EnterDes}
                                    value={lesson}
                                    placeholderTextColor={Colors.SuperLightGray}
                                    onChangeText={setLesson}
                                    style={[styles.descriptionInput]} />
                            </View>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextBox numberOfLines={undefined} style={styles.remindTitle}>{PlanModalJson.SchedulePlan}</TextBox>
                            <View style={styles.remindContainer}>
                                <SmallCheckBox
                                    onPress={() => setIsNotify(!isNotify)}
                                    isNotify={isNotify}
                                />
                                <TextBox style={styles.remindText} text={PlanModalJson.Remind + " "} />
                                <View style={styles.shadow}>
                                    <TextInput
                                        placeholderTextColor={Colors.Black}
                                        keyboardType="decimal-pad"
                                        value={minutes}
                                        onChangeText={(value) => {
                                            if (!value) {
                                                setMinutes('')
                                                return;
                                            }
                                            const regex = /^\d+$/;
                                            if (!regex.test(value)) return;
                                            if (Number(value) < 61) {
                                                setMinutes(value)
                                            }
                                        }}

                                        onBlur={() => {
                                            if (!minutes) setMinutes("0")
                                        }}
                                        style={[styles.remindInput]} />
                                </View>
                                <TextBox text={" " + TimeTableJson.Minute.toLocaleLowerCase()} style={styles.remindText} />
                                {/* <View style={{ width: 10 }} /> */}

                            </View>
                        </View>
                        <TextBox text={language.CreatePlanScreen?.ReminderWarning || "Thời gian nhắc trước tối đa 60 phút"} style={styles.notyText} />
                        <View style={styles.btnContainer}>
                            <ShortMainButton
                                onPress={() => {
                                    onCancel()
                                    reset()
                                }}
                                type={2}
                                text={CommonJson.Cancel}
                                style={styles.buttonType2}
                            />
                            <ShortMainButton
                                isDisabled={isDataNotOk()}
                                onPress={save}
                                type={1}
                                text={CommonJson.Save}
                                style={styles.btn}
                            />
                        </View>
                    </View>
                </>
                    :
                    <View style={styles.modalpicker}>
                        <SelectDateModal
                            rangeDate={date}
                            onCancel={() => { setShowDatePicker(false) }}
                            onSave={(date) => {
                                setDate(date)
                                setShowDatePicker(false)
                            }}
                        />
                    </View>
                }
            </KeyboardAwareScrollView>
        </Modal >
    )
}

const styles = StyleSheet.create({
    modalpicker: {
        marginHorizontal: SmartScreenBase.smPercenWidth * 5
    },
    contentContainerStyle: {
        justifyContent: 'center',
        flexGrow: 1
    },
    modal: { padding: 0, margin: 0, backgroundColor: Colors._00000090, },
    container: {
        flex: 1,
        paddingHorizontal: SmartScreenBase.smPercenWidth * 5,
        backgroundColor: Colors._00000090
    },
    content: {
        justifyContent: 'center',
        paddingTop: SmartScreenBase.smPercenHeight * 15
    },
    datePicker: {
        backgroundColor: Colors.White, borderRadius: 10,
        paddingTop: SmartScreenBase.smPercenHeight * 5,
        paddingBottom: SmartScreenBase.smPercenHeight * 3,
        marginHorizontal: SmartScreenBase.smPercenWidth * 5,
        paddingHorizontal: SmartScreenBase.smPercenWidth * 5
    },
    timeSelect: {
        flexDirection: 'row',
        backgroundColor: Colors._A0F1E7,
        borderRadius: SmartScreenBase.smBaseWidth * 10,
        height: SmartScreenBase.smBaseWidth * 180
    },
    timeText: {
        fontSize: FontSize.size65Font,
    },
    dateComp: {
        flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors._4DE8D6, borderRadius: SmartScreenBase.smBaseWidth * 10
    },
    title: {
        ...FontWeight.Bold,
        fontSize: FontSize.size55Font, marginBottom: SmartScreenBase.smBaseHeight * 10
    },
    inputContainer: { marginTop: SmartScreenBase.smBaseHeight * 23, },
    shadow: {
        ...stylesApp.shadow,
        backgroundColor: Colors.White,
        borderWidth: 1, borderColor: Colors._ccc,
        borderRadius: SmartScreenBase.smBaseWidth * 65,
        paddingHorizontal: SmartScreenBase.smBaseWidth * 30,
        marginHorizontal: SmartScreenBase.smBaseWidth * 5
    },
    titleInput: {
        color: Colors.Black,
        fontFamily: FontBase.MyriadPro_Regular,
        fontSize: FontSize.size45Font,
        paddingVertical: SmartScreenBase.smBaseWidth * 30,
    },
    descriptionInput: {
        color: Colors.Black,
        fontFamily: FontBase.MyriadPro_Regular,
        fontSize: FontSize.size45Font,
        borderRadius: SmartScreenBase.smBaseWidth * 65,
        paddingVertical: SmartScreenBase.smBaseWidth * 30,
    },
    remindContainer: { flexDirection: 'row', alignItems: 'center', paddingRight: SmartScreenBase.smBaseWidth * 15, },
    remindTitle: { ...FontWeight.Bold, fontSize: FontSize.size55Font, marginBottom: SmartScreenBase.smPercenHeight },
    remindInput: {
        ...FontWeight.Light, fontSize: FontSize.size45Font,
        color: Colors.Black,
        minWidth: SmartScreenBase.smBaseWidth * 170,
        textAlign: 'center',
        paddingVertical: SmartScreenBase.smBaseWidth * 20,
    },
    notyText: {marginLeft: SmartScreenBase.smPercenWidth*8, marginTop: SmartScreenBase.smPercenWidth*2, textAlign: 'left', width: SmartScreenBase.smPercenWidth*82, fontFamily: FontBase.MyriadPro_It },
    remindText: {
        fontSize: FontSize.size55Font,
        paddingHorizontal: SmartScreenBase.smBaseWidth * 12
    },
    required: {
        color: Colors._E41E27,
    },
    btnContainer: { flexDirection: 'row', justifyContent: 'space-evenly', marginTop: SmartScreenBase.smBaseHeight * 30 },
    btn: { width: SmartScreenBase.smPercenWidth * 30, paddingVertical: SmartScreenBase.smPercenHeight * 1, height: 'auto' },

    buttonType2: {
        width: SmartScreenBase.smPercenWidth * 30, paddingVertical: SmartScreenBase.smPercenHeight * 0.5, height: 'auto'
    },
})