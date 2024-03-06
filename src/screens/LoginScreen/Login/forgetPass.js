import React, {useRef, useEffect, useState} from 'react';
import {
    Text,
    View,
    ImageBackground,
    Image,
    TextInput,
    SafeAreaView,
    Animated,
    Keyboard,
    TouchableOpacity, Alert, StatusBar, Platform, TouchableWithoutFeedback,
} from 'react-native';
import styles from './styles';
import SmartScreenBase from '../../../base/SmartScreenBase';
import API from '../../../API/APIConstant';
import axios from 'axios';
import LoadingScreen, {LoadingScreen2} from '../../LoadingScreen';
import { AppHeader } from '../../../componentBase/AppHeader/AppHeader';
import BorderTextInput from '../../../componentBase/BorderTextInput';
import images from '../../../assets/images';
import { validateEmail } from '../../../utils/validation';
import { error_text } from './common/strings';
import { HEIGHT_DESIGN, WIDTH_DESIGN } from '../../../utils/configs';
import { ShortMainButton } from '../../../componentBase/ShortMainButton';
import { showAlert } from '../../../componentBase/BaseAlert';
import LogBase from '../../../base/LogBase';
import { ComponentLoadingIndicator } from '../../../componentBase/indicator/ComponentLoadingIndicator';

const ForgetPassScreen = (props) => {
    const [email, setEmail] = useState('');
    const [errorText, setErrorText] = useState('');
    const [errorEmail, setErrorEmail] = useState({
        isError: false,
        errorString: error_text.email_validate,
    });
    const [loading, setLoading] = useState(false);
    const fadeAnim = useRef(new Animated.Value(SmartScreenBase.smPercenHeight * 30)).current;

    const [isRequestSuccess, setRequestSuccess] = useState(false);

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
        Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

        return () => {
            Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
            Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
        };
    }, []);


    const _keyboardDidShow = (e) => {
        Animated.timing(fadeAnim, {
            ...Platform.select({
                ios: {
                    toValue: e.endCoordinates.height,
                },
                android: {
                    toValue: 0,
                },
            }),
            duration: 10,
        }).start();
    };

    const _keyboardDidHide = () => {
        Animated.timing(fadeAnim, {
            toValue: SmartScreenBase.smPercenHeight * 30,
            duration: 10,
        }).start();
    };

    const _onSubmit = async () => {
        if (!email) {
            showAlert('', 'Bạn cần điền đầy đủ thông tin');
        } else {
            Keyboard.dismiss();
            setLoading(true);
            const url = API.baseurl + API.forgetPassword;
            const headers = {...API.header, 'Content-Type': 'application/x-www-form-urlencoded'};
            const qs = require('qs');
            const data = qs.stringify({email});
            // return
            try {
                LogBase.log("=====API:",url)
                const res = await axios({method: 'put', url, data, headers});
                console.log('forgot password', res.data);
                if (res.data.status){
                    setRequestSuccess(true);
                } else if (res) {
                    const messgage = (res.data.msg || '').replace(/\t/g,'');
                    if (res.data.msg_style === 'text_error'){
                        setErrorText(messgage);
                    } else {
                        showAlert('',messgage);
                    }
                }
                setLoading(false);
            } catch (e) {
                console.log('forgot password', e);
                showAlert('', 'Gửi yêu cầu không thành công');
                setLoading(false);
            }
        }
    };

    const _goToLogin = (status) => {
        if (status) {
            props.navigation.navigate('LoginScreen');
        }
    };

    const _goBack = () => {
        props.navigation.goBack();
    };

    const _onChangeText = (text) => {
        setEmail(text);
    };
    return (
        <TouchableOpacity activeOpacity={1} onPress={Keyboard.dismiss} style={{flex: 1}}>
            <>
                <StatusBar translucent/>
                <AppHeader
                    title="Đặt lại mật khẩu"
                    leftIconOnPress={()=>{
                        if (isRequestSuccess){
                            setRequestSuccess(false);
                        } else {
                            props.navigation.goBack();
                        }
                    }}
                />
                {
                    !isRequestSuccess ? (
                        <View style={styles.containerNew} >
                            <Text style={styles.description}>Bạn vui lòng điền Email đã đăng ký khi tạo tài khoản để đặt lại mật khẩu.</Text>
                            {!!errorText && <Text style={[styles.errorText, {marginBottom: 2}]}>{errorText}</Text>}
                            <BorderTextInput
                                leftIcon={images.ICON_EMAIL}
                                textInputProps={{
                                    placeholder: 'Nhập email',
                                    autoCapitalize: 'none',
                                    onBlur: () => {
                                        if (email && !validateEmail((email || '').trim())){
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
                                    setErrorText('');
                                    setErrorEmail( {
                                        isError: false,
                                        errorString: '',
                                    });
                                }}
                                isError={errorEmail.isError}
                                errorText={errorEmail.errorString}
                                keyboardType="email-address"
                                containerStyle={{marginBottom: SmartScreenBase.smPercenHeight * (118 / HEIGHT_DESIGN) * 100}}
                            />
                            <View>
                                {!loading ? <ShortMainButton
                                    onPress={() => {
                                        _onSubmit();
                                    }}
                                    text={'Gửi'}
                                    type={1}
                                    textStyles={styles.txtButtonLogin}
                                    isDisabled={!(validateEmail((email || '').trim()))}
                                />
                                :
                                <View style={{height: SmartScreenBase.smPercenWidth*12, alignItems: 'center'}}>
                                <ComponentLoadingIndicator visible={loading}/>
                            </View>}
                            </View>
                        </View>
                    ) : (
                        <View style={styles.containerNew} >
                            <Image
                                source={images.EMAIL_LOCK}
                                style={styles.iconEmailLock}
                                resizeMode="contain"
                            />
                            <Text style={[styles.description, {marginTop: 0, width: SmartScreenBase.smPercenWidth * (990 / WIDTH_DESIGN) * 100}]}>
                                {'Đường dẫn đặt lại mật khẩu đã được gửi đến địa chỉ email '}
                                <Text style={styles.emailDesc}>{email}</Text>
                                {'. Bạn vui lòng kiểm tra hộp thư và làm theo hướng dẫn nhé!'}
                            </Text>
                            <View>
                                <ShortMainButton
                                    onPress={() => {
                                        _goToLogin(true);
                                    }}
                                    text={'Đồng ý'}
                                    type={1}
                                    textStyles={styles.txtButtonLogin}
                                />
                            </View>
                        </View>
                    )
                }
            </>
        </TouchableOpacity>
    );
};



export default ForgetPassScreen;
