import React, { useEffect, useState } from 'react';
import moment from 'moment'
import API from '../../../../API/APIConstant';
import APIBase from '../../../../base/APIBase';
import MyData from '../../../../component/MyData'
import LogBase from '../../../../base/LogBase';


/**
 * Detail Report logic handler
 * @param {object} props prosp from redux and navigation
 * @returns {Object}
 */
export const useMethod = (props) => {
    const [currDay, setDay] = useState(moment(props.navigation.getParam('curDay'), 'DD/MM/YYYY').toDate())
    const [firstDay, setFday] = useState()
    const [lastDay, setLday] = useState()
    let user = props.navigation.getParam('item')
    let [report, setReport] = useState(null)
    const [baseUrl, setBaseUrl] = useState('')
    const [loading, setLoading] = useState(true)
    let [firstLoading, setFirstLoad] = useState(true)
    useEffect(() => {

        var firstday = moment(currDay, 'DD/MM/YYYY').startOf('week').add(1, 'days').toDate();
        var lastday = moment(currDay, 'DD/MM/YYYY').endOf('week').add(1, 'days').toDate();
        setFday(moment(firstday).format('DD/MM/YYYY'))
        setLday(moment(lastday).format('DD/MM/YYYY'))
        LogBase.log("=====getParam('curDay')",props.navigation.getParam('curDay'))
        LogBase.log("=====curDay",currDay)
        LogBase.log("=====firstday",firstday)
        let init = async () => {
            await getData(moment(lastday).format('DD/MM/YYYY'))
            setFirstLoad(false)
        }
        init()
    }, [])


    React.useEffect(() => {
        if (firstLoading) return;
        getData(lastDay)
    }, [lastDay])

    /**
     * Get list data by the last day.
     * @param {Date} lastDay date
     */
    const getData = async (lastDay) => {
        setLoading(true)
        let url = API.baseurl + API.StudentReport + "?student_id=" + user.id + "&class_id=" + MyData.classID +  "&date_time=" + moment(lastDay, "DD/MM/YYYY").format("YYYY-MM-DD HH:mm:ss")
        try {
            LogBase.log("url----api", url);
            let res = await APIBase.tokenAPI('get', url)
            LogBase.log("getData----res", res.data);
            setLoading(false)
            if (!!res && !!res.data) {
                setReport(res.data)
                setBaseUrl(res.data.base_url)
            }
        } catch (error) {
            setLoading(false)
            console.log("----error", error);
        }
    }

    /**
     * handle next week function
     */
    const nextWeek = () => {
        let nextWeekDay = moment(currDay, 'DD/MM/YYYY').add(7, 'days').toDate();
        var firstday = moment(nextWeekDay).startOf('week').add(1, 'days').toDate();
        var lastday = moment(nextWeekDay).endOf('week').add(1, 'days').toDate();
        setDay(nextWeekDay)
        setFday(moment(firstday).format('DD/MM/YYYY'))
        setLday(moment(lastday).format('DD/MM/YYYY'))
    }

    /**
     * handle pre-week function
     */
    const preWeek = () => {
        let nextWeekDay = moment(currDay, 'DD/MM/YYYY').subtract(7, 'days').toDate();
        var firstday = moment(nextWeekDay).startOf('week').add(1, 'days').toDate();
        var lastday = moment(nextWeekDay).endOf('week').add(1, 'days').toDate();
        setDay(nextWeekDay)
        setFday(moment(firstday).format('DD/MM/YYYY'))
        setLday(moment(lastday).format('DD/MM/YYYY'))
    }

    return {
        nextWeek,
        preWeek,
        firstDay,
        lastDay,
        getData,
        user,
        report, baseUrl,
        loading, firstLoading
    }
}