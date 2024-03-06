import React, {useState, useEffect, useRef} from 'react';
import {
    ImageBackground, Text, Animated, View, TextInput, Alert, Image, TouchableOpacity, SafeAreaView, Keyboard, Platform, StatusBar, ScrollView, TouchableWithoutFeedback,
} from 'react-native';
import styles from './styles';
import SmartScreenBase from '../../../base/SmartScreenBase';
import HeaderGradient from '../../../commons/HeaderGradient';
import Page1Register from './components/Page1Register';
import Page2Register from './components/Page2Register';
import { AppHeader } from '../../../componentBase/AppHeader/AppHeader';
import Page3Register from './components/Page3Register';
import APIBase from '../../../base/APIBase';
import API from '../../../API/APIConstant';
import { LoadingScreen2 } from '../../LoadingScreen';
import { connect } from 'react-redux';
import {FullScreenLoadingIndicator} from '../../../componentBase/indicator/FullScreenLoadingIndicator'

const Register = (props) => {
    const { params } = props.navigation.state;
    console.log("=====paramsH",params)
    const { accessToken: accessTokenParams, from: fromParams, userInfo: userInfoParams, identityToken: identityTokenParams } = params || {};
    const [from, setFrom] = useState(fromParams ? fromParams : '');
    const [accessToken, setAccessToken] = useState(accessTokenParams ? accessTokenParams : '');
    // const [idToken, setIdToken] = useState(idTokenParams ? idTokenParams : '');
    const [identityToken, setIdentityToken] = useState(identityTokenParams ? identityTokenParams : '' );
    const [loading, setLoading ] = useState(false);
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [mUserInfo, setUserInfo] = useState(userInfoParams);
    const [email, setEmail] = useState((from == 'google' || from == 'facebook') ? userInfoParams?.email : '');

    const [role, setRole] = useState('');
    const [grade, setGrade] = useState('');
    const [typeSchool, setTypeSchool] = useState(null);

    const fadeAnim = useRef(new Animated.Value(SmartScreenBase.smPercenHeight * 25)).current;
    const [currentPageIndex, setCurrentPageIndex ] = useState(0);

    let scrollRef = React.useRef();

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
        Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
        // getProvinces();
        return () => {
            Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
            Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
        };
    }, []);

    const _keyboardDidShow = (e) => {
        Animated.timing(fadeAnim, {
            ...Platform.select({
                ios: {
                    toValue: e.endCoordinates.height - SmartScreenBase.smPercenHeight * 3 * 2,
                },
                android: {
                    toValue: -SmartScreenBase.smPercenHeight * 2,
                },
            }),
            duration: 500,
        }).start();
    };

    const _keyboardDidHide = () => {
        Animated.timing(fadeAnim, {
            toValue: SmartScreenBase.smPercenHeight * 25,
            duration: 500,
        }).start();
    };

    const goToNextPage = () => {
        Keyboard.dismiss();
        if (currentPageIndex == 2){
            return;
        }
        if (scrollRef){
            scrollRef.current.scrollTo({
                x: (currentPageIndex + 1) * SmartScreenBase.screenWidth,
                animation: true,
            });
        }
        setCurrentPageIndex(currentPageIndex + 1);
    };

    const goToPrevPage = () => {
        Keyboard.dismiss();
        if (currentPageIndex == 0){
            return;
        }
        if (scrollRef){
            scrollRef.current.scrollTo({
                x: (currentPageIndex - 1) * SmartScreenBase.screenWidth,
                animation: true,
            });
        }
        setCurrentPageIndex(currentPageIndex - 1);
    };


    const setDataPage1 = (emailData, passwordData, re_pass_data) =>{
        if (from !== 'google'){
            setEmail(emailData);
        }
        if (from === ''){
            setPassword(passwordData);
            setRePassword(re_pass_data);
        }
    };
    const setDataPage2 = (roleData, gradeData, typeSchoolData) =>{
        setRole(roleData);
        setGrade(gradeData);
        setTypeSchool(typeSchoolData);
    };

    return (
        <TouchableWithoutFeedback style={{flex: 1}} onPress={Keyboard.dismiss}>
            <>
                <StatusBar translucent/>
                <AppHeader
                    title="Đăng ký tài khoản"
                    leftIconOnPress={()=>{
                        if (currentPageIndex > 0){
                            goToPrevPage();
                            return;
                        }
                        props.navigation.goBack();
                    }}
                />
                <ScrollView
                    style={{backgroundColor: '#F3FFFF'}}
                    horizontal={true}
                    pagingEnabled
                    scrollEnabled={false}
                    keyboardShouldPersistTaps="handled"
                    showsHorizontalScrollIndicator={false}
                    ref={scrollRef}
                >
                    {console.log("=====from",from)}
                    {
                        from !== 'google' && from !== 'apple' && (
                            <Page1Register
                                {...props}
                                goToNextPage={()=> {
                                    goToNextPage();
                                }}
                                setDataPage1={setDataPage1}
                                from={from}
                                email={email}
                                setLoading={setLoading}
                                setFrom={setFrom}
                                setAccessToken={setAccessToken}
                                setUserInfo={setUserInfo}
                                setIdentityToken={setIdentityToken}
                                setEmail={setEmail}
                            />
                        )
                    }
                    <Page2Register
                        {...props}
                        goToNextPage={()=> {
                            goToNextPage();
                        }}
                        setDataPage2={setDataPage2}
                        currentPageIndex={currentPageIndex}
                        setLoading={setLoading}
                        goToPrevPage={goToPrevPage}
                        from={from}
                        identityToken={identityToken}
                    />
                    <Page3Register
                        {...props}
                        goToNextPage={()=>{
                            goToNextPage();
                        }}
                        goToPrevPage={goToPrevPage}
                        userInfo={mUserInfo}
                        dataPrevPage={{
                            email,
                            password,
                            re_password: rePassword,
                            role,
                            grade,
                            typeSchool,
                        }}
                        navigation={props.navigation}
                        currentPageIndex={currentPageIndex}
                        setLoading={setLoading}
                        from={from}
                        accessToken={accessToken}
                        // idToken={idToken}
                        identityToken={identityToken}
                    />
                </ScrollView>
                <FullScreenLoadingIndicator visible={loading} />
            </>
        </TouchableWithoutFeedback>
    );
};

export default connect()(Register);
