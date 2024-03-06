import React from 'react';
import {Image, Dimensions, ImageBackground, Platform} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator, BottomTabBar} from 'react-navigation-tabs';
import FunctionScreen from '../screens/Student/FunctionScreen';
import CreateInboxScreen from '../screens/Student/inbox/CreateInbox';
import InboxDetails from '../screens/Student/inbox/IndexDetails';
import ProfileScreen from '../screens/Student/ProfileScreen';
import SettingScreen from '../screens/Student/SettingScreen';
import LisenceScreen from '../screens/Student/LisenceScreen';
import ManagerFileScreen from '../screens/Student/ManagerFileScreen';
import CheckExserciseScreen from '../screens/Student/CheckExserciseScreen';
import FreeLearningScreen from '../screens/Student/FreeLearningScreen';
import HomeScreen from '../screens/Student/HomeScreen';
import ClassScreen from '../screens/Student/ClassScreen';
import ListStudentClass from '../screens/Student/ListStudentClass';
import ExerciseStudent from '../screens/Student/ExerciseStudent';
import GoldBoard from '../screens/Student/GoldBoard';
import Vinhdanh from '../screens/Student/Vinhdanh';
import ClassDetail from '../screens/Student/ClassDetail';
import ProcessScreen from '../screens/Student/ProcessScreen';
import RankScreen from '../screens/Student/Rank';
import MapScreenStudent from '../screens/Student/MapScreen';
import placementTestScreen from '../screens/Student/placementTestScreen';
import SkillUnit from '../screens/Student/SkillUnit';
import ExerciseUnit from '../screens/Student/ExerciseUnit';
import ListImprovement from '../screens/Student/Improvement';
import ListLesson from '../component/learn/ListLesson';
import ChangePassScreen from '../screens/LoginScreen/Login/changePass';
import LinkAcc from '../screens/LoginScreen/Login/LinkAccount';
import HomeStudentScreenNew from '../screens/HomeStudentNew';
import LectureScreen from '../screens/Student/LectureScreen';
import ChooseUpdate from '../screens/Student/LisenceScreen/ChooseUpdate';
import DetailItem from '../screens/Student/LisenceScreen/DetailItem';
import History from '../screens/Student/LisenceScreen/History';
import registrationClassScreen from '../screens/Student/registrationClassScreen';
import StudyForTest from '../screens/Student/StudyForTest';
import DetailsStudyForTest from '../screens/Student/StudyForTest/Details';
import ExamStudyForTest from '../screens/Student/StudyForTest/Exam';
import ProjectNew from '../screens/Student/ProjectNew';
import MapNewScreen from '../screens/MapNewScreen';
import ResultStudyForTest from '../screens/Student/StudyForTest/Result';
import SeeTheAnswer from '../screens/Student/StudyForTest/SeeTheAnswer';
import ResultStudy from '../screens/Student/StudyForTest/ResultStudy';
import ListSkillScreen from '../screens/ListSkillScreen';
import ListLessonScreen from '../screens/ListLessonScreen';
import MasterUnit from '../screens/Student/MasterUnit';
import HistoryMasterUnit from '../screens/Student/HistoryMasterUnit';
import SmartScreenBase from '../base/SmartScreenBase';
import AchievementBoardNewScreen from '../screens/AchievementBoardNewScreen';
import AchivementOfflineDetail from '../screens/AchievementBoardNewScreen/AchivementOfflineDetailScreen';
import DeviceInfo from 'react-native-device-info';
import LearningHistory from '../screens/Student/LearningHistory';
import Curriculums from '../screens/Student/Curriculums';
import PracticeHistory from '../screens/Student/StudyForTest/History';
import PracticeHistoryDetail from '../screens/Student/StudyForTest/HistoryDetails';
import PracticeExplain from '../screens/Student/StudyForTest/VideoExplain';
import VocabScreen from '../screens/AchievementBoardNewScreen/Vocab';
import ListVocabScreen from '../screens/AchievementBoardNewScreen/ListVocab';
import DetailsLesson from '../screens/DetailsLesson';
import NewChatScreen from '../screens/NewChatScreen';
import ChatContentScreenNew from '../screens/ChatContentScreenNew';
import SendMessageScreenNew from '../screens/SendMessageScreenNew';
import DetailSystemMessageScreen from '../screens/DetailSystemMessageScreen';
import AddStudentScreen from '../screens/Parent/ConnectedAccount/listStudentScreen/AddStudentScreen';
import MarkWrittingScreen from '../screens/TeacherNew/MarkWrittingScreen';

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
} from '../assets';
import OverView from '../screens/Student/StudyForTest/OverView';
import { StudyPlan } from '../screens/Student/StudyPlan';
import { StudentGrammar } from '../screens/Student/StudentGrammar';
import { TimeTable } from '../screens/Student/TimeTable';
import { ParentLinkingScreen } from '../screens/Student/ParentLinking';
import NewProfileScreen from '../screens/Student/NewProfileScreen';
import NewEditProfileScreen from '../screens/Student/NewEditProfileScreen';

import HomeworkHistory from '../screens/HomeworkHistory';
import HomeworkDetail from '../screens/HomeworkDetail';
import ContactScreen from '../screens/Student/ContactScreen';
import CommonSetting from '../screens/Student/CommonSetting';
import SettingSupport from '../screens/Teacher/SettingSupport';
import SettingContact from '../screens/Teacher/SettingContact';
import LanguageSetting from '../screens/Student/LanguageSetting';
import ChangePassword from '../screens/Teacher/ChangePassword';
import SettingAbout from '../screens/Teacher/SettingAbout';
import SettingPolicy from '../screens/Teacher/SettingPolicy';
import { StudyReportTeacherScreen, DetailReportTeacherScreen, StudyDiaryTeacherScreen } from '../screens/TeacherNew/StudyReport';
import DetailStudyGuide from "../screens/DetailStudyGuide";
import UpgradeAccount from "../screens/Student/Payment/UpgradeAccount/UpgradeAccount";
import PayHistory from "../screens/Student/Payment/PayHistory/PayHistory";
import BuyPackage from "../screens/Student/Payment/BuyPackage/BuyPackage";
import EnterPurchasedPackage from "../screens/Student/Payment/EnterPurchasedPackage/EnterPurchasedPackage";
import PickPackage from "../screens/Student/Payment/PickPackage/PickPackage";
import LoseRoot from '../screens/Student/LoseRootGroup/LoseRoot/LoseRoot'
import ChooseStartCuri from '../screens/Student/LoseRootGroup/ChooseStartCuri/ChooseStartCuri';
import ChooseCalendarStudy from '../screens/Student/LoseRootGroup/ChooseCalendarStudy/ChooseCalendarStudy';
import ExpectCuri from '../screens/Student/LoseRootGroup/ExpectCuri/ExpectCuri';

import MyData from '../component/MyData';

import { ManageListScore } from '../screens/ParentNews';

const TabBarComponent = (props) => (<BottomTabBar {...props} />);
const {width, height} = Dimensions.get('screen');
const HomeScreenStudent = createStackNavigator({
    HomeScreen: {screen: HomeStudentScreenNew},
    ListLesson: {screen: ListLesson},
    ProjectNew: {screen: ProjectNew},
    ExamStudyForTest: { screen: ExamStudyForTest },
    ResultStudyForTest,
    ResultStudy,
    SeeTheAnswer,
    OverView,
    ListSkillScreen,
    ListLessonScreen,
    DetailStudyGuide,
    InBoxScreen: {screen: NewChatScreen},
    LearningHistory:{screen:LearningHistory},
    ResultStudyForTest: {screen: ResultStudyForTest},
    StudentWrittingScreen: {screen: MarkWrittingScreen},
    HomeworkDetail,
    LoseRoot,
    ChooseStartCuri,
    ChooseCalendarStudy,
    ExpectCuri,
    Curriculums,
    ManageListScore
}, {
    initialRouteName: 'HomeScreen',
    headerMode: 'none',
    navigationOptions: ({navigation}) => ({
        tabBarVisible: navigation.state.index < 1 && !MyData.isFirstLogin,
    }),
});
const ClassScreenStudent = createStackNavigator({
    // ClassScreen: { screen: ClassScreen },
    registrationClassScreen: { screen: registrationClassScreen },
    ListLesson: { screen: ListLesson },
}, {
    initialRouteName: 'ClassScreen',
    headerMode: 'none',
    // navigationOptions: ({ navigation }) => ({
    //     tabBarVisible: navigation.state.index < 1,
    // })
});

const MapScreen = createStackNavigator({
    MapScreenStudent: {screen: MapNewScreen},
    SkillUnitStudent: {screen: SkillUnit},
    StudentGrammar: { screen: StudentGrammar },
    ExerciseUnit: {screen: ExerciseUnit},
    ListLesson: {screen: ListLesson},
    LectureScreen: {screen: LectureScreen},
    ListImprovement: {screen: ListImprovement},
    placementTestScreen: {screen: placementTestScreen},
    ListSkillScreen,
    ListLessonScreen,
    MasterUnit,
    HistoryMasterUnit,
    Curriculums,
    PracticeHistory,
    ProjectNew,
    ExamStudyForTest:{
        name: 'ExamStudyForTest',
        screen: ExamStudyForTest,
        navigationOptions: {
            gesturesEnabled: false,
        },
    },
    ResultStudyForTest,
    SeeTheAnswer,
    ResultStudy,
    OverView,
    PracticeExplain,
    StudentWrittingScreen: {screen: MarkWrittingScreen},

    HomeworkHistory,
    HomeworkDetail,
    DetailStudyGuide,
    ChooseUpdate,
    DetailItem,
}, {
    initialRouteName: 'MapScreenStudent',
    headerMode: 'none',
    navigationOptions: ({navigation}) => ({
        tabBarVisible: navigation.state.index < 1,
    }),
});

const StudyForTestStack = createStackNavigator({
    StudyForTest,
    DetailsStudyForTest,
    ExamStudyForTest:{
        name: 'ExamStudyForTest',
        screen: ExamStudyForTest,
        navigationOptions: {
            gesturesEnabled: false,
        },
    },
    ResultStudyForTest,
    SeeTheAnswer,
    ResultStudy,
    OverView,
    PracticeHistoryExam:{
        screen:PracticeHistory,
    },
    PracticeHistoryDetail,
    PracticeExplain,
}, {
    initialRouteName: 'StudyForTest',
    headerMode: 'none',
    navigationOptions: ({navigation}) => ({
        tabBarVisible: navigation.state.index < 1,
    }),
});

const FunctionStudent = createStackNavigator({
    FunctionScreen: {screen: FunctionScreen},
    InBoxScreen: { screen: NewChatScreen },
    CreateInboxScreen: {screen: CreateInboxScreen},
    InboxDetailsScreen: {screen: InboxDetails},
    ProfileScreen: {screen: ProfileScreen},
    SettingScreen: {screen: SettingScreen},
    LisenceScreen: {screen: LisenceScreen},
    ManagerFileScreen: {screen: ManagerFileScreen},
    CheckExserciseScreen: {screen: CheckExserciseScreen},
    FreeLearningScreen: {screen: FreeLearningScreen},
    ListLesson: {screen: ListLesson},
    StudyPlan: { screen: StudyPlan },
    TimeTable: { screen: TimeTable },
    ChangePassScreen,
    LinkAccScreen: {screen: LinkAcc},
    ChooseUpdate,
    DetailItem,
    History,
    SeeTheAnswer,
    NewProfileScreen: { screen: NewProfileScreen },
    NewEditProfileScreen: { screen: NewEditProfileScreen },
    ParentLinkingScreen: { screen: ParentLinkingScreen },

    ClassScreen: { screen: ClassScreen },
    ExerciseStudent: { screen: ExerciseStudent },
    ProjectNew: { screen: ProjectNew },
    ExamStudyForTest: { screen: ExamStudyForTest },
    ResultStudyForTest: {screen: ResultStudyForTest},
    ResultStudy,
    OverView,

    CommonSetting: {screen: CommonSetting},
    SettingContact: {screen: SettingContact},
    SettingSupport: {screen: SettingSupport},
    ChangePassword: {screen: ChangePassword},
    SettingAbout: {screen: SettingAbout},
    SettingPolicy: {screen: SettingPolicy},
    ContactScreen: {screen: ContactScreen},
    LanguageSetting: {screen: LanguageSetting},
    StudentWrittingScreen: {screen: MarkWrittingScreen},
    HomeworkDetail,
    DetailStudyGuide,
    UpgradeAccount: {screen: UpgradeAccount},
    PayHistory,
    EnterPurchasedPackage,
    BuyPackage,
    PickPackage,
}, {
    initialRouteName: 'FunctionScreen',
    headerMode: 'none',
    navigationOptions: ({ navigation }) => ({
        tabBarVisible: navigation.state.index < 1,
    }),

});

const ProcessScreenStudent = createStackNavigator({
    AchievementBoardNewScreen: { screen: AchievementBoardNewScreen },
    AchivementOfflineDetail,
    DetailsLessonStudent:{
        screen:DetailsLesson,
    },
    StudyDiaryStudentScreen: { screen: StudyDiaryTeacherScreen },
    RankScreen: { screen: RankScreen },
}, {
    initialRouteName: 'AchievementBoardNewScreen',
    headerMode: 'none',
    navigationOptions: ({ navigation }) => ({
        tabBarVisible: navigation.state.index < 1,
    }),
});

const TabNavigator = createBottomTabNavigator(
    {
        'Trang chủ': {
            screen: HomeScreenStudent,
            navigationOptions: () => ({
                tabBarIcon: ({tintColor, focused}) => {
                    return (
                        <Image
                            style={{
                                width: SmartScreenBase.smPercenWidth * 8,
                                height: SmartScreenBase.smPercenWidth * 8,
                                // tintColor: tintColor,
                                resizeMode: 'contain',
                            }}
                            source={focused ? ICON_HOME_AC : ICON_HOME_IN}

                        />
                    );
                },
            }),
        },
        'Giáo trình': {
            screen: MapScreen,
            navigationOptions: ({navigation}) => ({
                tabBarIcon: ({tintColor, focused}) => {
                    return (
                        <Image
                            style={{
                                width: SmartScreenBase.smPercenWidth * 8,
                                height: SmartScreenBase.smPercenWidth * 8,
                                // tintColor: tintColor,
                                resizeMode: 'contain',
                            }}
                            source={focused ? ICON_BOOK_AC : ICON_BOOK_IN}

                        />
                    );
                },
            }),
        },
        'Luyện Thi': {
            screen: StudyForTestStack,
            navigationOptions: () => ({
                tabBarIcon: ({tintColor, focused}) => {
                    return (
                        <Image
                            style={{
                                width: SmartScreenBase.smPercenWidth * 8,
                                height: SmartScreenBase.smPercenWidth * 8,
                                // tintColor: tintColor,
                                resizeMode: 'contain',
                            }}
                            source={focused ? ICON_LUYENTHI_AC : ICON_LUYENTHI_IN}

                        />
                    );
                },
            }),
        },
        'Thành tích': {
            screen: ProcessScreenStudent,
            navigationOptions: () => ({
                tabBarIcon: ({tintColor, focused}) => {
                    return (
                        <Image
                            style={{
                                width: SmartScreenBase.smPercenWidth * 8,
                                height: SmartScreenBase.smPercenWidth * 8,
                                // tintColor: tintColor,
                                resizeMode: 'contain',
                            }}
                            source={focused ? ICON_CUP_AC : ICON_CUP_IN}

                        />
                    );
                },
            }),
        },
        'Thêm': {
            screen: FunctionStudent,
            navigationOptions: () => ({
                tabBarIcon: ({tintColor, focused}) => {
                    return (
                        <Image
                            style={{
                                width: SmartScreenBase.smPercenWidth * 8,
                                height: SmartScreenBase.smPercenWidth * 8,
                                // tintColor: tintColor,
                                resizeMode: 'contain',
                            }}
                            source={focused ? ICON_THEM_AC : ICON_THEM_IN}
                        />
                    );
                },
            }),
        },
    },
    {
        tabBarOptions: {
            showLabel: true,
            activeTintColor: '#00A69C',
            inactiveTintColor: '#404041',
            style: {
                backgroundColor: 'transparent',
                height: SmartScreenBase.smPercenHeight * 9,
                marginBottom: DeviceInfo.hasNotch() ? -SmartScreenBase.smPercenHeight * 2 : 0,
                borderTopColor: 'transparent',
            },
            labelStyle: {
                // fontSize: SmartScreenBase.smFontSize * 35,
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
                    {/* <ImageBackground
                        source={{ uri: 'gv_footer' }}
                        resizeMode={'stretch'}
                        style={{
                            width: '100%',
                            height: height / 11,
                            position: 'absolute',
                            bottom: 0,
                        }}> */}
                    <TabBarComponent {...props} />
                    {/* </ImageBackground> */}
                </React.Fragment>
            );
        },
    },
);

const StudentStack = createStackNavigator(
    {
        TabNavigator,
        // ClassScreen,
        ListLesson2: {screen: ListLesson},
        AddStudentScreen,
        ExamStudyForTest2:{
            name: 'ExamStudyForTest2',
            screen: ExamStudyForTest,
            navigationOptions: {
                gesturesEnabled: false,
            },
        },
        ListStudentClass,
        // ExerciseStudent,
        GoldBoard,
        Vinhdanh,
        ClassDetail,
        VocabScreen,
        ListVocabScreen,
        registrationClassScreen: { screen: registrationClassScreen },
        InBoxScreen: {screen: NewChatScreen},
        ChatContentScreenStudent: {screen: ChatContentScreenNew},
        DetailSystemMessageScreenStudent: {screen: DetailSystemMessageScreen},
        SendMessageScreenNewStudent: {screen: SendMessageScreenNew},
    },
    {
        headerMode: 'none',
    }
);

export default StudentStack;
