import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, View, Image, FlatList, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { TabView } from 'react-native-tab-view';
import { useSelector } from 'react-redux';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import { AppHeader } from '../../../../componentBase/AppHeader';
import { FullScreenLoadingIndicator } from '../../../../componentBase/indicator/FullScreenLoadingIndicator';
import { ShortMainButton } from '../../../../componentBase/ShortMainButton';
import { TextBox } from '../../../../componentBase/TextBox';
import { CommonJson, CurriculumTeacherJson } from '../../../../stringJSON';
import { Colors } from '../../../../styleApp/color';
import { FontSize } from '../../../../styleApp/font';
import { ChooseCurriculumMethod } from './ChooseCurrulum.logic';
import { styles } from './ChooseCurrulum.style';
import Modal from 'react-native-modal'
import { ChooseCurriculumJson } from '../../../../stringJSON/AssignManagentJson';
import { ModalFilterCommon } from '../../../../componentBase/ModalFilter';
import MyData from '../../../../component/MyData';

/**
 * ChooseCurruculum Screen - Chọn giáo trình (Giao bài)
 * @param {object} props props from redux and navigation
 * @returns {Component}
 */
export const ChooseCurruculum = (props) => {
  const language = useSelector(state => state.LanguageStackReducer.language)

  let { routerGradle, curriculumSunday, loading, myCurriculum, modalBack, setModalBack, goBack, tabview, setTabview, onFilter, visible, setVisible } = ChooseCurriculumMethod(props)
  const [routesMyCurriculum] = React.useState([
    { key: 0, title: language.CourseListTCScreen.Course, count: 0 },
    { key: 1, title: language.CourseListTCScreen.Favorite, count: 0 },

  ]);
  const [indexSunday, setIndex] = React.useState(0);
  const [indexMyCurriculum, setIndexMyCurriculum] = React.useState(0);

  const dataLogin = useSelector((state) => state.AuthStackReducer.dataLogin)

  /**
   * Function render Scene for Sunday English Curriculum
  */
  const _renderScene = () => {
    return (
      <View style={styles.scene}>
        <FlatList
          indicatorStyle={'black'}
          horizontal
          bounces={false}
          contentContainerStyle
          data={curriculumSunday.filter(item => item.grade_id === tabview)}
          renderItem={_renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.flatlist}
        />
      </View>
    );
  };

  /**
   * Function render Scene for My Curriculum
  */
  const _renderScene2 = () => {
    if (indexMyCurriculum === 1) {
      return (
        <View style={[styles.scene, styles.viewFav]}>
          <TouchableOpacity onPress={() => props.navigation.navigate('FavoriteAssignments')} style={styles.renderItem}>
            <Image source={{ uri: 'img_curriculum' }} style={styles.imgItem} />
            <TextBox numberOfLines={2} style={styles.txtNameItem}>{CurriculumTeacherJson.FavLessonTitle}</TextBox>
          </TouchableOpacity>
        </View>
      )
    }
    return (
      <View style={styles.scene}>
        <FlatList
          indicatorStyle={'black'}
          horizontal
          bounces={false}
          contentContainerStyle
          data={myCurriculum}
          renderItem={_renderItem}
          keyExtractor={(item, index) => item.id + index.toString()}
          contentContainerStyle={styles.flatlist}
          ListEmptyComponent={<TextBox style={styles.txtEmpty} numberOfLines={null}>Bạn chưa có giáo trình nào. Hãy tạo giáo trình của mình!</TextBox>}
        />
      </View>
    );
  };

  /**
   * Function render curriculum item in Flat List
  */
  const _renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('DetailCurriculum', { id: item.id, nameUnit: item.name })} style={styles.renderItem}>
        <Image source={{ uri: 'img_curriculum' }} style={styles.imgItem} />
        <TextBox numberOfLines={2} style={styles.txtNameItem}>{item.name}</TextBox>
        <TextBox style={styles.txtNumberCount}>{item.num_unit} {language.CourseListTCScreen.Unit}</TextBox>
      </TouchableOpacity >
    )
  }

  /**
   * Function render Tab bar for Sunday English Curriculum
  */
  const _renderItemTabbar = ({ item }) => {
    return (
      <View style={[styles.renderItemTabbar, { borderBottomWidth: indexSunday === item.key ? 3 : 0, ...styles.width4 }]}>
        <TouchableOpacity
          style={styles.btnTab}
          onPress={() => {
            setIndex(item.key)
            setTabview(item.count)
          }}
        >
          <TextBox style={styles.colorBlack}>{`${item.title}`}</TextBox>
        </TouchableOpacity>
      </View>
    )
  }

  /**
     * Function render Tab bar for My Curriculum
     */
  const _renderItemTabbarMyCurriculum = ({ item }) => {
    return (
      <View style={[styles.renderItemTabbar, { borderBottomWidth: indexMyCurriculum === item.key ? 3 : 0, ...styles.width2 }]}>
        <TouchableOpacity
          style={styles.btnTab}
          onPress={() => setIndexMyCurriculum(item.key)}
        >
          <TextBox style={styles.colorBlack}>{`${item.title}`}</TextBox>
        </TouchableOpacity>
      </View >
    )
  }

  /**
    * Function render Tab bar
  */
  const renderTabbar = (value) => {
    return (
      <View style={styles.renderTabbar} >
        <FlatList

          bounces={false}
          indicatorStyle={'black'}
          data={value === 'SundayEnglish' ? routerGradle : routesMyCurriculum}
          renderItem={value === 'SundayEnglish' ? _renderItemTabbar : _renderItemTabbarMyCurriculum}
          keyExtractor={(index) => index.toString()}
          scrollEnabled={false}
          // numColumns={routes.length}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    )

  }
  return (
    <>
      <AppHeader
        navigation={props.navigation}
        title={CommonJson.ChooseCurriculum}
        leftIconOnPress={() => {
          // if (props.listAssignManagent.length > 0) {
          //   setModalBack(true)
          // } else {
            props.navigation.pop()
          // }
        }
        }
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
                <View style={styles.scrollview}>
                <ScrollView>
                    <View style={styles.content}>
                    <View style={styles.body}>
                        <View style={styles.horizontal}>
                            <TextBox style={styles.txtCurriSundayEnglish}>{language.CourseListTCScreen.TittleTopList}</TextBox>
                            <TouchableOpacity onPress={() => setVisible(true)} style={styles.viewFilter}>
                                <Image source={{ uri: "filter" }} style={styles.iconFilter} resizeMode={'contain'} />
                                <View style={styles.border} />
                                <TextBox style={styles.txtFilter}>{language.CourseListTCScreen.FilterBt}</TextBox>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.tabview1}>
                        <TabView
                            navigationState={{ index: indexSunday, routes: routerGradle }}
                            renderScene={_renderScene}
                            onIndexChange={setIndex}
                            renderTabBar={() => renderTabbar('SundayEnglish')}
                            swipeEnabled={false}
                        />
                    </View>
                    {dataLogin.role != 'parent' && 
                    <View style={styles.body}>
                        <View style={styles.horizontal}>
                            <TextBox style={styles.txtCurriSundayEnglish}>{CurriculumTeacherJson.MyCurriculum}</TextBox>
                            {/* <TouchableOpacity onPress={() => setModalAddCurriculum(true)}>
                                <LinearGradient
                                    style={styles.viewAdd}
                                    colors={[Colors.LightGreen, Colors.BaseGreen,]}
                                    start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0 }}>

                                    <Image source={{ uri: "add" }} style={styles.iconadd} resizeMode={'contain'} />
                                    <TextBox style={styles.txtAdd}>{language.CourseListTCScreen.CreateBt}</TextBox>
                                </LinearGradient>
                            </TouchableOpacity> */}
                        </View>

                    </View>
                    }
                    
                    {dataLogin.role != 'parent' && 
                    <View style={styles.tabview2}>
                        <TabView
                            navigationState={{ index: indexMyCurriculum, routes: routesMyCurriculum }}
                            renderScene={_renderScene2}
                            onIndexChange={setIndexMyCurriculum}
                            renderTabBar={() => renderTabbar('MyCurriculum')}
                            swipeEnabled={false}
                        />
                    </View>
                    }
                    </View>
                </ScrollView>
                </View>
      </LinearGradient>
      <ModalFilterCommon
        visible={visible}
        hideModal={() => setVisible(false)}
        dataGrade={routerGradle}
        showKeyword={true}
        showLevel={true}
        showGrade={true}
        onFilter={(param) => onFilter(param)}
        clearData={true}
        cancel={true}
      />
      <FullScreenLoadingIndicator
        visible={loading}
      />
      <Modal
        isVisible={modalBack}
        style={{
          margin: 0,
          justifyContent: 'center'
        }}
      >
        <View style={styles.viewModal}>
          <TextBox style={styles.contentModal} numberOfLines={null}>{ChooseCurriculumJson.doyouBack}</TextBox>
          <TextBox style={[styles.contentModal, styles.marginTop10]} numberOfLines={null}>{ChooseCurriculumJson.listDelete}</TextBox>
          <View style={[styles.horizontal, styles.viewBtn]}>
            <ShortMainButton
              text={ChooseCurriculumJson.Cancel}
              textStyles={styles.txtCancel}
              style={styles.btnCancel}
              onPress={() => setModalBack(false)}
              widthType={'popup'}
            />
            <ShortMainButton
              type={1}
              text={ChooseCurriculumJson.Apply}
              textStyles={styles.txtAssign}
              style={styles.btnDelete}
              onPress={goBack}
              widthType={'popup'}
            />
          </View>
        </View>

      </Modal>
    </>
  )
}