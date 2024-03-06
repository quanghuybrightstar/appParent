import React, { useEffect, useState } from 'react';
import API from '../../../../API/APIConstant';
import APIBase from '../../../../base/APIBase';

/**
 * ChooseClassTCScreen Screen logic handler
 * @param {object} props navigation props
 * @returns 
 */
export const AssignItemMethod = (props) => {
    const [dataClass, setDataClass] = useState([])
    const [loading, setLoading] = useState(false)
    const [baseurl, setBaseUrl] = useState('')
    const [firstLoading, setFirstLoad] = useState(true)
    useEffect(() => {
        getData()
    }, [])

    /**
     * get list of student in class
     */
    const getData = () => {
        setLoading(true)
        APIBase.postDataJson('get', API.baseurl + API.getStudentMyClass).then(r => {

            setDataClass(r.data.data)
            setBaseUrl(r.data.base_url)
            setLoading(false)
            console.log("=====student in class",r.data)
            if (!!r.data?.data && r.data?.data?.length === 1) {
                props.navigation.replace('SettingAssignmentsScreen', { class: r.data?.data[0], dataLesson: props.navigation.getParam('dataLesson'), flow: props.navigation.getParam('flow') ?? '' })
                return;
            }
            setFirstLoad(false)
        }).catch(() => {
            setLoading(false)
        })
    }
    return {
        dataClass,
        loading,
        baseurl,
        firstLoading
    }
}