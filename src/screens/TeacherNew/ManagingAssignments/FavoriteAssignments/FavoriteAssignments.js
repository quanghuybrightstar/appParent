import React from 'react';
import { useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import { AppHeader } from '../../../../componentBase/AppHeader';
import { TextBox } from '../../../../componentBase/TextBox';
import { FontSize, FontWeight } from '../../../../styleApp/font';
import { styles } from './FavoriteAssignments.style';
import { FavoriteAssignmentsMethod } from './FavoriteAssignments.logic'
import { CommonJson } from '../../../../stringJSON';
import { Colors } from '../../../../styleApp/color';
import { FullScreenLoadingIndicator } from '../../../../componentBase/indicator/FullScreenLoadingIndicator';
import { ImageLesson } from '../../../../componentBase/ImageLesson';
import { SmallCheckBox } from '../../../../componentBase/SmallCheckBox';
import LessonBase from '../../../../base/LessonBase';
import MyData from '../../../../component/MyData';

/**
 * Favourite Assignment Screen
 * @param {Object} props props from redux and navigation
 * @returns {Component}
 */
export const FavoriteAssignment = (props) => {
  const [dataParam] = useState(props.navigation.getParam('data'))
  let { AssignCurriculum, data, Delete, loading, isReachedEnd, debounceEvent,
    loadMore } = FavoriteAssignmentsMethod(props)
  const language = useSelector(state => state.LanguageStackReducer.language);
  console.log("---FavoriteAssignment", data);
  /**
   * Check level of lesson
   * @param {string} value level
   * @returns {Color}
   */
  const CheckLevel = (value) => {
    if (value === 'easy') {
      return Colors._6EBF49
    } else if (value === 'normal') {
      return Colors.Orange
    } else if (value === 'hard') {
      return Colors._BE1E2D
    }
  }

  /**
   * navigation function when click on lesson
   * @param {Object} item lesson
   */
  const clickLesson = (item) => {
    var dataR = item
    dataR.unit_id = 184
    dataR.exam_id = item.lesson_id;
    LessonBase._moveLessonHS(dataR, props.navigation, true)
  }

  /**
   * Render Assignment
   * @param {Object} param0 Assignment
   * @returns {Component}
   */
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => clickLesson(item)} style={styles.viewItem}>
        <View style={styles.contentItem}>
          <Image style={styles.itemImg} source={{ uri: ImageLesson(item.lesson_type, item.sub_lesson_type) }} />
          <View style={styles.flex1}>
            <TextBox numberOfLines={null} style={[styles.txtTopic, styles.lesson_topic]}>
              {`${item.level === 'normal' ? 'medium' : item.level}    ` + `${item.topic}`}
            </TextBox>
            <View
              style={[styles.viewLevel, { backgroundColor: CheckLevel(item.level) }]}>
              <TextBox style={styles.txtLevel}>{item.level === 'normal' ? 'medium' : item.level}</TextBox>
            </View>
            <TextBox style={styles.txtTopic} numberOfLines={null}>
              {item.exercise_name}
            </TextBox>
            <TextBox style={[styles.txtTopic, styles.txtCurriculum]} numberOfLines={null}>
              {item.curriculum_name}
            </TextBox>
            <View style={[styles.horizontal, styles.viewAssign]}>
              <View style={styles.viewNumberExercise}>
                <TextBox style={styles.txtNumber} numberOfLines={null}>
                  {item.number_exercise} {language.MyFavoriteScreen.AssignTime}
                </TextBox>
              </View>
              <View style={styles.footerItem}>
                <TouchableOpacity onPress={() => Delete(item)} style={styles.favTouch}>
                  <Image source={{ uri: 'favorite' }} resizeMode={'contain'} style={styles.iconFavoite} />
                </TouchableOpacity>
                <SmallCheckBox
                  onPress={() => AssignCurriculum(item)}
                  isNotify={!!props.listAssignManagent && props.listAssignManagent.findIndex(i => i.exercise_id === item.exercise_id) !== -1}
                  size={SmartScreenBase.smBaseWidth * 57}
                />
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>

    )
  }
  return (
    <>
      <AppHeader
        navigation={props.navigation}
        title={language.MyFavoriteScreen.Header}
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
        style={styles.flex1}
        colors={[Colors._E1FEF0, Colors._E1FEF0, Colors.White]}
        start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}>

        <FlatList
          indicatorStyle={'black'}
          contentContainerStyle={styles.flatlist}
          data={data}
          renderItem={renderItem}
          ListEmptyComponent={()=> {
            return <View>
                <Text style={styles.txtEmptyContent}>
                    Bạn chưa có bài tập yêu thích nào
                </Text>
            </View>;
        }}
          onEndReached={debounceEvent(() => {
            loadMore()
          }, 200)}
          ListFooterComponent={() => (
            <View style={styles.footerFlatlist}>
              {isReachedEnd && <ActivityIndicator />}
            </View>
          )}
          keyExtractor={item => item.id + ''}
        />
      </LinearGradient>
      <FullScreenLoadingIndicator
        visible={loading}
      />
    </>
  )

}