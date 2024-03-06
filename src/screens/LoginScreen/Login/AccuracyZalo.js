import moment from 'moment';
import React, {useState} from 'react';
import { Alert, ImageBackground, Keyboard, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import API from '../../../API/APIConstant';
import images from '../../../assets/images';
import APIBase from '../../../base/APIBase';
import FontBase from '../../../base/FontBase';
import SmartScreenBase from '../../../base/SmartScreenBase';
import BigSelect from '../../../componentBase/BigSelect';
import BorderTextInput from '../../../componentBase/BorderTextInput';
import { RadioButtonBox } from '../../../componentBase/RadioButtonBox';
import { SelectDateModal } from '../../../componentBase/SelectDateModal';
import { ShortMainButton } from '../../../componentBase/ShortMainButton';
import { HEIGHT_DESIGN, WIDTH_DESIGN } from '../../../utils/configs';
import { validateEmail, validatePhone } from '../../../utils/validation';
import { TYPE_SCHOOL } from './components/Page2Register';
import axios from 'axios';
import { ActionDataClass } from '../../../redux/actions/ActionDataClass';
import MyData from '../../../component/MyData';
import { hideAlert, showAlert } from '../../../componentBase/BaseAlert';
import { error_text } from './common/strings';
import { Colors } from '../../../styleApp/color';
import deviceContr from '../../../utils/device';
import {ActionLogin, setDeviceId} from '../../../redux/actions/ActionLogin';
import LogBase from '../../../base/LogBase'
import { AppHeader } from '../../../componentBase/AppHeader';

const AccuracyZalo = (props) => {

    const [errorText, setErrorText] = React.useState("");
    const [code, setCode] = React.useState("");
    const [loading, setloading] = React.useState(false);

    const onSubmit = async () => {
        var url = API.baseurl_pay + API.send_code_zalo
        var data = {
            phone: props.navigation.getParam('phone'),
            code: code
        }
        try {
            setloading(true)
            var res = await APIBase.callPaySV('post', url, data,{
                'Accept': 'application/json',
            })
            setloading(false)
            if(res.data.status){
                showAlert('','Xác thực zalo thành công.\nBạn vui lòng vào email kích hoạt tài khoản để sử dụng app', {text: 'Đồng ý', onPress: ()=>{
                    props.navigation.navigate('LoginScreen')
                }});
            }else{
                setErrorText(res.data.msg)
            }
        } catch (error) {
            setloading(false)
        }
    }

    return (
        <TouchableWithoutFeedback style={{flex: 1}} onPress={Keyboard.dismiss}>
        <>
            <StatusBar translucent/>
            <AppHeader
                title="Đăng ký tài khoản"
                leftIconOnPress={() => props.navigation.goBack()}
            />
        <View style={styles.container}>
            <View style={styles.viewTop} >
                <View style={styles.numberPageContainer}>
                    <Text style={styles.numberPage}>{'4'}</Text>
                </View>
                <Text style={styles.pageTitle}>Xác thực tài khoản</Text>
            </View>
            <View style={{alignItems: 'center'}}>

            <Text style={[styles.infoText]}>{"Hệ thống đã gửi mã xác thực đến zalo của bạn.\nVui lòng đăng nhập zalo để lấy mã xác thực.\n(Lưu ý: mã xác thực chỉ có giá trị trong vòng 24h)"}</Text>
            {/* <Text style={[styles.errorText]}>{errorText}</Text> */}
            {/* <Text style={styles.errorText}>{errorText}</Text> */}
                <View style={styles.inputLay}>
                    <BorderTextInput
                        leftIcon={images.ICON_EMAIL}
                        textInputProps={{
                            placeholder: 'Nhập mã xác thực',
                            autoCapitalize: 'none',
                        }}
                        value={code}
                        onChangeText={(text)=>{
                            setCode(text);
                            setErrorText("");
                        }}
                        isError={errorText.length > 0}
                        errorText={errorText}
                        // keyboardType="email-address"
                        containerStyle={{marginVertical: 8}}
                    />
                </View>
                    <View style={{alignItems: 'center', marginTop: SmartScreenBase.smPercenHeight*44}}>
                        <ShortMainButton
                            onPress={() => {
                                onSubmit();
                            }}
                            text={'Gửi mã'}
                            isDisabled={code.length == 0}
                            widthType={'full'}
                            type={1}
                            loading={loading}
                        />
                    </View>
            </View>
        </View>
        </>
        </TouchableWithoutFeedback>
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
    genderText: {
        fontSize: SmartScreenBase.smFontSize * 45,
        fontFamily:FontBase.MyriadPro_Light,
        color: '#4A4848',
        marginLeft: 4,
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
    inputLay: {
        width: SmartScreenBase.smPercenWidth*100, 
        height: SmartScreenBase.smPercenWidth*26,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    infoText: {
        width: SmartScreenBase.smPercenWidth*90,
        fontFamily: FontBase.MyriadPro_Regular,
        textAlign: 'center',
        fontSize: SmartScreenBase.smFontSize*45, 
        color: Colors.DarkGray2,
    },
});

export default AccuracyZalo