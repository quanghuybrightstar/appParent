import React, { useEffect, useState } from 'react';
import moment from 'moment'
import API from '../../../../API/APIConstant';
import APIBase from '../../../../base/APIBase';

/**
 * Working Statistic logic handler
 * @param {object} props Props from redux and navigation
 * @returns {Object}
 */
export const WorkScheduleMethod = (props) => {
    const [year, setYear] = useState(moment(new Date).format('YYYY'))
    const [dataSchedule, setDataSchedule] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getData()
    }, [])
    useEffect(() => {
        getData()
    }, [year])

    /**
     * Get all working statistic of the chosen month
     */
    const getData = () => {
        setLoading(true)
        APIBase.postDataJson('get', API.baseurl + API.ListWordScheduleYear + year)
            .then(res => {
                console.log(res.data.data)
                let arr = Object.entries(res.data.data)
                setDataSchedule(arr)
                setLoading(false)
            }).catch(() => {
                setLoading(false)
            })
    }


    /**
     * next year selection method
     */
    const nextYear = () => {
        setYear(Number(year) + 1)
    }

    /**
     * pre-year selection method
     */
    const preYear = () => {
        setYear(Number(year) - 1)
    }

    return {
        year, nextYear, preYear, dataSchedule, loading, getData

    }
}