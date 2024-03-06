import React, { Component } from 'react';
import {
    ImageBackground,
    Text,
    Image,
    Dimensions,
    View,
    Keyboard,
    SafeAreaView,
    Animated,
    TouchableOpacity,
    Modal,
    Alert, Platform, StatusBar, TouchableWithoutFeedback, ScrollView,
} from 'react-native';
import {
    AccessToken,
    GraphRequest,
    GraphRequestManager,
    LoginManager,
} from 'react-native-fbsdk-next';
import {
    GoogleSignin,
} from '@react-native-community/google-signin';
import styles from './styles';
import SmartScreenBase, { STATUSBAR_HEIGHT } from '../../../base/SmartScreenBase';
import MInput from '../../../items/MInput';
import MButton from '../../../items/MButton';
import MyData from '../../../component/MyData';
import API from '../../../API/APIConstant';
import axios from 'axios';
import LoadingScreen from '../../LoadingScreen';
import {ActionLogin, setDeviceId, setVersionIgo} from '../../../redux/actions/ActionLogin';
import { connect, useSelector } from 'react-redux';
import APIBase from '../../../base/APIBase';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import HeaderLogin from '../../../componentBase/HeaderLogin';
import LinearGradient from 'react-native-linear-gradient';
import BorderTextInput from '../../../componentBase/BorderTextInput/index.js';
import images from '../../../assets/images';
import Button, { ButtonGradien } from '../../../commons/Button';
import FontBase from '../../../base/FontBase';
import { WIDTH_DESIGN } from '../../../utils/configs';
import { validateEmail } from '../../../utils/validation';
import { ShortMainButton } from '../../../componentBase/ShortMainButton';
import { error_text } from './common/strings';
import { RadioButtonBox } from '../../../componentBase/RadioButtonBox';
import { hideAlert, showAlert } from '../../../componentBase/BaseAlert';
import deviceContr from '../../../utils/device';
import LogBase from '../../../base/LogBase';
import UpdateVersionModal from '../../../componentBase/UpdateVersionModal/UpdateVersionModal'
import { ComponentLoadingIndicator } from '../../../componentBase/indicator/ComponentLoadingIndicator';

const Baseheight = Dimensions.get('screen').height / 100;
const baseWidth = Dimensions.get('screen').width / 100;
let userRole = 'student';

class loginScreen extends Component {

    static heightKeyBoard = 0;

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errorText: '',
            responseresult: null,
            userInfo: {},
            isLoading: false,
            modalVisible: false,
            modalVisibleGoogle: false,
            fadeAnim: new Animated.Value(SmartScreenBase.smPercenHeight * 10),
            isShowPass: false,
            errorEmail: {
                isError: false,
                errorString: error_text.email_validate,
            },
            errorPassword: {
                isError: false,
                errorString: error_text.password_length,
            },
            isShowUpdate: false,
            dataUpdateVer: null,
        };
    }

    componentDidMount = async () => {
        Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
        this.props.navigation.addListener('willFocus', () => {
            const { navigation } = this.props;
            // this.setState({ username: navigation.getParam('username') });
            // this.setState({ password: navigation.getParam('password') });
            this.setState({
                username: '',
                password: '',
                errorEmail: {
                    isError: false,
                    errorString: '',
                },
                errorPassword: {
                    isError: false,
                    errorString: '',
                },
                errorText: '',
            });
        });

        this.callCheckVersion()

        return () => {
            Keyboard.removeListener('keyboardDidShow', this._keyboardDidShow);
            Keyboard.removeListener('keyboardDidHide', this._keyboardDidHide);
        };
    };

    componentWillUnmount = async () => {
    }

    _keyboardDidShow = (e) => {
        Animated.timing(this.state.fadeAnim, {
            ...Platform.select({
                ios: {
                    toValue: e.endCoordinates.height - SmartScreenBase.smPercenHeight * 3 * 2,
                },
                android: {
                    toValue: -SmartScreenBase.smBaseWidth * 113 - SmartScreenBase.smPercenHeight * 3 * 2 - SmartScreenBase.smPercenWidth * 4
                        - SmartScreenBase.smPercenWidth * 11 - SmartScreenBase.smPercenWidth * 3,
                },
            }),
            duration: 500,
        }).start();
    };

    _keyboardDidHide = () => {
        Animated.timing(this.state.fadeAnim, {
            toValue: SmartScreenBase.smPercenHeight * 10,
            duration: 500,
        }).start();
    };

    callCheckVersion = async () => {

        var url = API.baseurl + API.check_version + `?version_number=${deviceContr.getBuildNumber()}&os=${Platform.OS}&build_path=${MyData.buildPart}`
        try{
            var res = await APIBase.postDataJson('GET', url)
            if(res.data.status){
                if(res.data.data.is_update){
                    if(!this.props.dataVersion || this.props.dataVersion.version_number < res.data.data.version_number || this.props.dataVersion.build_path < res.data.data.build_path){
                        this.setState({isShowUpdate: true, dataUpdateVer: res.data.data})
                    }
                }
            }else{

            }
        }catch(e){

        }
    }

    cancelUpdate = () => {
        this.props.dispatch(setVersionIgo({version_number: this.state.dataUpdateVer.version_number, build_path: this.state.dataUpdateVer.build_path}));
        this.setState({isShowUpdate: false})
    }

    fillDataLogin = async (response, loginDataCache, mDevice_id) => {
        LogBase.log("=====fillDataLogin 1")
        let dataRedux = response.data.data_user;
        dataRedux.jwt_token = response.data.jwt_token;
        dataRedux.access_token = response.data.access_token
        dataRedux.dataToLogin = loginDataCache;

        this.props.dispatch(ActionLogin(dataRedux));
        this.props.dispatch(setDeviceId(mDevice_id));
        LogBase.log("=====fillDataLogin 2")
        APIBase.dataLogin = loginDataCache;
        APIBase.updateJWT(response.data.jwt_token);
        APIBase.updateAccess_token(response.data.access_token);
        LogBase.log("=====fillDataLogin 3",APIBase.jwt_token)
        MyData.TokenUser.id = response.data.data_user.id;
        MyData.UserLogin = response.data.data_user;   
    }  

    doWhenLoginDone = async (response, loginDataCache, mDevice_id) => {
        LogBase.log("=====doWhenLoginDone 1")
        await this.fillDataLogin(response, loginDataCache, mDevice_id)
        LogBase.log("=====doWhenLoginDone 2", response.data.user_role)
        if (response.data.user_role === 'teacher' || response.data.data_user.role === 'teacher') {
            //                       this.callTestPushNotification();
            this.props.navigation.navigate('TeacherApp');
        } else if (response.data.user_role === 'parent' || response.data.data_user.role === 'parent') {
            // if(LogBase.isDebug){
                this.props.navigation.navigate(response.data.data_user?.last_login ? 'ParentApp' : 'IntroScreen');
            // }else 
            // showAlert('', "Sunday English hiện không hỗ trợ tài khoản phụ huynh");
        } else if (response.data.user_role === 'student' || response.data.data_user.role === 'student') {
            if(!response.data.data_user.last_login){
                MyData.isFirstLogin = true
            } 
            //MyData.isFirstLogin = true // xoá đi
            this.props.navigation.navigate('StudentApp');
        }else {
            showAlert('', "Sunday English hiện không hỗ trợ tài khoản "+response.data.user_role);
        } 
        LogBase.log("=====doWhenLoginDone 3", response.data.data_user.role)

    }

    runtest = () => {
        var de = []
        var kho = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        for(var i=0; i<kho.length; i++){

        }
    }

    _presslogin = async () => {
        Keyboard.dismiss();
        let hasError = false;
        this.setState({
            errorEmail: {
                isError: false,
                errorString: '',
            },
            errorPassword: {
                isError: false,
                errorString: '',
            },
            errorText: '',
        });
        if (!validateEmail(this.state.username.trim())){
            this.setState({
                errorEmail: {
                    isError: true,
                    errorString: error_text.email_validate,
                },
            });
            hasError = true;
        }
        if (this.state.password && this.state.password.length < 6){
            this.setState({
                errorPassword: {
                    isError: true,
                    errorString: error_text.password_length,
                },
            });
            hasError = true;
        }
        if (this.state.password.trim().length == 0){
            this.setState({
                errorPassword: {
                    isError: true,
                    errorString: error_text.passAllSpace,
                },
            });
            hasError = true;
        }
        if (hasError){
            return;
        }

        const url = API.baseurl + API.login_Id_Pass;
        const rootData = await deviceContr.getDataDeviceNormal(this.state.username.trim(), this.state.password);
        var qs = require('qs');
        const data = qs.stringify(rootData);
        data['platform_app_id'] = 
        LogBase.log('=====getDataDeviceNormal',rootData);
        this.setState({ isLoading: true });
        try {
            const response = await APIBase.nonTokenAPI('put', url, data);
            LogBase.log("=====Login",response.data);
            LogBase.log("=====jwt",APIBase.jwt_token);
            if (response && response.data.status) {

                var loginDataCache = {}
                loginDataCache.type = APIBase.Type.ID_Pass;
                loginDataCache.userName = this.state.username.trim()
                loginDataCache.pass = this.state.password
                LogBase.log("=====loginDataCache",loginDataCache);

                this.doWhenLoginDone(response, loginDataCache, rootData.device_id)

            } else if (response) {
                const messgage = (response.data.msg || 'Hệ thống không phản hồi').replace(/\t/g,'');
                if (response.data.msg_style === 'text_error'){
                    this.setState({
                        errorText: messgage,
                    });
                } else {
                    if (response.data.need_confirm_email){
                        showAlert('',messgage, {text: 'Đồng ý'}, {renderBottom: this.renderBottomAlert});
                    } else {
                        showAlert('',messgage);
                    }
                }
            }
            this.setState({ isLoading: false });
        } catch (error) {
            this.setState({ isLoading: false });
            console.log('error', error);
            if (error.message === 'Network Error') {
                showAlert('','Vui lòng kiểm tra kết nối Internet');
            }
        }

    };

    renderBottomAlert = () => {
        return (
            <TouchableOpacity
                onPress={this.resendEmail}
            >
                <Text style={styles.resendEmailText}>Gửi lại email kích hoạt khác</Text>
            </TouchableOpacity>
        );
    }

    resendEmail = async () => {
        hideAlert();
        this.setState({ isLoading: true});
        const url = API.baseurl + API.resend_active_email + '?email=' + this.state.username.trim();
        try {
            const response = await APIBase.nonTokenAPI('get', url);
            const messgage = (response.data.msg || 'Hệ thống không phản hồi').replace(/\t/g,'');
            showAlert('',messgage);
            this.setState({ isLoading: false});

        } catch (error) {
            console.log('resendEmail', error);
            this.setState({ isLoading: false});

        }
    }

    getInfoFromToken = async (token) => {
        this.setState({ isLoading: true });
        const url = API.baseurl + API.loginFacebook;
        const headers = {
            'Content-Type': 'application/json',
            'jwt_token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6ImFkbWluIiwidGltZV9sb2dpbiI6MTU3ODkwNzQyM30.CFZyO9a-qBmyI8Q25AqGNd1nxWn1SO5TMC_yBxjgWCA',
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
        };
        const rootData = await deviceContr.getDataDeviceFace(token,'', '');
        var qs = require('qs');
        const data = qs.stringify(rootData);
        console.log('=====face',rootData);
        try {
            const response = await APIBase.nonTokenAPI('post', url, data);
            console.log("=====resSVGoogle",response.data);
            this.setState({ isLoading: false });
            if (response.data.status) {

                var loginDataCache = {}
                loginDataCache.type = APIBase.Type.Facebook;
                loginDataCache.token = token;
                LogBase.log("=====loginDataCache",loginDataCache);

                this.doWhenLoginDone(response, loginDataCache, rootData.device_id)

            } else {
                if (response.data.is_new_acc === '1') {
                    var changeDT = { accessToken: token, from: 'facebook', email:  response.data.user_data || '' }
                    this.props.navigation.navigate('RegisterScreen', changeDT);
                } else {
                    showAlert('', response.data.msg);
                }
            }
        } catch (error) {
            this.setState({ isLoading: false });
            showAlert('', error.response.data.msg);
            console.log(error.response.data);
        }
    };

    loginWithFacebook = async () => {
        console.log('loginWithFacebook');
        try {
            try {
                LogBase.log("=====start logout face","")
                LoginManager.logOut();
            } catch (error) {
                LogBase.log("===>>nothing to logout face","")
            }
            LoginManager.setLoginBehavior('NATIVE_ONLY');
            //LoginManager.setLoginBehavior('WEB_ONLY');
            //           console.log('loginWithFacebook == 1');
            LoginManager.logInWithPermissions(['public_profile']).then(
                login => {
                    if (login.isCancelled) {
                        console.log('Login cancelled');
                    } else {
                        AccessToken.getCurrentAccessToken().then(data => {
                            console.log("=====resFace",data);
                            const accessToken = data.accessToken.toString();
                            this.getInfoFromToken(accessToken);
                        });
                    }
                },
                error => {
                    console.log("=====Face error"+error);
                    if (APIBase.facebookRelogin == 0) {
                        APIBase.facebookRelogin = 1
                        LoginManager.logOut();
                        this.loginWithFacebook();
                    } else {
                        // showAlert('', 'Đăng nhập không thành công do ' + error);
                        console.log('error', error);
                    }
                },
            );
        } catch (nativeError) {
            try {
                console.log('Login native with error: ', nativeError);
                LoginManager.setLoginBehavior('WEB_ONLY');
                LoginManager.logInWithPermissions(['public_profile']).then(
                    login => {
                        if (login.isCancelled) {
                            console.log('Login cancelled');
                        } else {
                            AccessToken.getCurrentAccessToken().then(data => {
                                const accessToken = data.accessToken.toString();
                                this.getInfoFromToken(accessToken);
                            });
                        }
                    },
                    error => {
                        // showAlert('', 'Đăng nhập không thành công do ' + error);
                        console.log('Login fail with error: ' + error);
                    },
                );
            } catch (webError) {
                // showAlert('', 'Đăng nhập không thành công!');
            }
        }
    };

    gotoRegisterScreen() {
        this.props.navigation.navigate('RegisterScreen', {from: ''});
    }

    changeText(text, id) {
        if (id == 1) {
            //console.log(text);
            //this.state.username=text;
            //console.log(text)
            this.setState({ username: text });
        } else if (id == 2) {
            //console.log(text);
            this.setState({ password: text });
        }
    }

    googleLogin = async () => {
        // { webClientId: '906644438510-1gc259525vacoqa2979hdmvv0ovqe0bm.apps.googleusercontent.com' }
        // var clientId = Platform.OS == 'ios' ? '906644438510-eid5lsm4ndgtu0qh2lbrk31tl8r7rrt6.apps.googleusercontent.com' : '906644438510-8usrv1kejfl0o3fqt7v0g5mlloml9tdi.apps.googleusercontent.com'
        // GoogleSignin.configure({webClientId: '906644438510-eid5lsm4ndgtu0qh2lbrk31tl8r7rrt6.apps.googleusercontent.com', offlineAccess: true})
        GoogleSignin.configure()
        try {
            console.log('=====googleLogin')
            const user = await GoogleSignin.getCurrentUser();
            console.log('=====user',user)
            if (user) {
                console.log('=====signOut start')
                await GoogleSignin.revokeAccess();
                await GoogleSignin.signOut();
                console.log('=====signOut done')
            }

            await GoogleSignin.hasPlayServices();
            console.log('=====hasPlayServices done')
            const userInfo = await GoogleSignin.signIn();
            console.log('=====GoogleSignin.signIn',userInfo)
            const currentUser = await GoogleSignin.getTokens();
            console.log('=====currentUser',currentUser)
            this._loginGoogle(currentUser.accessToken, userInfo.user);
        } catch (error) {
            if (error.code != -5 && error.code != 12501){ //if not cancel
                showAlert('', 'Đăng nhập không thành công! (code '+error.code+')');
            }
            console.log('=====errorGG', error.code, error);
        }
    };

    appleLogin = async () => {
        const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGIN,
            requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        });
        let { identityToken } = appleAuthRequestResponse;
        // get current authentication state for user
        // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
        const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);
        // use credentialState response to ensure the user is authenticated
        if (credentialState === appleAuth.State.AUTHORIZED) {
            // let identityToken = 'eyJraWQiOiJlWGF1bm1MIiwiYWxnIjoiUlMyNTYifQ.eyJpc3MiOiJodHRwczovL2FwcGxlaWQuYXBwbGUuY29tIiwiYXVkIjoiY29tLmRvdG1lZXRkb3QucmVtaW5kYSIsImV4cCI6MTYxMjQyNDk3MSwiaWF0IjoxNjEyMzM4NTcxLCJzdWIiOiIwMDAxOTguNjMzYjA5NWZlNmUwNDU2MmI0NjI4NjJjODEzMjVlOGQuMDc0OCIsIm5vbmNlIjoiODk5MzJhOTJiMjIyZmQ4ZDU2YmExNTI1YWI1NmM0OThmMGE5OGQzMDcyNmJjMWMzYTQzZGI3OTZiMWQ2OGQ2NyIsImNfaGFzaCI6InFOcGJrSmk1dF9xRkpSZXVRZXhUZXciLCJlbWFpbCI6Im1wNHBzM3JxYXBAcHJpdmF0ZXJlbGF5LmFwcGxlaWQuY29tIiwiZW1haWxfdmVyaWZpZWQiOiJ0cnVlIiwiaXNfcHJpdmF0ZV9lbWFpbCI6InRydWUiLCJhdXRoX3RpbWUiOjE2MTIzMzg1NzEsIm5vbmNlX3N1cHBvcnRlZCI6dHJ1ZX0.wWwu4gXSYr2KmmQX5LhdECmVP98kl-loPJHiplJSK9r19Xes6M_rLT_lyEgJ8wLT3xE1P9ugDt2nQOMRK0E2hMFEa9r6gwMF0gQ5A--0M_uR_lJm619vaF7kYEHS57cDnlC682sM0wRy2EL9ZbyKkxRnSOKaxlrXLp3-caotRIgx9c_MHDU1LezY3VwFMDTfY8xqopXShlW0ZKvgzO2xHOqFHBHakzGQtzsDwIh0-J4LKi-gwwf8a6PsJEYfJ1gwPvBl5vavKSyX6XybfFrEfGdVxZhTDbmhWz8PuNEZWiRp10PDKIJ2-kmx8-PlpILoeOzrgkWyDqQbg_TxShjDAw'
            // user is authenticated
            this.setState({ isLoading: true });
            const url = API.baseurl + API.loginApple;
            const headers = {
                'Content-Type': 'application/json',
                'jwt_token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6ImFkbWluIiwidGltZV9sb2dpbiI6MTU3ODkwNzQyM30.CFZyO9a-qBmyI8Q25AqGNd1nxWn1SO5TMC_yBxjgWCA',
                'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
                'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
            };
            const rootData = await deviceContr.getDataDeviceApple(identityToken,1,'', '');
            var qs = require('qs');
            const data = qs.stringify(rootData);
            try {
                //const response = await axios({ method: 'post', url, headers, data });
                const response = await APIBase.nonTokenAPI('post', url, data);
                this.setState({ isLoading: false });
                if (!response.data.status) {
                    if (response.data.is_new_acc === '1') {
                        this.props.navigation.navigate('RegisterScreen', { identityToken, from: 'apple' });
                        return;
                    }
                    showAlert(null,response.data.msg);
                    return;
                }
                if (response.data.status) {

                    var loginDataCache = {}
                    loginDataCache.type = APIBase.Type.Apple;
                    loginDataCache.token = identityToken;
                    LogBase.log("=====loginDataCache",loginDataCache);
    
                    this.doWhenLoginDone(response, loginDataCache, rootData.device_id)

                } else {
                    showAlert('', response.data.msg);
                }
                this.setState({ isLoading: false });
            } catch (error) {
                this.setState({ isLoading: false });
                showAlert('', error.response.data.msg);
                console.log(error.response.data);
            }
        }
    };


    _loginGoogle = async (accessToken, userInfo) => {
        this.setState({ isLoading: true });
        const url = API.baseurl + API.loginGoogle;
        const headers = {
            'Content-Type': 'application/json',
            'jwt_token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6ImFkbWluIiwidGltZV9sb2dpbiI6MTU3ODkwNzQyM30.CFZyO9a-qBmyI8Q25AqGNd1nxWn1SO5TMC_yBxjgWCA',
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
        };
        const rootData = await deviceContr.getDataDeviceGoogle(accessToken, userInfo,'', '');
        console.log("=====getDataDeviceGoogle",rootData);
        var qs = require('qs');
        const data = qs.stringify(rootData);
        try {
            //const response = await axios({ method: 'post', url, headers, data });
            const response = await APIBase.nonTokenAPI('post', url, data);
            console.log("=====ResSVGoogle",response.data);
            this.setState({ isLoading: false });
            if (response.data.status) {

                var loginDataCache = {}
                loginDataCache.type = APIBase.Type.Google;
                loginDataCache.token = accessToken;
                loginDataCache.userInfo = userInfo;
                LogBase.log("=====loginDataCache",loginDataCache);

                this.doWhenLoginDone(response, loginDataCache, rootData.device_id)

            } else {
                if (response.data.is_new_acc === '1') {
                    this.props.navigation.navigate('RegisterScreen', { accessToken,  userInfo, from: 'google' });
                } else {
                    showAlert('', response.data.msg);
                }
            }
            this.setState({ isLoading: false });
        } catch (error) {
            this.setState({ isLoading: false });
            showAlert('', error.response.data.msg);
            console.warn("=====GG error",error.response.data);
        }
    };

    callTestPushNotification = async () => {
        const url = API.baseurl + API.test_push_notification;
        const data = {
            title: 'Đây là thông báo test',
            content: 'Covid đến rồi',
        };
        console.log('=====link', url);
        const response = await APIBase.tokenAPI('post', url, data);
        console.log('callTestPushNotification', response.data);
    }

    render() {
        const { isShowPass, errorEmail, errorPassword, errorText } = this.state;
        return (
            <>
                {
                    this.state.isLoading && <LoadingScreen />
                }
                <TouchableWithoutFeedback style={{flex: 1}} onPress={Keyboard.dismiss} >
                    <LinearGradient
                        colors={['#00E2A0','#00B9B7']}
                        style={{flex: 1}}
                        start={{ x: 0, y: 0 }} end={{ x: 0, y: 0.35 }}
                    >

                        <HeaderLogin/>
                        {
                            (this.state.modalVisible || this.state.modalVisibleGoogle)
                    &&
                    <View
                        style={{
                            height: Baseheight * 100,
                            width: baseWidth * 100,
                            backgroundColor: '#00000060',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            zIndex: 10,
                        }} />
                        }
                        <View style={{ flex: 1, backgroundColor: '#F3FFFF00' }}>

                            <ScrollView scrollEnabled={false} keyboardShouldPersistTaps="handled" contentContainerStyle={{flexGrow: 1}} >
                                <View style={styles.formLoginNew}>
                                    {/** input email */}
                                    {!!errorText && <Text style={[styles.errorText, {marginBottom: 2}]}>{errorText}</Text>}
                                    <BorderTextInput
                                        leftIcon={images.ICON_EMAIL}
                                        textInputProps={{
                                            placeholder: 'Nhập email',
                                            autoCapitalize: 'none',
                                            onBlur: () => {
                                                if (this.state.username && !validateEmail((this.state.username.trim() || '').trim())){
                                                    this.setState({
                                                        errorEmail:{
                                                            isError: true,
                                                            errorString: error_text.email_validate,
                                                        },
                                                    });
                                                }
                                            },
                                        }}
                                        value={this.state.username}
                                        onChangeText={(text)=>{
                                            this.setState({
                                                username: text,
                                                errorEmail: {
                                                    isError: false,
                                                    errorString: '',
                                                },
                                                errorText: '',
                                            });
                                        }}
                                        isError={errorEmail.isError}
                                        errorText={errorEmail.errorString}
                                        // keyboardType="email-address"
                                        containerStyle={{marginVertical: 8}}
                                    />
                                    <BorderTextInput
                                        leftIcon={images.ICON_LOCK}
                                        rightIcon={isShowPass ? images.ICON_SHOW_PASS : images.ICON_HIDE_PASS }
                                        onPressRightIcon={()=> {
                                            this.setState({
                                                isShowPass: !isShowPass,
                                            });
                                        }}
                                        value={this.state.password}
                                        onChangeText={(text)=>{
                                            this.setState({
                                                password: text,
                                                errorPassword: {
                                                    isError: false,
                                                    errorString: '',
                                                },
                                                errorText: '',
                                            });
                                        }}
                                        isError={errorPassword.isError}
                                        errorText={errorPassword.errorString}
                                        textInputProps={{
                                            placeholder: 'Nhập mật khẩu',
                                            secureTextEntry: !isShowPass,
                                            autoCapitalize: 'none',
                                            onBlur: () => {
                                                if (this.state.password && (this.state.password.length < 6 || this.state.password.trim().length < 1)){
                                                    this.setState({
                                                        errorPassword:{
                                                            isError: true,
                                                            errorString: error_text.passAllSpace,
                                                        },
                                                    });
                                                }
                                            },
                                        }}
                                        containerStyle={{marginVertical: 2}}
                                    />
                                    <TouchableOpacity
                                        style={{
                                            alignSelf: 'flex-end',
                                            marginTop: Baseheight * 2,
                                            marginRight: SmartScreenBase.smPercenWidth * (100 / WIDTH_DESIGN) * 100,
                                        }}
                                        onPress={()=> {
                                            this.props.navigation.navigate('ForgotPassScreen');
                                        }}
                                    >
                                        <Text style={styles.forgotPassword}>Quên mật khẩu?</Text>
                                    </TouchableOpacity>
                                    <View style={{marginTop: Baseheight * 3}}>
                                        <ShortMainButton
                                            onPress={() => {
                                                this._presslogin();
                                            }}
                                            text={'Đăng nhập'}
                                            type={1}
                                            textStyles={styles.txtButtonLogin}
                                            isDisabled={!(validateEmail((this.state.username || '').trim()) && this.state.password && (this.state.password.length >= 6 && this.state.password.trim().length > 0))}
                                        />
                                    </View>
                                    <View style={styles.orContainer}>
                                        <View style={{height: 1, backgroundColor: '#707070', width: SmartScreenBase.smPercenWidth * (250 / WIDTH_DESIGN) * 100 }} />
                                        <Text style={styles.orText}>Hoặc</Text>
                                        <View style={{height: 1, backgroundColor: '#707070', width: SmartScreenBase.smPercenWidth * (250 / WIDTH_DESIGN) * 100 }} />
                                    </View>
                                    <View style={{width: '100%', flexDirection: 'row', justifyContent: 'center'}}>
                                        {/* <TouchableOpacity
                                            onPress={this.loginWithFacebook}
                                        >
                                            <Image
                                                source={images.ICON_FACEBOOK}
                                                style={styles.icon_social}
                                                resizeMode="contain"
                                            />
                                        </TouchableOpacity> */}
                                        <TouchableOpacity
                                            style={{marginLeft: 10}}
                                            onPress={this.googleLogin}
                                        >
                                            <Image
                                                source={images.ICON_GOOGLE}
                                                style={styles.icon_social}
                                                resizeMode="contain"
                                            />
                                        </TouchableOpacity>
                                        {
                                            Platform.OS === 'ios' && (
                                                <TouchableOpacity
                                                    style={{marginLeft: 10}}
                                                    onPress={this.appleLogin}
                                                >
                                                    <Image
                                                        source={images.ICON_APPLE}
                                                        style={styles.icon_social}
                                                        resizeMode="contain"
                                                    />
                                                </TouchableOpacity>
                                            )
                                        }
                                    </View>
                                    <View style={{flex:1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
                                        <Text style={styles.noHaveAccount}>Bạn chưa có tài khoản?</Text>
                                        <TouchableOpacity
                                            onPress={()=>{
                                                this.gotoRegisterScreen();
                                            }}
                                        >
                                            <Text style={styles.signup}>{' Đăng ký'}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                            </ScrollView>
                        </View>
                    </LinearGradient>

                </TouchableWithoutFeedback>
                <UpdateVersionModal isVisible={this.state.isShowUpdate} dataUpdate={this.state.dataUpdateVer} onClose={()=>this.cancelUpdate()}/>
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        dataVersion: state.AuthStackReducer.version_igo,
    };
}

export default connect(mapStateToProps)(loginScreen);
