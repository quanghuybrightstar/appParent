
import { useState, useEffect } from "react"
import { Alert } from "react-native"
import API from "../../../../API/APIConstant"
import APIBase from "../../../../base/APIBase"

/**
 * StudentListTeacherScreen Screen logic handler
 * @param {object} props navigation props
 * @returns 
*/
export const useModel = (props) => {
    //Class data object
    const [classItem] = useState(props.navigation.state.params.item)
    //Alert visible
    const [alertVisible, setAlertVisible] = useState(false)
    //List of all student
    const [listStudent, setListStudent] = useState([])
    //Loading flag
    const [loading, setLoading] = useState(true)
    //Selected student
    const [selectedStudent, setSelectedStudent] = useState()
    //list of enrolled student
    const [listEnrollment, setListEnrollment] = useState([])
    //message modal visible
    const [messageVisible, setMessageVisible] = useState(false)
    //mesage
    const [message, setMessage] = useState('')
    // base url for img
    const [baseUrl, setBaseUrl] = useState('')

    useEffect(() => {
        const listener = props.navigation.addListener('didFocus', onFocus)
        return () => {
            listener.remove();
        }
    }, [])

    /**
     * Function add listener when focusing screen
    */
    const onFocus = () => {
        getData()
        getDataEnrollment()
    }

    /**
     * Function get list of request to join the class
    */
    const getDataEnrollment = async () => {
        const url = API.baseurl + API.Data_request + `${classItem.id}`
        try {
            const res = await APIBase.postDataJson('get', url)
            let data = res.data;
            if (data.hasOwnProperty('list_request')) {
                setListEnrollment(data.list_request)
                setBaseUrl(data.base_url)
            } else {
                setListEnrollment([])
            }

        } catch (error) {
            Alert.alert('', error.response.data);
        } finally {
        }
    }

    /**
     * Function get list of student
    */
    const getData = async () => {
        // const url = API.baseurl + API.GetClassMember + `?class_id=${classItem.id}`
        const url = classItem.type === 'online' ? API.baseurl + API.GetClassMember + `?class_id=${classItem.id}` : API.baseurl + API.listStudentByClassId + `${classItem.id}`
        try {
            setLoading(true)
            const res = await APIBase.postDataJson('get', url)
            let data = res.data;
            console.log("🚀 ~ file: StudentListTeacherScreen.logic.js ~ line 58 ~ getData ~ data", data)
            setLoading(false)
            setBaseUrl(data.base_url)
            if (classItem.type == "online") {
                if (data.hasOwnProperty('data')) {
                    setListStudent(data.data)
                } else {
                    setListStudent([])
                }
            } else {
                if (data.hasOwnProperty('class_info')) {
                    setListStudent(data.class_info.list_student.map(a => {
                        return {
                            ...a,
                            fullname: a.user_name
                        }
                    }))
                } else {
                    setListStudent([])
                }
            }

        } catch (error) {
            setLoading(false)
            Alert.alert('', error.response.data);
        } finally {
        }
    }

    /**
     * Function show remove confirmation modal
    */
    const onDelete = (item) => {
        setSelectedStudent(item)
        setAlertVisible(true)
    }

    /**
     * Function remove a student from a class
    */
    const onConfirmDelete = async () => {
        const url = classItem.type === 'online' ? API.baseurl + API.GetClassMember : API.baseurl + API.addNewStudent
        try {
            let form = new URLSearchParams();
            if (classItem.type === 'online') {
                form.append("id", Number(classItem.id));
                form.append("students", JSON.stringify([selectedStudent.id]));
            } else {
                form.append("class_member_id", selectedStudent.id);
            }
            const res = await APIBase.deleteWithData(url, form)
            console.log("🚀 ~ file: StudentListTeacherScreen.logic.js ~ line 102 ~ onConfirmDelete ~ res", res)
            // const res = await APIBase.postDataJson('del', url)
            let data = res.data;
            if (data.hasOwnProperty('status') && !!data.status) {
                setMessage(data.msg)
                getData()
                setAlertVisible(false)
                setMessageVisible(true)
            } else {
            }

        } catch (error) {
            Alert.alert('', error.response.data);
        } finally {
        }
    }

    return {
        classItem,
        alertVisible, setAlertVisible,
        onDelete,
        onConfirmDelete,
        listStudent, loading, onFocus, selectedStudent,
        listEnrollment, messageVisible, setMessageVisible, message, setMessage,
        baseUrl
    }
}