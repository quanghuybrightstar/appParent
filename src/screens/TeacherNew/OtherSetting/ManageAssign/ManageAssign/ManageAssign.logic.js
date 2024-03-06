import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import API from '../../../../../API/APIConstant';
import APIBase from '../../../../../base/APIBase';
import { FavoriteCurriculum } from '../../../../../redux/actions/FavoriteCurriculum';
import { Colors } from '../../../../../styleApp/color';
import moment from 'moment'
import { Global } from '../../../../../utils/global';

/**
 * Assigning Lession Management screen
 * @param {Object} props props from redux and navigation
 * @returns {Object}
 */
export const ManageAssignMethod = (props) => {
    // List curriculum assigned
    const [assignCurriculum, setAssignCurriculum] = useState([])
    // List all Assigned data
    const [dataAssign, setDataAssign] = useState([])
    const dataLogin = useSelector(state => state.AuthStackReducer.dataLogin);
    const childSelected = useSelector(
        state => state.ManageChildrenReducer.childSelected,
    );

    // Loading flag
    const [loading, setLoading] = useState(false)
    // offset for load more
    const [offset, setOffset] = useState(0)
    const dispatch = useDispatch();
    // flag check if reach end
    const [isReachedEnd, setReachedEnd] = useState(false)
    // url for loading API
    const [valueUrl, setValueUrl] = useState('')
    // flag to check if loaded all data
    const [isEnd, setIsEnd] = useState(false)
    // flag check if filtered
    const [filter, setOnFilter] = useState(false)
    //Loading flag
    const [isLoading, setFullLoading] = useState(false)
    //loading the first
    const [firstLoading, setFirstLoading] = useState(true)
    let flatlistRef = useRef();

    const checkUrlAssign = dataLogin.role != 'parent' ? API.ManageAssign + + '?type=all' : API.manageAssignParent + '?student_id=' + childSelected?.id;

    useEffect(() => {
        getData('')
    }, [])

    useEffect(() => {
        Global.reloadDataManageAssign = () => {
            getData(valueUrl)
        }
    }, [valueUrl])

    useEffect(() => {
        if(props.navigation.getParam('reload'))
            getData('')
    }, [props.navigation.getParam('reload')])

    /**
     * loading in IOS handler
     */
    const loadingInIos = (show) => {
        if (Platform.OS === 'android') return;
        if (show) {
            flatlistRef.current.scrollToOffset({ offset: -30, animated: false })
        } else {
            flatlistRef.current.scrollToOffset({ offset: 0, animated: false })
        }
    }

    /**
     * Get list Assignment from API
     * @param {string} value search value 
     */
    const getData = (value) => {
        setValueUrl(value)
        if (value === '') {
            setOnFilter(false)
        } else {
            setOnFilter(true)
        }
        setIsEnd(false)
        setOffset(0)
        setReachedEnd(false)
        let url = API.baseurl + checkUrlAssign + `&offset=${0}&limit=10` + `&${value}`
        console.log("=================url", url);
        APIBase.postDataJson('get', url).then(r => {
            console.log("========res", r.data.data)
            setDataAssign(r.data.data)
            setLoading(false)
            loadingInIos(false)
            setFirstLoading(false)
        }).catch((err) => {
            console.log('err', err)
            setLoading(false)
            setFirstLoading(false)
            loadingInIos(false)
        })
    }

    /**
     * reload data list Assignment from API
     * @param {string} value search value 
     */
    const reLoadData = (value) => {
        setValueUrl(value)
        loadingInIos(true)
        if (value === '') {
            setOnFilter(false)
        } else {
            setOnFilter(true)
        }
        setIsEnd(false)
        setOffset(0)
        setReachedEnd(false)
        let url = API.baseurl + checkUrlAssign + `&offset=${0}&limit=10` + `&${value}`
        console.log("=================url", url);
        setLoading(true)
        APIBase.postDataJson('get', url).then(r => {
            console.log("========res", r.data.data)
            setDataAssign(r.data.data)
            setLoading(false)
            loadingInIos(false)
        }).catch((err) => {
            console.log('err', err)
            setLoading(false)
            loadingInIos(false)
        })
    }


    /**
     * load more data from API when reach end
     * @param {string} value search value 
     */
    const loadMore = (value) => {
        setValueUrl(value)
        if (isReachedEnd || loading || isEnd) return;
        setReachedEnd(true)
        APIBase.postDataJson('get', API.baseurl + checkUrlAssign + `&offset=${offset + 10}&limit=10` + `&${value}`).then(r => {
            setReachedEnd(false)
            setOffset(offset + 10)
            // console.log('r.data loadMore', r)
            if (r.data.data.length === 0) setIsEnd(true)
            const arr = dataAssign.concat(r.data.data)
            setDataAssign(arr)
        }).catch((err) => {
            console.log('err', err)
            setReachedEnd(false)
        })
    }

    /**
     * favourite one assignment
     * @param {obejct} item assignment
     */
    const Favorite = (item) => {
        setFullLoading(true)
        var qs = require('qs');
        const body = {
            user_id: dataLogin.id,
            lesson_id: item.exercise_id,
            lesson_type: item.skill
        }
        const bodydel = qs.stringify({
            // user_wish_id: item.exercise_id
            exercise_id: item.exercise_id,
            lesson_type: item.skill
        })
        console.log("---dataAssign", item);
        // let temp = Array.from(props.listFavorite)
        if (item.is_in_wishlist) {
            APIBase.postDataJson('delete', API.baseurl + API.favoriteCurriculum, bodydel).then((r) => {
                let temp = [...dataAssign.map((i) => {
                    let is_in_wishlist = i.is_in_wishlist
                    if (item.id === i.id) is_in_wishlist = !item.is_in_wishlist
                    return {
                        ...i,
                        is_in_wishlist
                    }
                })]
                setDataAssign(temp)
                setFullLoading(false)
            }).catch(() => {
            })
            // temp = temp.filter(b => b !== item.exercise_id)
        } else if (!item.is_in_wishlist) {
            APIBase.postDataJson('post', API.baseurl + API.favoriteCurriculum, body).then((r) => {
                let temp = [...dataAssign.map((i) => {
                    let is_in_wishlist = i.is_in_wishlist
                    if (item.id === i.id) is_in_wishlist = !item.is_in_wishlist
                    return {
                        ...i,
                        is_in_wishlist
                    }
                })]
                setDataAssign(temp)
                setFullLoading(false)
            }).catch(() => {
            })
            // temp.push(item.exercise_id)
        }
        // dispatch(FavoriteCurriculum(temp))

    }

    /**
     * debounce Event
     * @param {function} callback function trigger when timeout
     * @param {number} time timeout
     * @returns function
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

    /**
     * assign lession method
     * @param {obejct} item assignment
     */
    const AssignCurriculum = (item) => {
        let temp = Array.from(assignCurriculum)
        if (temp.includes(item)) {
            temp = temp.filter(b => b !== item)
        } else if (!temp.includes(item)) {
            temp.push(item)
        }
        setAssignCurriculum(temp)
    }

    /**
     * Check level of lession
     * @param {string} value level of lession
     * @returns {Color}
     */
    const CheckLevel = (value) => {
        if (value === 'easy') {
            return Colors._6EBF49
        } else if (value === 'normal') {
            return Colors.Orange
        } else if (value === 'hard') {
            return Colors._BE1E2D
        }
    }
    /**
     * Filter lession
     * @param {string} value search value
     */
    const onFilter = (param) => {
        let url = ''
        if (!param || param === '') {
            url = ''
        }
        else {
            let urlskill = ''
            !!param && !!param.skill && param.skill.map(item => {
                let skill = item.replace(/"/g, '')
                urlskill = urlskill + 'skill[]=' + skill + '&'
            })
            if (!!param.start_time) {
                urlskill = urlskill + `from_date=${moment(param.start_time).format('YYYY-MM-DD')}&`
            }
            if (!!param.end_time) {
                urlskill = urlskill + `to_date=${moment(param.end_time).format('YYYY-MM-DD')}&`
            }
            url = `${urlskill}`
        }
        setLoading(true)
        getData(url)
    }
    return {
        Favorite, flatlistRef,
        AssignCurriculum,
        assignCurriculum, isLoading,
        CheckLevel, dataAssign, loading, onFilter, setOffset,
        isReachedEnd, getData, valueUrl, offset, loadMore, debounceEvent, filter,
        firstLoading, reLoadData
    }
}