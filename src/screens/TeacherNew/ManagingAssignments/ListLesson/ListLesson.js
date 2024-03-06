import React, { useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import { AppHeader } from '../../../../componentBase/AppHeader';
import { TextBox } from '../../../../componentBase/TextBox';
import { FontSize, FontWeight } from '../../../../styleApp/font';
import { ListLessonMethod } from './ListLesson.logic';
import { styles } from './ListLesson.style'
import { CommonJson } from '../../../../stringJSON';
import { ImageLesson } from '../../../../componentBase/ImageLesson';
import { Colors } from '../../../../styleApp/color';
import { FullScreenLoadingIndicator } from '../../../../componentBase/indicator/FullScreenLoadingIndicator';
import { SmallCheckBox } from '../../../../componentBase/SmallCheckBox';
import LessonBase from '../../../../base/LessonBase';
import LogBase from '../../../../base/LogBase';
import MyData from '../../../../component/MyData';

/**
 * List Lesson Screen - Chọn bài để giao (Giao bài)
 * @param {Object} props prop from redux and navigation
 * @returns {Component}
 */
export const ListLesson = (props) => {
  const language = useSelector(state => state.LanguageStackReducer.language)
  let { Favorite, AssignCurriculum, CheckLevel, dataParam, loading, listLesson, showIsFavorite} = ListLessonMethod(props)

  const dataLogin = useSelector((state) => state.AuthStackReducer.dataLogin);
  /**
   * navigation function when click on lesson
   * @param {Object} item lesson
   */
  const clickLesson = (item) => {

    LogBase.log("=====clickLesson", item)
    LessonBase._moveLessonHS(item, props.navigation, true)
  }
  /**
   * render lesson
   * @param {Object} param0 lesson
   * @returns {Component}
   */
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => clickLesson(item)} style={styles.viewItem}>
        <View style={styles.contentItem}>
          <Image style={styles.itemImg} source={{ uri: ImageLesson(item.lesson_type, item.sub_lesson_type) }} />
          <View >
            <TextBox numberOfLines={null} style={[styles.txtTopic,]}>
              {`${item.level === 'normal' ? 'medium' : item.level}    ` + `${item.lesson_topic}`}
            </TextBox>
            <View
              style={[styles.viewLevel, { backgroundColor: CheckLevel(item.level) }]}>
              <TextBox style={styles.txtLevel}>{item.level === 'normal' ? 'medium' : item.level}</TextBox>
            </View>
            <TextBox style={[styles.txtName]} numberOfLines={null}>
              {item.lesson_name}
            </TextBox>
          </View>
        </View>
        <View style={dataLogin.role != 'parent' ? styles.footerItem : styles.footerItemParent}>
          {dataLogin.role != 'parent' && 
          <TouchableOpacity onPress={() => Favorite(item)} style={styles.favTouch}>
            <Image source={{ uri: showIsFavorite(item.lesson_id) ? 'favorite' : 'unfavorite' }} resizeMode={'contain'} style={styles.iconFavoite} />
          </TouchableOpacity>
          }
          { item.lesson_type != "skill_guide" ? <SmallCheckBox
            onPress={() => AssignCurriculum(item)}
            isNotify={!!props.listAssignManagent && props.listAssignManagent.findIndex(i => i.lesson_id === item.lesson_id) !== -1}
            size={SmartScreenBase.smBaseWidth * 56}
          /> : null }
        </View>
      </TouchableOpacity>
    )
  }
  return (
    <>
      <AppHeader
        navigation={props.navigation}
        title={dataParam.skill}
        leftIconOnPress={() => {
          props.navigation.pop()
        }}
        styleTitle={styles.txtHeader}
        rightComponent={() =>
          <TouchableOpacity onPress={() => props.navigation.navigate(MyData.mAssignType == 'auto' ? 'ListLessonResult' : 'CompleteAssign', { role: 'assign' })} style={styles.rightHeader}>
            <TextBox style={styles.txtRightHeader}>{CommonJson.AssignItem}</TextBox>
            <View style={styles.viewNumberAssign}>
              <TextBox style={styles.txtNumberAssign}>{`${props.listAssignManagent.length}`}</TextBox>
            </View>
          </TouchableOpacity>
        }
      />
      <LinearGradient
        style={{ flex: 1 }}
        colors={[Colors._E1FEF0, Colors._E1FEF0, Colors.White]}
        start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}>

        <FlatList

          bounces={false}
          indicatorStyle={'black'}
          contentContainerStyle={styles.flatlist}
          data={listLesson}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.lesson_id + index.toString()}
        />
      </LinearGradient>
      <FullScreenLoadingIndicator
        visible={loading}
      />
    </>
  )
}
