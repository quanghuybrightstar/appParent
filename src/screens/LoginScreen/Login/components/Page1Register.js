/** Sử dụng làm trang 1 (Tạo tài khoản) của màn hình đăng kí  */

import appleAuth from '@invertase/react-native-apple-authentication';
import { GoogleSignin } from '@react-native-community/google-signin';
import React from 'react';
import { Alert, Dimensions, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, Keyboard } from 'react-native';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';
import API from '../../../../API/APIConstant';
import images from '../../../../assets/images';
import APIBase from '../../../../base/APIBase';
import FontBase from '../../../../base/FontBase';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import MyData from '../../../../component/MyData';
import { hideAlert, showAlert } from '../../../../componentBase/BaseAlert';
import BorderTextInput from '../../../../componentBase/BorderTextInput';
import { ShortMainButton } from '../../../../componentBase/ShortMainButton';
import { ActionDataClass } from '../../../../redux/actions/ActionDataClass';
import { ActionLogin, setDeviceId } from '../../../../redux/actions/ActionLogin';
import { HEIGHT_DESIGN, WIDTH_DESIGN } from '../../../../utils/configs';
import { validateEmail } from '../../../../utils/validation';
import { error_text } from '../common/strings';
import deviceContr from '../../../../utils/device';
import LogBase from '../../../../base/LogBase';
const Baseheight = Dimensions.get('screen').height / 100;


export default function Page1Register(props) {
    const { goToNextPage, setDataPage1, from = '', setLoading, setFrom, setAccessToken, setIdentityToken, setEmail: setEmailProp, email: emailProps} = props;
    const [ email, setEmail ] = React.useState(emailProps || '');
    const [ errorEmail, setErrorEmail ] = React.useState({isError: false, errorString: ''});

    const [ password, setPassword ] = React.useState('');
    const [ isShowPass, setShowPass ] = React.useState(false);
    const [ errorPassword, setErrorPassword ] = React.useState({isError: false, errorString: ''});

    const [ re_password, setRePassword ] = React.useState('');
    const [ isShowRePass, setShowRePass ] = React.useState(false);
    const [ errorRePassword, setErrorRePassword ] = React.useState({isError: false, errorString: ''});

    const [ errorText, setErrorText] = React.useState('');

    React.useEffect(()=>{
        if (from === 'facebook' && email !== emailProps){
            setEmail(emailProps);
        }
    },[emailProps]);
    const onContinue = async () => {
        Keyboard.dismiss()
        let hasError = false;
        setErrorEmail({isError: false, errorString: ''});
        setErrorPassword({isError: false, errorString: ''});
        setErrorRePassword({isError: false, errorString: ''});

        if (!validateEmail(email)){
            setErrorEmail({
                isError: true,
                errorString: error_text.email_validate,
            });
            hasError = true;
        }
        if (from === ''){
            if (password.length < 6){
                setErrorPassword({
                    isError: true,
                    errorString: error_text.password_length,
                });
                hasError = true;
            }
            if (re_password !== password){
                setErrorRePassword({
                    isError: true,
                    errorString: error_text.re_pass_validate,
                });
                hasError = true;
            }
        }
        const checkEmailExist = await checkEmail(email.trim());
        setErrorText('');
        if (!checkEmailExist.data.status){
            hasError = true;
            const messgage = (checkEmailExist.data.msg || '').replace(/\t/g,'');
            if (checkEmailExist.data.msg_style === 'text_error'){
                setErrorText(messgage);
            } else {
                if (checkEmailExist.data.need_confirm_email){
                    showAlert('',messgage, {text: 'Đồng ý'}, {renderBottom:renderBottomAlert});
                } else {
                    showAlert('',messgage, {text: 'Đồng ý', onPress: () => { props.navigation.goBack();}});
                }
            }
        }
        if (hasError){
            return;
        }
        if (setDataPage1 instanceof Function) {
            setDataPage1(email, password, re_password);
        }
        if (goToNextPage instanceof Function){
            goToNextPage();
        }
    };


    const renderBottomAlert = () => {
        return (
            <TouchableOpacity
                onPress={resendEmail}
            >
                <Text style={styles.resendEmailText}>Gửi lại email kích hoạt khác</Text>
            </TouchableOpacity>
        );
    };

    const resendEmail = async () => {
        hideAlert();
        setLoading(true)
        const url = API.baseurl + API.resend_active_email + '?email=' + email.trim();
        try {
            const response = await APIBase.nonTokenAPI('get', url);
            const messgage = (response.data.msg || '').replace(/\t/g,'');
            showAlert('',messgage);
           setLoading(false)

        } catch (error) {
            console.log('resendEmail', error);
           setLoading(false)

        }
    };

    const checkEmail = async (emailValue) => {
        setLoading(true);
        const url = API.baseurl + API.checkEmail;
        var qs = require('qs');
        const data = qs.stringify({
            email: emailValue,
        });
        LogBase.log("=====API",url)
        const response = await APIBase.nonTokenAPI('post', url, data);
        LogBase.log("res checkEmail",response.data)
        setLoading(false);
        return response;
    };

    const checkDisableButtonContinue = () => {
        if (from == ''){
            return !(validateEmail(email) && password.length >= 6 && password === re_password && password.trim().length > 0);
        } else {
            return !validateEmail(email);
        }
    };

    const fillDataLogin = async (response, loginDataCache, mDevice_id) => {

        let dataRedux = response.data.data_user;
        dataRedux.jwt_token = response.data.jwt_token;
        dataRedux.dataToLogin = loginDataCache;

        props.dispatch(ActionLogin(dataRedux));
        props.dispatch(setDeviceId(mDevice_id));

        APIBase.dataLogin = loginDataCache;
        APIBase.updateJWT(response.data.jwt_token);
        APIBase.updateAccess_token(response.access_token);

        MyData.TokenUser.id = response.data.data_user.id;
        MyData.UserLogin = response.data.data_user;   
    }  

    const doWhenLoginDone = async (response, loginDataCache, mDevice_id) => {

        await fillDataLogin(response, loginDataCache, mDevice_id)

        if (response.data.user_role === 'teacher' || response.data.data_user.role === 'teacher') {
            props.navigation.navigate('TeacherApp');
        } else if (response.data.user_role === 'parent' || response.data.data_user.role === 'parent') {
            // props.navigation.navigate('ListenParentchild');
            // showAlert('', "Sunday English hiện không hỗ trợ tài khoản phụ huynh");
            props.navigation.navigate(response.data.data_user?.last_login ? 'ParentApp' : 'IntroScreen');
        } else if (response.data.user_role === 'student' || response.data.data_user.role === 'student') {
            props.navigation.navigate('StudentApp');
        }else {
            showAlert('', "Sunday English hiện không hỗ trợ tài khoản "+response.data.user_role);
        } 
    }

    //facebook
    const loginWithFacebook = async () => {
        //       console.log('loginWithFacebook');
        try {
            LoginManager.setLoginBehavior('NATIVE_ONLY');
            //LoginManager.setLoginBehavior('WEB_ONLY');
            //           console.log('loginWithFacebook == 1');
            LoginManager.logInWithPermissions(['public_profile', 'email']).then(
                login => {
                    if (login.isCancelled) {
                        console.log('Login cancelled');
                    } else {
                        AccessToken.getCurrentAccessToken().then(data => {
                            const accessToken = data.accessToken.toString();
                            getInfoFromToken(accessToken);
                        });
                    }
                },
                error => {
                    if (APIBase.facebookRelogin == 0) {
                        APIBase.facebookRelogin = 1
                        LoginManager.logOut();
                        loginWithFacebook();
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
                                getInfoFromToken(accessToken);
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

    const getInfoFromToken = async (token) => {
        setLoading(true);
        const url = API.baseurl + API.loginFacebook;
        const headers = {
            'Content-Type': 'application/json',
            'jwt_token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6ImFkbWluIiwidGltZV9sb2dpbiI6MTU3ODkwNzQyM30.CFZyO9a-qBmyI8Q25AqGNd1nxWn1SO5TMC_yBxjgWCA',
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
        };
        const rootData = await deviceContr.getDataDeviceFace(token,"", "");
        var qs = require('qs');
        const data = qs.stringify(rootData);

        try {
            //const res = await axios({ method: 'post', url, headers, data });
            const res = await APIBase.nonTokenAPI('post', url, data);
            console.log(res);
            setLoading(false);
            if (res.data.status) {

                var loginDataCache = {}
                loginDataCache.type = APIBase.Type.Facebook;
                loginDataCache.token = token;
                LogBase.log("=====loginDataCache",loginDataCache);

                doWhenLoginDone(res, loginDataCache, rootData.device_id)

            } else {
                if (res.data.is_new_acc === '1') {
                    // props.navigation.navigate('RegisterScreen', { accessToken: token, from: 'facebook' });
                    setFrom('facebook');
                    setAccessToken(token);
                    setEmailProp(res.data.user_data);
                } else {
                    showAlert('', res.data.msg, { text: 'Đã hiểu'});
                }
            }
        } catch (error) {
            setLoading(false);
            showAlert('', error.response.data.msg);
            console.log(error.response.data);
        }
    };

    //google
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
            _loginGoogle(currentUser.accessToken, userInfo.user);
        } catch (error) {
            if (error.code != -5 && error.code != 12501){ //if not cancel
                showAlert('', 'Đăng nhập không thành công! (code '+error.code+')');
            }
            console.log('=====errorGG', error.code, error);
        }
    };

    const _loginGoogle = async (accessToken, userInfo) => {
        setLoading(true);
        const url = API.baseurl + API.loginGoogle;
        const rootData = await deviceContr.getDataDeviceGoogle(accessToken, userInfo,'', '');
        console.log("=====getDataDeviceGoogle",rootData);
        var qs = require('qs');
        const data = qs.stringify(rootData);
        try {
            const response = await APIBase.nonTokenAPI('post', url, data);
            console.log("=====ResSVGoogle",response.data);
            setLoading(false);
            if (response.data.status) {

                var loginDataCache = {}
                loginDataCache.type = APIBase.Type.Google;
                loginDataCache.token = accessToken;
                loginDataCache.userInfo = userInfo;
                LogBase.log("=====loginDataCache",loginDataCache);

                doWhenLoginDone(response, loginDataCache, rootData.device_id)

            } else {
              if (response.data.is_new_acc === '1') {
                    setFrom('google');
                    setAccessToken(accessToken);
                    props.setUserInfo(userInfo)
                    setEmailProp(userInfo.email);
                } else {
                    showAlert('', response.data.msg,{text: 'Đã hiểu'});
                }
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            showAlert('', error.response.data.msg);
            console.warn("=====GG error",error.response.data);
        }
    };

    // const _loginGoogle = async (accessToken, idToken, emailGoogle) => {
    //     setLoading(true);
    //     const url = API.baseurl + API.loginGoogle;
    //     const headers = {
    //         'Content-Type': 'application/json',
    //         'jwt_token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6ImFkbWluIiwidGltZV9sb2dpbiI6MTU3ODkwNzQyM30.CFZyO9a-qBmyI8Q25AqGNd1nxWn1SO5TMC_yBxjgWCA',
    //         'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
    //         'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
    //     };
    //     const rootData = await deviceContr.getDataDeviceGoogle(accessToken, idToken,"", "");
    //     var qs = require('qs');
    //     const data = qs.stringify(rootData);
    //     try {
    //         //const response = await axios({ method: 'post', url, headers, data });
    //         const response = await APIBase.nonTokenAPI('post', url, data);
    //         setLoading(false);
    //         if (response.data.status) {

    //             var loginDataCache = {}
    //             loginDataCache.type = APIBase.Type.Google;
    //             loginDataCache.token = accessToken;
    //             loginDataCache.tokenId = idToken;
    //             LogBase.log("=====loginDataCache",loginDataCache);

    //             doWhenLoginDone(response, loginDataCache, rootData.device_id)

    //         } else {
    //             if (response.data.is_new_acc === '1') {
    //                 // props.navigation.navigate('RegisterScreen', { accessToken, idToken, email, from: 'google' });
    //                 setFrom('google');
    //                 setAccessToken(accessToken);
    //                 setIdToken(idToken);
    //                 setEmailProp(emailGoogle);
    //             } else {
    //                 showAlert('', response.data.msg,{text: 'Đã hiểu'});
    //             }
    //         }
    //         setLoading(false);
    //     } catch (error) {
    //         setLoading(false);
    //         showAlert('', error.response.data.msg);
    //         console.log(error.response.data);
    //     }
    // };

    //apple
    const appleLogin = async () => {
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
            setLoading(true);
            const url = API.baseurl + API.loginApple;
            const headers = {
                'Content-Type': 'application/json',
                'jwt_token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6ImFkbWluIiwidGltZV9sb2dpbiI6MTU3ODkwNzQyM30.CFZyO9a-qBmyI8Q25AqGNd1nxWn1SO5TMC_yBxjgWCA',
                'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
                'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
            };
            const rootData = await deviceContr.getDataDeviceApple(identityToken,1,"", "");
            var qs = require('qs');
            const data = qs.stringify(rootData);
            try {
                //const response = await axios({ method: 'post', url, headers, data });
                const response = await APIBase.nonTokenAPI('post', url, data);
                console.log(response);
                setLoading(false);
                if (!response.data.status) {
                    if (response.data.is_new_acc === '1') {
                        // props.navigation.navigate('RegisterScreen', { identityToken, from: 'apple' });
                        setFrom('apple');
                        setIdentityToken(identityToken);
                        return;
                    }
                    showAlert(null, response.data.msg);
                    return;
                }
                if (response.data.status) {

                    var loginDataCache = {}
                    loginDataCache.type = APIBase.Type.Apple;
                    loginDataCache.token = identityToken;
                    LogBase.log("=====loginDataCache",loginDataCache);
    
                    doWhenLoginDone(response, loginDataCache, rootData.device_id)

                } else {
                    showAlert('', response.data.msg, {text:'Đã hiểu'});
                }
                setLoading(false);
            } catch (error) {
                setLoading(false);
                showAlert('',  error.response.data.msg);
                console.log(error.response.data);
            }
        }
    };


    return (
        <View style={styles.container}>
            <View style={styles.viewTop} >
                <View style={styles.numberPageContainer}>
                    <Text style={styles.numberPage}>{(from === 'facebook' || from === 'apple') ? '2' : '1'}</Text>
                </View>
                <Text style={styles.pageTitle}>{(from === 'facebook' || from === 'apple')  ? 'Thêm địa chỉ email' : 'Tạo tài khoản'}</Text>
            </View>
            <View style={{alignItems: 'center'}}>
                {
                    (from === 'facebook' || from === 'apple')  && (
                        <Text style={styles.description}>Hãy nhập địa chỉ email hợp lệ của bạn để có thể kích hoạt và khôi phục tài khoản trong tương lai</Text>
                    )
                }
                {!!errorText && <Text style={[styles.errorText, {marginBottom: 2}]}>{errorText}</Text>}
                <BorderTextInput
                    leftIcon={images.ICON_EMAIL}
                    textInputProps={{
                        placeholder: 'Nhập email xác thực tài khoản',
                        autoCapitalize: 'none',
                        onBlur: () => {
                            if (email && !validateEmail(email)){
                                setErrorEmail({
                                    isError: true,
                                    errorString: error_text.email_validate,
                                });
                            }
                        },
                    }}
                    value={email}
                    onChangeText={(text)=>{
                        setEmail(text);
                        setErrorEmail({isError: false, errorString: ''});
                    }}
                    isError={errorEmail.isError}
                    errorText={errorEmail.errorString}
                    // keyboardType="email-address"
                    containerStyle={{marginVertical: 8}}
                />
                {
                    from === '' && (
                        <>
                            <BorderTextInput
                                leftIcon={images.ICON_LOCK}
                                textInputProps={{
                                    placeholder: 'Nhập mật khẩu (6 ký tự trở lên)',
                                    autoCapitalize: 'none',
                                    secureTextEntry: !isShowPass,
                                    onBlur: () => {
                                        if (password && password.trim().length == 0){
                                            setErrorPassword({
                                                isError: true,
                                                errorString: error_text.passAllSpace,
                                            });
                                        }    
                                        else if (password && password.length < 6){
                                            setErrorPassword({
                                                isError: true,
                                                errorString: error_text.password_length,
                                            });
                                        }
                                        else if (password && re_password && re_password !== password){
                                            setErrorRePassword({
                                                isError: true,
                                                errorString: error_text.re_pass_validate,
                                            });
                                        }
                                        else if (password && re_password && re_password === password){
                                            setErrorRePassword({
                                                isError: false,
                                                errorString: '',
                                            });
                                        }
                                    },
                                }}
                                rightIcon={isShowPass ? images.ICON_SHOW_PASS : images.ICON_HIDE_PASS }
                                onPressRightIcon={()=> {
                                    setShowPass(!isShowPass);
                                }}
                                value={password}
                                onChangeText={(text)=>{
                                    setPassword(text);
                                    setErrorPassword({isError: false, errorString: ''});
                                }}
                                isError={errorPassword.isError}
                                errorText={errorPassword.errorString}
                                containerStyle={{marginVertical: 8}}
                            />
                            <BorderTextInput
                                leftIcon={images.ICON_LOCK}
                                textInputProps={{
                                    placeholder: 'Nhập lại mật khẩu',
                                    autoCapitalize: 'none',
                                    secureTextEntry: !isShowRePass,
                                    onBlur: () => {
                                        if (re_password && re_password !== password){
                                            setErrorRePassword({
                                                isError: true,
                                                errorString: error_text.re_pass_validate,
                                            });
                                        }
                                    },
                                }}
                                rightIcon={isShowRePass ? images.ICON_SHOW_PASS : images.ICON_HIDE_PASS }
                                onPressRightIcon={()=> {
                                    setShowRePass(!isShowRePass);
                                }}
                                value={re_password}
                                onChangeText={(text)=>{
                                    setRePassword(text);
                                    setErrorRePassword({isError: false, errorString: ''});
                                }}
                                isError={errorRePassword.isError}
                                errorText={errorRePassword.errorString}
                                containerStyle={{marginVertical: 8}}
                            />
                        </>
                    )
                }
                <View style={{marginTop: Baseheight * 3}}>
                    <ShortMainButton
                        onPress={() => {
                            onContinue();
                        }}
                        text={'Tiếp tục'}
                        type={1}
                        textStyles={styles.txtButtonContinue}
                        isDisabled={checkDisableButtonContinue()}
                    />
                </View>
                {
                    from === '' && (
                        <>
                            <View style={styles.orContainer}>
                                <View style={{height: 1, backgroundColor: '#707070', width: SmartScreenBase.smPercenWidth * (250 / WIDTH_DESIGN) * 100 }} />
                                <Text style={styles.orText}>Hoặc</Text>
                                <View style={{height: 1, backgroundColor: '#707070', width: SmartScreenBase.smPercenWidth * (250 / WIDTH_DESIGN) * 100 }} />
                            </View>
                            <View style={{width: '100%', flexDirection: 'row', justifyContent: 'center'}}>
                                {/* <TouchableOpacity
                                    onPress={loginWithFacebook}
                                >
                                    <Image
                                        source={images.ICON_FACEBOOK}
                                        style={styles.icon_social}
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity> */}
                                <TouchableOpacity
                                    style={{marginLeft: 10}}
                                    onPress={googleLogin}
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
                                            onPress={appleLogin}
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
                        </>
                    )
                }
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: SmartScreenBase.screenWidth,
    },
    viewTop:{
        height: SmartScreenBase.smPercenHeight * (300 / HEIGHT_DESIGN) * 100,
        width: SmartScreenBase.screenWidth,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    numberPageContainer: {
        width: SmartScreenBase.smPercenWidth * (100 / WIDTH_DESIGN) * 100,
        height: SmartScreenBase.smPercenWidth * (100 / WIDTH_DESIGN) * 100,
        borderRadius: 9999,
        borderWidth: 1,
        borderColor: '#4A4848',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    numberPage:{
        fontSize: SmartScreenBase.smFontSize * 69,
        fontFamily:FontBase.MyriadPro_Bold,
        color: '#4A4848',
    },
    pageTitle: {
        fontSize: SmartScreenBase.smFontSize * 50,
        fontFamily:FontBase.MyriadPro_Bold,
        color: '#4A4848',
    },
    txtButtonContinue: {
        fontFamily:FontBase.MyriadPro_Regular,
        fontSize: SmartScreenBase.smFontSize * 55,
        color: '#fff',
        width: SmartScreenBase.smPercenWidth * 50,
        textAlign: 'center',
        paddingVertical: SmartScreenBase.smPercenWidth * 3,
    },

    orContainer: {
        width: '100%',
        height: SmartScreenBase.smPercenHeight * (155 / HEIGHT_DESIGN) * 100,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    orText: {
        fontFamily:FontBase.MyriadPro_Regular,
        fontSize: SmartScreenBase.smFontSize * 40,
        color: '#4A4848',
        marginHorizontal:  SmartScreenBase.smPercenWidth * (20 / WIDTH_DESIGN) * 100,
    },
    icon_social: {
        width: SmartScreenBase.smPercenWidth * (142 / WIDTH_DESIGN) * 100,
        height: SmartScreenBase.smPercenWidth * (142 / WIDTH_DESIGN) * 100,
    },
    description: {
        fontFamily:FontBase.MyriadPro_Bold,
        fontSize: SmartScreenBase.smFontSize * 45,
        textAlign: 'center',
        color:'#4A4848',
        width: SmartScreenBase.smPercenWidth * (951 / WIDTH_DESIGN) * 100,
        marginBottom: SmartScreenBase.smPercenHeight * (51 / HEIGHT_DESIGN) * 100,
    },
    errorText: {
        fontSize: SmartScreenBase.smFontSize * 45,
        fontFamily:FontBase.MyriadPro_Bold_It,
        color: '#CC0000',
        width: SmartScreenBase.smPercenWidth * (925 / WIDTH_DESIGN) * 100,
    },
    resendEmailText: {
        fontSize: SmartScreenBase.smFontSize * 50,
        fontFamily: FontBase.MyriadPro_Regular,
        color: '#00A69C',
        textAlign: 'center',
        width: SmartScreenBase.smPercenWidth * (800 / WIDTH_DESIGN) * 100,
        alignSelf: 'center',
        paddingTop: 12,
        textDecorationLine: 'underline',
    },
});
