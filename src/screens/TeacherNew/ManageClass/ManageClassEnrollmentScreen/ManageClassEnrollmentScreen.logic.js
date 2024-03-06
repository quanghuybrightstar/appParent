import { useState, useEffect } from "react"
import { Alert } from "react-native"
import API from "../../../../API/APIConstant"
import APIBase from "../../../../base/APIBase"
import LogBase from "../../../../base/LogBase"

/**
 * ManageClassEnrollmentScreen Screen logic handler
 * @param {object} props navigation props
 * @returns 
*/
export const useModel = (props) => {
    //Check if all student is selected
    const [isSelectAll, setSelectAll] = useState(false)
    //Selected student
    const [selectedItem, setSelectedItem] = useState([])
    //List of student
    const [listStudent, setListStudent] = useState(props.navigation.state.params.enrollmentList)
    //Base Url for image
    const [baseUrl] = useState(props.navigation.state.params.baseUrl)
    //Class data object
    const [classItem] = useState(props.navigation.state.params.item)
    //loading flag
    const [loading, setLoading] = useState(false)
    //APi message for alert
    const [message, setMessage] = useState('')
    //Result modal visible
    const [isResultVisible, setResultVisible] = useState(false)

    /**
     * Function get data of list request student 
    */
    const getData = async () => {
        const url = API.baseurl + API.Data_request + `${classItem.id}`
        try {
            const res = await APIBase.postDataJson('get', url)
            let data = res.data;
            if (data.hasOwnProperty('list_request')) {
                setListStudent(data.list_request)
            } else {
                setListStudent([])
            }

        } catch (error) {
            Alert.alert('', error.response.data);
        } finally {
        }
    }
    /**
        * Function return to the screen after the student is over
    */
    useEffect(() => {
        if (listStudent.length === 0) {
            props.navigation.goBack()
        }
    }, [listStudent])

    /**
     * Function accept a specific student or a list of student's request
    */
    const acceptStudent = async (id) => {
        const url = API.baseurl + API.Accept_member_request
        try {
            setLoading(true)
            let form = new URLSearchParams();
            form.append("class_id", Number(classItem.id));
            form.append("list_request_id", !!id ? JSON.stringify([id]) : JSON.stringify(selectedItem));
            const res = await APIBase.postDataJson('put', url, form, {
                'Content-Type': 'application/x-www-form-urlencoded'
            })
            setLoading(false)
            let data = res.data;

            if (data.hasOwnProperty('status') && data.status) {
                setMessage(data.msg)
                setTimeout(() => {
                    setResultVisible(true)
                }, 1000);
                setSelectedItem([])
                getData()
            } else {
            }

        } catch (error) {
            setLoading(false)
            Alert.alert('', error.response.data);
        } finally {
        }
    }

    /**
     * Function reject a specific student or a list of student's request
    */
    const rejectStudent = async (id) => {
        const url = API.baseurl + API.Reject_member_request
        try {
            setLoading(true)
            let form = new URLSearchParams();
            form.append("class_id", Number(classItem.id));
            form.append("list_request_id", !!id ? JSON.stringify([id]) : JSON.stringify(selectedItem));
            const res = await APIBase.postDataJson('put', url, form, {
                'Content-Type': 'application/x-www-form-urlencoded'
            })
            LogBase.log("=====Res:",res.data)
            setLoading(false)
            let data = res.data;
            if (data.hasOwnProperty('status') && data.status) {
                setMessage(data.msg)
                setTimeout(() => {
                    setResultVisible(true)
                }, 1000);
                setSelectedItem([])
                getData()
            } else {
            }

        } catch (error) {
            setLoading(false)
            Alert.alert('', error.response.data);
        } finally {
        }
    }

    /**
     * Function add/remove a specific student in selected list
    */
    const onSelectItem = (id) => {
        if (selectedItem.includes(id)) {
            setSelectedItem(selectedItem.filter(a => a !== id))
            setSelectAll(false)
        } else {
            let temp = Array.from(selectedItem)
            temp.push(id)
            setSelectedItem(temp)
            if (temp.length === listStudent.length) {
                setSelectAll(true)
            }
        }
    }

    /**
     * Function select all/remove all student in selected list
    */
    const onSelectAll = () => {
        if (!isSelectAll) {
            setSelectAll(true)
            setSelectedItem(listStudent.map(a => {
                return a.id
            }))
        } else {
            setSelectAll(false)
            setSelectedItem([])
        }

    }

    return {
        isSelectAll, setSelectAll,
        selectedItem, onSelectItem,
        listStudent, onSelectAll,
        acceptStudent, rejectStudent,
        baseUrl, isResultVisible, setResultVisible, message, loading
    }
}