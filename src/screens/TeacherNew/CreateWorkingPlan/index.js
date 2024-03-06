import React, { Component, useCallback, useRef } from 'react';
import { View, TextInput, Modal , ImageBackground} from 'react-native';
import { TouchableOpacity } from 'react-native';

import { TextBox } from '../../../componentBase/TextBox';
import { styles } from './CreateWorkingPlan.styles';
import { useSelector } from 'react-redux';
import { AppHeader } from '../../../componentBase/AppHeader';
import { ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { FontWeight } from '../../../styleApp/font';
import { SmallCheckBox } from '../../../componentBase/SmallCheckBox';
import SmartScreenBase from '../../../base/SmartScreenBase';
import ModalDropdown from 'react-native-modal-dropdown';
import { JobBox } from '../../../componentBase/JobBox';
import { MyButton } from '../../../componentBase/Button';
import { SelectDateModal as SelectDateWithHour } from '../../../componentBase/PlanModal/SelectDateWithHour';
import { SelectDateModal } from '../../../componentBase/SelectDateModal/SelectDateModal';
import moment from 'moment';
import { createPlanMethod } from './CreateWorkingPlan.logic';
import { FullScreenLoadingIndicator } from '../../../componentBase/indicator/FullScreenLoadingIndicator';
import { ShortMainButton } from '../../../componentBase/ShortMainButton';
import { Colors } from '../../../styleApp/color';
import { TeacherTextJson } from '../../../stringJSON/TeacherTextJson';
import { Global } from '../../../utils/global';
import Icon from 'react-native-vector-icons/Feather';

/**
 * @summary Create working plan screen.
 *
 * @param {object} props
 * @property {object} navigation: The navigation object
 *
 * @returns {Component}
 */
export const CreateWorkingPlan = (props) => {
    const language = useSelector(state => state.LanguageStackReducer.language);
    //Old Plan data
    let oldData = props.navigation.getParam('data');
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const goBack = props.navigation.getParam('goBack');
    let {
        title, setTitle,
        description, setDescription,
        date, setDate,
        visible, setVisible,
        visibleValidDate, setVisibleValidDate,
        minutes, setMinutes,
        isNotify, setIsNotify,
        repeatType, setRepeatType,
        jobBoxRef, loading,
        onCreate, onEdit,
        modalLoop, setModalLoop,
        chooseAll, setChooseAll,
        checknumberDate,
        validDate, setValidDate,
    } = createPlanMethod(props);

    /**
     * Render Ratio button
     */

    const isDisable = () => {
        return !(title && title.trim().length > 0)
    }

    const renderRadioBtn = useCallback((isCheck, callback) => {
        return (
            <TouchableOpacity style={styles.ratioWrapper} onPress={callback}>
                {isCheck && <View style={styles.selectedRatio} />}
            </TouchableOpacity>
        );
    }, []);

    return (
        <>
            <LinearGradient
                style={styles.flex1}
                colors={[Colors._E1FEF0, Colors._E1FEF0, Colors.White, Colors.White]}
                start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1 }}>
                <AppHeader
                    navigation={props.navigation}
                    title={oldData ? language.EditPlanScreen.header : language.CreatePlanScreen.Header}
                    leftIconOnPress={() => {
                        props.navigation.pop();
                        !!goBack && goBack(props.navigation.getParam('curDate'));
                    }}
                    rightComponent={() => (
                        <TouchableOpacity disabled={isDisable()} style={[styles.rightHeaderComponent, {backgroundColor: isDisable() ? Colors._BCBDBF : Colors.White}]} onPress={() => {
                            if (!oldData) {onCreate();}
                            else {
                                if(repeatType) {setModalLoop(true);}
                                else {setModalLoop(false); onEdit()}
                            }
                        }}>
                            <TextBox style={{color: isDisable() ? Colors.White : Colors.BaseGreen}}>{language.CreatePlanScreen.ComfirmBt}</TextBox>
                        </TouchableOpacity>
                    )}
                />
                <KeyboardAwareScrollView
                    contentContainerStyle={styles.flexGrow}>
                    <View style={styles.inputContainer}>
                        <TextBox
                            numberOfLines={undefined}
                            style={styles.title}
                        >{language.CreatePlanScreen.Tittle}<TextBox style={styles.required}>*</TextBox></TextBox>
                        <TextInput placeholder={language.CreatePlanScreen.TittleTextHoder}
                            value={title}
                            maxLength={50}
                            placeholderTextColor={Colors.SuperLightGray}
                            onChangeText={setTitle}
                            style={[styles.titleInput]} />

                        <TextBox numberOfLines={undefined} style={styles.title}>{language.CreatePlanScreen.Time}<TextBox style={styles.required}>*</TextBox></TextBox>
                        <TouchableOpacity
                            onPress={() => setVisible(true)}
                            style={styles.timeSelect}>
                            <View style={styles.dateComp}>
                                <TextBox text={date} style={styles.dateText} />
                            </View>
                        </TouchableOpacity>
                        <TextBox numberOfLines={undefined} style={styles.title}>{language.CreatePlanScreen.JobType}</TextBox>
                        {/* {console.log("=====lang:",language.CreatePlanScreen)} */}
                        <JobBox listData={[
                            { color: Colors.SuccessGreen, name: language.CreatePlanScreen.SelectItem1, type: 'personal' },
                            { color: Colors._00AEEF, name: language.CreatePlanScreen.SelectItem2, type: 'teaching_work' },
                            { color: Colors.Orange, name: language.CreatePlanScreen.SelectItem3, type: 'professional_activities' },
                            { color: Colors._C367F4, name: language.CreatePlanScreen.SelectItem4, type: 'test_evaluation' },
                            { color: Colors._BE1E2D, name: language.CreatePlanScreen.SelectItem5, type: 'other' },
                        ]} ref={jobBoxRef} dropdownStyles={styles.drop}
                        />
                        <TextBox
                            numberOfLines={undefined}
                            style={styles.title}
                        >{language.CreatePlanScreen.Content}</TextBox>
                        <TextInput placeholder={language.CreatePlanScreen.ContentTextHoder}
                            value={description}
                            onChangeText={setDescription}
                            placeholderTextColor={Colors.SuperLightGray}
                            style={[styles.titleInput]} />

                        <View style={styles.inputContainer}>
                            <TextBox numberOfLines={undefined} style={styles.title}>{language.CreatePlanScreen.AddReminder}</TextBox>
                            <View style={styles.remindContainer}>
                                <SmallCheckBox
                                    onPress={() => setIsNotify(!isNotify)}
                                    isNotify={isNotify}
                                />
                                <TextBox style={styles.padding10} text={language.CreatePlanScreen.ReminderBefore + ' '} />
                                <TextInput
                                    placeholderTextColor={Colors._404041}
                                    keyboardType="decimal-pad"
                                    value={minutes}
                                    onBlur={() => {
                                        console.log('---minutes', minutes);
                                        if (!minutes) {setMinutes('0');}
                                    }}
                                    onChangeText={(value) => {
                                        checknumberDate(value);
                                    }}
                                    style={[styles.remindInput]} />
                                <TextBox text={' ' + language.CreatePlanScreen.Minute.toLocaleLowerCase()} style={styles.paddingHorizontal10} />

                            </View>
                        </View>
                        <TextBox text={language.CreatePlanScreen.ReminderWarning} style={styles.notyText} />
                        <View>
                            <TextBox numberOfLines={undefined} style={styles.title}>{language.CreatePlanScreen.Repeat}</TextBox>
                            <View style={styles.repeatContainer}>
                                {renderRadioBtn(!repeatType || repeatType == "no_repeat", () => {
                                    setRepeatType(null);
                                    setValidDate(moment().add(7, 'days').format('DD/MM/YYYY'));
                                })}
                                <TextBox numberOfLines={undefined} style={styles.repeatTypeText}>{TeacherTextJson.CreaWorkingPlan.NotRepeat}</TextBox>
                            </View>
                            <View style={styles.repeatContainer}>
                                {renderRadioBtn(repeatType === 'day', () => setRepeatType('day'))}
                                <TextBox numberOfLines={undefined} style={styles.repeatTypeText}>{language.CreatePlanScreen.radioBt1}</TextBox>
                            </View>
                            <View style={styles.repeatContainer}>
                                {renderRadioBtn(repeatType === 'week', () => setRepeatType('week'))}
                                <TextBox numberOfLines={undefined} style={styles.repeatTypeText}>{language.CreatePlanScreen.radioBt2}</TextBox>
                            </View>
                            <View style={styles.repeatContainer}>
                                {renderRadioBtn(repeatType === 'month', () => setRepeatType('month'))}
                                <TextBox numberOfLines={undefined} style={styles.repeatTypeText}>{language.CreatePlanScreen.radioBt3}</TextBox>
                            </View>
                            {/* <View style={styles.repeatContainer}>
                                {renderRadioBtn(repeatType === 'year', () => setRepeatType('year'))}
                                <TextBox numberOfLines={undefined} style={styles.repeatTypeText}>{language.CreatePlanScreen.radioBt4}</TextBox>
                            </View> */}
                            {
                                !!repeatType && repeatType != 'no_repeat' &&
                                <View style={styles.validToContainer}>
                                    <TextBox style={styles.validToText}>Áp dụng đến:</TextBox>
                                    <TouchableOpacity style={styles.validToSelectorContainer} onPress={()=> {
                                        setVisibleValidDate(true);
                                    }}>
                                        <TextBox style={[styles.validToText, styles.validToSelectorText]}>{validDate}</TextBox>
                                        <Icon name="edit" color={Colors.BaseGreen} size={15} />
                                    </TouchableOpacity>
                                </View>
                            }

                        </View>
                    </View>

                    <View style={styles.btnDone}>
                    </View>
                </KeyboardAwareScrollView>
            </LinearGradient>
            <Modal transparent visible={visible}>
                <View style={styles.dateContainer}>
                    <SelectDateWithHour
                        onCancel={() => { setVisible(false); }}
                        onSave={(date) => {
                            setDate(date);
                            setVisible(false);
                        }}
                        rangeDate={date}
                    />
                </View>
            </Modal>

            <SelectDateModal
                minimunDate={new Date()}
                rangeDate={moment(validDate,'DD/MM/YYYY').toDate()}
                isVisible={visibleValidDate}
                requestClose={() => {
                    setVisibleValidDate(false);
                }}
                onSave={(saveDate)=> {
                    const validDate = moment(saveDate).format('DD/MM/YYYY');
                    setVisibleValidDate(false);
                    setValidDate(validDate);
                }}
            />

            <Modal visible={modalLoop} transparent animationType="fade">
                <View style={[styles.container]}>
                    <View style={[styles.content]}>
                        <View style={styles.contentBtn}>
                            <TouchableOpacity style={styles.checkContainer} onPress={() => setChooseAll(false)}>
                                <View style={styles.btnWrapper}>
                                    {!chooseAll && <View style={styles.checked} />}
                                </View>
                                <TextBox style={styles.text}>
                                    {'Chỉ thay đổi kế hoạch này'}
                                </TextBox>
                            </TouchableOpacity>
                            <View style={styles.marginTop10} />
                            <TouchableOpacity style={styles.checkContainer} onPress={() => setChooseAll(true)}>
                                <View style={styles.btnWrapper}>
                                    {chooseAll && <View style={styles.checked} />}
                                </View>
                                <TextBox numberOfLines={null} style={styles.text}>
                                    {'Thay đổi toàn bộ sự kiện trong chuỗi'}
                                </TextBox>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.btnContainer}>
                            <ShortMainButton
                                type={2}
                                onPress={() => setModalLoop(false)}
                                text={'Huỷ'}
                                style={styles.btnCancel}
                                widthType={'popup'}
                            />
                            <ShortMainButton
                                type={1}
                                onPress={() => onEdit()}
                                text={'Xong'}
                                style={styles.normalBtnSize}
                                widthType={'popup'}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
            <FullScreenLoadingIndicator
                visible={loading}
            />
        </>
    );
};
