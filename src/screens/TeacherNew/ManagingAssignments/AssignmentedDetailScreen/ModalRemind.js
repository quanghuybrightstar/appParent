import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal'
import { useSelector } from 'react-redux';
import API from '../../../../API/APIConstant';
import APIBase from '../../../../base/APIBase';
import FontBase from '../../../../base/FontBase';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import { ShortMainButton } from '../../../../componentBase/ShortMainButton';
import { TextBox } from '../../../../componentBase/TextBox';
import { Colors } from '../../../../styleApp/color';
import { FontSize, FontWeight } from '../../../../styleApp/font';
import LogBase from '../../../../base/LogBase';

/**
 * 
 * @param {object} props 
 * @property {boolean} visible Visible of modal
 * @property {function} hideModal Action hide modal
 * @property {object} studentChoose Selected student information
 * @property {number} exercise_id selected excercise id
 * @property {function} reloadData callback reload data after submitting
 * @property {function} setStudentChoose set selected student
 * @returns {Component}
 */
export const ModalRemind = (props) => {
  let { visible, hideModal, studentChoose, exercise_id, reloadData, setStudentChoose } = props
  const language = useSelector(state => state.LanguageStackReducer.language)
  const [contentSchedule, setContentSchedule] = useState('')
  const [loading, setLoading] = useState(false)
  /**
   * Function save the reminder and do the callback action
  */
  const onRemind = async () => {
    LogBase.log("=====contentSchedule",contentSchedule)
    let form = new URLSearchParams();
    form.append("list_user_exercise_id", JSON.stringify(studentChoose));
    form.append("msg", contentSchedule);
    setLoading(true)
    const res = await APIBase.tokenAPI('post', API.baseurl + API.remindAll, form, {
      'Content-Type': 'application/x-www-form-urlencoded'
    })
    setLoading(false)
    let data = res.data;
    if (data.hasOwnProperty('status') && data.status) {
      hideModal()
      setContentSchedule('')
      reloadData()
      setStudentChoose([])
    }
  }
  const onClose = () => {
    hideModal()
    setContentSchedule('')
  }
  return (
    <Modal isVisible={visible}
      style={styles.viewmodal}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.keyboard}>
        <View style={styles.container}>
          <TextBox style={styles.txtTitle}>{language.AssignmentedDetailScreen.ModalTittle}</TextBox>
          <View style={styles.viewIp}>
            <TextInput
              multiline={true}
              placeholder={language.AssignmentedDetailScreen.ModalTextHoder}
              textAlignVertical={'top'}
              value={contentSchedule}
              placeholderTextColor={Colors._BBBDBF}
              onChangeText={setContentSchedule}
              style={styles.ip}
            />
          </View>
          <View style={styles.row}>
            <ShortMainButton
              onPress={onClose}
              style={styles.btnCancel}
              textStyles={styles.txtCancel}
              text={language.AssignmentedDetailScreen.ModalButton_1}
              widthType={'popup'}
            />
            <ShortMainButton
              type={1}
              loading={loading}
              isDisabled={contentSchedule.trim().length == 0}
              onPress={onRemind}
              style={styles.btnConfirm}
              textStyles={styles.txtConfirm}
              text={language.AssignmentedDetailScreen.ModalButton_2}
              widthType={'popup'}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </Modal>
  )
}
export const styles = StyleSheet.create({
  viewmodal: { margin: 0, backgroundColor: Colors._00000070 },
  keyboard: { flexGrow: 1, justifyContent: 'center' },
  container: {
    backgroundColor: Colors.White,
    marginHorizontal: SmartScreenBase.smBaseWidth * 40,
    paddingHorizontal: SmartScreenBase.smBaseWidth * 40,
    borderRadius: SmartScreenBase.smBaseWidth * 20,
    paddingVertical: SmartScreenBase.smBaseWidth * 50,

  },
  ip: {
    height: SmartScreenBase.smPercenHeight * 20,
    fontSize: FontSize.size50Font,
    lineHeight: FontSize.size50Font,
    fontFamily: FontBase.MyriadPro_Regular,
    color: Colors.Black
  },
  txtTitle: {
    alignSelf: 'center',
    fontSize: FontSize.size60Font
  },
  viewIp: {
    borderWidth: 0.5,
    borderColor: Colors._7F7F7F,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 10
  },
  btnCancel: {
    width: SmartScreenBase.smPercenWidth * 40,
    borderWidth: 1,
    borderColor: Colors._00B9B6,
    borderRadius: SmartScreenBase.smBaseWidth * 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnConfirm: {
    width: SmartScreenBase.smPercenWidth * 40,
    borderRadius: SmartScreenBase.smBaseWidth * 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtCancel: {
    fontSize: FontSize.size55Font,
    color: Colors._00B9B6,
  },
  txtConfirm: {
    fontSize: FontSize.size55Font,
    color: Colors.White
  }
})