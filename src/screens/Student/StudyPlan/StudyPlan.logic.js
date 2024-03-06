import axios from "axios";
import { useEffect, useState, useCallback, useRef } from "react";
import API from "../../../API/APIConstant";
import MyData from "../../../component/MyData";
import moment from "moment";
import { Alert, Platform } from "react-native";
import APIBase from "../../../base/APIBase";
/**
 * @summary StudyPlan screen.
 * 
 * @param {object} props 
 * @property {object} navigation: The navigation object
 * 
 * 
 */
export const studyPlanMethod = (props) => {
    //Loading flag
    let [loading, setLoading] = useState(false)
    //Loading full screen
    let [loadingIndicator, setIndicator] = useState(false)
    //List of study plan data
    let [studyData, setStudyData] = useState([])
    //List of schedule plan
    let [scheduleData, setSchduleData] = useState([])
    //Current date
    let [currentDate, setCurrentDate] = useState(moment().format('YYYY-MM-DD'))
    //chosen item for update
    let [currentItem, setCurrentItem] = useState(null)
    //flag check show modal date
    let [showModalDate, setModalDate] = useState(false)
    //check if need to reload data
    let [isReloadData, setIsReloadData] = useState(false)
    let flatlistRef = useRef();

    useEffect(() => {
        if (!showModalDate)
            setCurrentItem(null)
    }, [showModalDate])
    useEffect(() => {
        const listener = props.navigation.addListener('didFocus', () => {
            setLoading(true)
            Promise.all([
                getStudyPlan(),
            ]).then((res) => {
                let data = !!res[0].data ? res[0].data : [];
                let studyData = data.filter((i) => i.type === 'personal')
                let scheduleData = data.filter((i) => i.type !== 'personal')
                console.log("=====Plandata", res);
                setSchduleData(scheduleData)
                setStudyData(studyData)
                setLoading(false)
            }).catch(err => {
                setLoading(false)
            })
        })
        return () => {
            listener.remove();
        }
    }, [currentDate])

    /**
     * get Study Plan data
     * @returns Promise
     */
    const getStudyPlan = async () => {
        const url = API.baseurl + API.getPlan + `start_time=${currentDate}&end_time=${currentDate}`
        try {
            const res = await APIBase.postDataJson('get', url);
            console.log("-----getStudyPlan", res.data);
            return Promise.resolve(res.data)
        } catch (error) {
            // console.log('err1', error);
            // console.log('err2', error.response);
            // console.log('err3', error.request);
            return Promise.reject(error)
        }
    }

    /**
     * loading in IOS handler
     */
    const loadingInIos = (show) => {
        if (Platform.OS === 'android') return;
        if (show) {
            flatlistRef.current.scrollToOffset({ offset: -32, animated: false })
        } else {
            flatlistRef.current.scrollToOffset({ offset: 0, animated: false })
        }
    }

    /**
     * get all data
     */
    const getData = useCallback(() => {
        setLoading(true)
        loadingInIos(true)
        Promise.all([
            getStudyPlan(),
        ]).then((res) => {
            let data = !!res[0].data ? res[0].data : [];
            let studyData = data.filter((i) => i.type === 'personal')
            let scheduleData = data.filter((i) => i.type !== 'personal')
            // console.log("=====Plandata2", scheduleData,res);
            setSchduleData(scheduleData)
            setStudyData(studyData)
            setLoading(false)
            setIndicator(false)
            loadingInIos(false)
        }).catch(err => {
            setLoading(false)
            loadingInIos(false)
        })
    }, [currentDate])


    /**
     * Create Plan method
     * @param {object} props plan information for creating
     */
    const onCreate = async (props) => {
        console.log("=====Hello",props)
        const url = API.baseurl + API.createPlan;
        try {
            const res = await APIBase.postDataJson('post', url, props);
            console.log("=====onCreate plan", res.data);
            if (res.data.status) {
                // setCurrentDate(moment(props.date).format('YYYY-MM-DD'))
                setIsReloadData(!isReloadData)
                getData()
                setCurrentItem(null);
            }
        } catch (error) {

        } finally {
        }
    }

    /**
     * Edit Plan method
     * @param {object} props plan information for editing
     */
    const onEdit = async (props) => {
        console.log("=====onEdit",props)
        const url = API.baseurl + API.editPlan;
        try {
            const res = await APIBase.postDataJson('put', url, {
                // ...props,
                title: props.title,
                id: props.id,
                type: props.type,
                content: props.content,
                remind: props.remind,
                remind_time: props.remind_time,
                start_time: moment(props.date, "HH:mm, DD/MM/YYYY").format("YYYY-MM-DD HH:mm:ss"),
            });
            let data = res.data;
            if (data.status) {
                // setCurrentDate(moment(props.date).format('YYYY-MM-DD'))
                setIsReloadData(!isReloadData)
                getData()
                setCurrentItem(null);
            }
        } catch (error) {
            console.log("----err", error);
            // setTimeout(() => {
            //     Alert.alert('', error.response.data, [
            //         { text: 'Đồng ý', style: "cancel" }
            //     ]);
            // }, 200)
            // console.log(error.response);
            // console.log(error.request);
        } finally {
        }
    }

    /**
     * Change status to complete method
     * @param {object} props 
     */
    const completePlan = async (props) => {
        const url = API.baseurl + API.editPlan;
        try {
            const res = await APIBase.postDataJson('put', url, { ...props, status: "done" });
            let data = res.data;
            if (data.status) {
                setIsReloadData(!isReloadData)
                getData()
                setCurrentItem(null);
                // setTimeout(() => {
                //     Alert.alert(data.msg)
                // }, 200)
            }
        } catch (error) {
            // setTimeout(() => {
            //     Alert.alert('', error.response.data, [
            //         { text: 'Đồng ý', style: "cancel" }
            //     ]);
            // }, 200)
            // console.log(error.response);
            // console.log(error.request);
        } finally {
        }
    }

   /**
     * Change status to not done method
     * @param {object} props 
     */
    const changetoNotDonePlan = async (props) => {
        const url = API.baseurl + API.editPlan;
        try {
            const res = await APIBase.postDataJson('put', url, { ...props, status: "no_status" });
            let data = res.data;
            if (data.status) {
                setIsReloadData(!isReloadData)
                getData()
                setCurrentItem(null);
            }
        } catch (error) {
        } finally {
        }
    }

    /**
     * delete Plan method
     * @param {number | string} id id of plan
     */
    const deletePlan = async (id) => {
        const url = API.baseurl + API.deletePlan
        var qs = require('qs');
        const form = qs.stringify({
            id
        });
        try {
            const res = await APIBase.postDataJson('delete', url, form);
            let data = res.data;
            if (data.status) {
                setIsReloadData(!isReloadData)
                getData()
                setCurrentItem(null);
            }

        } catch (error) {
            // setTimeout(() => {
            //     Alert.alert('', error.response.data, [
            //         { text: 'Đồng ý', style: "cancel" }
            //     ]);
            // }, 200)

            // console.log(error.response);
            // console.log(error.request);
        } finally {
        }
    }

    /**
     * Check action is edit or create
     * @param {object} props plan information
     */
    const onCheckAction = (props) => {
        if (!!props.id) onEdit(props)
        else onCreate(props)
    }
    
    useEffect(() => {
        setIndicator(true)
        getData()
    }, [currentDate])

    return {
        getStudyPlan,
        loading,
        studyData,
        scheduleData,
        setCurrentDate,
        getData,
        currentItem,
        flatlistRef,
        setCurrentItem,
        currentDate,
        onCreate,
        deletePlan,
        loadingIndicator,
        showModalDate,
        setModalDate,
        onCheckAction,
        completePlan,
        changetoNotDonePlan,
        isReloadData,
        setIsReloadData
    }

}