import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import API from '../../../../API/APIConstant';
import APIBase from '../../../../base/APIBase';
import MyData from '../../../../component/MyData';
import { FavoriteCurriculum } from '../../../../redux/actions/FavoriteCurriculum'
import LogBase from '../../../../base/LogBase';

/**
 * CourseFilterResultScreen Screen logic handler
 * @param {object} props navigation props
 * @returns 
 */
export const resultFilterMethod = (props) => {
    const dispatch = useDispatch();
    //Loading flag
    const [loading, setLoading] = useState(false)
    //Data has been filtered 
    const [dataFilter, setDataFilter] = useState([])
    // list of grade
    const [routerGradle, setRouterGrade] = useState([])
    //visible flag
    const [visible, setVisible] = useState(false)
    const [offset, setOffset] = useState(0)
    const [limit, setLimit] = useState(20)
    // Check if screen is reach end
    const [isReachedEnd, setReachedEnd] = useState(false)
    // Check if all Data is loaded
    const [isEnd, setIsEnd] = useState(false)
    const [curUrl, setCurUrl] = useState(null)
    const dataLogin = useSelector(state => state.AuthStackReducer.dataLogin);
    useEffect(() => {
        LogBase.log("=====Start")
        setCurUrl(props.navigation.getParam('url'))
        getFilter(props.navigation.getParam('url'))
        getDataGradle()
    }, [])

    const [assignCurriculum, setAssignCurriculum] = useState([])

    /**
     * get list of grade
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
   * Debounce function
   */
  function debounceEvent(callback, time) {
    let interval;
    return () => {
      clearTimeout(interval);
      interval = setTimeout(() => {
        interval = null;

        // eslint-disable-next-line
        callback(arguments);
      }, time);
    };
  }

    const loadMore = () => {
        if (isReachedEnd || loading || isEnd) return;
        setReachedEnd(true)
        APIBase.postDataJson('get', API.baseurl + API.filterCurriculum + curUrl + `&limit=${limit}&offset=${offset + limit}`).then(r => {
            setReachedEnd(false)
            const temp = Array.from(r.data.list_data_result)
            var addArray = []
                addArray = [...dataFilter]
                temp.forEach(ele => {
                    var indexM = dataFilter.findIndex(mono=>mono.curriculum_id == ele.curriculum_id)
                    LogBase.log("dataFilter", indexM)
                    if(indexM >= 0){
                        addArray[indexM].list_lesson = addArray[indexM].list_lesson.concat(ele.list_lesson)
                    }else{
                        addArray.push(ele)
                    }
                });
            if (r.data.list_data_result.length == 0) setIsEnd(true)
            setOffset(offset+limit)
            setDataFilter(addArray)
            // setLoading(false)
        }).catch(() => {
            setReachedEnd(false)
            // setLoading(false)
        })
    }

    /**
     * get list of curriculum for filtering
     */
    const getFilter = (url, isPage) => {
        setLoading(true)
        APIBase.postDataJson('get', API.baseurl + API.filterCurriculum + url + `&limit=${limit}&offset=${isPage?offset:0}`).then(r => {
            // console.log(r)
            const temp = Array.from(r.data.list_data_result)
            // console.log(temp)
            var addArray = temp
            setDataFilter(addArray)
            setLoading(false)
            setIsEnd(false)
            setOffset(0)
        }).catch(() => {
            setLoading(false)
        })
    }

    /**
     * Add or remove a curriculum in favorite list
     */
    const Favorite = (item) => {
        setVisible(true)
        LogBase.log("=====Favorite",item)
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
        LogBase.log("=====req bodyAdd",bodyAdd)
        LogBase.log("=====req bodydel",bodydel)
        if (item.is_in_wishlist) {
            APIBase.postDataJson('delete', API.baseurl + API.removeWishList, bodydel).then((r) => {
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
                setVisible(false)
            }).catch(() => {
                setVisible(false)
            })
        } else if (!item.is_in_wishlist) {
            APIBase.postDataJson('post', API.baseurl + API.addWishList, bodyAdd).then((r) => {
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
                setVisible(false)
            }).catch((err) => {
                setVisible(false)
            })
        }

    }

    /**
     * Add or remove curriculum in assigned list
     */
    const AssignCurriculum = (item) => {
        console.log("---item", item);
        let temp = Array.from(assignCurriculum)
        console.log("---temp", temp);
        let index = temp.findIndex((i) => i.lesson_id === item.lesson_id)
        if (index > -1) {
            temp = temp.filter(b => b.lesson_id !== item.lesson_id)
        } else if (index === -1) {
            temp.push(item)
        }
        setAssignCurriculum(temp)
    }

    /**
     * Navigate to ChooseClassTCScreen
     */
    const onAssign = () => {
        props.navigation.navigate('ChooseClassTCScreen', { dataLesson: assignCurriculum })
    }

    const onFilter = (param) => {
        if (param === '') {
            // props.navigation.goBack()
        }
        else {
            LogBase.log("=====onFilter")
            const url = `topic=${param.keyword}&skill=[${param.skill}]&grade_id=[${param.classes}]&level=[${param.level}]`
            setCurUrl(url)
            getFilter(url)
        }
    }
    return {
        Favorite,
        AssignCurriculum, isLoading: visible,
        assignCurriculum, loading, dataFilter,
        onAssign, isReachedEnd, debounceEvent,
        routerGradle, loadMore, onFilter
    }
}