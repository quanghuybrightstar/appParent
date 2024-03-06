import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import API from '../../../../API/APIConstant';
import APIBase from '../../../../base/APIBase';
import { FavoriteCurriculum } from '../../../../redux/actions/FavoriteCurriculum'
import LogBase from '../../../../base/LogBase';

/**
 * FavouriteLesson Screen logic handler
 * @param {object} props navigation props
 * @returns 
 */
export const detailSkillMethod = (props) => {
    const dispatch = useDispatch();
    const dataLogin = useSelector(state => state.AuthStackReducer.dataLogin);
    // List of lesson
    const [assignCurriculum, setAssignCurriculum] = useState([])
    // Loading flag
    const [loading, setLoading] = useState(false)
    // List of data to display
    let [data, setData] = useState([])
    // offset for loadmore
    const [offset, setOffset] = useState(0)
    // flag to check if screen reach end
    const [isReachedEnd, setReachedEnd] = useState(false)
    // flag to check if all data is loaded
    const [isEnd, setIsEnd] = useState(false)
    useEffect(() => {
        getData();
    }, [])

    /**
     * Function get data of favorite curriculum
     */
    const getData = async () => {
        setLoading(true)
        setIsEnd(false)
        setOffset(0)
        setReachedEnd(false)
        try {
            let response = await APIBase.postDataJson('get', API.baseurl + API.favoriteCurriculum + `?limit=20&offset=0`)
            setData(response.data.data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log("-----error", error);
        }

    }

    /**
     * Function handle load more when reaching the end of list
     */
    const loadMore = () => {
        if (isReachedEnd || loading || isEnd) return;
        setReachedEnd(true)
        APIBase.tokenAPI('get', API.baseurl + API.favoriteCurriculum + `?offset=${offset + 20}&limit=20&`).then(r => {
            setReachedEnd(false)
            setOffset(offset + 20)
            console.log(r)
            if (r.data.data.length === 0) setIsEnd(true)
            setData(data.concat(r.data.data))
        }).catch((err) => {
            console.log('err', err)
            setReachedEnd(false)
        })
    }

    /**
     * Function set timeout between each request
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
     * Function Delete an curriculum in favourite list
     */
    const Delete = (item) => {
        var qs = require('qs');
        setLoading(true)
        var req = {
            user_wish_id: item.lesson_id ? item.lesson_id : item.exam_id
        }
        LogBase.log("=====req:",req)
        const body = qs.stringify(req)
        let temp = Array.from(data)
        APIBase.tokenAPI('delete', API.baseurl + API.favoriteCurriculum, body).then((r) => {
            temp = temp.filter(b => (b.lesson_id != item.lesson_id || b.exam_id != item.exam_id))
            // getData()
            setData(temp)
            setLoading(false)
            // let listFav = props.listFavorite.filter(b => b !== item.lesson_id)
            // dispatch(FavoriteCurriculum(listFav))
        }).catch(() => {
            setLoading(false)
        })


    }

    /**
     * Function Add/Remove item in favorite List
     */
    const Favorite = (item) => {
        var qs = require('qs');
        const body = {
            user_id: dataLogin.id,
            lesson_id: item.id
        }
        const bodydel = qs.stringify({
            user_wish_id: item.id
        })
        let temp = Array.from(props.listFavorite)
        if (temp.includes(item.lesson_id)) {
            APIBase.postDataJson('delete', API.baseurl + API.favoriteCurriculum, bodydel).then((r) => {
            }).catch(() => {
            })
            temp = temp.filter(b => b !== item.lesson_id)
        } else if (!temp.includes(item)) {
            APIBase.postDataJson('post', API.baseurl + API.favoriteCurriculum, body).then((r) => {
            }).catch(() => {

            })
            temp.push(item.lesson_id)
        }
        dispatch(FavoriteCurriculum(temp))

    }

    /**
     * Function Add/Remove item in assigned curriculum list
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
    * Function Navigate to ChooseClassTCScreen screen
    */
    const Assign = () => {
        props.navigation.navigate('ChooseClassTCScreen', { dataLesson: assignCurriculum })
    }
    return {
        Favorite,
        AssignCurriculum,
        assignCurriculum,
        Assign,
        data,
        Delete,
        loading,
        isReachedEnd, debounceEvent,
        loadMore,
    }
}