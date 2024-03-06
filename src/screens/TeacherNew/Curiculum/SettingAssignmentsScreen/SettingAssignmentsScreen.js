import React, { useState } from 'react';
import { FlatList, Image, TextInput, View, ScrollView, TouchableOpacity, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import { AppHeader } from '../../../../componentBase/AppHeader';
import { TextBox } from '../../../../componentBase/TextBox';
import { CurriculumTeacherJson, EditAssignJson } from '../../../../stringJSON/CurriculumTeacherJson';
import { FontSize, FontWeight } from '../../../../styleApp/font';
import { styles } from './SettingAssignmentsScreen.style';
import { SelectDateModal } from '../../../../componentBase/SelectDateModal';
import moment from 'moment'
import { Colors } from '../../../../styleApp/color';
import { EditAssignMethod } from './SettingAssignmentsScreen.logic';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FullScreenLoadingIndicator } from '../../../../componentBase/indicator/FullScreenLoadingIndicator';
import { ShortMainButton } from '../../../../componentBase/ShortMainButton';
import { SmallCheckBox } from '../../../../componentBase/SmallCheckBox';

/**
 * SettingAssignmentsScreen Screen - Chọn học viên (luồng giao bài nhanh)
 * @param {object} props props from redux and navigation
 * @returns {Component}
 */
export const SettingAssignmentsScreen = (props) => {
    let { onChooseStudent,
        onChooseAll, startDate, setStartDate,
        endDate, setEndDate,
        remind, setRemind, chooseAll, chooseStudent, listStudent, language, err, setErr, note, setNote,
        numberDate, setnumberDate, onSave, loading, checkColorBtn, checkDisableBtn, checknumberDate, errorDate,
        startAfter, setStartAfter } = EditAssignMethod(props)
    let [modalVisible, setModalVisible] = useState(false)
    let [modalEndDate, setModalEndDate] = useState(false)
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    /**
      * Function render list student item
    */
    const renderItem = ({ item }) => {
        return (
            <View style={styles.viewItem}>
                <TextBox style={styles.flex1}>{item.fullname}</TextBox>
                <SmallCheckBox
                    onPress={() => onChooseStudent(item)}
                    isNotify={chooseStudent.includes(item.id)}
                    size={SmartScreenBase.smBaseWidth * 50}
                />
            </View>
        )
    }
    return (
        <>
            <AppHeader
                navigation={props.navigation}
                title={language.SettingAssignmentsScreen.Header}
                leftIconOnPress={() => {
                    props.navigation.pop()
                }}
                styleTitle={styles.fontSize}

            />

            <LinearGradient
                style={styles.flex1}
                colors={[Colors._E1FEF0, Colors._E1FEF0, Colors.White]}
                start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}>
                <View style={styles.body}>
                    <KeyboardAwareScrollView
                        onKeyboardWillShow={(frames) => {
                            Platform.OS === 'ios' && setKeyboardHeight(frames.endCoordinates.height)
                        }}
                        onKeyboardWillHide={(frames) => {
                            Platform.OS === 'ios' && setKeyboardHeight(0)
                        }}
                        contentContainerStyle={styles.flexGrow1}>
                        <View style={styles.viewStudent} >
                            <View style={styles.viewChooseAll}>
                                <TextBox style={styles.txtChooseStudent}>{language.SettingAssignmentsScreen.TittleSelectBox}</TextBox>
                                <View style={styles.row}>
                                    <TextBox style={styles.txtChooseStudent}>{language.SettingAssignmentsScreen.SelectAll}</TextBox>
                                    <View style={styles.marginLeft}>
                                        <SmallCheckBox
                                            onPress={onChooseAll}
                                            isNotify={chooseAll}
                                            size={SmartScreenBase.smBaseWidth * 50}
                                        />
                                    </View>
                                </View>
                            </View>
                            <FlatList
                                indicatorStyle={'black'}
                                data={listStudent}
                                renderItem={renderItem}
                                keyExtractor={index => index.toString()}
                            />
                        </View>
                        <View style={[styles.row, styles.marginVertical10]}>
                            <View style={styles.marginRight30}>
                                <SmallCheckBox
                                    onPress={() => setRemind(!remind)}
                                    isNotify={remind}
                                    size={SmartScreenBase.smBaseWidth * 57}
                                />
                            </View>
                            <TextBox style={[styles.txtChooseStudent, styles.SemiBold]}>{language.SettingAssignmentsScreen.RemindCheckbox}</TextBox>
                        </View>
                        {remind &&
                            <View style={styles.marginBottom20}>
                                <View style={[styles.viewnote, styles.shadow]}>
                                    <TextInput
                                        multiline={true}
                                        numberOfLines={4}
                                        textAlignVertical={'top'}
                                        style={styles.ipRemind}
                                        onChangeText={setNote}
                                        placeholderTextColor={Colors._BBBDBF}
                                        placeholder={'Nhập nhắc nhở'}
                                    />
                                </View>
                                <View style={[styles.row, styles.marginTop10]}>
                                    <TextBox style={styles.txtChooseStudent}>{language.SettingAssignmentsScreen.RemindText_1}</TextBox>
                                    <View style={[styles.ipNumberDate, styles.shadow]}>
                                        <TextInput
                                            onChangeText={(value) => {
                                                checknumberDate(value)
                                            }}
                                            value={numberDate}
                                            keyboardType={'number-pad'}
                                            style={Platform.OS === 'ios' ? styles.numberDate : styles.ipAndroid} />
                                    </View>
                                    <TextBox style={styles.txtChooseStudent}> {language.SettingAssignmentsScreen.RemindText_2}</TextBox>
                                </View>
                                {!!err && <TextBox numberOfLines={null} style={styles.txtErr}>{err}</TextBox>}
                            </View>
                        }

                        <View style={[styles.row, styles.marginBt10]}>
                            <View style={styles.width50}>
                                <TextBox style={styles.txtStartDate}>{language.SettingAssignmentsScreen.StartDay}</TextBox>
                            </View>
                            <View style={styles.width50}>
                                <TextBox style={styles.txtStartDate}>{language.SettingAssignmentsScreen.EndDay}</TextBox>
                            </View>
                        </View>
                        <LinearGradient
                            style={[styles.row, styles.borderRadius30]}
                            colors={[Colors._98F1D7, Colors._7AE1D4]}
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                            <TouchableOpacity onPress={() => {
                                setModalVisible(true)
                            }}>
                                <LinearGradient
                                    style={styles.viewDate}
                                    colors={[Colors.LightGreen, Colors.BaseGreen,]}
                                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                                    <TextBox style={styles.date}>{moment(startDate).format('DD/MM/YYYY')}</TextBox>
                                </LinearGradient>
                            </TouchableOpacity>
                            <Image source={{ uri: 'icon_right' }} style={styles.iconRight} />
                            <TouchableOpacity onPress={() => {
                                setModalEndDate(true)
                            }} style={styles.viewDate}>
                                <TextBox style={styles.date}>{moment(endDate).format('DD/MM/YYYY')}</TextBox>
                            </TouchableOpacity>
                        </LinearGradient>
                        {!!errorDate && <TextBox numberOfLines={null} style={styles.errText}>{errorDate}</TextBox>}
                        <View style={styles.viewStartAfter}>
                            <View style={styles.marginRight30}>
                                <SmallCheckBox
                                    onPress={() => setStartAfter(!startAfter)}
                                    isNotify={startAfter}
                                    size={SmartScreenBase.smBaseWidth * 57}
                                />
                            </View>
                            <TextBox numberOfLines={null} style={styles.txtStartAfter}>{language.SettingAssignmentsScreen.AllowCheckbox}</TextBox>
                        </View>

                        <SelectDateModal rangeDate={startDate} isVisible={modalVisible}
                            minimunDate={new Date()}
                            onSave={(date) => {
                                if (!!date) {
                                    setStartDate(date)
                                }
                                // if (moment(startDate).format('X') > moment(endDate).format('X')) {
                                //     setEndDate(startDate)
                                // }
                            }}
                            requestClose={() => {
                                setModalVisible(false)
                            }} />
                        <SelectDateModal rangeDate={endDate} isVisible={modalEndDate}
                            minimunDate={startDate}
                            onSave={(date) => {
                                if (!!date) {
                                    setEndDate(date)
                                }
                            }}
                            requestClose={() => {
                                setModalEndDate(false)
                            }} />
                        {Platform.OS === 'ios' && <View style={styles.viewBotCv} />}
                    </KeyboardAwareScrollView>
                </View>
                <View style={[styles.btnDone, Platform.OS === 'ios' && { bottom: keyboardHeight }]}>
                    <ShortMainButton
                        onPress={onSave}
                        type={1}
                        isDisabled={checkDisableBtn()}
                        text={language.SettingAssignmentsScreen.MainButton_1}
                        style={styles.btnAssign}
                        widthType={'full'}
                    />
                </View>

            </LinearGradient>
            <FullScreenLoadingIndicator
                visible={loading}
            />
        </>
    )
}