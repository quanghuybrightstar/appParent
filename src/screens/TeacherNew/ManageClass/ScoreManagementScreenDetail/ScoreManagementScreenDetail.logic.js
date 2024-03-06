import moment from "moment";
import { useCallback, useEffect, useReducer, useRef, useState } from "react"
import API from "../../../../API/APIConstant";
import APIBase from "../../../../base/APIBase";

/**
 * ScoreManagementScreenDetail Screen logic handler
 * @param {object} props navigation props
 * @returns 
*/
export const useModel = (props) => {
    const param = props.navigation.getParam('param')
    //List of student
    const [listStudent, setListStudent] = useState();
    //Modal visible
    const [modalText, setModalText] = useState(false)
    //name
    const [name, setName] = useState('')
    //note
    const [note, setNote] = useState('')
    //score
    const [score, setScore] = useState('')
    //sendParent checking
    const [sendParent, setSendParent] = useState()
    //chosen student
    const [focusStudent, setFocusStudent] = useState(null)
    //title of modal
    const [modalTitle, setModalTitle] = useState('')
    //base url of img
    const [base_url, setBaseUrl] = useState(props.navigation.getParam('infoClass')?.base_url)
    //date 
    const [date, setDate] = useState()
    // send type
    const [send, setSend] = useState('student')
    //modal visible
    const [modal, setModal] = useState(false)
    //check if processing
    const [isProcess, setProcess] = useState(false)
    //loading flag
    const [loading, setLoading] = useState(false)
    //score percent
    const [scorePercent, setScorePercent] = useState('')
    //type
    const [type, setType] = useState('')
    //semester
    const [semester, setSemester] = useState('')
    const listWithScore = useRef([]);
    useEffect(() => {
        if (props.navigation.getParam('card_id')) {
            getDetail()
        } else {
            let listStudent = props.navigation.getParam('infoClass')?.class_info.list_student
            listWithScore.current = listStudent
            setListStudent(listStudent)
            setDate(param?.date_test)
            setName(param?.exam_name)
            setScorePercent(param?.score_percent)
            setType(param?.type)
            setSemester(param?.semester)
        }
    }, [])

    /**
     * Function get data of score detail
    */
    const getDetail = () => {
        setLoading(true)
        APIBase.tokenAPI('get', API.baseurl + API.examCardDetail + props.navigation.getParam('card_id'))
            .then(res => {
                console.log('res', res)
                let dataStudent = []
                res.data.data.map(i => {
                    const obj = {
                        ...i,
                        id: i.member_id
                    }
                    dataStudent.push(obj)
                })
                listWithScore.current = dataStudent
                setListStudent(dataStudent)
                setBaseUrl(res.data.base_url)
                const currentdate = moment(res.data.card_data.date_test).toDate()
                setDate(currentdate)
                setSendParent(res.data.card_data.is_send_parent === '0' ? false : true)
                setName(res.data.card_data.exam_name)
                setScorePercent(res.data.card_data.score_percent)
                setType(res.data.card_data.type)
                setSemester(res.data.card_data.semester)
                setLoading(false)
            }).catch((err) => {
                setLoading(false)
            })
    }

    /**
     * Function toggle comment modal
    */
    const onToggleCommentModal = (item) => {
        if (!!item) {
            setFocusStudent(item)
            setModalTitle(item.user_name)
        } else {
            setFocusStudent(null)
        }
        setModalText(true)
    }

    /**
     * Function save comment for specific student or general
    */
    const onSubmitComment = (text) => {
        setModalText(false)
        if (!!focusStudent) {
            let idx = listStudent.findIndex(a => a.id === focusStudent.id)
            let temp = Array.from(listWithScore.current)
            temp[idx].comment = text
            listWithScore.current = temp
            setListStudent(temp)
        } else {
            setNote(text)
        }
    }

    /**
     * Function select focus student
    */
    const onFocusScrore = (item) => {
        setFocusStudent(item)
    }

    /**
     * Function remove focus student
    */
    const onBlurScore = (text) => {
        if (!!focusStudent) {
            let idx = listStudent.findIndex(a => a.id === focusStudent.id)
            let temp = Array.from(listStudent)
            temp[idx].score = text
            listWithScore.current = temp
            setListStudent(temp)
        } else {
            setScore(text)
        }
    }

    /**
     * Function save or toggle send option modal
    */
    const onPreSave = () => {
        if (sendParent) {
            setModal(true)
        } else {
            props.navigation.getParam('card_id') ? onEdit() : onSave()
        }
    }

    /**
     * Function save the score ticket
    */
    const onSave = async () => {

        console.log("-----onSave");
        setProcess(true)
        const url = API.baseurl + API.saveExam;
        try {

            var mDataList = []
            listWithScore.current.forEach(element => {
                let mono = {
                    member_id: element.id,
                    user_name: element.user_name,
                    parent_id: element.parent_id || '',
                    comment: !!element.comment ? element.comment : note,
                    score: element.score,
                    is_send_parent: sendParent ? 1 : 0
                }
                mDataList.push(mono)
            });

            let form = new URLSearchParams();
            form.append("class_id", String(param?.class_id));
            form.append("exam_name", String(name));
            form.append("is_send_parent", String(sendParent ? 1 : 0));
            form.append("type", String(type));
            form.append("score_percent", String(scorePercent));
            form.append("date_test", String(moment(date).format('YYYY-MM-DD') + moment().format('HH:mm:ss')));
            form.append("semester", String(semester));
            form.append("send_content", String(send));
            form.append("exam_mark_detail", JSON.stringify(mDataList))
            console.log("-----form save", form);
            console.log("-----scoreList", listWithScore);
            console.log("-----mDataList", mDataList);
            const res = await APIBase.postDataJson('post', url, form, {
                'Content-Type': 'application/x-www-form-urlencoded'
            })
            let data = res.data;
            if (data.hasOwnProperty('status') && data.status) {
                setModal(false)
                props.navigation.pop()
                setProcess(false)
            }
        }
        catch (err) {
            console.log("-----save err", err);
            setProcess(false)
        }
        finally {
        }

    }
    /**
     * Function save the editted score ticket
    */
    const onEdit = async () => {
        setProcess(true)
        const url = API.baseurl + API.saveExam;
        try {
            let form = new URLSearchParams();
            form.append("exam_name", String(name));
            form.append("card_id", String(props.navigation.getParam('card_id')));
            form.append("is_send_parent", String(sendParent ? 1 : 0));
            form.append("date_test", String(moment(date).format('YYYY-MM-DD') + moment().format('HH:mm:ss')));
            form.append("semester", String(semester));
            form.append("type", String(type));
            form.append("score_percent", String(scorePercent));
            form.append("send_content", String(send));
            form.append("exam_mark_detail", JSON.stringify(listWithScore.current.map((a) => {
                let body = {
                    member_id: a.member_id,
                    user_name: a.user_name,
                    student_card_id: a.student_card_id,
                    parent_id: a.parent_id || '',
                    comment: !!a.comment ? a.comment : note,
                    score: !!a.score ? a.score : score,
                    is_send_parent: sendParent ? 1 : 0
                }
                return body
            })))
            console.log("-----form edit", form);
            const res = await APIBase.postDataJson('put', url, form, {
                'Content-Type': 'application/x-www-form-urlencoded'
            })
            let data = res.data;
            setProcess(false)
            if (data.hasOwnProperty('status') && data.status) {
                setModal(false)
                props.navigation.pop()
            }
        }
        catch {
            setProcess(false)
        }
        finally {
        }

    }

    /**
     * Function save the score ticket
    */
    const onChange = (item, index) => {
        const newArr = Array.from(listWithScore.current);
        newArr.splice(index, 1, item);
        listWithScore.current = newArr
        // setListStudent(newArr)
    }

    /**
     * Function save the score ticket
    */
    const onChangeValue = (value) => {
        setDate(value?.date_test)
        setName(value?.exam_name)
        setScorePercent(value?.score_percent)
        setType(value?.type)
        setSemester(value?.semester)
    }
    return {
        modalText, setModalText, param, setSendParent, setNote, setScore,
        onSubmitComment, onToggleCommentModal, modalTitle, note, listStudent, base_url,
        onFocusScrore, score, onBlurScore, focusStudent, onSave, date, setDate,
        send, setSend, modal, setModal, isProcess, name, onChange, loading, onEdit, onPreSave, sendParent,
        scorePercent, type, semester, onChangeValue
    }
}