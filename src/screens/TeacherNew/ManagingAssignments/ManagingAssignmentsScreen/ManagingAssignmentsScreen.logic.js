import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import API from '../../../../API/APIConstant';
import APIBase from '../../../../base/APIBase';
import { FavoriteCurriculum } from '../../../../redux/actions/FavoriteCurriculum';
import { Colors } from '../../../../styleApp/color';
import moment from 'moment'
import { Global } from '../../../../utils/global';

/**
 * Manange Assignment logic handler
 * @param {Object} props props redux and navigation
 * @returns {Component}
 */
export const ManagingAssignmentsMethod = (props) => {
  const dispatch = useDispatch();
  const dataLogin = useSelector(state => state.AuthStackReducer.dataLogin);
  // Flag check if all data is shown
  const [showall, setShowAll] = useState(false)
  // List of lesson
  const [dataLession, setDataLession] = useState([])
  // Loading flag
  const [loading, setLoading] = useState(false)
  // Flag check if screen is Reach end
  const [isReachedEnd, setReachedEnd] = useState(false)
  // offset for load more function
  const [offset, setOffset] = useState(0)
  // url value to get APi
  const [valueUrl, setValueUrl] = useState('')
  const idClass = props.navigation.getParam('dataClass')?.id
  // Flag to check is all data is loaded
  const [isEnd, setIsEnd] = useState(false)
  //Favourite flag
  const [isFavouriting, setIsFavourite] = useState(false)
  //First Loading
  const [firstLoading, setFirstLoading] = useState(true)

  useEffect(() => {
    loadDataFirst();
    getData('')

  }, [])
  useEffect(() => {
    Global.reloadDataAssignment = () => {
      console.log("----reloading");
      loadDataFirst('')
      getData('')
    }
  }, [loadDataFirst])

  /**
   * Load all data from the first time
   */
  const loadDataFirst = () => {
    APIBase.tokenAPI('get', API.baseurl + API.ManageAssign + '?type=class' + '&class_id=' + idClass)
      .then((res) => {
        console.log('res1', res)
        if (res.data.data.length > 0) {
          setShowAll(true)
        } else {
          setShowAll(false)
        }
        setFirstLoading(false)
      }).catch(() => {
        setFirstLoading(false)
      })
  }

  /**
   * get Data when change value
   * @param {string} value filter values
   */
  const getData = (value) => {
    setValueUrl(value)
    setLoading(true)
    setIsEnd(false)
    setOffset(0)
    setReachedEnd(false)
    APIBase.tokenAPI('get', API.baseurl + API.ManageAssign + '?type=class' + '&class_id=' + idClass + `&offset=${0}&limit=10` + `&${value}`)
      .then((res) => {
        console.log('res', res)
        setDataLession(res.data.data)
        setLoading(false)
      }).catch(() => {
        setLoading(false)
      })
  }

  /**
   * load more Data when change value
   * @param {string} value filter values
   */
  const loadMore = (value) => {
    setValueUrl(value)
    if (isReachedEnd || loading || isEnd) return;
    setReachedEnd(true)
    APIBase.postDataJson('get', API.baseurl + API.ManageAssign + '?type=class' + '&class_id=' + idClass + `&offset=${offset + 10}&limit=10` + `&${value}`).then(r => {
      setReachedEnd(false)
      setOffset(offset + 10)
      if (r.data.data.length === 0) setIsEnd(true)
      // console.log('r.data loadMore', r)
      setDataLession(dataLession.concat(r.data.data))
    }).catch((err) => {
      console.log('err', err)
      setReachedEnd(false)
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

  /**
   * favourite item
   * @param {object} item 
   */
  const Favorite = (item) => {
    var qs = require('qs');
    setIsFavourite(true)
    const body = {
      user_id: dataLogin.id,
      lesson_id: item.exercise_id,
      lesson_type: item.exercise_type
    }
    const bodydel = qs.stringify({
      exercise_id: item.exercise_id
    })
    console.log("-----item", item);
    // let temp = Array.from(props.listFavorite)
    if (item.is_in_wishlist) {
      APIBase.postDataJson('delete', API.baseurl + API.favoriteCurriculum, bodydel).then((r) => {
        let temp = [...dataLession.map((i) => {
          let is_in_wishlist = i.is_in_wishlist
          if (item.id === i.id) is_in_wishlist = !item.is_in_wishlist
          return {
            ...i,
            is_in_wishlist
          }
        })]
        setDataLession(temp)
        setIsFavourite(false)
      }).catch((err) => {
        setIsFavourite(false)
        console.log('err', err)
      })
      // temp = temp.filter(b => b !== item.exercise_id)
    } else if (!item.is_in_wishlist) {
      APIBase.postDataJson('post', API.baseurl + API.favoriteCurriculum, body).then((r) => {
        let temp = [...dataLession.map((i) => {
          let is_in_wishlist = i.is_in_wishlist
          if (item.id === i.id) is_in_wishlist = !item.is_in_wishlist
          return {
            ...i,
            is_in_wishlist
          }
        })]
        setDataLession(temp)
        setIsFavourite(false)
      }).catch((err) => {
        setIsFavourite(false)
        console.log('err1', err)
      })
      // temp.push(item.exercise_id)
    }
    // dispatch(FavoriteCurriculum(temp))
  }

  /**
   * check level of lesson
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
  /**
  * Filter data
  * @param {string} value 
  */
  const onFilter = (param) => {
    console.log("=====onFilter",param)
    let url = ''
    if (param === '') {
      url = ''
    } else {
      let urlskill = ''
      !!param.skill && param.skill.map(item => {
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
    getData(url)
  }

  return {
    Favorite,
    CheckLevel,
    showall,
    dataLession,
    loading,
    onFilter, isFavouriting,
    isReachedEnd, valueUrl, offset, loadMore, debounceEvent,
    firstLoading
  }
}