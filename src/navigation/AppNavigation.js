import {createAppContainer, createSwitchNavigator, NavigationActions} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import React, {useEffect} from 'react';
import {createBottomTabNavigator, BottomTabBar} from 'react-navigation-tabs';
import LoginScreen from '../screens/LoginScreen/Login/login';
import RegisterScreen from '../screens/LoginScreen/Login/register';
import ForgotPassScreen from '../screens/LoginScreen/Login/forgetPass'
import SplashScreen from "../screens/SplashScreen";
import AddInfoScreen from "../screens/LoginScreen/Login/addinfo";
// student Screen
import StudentScreen from './NavigationStudentScreen';
import TeacherFlow from './NavigationTeacher'
import ParentFlow from './NavigationParent'
import AddInfoFacebookGoogle from "../screens/LoginScreen/Login/AddInfoFacebookGoogle";
import AccuracyZalo from '../screens/LoginScreen/Login/AccuracyZalo';
import { IntroScreen } from '../screens/ParentNews';

const TabBarComponent = props => <BottomTabBar {...props} />;

const LoginStack = createStackNavigator(
    {
        LoginScreen,
        RegisterScreen:{
            name: 'RegisterScreen',
            screen: RegisterScreen,
            navigationOptions: {
                gesturesEnabled: false,
            },
        },
        ForgotPassScreen,
        AddInfoScreen,
        AddInfoFacebookGoogle,
        AccuracyZalo,
    },
    {
        headerMode: 'none'
    }
);

const SwitchStack = createSwitchNavigator(
    {
        Splash: SplashScreen,
        LoginApp: LoginStack,
        TeacherApp: TeacherFlow,
        ParentApp: ParentFlow,
        StudentApp: StudentScreen,
        IntroScreen: {screen: IntroScreen},
    },
    {
        initialRouteName: 'Splash',
    }
);

export default createAppContainer(SwitchStack);

