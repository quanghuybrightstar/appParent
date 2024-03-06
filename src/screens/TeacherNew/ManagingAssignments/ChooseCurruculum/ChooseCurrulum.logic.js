import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import API from '../../../../API/APIConstant';
import APIBase from '../../../../base/APIBase';
import { ActionAssignManagent } from '../../../../redux/actions/ActionAssignManagent';

/**
 * ChooseCurruculum Screen logic handler
 * @param {object} props navigation props
 * @returns 
 */
export const ChooseCurriculumMethod = (props) => {
  const [routerGradle, setRouterGrade] = useState([])
  const [curriculumSunday, setCurriculumSunday] = useState([])
  const [myCurriculum, setMyCurriculum] = useState([])
  const [loading, setLoading] = useState(false)
  const [tabview, setTabview] = React.useState()
  const [modalBack, setModalBack] = useState(false)
  const [visible, setVisible] = React.useState(false)

  const dataLogin = useSelector(state => state.AuthStackReducer.dataLogin);

  const dispatch = useDispatch()
  useEffect(() => {
    setLoading(true)
    getDataGradle()
    getCurriculumSunday()
    dataLogin.role != 'parent' && getMyCurriculum()
  }, [])

  /**
   * Function get list of grade
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
    }).catch(() => {
    })
  }

  /**
   * Function get list of sundy curriculum
  */
  const getCurriculumSunday = () => {
    APIBase.postDataJson('get', API.baseurl + API.CurriculumSunday('sunday')).then(r => {
      setCurriculumSunday(r.data.courses)
    }).catch(() => {
    })
  }

  /**
   * Function get list of my curriculum
  */
  const getMyCurriculum = () => {
    APIBase.postDataJson('get', API.baseurl + API.CurriculumSunday('personal')).then(r => {
      setMyCurriculum(r.data.courses)
      setLoading(false)
    }).catch(() => {
      setLoading(false)
    })
  }

  /**
   * Function handle on icon back tap 
  */
  const goBack = () => {
    setModalBack(false)
    dispatch(ActionAssignManagent([]))
    props.navigation.pop()
  }
  const onFilter = (param) => {
    if (param === '') {
      setVisible(false)
    } else {
      const url = `topic=${param.keyword}&skill=[${param.skill}]&grade_id=[${param.classes}]&level=[${param.level}]`
      props.navigation.navigate('ResultFilter', { url: url, param: param })
    }
  }
  return {
    routerGradle,
    curriculumSunday,
    loading,
    myCurriculum,
    modalBack, setModalBack, goBack,
    tabview, setTabview, onFilter, visible, setVisible
  }
}