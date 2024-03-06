import axios from "axios";
import { useEffect, useRef, useState } from "react";
import API from "../../../API/APIConstant";
import MyData from "../../../component/MyData";
import moment from "moment";
import { Alert } from "react-native";
import APIBase from "../../../base/APIBase";
import { Global } from "../../../utils/global";
import LogBase from "../../../base/LogBase";

/**
 * @summary Create working plan logic handler.
 *
 * @param {object} props
 * @property {object} navigation: The navigation object
 *
 * @returns {Object}
 */
export const createPlanMethod = (props) => {
    let oldData = props.navigation.getParam('data')
    const goBack = props.navigation.getParam('goBack')
    let curDate = props.navigation.getParam('curDate')
    LogBase.log('=====oldData_', oldData)
    //loading flag
    let [loading, setLoading] = useState(false)
    //title of plan
    let [title, setTitle] = useState(!!oldData ? oldData.title : '')
    //description of plan
    let [description, setDescription] = useState(!!oldData ? oldData.content : '')
    //create date
    let [date, setDate] = useState(!!oldData ? moment(oldData.start_time).format('HH:mm, DD/MM/YYYY') : curDate ? moment(curDate).format('HH:mm, DD/MM/YYYY') : moment().format('HH:mm, DD/MM/YYYY'))
    // valid to date
    let [validDate, setValidDate] = useState((!!oldData && oldData.valid_to) ? moment(oldData.valid_to).format('DD/MM/YYYY') : moment().add(7, 'days').format('DD/MM/YYYY'))
    //check if visible to choose date
    let [visible, setVisible] = useState(false)
    //check if visible to choose valid Date
    let [visibleValidDate, setVisibleValidDate] = useState(false)
    //minute before notify
    const [minutes, setMinutes] = useState(!!oldData ? oldData.remind_time === '0' ? '10' : oldData.remind_time : "10")
    //check if notify is chosen
    const [isNotify, setIsNotify] = useState(!!oldData ? oldData?.remind === '1' ? true : false : true)
    //Type of repeat
    const [repeatType, setRepeatType] = useState(!!oldData && !!oldData.repeat_type ? oldData.repeat_type : null);
    //job box reference
    const jobBoxRef = useRef();
    //Check if show modal loop of plan
    const [modalLoop, setModalLoop] = useState(false)
    //check if update all plan
    const [chooseAll, setChooseAll] = useState(false)
    useEffect(() => {
        if (!!oldData) {
            jobBoxRef.current?.setValue(oldData.type)
        }
    }, [])

    console.log(validDate)

    /**
     * create new Plan
     */
    const onCreate = async () => {
        setLoading(true)
        const url = API.baseurl + API.createPlan;
        let params = {
            start_time: moment(date, "HH:mm, DD/MM/YYYY").format("HH:mm"),
            type: jobBoxRef.current?.getValue().type,
            title,
            content: description,
            remind: isNotify ? 1 : 0,
            remind_time: isNotify ? minutes : 0,
            repeat_type: repeatType,
            status: 'no_status',
            valid_from: moment(date, "HH:mm, DD/MM/YYYY").format("YYYY-MM-DD"),
            valid_to: moment(validDate, "DD/MM/YYYY").format("YYYY-MM-DD"),
        }
        console.log("-----params", params);
        try {
            const res = await APIBase.postDataJson('post', url, params);
            let data = res.data;
            if (data.status) {
                setLoading(false)
                props.navigation.pop();
                Global.reloadDataHome()
                // Global.reloadWorkingByDay();
                goBack && goBack(date);
            } else {
                setTimeout(() => {
                    Alert.alert('', data.msg, [
                        { text: 'Đồng ý', style: "cancel" }
                    ]);
                }, 200)
            }
        } catch (error) {
            setTimeout(() => {
                Alert.alert('', error.response.data, [
                    { text: 'Đồng ý', style: "cancel" }
                ]);
            }, 200)
            setLoading(false)
            console.log(error.response);
            console.log(error.request);
        } finally {
            setLoading(false)
        }
    }

    /**
     * edit current Plan
     */
    const onEdit = async () => {
        setLoading(true)
        const url = API.baseurl + API.editPlan;
        let params = {
            id: oldData.id,
            start_time: moment(date, "HH:mm, DD/MM/YYYY").format("YYYY-MM-DD HH:mm:ss"),
            type: jobBoxRef.current?.getValue().type,
            title,
            content: description,
            remind_time: isNotify ? minutes : 0,
            remind: isNotify ? 1 : 0,
            repeat_type: repeatType,
            update_all: chooseAll ? 1 : 0,
            // valid_from: moment(date, "HH:mm, DD/MM/YYYY").format("YYYY-MM-DD"),
            valid_to: moment(validDate, "DD/MM/YYYY").format("YYYY-MM-DD"),
        }
        try {
            LogBase.log("=====onEdit req", params);
            const res = await APIBase.postDataJson('put', url, params);
            LogBase.log("=====onEdit res", res.data);
            let data = res.data;
            if (data.status) {
                setModalLoop(false)
                setLoading(false)
                props.navigation.pop();
                Global.reloadDataHome()
                // Global.reloadWorkingByDay();
                goBack && goBack(date);
            }
        } catch (error) {
            setTimeout(() => {
                Alert.alert('Thông báo', error.response.data, [
                    { text: 'Đồng ý', style: "cancel" }
                ]);
            }, 200)
            setLoading(false)
            console.log(error.response);
            console.log(error.request);
        } finally {
            setLoading(false)
        }
    }
    const checknumberDate = (value) => {
        if (!value) {
            setMinutes('')
            return;
        }
        const regex = /^\d+$/;
        if (!regex.test(value)) return;
        if (Number(value) < 61) {
            setMinutes(value)
        }
    }

    return {
        title, setTitle,
        description, setDescription,
        date, setDate,
        validDate, setValidDate,
        visible, setVisible,
        visibleValidDate, setVisibleValidDate,
        minutes, setMinutes,
        isNotify, setIsNotify,
        repeatType, setRepeatType,
        jobBoxRef, onEdit,
        onCreate, loading,
        modalLoop, setModalLoop,
        chooseAll, setChooseAll, checknumberDate
    }

}
