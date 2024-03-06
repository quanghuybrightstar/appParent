import React, { useEffect, useState } from 'react';
import moment from 'moment'
import API from '../../../../API/APIConstant';
import APIBase from '../../../../base/APIBase';


/**
 * Study report logic handler
 * @returns {object}
 */
export const useMethod = () => {
    const [currDay, setDay] = useState(moment(new Date()).format('DD/MM/YYYY'))
    const [firstDay, setFday] = useState(moment(moment(currDay, 'DD/MM/YYYY').subtract(1, 'days').startOf('week').add(1, 'days').toDate()).format('DD/MM/YYYY'))
    const [lastDay, setLday] = useState(moment(moment(currDay, 'DD/MM/YYYY').subtract(1, 'days').endOf('week').add(1, 'days').toDate()).format('DD/MM/YYYY'))
    const [isDisableNext, setDisableNext] = useState(false)
    // useEffect(() => {
    //     var firstday = moment(currDay, 'DD/MM/YYYY').startOf('week').add(1, 'days').toDate();
    //     var lastday = moment(currDay, 'DD/MM/YYYY').endOf('week').add(1, 'days').toDate();
    //     setFday(moment(firstday).format('DD/MM/YYYY'))
    //     setLday(moment(lastday).format('DD/MM/YYYY'))
    // }, [])

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

    useEffect(() => {
        var lastday = moment(currDay).endOf('week').add(1, 'days').toDate();
        if(!(lastday.getTime() < moment(new Date()).toDate().getTime())){
            setDisableNext(true)
        }else{
            setDisableNext(false)
        }
    }, [currDay])

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
        currDay,
        nextWeek,
        preWeek,
        firstDay,
        lastDay,
        isDisableNext, setDisableNext
    }
}