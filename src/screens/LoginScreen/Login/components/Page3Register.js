import moment from 'moment';
import React, {useState} from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import API from '../../../../API/APIConstant';
import images from '../../../../assets/images';
import APIBase from '../../../../base/APIBase';
import FontBase from '../../../../base/FontBase';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import BigSelect from '../../../../componentBase/BigSelect';
import BorderTextInput from '../../../../componentBase/BorderTextInput';
import { RadioButtonBox } from '../../../../componentBase/RadioButtonBox';
import { SelectDateModal } from '../../../../componentBase/SelectDateModal';
import { ShortMainButton } from '../../../../componentBase/ShortMainButton';
import { HEIGHT_DESIGN, WIDTH_DESIGN } from '../../../../utils/configs';
import { validateEmail, validatePhone } from '../../../../utils/validation';
import { TYPE_SCHOOL } from './Page2Register';
import axios from 'axios';
import { ActionDataClass } from '../../../../redux/actions/ActionDataClass';
import MyData from '../../../../component/MyData';
import { hideAlert, showAlert } from '../../../../componentBase/BaseAlert';
import { error_text } from '../common/strings';
import { Colors } from '../../../../styleApp/color';
import deviceContr from '../../../../utils/device';
import {ActionLogin, setDeviceId} from '../../../../redux/actions/ActionLogin';
import LogBase from '../../../../base/LogBase'

export default function Page3Register(props) {
    const { navigation, currentPageIndex, setLoading, dataPrevPage, goToPrevPage, from, accessToken, identityToken, userInfo } = props;

    const {
        email,
        password,
        re_password,
        role,
        grade,
        typeSchool,
    } = dataPrevPage;


    const [fullName, setFullName] = useState('');
    const [modalBirthdayVisible, setModalBirthdayVisible] = useState(false);
    const [birthday, setBirthday] = useState(null);
    const [gender, setGender] = useState('male');

    const [phone, setPhone] = useState('');

    const [listProvinces, setListProvinces] = useState([]);
    const [province, setProvince] = useState(null);

    const [listDistricts, setListDistricts] = useState([]);
    const [district, setDistrict] = useState(null);

    const [listSchools, setListSchools] = useState([]);
    const [school, setSchool] = useState(null);

    const  [errorPhone, setErrorPhone] = useState({isError: false,error_text: ''});

    React.useEffect(()=>{
        if ((currentPageIndex == 2) || ((from === 'google' || from === 'apple') && currentPageIndex === 1)){
            getProvinces();
        }

        // if (currentPageIndex < 2){
        //     clearData();
        // }
    },[currentPageIndex]);

    const clearData = () =>{
        setFullName('');
        setModalBirthdayVisible(false);
        setBirthday(null);
        setGender('male');
        setPhone('');
        setListProvinces([]);
        setProvince(null);
        setListDistricts([]);
        setDistrict(null);
        setListSchools([]);
        setSchool(null);
    };

    React.useEffect(()=> {
        if (province && province.id && role !== 'parent'){
            getDistricts(province.province_alias);
        }
    },[province]);

    React.useEffect(()=> {
        if (district && district.district_alias){
            if (role === 'student'){
                getSchools(district.district_alias);
            }
            if (role === 'teacher'){
                if (typeSchool !== TYPE_SCHOOL.KHAC){
                    getSchools(district.district_alias);
                }
            }
        }
    },[district]);

    const getProvinces = async () => {
        setLoading(true);
        const url = API.baseurl + API.getProvinces;
        try {
            const response = await APIBase.nonTokenAPI('get', url);
            console.log("=====getProvinces",response.data)
            if (response && response.data.status){
                setListProvinces(response.data.data);
            } else if (response) {
                showAlert('', response.data.msg);
            }
            setLoading(false);
        } catch (error) {
            console.log('getProvinces', error);
            showAlert('', 'Lấy danh sách tỉnh thất bại',{text: 'Đồng ý', onPress: () => goToPrevPage && goToPrevPage()});
            setLoading(false);
        }
    };

    const getDistricts = async (provinceAlias) => {
        setLoading(true);
        const url = API.baseurl + API.getDistricts + '?province_alias=' + provinceAlias;
        try {
            const response = await APIBase.nonTokenAPI('get', url);
            if (response && response.data.status){
                setListDistricts(response.data.data);
            } else if (response) {
                showAlert('',response.data.msg);
            }
            setLoading(false);
        } catch (error) {
            console.log('getDistricts', error);
            showAlert('','Lấy danh sách quận thất bại');
            setLoading(false);
        }
    };

    const getSchools = async (districtAlias) => {
        setLoading(true);
        const url = API.baseurl + API.getSchool + '?district_alias=' + districtAlias;
        try {
            const response = await APIBase.nonTokenAPI('get', url);
            if (response && response.data.status){
                setListSchools(response.data.data);
            } else if (response) {
                showAlert('',response.data.msg);
            }
            setLoading(false);
        } catch (error) {
            console.log('getSchools', error);
            showAlert('','Lấy danh sách trường thất bại');
            setLoading(false);
        }
    };

    const fillDataLogin = async (response, loginDataCache, mDevice_id, jwt_token, access_token) => {

        let dataRedux = response.data.data_user;
        dataRedux.jwt_token = jwt_token;
        dataRedux.dataToLogin = loginDataCache;

        props.dispatch(ActionLogin(dataRedux));
        props.dispatch(setDeviceId(mDevice_id));

        APIBase.dataLogin = loginDataCache;
        APIBase.updateJWT(jwt_token);
        APIBase.updateAccess_token(access_token);

        MyData.TokenUser.id = response.data.data_user.id;
        MyData.UserLogin = response.data.data_user;   
    }  

    const register = async () => {
        setLoading(true);
        try {
            var url = API.baseurl + API.register;
            const headers = {...API.header, 'Content-Type': 'application/x-www-form-urlencoded'};
            let qs = require('qs');
            const dataJson = {
                email,
                password,
                re_password,
                'school': school && school.school_name,
                'birthday': moment(birthday).format('YYYY-MM-DD'),
                'grade_id': grade.id,
                'fullname': fullName.trim(),
                'phone': phone,
                'gender': gender,
                'school_type': typeSchool,
                'province_alias': province && province.province_alias,
                'district_alias': district && district.district_alias,
                role,
                'year_of_birth': moment(birthday).format('YYYY'),
            };
            if (role !== 'student'){
                delete dataJson.grade_id;
            }
            if (role !== 'teacher'){
                delete dataJson.school_type;
            }
            if (role === 'teacher' && typeSchool === TYPE_SCHOOL.KHAC){
                delete dataJson.school;
            }

            if (role === 'parent') {
                delete dataJson.district_alias;
                delete dataJson.school;
            }

            let data = qs.stringify(dataJson);
            LogBase.log("=====API",url)
            LogBase.log("=====Req Data",dataJson)
            var res

            if(role == 'teacher'){
                url = API.baseurl_pay + API.register_teacher;
                res = await APIBase.callPaySV('post', url, data, {
                    'Accept': 'application/json',
                })
            }else{
                res = await axios({method: 'post', url, headers, data});
            }
            setLoading(false);
            const messgage = (res.data.msg || '').replace(/\t/g,'');
            if (res.data.status){
                checkAfterRegi(res.data.status, messgage)
            } else {
                if (res.data.need_confirm_email){
                    showAlert('',messgage, {text: 'Đồng ý'}, {renderBottom:renderBottomAlert});
                } else {
                    showAlert('',messgage, {text: 'Đồng ý'});
                }
            }
        } catch (error) {
            setLoading(false);
            console.log('register', error);
            showAlert('', 'Đăng ký thất bại');
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
        setLoading(true);
        const url = API.baseurl + API.resend_active_email + '?email=' + email;
        try {
            const response = await APIBase.nonTokenAPI('get', url);
            const messgage = (response.data.msg || '').replace(/\t/g,'');
            showAlert('',messgage);
            setLoading(false);

        } catch (error) {
            console.log('resendEmail', error);
            setLoading(false);

        }
    };

    const checkAfterRegi = (status, messgage) => {
        if (status){
            if (role == 'teacher'){
                props.navigation.navigate('AccuracyZalo',{phone:phone});
            }else{
                showAlert('',messgage, {text: 'Đồng ý', onPress: () => {props.navigation.navigate('LoginScreen', {username: email, password});}});
            }
        }
    };

    const _onSelectProvince = (item) => {
        const provinceSelect = listProvinces.find(prov => prov.id === item.value);
        if (provinceSelect){
            setDistrict(null);
            setSchool(null);
            setProvince(provinceSelect);
        }
    };

    const _onSelectDistrict = (item) => {
        const districtSelect = listDistricts.find(dist => dist.id === item.value);
        if (districtSelect){
            setSchool(null);
            setDistrict(districtSelect);
        }
    };

    const _onSelectSchool = (item) => {
        const schoolSelect = listSchools.find(school => school.id === item.value);
        if (schoolSelect){
            setSchool(schoolSelect);
        }
    };

    const dataProvinces = (listProvinces || []).map(item => ({
        label: item.province,
        value: item.id,
    }));

    const dataDistricts = (listDistricts || []).map(item => ({
        label: item.district,
        value: item.id,
    }));

    const dataSchools = (listSchools || []).map(item => ({
        label: item.school_name,
        value: item.id,
    }));

    const checkDisableuttonDone = () => {
        if (role === 'student'){
            // if (((!fullName || fullName.trim() == "") && from !== 'apple') || !birthday || !validatePhone(phone) || !province || !district || !school){
            if (((!fullName || fullName.trim() == "") && from !== 'apple') || phone && !validatePhone(phone)){ 
                return true;
            } else {
                return false;
            }
        }

        if (role === 'teacher') {
            if (typeSchool !== TYPE_SCHOOL.KHAC){
                // if ((!fullName && from !== 'apple') || !birthday || !validatePhone(phone) || !province || !district || !school){
                if (((!fullName || fullName.trim() == "") && from !== 'apple') || phone && !validatePhone(phone)){
                    return true;
                } else {
                    return false;
                }
            } else {
                // if ((!fullName && from !== 'apple') || !birthday || !validatePhone(phone) || !province || !district ){
                if (((!fullName || fullName.trim() == "") && from !== 'apple') || phone && !validatePhone(phone)){
                    return true;
                } else {
                    return false;
                }
            }
        }
        
        if (role === 'parent'){
            if (!fullName || !birthday || !validatePhone(phone) || !province ){
                return true;
            } else {
                return false;
            }
        }


        return false;
    };

    const checkIsRenderDistrict = () => {
        if (role === 'student' || role === 'teacher'){
            return true;
        }
        if (role === 'parent'){
            return false;
        }
    };

    const checkIsRenderSchool = () => {
        if (role === 'student'){
            return true;
        }
        if (role === 'teacher'){
            if (typeSchool === TYPE_SCHOOL.KHAC){
                return false;
            } else {
                return true;
            }
        }
        if (role === 'parent'){
            return false;
        }
    };

    const _loginFacebook = async () => {
        setLoading(true);
        const url = API.baseurl + API.loginFacebook;
        const headers = {...API.header, 'Content-Type': 'application/json'};
        var myDeviceID = deviceContr.getDeviceID()
        var myFCMtoken = await deviceContr.getFCMtoken()
        const data = {
            access_token: accessToken,
            email,
            password,
            re_password,
            'school': school && school.school_name,
            'birthday': moment(birthday).format('YYYY-MM-DD'),
            'grade_id': grade.id,
            'fullname': fullName.trim(),
            'phone': phone,
            'gender': gender,
            'school_type': typeSchool,
            'province_alias': province && province.province_alias,
            'district_alias': district && district.district_alias,
            role,
            user_role: role,
            'device_id': myDeviceID,
            'fcm_token': myFCMtoken
        };
        // console.log(data);
        // const qs = require('qs');
        // const data = qs.stringify(dataJson);
        try {
            LogBase.log("=====API",url)
            const res = await axios({method: 'post', url, headers, data});
            if (res.data.status){
                var loginDataCache = {}
                loginDataCache.type = APIBase.Type.Facebook;
                loginDataCache.token = accessToken;

                fillDataLogin(res, loginDataCache, myDeviceID, res.data.jwt_token, res.data.access_token)

                if (res.data.user_role === 'teacher') {
                    await props.navigation.navigate('TeacherApp');
                } else if (res.data.user_role === 'parent') {
                    await props.navigation.navigate('IntroScreen');
                } else if (res.data.user_role === 'student') {
                    props.navigation.navigate('StudentApp');
                }
                // showAlert('Bạn đã đăng ký tài khoản thành công', 'Email kích hoạt đã được gửi đến địa chỉ email của bạn. Kiểm tra và kích hoạt tài khoản',{text: 'Đồng ý', onPress: ()=> {navigation.goBack();}});
            } else {
                const messgage = (res.data.msg || '').replace(/\t/g,'');
                if (res.data.need_confirm_email){
                    showAlert('',messgage, {text: 'Đồng ý'}, {renderBottom:renderBottomAlert});
                } else {
                    showAlert('',messgage, {text: 'Đồng ý'});
                }
            }
            setLoading(false);
        } catch (e) {
            console.log('login facebook', e);
            showAlert('Đăng ký tài khoản không thành công. Xin hãy thử lại.');
            setLoading(false);
        }
    };

    const _loginGoogle = async () => {
        setLoading(true);
        const url = API.baseurl + API.loginGoogle;
        const headers = {...API.header, 'Content-Type': 'application/json'};
        var myDeviceID = deviceContr.getDeviceID()
        var myFCMtoken = await deviceContr.getFCMtoken()
        const data = {
            access_token: accessToken,
            // id_token: idToken,
            email,
            password,
            re_password,
            'school': school && school.school_name,
            'birthday': moment(birthday).format('YYYY-MM-DD'),
            'grade_id': grade.id,
            'fullname': fullName.trim(),
            'phone': phone,
            'gender': gender,
            'school_type': typeSchool,
            'province_alias': province && province.province_alias,
            'district_alias': district && district.district_alias,
            role,
            user_role: role,
            'device_id': myDeviceID,
            'fcm_token': myFCMtoken,
            'userInfo' : JSON.stringify(userInfo)
        };
        try {
            LogBase.log("=====Request:",data)
            LogBase.log("=====API:",url)
            const res = await axios({method: 'post', url, headers, data});
            LogBase.log("=====Đăng ký google xong",res.data)
            if (res.data.status){
                var loginDataCache = {}
                loginDataCache.type = APIBase.Type.Google;
                loginDataCache.token = accessToken;
                loginDataCache.userInfo = userInfo;
                
                fillDataLogin(res, loginDataCache, myDeviceID, res.data.jwt_token, res.data.access_token)

                    if (res.data.user_role === 'teacher') {
                        await props.navigation.navigate('TeacherApp');
                    } else if (res.data.user_role === 'parent') {
                        await props.navigation.navigate(res.data.data_user?.last_login  ? 'ParentApp' : 'IntroScreen');
                    } else if (res.data.user_role === 'student') {
                        props.navigation.navigate('StudentApp');
                    }
            } else {
                const messgage = (res.data.msg || '').replace(/\t/g,'');
                if (res.data.need_confirm_email){
                    showAlert('',messgage, {text: 'Đồng ý'}, {renderBottom:renderBottomAlert});
                } else {
                    showAlert('',messgage, {text: 'Đồng ý'});
                }
            }
            setLoading(false);
        } catch (e) {
            console.log('login google', e);
            showAlert('', 'Đăng ký tài khoản không thành công. Xin hãy thử lại.');
            setLoading(false);
        }
    };

    const _loginApple = async () => {
        setLoading(true);
        const url = API.baseurl + API.loginApple;
        const headers = {...API.header, 'Content-Type': 'application/json'};
        var myDeviceID = deviceContr.getDeviceID()
        var myFCMtoken = await deviceContr.getFCMtoken()
        const data = {
            identityToken: identityToken,
            email,
            password,
            re_password,
            'school': school && school.school_name,
            'birthday': moment(birthday).format('YYYY-MM-DD'),
            'grade_id': grade.id,
            'fullname': fullName.trim(),
            'phone': phone,
            'gender': gender,
            'school_type': typeSchool,
            'province_alias': province && province.province_alias,
            'district_alias': district && district.district_alias,
            role,
            user_role: role,
            'device_id': myDeviceID,
            'fcm_token': myFCMtoken
        };
        try {
            LogBase.log("=====API",url)
            const res = await axios({method: 'post', url, headers, data});
            if (res.data.status){
                var loginDataCache = {}
                loginDataCache.type = APIBase.Type.Apple;
                loginDataCache.token = identityToken;
                
                fillDataLogin(res, loginDataCache, myDeviceID, res.data.jwt_token, res.data.access_token)

                    if (res.data.user_role === 'teacher') {
                        await props.navigation.navigate('TeacherApp');
                    } else if (res.data.user_role === 'parent') {
                        await props.navigation.navigate('IntroScreen');
                    } else if (res.data.user_role === 'student') {
                        props.navigation.navigate('StudentApp');
                    }
            } else {
                const messgage = (res.data.msg || '').replace(/\t/g,'');
                if (res.data.need_confirm_email){
                    showAlert('',messgage, {text: 'Đồng ý'}, {renderBottom:renderBottomAlert});
                } else {
                    showAlert('',messgage, {text: 'Đồng ý'});
                }
            }
            setLoading(false);
        } catch (e) {
            console.log('login apple', e);
            showAlert('','Đăng ký tài khoản không thành công. Xin hãy thử lại.');
            setLoading(false);
        }
    };


    const onSubmit = () => {
        if (from === ''){
            register();
            return;
        }
        if (from === 'facebook'){
            _loginFacebook();
            return;
        }

        if (from === 'apple'){
            _loginApple();
            return;
        }

        if (from == 'google'){
            _loginGoogle();
            return;
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.viewTop} >
                <View style={styles.numberPageContainer}>
                    <Text style={styles.numberPage}>{(from === 'facebook' || from === 'apple')  ? '4' : '3'}</Text>
                </View>
                <Text style={styles.pageTitle}>Cập nhật thông tin</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center'}}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{flexGrow: 1}}
                >
                    <View style={{flex:1}}>
                        {from !== 'apple' &&
                            <BorderTextInput
                                leftIcon={images.ICON_ACCOUNT}
                                textInputProps={{
                                    placeholder: 'Họ tên',
                                    autoCapitalize: 'words',
                                }}
                                value={fullName}
                                onChangeText={(text)=>{
                                    setFullName(text);
                                }}
                                containerStyle={{marginVertical: 8}}
                            />                            
                        }
                        <View style={{marginVertical: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <BorderTextInput
                                leftIcon={images.ICON_BIRTHDAY}
                                isMiniInput
                                textInputProps={{
                                    placeholder: 'Chọn ngày sinh',
                                    editable:false,
                                }}
                                onPress={()=>{
                                    setModalBirthdayVisible(true);
                                }}
                                value={birthday && moment(birthday).format('DD/MM/YYYY')}
                            />
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <RadioButtonBox
                                    isNotify={gender == 'male'}
                                    color={Colors.BaseGreen}
                                    onPress={()=> {setGender('male');}}
                                />
                                <Text style={styles.genderText}>Nam</Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <RadioButtonBox
                                    isNotify={gender == 'female'}
                                    color={Colors.BaseGreen}
                                    onPress={()=> {setGender('female');}}
                                />
                                <Text style={styles.genderText}>Nữ</Text>
                            </View>
                        </View>
                        <BorderTextInput
                            leftIcon={images.ICON_PHONE}
                            textInputProps={{
                                placeholder: 'Số điện thoại',
                                maxLength: 11,
                                onBlur: () => {
                                    if (phone && !validatePhone((phone || '').trim())){
                                        setErrorPhone({
                                            isError: true,
                                            errorString: error_text.phone_validate,
                                        });
                                    }
                                },
                            }}
                            errorText={errorPhone.errorString}
                            isError={errorPhone.isError}
                            value={phone}
                            onChangeText={(text)=>{
                                setPhone(text);
                                setErrorPhone({
                                    isError: false,
                                    errorString: '',
                                });
                            }}

                            keyboardType="phone-pad"
                            containerStyle={{marginVertical: 8}}
                        />
                        <BigSelect
                            leftIcon={images.ICON_LOCATION}
                            containerStyle={{marginVertical: 8}}
                            textInputProps={{
                                placeholder: 'Tỉnh/Thành phố',
                            }}
                            title="Chọn Tỉnh/Thành phố"
                            value={province ? province.province : ''}
                            dataList={dataProvinces}
                            onSelectItem={_onSelectProvince}
                            isDisable={listProvinces.length === 0}
                            rightIcon={listProvinces.length > 0 ? images.ICON_DROPDOWN_ARROW : null}
                        />
                        {
                            checkIsRenderDistrict() && (
                                <BigSelect
                                    leftIcon={images.ICON_LOCATION}
                                    containerStyle={{marginVertical: 8}}
                                    textInputProps={{
                                        placeholder: 'Quận/huyện',
                                    }}
                                    title="Chọn Quận/Huyện"
                                    value={district ? district.district : ''}
                                    dataList={dataDistricts}
                                    onSelectItem={_onSelectDistrict}
                                    isDisable={!province}
                                    rightIcon={province ? images.ICON_DROPDOWN_ARROW : null}
                                />
                            )
                        }
                        {
                            checkIsRenderSchool() && (
                                <BigSelect
                                    leftIcon={images.ICON_SCHOOL}
                                    containerStyle={{marginVertical: 8}}
                                    textInputProps={{
                                        placeholder: 'Trường',
                                    }}
                                    value={school ? school.school_name : ''}
                                    title="Chọn Trường"
                                    dataList={dataSchools}
                                    onSelectItem={_onSelectSchool}
                                    isDisable={!district}
                                    rightIcon={district ? images.ICON_DROPDOWN_ARROW : null}
                                />
                            )
                        }
                    </View>
                    <View style={{alignItems: 'center', marginBottom: 40}}>
                        <ShortMainButton
                            onPress={() => {
                                onSubmit();
                            }}
                            text={'Hoàn tất'}
                            isDisabled={checkDisableuttonDone()}
                            type={1}
                            textStyles={styles.txtButtonContinue}
                        />
                    </View>
                </ScrollView>
            </View>
            <SelectDateModal
                rangeDate={birthday}
                maximunDate={new Date()}
                isVisible={modalBirthdayVisible}
                onSave={(date) => {
                    if (date) {
                        setBirthday(date);
                    }
                }}
                requestClose={() => {
                    setModalBirthdayVisible(false);
                }} />
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
});
