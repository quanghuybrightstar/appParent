import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import API from '../../../../API/APIConstant';
import APIBase from '../../../../base/APIBase';
import { FavoriteCurriculum } from '../../../../redux/actions/FavoriteCurriculum'
import { ActionAssignManagent } from '../../../../redux/actions/ActionAssignManagent'

/**
 * Favourite Assignment logic hander
 * @param {Object} props props from redux and navigation
 * @returns {Object}
 */
export const FavoriteAssignmentsMethod = (props) => {
  const dispatch = useDispatch();
  const listAssign = useSelector(state => state.AssignReducer.listAssign)
  //Assigning Curriculum list
  const [assignCurriculum, setAssignCurriculum] = useState([])
  //Loading flag
  const [loading, setLoading] = useState(false)
  //Favourited Assignment
  let [data, setData] = useState([])
  //Offset for loadmore data
  const [offset, setOffset] = useState(0)
  //Check if flatlist is Reched End
  const [isReachedEnd, setReachedEnd] = useState(false)
  //Check if loaded all data
  const [isEnd, setIsEnd] = useState(false)
  useEffect(() => {
    getData();
  }, [])

  /**
   * Get list of Favourited Assignment
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
   * load more list of Favourited Assignment
   */
  const loadMore = () => {
    if (isReachedEnd || loading || isEnd) return;
    setReachedEnd(true)
    APIBase.tokenAPI('get', API.baseurl + API.favoriteCurriculum + `?offset=${offset + 10}&limit=10&`).then(r => {
      setReachedEnd(false)
      setOffset(offset + 10)
      if (r.data.data.length === 0) setIsEnd(true)
      setData(data.concat(r.data.data))
    }).catch((err) => {
      console.log('err', err)
      setReachedEnd(false)
    })
  }

  /**
   * Debounce funtion
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
   * un-favourite Assignment
   * @param {Object} item Assignment
   */
  const Delete = (item) => {
    setLoading(true)
    var qs = require('qs');
    const body = qs.stringify({
      user_wish_id: item.id
    })
    let temp = Array.from(data)
    APIBase.tokenAPI('delete', API.baseurl + API.favoriteCurriculum, body).then((r) => {
      temp = temp.filter(b => b.exercise_id !== item.exercise_id)
      // getData()
      setData(temp)
      setLoading(false)
    }).catch(() => {
      setLoading(false)
    })
    // temp = temp.filter(b => b !== item.lesson_id)
    // dispatch(FavoriteCurriculum(temp))

  }

  /**
   * Assign Lesson
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

  /**
   * Navigate to ChooseClassTCScreen
   */
  const Assign = () => {
    props.navigation.navigate('ChooseClassTCScreen', { dataLesson: assignCurriculum })
  }
  return {
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