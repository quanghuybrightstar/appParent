import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ImageBackground,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
// import {FlatList} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import API from '../../../../API/APIConstant';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import axios from 'axios';
import styles from './ManageExerciseAClass.style';
import HeaderStudentClass from '../../../../component/HeaderStudentClass';
import LoadingScreen from '../../../LoadingScreen';
import {AppHeader} from '../../../../componentBase/AppHeader';
import APIBase from '../../../../base/APIBase';
import FontBase from '../../../../base/FontBase';
import {Colors} from '../../../../styleApp/color';
import LessonBase from '../../../../base/LessonBase';
import LogBase from '../../../../base/LogBase';
import {SmPopup} from '../../../../componentBase/SmPopup/SmPopup';
import {CommonJson} from '../../../../stringJSON';
import {manageExerciseClassLogic} from './ManageExerciseAClass.logic';

export const ManageExerciseAClass = props => {
  const {navigation} = props;
  const {id} = navigation.state.params;
  const dataLogin = useSelector(state => state.AuthStackReducer.dataLogin);

  let {
    loading,
    data,
    mesPopup,
    showPopup,
    curItemDT,
    checkStatus,
    onNavigateHomeworkDetail,
    _handleDoExercise,
    setShowPopup,
  } = manageExerciseClassLogic(props);

  const _renderStringNumber = number => {
    return (number.toString().length === 0 ? '0' : '') + number;
  };

  const _renderCount = (countDone, countUser) => {
    const bg = pickColor(countDone, countUser);
    return (
      <View style={[styles.viewCount, {backgroundColor: bg}]}>
        <Text style={styles.textCount}>{`${countDone}/${countUser}`}</Text>
      </View>
    );
  };

  const _renderScore = mItem => {
    return (
      <View style={[styles.viewCount, {backgroundColor: '#ED8A22'}]}>
        <Text style={styles.textCount}>
          {mItem.status == 1 ? 'Điểm: ' + mItem.score : 'Chờ chấm'}
        </Text>
      </View>
    );
  };

  const pickColor = (done, user) => {
    // let color = '#113254';
    // if (done == user){
    //     color = '#36AE4A';
    // } else if (done == 0){
    //     color = '#DC4630';
    // } else if (done < user){
    //     color = '#ED8A22';
    // }
    // return color;
    return Colors.Orange;
  };

  const renderImage = (exercise_type, lessonType) => {
    switch (exercise_type) {
      case 'grammar':
        if (lessonType === 'skill_guide') {
          return 'grammar_guide';
        }
        return 'grammar';
      case 'listening':
        return 'listening';
      case 'mini_test':
        return 'minitest';
      case 'exam':
        return 'minitest';
      case 'project':
        return 'project1';
      case 'pronunciation':
        return 'pronunication';
      case 'reading':
        return 'reading';
      case 'speaking':
        return 'speaking';
      case 'vocabulary':
        return 'vocal';
      case 'writing':
        return 'writing1';
      case 'placement_test':
        return '';
      case 'mock_test':
        return '';
      case 'skill_guide':
        return '';
      default:
        return '';
    }
  };

  const _renderItem = ({item, index}) => {
    const startTime =
      item.start_time && new Date(item.start_time.split(' ')[0]);
    const endTime = item.end_time && new Date(item.end_time.split(' ')[0]);
    return (
      <TouchableOpacity
        onPress={() => {
          checkStatus(item);
        }}
        style={styles.viewItem}>
        <View style={styles.exerciseThumbnailBox}>
          <Image
            source={{
              uri: renderImage(item?.exercise_type || '', item.lesson_type),
            }}
            style={styles.imageToAvatar}
          />
          {item.status == -1 && dataLogin.role != 'parent' && (
            <TouchableOpacity
              style={styles.buttonDoExercise}
              onPress={() => _handleDoExercise(item)}>
              <Text style={styles.textDoExercise}>LÀM BÀI</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.viewRightItem}>
          <View>
            {/* <Text numberOfLines={1} style={styles.textUnitName}>{item.topic}</Text> */}
            <Text numberOfLines={2} style={styles.textCurriculumName}>
              {item.exercise_name}
            </Text>
          </View>
          <View style={styles.viewDate}>
            <Text
              style={[
                styles.textDate,
                {color: pickColor(item.count_done, item.count_user)},
              ]}>{`${
              startTime ? _renderStringNumber(startTime.getDate()) : '__'
            }/${
              startTime ? _renderStringNumber(startTime.getMonth() + 1) : '__'
            }/${startTime ? startTime.getFullYear() : '____'}`}</Text>
            <Image source={{uri: 'gv_51'}} style={styles.iconDate} />
            <Text
              style={[
                styles.textDate,
                {color: pickColor(item.count_done, item.count_user)},
              ]}>{`${endTime ? _renderStringNumber(endTime.getDate()) : '__'}/${
              endTime ? _renderStringNumber(endTime.getMonth() + 1) : '__'
            }/${endTime ? endTime.getFullYear() : '____'}`}</Text>
          </View>
        </View>

        {item.status != -1 && (
          <Image source={{uri: 'hv_class_05'}} style={styles.iconStatus} />
        )}
        {/* {_renderCount(item.count_done, item.count_user)} */}
        {item.status != -1 ? _renderScore(item) : null}
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground style={styles.container} source={{uri: 'bgtuvung'}}>
      <AppHeader
        title={'Bài tập'}
        leftIconOnPress={() => {
          props.navigation.pop();
        }}
      />
      {loading ? (
        <LoadingScreen />
      ) : (
        <View style={styles.containerContent}>
          {data.length > 0 ? (
            <FlatList
              data={data}
              renderItem={_renderItem}
              keyExtractor={(item, index) => 'item' + index.toString()}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={() => (
                <View style={{marginVertical: 15}}></View>
              )}
            />
          ) : (
            !loading && (
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  paddingTop: SmartScreenBase.smPercenHeight * 5,
                }}>
                <Text
                  style={{
                    fontFamily: FontBase.MyriadPro_Regular,
                    fontSize: SmartScreenBase.smFontSize * 50,
                    color: Colors.NearBlack,
                  }}>
                  {dataLogin.role != 'parent'
                    ? 'Bạn chưa được giáo viên giao bài tập nào'
                    : 'Con chưa được giáo viên giao bài tập nào'}
                </Text>
              </View>
            )
          )}
        </View>
      )}
      <SmPopup
        visible={showPopup}
        message={mesPopup}
        cancelText={CommonJson.No}
        confirmText={CommonJson.Yes}
        contentStyles={styles.modalBox}
        messageStyle={[styles.messageModalStyle, styles.messageDeleteStyle]}
        cancelOnpress={() => setShowPopup(false)}
        confirmOnpress={() => {
          if (curItemDT.status == 0) {
            setShowPopup(false);
            _handleDoExercise(curItemDT);
          } else {
            setShowPopup(false);
            onNavigateHomeworkDetail(curItemDT);
          }
        }}
      />
    </ImageBackground>
  );
};
