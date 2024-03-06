import React, {useState} from 'react';
import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import API from '../../../../API/APIConstant';
import images from '../../../../assets/images';
import APIBase from '../../../../base/APIBase';
import FontBase from '../../../../base/FontBase';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import { showAlert } from '../../../../componentBase/BaseAlert';
import { ShortMainButton } from '../../../../componentBase/ShortMainButton';
import deviceContr from '../../../../utils/device';
import { HEIGHT_DESIGN, WIDTH_DESIGN } from '../../../../utils/configs';
import {ActionLogin, setDeviceId} from '../../../../redux/actions/ActionLogin';
import { ActionDataClass } from '../../../../redux/actions/ActionDataClass';
import Hexagon from './Hexagon';
import axios from 'axios';
import MyData from '../../../../component/MyData';
import LogBase from '../../../../base/LogBase';

export const TYPE_SCHOOL = {
    CONG_LAP: 'public',
    DAN_LAP: 'private',
    KHAC: 'free',
};
export const  paddingPageHorizontal = SmartScreenBase.smPercenWidth * (60 / WIDTH_DESIGN);
export default function Page2Register(props) {
    const { goToNextPage, setDataPage2, currentPageIndex, setLoading, goToPrevPage, from } = props;

    const [dataRole, setDataRole] = useState([
        {role: 'Học sinh', value: 'student', choose: true},
        {role: 'Giáo viên', value: 'teacher', choose: false},
        {role: 'Phụ huynh', value: 'parent', choose: false},
    ]);

    const [roleSelected, setRoleSelect] = useState('');

    const [listGrade, setListGrade] = useState([]);
    const [grade, setGrade] = useState(null);
    const [schoolType, setSchoolType] = useState(null);

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

    const _loginApple = async () => {
        setLoading(true);
        const url = API.baseurl + API.loginApple;
        const headers = {...API.header, 'Content-Type': 'application/json'};
        var myDeviceID = deviceContr.getDeviceID()
        var myFCMtoken = await deviceContr.getFCMtoken()
        const data = {
            'identityToken': props.identityToken,
            // email,
            // password,
            // re_password,
            // 'school': school && school.school_name,
            // 'birthday': moment(birthday).format('YYYY-MM-DD'),
            'grade_id': grade.id,
            // 'fullname': fullName.trim(),
            // 'phone': phone,
            // 'gender': gender,
            'school_type': TYPE_SCHOOL.KHAC,
            // 'province_alias': province && province.province_alias,
            // 'district_alias': district && district.district_alias,
            // role,
            'user_role': roleSelected,
            'device_id': myDeviceID,
            'fcm_token': myFCMtoken
        };
        try {
            LogBase.log("=====testdata",data)
            LogBase.log("=====API",url)
            const res = await axios({method: 'post', url, headers, data});
            if (res.data.status){
                LogBase.log("=====Res",res.data)
                var loginDataCache = {}
                loginDataCache.type = APIBase.Type.Apple;
                loginDataCache.token = props.identityToken;
                
                fillDataLogin(res, loginDataCache, myDeviceID, res.data.jwt_token, res.data.access_token)

                    if (res.data.user_role === 'teacher') {
                        await props.navigation.navigate('TeacherApp');
                    } else if (res.data.user_role === 'parent') {
                        await props.navigation.navigate(res.data.data_user?.last_login  ? 'ParentApp' : 'IntroScreen');
                    } else if (res.data.user_role === 'student') {
                        console.log('======response.data2Student', res.data)
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

    // const _loginApple = async () => {
    //     console.log("=====vào _loginApple")
    //     setLoading(true);
    //     const url = API.baseurl + API.loginApple;
    //     const headers = {...API.header, 'Content-Type': 'application/json'};
    //     var myDeviceID = deviceContr.getDeviceID()
    //     const data = {
    //         identityToken: props.identityToken,
    //         // email,
    //         // password,
    //         // re_password,
    //         // 'school': school && school.school_name,
    //         // 'birthday': moment(birthday).format('YYYY-MM-DD'),
    //         'grade_id': grade.id,
    //         // 'fullname': fullName,
    //         // 'phone': phone,
    //         // 'gender': gender,
    //         'school_type': TYPE_SCHOOL.KHAC,
    //         // 'province_alias': province && province.province_alias,
    //         // 'district_alias': district && district.district_alias,
    //         user_role: roleSelected,
    //         'device_id': myDeviceID,
    //     };
    //     console.log("=====_loginApple",data)
    //     try {
    //         LogBase.log("=====API",url)
    //         const res = await axios({method: 'post', url, headers, data});
    //         if (res.data.status){

    //             APIBase.updateJWT(res.data.jwt_token);
    //             await props.dispatch(setDeviceId(myDeviceID));

    //                 if (res.data.user_role === 'teacher') {
    //                     await props.dispatch(ActionLogin(res.data.data_user));
    //                     await props.dispatch(ActionDataClass({jwt_token: res.data.jwt_token}));
    //                     await props.navigation.navigate('TeacherApp');
    //                 } else if (res.data.user_role === 'parent') {
    //                     await props.dispatch(ActionLogin(res.data.data_user));
    //                     await props.dispatch(ActionDataClass({jwt_token: res.data.jwt_token}));
    //                     await props.navigation.navigate('ListenParentchild');
    //                 } else if (res.data.user_role === 'student') {
    //                     MyData.TokenUser.id = res.data.data_user.id;
    //                     MyData.UserLogin = res.data.data_user;
    //                     let dataRedux = res.data.data_user;
    //                     dataRedux.jwt_token = res.data.jwt_token;
    //                     await props.dispatch(ActionLogin(dataRedux));
    //                     await props.dispatch(ActionDataClass({jwt_token: res.data.jwt_token}));
    //                     props.navigation.navigate('StudentApp');
    //                 }
    //         } else {
    //             const messgage = (res.data.msg || '').replace(/\t/g,'');
    //             if (res.data.need_confirm_email){
    //                 showAlert('',messgage, {text: 'Đồng ý'}, {renderBottom:renderBottomAlert});
    //             } else {
    //                 showAlert('',messgage, {text: 'Đồng ý'});
    //             }
    //         }
    //         setLoading(false);
    //     } catch (e) {
    //         console.log('login apple', e);
    //         showAlert('','Đăng ký tài khoản không thành công. Xin hãy thử lại.');
    //         setLoading(false);
    //     }
    // };

    // React.useEffect(()=>{
    //     if (currentPageIndex < 1){
    //         clearData();
    //     }
    // },[currentPageIndex]);

    const getListGrade = async () => {
        setLoading(true);
        const url = API.baseurl + 'api_login/grade';
        try {
            const response = await APIBase.nonTokenAPI('get', url);
            if (response && response.data.status){
                LogBase.log("=====grade:",response.data)
                setListGrade(response.data.list_grade);
            } else if (response) {
                showAlert('', response.data.msg)
            }
            setLoading(false);
        } catch (error) {
            console.log('getListGrade', error);
            showAlert('', 'Lấy danh sách khối thất bại')
            setLoading(false);
        }
    };

    const clearData = () => {
        setRoleSelect('');
        setGrade(null);
        setListGrade([]);
        setSchoolType(null);
    };

    const getOpacity = (roleValue) => {
        if (roleSelected === ''){
            return 1;
        } else {
            if (roleSelected === roleValue){
                return 1;
            } else {
                return 0.3;
            }

        }
    };

    const getColorGradeSchool = (data) => {
        if (roleSelected == 'student'){
            if (grade && grade.id == data.id){
                return '#00B9B7';
            } else {
                return '#979797';
            }
        }
        if (roleSelected == 'teacher'){
            if (schoolType == data){
                return '#00B9B7';
            } else {
                return '#979797';
            }
        }
        return '#979797';
    };


    const _renderItemGrade = ({item, index}) => {
        return (
            <TouchableOpacity onPress={()=>{setGrade(item);}} style={[styles.boxHexagon]}>
                <Hexagon colorStroke={getColorGradeSchool(item)} />
                <View style={styles.textHexagonContainer}>
                    <Text
                        style={[
                            styles.hexagonText,
                            { color: getColorGradeSchool(item) },
                        ]}
                    >
                        {(item.name || '').replace('Khối ', '').replace('khối ', '')}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    const renderSelectGradeSchool = () => {
        if ( !roleSelected || roleSelected === 'parent'){
            return null;
        }

        if (roleSelected === 'student'){
            return (
                <>
                    <Text style={styles.txtYouAre}>Bạn học khối: </Text>
                    <FlatList
                        data={listGrade}
                        keyExtractor={(item, index) => String(item.id) + index}
                        renderItem={_renderItemGrade}
                        numColumns={4}
                        scrollEnabled={false}
                        contentContainerStyle={{paddingHorizontal:  paddingPageHorizontal * 100, alignItems: 'center', paddingVertical: 8}}
                    />
                </>
            );
        }

        if (roleSelected === 'teacher'){
            return (
                <View>
                    <Text style={styles.txtYouAre}>Bạn dạy trường: </Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 16, paddingHorizontal: paddingPageHorizontal * 100}}>
                        <TouchableOpacity onPress={()=>{setSchoolType(TYPE_SCHOOL.CONG_LAP);}} style={styles.boxHexagon}>
                            <Hexagon colorStroke={getColorGradeSchool(TYPE_SCHOOL.CONG_LAP)}/>
                            <View style={styles.textHexagonContainer}>
                                <Text
                                    style={[
                                        styles.hexagonText,
                                        { fontSize: SmartScreenBase.smFontSize * 30 },
                                        { color: getColorGradeSchool(TYPE_SCHOOL.CONG_LAP) },
                                    ]}
                                >
                                    {'CÔNG\nLẬP'}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{setSchoolType(TYPE_SCHOOL.DAN_LAP);}}  style={styles.boxHexagon}>
                            <Hexagon  colorStroke={getColorGradeSchool(TYPE_SCHOOL.DAN_LAP)}/>
                            <View style={styles.textHexagonContainer}>
                                <Text
                                    style={[
                                        styles.hexagonText,
                                        { fontSize: SmartScreenBase.smFontSize * 30 },
                                        { color: getColorGradeSchool(TYPE_SCHOOL.DAN_LAP) },
                                    ]}
                                >
                                    {'DÂN\nLẬP'}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{setSchoolType(TYPE_SCHOOL.KHAC);}}  style={styles.boxHexagon}>
                            <Hexagon colorStroke={getColorGradeSchool(TYPE_SCHOOL.KHAC)}/>
                            <View style={styles.textHexagonContainer}>
                                <Text
                                    style={[
                                        styles.hexagonText,
                                        { fontSize: SmartScreenBase.smFontSize * 30 },
                                        { color: getColorGradeSchool(TYPE_SCHOOL.KHAC) },
                                    ]}
                                >
                                    {'TỰ\nDO'}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
    };

    const onSelectRole = (roleValue) =>{
        if (roleSelected !== roleValue){
            setGrade('');
            setSchoolType(null);
            if (roleValue == 'student'){
                getListGrade();
            }
        }
        setRoleSelect(roleValue);
    };

    const checkDisableButtonContinue = () => {
        if (roleSelected === 'student'){
            return !grade;
        }
        if (roleSelected === 'teacher'){
            return (schoolType === null);
        }
        if (roleSelected === 'parent'){
            return false;
        }

        return true;
    };

    return (
        <View style={styles.container}>
            <View style={styles.viewTop} >
                <View style={styles.numberPageContainer}>
                    <Text style={styles.numberPage}>{(from === 'facebook')  ? '3' : '2'}</Text>
                </View>
                <Text style={styles.pageTitle}>Chọn loại tài khoản</Text>
            </View>
            <View style={{flex: 1}}>
                <Text style={styles.txtYouAre}>Bạn là: </Text>
                <View style={styles.chooseRoleContainer} >
                    <View style={{opacity: getOpacity('student')}}>
                        <TouchableOpacity
                            style={[styles.viewRole, { backgroundColor: '#C2E68B'}]}
                            onPress={()=> onSelectRole('student')}
                        >
                            <Image
                                source={images.ROLE_STUDENT}
                                style={styles.roleImage}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{opacity: getOpacity('teacher')}}>

                        <TouchableOpacity
                            style={[styles.viewRole, {backgroundColor: '#8ACEC6'}]}
                            onPress={()=> onSelectRole('teacher')}
                        >
                            <Image
                                source={images.ROLE_TEACHER}
                                style={styles.roleImage}
                            />
                        </TouchableOpacity>
                    </View>
                    {LogBase.isDebug && <View style={{opacity: getOpacity('parent')}}>
                        <TouchableOpacity
                            style={[styles.viewRole,  { backgroundColor: '#9CC4E6'}]}
                            onPress={()=> onSelectRole('parent')}
                        >
                            <Image
                                source={images.ROLE_PARENT}
                                style={styles.roleImage}
                            />
                        </TouchableOpacity>
                    </View>}
                </View>
                <View style={styles.bottomContainer}>
                    {
                        renderSelectGradeSchool()
                    }
                </View>

            </View>
            <View style={{alignItems: 'center', marginBottom: 40}}>
                <ShortMainButton
                    onPress={() => {
                        if(from === 'apple'){
                            _loginApple()
                            return
                        }
                        if (goToNextPage instanceof Function){
                            goToNextPage();
                        }
                        if (setDataPage2 instanceof Function){
                            setDataPage2(roleSelected, grade, schoolType);
                        }
                    }}
                    text={'Tiếp tục'}
                    isDisabled={checkDisableButtonContinue()}
                    type={1}
                    textStyles={styles.txtButtonContinue}
                />
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

    txtYouAre: {
        fontFamily:FontBase.MyriadPro_Bold,
        fontSize: SmartScreenBase.smFontSize * 45,
        color: '#4A4848',
        marginHorizontal:  paddingPageHorizontal * 100,
    },
    chooseRoleContainer: {
        flexDirection: 'row',
        marginTop: 8,
        justifyContent: 'space-evenly',
        marginHorizontal:  paddingPageHorizontal * 100,
    },
    viewRole: {
        width: SmartScreenBase.smPercenWidth * (285 / WIDTH_DESIGN) * 100,
        height: SmartScreenBase.smPercenWidth * (285 / WIDTH_DESIGN) * 100,
        borderRadius: 20,
        overflow: 'hidden',
    },
    roleImage: {
        width: SmartScreenBase.smPercenWidth * (280 / WIDTH_DESIGN) * 100,
        height: SmartScreenBase.smPercenWidth * (285 / WIDTH_DESIGN) * 100,
    },
    bottomContainer: {
        marginTop: 32,
    },
    boxHexagon: {
        backgroundColor: '#fff',
        width: (SmartScreenBase.screenWidth - (paddingPageHorizontal * 100 * 2) - 48) / 4,
        height: (SmartScreenBase.screenWidth - (paddingPageHorizontal * 100 * 2) - 48) / 4,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginVertical: 8,
        marginHorizontal: 8,
    },
    hexagonText: {
        fontFamily:FontBase.MyriadPro_Bold,
        fontSize: SmartScreenBase.smFontSize * 60,
        color: '#979797',
        textAlign: 'center',
        justifyContent: 'center',
    },
    textHexagonContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
