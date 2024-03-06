import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import API from '../../../../API/APIConstant';
import APIBase from '../../../../base/APIBase';
import { ActionManagingTutorial } from '../../../../redux/actions/ActionAssign';
import { ActionAssignManagent } from '../../../../redux/actions/ActionAssignManagent';
import MyData from '../../../../component/MyData';
import LogBase from '../../../../base/LogBase';

/**
 * Tutorial list logic handler
 * @param {Object} props props from redux and navigation
 * @returns {Object}
 */
export const ListTutorialMethod = (props) => {
  const dispatch = useDispatch()
  const listAssignManagent = useSelector(state => state.AssignManagentReducer.listAssignManagent)
  // List of tutorial
  const [dataTutorial, setDataTutorial] = useState([])
  // offset for load more function
  const [offset, setOffset] = useState(0)
  // Check if screen is reach end
  const [isReachedEnd, setReachedEnd] = useState(false)
  // Loading flag
  const [loading, setLoading] = useState(true)
  // list of grade
  const [routerGradle, setRouterGrade] = useState([])
  // check if Filter is on
  const [onfilter, setOnFilter] = useState(false)
  // Url for calling API
  const [valueUrl, setValueUrl] = useState('')
  // Selected tutorial
  const [dataSelect, setDataSelect] = useState([])
  // Check if all Data is loaded
  const [isEnd, setIsEnd] = useState(false)
  // Check if first loading
  const [theFirst, setTheFirst] = useState(false)

  const reload = props.navigation.getParam('renT')

  useEffect(() => {

    let id = props.navigation.getParam('id');
    let filterList = listAssignManagent.filter(i => i.lesson_id === id)
    if (filterList.length > 0) {
      let filterList = listAssignManagent.filter(i => i.lesson_id === id)
      setDataSelect(filterList[0].file)
    }
    dataTheFirst()
    getData('')
    getDataGradle()
  }, [reload])

  useEffect(() => {
    // checkData()
  }, [dataTutorial])

  /**
   * Check if selected data will need to be changing
   */
  const checkData = () => {
    let temp = [...dataSelect]
    dataSelect.forEach((i) => {
      let index = dataTutorial.findIndex((item) => i.id === item.id)
      if (index === -1) temp = temp.filter((item) => i.id !== item.id)
    })
    setDataSelect(temp)
  }

  /**
   * Get list of tutorial first time
   * @param {string} url 
   */
  const dataTheFirst = () => {
    setLoading(true)
    APIBase.tokenAPI('get', API.baseurl + API.getStudyGuide + `?offset=0&limit=10`).then((res) => {
      if (res.data.resources.length > 0) {
        setTheFirst(false)
      } else {
        setTheFirst(true)
      }
    }).catch(() => {
    })
  }

  /**
   * Get list of tutorial
   * @param {string} url 
   */
  const getData = (url) => {
    setLoading(true)
    setOffset(1)
    setValueUrl(url)
    setIsEnd(false)
    setOffset(0)
    setReachedEnd(false)
    if (url === '') {
      setOnFilter(false)
    } else {
      setOnFilter(true)
    }
    APIBase.tokenAPI('get', API.baseurl + API.getStudyGuide + `?offset=0&limit=10` + url).then((res) => {
      setDataTutorial(res.data.resources)
      setLoading(false)
    }).catch(() => {
      setLoading(false)
    })
  }

  /**
   * load more list of tutorial
   * @param {string} url 
   */
  const loadMore = (value) => {
    setValueUrl(value)
    if (isReachedEnd || loading || isEnd) return;
    // setReachedEnd(true)
    APIBase.tokenAPI('get', API.baseurl + API.getStudyGuide + `?offset=${offset + 10}&limit=10&` + value).then(r => {
      setReachedEnd(false)
      setOffset(offset + 10)
      if (r.data.resources.length === 0) setIsEnd(true)
      setDataTutorial(dataTutorial.concat(r.data.resources))
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
   * select tutorial
   * @param {Object} item tutorial
   */
  const onSelect = (item) => {
    let temp = [...dataSelect]
    let index = temp.findIndex((i) => i.id === item.id)
    if (index !== -1) {
      temp = temp.filter(i => i.id !== item.id)
    } else if (index === -1) {
      temp.push(item)
    }
    setDataSelect(temp)
  }

  /**
   * Check image function
   * @param {string} item type of image
   * @returns String
   */
  const CheckImage = (item) => {
    if (item.type === 'audio') {
      return 'file_audio'
    }
    else if (item.type === 'img') {
      return 'file_image'
    }
    else if (item.type === 'writing') {
      return 'file_text'
    }
    else if (item.type === 'video') {
      return 'file_video'
    }
    else if (item.type === 'document') {
      const check = item.path.slice(item.path.length - 6, item.path.length);
      if (check.includes('doc') || check.includes('docx')){
        return 'teacher_huongdanbaigiang_icon_word';
      } else if (check.includes('xlsx')){
        return 'teacher_huongdanbaigiang_icon_exel';
      } else if (check.includes('ppt')){
        return 'teacher_huongdanbaigiang_icon_powerpoint';
      } else if (check.includes('pdf')){
        return 'teacher_huongdanbaigiang_icon_pdf';
      } else{
        return 'teacher_huongdanbaigiang_icon_word';
      }
      // return 'file_ppt'
    }

  }

  /**
   * get grade function
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
      setLoading(false)
    }).catch(() => {
      setLoading(false)
    })
  }
  /**
 * load data with url
 * @param {string} url 
 */
  const onLoad = (param) => {
    let url = ''
    if (param === '') {
      url = ''
    } else {
      url = `&skill=[${param.skill}]&grade_id=[${param.classes}]&type=[${param.type}]`
    }
    getData(url)

  }

  /**
   * add toturial to lesson
   */
  const AddToturial = () => {

    if(MyData.mAssignType == 'auto'){
      LogBase.log("=====AddToturial "+MyData.mAssignListFile)
      MyData.mAssignListFile = dataSelect
      LogBase.log("=====dataSelect ",dataSelect)
      var ren = props.navigation.getParam('renderagain');
      if(ren){
        ren()
      }
      props.navigation.goBack()
    }

    let id = props.navigation.getParam('id');
    let filterList = listAssignManagent.filter(i => i.lesson_id === id)
    let filterOtherList = listAssignManagent.filter(i => i.lesson_id !== id)
    if (filterList.length > 0) {
      let oldData = filterList[0]
      oldData.file = dataSelect
      if(MyData.mAssignType != 'auto')
        dispatch(ActionAssignManagent(filterOtherList.concat([oldData]).sort((a, b) => Number(a.lesson_id) > Number(b.lesson_id))))
    }
    props.navigation.goBack()
  }

  return {
    loading, isReachedEnd, debounceEvent, dataTutorial,
    loadMore, CheckImage, routerGradle, onLoad,
    onfilter, valueUrl, dataSelect, onSelect, AddToturial,
    theFirst
  }
}