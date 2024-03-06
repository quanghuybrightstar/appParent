import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import API from "../../../API/APIConstant";
import MyData from "../../../component/MyData";
import moment from "moment";
import { Alert, Platform } from "react-native";
import APIBase from "../../../base/APIBase";
import { Global } from "../../../utils/global";
import device from "../../../utils/device";
import LogBase from "../../../base/LogBase";
import {loadSettingAtHome} from '../../../ReduxStudent/actions/Student';
import {setVersionIgo} from '../../../redux/actions/ActionLogin';
import {useSelector, useDispatch} from 'react-redux';
/**
 * @summary Teacher Home screen.
 * 
 * @param {object} props 
 * @property {object} navigation: The navigation object
 * 
 * 
 */
export const studyPlanMethod = (props) => {
    //class loading flag
    const [loadingClass, setLoadingClass] = useState(false)
    //Data loading flag
    let [loading, setLoading] = useState(false)
    //fullscreen loading
    let [loadingIndicator, setIndicator] = useState(false)
    //study data list
    let [studyData, setStudyData] = useState([])
    //schedule data list
    let [scheduleData, setSchduleData] = useState([])
    //current date
    let [currentDate, setCurrentDate] = useState(moment().format('YYYY-MM-DD'))
    // chosen item for update
    let [currentItem, setCurrentItem] = useState(null)
    // date picker modal
    let [showModalDate, setModalDate] = useState(false)
    //class list
    let [classes, setClasses] = useState([])
    //flag check if need to reload
    let [isReloadData, setReload] = useState(false)
    //flag updateModal visible
    let [isVisibleUpdate, setVisibleUpdate] = useState(false)
    //flag updateModal must update
    let [isMust, setMust] = useState(false)
    //current date for Empty Text
    let [chosenDate, setChosenDate] = useState(moment().format('YYYY-MM-DD'))

    const [dataUpdateVer, setdataUpdateVer] = useState()
    const dataVersion = useSelector(state => state.AuthStackReducer.version_igo);
    const dispatch = useDispatch();
    const pickDateRefs = useRef();

    const listener = useRef()
    let flatlistRef = useRef();
    useEffect(() => {
        if (!showModalDate)
            setCurrentItem(null)
    }, [showModalDate])

    useEffect(() => {
        if (!loading)
            setChosenDate(currentDate)
    }, [loading])

    const checkVersion = async () => {
        try {
            const url = API.baseurl + API.check_version + `?version_number=${device.getBuildNumber()}&os=${Platform.OS}&build_path=${MyData.buildPart}`
            const res = await APIBase.postDataJson('get', url);
            LogBase.log("=====checkVersion",res.data)
            if(res.data.status){
                if(res.data.data.is_update){
                    LogBase.log("=====dataVersion", dataVersion)
                    LogBase.log("=====version_number:", dataVersion.version_number+"|"+res.data.data.version_number)
                    LogBase.log("=====build_path:", dataVersion.build_path+"|"+res.data.data.build_path)
                    if(!dataVersion || dataVersion.version_number < res.data.data.version_number || dataVersion.build_path < res.data.data.build_path){
                        LogBase.log("=====go to update")
                        setVisibleUpdate(true)
                        setdataUpdateVer(res.data.data)
                    }
                }
            }
        } catch (error) {
            LogBase.log('=====err_checkVersion', error);
        }
    }

    const cancelUpdate = () => {
        LogBase.log("cancelUpdate")
        dispatch(setVersionIgo({version_number: dataUpdateVer.version_number, build_path: dataUpdateVer.build_path}));
        setVisibleUpdate(false)
    }

    const addSetting = async () => {
        try {
            var res = await loadSettingAtHome(device.getDeviceID())
            // console.log("=====addSetting",res.data.data_setting.user_setting)
            res.data.data_setting.user_setting.forEach(ele => {
                if(ele.key == "sound"){
                    MyData.isDisableSound = ele.value == 0 ? true : false
                }
            });
        } catch (error) {
            LogBase.log('=====err_addSetting', error);
        }
    }

    /**
     * Function get plan study
    */
    const getStudyPlan = useCallback(async () => {
        const url = API.baseurl + API.getPlan + `start_time=${currentDate} 00:00:00&end_time=${currentDate} 23:59:59`
        LogBase.log("=====plan2", url)
        try {
            const res = await APIBase.postDataJson('get', url);
            return Promise.resolve(res.data.data)
        } catch (error) {
            console.log('err1', error);
            return Promise.reject(error)
        }
    }, [currentDate, isReloadData])

    /**
     * Function get list of my class
    */
    const getClass = async () => {
        const url = API.baseurl + API.my_classes
        setLoadingClass(true)
        try {
            const response = await APIBase.postDataJson('get', url);
            if(response.data.status){
                setClasses(response.data.data)
            }
        setLoadingClass(false)
        } catch (error) {
            setLoadingClass(false)
            console.log('err', error);
        } finally{
            checkVersion()
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
     * Function calling all the api at the same time
    */
    const getData = useCallback(() => {
        LogBase.log("=====getData")
        setLoading(true)
        loadingInIos(true)
        Promise.all([
            getStudyPlan(),
        ]).then((res) => {
            setStudyData(res[0])
            loadingInIos(false)
            setLoading(false)
        }).catch(err => {
            console.log("----err", err);
            setLoading(false)
            loadingInIos(false)
        })
    }, [currentDate, isReloadData])


    /**
     * Function submit a created plan
    */
    const onCreate = async (props) => {
        setIndicator(true)
        const url = API.baseurl + API.createPlan;
        try {
            const res = await APIBase.postDataJson('post', url, props);
            let data = res.data;
            if (data.status) {
                LogBase.log("=====getData c1")
                getData()
                setIndicator(false)
                setCurrentItem(null);
                setTimeout(() => {
                    Alert.alert(data.msg)
                }, 500)
            }
        } catch (error) {
            setTimeout(() => {
                Alert.alert('Thông báo', error.response.data, [
                    { text: 'Đồng ý', style: "cancel" }
                ]);
            }, 500)
            setIndicator(false)
            console.log(error.response);
            console.log(error.request);
        } finally {
            setIndicator(false)
        }
    }

    /**
     * Function edit an existed plan
    */
    const onEdit = async (props) => {
        setIndicator(true)
        const url = API.baseurl + API.editPlan;
        try {
            const res = await APIBase.postDataJson('put', url, props);
            let data = res.data;
            if (data.status) {
                LogBase.log("=====getData c2")
                getData()
                setIndicator(false)
                setCurrentItem(null);
                setTimeout(() => {
                    Alert.alert(data.msg)
                }, 500)
            }
        } catch (error) {
            setTimeout(() => {
                Alert.alert('Thông báo', error.response.data, [
                    { text: 'Đồng ý', style: "cancel" }
                ]);
            }, 500)
            setIndicator(false)
            console.log(error.response);
            console.log(error.request);
        } finally {
            setIndicator(false)
        }
    }

    /**
     * Function mark a plan as completed
    */
    const completePlan = async (props) => {
        setIndicator(true)
        const url = API.baseurl + API.editPlan;
        try {
            const res = await APIBase.postDataJson('put', url, { ...props, status: "done" });
            let data = res.data;
            setIndicator(false)
            setReload(!isReloadData)
            setTimeout(() => {
                if (data.status) {
                    getData()
                    LogBase.log("=====getData c3")
                    setCurrentItem(null);
                }
            }, 200)
        } catch (error) {
            setTimeout(() => {
                Alert.alert('Thông báo', error.response.data, [
                    { text: 'Đồng ý', style: "cancel" }
                ]);
            }, 500)
            setIndicator(false)
            console.log(error.response);
            console.log(error.request);
        }
    }

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
            setIndicator(false)
            setReload(!isReloadData)
            setTimeout(() => {
                if (data.status) {
                    getData()
                    LogBase.log("=====getData c3")
                    setCurrentItem(null);
                }
            }, 200)
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
     * Function remove a specific plan
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
            setIndicator(false)
            setReload(!isReloadData)
            setTimeout(() => {
                if (data.status) {
                    getData()
                    LogBase.log("=====getData c4")
                }
            }, 200)
        } catch (error) {
            setTimeout(() => {
                Alert.alert('Thông báo', error.response.data, [
                    { text: 'Đồng ý', style: "cancel" }
                ]);
            }, 500)
            setIndicator(false)

            console.log(error.response);
            console.log(error.request);
        }
    }

    /**
     * Function submit event when pressing create button
    */
    const onCheckAction = (props) => {
        if (!!props.id) onEdit(props)
        else onCreate(props)
    }

    const refresh = () => {
        getClass()
        // getData()
        LogBase.log("=====getData c5")
        pickDateRefs.current.onRefresh()
    }

    useEffect(() => {
        LogBase.log("=====getData c6")
        getData()
        // getClass()

    }, [currentDate])

    useEffect(() => {
        if(isReloadData){
            Global.reloadDataHome = () => {
                LogBase.log("=====getData c7")
                getData()
                setReload(!isReloadData)
            }
        }
    }, [isReloadData, getData])

    useEffect(() => {
        addSetting()
        refresh()
        if (!listener.current) {
            listener.current = props.navigation.addListener('didFocus', refresh)
        }
        return () => {
            listener.current.remove();
        }
    }, [])

    return {
        getStudyPlan,
        loading,
        loadingClass,
        studyData,
        scheduleData,
        setCurrentDate,
        getData,
        currentItem,
        setCurrentItem,
        currentDate,
        onCreate,
        deletePlan,
        loadingIndicator,
        showModalDate,
        setModalDate,
        onCheckAction,
        completePlan,changetoNotDonePlan,
        classes,
        setReload, flatlistRef,
        isReloadData,
        chosenDate,
        getClass,
        isVisibleUpdate,
        setVisibleUpdate,
        isMust, pickDateRefs,
        setMust, dataUpdateVer, cancelUpdate
    }

}