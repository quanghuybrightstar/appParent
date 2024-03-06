import React, { useState } from 'react';
import API from '../../../../API/APIConstant';
import APIBase from '../../../../base/APIBase';
import LissLesson from '../../../MapNewScreen/listLesson';
import MyData from '../../../../component/MyData';
import LogBase from '../../../../base/LogBase';

/**
 * DetailCurriculumTeacher Screen logic handler - Chi tiết giáo trình
 * @param {object} props navigation props
 * @returns 
 */
export const DetailCurriculumMetod = (props) => {
    // List of Curriculum
    const [listCurriculum, setListCurriculum] = useState([])
    // List of Lesson
    const [dataLesson, setDataLesson] = useState([]);
    // List of mapped Data
    const [dataMapList, setDataMapList] = useState([]);
    // Loading flag
    const [isLoading, setIsLoading] = useState(true);
    // Default name of curriculum
    const [defaultValue, setDefaultValue] = useState('')
    // Curriculum Name 
    const [curriculumName, setCurriculumName] = useState('')
    React.useEffect(() => {
        getData(props.navigation.getParam('id'))
        getListDrop()
        const data = props.navigation.getParam('dataCurriculum').find(i => i.id === props.navigation.getParam('id'))
        setDefaultValue(data.name)

    }, [])

    /**
     * Function get data curriculum for drop list
     */
    const getListDrop = () => {
        let arr = []
        const data = props.navigation.getParam('dataCurriculum').filter(i => i.grade_id !== null)
        data.map(item => {
            let data = {
                type: item.id,
                name: item.name
            }

            arr.push(data)
        })
        setListCurriculum(arr)
    }

    /**
     * Function get detail curriculum base on id
     */
    const getData = (id) => {
        setIsLoading(true);
        APIBase.postDataJson('get', API.baseurl + API.detailCurrilum(id)).then(r => {
            setCurriculumName(r.data.course.name)
            let convertList = _convertList(r.data.data_lesson.unit_name);
            setDataMapList(r.data.data_lesson.unit_name);
            LogBase.log("=====getData",r.data)
            MyData.mDataFavoriteList = getFavoriteList(r.data.data_lesson.data)
            setDataLesson(convertList);
            setIsLoading(false);
        }).catch(e => {
            setIsLoading(false);
        }).finally(() => {
        })
    }

    const getFavoriteList = (dataList) => {
        var listResult = []
        dataList.forEach(mono => {
            if(mono.is_in_wishlist){
                listResult.push(mono.lesson_id)
            }
        });
        return listResult
    } 

    /**
     * Function return converted data depends on length of input
     */
    const _convertList = (data) => {
        try {
            let array = [];
            if (data) {
                if (data.length < 3) {
                    array.push(data);
                } else {
                    let i = 0;
                    let ar = [];
                    for (let a = 0; a < data.length; a++) {
                        if (i < 3) {
                            ar.push(data[a]);
                            i++;
                            if (a === data.length - 1) {
                                array.push(ar);
                            }
                        } else {
                            array.push(ar);
                            ar = [];
                            i = 0;
                            ar.push(data[a]);
                            i++;
                            if (a === data.length - 1) {
                                array.push(ar);
                            }
                        }
                    }
                }
            }
            // console.log('array', array);
            return array;
        } catch (error) {
            console.log(error);
        }
    };

    /**
     * Function render Item of List Lesson
     */
    const _renderItem = ({ item, index }) => {
        return (
            <LissLesson item={item} index={index} dataLesson={dataLesson} navigation={_navigation} />
        );
    };

    /**
     * Function navigate to DetailUnit screen
     */
    const _navigation = (item) => {
        // console.log('=====+item', item)
        props.navigation.navigate('DetailUnit', {
            data: item, curriculumName: curriculumName
        });
    };

    /**
     * Function get new data when selecting an item in drop list
     */
    const selectDrop = (id) => {
        getData(id)
    }
    return {
        _renderItem,
        isLoading, listCurriculum,
        dataMapList, dataLesson, selectDrop, defaultValue, setDefaultValue, curriculumName
    }
}