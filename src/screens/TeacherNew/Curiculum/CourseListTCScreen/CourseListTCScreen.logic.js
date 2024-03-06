import React, { useEffect, useState } from 'react';
import API from '../../../../API/APIConstant';
import APIBase from '../../../../base/APIBase';
import { useRef } from 'react';
import LogBase from '../../../../base/LogBase';

/**
 * CourseListTCScreen Screen logic handler
 * @param {object} props navigation props
 * @returns 
 */
export const CourseListTCScreenMethod = (props) => {
    //Grade list
    const [routerGradle, setRouterGrade] = useState([])
    //list of sunday english lesson
    const [curriculumSunday, setCurriculumSunday] = useState([])
    //list of normal curriculum
    const [myCurriculum, setMyCurriculum] = useState([])
    //loading flag
    const [loading, setLoading] = useState(false)
    //tabview count
    const [tabview, setTabview] = React.useState()
    //visible of filter
    const [visible, setVisible] = React.useState(false)
    //listener did Focus
    const listener = useRef()

    useEffect(() => {
        // setLoading(true)
        // getDataGradle()
        // getCurriculumSunday()
        // getMyCurriculum()
        refresh()
        if (!listener.current) {
            listener.current = props.navigation.addListener('didFocus', refresh)
        }
        return () => {
            listener.current.remove();
        }
    }, [])

    /**
     * refresh data
     */
    const refresh = () => {
        setLoading(true)
        getDataGradle()
        getCurriculumSunday()
        getMyCurriculum()
    }

    /**
     * Get data of grade
     */
    const getDataGradle = () => {
        APIBase.postDataJson('get', API.baseurl + API.listGradle).then(r => {
            let routes = []
            r.data.list_grade.map((item, index) => {
                let data = {
                    key: index,
                    title: item.name,
                    count: item.id
                }
                routes.push(data)
            })
            setTabview(routes[0].count)
            setRouterGrade(routes)
            setLoading(false)
        }).catch(() => {
            setLoading(false)
        })
    }

    /**
     * Get Data of Sunday Curriculum
     */
    const getCurriculumSunday = () => {
        APIBase.postDataJson('get', API.baseurl + API.CurriculumSunday('sunday')).then(r => {
            setCurriculumSunday(r.data.courses)
            setLoading(false)
        }).catch(() => {
            setLoading(false)
        })
    }

    /**
    * Get Data of My Curriculum
    */
    const getMyCurriculum = () => {
        APIBase.postDataJson('get', API.baseurl + API.CurriculumSunday('personal')).then(r => {
            setMyCurriculum(r.data.courses)
            setLoading(false)
        }).catch(() => {
            setLoading(false)
        })
    }
    const onFilter = (param) => {
        if (param === '') {
            setVisible(false)
        } else {
            const url = `topic=${param.keyword}&skill=[${param.skill}]&grade_id=[${param.classes}]&level=[${param.level}]`
            props.navigation.navigate('CourseFilterResultScreen', { url: url, param: param })
        }
    }
    return {
        routerGradle,
        curriculumSunday,
        loading,
        myCurriculum, tabview, setTabview,
        onFilter, visible, setVisible
    }
}