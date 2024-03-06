import axios from "axios";
import { useEffect, useState } from "react";
import API from "../../../../API/APIConstant";
import moment from "moment";
import { Alert } from "react-native";
import APIBase from "../../../../base/APIBase";
import { useSelector } from "react-redux";
import MyData from '../../../../component/MyData'
import LogBase from "../../../../base/LogBase";

/**
 * Teacher Diary stuyding logic handler
 * @param {object} props navigation props
 * @returns 
 */
export const diaryMethod = (props) => {
    const dataLogin = useSelector(state => state.AuthStackReducer.dataLogin);
    let user = props.navigation.getParam('user')
    let [loading, setLoading] = useState(false)
    let [studyData, setStudyData] = useState([])
    let [currentDate, setCurrentDate] = useState(moment().format('YYYY-MM-DD'))
    let [firstLoad, setFirstLoad] = useState(true)

    /**
     * get list of Diary by date
     */
    const getStudyPlan = async () => {
        var paramUrl = dataLogin.role === 'teacher' ? "class_id=" + MyData.classID + "&student_id=" + user.id + `&date=${currentDate}`
                                                     : "student_id=" + user.id + `&date=${currentDate}`
        const url = API.baseurl + API.student_log_learning_by_teacher + paramUrl
        try {
            const res = await APIBase.postDataJson('get', url);
            console.log("=====resActDay", res.data);
            // if (!!res.data.data && !!res.data.data.recent_activity) {
                // setStudyData(res.data.data.recent_activity[0].data_log)
            if (!!res.data.data) {
                setStudyData(res.data.data)
            } else {
                setStudyData([])
            }
        } catch (error) {
            setStudyData([])
            console.log('err1', error);
        }
    }


    /**
     * get list of Diary by date but without loading
     */
    const getDataWithOutLoading = async () => {
        await getStudyPlan()
    }

    /**
    * get list of Diary by date has loading animation
    */
    const getData = async () => {
        setLoading(true)
        await getStudyPlan()
        setLoading(false)
    }

    /**
     * Calculate time from second to minutes
     * @param {number} time 
     */
    const calculateTime = (time) => {
        if (!time || !Number(time)) return "...";
        const minutes = Math.floor(Number(time) / 60);
        const seconds = time - minutes * 60;
        if (minutes > 0 && seconds > 0) {
            return minutes + " phút " + seconds + " giây";
        }
        else if (minutes > 0 && seconds === 0) {
            return minutes + " phút";
        } else if (minutes === 0 && seconds > 0) {
            return seconds + " giây";
        }
        else return "..."
    }

    useEffect(() => {
        if (firstLoad) return;
        getData()
    }, [currentDate])

    useEffect(() => {
        getStudyPlan()
        setFirstLoad(false)
    }, [])
    return {
        getDataWithOutLoading,
        setCurrentDate,
        loading,
        studyData,
        currentDate,
        getData, calculateTime,
        firstLoad
    }

}