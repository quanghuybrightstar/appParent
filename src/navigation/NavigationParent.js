import {
  createAppContainer,
  createSwitchNavigator,
  NavigationActions,
} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import React, {useEffect} from 'react';
import {createBottomTabNavigator, BottomTabBar} from 'react-navigation-tabs';
import {Dimensions, Image, ImageBackground, View} from 'react-native';
import DetailsMark from '../component/MarkExam/DetailsMark';
import Writing from '../component/MarkExam/Writing';
import WritingNew from '../component/MarkExam/WritingNew';
import Speaking from '../component/MarkExam/Speaking';
import DetailsWorkDelivered from '../screens/Parent/workDeliveredTeacherScreen/DetailsWorkDelivered';
import CourseManagerScreen from '../../src/screens/Teacher/CourseManagerScreen/index';
import EditUnitScreen from '../../src/screens/Teacher/EditUnitScreen/index';
import AddUnitScreen from '../../src/screens/Teacher/AddUnitScreen/index';
import EditCourseScreen from '../../src/screens/Teacher/EditCourseScreen/index';
import SettingCourseScreen from '../../src/screens/Teacher/SettingCourseScreen/index';
import ProjectNew from '../screens/Student/ProjectNew';

import SettingTeacher from '../../src/screens/Teacher/SettingTeacher/SettingTeacher';
import ChangePassword from '../../src/screens/Teacher/ChangePassword';
import SettingSupport from '../../src/screens/Teacher/SettingSupport';
import SettingContact from '../../src/screens/Teacher/SettingContact';
import SettingPolicy from '../../src/screens/Teacher/SettingPolicy';
import SettingAbout from '../../src/screens/Teacher/SettingAbout';
import LanguageSetting from '../../src/screens/Teacher/LanguageSetting';
import GoldBoard from '../screens/Student/GoldBoard';

import ChooseExCourseTeacherScreen from '../../src/screens/Teacher/ChooseExCourseTeacherScreen/index';
import PickDateTimeScreen from '../../src/screens/Teacher/PickDateTimeScreen/index';
import AttendanceManagerScreen from '../screens/Teacher/AttendanceManagerScreen/index';
import AttendanceClassScreen from '../screens/Teacher/AttendanceClassScreen/index';
import AttendanceCreateClassScreen from '../screens/Teacher/AttendanceCreateClassScreen/index';
import AddToAttendanceScreen from '../screens/Teacher/AddToAttendanceScreen/index';
import AttendanceScreen from '../screens/Teacher/AttendanceScreen/index';
import AttendancePaperScreen from '../screens/Teacher/AttendancePaperScreen/index';
import LibraryScreen from '../screens/Teacher/LibraryScreen';
import ProcessScreen from '../screens/Student/ProcessScreen/index';
import ExamStudyForTest from '../screens/Student/StudyForTest/Exam';
import ClassListScreen from '../screens/Parent/ConnectedAccount/StastScreen/classListScreen';
import ListStudenScreen from '../screens/Parent/ConnectedAccount/listStudentScreen/listStudentScreen';
import AddStudentScreen from '../screens/Parent/ConnectedAccount/listStudentScreen/AddStudentScreen';
import applyFor_class from '../screens/Parent/ConnectedAccount/listStudentScreen/applyFor_class';
import DeliveredExamScreen from '../screens/Parent/ConnectedAccount/DeliveredExamScreen/DeliveredExamScreen';
import hoanthanh1 from '../component/hoanThanh/hoanthanh';
import AchievementBoardNewScreen from '../screens/AchievementBoardNewScreen/index';
import AchievementBoardScreen from '../screens/AchievementBoardScreen/index';
import ListLesson from '../component/learn/ListLesson';
import SettingParent from '../screens/Parent/ConnectedAccount/SettingParent/SettingParent';
import listStudent from '../component/TaobaitapGV/listStudent';
import DiaryScreen from '../screens/Parent/ConnectedAccount/DiaryScreen/DiaryScreen';
import FileListScreen from '../component/learn/fileList';
import Category from '../screens/Parent/ConnectedAccount/categoryScreen/index';
import GiaoBaiTeacher from '../component/TaobaitapGV/listStudent';
import CreaterLink from '../screens/Parent/ConnectedAccount/createrLink/CreaterConnect';
import MyCarousel from '../component/listSendStudent/index';
import ListUnit from '../screens/Parent/ConnectedAccount/ListUnit/ListUnit';
import ChooseFromSaveScreen from '../screens/Teacher/ChooseFromSaveScreen/index';
import SmartScreenBase from '../base/SmartScreenBase';
import ChangePassScreen from '../screens/LoginScreen/Login/changePass';
import lishAttach from '../component/listAttach';
import DetailsLesson from '../screens/DetailsLesson';
import DetailStudyGuide from '../screens/DetailStudyGuide';
// student Screen
import SaveListScreen from '../screens/Teacher/SaveListScreen';
import ManageClassOffline from '../component/ClassOffline/ManageClassOffline';
import AddClass from '../component/ClassOffline/AddClass';
import ManageAttendance from '../component/ClassOffline/ManageAttendance';
import DetailsAttendance from '../component/ClassOffline/DetailsAttendance';
import StudyGuide from '../screens/Teacher/StudyGuide';
import Teaching from '../component/MarkExam/Teaching';
import NewChatScreen from '../screens/NewChatScreen';
import ChatContentScreenNew from '../screens/ChatContentScreenNew';
import SendMessageScreenNew from '../screens/SendMessageScreenNew';
import DetailSystemMessageScreen from '../screens/DetailSystemMessageScreen';
import Vinhdanh from '../screens/Student/Vinhdanh';
import OverView from '../screens/Student/StudyForTest/OverView';
import {StudentGrammar} from '../screens/Student/StudentGrammar';
import ResultStudyForTest from '../screens/Student/StudyForTest/Result';
import ResultStudy from '../screens/Student/StudyForTest/ResultStudy';
import SeeTheAnswer from '../screens/Student/StudyForTest/SeeTheAnswer';

import CourseFilterResultScreen from '../screens/TeacherNew/Curiculum/CourseFilterResultScreen';
import {ChooseClassTCScreen} from '../screens/TeacherNew/Curiculum/ChooseClassTCScreen/ChooseClassTCScreen';
import {SettingAssignmentsScreen} from '../screens/TeacherNew/Curiculum/SettingAssignmentsScreen/SettingAssignmentsScreen';
import {Home} from '../screens/TeacherNew/Home';
import {
  ICON_HOME_AC,
  ICON_HOME_IN,
  ICON_BOOK_AC,
  ICON_BOOK_IN,
  ICON_LUYENTHI_AC,
  ICON_LUYENTHI_IN,
  ICON_CUP_AC,
  ICON_CUP_IN,
  ICON_THEM_AC,
  ICON_THEM_IN,
  ICON_GIAOBAI_IN,
  ICON_GIAOBAI_AC,
  ICON_CHAMBAI_IN,
  ICON_CHAMBAI_AC,
} from '../assets';
import DeviceInfo from 'react-native-device-info';
import {CourseListTCScreen} from '../screens/TeacherNew/Curiculum/CourseListTCScreen/CourseListTCScreen';
import {DetailCurriculumTeacher} from '../screens/TeacherNew/Curiculum/DetailCurriculumTeacher/DetailCurriculumTeacher';
import FavouriteLesson from '../screens/TeacherNew/Curiculum/FavouriteLesson';
import DetailUnit from '../screens/TeacherNew/Curiculum/DetailUnit/DetailUnit';
import LessonListTCScreen from '../screens/TeacherNew/Curiculum/LessonListTCScreen';
import {DetailManageAssign} from '../screens/TeacherNew/OtherSetting/ManageAssign/DetailManageAssign/DetailManageAssign';
import {OtherSetting} from '../screens/TeacherNew/OtherSetting/OtherSetting/OtherSetting';
import ManageAssign from '../screens/TeacherNew/OtherSetting/ManageAssign/ManageAssign';
import TeacherProfile from '../screens/TeacherNew/TeacherProfile';
import EditProfileTeacher from '../screens/TeacherNew/EditProfileTeacher';
import {WorkSchedule} from '../screens/TeacherNew/OtherSetting/WorkSchedule/WorkSchedule';
import {WorkMenu} from '../screens/TeacherNew/WorkMenu';
import {WorkTimeTable} from '../screens/TeacherNew/WorkTimeTable';
import {WorkingByDay} from '../screens/TeacherNew/WorkingByDay';
import {CreateWorkingPlan} from '../screens/TeacherNew/CreateWorkingPlan';
import {DetailPlan} from '../screens/TeacherNew/DetailPlan';
import ManagingAssignmentsScreen from '../screens/TeacherNew/ManagingAssignments/ManagingAssignmentsScreen';
import {AssignmentedDetailScreen} from '../screens/TeacherNew/ManagingAssignments/AssignmentedDetailScreen/AssignmentedDetailScreen';
import {FastAssignmentsScreen} from '../screens/TeacherNew/ManagingAssignments/FastAssignmentsScreen/FastAssignmentsScreen';
import ChooseCurruculum from '../screens/TeacherNew/ManagingAssignments/ChooseCurruculum';
import DetailCurriculum from '../screens/TeacherNew/ManagingAssignments/DetailCurriculum';
import {
  ClassListTeacherScreen,
  ClassDetailTeacherScreen,
  CreateClassTeacherScreen,
  ManageClassEnrollmentScreen,
  StudentListTeacherScreen,
  AttendanceManagementTeacherScreen,
  AddStudentOnlineScreen,
  AttendancePaperTeacherScreen,
  ViewAttendanceTeacherScreen,
  AttendanceCardTeacherScreen,
  ScoreManagementScreen,
  ScoreManagementScreenDetail,
  MarkDetailScreen,
  MarkProjectScreen,
  EditClassTeacherScreen,
} from '../screens/TeacherNew/ManageClass';
import {
  StudyReportTeacherScreen,
  DetailReportTeacherScreen,
  StudyDiaryTeacherScreen,
} from '../screens/TeacherNew/StudyReport';
import ListLessonManagent from '../screens/TeacherNew/ManagingAssignments/ListLesson';
import ResultFilter from '../screens/TeacherNew/ManagingAssignments/ResultFilter';
import CompleteAssign from '../screens/TeacherNew/ManagingAssignments/CompleteAssign';
import ManagingTutorial from '../screens/TeacherNew/ManagingAssignments/ManagingTutorial';
import ListToturial from '../screens/TeacherNew/ManagingAssignments/ListTutorial';
import FavoriteAssignments from '../screens/TeacherNew/ManagingAssignments/FavoriteAssignments';

// ADD MORE NEW
import ClassScreen from '../screens/Student/ClassScreen';
import ListStudentClass from '../screens/Student/ListStudentClass';
import ClassDetail from '../screens/Student/ClassDetail';
import CreateInboxScreen from '../screens/Student/inbox/CreateInbox';
import InboxDetails from '../screens/Student/inbox/IndexDetails';
import {
  SettingAssignmentsParentScreen,
  FastAssignmentsParentScreen,
  ManagingAssignmentsParentScreen,
  SettingNotificationParent,
  AssociateParent,
  MarkScreenParent,
  HomeParent,
  ManageExerciseHome,
  ManageListScore,
  ManageExerciseAClass,
} from '../screens/ParentNews';
import CreateConnect from '../screens/Parent/ConnectedAccount/createrLink/CreaterConnect';
import {ParentLinkingScreen} from '../screens/Student/ParentLinking';
import ChooseAssignType from '../screens/TeacherNew/ManagingAssignments/ChooseAssignType/ChooseAssignType';
import SettingExercise from '../screens/TeacherNew/ManagingAssignments/SettingExercise/SettingExercise';
import SettingRequestAssign from '../screens/TeacherNew/ManagingAssignments/SettingRequestAssign/SettingRequestAssign';
import ListLessonResult from '../screens/TeacherNew/ManagingAssignments/ListLessonResult/ListLessonResult';

import CurriculumClassTeacherScreen from '../screens/TeacherNew/ManageClass/CurriculumClassTeacherScreen';
import ChoiceCurriculum from '../screens/TeacherNew/ManageClass/ChoiceCurriculum';
import MarkWrittingScreen from '../screens/TeacherNew/MarkWrittingScreen';
import HomeworkDetail from '../screens/HomeworkDetail';
import ExerciseStudent from '../screens/Student/ExerciseStudent';

const TabBarComponent = props => <BottomTabBar {...props} />;

const MoreStack = createStackNavigator(
  {
    OtherSetting,
    // Link Students
    AssociateParent,
    SettingAssignmentsParentScreen,
    CreateConnect,
    ParentLinkingScreen,
    // Class
    ClassScreen,
    ListStudentClass,
    ManageExerciseAClass,
    Vinhdanh,
    ClassDetail,
    GoldBoard,
    TeacherProfile,
    EditProfileTeacher,
    // Setting
    SettingTeacher,
    ChangePassword,
    SettingSupport,
    SettingContact,
    SettingPolicy,
    SettingAbout,
    SettingNotificationParent,
    LanguageSetting,
    //Manage Exercise
    ManageAssign,
    DetailManageAssign,
    CourseListTCScreen,
    DetailCurriculumTeacher,
    ManagingTutorial,
    CompleteAssign,
    StudentWrittingScreen: {screen: MarkWrittingScreen},
    ExerciseStudent
  },
  {
    headerMode: 'none',
    initialRouteName: 'OtherSetting',
    navigationOptions: ({navigation}) => ({
      tabBarVisible: navigation.state.index < 1,
    }),
  },
);
const AssignmentStack = createStackNavigator(
  {
    ManagingAssignmentsParentScreen,
    FastAssignmentsParentScreen,
    ChooseAssignType,
    ChooseCurruculum,
    SettingExercise,
    SettingRequestAssign,
    ListLessonResult,
    DetailCurriculum,
    ListLessonManagent,
    StudentWrittingScreen: {screen: MarkWrittingScreen},
  },
  {
    headerMode: 'none',
    initialRouteName: 'ManagingAssignmentsParentScreen',
    navigationOptions: ({navigation}) => ({
      tabBarVisible: navigation.state.index < 1,
    }),
  },
);
const ParentHomeStack = createStackNavigator(
  {
    HomeParent,
    ListStudenScreen,
    ManageExerciseHome,
    ManageExerciseAClass,
    StudyDiaryStudentScreen: {screen: StudyDiaryTeacherScreen},
    ManageListScore,
    StudentWrittingScreen: {screen: MarkWrittingScreen},
  },
  {
    headerMode: 'none',
    initialRouteName: 'HomeParent',
    navigationOptions: ({navigation}) => ({
      tabBarVisible: navigation.state.index < 1,
    }),
  },
);
const MarkExerciseStack = createStackNavigator(
  {
    MarkScreenParent,
    MarkDetailScreen,
  },
  {
    headerMode: 'none',
    initialRouteName: 'MarkScreenParent',
    navigationOptions: ({navigation}) => ({
      tabBarVisible: navigation.state.index < 1,
    }),
  },
);
const ChatStackParent = createStackNavigator(
  {
    InBoxScreen: {screen: NewChatScreen},
  },
  {
    headerMode: 'none',
    initialRouteName: 'InBoxScreen',
  },
);

const BottomParents = createBottomTabNavigator(
  {
    Home: {
      screen: ParentHomeStack,
      navigationOptions: () => ({
        title: 'Trang chủ',
        tabBarIcon: ({tintColor, focused}) => {
          return (
            <Image
              style={{
                width: SmartScreenBase.smPercenWidth * 6,
                height: SmartScreenBase.smPercenWidth * 6,
                resizeMode: 'contain',
              }}
              source={focused ? ICON_HOME_AC : ICON_HOME_IN}
            />
          );
        },
      }),
    },
    Assignment: {
      screen: AssignmentStack,
      navigationOptions: () => ({
        title: 'Giao bài',
        tabBarIcon: ({focused, tintColor}) => {
          return (
            <Image
              resizeMode="contain"
              style={{
                height: SmartScreenBase.smPercenHeight * 5,
                width: SmartScreenBase.smPercenHeight * 5,
              }}
              source={focused ? ICON_GIAOBAI_AC : ICON_GIAOBAI_IN}
            />
          );
        },
      }),
    },
    MarkExercise: {
      screen: MarkExerciseStack,
      navigationOptions: () => ({
        title: 'Chấm bài',
        tabBarIcon: ({focused, tintColor}) => {
          return (
            <Image
              resizeMode="contain"
              style={{
                height: SmartScreenBase.smPercenHeight * 4,
                width: SmartScreenBase.smPercenHeight * 4,
              }}
              source={focused ? ICON_CHAMBAI_AC : ICON_CHAMBAI_IN}
            />
          );
        },
      }),
    },
    Message: {
      screen: ChatStackParent,
      navigationOptions: () => ({
        title: 'Tin nhắn',
        tabBarIcon: ({tintColor, focused}) => {
          return (
            <Image
              resizeMode="contain"
              style={{
                height: SmartScreenBase.smPercenHeight * 5,
                width: SmartScreenBase.smPercenHeight * 5,
                tintColor: tintColor,
              }}
              source={{
                uri: focused ? 'icon_messeger_active' : 'message_icon_bottom',
              }}
            />
          );
        },
      }),
    },
    Thêm: {
      screen: MoreStack,
      navigationOptions: () => ({
        tabBarIcon: ({tintColor, focused}) => {
          return (
            <Image
              resizeMode="contain"
              style={{
                width: SmartScreenBase.smPercenWidth * 6,
                height: SmartScreenBase.smPercenWidth * 6,
              }}
              source={focused ? ICON_THEM_AC : ICON_THEM_IN}
            />
          );
        },
      }),
    },
  },
  {
    initialRouteName: 'Home',
    tabBarOptions: {
      showLabel: true,
      activeTintColor: '#00A69C',
      inactiveTintColor: '#404041',
      style: {
        backgroundColor: 'transparent',
        height: SmartScreenBase.smPercenHeight * 9,
        marginBottom: DeviceInfo.hasNotch()
          ? -SmartScreenBase.smPercenHeight * 2
          : 0,
        borderTopColor: 'transparent',
      },
      labelStyle: {
        ...Platform.select({
          android: {
            fontSize: SmartScreenBase.smFontSize * 35,
          },
          ios: {
            fontSize: SmartScreenBase.smFontSize * 40,
          },
        }),
        fontFamily: 'MyriadPro-Light',
      },
    },
    tabBarComponent: props => {
      return (
        <React.Fragment>
          <TabBarComponent {...props} />
        </React.Fragment>
      );
    },
  },
);

// parent
const onParentStack = createStackNavigator(
  {
    BottomParents,
    ClassListScreen,
    ParentHomeStack,
    AssignmentStack,
    MoreStack,
    MarkExerciseStack,
    ChatStackParent,
    AddStudentScreen,
    applyFor_class,
    FileListScreen,
    DeliveredExamScreen,
    hoanthanh1,
    GiaoBaiTeacher,
    CourseManagerScreen,
    EditCourseScreen,
    EditUnitScreen,
    AddUnitScreen,
    SettingCourseScreen,
    ChooseExCourseTeacherScreen,
    PickDateTimeScreen,
    AttendanceManagerScreen,
    AttendanceClassScreen,
    AttendanceCreateClassScreen,
    AddToAttendanceScreen,
    AttendanceScreen,
    AttendancePaperScreen,
    LibraryScreen,
    DetailsMark,
    Speaking,
    Writing,
    AchievementBoardNewScreen,
    AchievementBoardScreen,
    SettingParent,
    listStudent,
    CreaterLink,
    ListUnit,
    Category,
    MyCarousel,
    ProcessScreen,
    ListLesson,
    ChangePassScreen,
    lishAttach,
    ManageClassOffline,
    AddClass,
    ManageAttendance,
    DetailsAttendance,
    StudyGuide,
    DiaryScreen,
    ChooseFromSaveScreen,
    SaveListScreen,
    WritingNew,
    Teaching,
    DetailsWorkDelivered,
    DetailsLesson,
    DetailStudyGuide,
    NewChatScreen,
    ChatContentScreenNew,
    SendMessageScreenNew,
    DetailSystemMessageScreen,
    VinhdanhTeach: {screen: Vinhdanh},
    ExamStudyTeach: {screen: ExamStudyForTest},
    TeacherOverView: {screen: OverView},
    TeacherResultTest: {screen: ResultStudyForTest},
    TeacherResultStudy: {screen: ResultStudy},
    TeacherSeeTheAnswer: {screen: SeeTheAnswer},
    ProjectTeach: {screen: ProjectNew},
    TeacherGrammar: {screen: StudentGrammar},
    // TeacherNew
    CourseListTCScreen,
    DetailCurriculumTeacher,
    FavouriteLesson,
    DetailUnit,
    LessonListTCScreen,
    CourseFilterResultScreen,
    ChooseClassTCScreen,
    SettingAssignmentsScreen,
    // OtherSetting,
    WorkMenu,
    WorkSchedule,
    WorkTimeTable,
    WorkingByDay,
    CreateWorkingPlan,
    DetailPlan,
    ManagingAssignmentsScreen,
    AssignmentedDetailScreen,
    ClassListTeacherScreen,
    ClassDetailTeacherScreen,
    FastAssignmentsScreen,
    ChooseCurruculum,
    CreateClassTeacherScreen,
    StudyReportTeacherScreen,
    DetailReportTeacherScreen,
    ManageClassEnrollmentScreen,
    StudentListTeacherScreen,
    DetailCurriculum,
    ListLessonManagent,
    ResultFilter,
    AttendanceManagementTeacherScreen,
    ManagingTutorial,
    ListToturial,
    AddStudentOnlineScreen,
    AttendancePaperTeacherScreen,
    ViewAttendanceTeacherScreen,
    AttendanceCardTeacherScreen,
    FavoriteAssignments,
    ScoreManagementScreen,
    ScoreManagementScreenDetail,
    EditClassTeacherScreen,
    MarkDetailScreen,
    MarkProjectScreen,
    CurriculumClassTeacherScreen,
    ChoiceCurriculum,
    MarkWrittingScreen,
    InBoxScreen: {screen: NewChatScreen},
    CreateInboxScreen: {screen: CreateInboxScreen},
    InboxDetailsScreen: {screen: InboxDetails},
    HomeworkDetail,
  },
  {
    headerMode: 'none',
  },
);

export default onParentStack;
