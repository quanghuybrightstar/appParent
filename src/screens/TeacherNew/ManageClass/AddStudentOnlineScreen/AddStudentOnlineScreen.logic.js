import { useState, useEffect } from 'react'
import API from '../../../../API/APIConstant'
import APIBase from '../../../../base/APIBase'

/**
 * AddStudentOnlineScreen Screen logic handler
 * @param {object} props navigation props
 * @returns 
*/
export const useModel = (props) => {
    //Class object
    const [classItem] = useState(props.navigation.state.params.item)
    //Resule Modal visible
    const [isResultVisible, setResultVisible] = useState(false)
    //Confirm modal visible
    const [isConfirmVisible, setConfirmVisible] = useState(false)
    //Student code
    const [code, setCode] = useState('')
    //Error text when enter code
    const [err, setErr] = useState('')
    //student data Object
    const [parent, setParent] = useState({})
    //Message after call API
    const [message, setMessage] = useState('')
    //Loading flag
    const [loading, setLoading] = useState(false)

    /**
     * Function validate the user input's code
    */
    const onValidateCode = async () => {
        const url = API.baseurl + API.checkUserCode + code;
        try {
            const res = await APIBase.postDataJson('get', url)
            let data = res.data;
            if (data.status) {
                setErr('')
                setParent(data.user_data)
                setConfirmVisible(true)
            } else {
                setErr(data.msg)
            }

        } catch (error) {
            setErr(error.response.data.msg)
            console.log(error.response);
            console.log(error.request);
        } finally {
        }
    }

    /**
     * Function send invite request to the selected student
    */
    const onSendRequest = async () => {
        setLoading(true)
        const url = classItem.type === 'online' ? API.baseurl + API.send_request_add_student : API.baseurl + API.addNewStudent
        try {
            let form = new URLSearchParams();
            form.append("user_code", code);
            form.append("class_id", classItem.id);
            const res = await APIBase.postDataJson('post', url, classItem.type === 'online' ? {
                user_code: code,
                class_id: classItem.id
            } : {
                class_id: classItem.id,
                student_id: parent.id,
            })
            console.log("=====onSendRequest",loading)
            let data = res.data;
            setLoading(false)
            setConfirmVisible(false)
            if (data.status) {
                // setMessage(res.data.msg);
                // setResultVisible(true)
                props.navigation.pop();
            } else {
                console.log("=====onSendRequest",loading)
                setErr(data.msg)
            }

        } catch (error) {
            setLoading(false)
            setResultVisible(false)
            setErr(error.response.data.msg)
            console.log(error.response);
            console.log(error.request);
        } finally {
        }
    }

    return {
        isResultVisible, setResultVisible,
        isConfirmVisible, setConfirmVisible,
        err, setErr, parent, setParent, message,
        onSendRequest, onValidateCode, code, setCode, loading, setLoading, message
    }
}