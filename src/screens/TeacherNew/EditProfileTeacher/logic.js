import axios from 'axios';
import { useEffect, useState } from 'react';
import API from '../../../API/APIConstant';
import MyData from '../../../component/MyData';
import moment from 'moment';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import APIBase from '../../../base/APIBase';
import { ActionLogin } from '../../../redux/actions/ActionLogin';
import { useCallback } from 'react';
import dateTimeHelper from '../../../utils/dateTimeHelper';

/**
 * EditProfileTeacher Screen logic handler
 * @param {object} props navigation props
 * @returns
 */
export const editProfileMethod = (props) => {
    const dataLogin = useSelector(state => state.AuthStackReducer.dataLogin);
    const [hasChange, setHasChange] = useState(false);
    console.log('-----dataLogin', dataLogin);
    let dispatch = useDispatch();
    //name
    let [name, setName] = useState(dataLogin.fullname || '');
    //phone
    let [phone, setPhone] = useState(dataLogin.phone || '');
    //avatar
    let [avatar, setAvatar] = useState(dataLogin.avatar ? { uri: dataLogin.avatar } : null);
    //email
    let [email, setEmail] = useState(dataLogin.email || '');
    //class
    let [classes, setClasses] = useState(dataLogin.class || '');
    //school
    let [school, setSchool] = useState(dataLogin.school || dataLogin.province || props.navigation.getParam('user').province);
    //date of birth
    let [dob, setDob] = useState(dataLogin.birthday ? moment(dataLogin.birthday, 'YYYY-MM-DD HH:mm:ss').toDate() : new Date());
    //check if user is male
    let [isMale, setGender] = useState(dataLogin.gender === 'female' ? false : true);
    // date modal visible
    let [modalVisible, setModalVisible] = useState(false);
    //Loading flag
    let [loadingIndicator, setIndicator] = useState(false);
    //Image picker visible
    let [imagePickerVisible, setPickerVisible] = useState(false);

    let [errorPhoneText, setErrorPhoneText] = useState("")

    useEffect(() => {
        getData();
    }, []);

    const onSetPhone = useCallback((value) => {
        setPhone(value);
        setHasChange(true);
    }, [setPhone]);

    const onSetName = useCallback((value) => {
        setName(value);
        setHasChange(true);
    }, [setName]);

    const onSetEmail = useCallback((value) => {
        setEmail(value);
        setHasChange(true);
    }, [setEmail]);

    const onSetSchool = useCallback((value) => {
        setSchool(value);
        setHasChange(true);
    }, [setSchool]);

    const onSetGender = useCallback((value) => {
        setGender(value);
        setHasChange(true);
    }, [setGender]);

    const onSetDOB = useCallback((value) => {
        setDob(value);
        setHasChange(true);
    }, [setDob]);
    const onSetClasses = useCallback((value) => {
        setClasses(value);
        setHasChange(true);
    }, [setClasses]);

    const onSetAvatar = useCallback((value) => {
        setAvatar(value);
        setHasChange(true);
    }, [setAvatar]);

    /**
     * Function submit updated user's information
    */
    const editProfile = async () => {
        setIndicator(true);
        const url = API.baseurl + API.editProfile;
        const avaUrl = API.baseurl + API.updateAvatar;
        var qs = require('qs');
        const form = qs.stringify({
            phone,
            // email,
            // firstname: "",
            // lastname: name,
            fullname: name,
            gender: isMale ? 'male' : 'female',
            birthday: moment(dob).format('YYYY:MM:DD HH:mm:ss'),
            school,
            class: classes,
        });
        let formData = new FormData();
        formData.append('file', avatar);
        try {
            if (avatar.name) {
                const res2 = await APIBase.tokenAPIFormData('post', avaUrl, formData);
                if (!res2) {
                    setIndicator(false);
                    return;
                }
            }
            const res = await APIBase.tokenAPI('put', url, form);
            if (!res) {
                setIndicator(false);
                return;
            }
            // props.loadapiprofilehv();
            getData();
            props.navigation.pop();
        } catch (error) {
            console.log('err-----', error);
            console.log('err', error.response);
            Alert.alert('Thông báo', error.response.data, [
                { text: 'Đồng ý', style: 'cancel' },
            ]);
        } finally {
            setIndicator(false);
        }
    };

    /**
     * Function get current information of user
    */
    const getData = async () => {
        let url = API.baseurl + API.editProfile + '?id=' + dataLogin.id;
        try {
            let response = await APIBase.postDataJson('get', url);
            if (!!response && !!response.data && !!response.data) {
                dispatch(ActionLogin({ ...dataLogin, ...response.data.data }));
                setAvatar({ uri: response?.data?.data?.avatar || '' });
            }
            console.log('response', response);
        } catch (error) {
            console.log('000000errr', error);
        }
    };

    const disabled =
        name.trim() === '' ||
        phone.trim().length < 10 ||
        email.trim() === '' ||
        !school || school.trim() === '' || !hasChange;

        const checkDisable = () => {
            var isDis = false
            if (phone.trim() === '' || email.trim() === '' || name.trim() === '' || dob=== '' || (classes.trim() === '' && school === '')) {
                isDis = true
                console.log("=====checkDisable 1",dob,classes,school)
            } else if(phone.trim().length < 10){
                isDis = true
                console.log("=====checkDisable 2")
            } else if(isMale == (dataLogin.gender === 'female' ? false : true) && phone.trim() == (dataLogin.phone || '').trim() 
            && email.trim() == (dataLogin.email || '').trim() && name.trim() == (dataLogin.fullname || '').trim() 
            && dateTimeHelper.compareDate(dob, (dataLogin.birthday ? moment(dataLogin.birthday, 'YYYY-MM-DD HH:mm:ss').toDate() : new Date())) == 0 
            && (!dataLogin.avatar || avatar.uri == dataLogin.avatar)
            ){
                if(dataLogin.role == 'parent') {
                    isDis = true
                } else if (school.trim() == (dataLogin.school || dataLogin.province || props.navigation.getParam('user').province).trim() && classes.trim() == (dataLogin.class || '').trim()) {
                isDis = true
                console.log("=====checkDisable 3")
                }
            } else{
                isDis = false
            }
            return isDis
        }

    return {
        checkDisable,
        name, setName: onSetName,
        phone, setPhone: onSetPhone,
        avatar, setAvatar:onSetAvatar,
        email, setEmail: onSetEmail,
        classes, setClasses: onSetClasses,
        school, setSchool: onSetSchool,
        dob, setDob: onSetDOB,
        isMale, setGender: onSetGender,
        modalVisible, setModalVisible,
        loadingIndicator, setIndicator,
        imagePickerVisible, setPickerVisible,
        editProfile, setErrorPhoneText, errorPhoneText
    };

};
