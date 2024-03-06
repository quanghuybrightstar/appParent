import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import API from '../../../../API/APIConstant';
import APIBase from '../../../../base/APIBase';
import { FavoriteCurriculum } from '../../../../redux/actions/FavoriteCurriculum'
import { Colors } from '../../../../styleApp/color';
import MyData from '../../../../component/MyData';
import LogBase from '../../../../base/LogBase';

/**
 * LessonListTCScreen Screen logic handler
 * @param {object} props navigation props
 * @returns 
*/
export const detailSkillMethod = (props) => {
    const dispatch = useDispatch();
    const dataLogin = useSelector(state => state.AuthStackReducer.dataLogin);
    const [assignCurriculum, setAssignCurriculum] = useState([])
    //param from navigation
    const [dataParam] = useState(props.navigation.getParam('data'))
    //List lesson of unit
    const [listLesson, setListLesson] = useState([])
    //Loading flag
    let [loading, setLoading] = useState(false)
    useEffect(() => {
        let arr = []
        dataParam.lesson_in_skill.map(i => {
            let lesson = {
                ...i,
                curriculum_name: props.navigation.getParam('curriculumName')
            }
            arr.push(lesson)
        })
        setListLesson(arr)
    }, [])

    // check lesson is favorite ?
    const checkFavorite = (id) => {
        var result = MyData.mDataFavoriteList.find(mono => mono == id);
        return result ? true : false
    }

    /**
     * Function add/remove curriculum in favorite list
    */
    console.log('curriculumName', props.navigation.getParam('curriculumName'))
    const Favorite = (item) => {
        setLoading(true)
        var qs = require('qs');
        const body = {
            user_id: dataLogin.id,
            lesson_id: item.lesson_id,
            lesson_type: item.lesson_type,
            curriculum_id: item.curriculum_id
        }
        const bodydel = qs.stringify({
            exercise_id: item.lesson_id,
            lesson_type: item.lesson_type
        })
        // let temp = Array.from(props.listFavorite)
        console.log(item)
        if (checkFavorite(item.lesson_id)) {
            APIBase.postDataJson('delete', API.baseurl + API.favoriteCurriculum, bodydel).then((r) => {
                LogBase.log("=====favoriteCurriculum",r.data)
                // setListLesson(listLesson.map((i, index) => {
                //     if (i.lesson_id === item.lesson_id) return {
                //         ...i,
                //         is_in_wishlist: !item.is_in_wishlist
                //     }
                //     else return i
                // }))
                if(r.data.status){
                    console.log('=====xoa',item.lesson_id)
                    var deleteOb = MyData.mDataFavoriteList.find(mono => mono == item.lesson_id)
                    console.log('=====bu1',deleteOb)
                    MyData.mDataFavoriteList.splice(MyData.mDataFavoriteList.indexOf(deleteOb),1)
                    console.log("===favoList",MyData.mDataFavoriteList)
                }
                setLoading(false)
            }).catch((err) => {
                setLoading(false)
                console.log('=====err', err)
            })
            // temp = temp.filter(b => b !== item.lesson_id)
        } else {
            LogBase.log("=====favoriteCurriculum",body)
            APIBase.postDataJson('post', API.baseurl + API.favoriteCurriculum, body).then((r) => {
                // setListLesson(listLesson.map((i, index) => {
                //     if (i.lesson_id === item.lesson_id) return {
                //         ...i,
                //         is_in_wishlist: !item.is_in_wishlist
                //     }
                //     else return i
                // }))
                if(r.data.status){
                    MyData.mDataFavoriteList.push(item.lesson_id)
                }
                setLoading(false)
            }).catch((err) => {
                setLoading(false)
                console.log('err1', err)
            })
            // temp.push(item.lesson_id)
        }
        // dispatch(FavoriteCurriculum(temp))
        LogBase.log("favoList",MyData.mDataFavoriteList)
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

    /**
     * Function that return color depends on level
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
    return {
        Favorite,
        AssignCurriculum,
        assignCurriculum,
        Assign, loading, checkFavorite,
        CheckLevel, dataParam, listLesson
    }
}