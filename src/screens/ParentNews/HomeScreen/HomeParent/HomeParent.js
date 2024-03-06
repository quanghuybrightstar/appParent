import * as React from 'react';
import {
  FlatList,
  Image,
  View,
  RefreshControl,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  Animated,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import {Colors} from '../../../../styleApp/color';
import {TextBox} from '../../../../componentBase/TextBox';
import {homeParentLogic} from './HomeParent.logic';
import {FullScreenLoadingIndicator} from '../../../../componentBase/indicator';
import {
  arrow_down_dark_icon,
  icrease_avg_icon,
  decrease_avg_icon,
  arrow_left_dark_icon,
  arrow_right_dark_icon,
} from '../../../../assets/icon';
import {useSelector} from 'react-redux';
import {ParentText} from '../../../../stringJSON/ParentTextJson';
import {useRef} from 'react';
import stylesApp from '../../../../styleApp/stylesApp';
import styles from './HomeParent.style';
import {BoxExerciseInfor} from '../../../../component/BoxExerciseInfor/BoxExerciseInfor';
import ActivityDiary from '../../../AchievementBoardNewScreen/ActivityDiary';
import {NewAchievement} from '../../../AchievementBoardNewScreen/AchivementOnlineScreen';
import {ModalInforLearned} from '../../../../component/ModalInforLearned/ModalInforLearned';
import {FontWeight} from '../../../../styleApp/font';
import LineChartInforLearned from '../../../../component/ChartInforLearned/ChartInforLearned';
import {SkillAvgLabel} from '../../../../component/SkillAvgLabel/SkillAvgLabel';
import {renderHeaderBox, BoxAvg} from '../../../../component/BoxAvg/BoxAvg';
import API from '../../../../API/APIConstant';

export const HomeParent = props => {
  let {
    currChild,
    visibleModalInfor,
    typeInforLearned,
    dataTimeLearning,
    dataChildren,
    loading,
    openListChildren,
    handleOpenListChildren,
    handleSelectChild,
    setOpenListChildren,
    typeAvgSkill,
    setTypeAvgSkill,
    handleNavigateDetailActivity,
    handleChangeTypeLearned,
    handleCloseModalInfor,
    handleSelectPoint,
    pointInfor,
    dataAvgSkill,
    dataReportExercise,
    dataAvgExam,
    dataAvgExercise,
    dataParamExam,
    dataParamExercise,
    setDataParamExam,
    setDataParamExercise,
    totalScore,
    dataTimeStudyMonth,
    dataExerciseWordMonth,
    dataParamSkills,
    setDataParamSkills,
    handleRefreshData,
  } = homeParentLogic(props);

  const scrollA = useRef(new Animated.Value(0)).current;
  const childSelected = useSelector(
    state => state.ManageChildrenReducer.childSelected,
  );

  const convertData = (mData, mType) => {
    LogBase.log('=====convertData not yet', mData);
    if (mType == 'data_chart_lesson') return mData[mType]?.data || [0, 0, 0, 0];
    if (mType == 'data_chart_diamond')
      return mData[mType]?.data || [0, 0, 0, 0];
    if (mType == 'data_chart_duration') {
      var mlist = [];
      mData[mType]?.data.forEach(element => {
        mlist.push(Math.round(element / 60) || 0);
      });
      return mlist;
    }
  };

  // Diamond Achievement
  const Diamond = ({text}) => {
    return (
      <View style={stylesApp.flexAlignCenter}>
        <Text style={styles.diamondTxt}>{text}</Text>
        <Image
          source={{
            uri: 'diamong_tt',
          }}
          style={styles.diamondImg}
        />
      </View>
    );
  };

  // Func Render Infor Child
  const renderInforChild = (item, typeChild) => {
    return (
      <TouchableOpacity
        onPress={() =>
          typeChild == 'currentChild'
            ? handleOpenListChildren(item)
            : handleSelectChild(item)
        }
        activeOpacity={0.8}
        key={item?.id}
        style={[styles.item_student]}>
        <View
          style={[
            styles.flexRow,
            styles.item_student_wrapper,
            typeChild != 'currentChild' && styles.itemStudentRemaining,
          ]}>
          <View style={[styles.flex1, styles.item_student_infor]}>
            <FastImage
              source={{
                uri: !!item.avatar
                  ? API.domain + item.avatar
                  : 'student_profile_image4',
              }}
              style={{
                width: 58,
                height: 58,
                borderRadius: SmartScreenBase.smPercenWidth * 25,
                borderWidth: 2.5,
                borderColor: Colors.White,
                ...styles.boxShadow,
              }}
            />
            <View style={[styles.flexColumn, styles.item_student_desc]}>
              <TextBox style={styles.item_student_name}>
                Con {item?.fullname || item?.full_name}
              </TextBox>
              <TextBox style={styles.item_student_email}>{item?.email}</TextBox>
            </View>
          </View>
          {typeChild == 'currentChild' && dataChildren.length > 1 && (
            <View
              style={[
                openListChildren && styles.rotate180,
                styles.iconDownContainer,
              ]}>
              <Image
                source={arrow_down_dark_icon}
                style={styles.arrowDownIcon}
                resizeMode="contain"
              />
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  // Render Title Time Learned
  const TitleInforLearned = ({title, typeInfor}) => {
    return (
      <TouchableOpacity
        onPress={() => handleChangeTypeLearned(typeInfor)}
        style={[stylesApp.flexAlignCenter]}>
        <Text
          style={[
            styles.textTypeTimeAvg,
            typeInforLearned == typeInfor && styles.textTypeSelectedTime,
            {
              ...FontWeight.Bold,
            },
          ]}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent={Platform.OS === 'android'}
        backgroundColor="transparent"
      />
      <LinearGradient
        colors={[Colors.BaseGreen, Colors.LightGreen]}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        style={[styles.containerLinear]}
      />
      <View style={[styles.flex1, styles.containerContent]}>
        <View style={[styles.listChildrenContainer, styles.boxShadow]}>
          <View
            style={[
              styles.boxShadow,
              {
                borderBottomWidth: 1,
                borderBottomColor: Colors.Gray_E5,
              },
            ]}>
            <View
              style={{
                zIndex: 10,
              }}>
              {renderInforChild(currChild, 'currentChild')}
            </View>
            {openListChildren && (
              <View>
                <FlatList
                  data={dataChildren.filter(
                    item => item.email != currChild?.email,
                  )}
                  renderItem={({item}) => renderInforChild(item, 'remaining')}
                  keyExtractor={(item, index) => {
                    return item?.id.toString() + index.toString();
                  }}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  scrollEnabled={true}
                  style={[styles.positionAbs, styles.boxShadow]}
                />
              </View>
            )}
          </View>
        </View>
        {openListChildren && (
          <TouchableWithoutFeedback onPress={() => setOpenListChildren(false)}>
            <View
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 3,
                backgroundColor: Colors._black02,
              }}
            />
          </TouchableWithoutFeedback>
        )}
        <Animated.ScrollView
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {contentOffset: {y: scrollA}},
              },
            ],
            {
              useNativeDriver: true, // <- Native Driver used for animated events
            },
          )}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={handleRefreshData}
            />
          }
          indicatorStyle={Colors.Black}
          style={[styles.contentDashboard]}>
          {/* EXERCISE */}
          <BoxExerciseInfor
            textTitle={ParentText.Home.Exercise}
            data={dataReportExercise}
            handleNavigateDetail={() =>
              props.navigation.navigate('ManageExerciseHome')
            }
          />

          {/* CHART */}
          <View style={[styles.boxDashboard]}>
            <View
              style={[
                stylesApp.flexJusBetween,
                {
                  paddingBottom: SmartScreenBase.smPercenWidth * 2,
                },
              ]}>
              <TitleInforLearned
                title={ParentText.Home.TimeLearn}
                typeInfor="time"
              />
              <TitleInforLearned
                title={ParentText.Home.ExerciseDone}
                typeInfor="exercise"
              />
              <TitleInforLearned
                title={ParentText.Home.WordLearned}
                typeInfor="word"
              />
            </View>
            <View
              style={[
                {
                  minHeight: SmartScreenBase.smPercenWidth * 40,
                  marginBottom: SmartScreenBase.smPercenWidth * 1,
                },
                stylesApp.flexCenter,
              ]}>
              {visibleModalInfor && dataTimeLearning ? (
                <ModalInforLearned
                  handleCloseModalInfor={handleCloseModalInfor}
                  data={dataTimeLearning}
                  totalInfor={pointInfor}
                />
              ) : (
                <LineChartInforLearned
                  data={dataTimeStudyMonth?.map(data => data?.total_time)}
                  label={dataTimeStudyMonth?.map(data => data?.month)}
                  handleSelectPoint={handleSelectPoint}
                />
              )}
            </View>
          </View>

          {/* AVG EXAM */}
          <BoxAvg
            dataAvg={dataAvgExam}
            navigation={props.navigation}
            titleAvg={ParentText.Home.AvgExamScore}
            typeBox="exam"
            dataParam={dataParamExam}
            setDataParam={setDataParamExam}></BoxAvg>

          {/* AVG EXERCISE */}
          <BoxAvg
            dataAvg={dataAvgExercise}
            navigation={props.navigation}
            titleAvg={ParentText.Home.AvgExerciseScrore}
            typeBox="exercise"
            dataParam={dataParamExercise}
            setDataParam={setDataParamExercise}></BoxAvg>

          {/* AVG SKILLS */}
          <View style={[styles.boxDashboard]}>
            {renderHeaderBox(
              ParentText.Home.AvgSkillScrore,
              dataParamSkills,
              setDataParamSkills,
            )}

            <View
              style={[
                stylesApp.flexCenterColumn,
                {
                  paddingVertical: SmartScreenBase.smPercenWidth * 2,
                },
              ]}>
              <View style={stylesApp.flexCenter}>
                <TouchableOpacity style={stylesApp.flexAlignCenter}>
                  <Image
                    style={{
                      width: SmartScreenBase.smBaseWidth * 37,
                      height: SmartScreenBase.smBaseWidth * 65,
                      resizeMode: 'cover',
                    }}
                    source={arrow_left_dark_icon}
                  />
                </TouchableOpacity>

                <View
                  style={
                    (stylesApp.flexCenterColumn,
                    {
                      paddingHorizontal: SmartScreenBase.smPercenWidth * 5,
                    })
                  }>
                  <Text style={styles.textOrange16}>
                    {dataParamSkills?.type == 'month'
                      ? dataAvgSkill?.month
                        ? `Tháng ${dataAvgSkill?.month}`
                        : ''
                      : dataAvgSkill?.semester
                      ? `${dataAvgSkill?.semester}`
                      : ''}
                  </Text>
                </View>
                <TouchableOpacity style={stylesApp.flexAlignCenter}>
                  <Image
                    style={{
                      width: SmartScreenBase.smBaseWidth * 37,
                      height: SmartScreenBase.smBaseWidth * 65,
                      resizeMode: 'cover',
                    }}
                    source={arrow_right_dark_icon}
                  />
                </TouchableOpacity>
              </View>

              {/* Skill Avg Label */}
              <View style={[styles.skillAvgContainer, stylesApp.flexJusEvenly]}>
                {dataAvgSkill?.skill_list?.map((skill, index) => (
                  <SkillAvgLabel
                    skillList={dataAvgSkill?.skill_list}
                    data={skill}
                    index={index + 1}
                  />
                ))}
              </View>
            </View>
          </View>

          {/* Activity Diary */}
          {childSelected?.id && !loading ? (
            <View style={styles.boxDashboard}>
              <ActivityDiary
                navigation={props.navigation}
                titleHeader={
                  <TextBox
                    numberOfLines={2}
                    text={ParentText.Home.ActivityDiary}
                    style={[styles.titleBox, stylesApp.textColorLight]}
                  />
                }
                btnDetail={
                  <View
                    style={[
                      stylesApp.flexJusEnd,
                      {
                        paddingTop: SmartScreenBase.smPercenWidth * 5,
                      },
                    ]}>
                    <TouchableOpacity
                      onPress={() => handleNavigateDetailActivity()}
                      style={stylesApp.flexAlignCenter}>
                      <Text style={styles.textUnderlineDetail}>
                        {ParentText.Home.TextDetail}
                      </Text>
                    </TouchableOpacity>
                  </View>
                }
              />
            </View>
          ) : null}

          {/* New Achievement */}
          {childSelected?.id && !loading ? (
            <View
              style={[
                styles.boxDashboard,
                {
                  margingBottom: SmartScreenBase.smPercenWidth * 10,
                },
              ]}>
              <NewAchievement
                score={totalScore}
                titleHeader={
                  <View style={[stylesApp.flexJusBetween]}>
                    <TextBox
                      numberOfLines={2}
                      text={ParentText.Home.NewAchievement}
                      style={[styles.titleBox, stylesApp.textColorLight]}
                    />
                    <Diamond text={totalScore} />
                  </View>
                }
              />
            </View>
          ) : null}
          
        </Animated.ScrollView>
      </View>

      <FullScreenLoadingIndicator visible={loading} />
    </View>
  );
};
