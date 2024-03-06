import React, { useState, useCallback, useRef } from 'react';
import { ActivityIndicator, FlatList, Image, Text, ImageBackground, View, TextInput, Alert, TouchableOpacity} from 'react-native';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import { AppHeader } from '../../../../componentBase/AppHeader';
import { TextBox } from '../../../../componentBase/TextBox';
import LogBase from '../../../../base/LogBase';
import stylesApp from '../../../../styleApp/stylesApp';
import { x_thanhtoan } from '../../../../assets/icon';
import { img_nhap_goi } from '../../../../assets/image';
import styles from './EnterPurchasedPackageStyle';
import { Colors } from '../../../../styleApp/color';
import API from '../../../../API/APIConstant';
import { ShortMainButton } from '../../../../componentBase/ShortMainButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import APIBase from '../../../../base/APIBase';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import FontBase from '../../../../base/FontBase';
import { SmPopup } from '../../../../componentBase/SmPopup';

/**
 * EnterPurchasedPackage Screen - Nhập gói đã mua
 */
const EnterPurchasedPackage = (props) => {

    const textHoderList = [
        "Nhập địa chỉ email",
        "Nhập mã gói học"
    ]

    const [loadingIndicator, setIndicator] = useState(false)

    const [hoderText, setHoderText] = useState(textHoderList[0])

    const [step, setStep] = useState(1)

    const [err, setErr] = useState('')

    const [emailCheck, setEmailCheck] = useState('')

    const [code, setCode] = useState('')

    const [isShowPopup, setisShowPopup] = useState(false)

    const onTextInputFocus = useCallback(()=> {setErr("")}, []);
    // const onTextInputBlur = ()=> {
    //     setCode(emailCheck.trim())
    // };

    const disabled = (step == 0 && emailCheck.trim() === '') || (step == 1 && code.trim() === '') || err

    const onSetCode = useCallback((value) => {
            setErr("")
            setCode(value)
        },
        [setCode],
    )

    const onSetEmail = useCallback((value) => {
        setErr("")
        setEmailCheck(value)
    },
    [setCode],
)

    const checkType = (mString) => {
        if(mString.includes("@") && mString.includes(".")){
            return "email";
        }else if(mString.length > 8 && mString.length < 12 && Number.isInteger(mString)){
            return "phone";
        }else{
            return "other";
        }
    }

    /**
     * Validate parent code
     */
    const emailOk = async () => {
        setErr('')
        // setHoderText(textHoderList[1])
        setStep(1)
        Alert.alert("Mã kích hoạt đã được gửi vào mail của bạn")
    }

    /**
     * Validate parent code
     */
    const onValidateCode = async () => {

        const url = API.baseurl_pay + API.activeByCode;
        setIndicator(true)

        try {
            var body={
                license_code: code
            }
            const res = await APIBase.callPaySV('post', url, body)
            let data = res.data;
            setIndicator(false)
            if (data.status) {
                console.log("=====verify_code",data)
                setisShowPopup(true)
                // props.navigation.dispatch(
                //     props.navigation.replace('PickPackage', {dataList: data.data.package_list, reload: props.navigation.getParam('reload')})
                //   );
            } else {
                setErr(data.msg)
            }

        } catch (error) {
            setIndicator(false)
            setErr(error.response.data.msg)
            console.log(error.response);
            console.log(error.request);
        } finally {
        }
    }

    /**
     * Validate parent email
     */
    const onValidateEmail = async () => {
        if(checkType(emailCheck) == "other"){
            setErr("Địa chỉ email không hợp lệ")
            return
        }
        // emailOk()
        const url = API.baseurl_pay + API.verify_packet;
        setIndicator(true)
        const qs = require('qs');
        var mData = {
            accuracy_info: emailCheck,
            type: checkType(emailCheck)
        }
        LogBase.log("=====request",mData)
        var tranData = qs.stringify(mData)
        try {
            const res = await APIBase.callPaySV('POST', url, tranData)
            let data = res.data;
            console.log('🚀 ~ file: index.js ~ line 34 ~ onValidateCode ~ data', data)
            setIndicator(false)
            if (data.status) {
                emailOk()
            } else {
                setErr(data.msg)
            }

        } catch (error) {
            setIndicator(false)
            setErr(error.response.data.msg)
            console.log(error.response);
            console.log(error.request);
        } finally {
        }
    }

    const onClick = () => {
        setisShowPopup(false)
        props.navigation.navigate('UpgradeAccount')
    }

    return (
        <ImageBackground
        source={{uri: 'background111'}}
        imageStyle={stylesApp.ImageBackground}
        style={{flex: 1}}>
            <AppHeader
                navigation={props.navigation}
                title={"Kích hoạt tài khoản"}
                leftIconOnPress={() => {
                    props.navigation.pop();
                }}
            />
            <View style={styles.contain}>
            <KeyboardAwareScrollView style={{ flex: 1 }}>
                <Image source={img_nhap_goi} style={styles.imageSty}/>
                
                <View style={styles.body}>
                    {step == 0 ? <TextBox numberOfLines={2} text={"Hãy nhập địa chỉ Email đã đăng ký mua hàng."} style={styles.title}/>
                    : <TextBox numberOfLines={3} style={styles.title}>Vui lòng nhập mã để kích hoạt gói học</TextBox>}
                    <View style={styles.boxErrText}>
                        <TextBox numberOfLines={2} text={err} style={[styles.errText,{opacity: !!err ? 1 : 0}]} />
                    </View>
                    {/* <TextBox text={ProfileJson.LinkingCode} style={styles.subTitle} /> */}
                    <View style={[styles.textInputBox, !!err && { borderColor: Colors._E41E27 }]}>
                        {/* <Image source={{ uri: 'avtlk1' }} style={styles.imgCode} /> */}
                        {step == 0 ? <TextInput
                            autoCapitalize={'none'}
                            autoCompleteType={'off'}
                            autoCorrect={false}
                            placeholder={textHoderList[0]}
                            placeholderTextColor={Colors.Gray}
                            style={styles.textInput} value={emailCheck}
                            onFocus={onTextInputFocus}
                            onChangeText={onSetEmail} />
                        : <TextInput
                            autoCapitalize={'none'}
                            autoCompleteType={'off'}
                            autoCorrect={false}
                            placeholder={textHoderList[1]}
                            placeholderTextColor={Colors.Gray}
                            style={styles.textInput} value={code}
                            onFocus={onTextInputFocus}
                            onChangeText={onSetCode} />}
                        {!!err && <Image source={{ uri: 'canhbao1' }} style={styles.errIcon} />}
                    </View>
                    {/* {step == 1 && <TouchableOpacity onPress={()=>onValidateEmail()} style={styles.retakeSty}>
                        <TextBox text={"Gửi lại mã"} style={[styles.retakeTextSty]} />
                    </TouchableOpacity>} */}
                </View>
                <View style={styles.bottomBox}>
                        <ShortMainButton
                            // loading={loadingIndicator}
                            isDisabled={disabled}
                            onPress={()=>{
                                step == 0 ? onValidateEmail() : onValidateCode()
                            }}
                            type={1}
                            widthType="full"
                            text={"Kích hoạt"}
                            // style={styles.btnLink} 
                            />
                    </View>
            </KeyboardAwareScrollView>
            <SmPopup visible={isShowPopup} message={"Chúc mừng bạn đã kích hoạt\nthành công gói học"} 
                cancelText={''} confirmText={"Đóng"} confirmOnpress={()=>onClick()}></SmPopup>
            </View>
        </ImageBackground>
    );
};

export default EnterPurchasedPackage;