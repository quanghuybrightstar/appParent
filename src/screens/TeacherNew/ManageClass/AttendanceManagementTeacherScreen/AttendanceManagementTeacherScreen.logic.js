import { useEffect, useState } from "react"
import { Alert } from "react-native"
import API from "../../../../API/APIConstant"
import APIBase from "../../../../base/APIBase"
import LogBase from "../../../../base/LogBase"

/**
 * AttendanceManagementTeacherScreen Screen logic handler
 * @param {object} props navigation props
 * @returns 
*/
export const useModel = (props) => {
    //Attendance list 
    const [attendanceList, setAttendanceList] = useState([])
    //modal visible
    const [isModalVisible, setModalVisible] = useState(false)
    //selected date
    const [selectedDate, setSelectedDate] = useState(new Date())
    //Date picker modal visible
    const [isDateModalVisible, setDateModalVible] = useState(false)
    //Loading flag
    const [loading, setLoading] = useState(true)
    //Class data object
    const [classItem] = useState(props.navigation.state.params.item)
    //Student data list
    const [studentList, setStudentList] = useState([])
    //Base url of img
    const [baseUrl, setBaseUrl] = useState('')
    //is show popup delete
    const [isShowPopup, setisShowPopup] = useState(false)
    //item delete
    const [curIitem, setcurIitem] = useState()

    useEffect(() => {
        const listener = props.navigation.addListener('didFocus', getData)
        return () => {
            listener.remove();
        }
    }, [])

    /**
     * Function toggle calendar modal
    */
    const onToggleModalPress = () => {
        setModalVisible(true)
    }

    /**
     * Function get data of attendace list
    */
    const getData = async () => {
        const url = API.baseurl + API.listStudentByClassId + `${classItem.id}`
        try {
            setLoading(true)
            const res = await APIBase.postDataJson('get', url)
            let data = res.data;
            console.log("=====getDataC",data)
            setLoading(false)
            if (data.hasOwnProperty('data_roll_up')) {
                setAttendanceList(data.data_roll_up)
                setBaseUrl(data.base_url)
            } else {
                setAttendanceList([])
            }
            if (data.hasOwnProperty('class_info')) {
                setStudentList(data.class_info.list_student.map(a => {
                    return {
                        ...a,
                        fullname: a.user_name,
                        status: 0,
                        comment: '',
                        typeComment: 'public'
                    }
                }))
            } else {
                setStudentList([])
            }

        } catch (error) {
            setLoading(false)
            // Alert.alert('', error.response.data);
        } finally {
        }
    }

    /**
     * Function select a specific date
    */
    const onSaveDate = (date) => {
        setSelectedDate(date)
        setDateModalVible(false)
        setTimeout(() => {
            setModalVisible(true)
        }, 400);
    }

    /**
     * Function create new attendance ticket and navigate to AttendancePaperTeacherScreen screen
    */
    const onAddNewAttendance = () => {
        setModalVisible(false)
        setTimeout(() => { setSelectedDate(new Date()) }, 400);
        props.navigation.navigate('AttendancePaperTeacherScreen', {
            date: selectedDate, item: classItem, studentList: studentList, baseUrl: baseUrl
        })
    }

    /**
     * Function delete
    */
            const callDelete = async () => {
                const url = API.baseurl + API.attendance;
                let qs = require('qs');
                var body = {
                    id: curIitem.id
                }
                var bodyQS = qs.stringify(body)
                LogBase.log("=====req callDelete data",curIitem)
                LogBase.log("=====req callDelete",body)
                try {
                    const res = await APIBase.postDataJson('DELETE', url, bodyQS)
                    let data = res.data;
                    if (data.status) {
                        getData()
                    } else {
                        data.msg && Alert.alert(data.msg)
                    }
                } catch (error) {
                    Alert.alert("Không thể xoá bảng điểm này")
                } finally {
        
                }
            }

    return {
        attendanceList,
        isModalVisible, onToggleModalPress, setModalVisible,
        isDateModalVisible, setDateModalVible, selectedDate, setSelectedDate, callDelete,
        onSaveDate, onAddNewAttendance, classItem, loading, baseUrl, curIitem, setcurIitem, isShowPopup, setisShowPopup
    }
}