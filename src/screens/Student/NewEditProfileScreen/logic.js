import axios from "axios";
import { useEffect, useState } from "react";
import API from "../../../API/APIConstant";
import MyData from "../../../component/MyData";
import * as action from '../../../ReduxStudent/actions/Student';
import moment from "moment";
import { Alert } from "react-native";
import APIBase from "../../../base/APIBase";
import LogBase from "../../../base/LogBase";
import dateTimeHelper from "../../../utils/dateTimeHelper";

/**
 * Logic handle of Edit Profile Screen
 * @param {object} props props from redux and navigation
 * @returns object
 */
export const editProfileMethod = (props) => {
    //Name of user
    let [name, setName] = useState(props.navigation.getParam('dataPro').fullname || "")
    // phonenumber
    let [phone, setPhone] = useState(props.navigation.getParam('dataPro').phone || "")
    // avatar
    let [avatar, setAvatar] = useState({ uri: API.domain + props.navigation.getParam('dataPro').avatar || "" })
    //email
    let [email, setEmail] = useState(props.navigation.getParam('dataPro').email || "")
    //class
    let [classes, setClasses] = useState(props.navigation.getParam('dataPro').grade_name || "")
    //grade
    let [grade, setGrade] = useState()
    let [gradeVisible, setGradeVisible] = useState(props.navigation.getParam('dataPro').grade_name || "")
    //school of user
    let [school, setSchool] = useState(props.navigation.getParam('dataPro').school || "")
    // date of birth
    let [dob, setDob] = useState(!!props.navigation.getParam('dataPro').birthday ? moment(props.navigation.getParam('dataPro').birthday, 'YYYY-MM-DD HH:mm:ss').toDate() : new Date())
    // check if user is male
    let [isMale, setGender] = useState(props.navigation.getParam('dataPro').gender === 'female' ? false : true)
    // check if date modal is shown
    let [modalVisible, setModalVisible] = useState(false)
    // Loading flag
    let [loadingIndicator, setIndicator] = useState(false)
    // check if image picker is shown
    let [imagePickerVisible, setPickerVisible] = useState(false)

    let [errorPhoneText, setErrorPhoneText] = useState("")

    useEffect(() => {
        action.loadapiprofilehv()
    }, [])
    /**
     * edit profile function
     */
    const editProfile = async () => {
        setIndicator(true)
        const url = API.baseurl + API.editProfile
        const avaUrl = API.baseurl + API.updateAvatar
        var req = {
            phone,
            email,
            firstname: "",
            lastname: name.trim(),
            fullname: name.trim(),
            gender: isMale ? 'male' : 'female',
            birthday: moment(dob).format("YYYY-MM-DD HH:mm:ss"),
            school,
            class: classes,
            grade_id: classes=='Khối 6' ? 2 : classes=='Khối 7' ? 4 : classes=='Khối 8' ? 3 : classes=='Khối 9' ? 6 : ""
        }
        var qs = require('qs');
        const form = qs.stringify(req);
        let formData = new FormData();
        formData.append("file", avatar)
        LogBase.log("=====form req", req);
        try {
            if (!!avatar.name) {
                const res2 = await APIBase.tokenAPIFormData('post', avaUrl, formData)
            }
            const res = await APIBase.tokenAPI('put', url, form)
            LogBase.log("=====saveProfile", res.data);
            // props.loadapiprofilehv();
            props.navigation.navigate('NewProfileScreen', {isReLoad: res.headers.date});
        } catch (error) {
            LogBase.log('err-----', error);
            LogBase.log('err', error.response);
            Alert.alert('Thông báo', error.response.data, [
                { text: 'Đồng ý', style: "cancel" }
            ]);
        } finally {
            setIndicator(false)
        }
    }
    const checkDisable = () => {
        console.log("=====checkDisable avatar", avatar)
        console.log("=====checkDisable avatar ss", { uri: API.domain + props.navigation.getParam('dataPro').avatar || "" })
        var isDis = false
        if (phone.trim() === '' || email.trim() === '' || name.trim() === '' || dob=== '' || classes.trim() === '') {
            isDis = true
        } else if(phone.trim().length < 10){
            isDis = true
        } else if(isMale == (props.navigation.getParam('dataPro').gender === 'female' ? false : true) && phone.trim() == props.navigation.getParam('dataPro').phone 
        && email.trim() == props.navigation.getParam('dataPro').email && name.trim() == props.navigation.getParam('dataPro').fullname.trim() 
        && dateTimeHelper.compareDate(dob, (!!props.navigation.getParam('dataPro').birthday ? moment(props.navigation.getParam('dataPro').birthday, 'YYYY-MM-DD HH:mm:ss').toDate() : new Date())) == 0 
        && school.trim() == props.navigation.getParam('dataPro').school.trim() && classes.trim() == props.navigation.getParam('dataPro').grade_name
        && avatar.uri == ( API.domain + props.navigation.getParam('dataPro').avatar || "" )
        ){
            isDis = true
        } else{
            isDis = false
        }
        return isDis
    }
    
    const changeAvatar = (imgData) => {

        setAvatar(imgData)
    }

    const changePhone = (text) => {
        if(text.includes(',') || text.includes('.') || text.includes('-')){
            return
        }else{
            setPhone(text)
        }
    }

    return {
        name, setName,
        phone, setPhone,
        avatar, changeAvatar,
        email, setEmail,
        classes, setClasses,
        school, setSchool,
        dob, setDob, setGradeVisible, gradeVisible,
        isMale, setGender,
        modalVisible, setModalVisible,
        loadingIndicator, setIndicator,
        imagePickerVisible, setPickerVisible,setGrade,
        editProfile, checkDisable, setErrorPhoneText, errorPhoneText, changePhone
    }

}