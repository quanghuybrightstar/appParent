import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import API from '../../../../API/APIConstant';
import APIBase from '../../../../base/APIBase';
import MyData from '../../../../component/MyData';
import { ActionAssignManagent } from '../../../../redux/actions/ActionAssignManagent';
import { FavoriteCurriculum } from '../../../../redux/actions/FavoriteCurriculum'

/**
 * Result Filter logic handler
 * @param {Object} props Props from redux and navigation
 * @returns {Object}
 */
export const ResultFilterMethod = (props) => {
    const dispatch = useDispatch();
    const dataLogin = useSelector(state => state.AuthStackReducer.dataLogin);
    const listAssignProps = useSelector(state => state.AssignReducer.listAssign)
    //loading flag
    const [loading, setLoading] = useState(false)
    //list of filtered data
    const [dataFilter, setDataFilter] = useState([])
    //grade data
    const [routerGradle, setRouterGrade] = useState([])
    //list of assigned data
    const [listAssign, setListAssign] = useState([])

    //visible flag
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        getFilter(props.navigation.getParam('url'))
        getDataGradle()
    }, [])

    const [assignCurriculum, setAssignCurriculum] = useState([])

    /**
     * Get Grade list function
     */
    const getDataGradle = () => {
        APIBase.postDataJson('get', API.baseurl + API.listGradle).then(r => {
            let routes = []
            r.data.list_grade.map((item, index) => {
                let data = {
                    title: item.name,
                    count: item.id
                }
                routes.push(data)
            })
            setRouterGrade(routes)
        }).catch(() => {
        })
    }

    /**
     * Get filter by url
     * @param {string} url 
     */
    const getFilter = (url) => {
        setLoading(true)
        console.log('url', API.baseurl + API.filterCurriculum + url)
        APIBase.postDataJson('get', API.baseurl + API.filterCurriculum + url).then(r => {
            const arr = Array.from(r.data.list_data_result)
            console.log(arr)
            setDataFilter(arr)
            setLoading(false)
        }).catch(() => {
            setLoading(false)
        })
    }

    /**
     * favourite an lession
     * @param {object} item lession
     */
    const Favorite = (item) => {
        setIsLoading(true)
        const bodyAdd = {
            user_id: dataLogin.id,
            lesson_id: item.lesson_id,
            lesson_type: item.lesson_type,
            curriculum_id: item.curriculum_id
        }
        var qs = require('qs');
        const bodydel = qs.stringify({
            exercise_id: item.lesson_id,
            lesson_type: item.lesson_type
        })
        if (item.is_in_wishlist) {
            APIBase.postDataJson('delete', API.baseurl + API.favoriteCurriculum, bodydel).then((r) => {
                let outerTemp = [...dataFilter.map((i, index) => {
                    if (i.curriculum_id === item.curriculum_id) {
                        let innerTemp = [...i.list_lesson.map((inner, index) => {
                            if (inner.lesson_id === item.lesson_id) {
                                return {
                                    ...inner,
                                    is_in_wishlist: false
                                }
                            }
                            else return inner
                        })]
                        return {
                            ...i,
                            list_lesson: innerTemp
                        }
                    } else return i
                })]
                setDataFilter(outerTemp)
                setIsLoading(false)
            }).catch(() => {
                setIsLoading(false)
            })
        } else if (!item.is_in_wishlist) {
            APIBase.postDataJson('post', API.baseurl + API.favoriteCurriculum, bodyAdd).then((r) => {
                let outerTemp = [...dataFilter.map((i, index) => {
                    if (i.curriculum_id === item.curriculum_id) {
                        let innerTemp = [...i.list_lesson.map((inner, index) => {
                            if (inner.lesson_id === item.lesson_id) {
                                return {
                                    ...inner,
                                    is_in_wishlist: true
                                }
                            }
                            else return inner
                        })]
                        return {
                            ...i,
                            list_lesson: innerTemp
                        }
                    } else return i
                })]
                setDataFilter(outerTemp)
                setIsLoading(false)
            }).catch((err) => {
                setIsLoading(false)
            })
        }

    }

    /**
     * Load data with filter
     * @param {string} url 
     */
    const onLoad = (url) => {
        getFilter(url)
    }


    /**
     * Assign Lession function
     * @param {object} item lession
     */
    const AssignCurriculum = (item) => {
        let ass = Array.from(listAssign)
        let index = ass.findIndex((i) => i.lesson_id === item.lesson_id)
        if (index > -1) {
            ass = ass.filter(b => b.lesson_id !== item.lesson_id)
        } else if (index === -1) {
            ass.push(item)
        }
        setListAssign(ass)
        let temp = Array.from(props.listAssignManagent)
        if (temp.length > 0 && temp.findIndex(i => i.lesson_id === item.lesson_id) !== -1) {
            temp = temp.filter(b => b.lesson_id !== item.lesson_id)
        } else {
            temp.push({
                ...item,
                file: [],
                "start_time": listAssignProps.start_time,
                "end_time": listAssignProps.end_time,
                "lesson_topic": item.topic
            })
        }
        dispatch(ActionAssignManagent(temp))
    }

    /**
     * Navigation to Complete Assign Screen
     */
    const onAssign = () => {
        props.navigation.navigate('CompleteAssign', { role: 'assign' })
    }
    /**
    * Filter data
    * @param {string} value 
    */
    const onFilter = (param) => {
        if (param === '') {
            // props.navigation.goBack()
        }
        else {
            const url = `topic=${param.keyword}&skill=[${param.skill}]&grade_id=[${param.classes}]&level=[${param.level}]`
            getFilter(url)
        }
    }
    return {
        Favorite,
        AssignCurriculum, isLoading,
        assignCurriculum, loading, dataFilter,
        onAssign, routerGradle, onLoad, listAssign, onFilter
    }
}