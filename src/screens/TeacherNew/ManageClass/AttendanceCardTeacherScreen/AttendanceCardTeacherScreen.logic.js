import { useState, useEffect } from "react"
import { Alert } from "react-native"
import { useSelector } from "react-redux"
import API from "../../../../API/APIConstant"
import APIBase from "../../../../base/APIBase"
import moment from "moment"
import { Colors } from "../../../../styleApp/color"
import LogBase from "../../../../base/LogBase"

/**
 * AttendanceCardTeacherScreen Screen logic handler
 * @param {object} props navigation props
 * @returns 
*/
export const useModel = (props) => {

    const language = useSelector(state => state.LanguageStackReducer.language)
    const { AttendancePaperTeacherScreen } = language
    //Class data object
    const [classItem] = useState(props.navigation.state.params.item)
    //loading flag
    const [loading, setLoading] = useState(false)
    //status of attendance
    const [status, setStatus] = useState([{
        label: AttendancePaperTeacherScreen.OnTimeSt,
        value: 0,
        color: Colors._84C241,
        body_value: 'intime'
    }, {
        label: AttendancePaperTeacherScreen.LateSt,
        value: 1,
        color: Colors._ED8A22,
        body_value: 'late'
    }, {
        label: AttendancePaperTeacherScreen.DropoutSt,
        value: 2,
        color: Colors._BE1E2D,
        body_value: 'absence_not_allowed'
    }, {
        label: AttendancePaperTeacherScreen.TakeLeaveSt,
        value: 3,
        color: Colors._BE1E2D,
        body_value: 'absence_allowed'
    }])
    //List of student
    const [listStudent, setListStudent] = useState(props.navigation.state.params.attendanceDetail.data_detail.hasOwnProperty('status') ? props.navigation.state.params.attendanceDetail.data_detail : props.navigation.state.params.attendanceDetail.data_detail.map(a => {
        return {
            ...a,
            status: status.find(b => b.body_value === a.status).value
        }
    }))
    //Attendance detail object
    const [attendanceDetail] = useState(props.navigation.state.params.attendanceDetail)
    //baseUrl img
    const [baseUrl, setBaseUrl] = useState(props.navigation.state.params.baseUrl)
    //list of selected student
    const [selectedStudent, setSelectedStudent] = useState([])
    //check if all student is selected
    const [isSelectAll, setSelectAll] = useState(false)
    //is processing
    const [isProcess, setProcess] = useState(false)
    //check comment modal visible
    const [isCommentVisible, setCommentVisible] = useState(false)
    //title of modal
    const [modalTitle, setModalTitle] = useState('')
    //comment
    const [generalComment, setGeneralComment] = useState(props.navigation.state.params.attendanceDetail.general_comment)
    //chosen student
    const [focusStudent, setFocusStudent] = useState(null)
    //show send modal visible
    const [isShowSendOption, setShowSendOption] = useState(false)
    //selected send option
    const [selectedSendOption, setSelectedSendOption] = useState('student')
    //Error message of APi
    const [errorMessage, setErrorMessage] = useState('')

    const [showModalSelect, setshowModalSelect] = useState(false)

    const [curSelect, setCurSelect] = useState(false)
    //is save private comment
    const [isSavePri, setSavePri] = useState(true)

    /**
     * Function add/remove specific student in selected list
    */
    const onSelectItem = (id) => {
        if (selectedStudent.includes(id)) {
            setSelectedStudent(selectedStudent.filter(a => a !== id))
            setSelectAll(false)
        } else {
            let temp = Array.from(selectedStudent)
            temp.push(id)
            setSelectedStudent(temp)
            if (temp.length === listStudent.filter(a => !a.hasOwnProperty('send_to_parent')).length) {
                setSelectAll(true)
            }
        }
    }

    /**
     * Function select all or remove all student in selected list
    */
    const onSelectAll = () => {
        if (!isSelectAll) {
            setSelectAll(true)
            setSelectedStudent(listStudent.filter(a => !a.hasOwnProperty('send_to_parent')).map(a => {
                return a.id
            }))
        } else {
            setSelectAll(false)
            setSelectedStudent([])
        }
    }

    /**
     * Function toggle comment modal
    */
    const onToggleCommentModal = (item) => {
        if (!!item) {
            setFocusStudent(item)
            setModalTitle(item.fullname)
        } else {
            setFocusStudent(null)
            setModalTitle(AttendancePaperTeacherScreen.PublicComment)

        }
        setCommentVisible(true)
    }

    /**
     * Function check has private
    */  
   const isHasPrivate = () => {
    var isHas = false
    listStudent.forEach(element => {
        LogBase.log("=====element1",element)
        LogBase.log("=====generalComment1",generalComment)
        if(element.typeComment == 'private' || element.comment != generalComment){
            isHas = true
            LogBase.log("=====isHas",isHas)
        }
    });
    return isHas
}

    /**
     * Function dismiss comment modal
    */
    const onCancelModal = () => {
        setCommentVisible(false)
    }

    /**
     * Function save comment for specific student or general
    */
    const onSubmitComment = (text) => {
        setCommentVisible(false)
        if (!!focusStudent) {
            let idx = listStudent.findIndex(a => a.id === focusStudent.id)
            let temp = Array.from(listStudent)
            temp[idx].comment = text
            temp[idx].typeComment = 'private'
            setListStudent(temp)
        } else {
            setGeneralComment(text)
            LogBase.log("=====isSavePri",isSavePri)
            let temp = Array.from(listStudent).map(a => {
                if(!isSavePri || (a.typeComment != 'private' && a.comment == generalComment)){
                    return {
                        ...a,
                        comment: text,
                        typeComment: 'public'
                    }
                }else{
                    return {
                        ...a,
                        comment: a.comment,
                        typeComment: 'private'
                    }
                }
            })
            setListStudent(temp)
        }
    }

    /**
     * Function change attendance status of student
    */
   const onStatusChange = (value) => {
    let idx = listStudent.findIndex(a => a.id === curSelect)
    let temp = Array.from(listStudent)
    temp[idx].status = value
    setListStudent(temp)
    setshowModalSelect(false)
}

const onShowSelect = (id) => {
    setshowModalSelect(true)
    setCurSelect(id)
}
    /**
     * Function save or toggle send option modal
    */
    const onPreSave = () => {
        if (isSelectAll || selectedStudent.length > 0) {
            setShowSendOption(true)
        } else {
            onSave()
        }
    }

    /**
     * Function save the attendance ticket
    */
    const onSave = async () => {
        setProcess(true)
        const url = API.baseurl + API.attendance;
        try {
            let form = new URLSearchParams();
            form.append('roll_up_id', String(attendanceDetail.id))
            form.append("class_id", String(attendanceDetail.class_id));
            form.append("total_student", String(listStudent.length));
            form.append("number_absence", String(listStudent.filter(a => a.status === status[2].value || a.status === status[3].value).length));
            form.append("send_to_parent", String(isSelectAll ? 1 : 0));
            form.append('general_comment', String(generalComment))
            form.append("date", String(moment(props.navigation.state.params.date).format('DD-MM-YYYY')));
            form.append("list_student", JSON.stringify(listStudent.map((a) => {
                let body = {
                    id: a.id,
                    fullname: a.fullname,
                    parent_id: a.parent_id || '',
                    status: status.find(b => b.value === a.status).body_value,
                    comment: !!a.comment ? a.comment : generalComment,
                    //comment: a.comment
                }
                if (selectedStudent.includes(a.id) && !!a.parent_id) {
                    body = Object.assign({}, {
                        ...body,
                        send_to_parent: 1
                    })
                } else if (a.hasOwnProperty('send_to_parent')) {
                    body = Object.assign({}, {
                        ...body,
                        send_to_parent: a.send_to_parent
                    })
                }
                return body
            })));
            if (isSelectAll || selectedStudent.length > 0) {
                form.append('send_content', selectedSendOption)
            }
            LogBase.log("=====req attendance", form)
            const res = await APIBase.postDataJson('put', url, form, {
                'Content-Type': 'application/x-www-form-urlencoded'
            })
            setShowSendOption(false)
            let data = res.data;
            setProcess(false)
            if (data.hasOwnProperty('status') && data.status) {
                props.navigation.pop()
            }
        } catch (error) {
            // Alert.alert('', error.response.data.msg);
            setErrorMessage(error.response.data.msg)
            setTimeout(() => {
                setErrorMessage('')
            }, 2000);
            setProcess(false)
        } finally {
        }
    }

    return {
        listStudent, loading, isProcess,
        baseUrl, status,
        selectedStudent, setSelectedStudent,
        isSelectAll, onSelectItem, onSelectAll,
        isCommentVisible, modalTitle, focusStudent,
        onToggleCommentModal, onCancelModal, generalComment, onSubmitComment, onStatusChange,
        onSave, attendanceDetail, baseUrl, isHasPrivate, setSavePri, isSavePri,
        isShowSendOption, setShowSendOption, selectedSendOption, setSelectedSendOption, onPreSave, errorMessage,
        setshowModalSelect, showModalSelect, onShowSelect, setCurSelect, curSelect
    }
}