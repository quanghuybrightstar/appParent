import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, Modal, StyleSheet, Dimensions, TouchableOpacity, Image, TextInput, Alert, Platform } from 'react-native';
import { FontSize, FontWeight } from '../../styleApp/font';
import LinearGradient from 'react-native-linear-gradient';
import { TextBox } from '../TextBox';
import { ShortMainButton } from '../ShortMainButton';
import { SelectDateModal } from '../SelectDateModal';
import SmartScreenBase from '../../base/SmartScreenBase';
import { Colors } from '../../styleApp/color';
import ModalDropdown from 'react-native-modal-dropdown';
import moment from 'moment';
import FontBase from '../../base/FontBase';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TeacherTextJson } from '../../stringJSON/TeacherTextJson';
import { AppTextInput } from '../AppTextInput';


const width = Dimensions.get('window').width;

/**
 * @summary The ModalScoreManagement component 
 * 
 * @param {object} props 
 * @property {boolean} props.modalVisible: visible of the modal
 * @property {function} props.closeModal: close modal
 * @property {Array} props.listExamType: array of exam type
 * @property {Array} props.listScoreType:array of score type
 * @property {date} props.date: date
 * @property {funtion} props.closeWithOpen: close and open other modal
 * @property {funtion} props.onConfirm: confirm function
 * @property {Array} props.dataSemester: list of semester
 * 
 * @returns {Component}
 */
const ModalScoreManagement = ({ modalVisible, closeModal, listExamType, listScoreType, date, closeWithOpen, onConfirm, dataSemester, ...props }) => {
  //Score text
  const [valueScore, setValueScore] = React.useState('Điểm hệ số 1');
  //Exam text
  const [valueExam, setValueExam] = React.useState('Bài kiểm tra miệng');
  //Name of lesson
  const [text, setText] = React.useState('');
  //semester text
  const [valueSemester, setValueSemester] = useState('Học kỳ I')
  // id of exam
  const [idExam, setIdExam] = React.useState("oral");
  // id of score
  const [idScore, setIdScore] = React.useState('1');
  // id of semester
  const [idSemester, setIdSemester] = useState('1')
  //Check if semester is shown
  const [showSemester, setShowSemester] = useState(false)
  //Check if exam is shown
  const [showExam, setShowExam] = useState(false)
  // Check if score is shown
  const [showScore, setShowScore] = useState(false)

  const hkDrop = useRef()
  const typeDrop = useRef()
  const hsDrop = useRef()

  useEffect(() => {
    if (!!props.nameScore) {
      setText(props.nameScore && props.nameScore)
      setValueExam(props.type && listExamType.find(i => i.type === props.type).name)
      setValueScore(props.scorePercent && listScoreType.find(i => i.type === props.scorePercent).name)
      setValueSemester(props.semester && dataSemester.find(i => i.type === props.semester).name)
      setIdExam(props.type && props.type)
      setIdScore(props.scorePercent && props.scorePercent)
      setIdSemester(props.semester && props.semester)
    }
  }, [props.nameScore, props.semester, props.scorePercent, props.type, modalVisible])

  const confirm = () => {
    onConfirm(text.trim(), idExam, idScore, idSemester)
    setValueExam('Bài kiểm tra miệng')
    setValueSemester('Học kỳ I')
    setValueScore('Điểm hệ số 1')
    setText('')
    setIdExam('oral')
    setIdScore('1')
    setIdSemester('1')
    closeModal();
  }

  const onClose = () => {
    setValueExam('Bài kiểm tra miệng')
    setValueSemester('Học kỳ I')
    setValueScore('Điểm hệ số 1')
    setText('')
    setIdExam('oral')
    setIdScore('1')
    setIdSemester('1')
    closeModal();
  }

  const checkDisable = () => {
    if(text && text.trim().length > 0){
      return false
    }else{
      return true
    }
  }

  const renderRowModalHK = (option, index, isSelected) => {
    return (
      <TouchableOpacity 
        onPress={()=>{
          hkDrop.current.hide(); 
          setValueSemester(option.name); 
          setIdSemester(option.type);
          setShowSemester(false)
          }} 
        style={[styles.dropdown, { height: SmartScreenBase.smBaseHeight * 70 }]}>
        <TextBox text={option.name} style={styles.txtDropDown} />
      </TouchableOpacity >
    )
  }

  const renderRowModalType = (option, index, isSelected) => {
    return (
      <TouchableOpacity 
        onPress={()=>{
          typeDrop.current.hide(); 
          setValueExam(option.name)
          setIdExam(option.type)
          setShowExam(false)
          }} 
        style={[styles.dropdown, { height: SmartScreenBase.smBaseHeight * 70 }]}>
        <TextBox text={option.name} style={styles.txtDropDown} />
      </TouchableOpacity >
    )
  }

  const renderRowModalHS = (option, index, isSelected) => {
    return (
      <TouchableOpacity 
        onPress={()=>{
          hsDrop.current.hide(); 
          setValueScore(option.name);
          setIdScore(option.type);
          setShowScore(false)
          }} 
        style={[styles.dropdown, { height: SmartScreenBase.smBaseHeight * 70 }]}>
        <TextBox text={option.name} style={styles.txtDropDown} />
      </TouchableOpacity >
    )
  }

  return (

    <Modal
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <View style={styles.viewModal}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>

          <View style={styles.container}>
            <View style={styles.viewHeader}>
              <Text style={styles.txtHeader}>{props.nameScore ? "Sửa phiếu điểm" : TeacherTextJson.ScoreManagementScreen.PopupTitle}</Text>
              <TouchableOpacity style={styles.buttonClose} onPress={onClose}>
                <Image source={{ uri: 'icon_close' }}
                  style={styles.image}
                />
              </TouchableOpacity>
            </View>

            <LinearGradient
              colors={[Colors._B2F5E2, Colors._B2EAE8]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.viewChose}>
              <TextInput
                placeholder={'Nhập tên bài'}

                onChangeText={text => setText(text)}
                value={text}
                style={styles.txtInput}
                placeholderTextColor={Colors.LightGray}
              />
            </LinearGradient>
            <ModalDropdown
              ref={hkDrop}
              defaultIndex={1}
              options={dataSemester}
              // onSelect={(index, item) => {
              //   setValueSemester(item.name)
              //   setIdSemester(item.type)
              // }}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              onDropdownWillShow={() => setShowSemester(true)}
              onDropdownWillHide={() => setShowSemester(false)}
              renderRow={renderRowModalHK}
              dropdownStyle={[styles.drop, { height: SmartScreenBase.smBaseHeight * 70 * dataSemester.length }]}
            >
              <View style={{
                ...styles.outerBtn,
                borderWidth: showSemester ? 1 : 0,
                borderBottomRightRadius: showSemester ? 0 : SmartScreenBase.smPercenHeight * 5,
                borderBottomLeftRadius: showSemester ? 0 : SmartScreenBase.smPercenHeight * 5,
                ...styles.viewOption
              }}>
                <LinearGradient
                  colors={[Colors._B2F5E2, Colors._B2EAE8]}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={styles.viewChose}>
                  <Text style={styles.buttonText}>{valueSemester}</Text>
                  <View style={styles.icon}>
                    {showSemester ?
                      <Image source={{ uri: 'icon_drop1' }} style={styles.ic_drop} />
                      :
                      <Image source={{ uri: 'icon_drop' }} style={styles.ic_drop} />
                    }
                  </View>
                </LinearGradient>
              </View>
            </ModalDropdown>
            <ModalDropdown
              ref={typeDrop}
              defaultIndex={1}
              options={listExamType}
              showsVerticalScrollIndicator={false}
              onSelect={(index, item) => {
                setValueExam(item.name)
                setIdExam(item.type)
              }}
              scrollEnabled={false}
              renderRow={renderRowModalType}
              dropdownStyle={[styles.drop, { height: SmartScreenBase.smBaseHeight * 70 * listExamType.length }]}
              onDropdownWillShow={() => setShowExam(true)}
              onDropdownWillHide={() => setShowExam(false)}
            >
              <View style={{
                ...styles.outerBtn,
                borderWidth: showExam ? 1 : 0,
                borderBottomRightRadius: showExam ? 0 : SmartScreenBase.smPercenHeight * 5,
                borderBottomLeftRadius: showExam ? 0 : SmartScreenBase.smPercenHeight * 5,
                ...styles.viewOption
              }}>
                <LinearGradient
                  colors={[Colors._B2F5E2, Colors._B2EAE8]}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={styles.viewChose}>
                  <Text style={styles.buttonText}>{valueExam}</Text>
                  <View style={styles.icon}>
                    {showExam ?
                      <Image source={{ uri: 'icon_drop1' }} style={styles.ic_drop} />
                      :
                      <Image source={{ uri: 'icon_drop' }} style={styles.ic_drop} />
                    }
                  </View>
                </LinearGradient>
              </View>
            </ModalDropdown>
            <ModalDropdown
              ref={hsDrop}
              defaultIndex={1}
              options={listScoreType}
              showsVerticalScrollIndicator={false}
              onSelect={(index, item) => {
                setValueScore(item.name)
                setIdScore(item.type)
              }}
              renderRow={renderRowModalHS}
              dropdownStyle={[styles.drop, { height: SmartScreenBase.smBaseHeight * 70 * listScoreType.length }]}
              onDropdownWillShow={() => setShowScore(true)}
              onDropdownWillHide={() => setShowScore(false)}
            >
              <View style={{
                ...styles.outerBtn,
                borderWidth: showScore ? 1 : 0,
                borderBottomRightRadius: showScore ? 0 : SmartScreenBase.smPercenHeight * 5,
                borderBottomLeftRadius: showScore ? 0 : SmartScreenBase.smPercenHeight * 5,
                ...styles.viewOption
              }}>
                <LinearGradient
                  colors={[Colors._B2F5E2, Colors._B2EAE8]}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={styles.viewChose}>
                  <Text style={styles.buttonText}>{valueScore}</Text>
                  <View style={styles.icon}>
                    {showScore ?
                      <Image source={{ uri: 'icon_drop1' }} style={styles.ic_drop} />
                      :
                      <Image source={{ uri: 'icon_drop' }} style={styles.ic_drop} />
                    }
                  </View>
                </LinearGradient>
              </View>
            </ModalDropdown>
            <TouchableOpacity onPress={() => {
              closeWithOpen(text.trim(), idExam, idScore, idSemester)
            }}>
              <LinearGradient
                colors={[Colors._B2F5E2, Colors._B2EAE8]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={[styles.viewChose, { marginTop: 10 }]}>
                <Text style={[styles.buttonText, styles.txtDate]}>{moment(date).format('DD/MM/YYYY')}</Text>
              </LinearGradient>
            </TouchableOpacity>
            <ShortMainButton
              type={1} style={styles.button}
              onPress={confirm}
              text={'Tiếp tục'}
              textStyles={styles.txtbtn}
              isDisabled={checkDisable()}
              widthType="popup"
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    </Modal >
  );
}


const styles = StyleSheet.create({
  txtbtn: { ...FontWeight.SemiBold },
  txtDate: { fontFamily: FontBase.MyriadPro_Regular, fontWeight: 'normal' },
  icon: { alignSelf: 'center', position: 'absolute', right: 10, justifyContent: 'center' },
  viewOption: {
    marginTop: 10,
    marginLeft: 1,
  },
  outerBtn: {
    backgroundColor: Colors.White,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: Colors._DEDEDE,
    borderTopRightRadius: SmartScreenBase.smPercenHeight * 4.01,
    borderTopLeftRadius: SmartScreenBase.smPercenHeight * 4.01,
  },
  drop: {
    backgroundColor: Colors.White,
    borderBottomRightRadius: SmartScreenBase.smBaseWidth * 30,
    borderBottomLeftRadius: SmartScreenBase.smBaseWidth * 30,
    borderTopWidth: 0,
    borderColor: Colors._DEDEDE,
    width: SmartScreenBase.smPercenWidth * 100 - 100 + (Platform.OS === 'android' ? 2 : 2.2),
    borderWidth: 1,
    marginTop: Platform.OS === 'android' ? -1 : 0,
  },
  viewModal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: SmartScreenBase.smPercenWidth * 100 - 60,
    backgroundColor: Colors.White,
    borderRadius: 20,
    alignItems: 'center',
    paddingBottom: 10
  },
  viewHeader: {
    width: SmartScreenBase.smPercenWidth * 100 - 60,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10
  },
  txtHeader: {
    fontSize: FontSize.size60Font,
    color: Colors.Black,
    fontFamily: FontBase.MyriadPro_Bold,
    lineHeight: 25,
  },
  buttonClose: {
    position: 'absolute',
    right: 20,
    top: 10
  },
  image: {
    width: 20, height: 20
  },
  viewChose: {
    width: width - 100,
    paddingVertical: 10,
    borderRadius: SmartScreenBase.smPercenHeight * 100,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: SmartScreenBase.smPercenHeight * 7
  },
  buttonText: {
    fontSize: FontSize.size50Font,
    ...FontWeight.Bold
  },
  buttonTextBottom: {
    color: Colors.White,
    ...FontWeight.Bold,
    marginLeft: SmartScreenBase.smBaseWidth * 20,
  },
  button: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: SmartScreenBase.smBaseHeight * 30,
    marginBottom: SmartScreenBase.smBaseHeight * 20,
    borderRadius: SmartScreenBase.smBaseWidth * 100
  },
  dropdown: {
    width: SmartScreenBase.smPercenWidth * 100 - 100,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors._DEDEDE,
    paddingHorizontal: 20,
    height: SmartScreenBase.smBaseHeight * 60
  },
  txtDropDown: {
    fontSize: FontSize.size50Font,
    color: Colors.Black,
  },
  txtInput: {
    fontSize: FontSize.size50Font,
    paddingVertical: 0,
    // alignSelf: 'center',
    fontStyle: 'normal',
    fontFamily: FontBase.MyriadPro_Regular,
    color: Colors.Black,
    flex: 1,
    textAlign: 'center',
    paddingHorizontal: SmartScreenBase.smBaseWidth * 30
  },
  ic_drop: {
    width: SmartScreenBase.smBaseWidth * 90,
    height: SmartScreenBase.smBaseWidth * 90,
  }
})

export default ModalScoreManagement;