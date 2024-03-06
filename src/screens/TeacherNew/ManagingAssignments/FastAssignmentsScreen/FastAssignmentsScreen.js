import React, { useState } from 'react';
import { FlatList, Image, TextInput, View, ScrollView, TouchableOpacity, Platform, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import { AppHeader } from '../../../../componentBase/AppHeader';
import { TextBox } from '../../../../componentBase/TextBox';
import { DetailSkillJson } from '../../../../stringJSON/CurriculumTeacherJson';
import { FontSize, FontWeight } from '../../../../styleApp/font';
import { SelectDateModal } from '../../../../componentBase/SelectDateModal';
import moment from 'moment'
import { Colors } from '../../../../styleApp/color';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FullScreenLoadingIndicator } from '../../../../componentBase/indicator/FullScreenLoadingIndicator';
import { FastAssignmentsMethod } from './FastAssignmentsScreen.logic';
import { styles } from './FastAssignmentsScreen.style';
import { ShortMainButton } from '../../../../componentBase/ShortMainButton'
import { SmallCheckBox } from '../../../../componentBase/SmallCheckBox';

/**
 * FastAssignmentsScreen Screen - Giao bài - Chọn học viên (luồng giao bài full)
 * @param {object} props props from redux and navigation
 * @returns {Component}
 */
export const FastAssignmentsScreen = (props) => {
  let {
    onChooseStudent,
    onChooseAll, startDate, setStartDate,
    endDate, setEndDate,
    remind, setRemind, chooseAll, chooseStudent, listStudent, language, err, setErr, note, setNote,
    numberDate, setnumberDate, onSave, loading, checkColorBtn, checkDisableBtn, role, checknumberDate,
    startAfter, setStartAfter, errorDate
  } = FastAssignmentsMethod(props)
  let [modalVisible, setModalVisible] = useState(false)
  let [modalEndDate, setModalEndDate] = useState(false)
  /**
     * Function render item in FlatList
  */
  const renderItem = ({ item }) => {
    return (
      <View style={styles.viewItem}>
        <TextBox style={styles.flex1}>{item.fullname}</TextBox>
        <SmallCheckBox
          disabled={role !== 'SettingAssign' && item.status_assign === 1}
          onPress={() => {
            onChooseStudent(item)
          }}
          isNotify={chooseStudent.includes(item.id)}
          size={SmartScreenBase.smBaseWidth * 50}
        />
      </View>
    )
  }

  /**
   * check if all student is chosen
   * @returns {boolean}
   */
  const checkChosenAllStudent = () => {
    let filterLength = listStudent.filter((item) => item.status_assign === 1).length;
    return filterLength === listStudent.length
  }

  const noneStudent = () => {
    return (
      <View style={styles.zero}>
          <Text style={styles.zeroText}>{'Lớp chưa có Học sinh, hãy thêm học sinh vào lớp để giao bài.'}</Text>
      </View>
    )
  }


  return (
    <>
      <AppHeader
        navigation={props.navigation}
        title={role !== 'SettingAssign' ? language.SettingAssignmentsScreen.EditHeader : language.SettingAssignmentsScreen.Header}
        leftIconOnPress={() => {
          props.navigation.pop()
        }}
        styleTitle={{ fontSize: FontSize.size60Font }}
      />

      <LinearGradient
        style={styles.flex1}
        colors={[Colors._E1FEF0, Colors._E1FEF0, Colors.White]}
        start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}>
        <View style={styles.body}>
          <KeyboardAwareScrollView
            // onKeyboardWillShow={(frames) => {
            //   Platform.OS === 'ios' && setKeyboardHeight(frames.endCoordinates.height)
            // }}
            // onKeyboardWillHide={(frames) => {
            //   Platform.OS === 'ios' && setKeyboardHeight(0)
            // }}
             style={styles.flexGrow}
            >
            <View style={styles.viewStudent} >
              <View style={styles.viewChooseAll}>
                <TextBox style={styles.txtChooseStudent}>{language.SettingAssignmentsScreen.TittleSelectBox}</TextBox>
                <View style={styles.row}>
                  <TextBox style={styles.txtChooseStudent}>{language.SettingAssignmentsScreen.SelectAll}</TextBox>
                  <View style={styles.marginLeft20}>
                    <SmallCheckBox
                      disabled={role !== 'SettingAssign' && checkChosenAllStudent()}
                      onPress={onChooseAll}
                      isNotify={chooseAll}
                      size={SmartScreenBase.smBaseWidth * 50}
                    />
                  </View>
                </View>
              </View>
              <FlatList

                bounces={false}
                indicatorStyle={'black'}
                data={listStudent}
                renderItem={renderItem}
                keyExtractor={(item, index) => item.id + index.toString()}
              />
            </View>
            <View style={[styles.row, styles.marginVertical10]}>
              <View style={styles.marginRight30}>
                <SmallCheckBox
                  // disabled={role !== 'SettingAssign' && checkChosenAllStudent()}
                  onPress={() => {
                    setRemind(!remind)
                  }}
                  isNotify={remind}
                  size={SmartScreenBase.smBaseWidth * 57}
                />
              </View>
              <TextBox style={styles.txtChooseStudent}>{language.SettingAssignmentsScreen.RemindCheckbox}</TextBox>
            </View>
            {remind &&
              <View style={styles.marginBottom20}>
                <View style={[styles.viewnote, styles.shadow]}>
                  <TextInput
                    multiline={true}
                    numberOfLines={4}
                    textAlignVertical={'top'}
                    style={[styles.remindTextInput]}
                    onChangeText={setNote}
                    placeholder={'Nhập nhắc nhở'}
                    placeholderTextColor={Colors._BBBDBF}
                    value={note}
                  />
                </View>
                <View style={[styles.row, styles.marginTop10]}>
                  <TextBox style={styles.txtRemind}>{language.SettingAssignmentsScreen.RemindText_1}</TextBox>
                  <View style={[styles.ipNumberDate, !!err ? styles.errBorder : styles.shadow]}>
                    <TextInput
                      onChangeText={(value) => {
                        checknumberDate(value)
                      }}
                      onBlur={() => {
                        if (!numberDate) {
                          setnumberDate("0")
                        }
                      }}
                      value={numberDate}
                      keyboardType={'number-pad'}
                      style={[Platform.OS === 'ios' ? styles.numberDate : styles.numberDateAndroid]} />
                  </View>
                  <TextBox style={styles.txtRemind}> {language.SettingAssignmentsScreen.RemindText_2}</TextBox>
                </View>
                {!!err && <TextBox numberOfLines={null} style={styles.errText}>{err}</TextBox>}
              </View>
            }

            <View style={[styles.row, styles.marginBottom10]}>
              <View style={styles.width49}>
                <TextBox style={styles.txtStartDate}>{language.SettingAssignmentsScreen.StartDay}</TextBox>
              </View>
              <View style={styles.width49}>
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
                  // disabled={role !== 'SettingAssign' && checkChosenAllStudent()}
                  onPress={() => {
                    setStartAfter(!startAfter)
                  }}
                  isNotify={startAfter}
                  size={SmartScreenBase.smBaseWidth * 57}
                />
              </View>
              <TextBox numberOfLines={null} style={styles.txtStartAfter}>{language.SettingAssignmentsScreen.AllowCheckbox}</TextBox>
            </View>

            <SelectDateModal rangeDate={startDate} isVisible={modalVisible}
              minimunDate={moment().toDate()}
              onSave={(date) => {
                if (!!date) {
                  setStartDate(date)
                }
                // if (moment(startDate).format('X') > moment(endDate).format('X')) {
                //   setEndDate(startDate)
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

            <ShortMainButton
              onPress={onSave}
              type={1}
              isDisabled={checkDisableBtn()}
              text={role === 'SettingAssign' ? language.SettingAssignmentsScreen.MainButton_1 : language.SettingAssignmentsScreen.MainButton_2}
              style={styles.btnAssign}
              widthType={'full'}
            />
          </KeyboardAwareScrollView>
        </View>
      </LinearGradient>
      {/* <View style={[styles.btnDone]}>
      </View> */}
      <FullScreenLoadingIndicator
        visible={loading}
      />
    </>
  )
}