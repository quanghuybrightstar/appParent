import {useState, useEffect, useMemo} from 'react';
import {
    Animated,
    Keyboard,
    Dimensions,
    Alert,
} from 'react-native';

const {height} = Dimensions.get('window');
import axios from 'axios';
import {useSelector} from 'react-redux';
import API from '../../../API/APIConstant';
import { showAlert } from '../../../componentBase/BaseAlert';
import LogBase from '../../../base/LogBase';
import APIBase from '../../../base/APIBase';


export default function useLogic(navigation) {

    const fadeAnim = useMemo(()=> new Animated.Value(0), []);
    const [classKey, setClassKey] = useState('');
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [studentInformation, setStudentInformation] = useState(false);
    const [notification, setNotification] = useState(false);
    const [addInformation, setAddInformation] = useState({});
    const [startTime, setStartTime] = useState('');
    const [loading, setLoading] = useState(false);


    // useEffect(() => {
    //     Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    //     Keyboard.addListener('keyboardDidHide', keyboardDidHide);
    // }, []);

    // const keyboardDidShow = () => {
    //     Animated.timing(fadeAnim, {
    //         toValue: height / 4.5,
    //         duration: 500,
    //     }).start();

    // };

    // const keyboardDidHide = () => {
    //     Animated.timing(fadeAnim, {
    //         toValue: 0,
    //         duration: 500,
    //     }).start();
    // };

    const onValidateClass = async () => {
        let url = API.baseurl + 'api_class/code?class_code=' + classKey.toUpperCase();
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            jwt_token: APIBase.jwt_token,
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            Authorization: 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
        };
        try {
            LogBase.log("=====API",url)
            setLoading(true)
            const res = await axios({method: 'get', url, headers});
            setLoading(false)
            if (res.data.status) {
                console.log('thông tin lơp: ', res.data.class_data);
                setAddInformation(res.data.class_data);
                setStartTime((res.data.class_data.start_time || '').split(' ').shift().split('-').reverse().join().replace(/,/gi, '/') + ' - ' + (res.data.class_data.end_time || '').split(' ').shift().split('-').reverse().join().replace(/,/gi, '/'));
                setStudentInformation(true);
                setNotification(true);
            } else {
                console.log('err');
                setError(true);
                setErrorText(res.data.msg);
            }
        } catch (error) {
            setLoading(false)
            if (error) {
                setError(true);
            }
            console.log(error)
            if (error.message === 'Network Error') {
                Alert.alert('Thông Báo', 'Vui lòng kiểm tra kết nối Internet');
            }
        }
    };

    const onAddClass = async () => {
        setLoading(true)
        setNotification(false);
        setStudentInformation(false);
        let url = API.baseurl + 'api_class/class_request';
        const headers = {
            'Content-Type': 'application/json',
            'jwt_token': APIBase.jwt_token,
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
        };
        let data = {
            class_code: classKey,
        };
        try {
            LogBase.log("=====API",url)
            const res = await axios({method: 'POST', url, headers, data});
            setLoading(false)
            if (res.data.status == true) {
                showAlert('',res.data.msg || 'Đăng ký vào lớp thành công', {text: 'Đóng', onPress: ()=> {navigation.goBack();},
                });
                // setStudentInformation(false);
                setNotification(false);
            } else {
                console.log('err');
                setError(true);
                setErrorText(res.data.msg);
            }
        } catch (error) {
            setLoading(false)
            if (error.message === 'Network Error') {
                Alert.alert('Thông Báo', 'Vui lòng kiểm tra kết nối Internet');
            }
        }
    };

    const  onClosedRegistration = () =>{
        setNotification(false);
        setStudentInformation(false);
        navigation.goBack();
    };

    return {
        fadeAnim,
        classKey,
        setClassKey,
        error,
        setError,
        studentInformation,
        setStudentInformation,
        notification,
        setNotification,
        addInformation,
        setAddInformation,
        startTime,
        setStartTime,
        onValidateClass,
        onAddClass,
        onClosedRegistration,
        errorText,
        setErrorText,
        setLoading,
        loading
    };
}
