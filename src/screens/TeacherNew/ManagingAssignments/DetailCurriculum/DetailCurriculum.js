import React, { useState } from 'react';
import { FlatList, Image, ImageBackground, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Loading from '../../../../component/LoadingScreen';
import { AppHeader } from '../../../../componentBase/AppHeader';
import { TextBox } from '../../../../componentBase/TextBox';
import { CommonJson } from '../../../../stringJSON';
import { FontSize } from '../../../../styleApp/font';
import stylesApp from '../../../../styleApp/stylesApp';
import { stylesHistory } from '../../../Student/StudyForTest/styles';
import { DetailCurriculumMethod } from './DetailCurriculum.logic';
import { MapList } from './mapList';
import { styles } from './DetailCurriculum.style'
import { Colors } from '../../../../styleApp/color';
import MyData from '../../../../component/MyData';

/**
 * DetailCurriculum Screen - Chi tiết giáo trình (Giao bài)
 * @param {object} props props from redux and navigation
 * @returns {Component}
 */
export const DetailCurriculum = (props) => {
  let {
    isLoading,
    dataMapList, curriculumName, curriculumID
  } = DetailCurriculumMethod(props)
  return (
    <>
      <View style={styles.flex1}>
        {
          isLoading && <ImageBackground
            source={{ uri: 'imagebackground' }}
            imageStyle={stylesApp.ImageBackGround}
            style={stylesHistory.loading}>
            <Loading />
          </ImageBackground>
        }
        <AppHeader
          navigation={props.navigation}
          title={props.navigation.getParam('nameUnit')}
          leftIconOnPress={() => {
            props.navigation.pop()
          }}
          styleTitle={{ fontSize: FontSize.size60Font }}
          rightComponent={() =>
            <TouchableOpacity onPress={() => props.navigation.navigate(MyData.mAssignType == 'auto' ? 'ListLessonResult' : 'CompleteAssign', { role: 'assign', curiID: props.navigation.getParam('id') })} style={styles.rightHeader}>
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

          <MapList
            data={dataMapList}
            navigation={props.navigation}
            curriculumName={curriculumName}
            curriculumID={curriculumID}
          />
        </LinearGradient>
      </View>
    </>
  )
}