import React, { useState } from 'react';
import { FlatList, Text, View, Image, TouchableOpacity, Platform, TouchableWithoutFeedback } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import { AppHeader } from '../../../../componentBase/AppHeader';
import { TextBox } from '../../../../componentBase/TextBox';
import { CommonJson } from '../../../../stringJSON';
import { CompleteAssignJson } from '../../../../stringJSON/AssignManagentJson';
import { Colors } from '../../../../styleApp/color';
import { FontSize, FontWeight } from '../../../../styleApp/font';
import { CompleteAssignMethod } from './CompleteAssign.logic';
import { styles } from './CompleteAssign.style'
import Modal from 'react-native-modal'
import { FullScreenLoadingIndicator } from '../../../../componentBase/indicator/FullScreenLoadingIndicator';
import { ImageLesson } from '../../../../componentBase/ImageLesson';
import { ShortMainButton } from '../../../../componentBase/ShortMainButton'
import { SmallCheckBox } from '../../../../componentBase/SmallCheckBox';

/**
 * CompleteAssign Screen - Hoàn tất giao bài
 * @param {object} props props from redux and navigation
 * @returns {Component}
 */
export const CompleteAssign = (props) => {
  let { CheckLevel, removeItem, visible, setVisible, onEdit, checkFile, onAssign, data, loading } = CompleteAssignMethod(props)
  const language = useSelector(state => state.LanguageStackReducer.language)
  const [lesson, setLesson] = useState()
  const role = props.navigation.getParam('role')
  const dataLogin = useSelector(state => state.AuthStackReducer.dataLogin);
  /**
   * Function render item in Flat List
  */
  const renderItem = ({ item, index }) => {
    console.log("=====renderItemA",item)
    return (
      <TouchableWithoutFeedback onPress={() => onEdit(item)}>
      <View style={[styles.viewItem, { borderBottomWidth: index + 1 === data.length ? 0 : 1 }]}>
        <View style={styles.contentItem}>
          <Image style={styles.itemImg} source={{ uri: ImageLesson(item.lesson_type, item.sub_lesson_type) }} />
          <View style={styles.container}>
            <TextBox numberOfLines={null} style={[styles.txtTopic, styles.lesson_topic]}>
              {`${item.level === 'normal' || !item.level ? 'medium' : item.level}    ` + `${item.lesson_topic}`}
            </TextBox>
            <View
              style={[styles.viewLevel, { backgroundColor: CheckLevel(item.level) }]}>
              <TextBox numberOfLines={null} style={styles.txtLevel}>{item.level === 'normal' ? 'medium' : item.level}</TextBox>
            </View>
            <TextBox numberOfLines={null} style={styles.txtTopic}>
              {item.lesson_name}
            </TextBox>
            <TextBox style={styles.txtCurriculum} numberOfLines={null}>{item.curriculum_name}</TextBox>

            <View style={dataLogin.role != 'parent' ? styles.footerItem : styles.footerItemParent}>
              <View style={styles.row}>
              {dataLogin.role != 'parent' && 
                <>
                <Image source={{ uri: 'icon_file' }} style={styles.iconFile} />
                {checkFile(item) ?
                  <TextBox style={styles.txtfile}>{CompleteAssignJson.HaveFile}</TextBox>
                  :
                  <TextBox style={styles.txtfile}>
                    {CompleteAssignJson.HaventFile}
                  </TextBox>
                }
                </>
              }
              </View>
              <SmallCheckBox
                onPress={() => {
                  setVisible(true)
                  setLesson(item)
                }}
                isNotify={!!props.listAssignManagent && props.listAssignManagent.findIndex(i => i.lesson_id === item.lesson_id) !== -1}
                size={SmartScreenBase.smBaseWidth * 57}
              />
            </View>
          </View>
        </View>
      </View>
      </TouchableWithoutFeedback>
    )
  }
  return (
    <>
      <AppHeader
        navigation={props.navigation}
        title={'Danh sách bài đã chọn để giao'}
        leftIconOnPress={() => {
          props.navigation.pop()
        }}
        styleTitle={styles.txtHeader}
      />
      <LinearGradient
        style={{ flex: 1 }}
        colors={[Colors._E1FEF0, Colors._E1FEF0, Colors.White]}
        start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}>
        <FlatList

          bounces={false}
          indicatorStyle={'black'}
          contentContainerStyle={styles.paddingHorizontal35}
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.lesson_id}
          ListEmptyComponent={<><View style={styles.viewEmpty}><TextBox>Bạn chưa chọn bài tập nào để giao</TextBox></View></>}
        />
        <View style={role === 'assign' ? styles.footer : styles.viewBtn}>
          {role === 'assign' &&
            <ShortMainButton
              type={1}
              style={styles.btnAssign}
              textStyles={styles.txtAssign}
              onPress={() => props.navigation.navigate('ChooseCurruculum')}
              text={CompleteAssignJson.AddItem}
              widthType={'mini'}
            />
          }
          <ShortMainButton
            isDisabled={!data || data.length < 1}
            type={1}
            style={styles.btnAssign}
            textStyles={styles.txtAssign}
            onPress={onAssign}
            text={CompleteAssignJson.Complete}
            widthType={role === 'assign' ? 'mini' : 'full'}
          />
        </View>
      </LinearGradient>
      <Modal
        isVisible={visible}
        style={styles.viewmodal}
      >
        <View style={styles.viewModal}>
          <TextBox style={styles.contentModal} numberOfLines={null}>{CompleteAssignJson.Doyoudelete}</TextBox>
          <View style={[styles.horizontal, styles.btnModal]}>
            <ShortMainButton
              style={styles.btnCancel}
              textStyles={styles.txtCancel}
              onPress={() => setVisible(false)}
              text={CompleteAssignJson.Cancel}
              widthType={'popup'}
            />
            <ShortMainButton
              type={1}
              style={styles.btnDelete}
              textStyles={styles.txtAssign}
              onPress={() => removeItem(lesson)}
              text={CompleteAssignJson.Delete}
              widthType={'popup'}
            />
          </View>
        </View>

      </Modal>
      <FullScreenLoadingIndicator visible={loading} />
    </>
  )
}
