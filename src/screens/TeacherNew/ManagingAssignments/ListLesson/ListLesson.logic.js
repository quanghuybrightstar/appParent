import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import API from '../../../../API/APIConstant';
import APIBase from '../../../../base/APIBase';
import { FavoriteCurriculum } from '../../../../redux/actions/FavoriteCurriculum'
import { ActionAssignManagent } from '../../../../redux/actions/ActionAssignManagent'
import { Colors } from '../../../../styleApp/color';
import MyData from '../../../../component/MyData';
import LogBase from '../../../../base/LogBase';

/**
 * List Lesson logic handler
 * @param {Object} props prop from redux and navigation
 * @returns {Object}
 */
export const ListLessonMethod = (props) => {
  const dispatch = useDispatch();
  const listAssign = useSelector(state => state.AssignReducer.listAssign)
  const dataLogin = useSelector(state => state.AuthStackReducer.dataLogin);
  //data from navigation
  const [dataParam] = useState(props.navigation.getParam('data'))
  //list lesson
  const [listLesson, setListLesson] = useState([])
  //Loading flag
  let [loading, setLoading] = useState(false)
  useEffect(() => {
    let arr = []
    dataParam.lesson_in_skill.map(i => {
      let lesson = {
        ...i,
        curriculum_name: props.navigation.getParam('curriculumName'),
        curriculum_id: props.navigation.getParam('curriculumID')
      }
      // if(lesson.lesson_type != "skill_guide"){
         arr.push(lesson)
      // }
    })
    setListLesson(arr)
  }, [])

  /**
   * Favourite lesson
   * @param {Object} item Lesson
   */
  const Favorite = (item) => { 
    setLoading(true)
    var qs = require('qs');
    const body = {
      user_id: dataLogin.id,
      lesson_id: item.lesson_id,
      lesson_type: item.lesson_type
    }
    const bodydel = qs.stringify({
      exercise_id: item.lesson_id,
      lesson_type: item.lesson_type
    })
    if (!!props.listFavorite) {
      // let temp = Array.from(props.listFavorite)
      LogBase.log("=====lesson_type m",item)
      if (item.is_in_wishlist) {
        APIBase.postDataJson('delete', API.baseurl + API.favoriteCurriculum, bodydel).then((r) => {
          setLoading(false)
          if(r.data.status){
            var deleteOb = MyData.mDataFavoriteList.find(mono => mono == item.lesson_id)
            MyData.mDataFavoriteList.splice(MyData.mDataFavoriteList.indexOf(deleteOb),1)
          }
          setListLesson(listLesson.map((i, index) => {
            if (i.lesson_id === item.lesson_id) return {
              ...i,
              is_in_wishlist: !item.is_in_wishlist
            }
            else return i
          }))
        }).catch((err) => {
          setLoading(false)
          console.log('err', err)
        })
        // temp = temp.filter(b => b !== item.lesson_id)
      } else if (!item.is_in_wishlist) {
        APIBase.postDataJson('post', API.baseurl + API.favoriteCurriculum, body).then((r) => {
          setLoading(false)
          if(r.data.status){
            MyData.mDataFavoriteList.push(item.lesson_id)
          }
          setListLesson(listLesson.map((i, index) => {
            if (i.lesson_id === item.lesson_id) return {
              ...i,
              is_in_wishlist: !item.is_in_wishlist
            }
            else return i
          }))
        }).catch((err) => {
          setLoading(false)
          console.log('err1', err)
        })
        // temp.push(item.lesson_id)
      }
      // dispatch(FavoriteCurriculum(temp))
    }
  }

  /**
   * Assign lesson to student
   * @param {Object} item Lesson
   */
  const AssignCurriculum = (item) => {
    let temp = Array.from(props.listAssignManagent)
    if (temp.length > 0 && temp.findIndex(i => i.lesson_id === item.lesson_id) !== -1) {
      temp = temp.filter(b => b.lesson_id !== item.lesson_id)
    } else {
      temp.push({
        ...item,
        file: [],
        "start_time": listAssign.start_time,
        "end_time": listAssign.end_time
      })
    }
    dispatch(ActionAssignManagent(temp))
  }

  const showIsFavorite = (id) => {
    var isHas = false;
    MyData.mDataFavoriteList.forEach(ele => {
      if(ele == id){
        isHas = true
      }
    });
    return isHas
  }

  /**
   * Check level of lesson
   * @param {string} value level
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
  return {
    Favorite, loading,
    AssignCurriculum,
    CheckLevel, dataParam, listLesson, showIsFavorite
  }
}