import React, { useEffect, useState } from 'react';
import API from '../../../../API/APIConstant';
import APIBase from '../../../../base/APIBase';
import LogBase from '../../../../base/LogBase';
import MyData from '../../../../component/MyData';

/**
 * DetailCurriculum Screen logic handler
 * @param {object} props navigation props
 * @returns 
 */
export const DetailCurriculumMethod = (props) => {
  const [dataMapList, setDataMapList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // Curriculum Name 
  const [curriculumName, setCurriculumName] = useState('')
  const [curriculumID, setCurriculumID] = useState('')
  useEffect(() => {
    getData()
  }, [])

  /**
   * Function get data of course
  */
  const getData = () => {
    APIBase.postDataJson('get', API.baseurl + API.detailCurrilum(props.navigation.getParam('id'))).then(r => {
      setDataMapList(r.data.data_lesson.unit_name);
      setCurriculumName(r.data.course.name)
      setCurriculumID(r.data.course.id)
      LogBase.log("=====setDataMapList",r.data)
      setIsLoading(false);
      LogBase.log("=====r.data.data_lesson.unit_name",r.data.data_lesson.unit_name)
      MyData.mDataFavoriteList = getFavoriteList(r.data.data_lesson.unit_name)
      LogBase.log("=====mDataFavoriteList",MyData.mDataFavoriteList)
    }).catch(e => {
      console.log('err', e)
      setIsLoading(false);
    })
  }

  const getFavoriteList = (dataList) => {
    var listResult = []
    dataList.forEach(unitList => {
      unitList.list_skill.forEach(skillList => {
        skillList.lesson_in_skill.forEach(mono => {
          if(mono.is_in_wishlist){
            listResult.push(mono.lesson_id)
          }
        });
      });
    });
    return listResult
  }

  return {
    isLoading,
    dataMapList,
    curriculumName,
    curriculumID
  }
}