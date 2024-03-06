import { useEffect, useRef, useState } from "react"
import { Alert } from "react-native"
import { useSelector } from "react-redux"
import API from "../../../../API/APIConstant"
import APIBase from "../../../../base/APIBase"
import moment from 'moment'
import { Colors } from "../../../../styleApp/color"
import LogBase from "../../../../base/LogBase"

/**
 * AttendancePaperTeacherScreen Screen logic handler
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
    //list of student
    const [listStudent, setListStudent] = useState(props.navigation.state.params.studentList)
    //Base URL for image
    const [baseUrl, setBaseUrl] = useState(props.navigation.state.params.baseUrl)
    //Selected student list
    const [selectedStudent, setSelectedStudent] = useState([])
    //CHeck if all student is selected
    const [isSelectAll, setSelectAll] = useState(false)
    //Check if processing
    const [isProcess, setProcess] = useState(false)
    //COmment modal visible
    const [isCommentVisible, setCommentVisible] = useState(false)
    //comfirm modal visible
    const [isComfirmVisible, setComfirmVisible] = useState(false)
    //title
    const [modalTitle, setModalTitle] = useState('')
    //general comment
    const [generalComment, setGeneralComment] = useState('')
    //is save private comment
    const [isSavePri, setSavePri] = useState(true)
    //chosen student
    const [focusStudent, setFocusStudent] = useState(null)
    //Status of attendace
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
    //Show send option modal visible
    const [isShowSendOption, setShowSendOption] = useState(false)
    //send option selected
    const [selectedSendOption, setSelectedSendOption] = useState('student')
    //Error message
    const [errorMessage, setErrorMessage] = useState('')

    const [showModalSelect, setshowModalSelect] = useState(false)

    const [curSelect, setCurSelect] = useState(false)

    useEffect(() => {
        // getStudentList()
    }, [])

    // const getStudentList = async () => {
    //     const url = API.baseurl + API.GetClassMember + `?class_id=${classItem.id}`
    //     try {
    //         setLoading(true)
    //         const res = await APIBase.postDataJson('get', url)
    //         let data = res.data;
    //         console.log('🚀 ~ file: AttendancePaperTeacherScreen.logic.js ~ line 50 ~ getStudentList ~ data', res)
    //         setLoading(false)
    //         if (data.hasOwnProperty('data')) {
    //             setListStudent(data.data.map(a => {
    //                 return {
    //                     ...a,
    //                     status: 0,
    //                     comment: ''
    //                 }
    //             }))
    //             setBaseUrl(data.base_url)
    //         } else {
    //             setListStudent([])
    //         }

    //     } catch (error) {
    //         setLoading(false)
    //         Alert.alert('', error.response.data);
    //     } finally {
    //     }
    // }

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
            if (temp.length === listStudent.length) {
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
            setSelectedStudent(listStudent.map(a => {
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
     * Function dismiss comment modal
    */
    const onCancelModal = () => {
        setCommentVisible(false)
    }

    /**
     * Function dismiss comfirm modal
    */
   const onCancelComfirm = () => {
        setComfirmVisible(false)
        let temp = Array.from(listStudent).map(a => {
            return {
                ...a,
                comment: text,
                typeComment: 'public'
            }
        })
        setListStudent(temp)
    }
    /**
     * Function ok comfirm modal
    */  
    const onOKComfirm = () => {
        setComfirmVisible(false)
        let temp = Array.from(listStudent).map(a => {
            if(a.typeComment != 'private') 
            return {
                ...a,
                comment: text,
                typeComment: 'public'
            }
        })
        setListStudent(temp)
    }
    /**
     * Function check has private
    */  
    const isHasPrivate = () => {
        var isHas = false
        listStudent.forEach(element => {
            LogBase.log("=====element",element)
            if(element.typeComment == 'private'){
                isHas = true
                LogBase.log("=====isHas",isHas)
            }
        });
        return isHas
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

                let temp = Array.from(listStudent).map(a => {
                    if(!isSavePri || a.typeComment == 'public'){
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
            // let form = new URLSearchParams();
            // form.append("class_id", String(classItem.id));
            // form.append("total_student", String(listStudent.length));
            // form.append("number_absence",);
            // form.append("send_to_parent", String(isSelectAll ? 1 : 0));
            // form.append("date", String());
            // form.append("list_student",);
            // var qs = require('qs');
            let content = (isSelectAll || selectedStudent.length > 0) ? { send_content: selectedSendOption } : {}
            var qs = require('qs');
            console.log("=====listStudent",listStudent)
            const params = {
                class_id: classItem.id,
                total_student: listStudent.length,
                number_absence: listStudent.filter(a => a.status === status[2].value || a.status === status[3].value).length,
                send_to_parent: isSelectAll ? 1 : 0,
                general_comment: generalComment,
                date: moment(props.navigation.state.params.date).format('DD-MM-YYYY HH:mm'),
                list_student: JSON.stringify(listStudent.map((a) => {
                    let body = {
                        id: a.id,
                        fullname: a.fullname,
                        parent_id: a.parent_id || '',
                        status: status.find(b => b.value === a.status).body_value,
                        // comment: !!a.comment ? a.comment : generalComment,
                        comment: a.comment
                    }
                    if ((selectedStudent.includes(a.id) && !!a.parent_id) || isSelectAll) {
                        body = Object.assign({}, {
                            ...body,
                            send_to_parent: 1
                        })
                    }
                    return body
                })),
                ...content
            }
            console.log("=====params req", params);
            const form = qs.stringify(params);
            // if (isSelectAll || selectedStudent.length > 0) {
            //     form.append('send_content', selectedSendOption)
            // }
            const res = await APIBase.tokenAPI('post', url, form)
            console.log("=====resC", res);
            setShowSendOption(false)
            let data = res.data;
            setProcess(false)
            if (data.hasOwnProperty('status') && data.status) {
                props.navigation.pop()
            }
        } catch (error) {
            console.log("-----error", error);
            // Alert.alert('', error.response.data.msg, [{
            //     text: 'OK',
            //     onPress: () => props.navigation.pop()
            // }], {
            //     cancelable: true
            // });
            setErrorMessage(error.response.data.msg)
            setTimeout(() => {
                setErrorMessage('')
                props.navigation.pop()
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
        isCommentVisible, modalTitle, focusStudent, isHasPrivate,
        onToggleCommentModal, onCancelModal, generalComment, onSubmitComment, onStatusChange,
        onSave, isShowSendOption, setShowSendOption, selectedSendOption, setSelectedSendOption,
        onPreSave, errorMessage, setshowModalSelect, showModalSelect, onShowSelect, setCurSelect,
        curSelect, isComfirmVisible, setComfirmVisible, onCancelComfirm, onOKComfirm, isSavePri, setSavePri
    }
}