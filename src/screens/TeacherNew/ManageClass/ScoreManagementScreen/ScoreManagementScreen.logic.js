import { useEffect, useState } from "react"
import { Alert } from 'react-native';
import API from '../../../../API/APIConstant'
import APIBase from '../../../../base/APIBase'
import LogBase from "../../../../base/LogBase";
import { forEach } from "lodash";

/**
 * ScoreManagementScreen Screen logic handler
 * @param {object} props navigation props
 * @returns 
*/
export const useModel = (props) => {
    //List of score management
    const [scoreManagmentList, setScoreManagmentList] = useState([]);
    //modal visible
    const [modal, showModal] = useState(false);
    // Loading flag
    const [loading, setLoading] = useState(true)
    //Class data object
    const [classItem] = useState(props.navigation.state.params.item);
    //Err message
    const [err, setErr] = useState('');
    //list of type for exam
    const [listExamType, setListExam] = useState([]);
    //list of type for score
    const [listScoreType, setListScore] = useState([]);
    //refreshing for flatlist
    const [refreshing, setRefreshing] = useState(false);
    //date modal visible
    const [isDateModalVisible, setDateModalVible] = useState(false);
    //selected date value
    const [selectedDate, setSelectedDate] = useState(new Date());
    //class information
    const [infoClass, setInfoClass] = useState([])
    //is show popup delete
    const [isShowPopup, setisShowPopup] = useState(false)
    //item delete
    const [curIitem, setcurIitem] = useState()
    //semester 
    const dataSemester = [
        { type: '1', name: 'Học kỳ I' },
        { type: '2', name: 'Học kỳ II' },
    ]

    /**
     * Function get score list
    */
    const fetchListScore = async () => {
        const url = API.baseurl + API.classExam + classItem.id;
        try {
            const res = await APIBase.postDataJson('get', url)
            let data = res.data;
            if (data.status) {
                setLoading(false);
                setRefreshing(false);
                setScoreManagmentList(data.data)
                setListExam(data.list_exam_type);
                setListScore(data.list_score_percent)
            } else {

            }
        } catch (error) {
            setErr(error.response.data.msg)
        } finally {

        }
    }
    useEffect(() => {
        getDetailInfoClass()
        const listener = props.navigation.addListener('didFocus', fetchListScore)
        return () => {
            listener.remove();
        }
    }, [])
    const list_data = {
        listExamType,
        listScoreType,
        dataSemester
    }

    /**
     * Function get detail information of class
    */
    const getDetailInfoClass = async () => {
        const url = API.baseurl + API.listStudentByClassId + `${classItem.id}`
        const res = await APIBase.postDataJson('get', url)
        let data = res.data;
        setInfoClass(res.data)

    }

        /**
     * Function delete
    */
        const callDelete = async () => {
            const url = API.baseurl + API.deleteScoreBr;
            let qs = require('qs');
            var body = {
                card_id: curIitem.card_id
            }
            // var bodyQS = qs.stringify(body)
            LogBase.log("=====req callDelete data",curIitem)
            LogBase.log("=====req callDelete",body)
            try {
                const res = await APIBase.postDataJson('PUT', url, body)
                let data = res.data;
                if (data.status) {
                    fetchListScore()
                } else {
                    data.msg && Alert.alert(data.msg)
                }
            } catch (error) {
                Alert.alert("Không thể xoá bảng điểm này")
            } finally {
    
            }
        }

    // render test type
    const renderType = (type) => {
        var mList = listExamType.find(c => c.type == type)
        if(mList){
            return mList.name
        }else{
            return "-----"
        }
    }

    /**
     * Function create score ticket
    */
    const callApiCreateScore = async (value) => {
        const param = {
            ...value,
            class_id: classItem.id,
        }
        LogBase.log("=====infoClass",infoClass)
        infoClass.class_info.list_student.forEach(element => {
            if(element.comment){
                element.comment = null
            }
        });
        props.navigation.navigate('ScoreManagementScreenDetail', { param: param, infoClass: infoClass, list_data: list_data })

    }

    return {
        scoreManagmentList, modal, showModal, fetchListScore, loading, listExamType, listScoreType, refreshing, renderType, setisShowPopup, isShowPopup,
        isDateModalVisible, setDateModalVible, selectedDate, setSelectedDate, callApiCreateScore, dataSemester, list_data, infoClass, callDelete, setcurIitem
    }
}