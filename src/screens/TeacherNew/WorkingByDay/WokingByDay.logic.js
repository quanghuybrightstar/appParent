import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import API from "../../../API/APIConstant";
import MyData from "../../../component/MyData";
import moment from "moment";
import { Alert, Platform } from "react-native";
import APIBase from "../../../base/APIBase";
import { useSelector } from "react-redux";
import { Global } from "../../../utils/global";
import LogBase from "../../../base/LogBase";

/**
 * @summary Working schedule by day logic handler.
 * 
 * @param {object} props 
 * @property {object} navigation: The navigation object
 * 
 * 
 */

export const studyPlanMethod = (props) => {
    const dataLogin = useSelector(state => state.AuthStackReducer.dataLogin);
    const oldDate = useRef(moment().format('YYYY-MM-DD'))
    //Loading flag
    let [loading, setLoading] = useState(false)
    //Loading full screen 
    let [loadingIndicator, setIndicator] = useState(false)
    //list of study data
    let [studyData, setStudyData] = useState([])
    //current chosen date
    let [currentDate, setCurrentDate] = useState(oldDate.current)
    //current chosen plan item
    let [currentItem, setCurrentItem] = useState(null)
    //flag show modal
    let [showModalDate, setModalDate] = useState(false)
    //flag check if need to reload
    let [isReloadData, setReload] = useState(false)

    let flatlistRef = useRef();

    // const pickDateRef = useRef();

    // useEffect(() => {
    //     const listener = props.navigation.addListener('didFocus', () => {
    //         getData()
    //     })
    //     return () => {
    //         listener.remove();
    //     }
    // }, [])

    useEffect(() => {
        if (!showModalDate)
            setCurrentItem(null)
    }, [showModalDate])

    useEffect(() => {
        console.log("---isReloadData", isReloadData);
    }, [isReloadData])

    useEffect(() => {
        getData()
    }, [currentDate])


    /**
     * get Study Plan data
     * @returns Promise
     */
    const getStudyPlan = async () => {
        const url = API.baseurl + API.getPlan + `start_time=${currentDate}&end_time=${currentDate}`
        LogBase.log("=====plan3", url)
        try {
            const res = await APIBase.postDataJson('get', url);
            LogBase.log("=====getStudyPlan", res.data);
            return Promise.resolve(res.data.data)
        } catch (error) {
            LogBase.log('err1', error);
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
    const getData = () => {
        LogBase.log("getData---isReloadData", isReloadData);
        setLoading(true)
        loadingInIos(true)
        Promise.all([
            getStudyPlan(),
            // getSchedulePlan(),
        ]).then((res) => {
            setStudyData(res[0])
            setLoading(false)
            loadingInIos(false)
        }).catch(err => {
            console.log("----err", err);
            setLoading(false)
            loadingInIos(false)
        })
    }

    /**
     * Change status to complete method
     * @param {object} props 
     */
    const completePlan = useCallback(async (props) => {
        setIndicator(true)
        const url = API.baseurl + API.editPlan;
        try {
            const res = await APIBase.postDataJson('put', url, { ...props, status: "done" });
            let data = res.data;
            if (data.status) {
                Global.reloadDataHome()
                setReload(!isReloadData);
                // pickDateRef?.current?.onRefresh()
                LogBase.log("completePlan----data", data);
                getData()
            }
        } catch (error) {

            setTimeout(() => {
                Alert.alert('Thông báo', error.response.data, [
                    { text: 'Đồng ý', style: "cancel" }
                ]);
            }, 1000)
            console.log(error.response);
            console.log(error.request);
        } finally {
            setIndicator(false)
        }
    }, [currentDate, isReloadData])

    /**
     * Change status to notDone method
     * @param {object} props 
     */
    const changetoNotDonePlan = useCallback(async (props) => {
        setIndicator(true)
        const url = API.baseurl + API.editPlan;
        try {
            const res = await APIBase.postDataJson('put', url, { ...props, status: "no_status" });
            let data = res.data;
            if (data.status) {
                Global.reloadDataHome()
                setReload(!isReloadData);
                // pickDateRef?.current?.onRefresh()
                LogBase.log("=====changetoNotDonePlan", data);
                getData()
            }
        } catch (error) {

            setTimeout(() => {
                Alert.alert('Thông báo', error.response.data, [
                    { text: 'Đồng ý', style: "cancel" }
                ]);
            }, 1000)
            console.log(error.response);
            console.log(error.request);
        } finally {
            setIndicator(false)
        }
    }, [currentDate, isReloadData])

    /**
     * delete Plan method
     * @param {number | string} id id of plan
     */
    const deletePlan = async (id, isDeleteAll) => {
        setIndicator(true)
        const url = API.baseurl + API.deletePlan
        var qs = require('qs');
        const form = qs.stringify({
            id,
            update_all: isDeleteAll ? 1 : 0
        });
        try {
            const res = await APIBase.postDataJson('delete', url, form);
            let data = res.data;
            Global.reloadDataHome()
            setReload(!isReloadData);
            getData()

        } catch (error) {
            setIndicator(false)
            setTimeout(() => {
                Alert.alert('Thông báo', error.response.data, [
                    { text: 'Đồng ý', style: "cancel" }
                ]);
            }, 1000)

            console.log(error.response);
            console.log(error.request);
        } finally {
            setIndicator(false)
        }
    }

    return {
        getStudyPlan,
        loading,
        studyData,
        setCurrentDate,
        getData,
        currentItem,
        setCurrentItem,
        currentDate,
        deletePlan, flatlistRef,
        loadingIndicator,
        showModalDate,
        setModalDate,
        completePlan,
        changetoNotDonePlan,
        setReload,
        isReloadData,
        // pickDateRef
    }

}