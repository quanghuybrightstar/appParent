import React, { useEffect, useState } from 'react';
import API from '../../../../API/APIConstant';
import APIBase from '../../../../base/APIBase';
import LogBase from '../../../../base/LogBase';

/**
 * AssignmentedDetailScreen Screen logic handler
 * @param {object} props navigation props
 * @returns 
*/
export const AssignmentedDetailScreenMethod = (props) => {

    //List of chosen student
    const [studentChoose, setStudentChoose] = useState([])
    //list of completed
    const [dataComplete, setDataComplete] = useState([])
    //List of not completed
    const [dataInComplete, setDataInComplete] = useState([])
    //list of infor class
    const [dataInfoClass, setInfoClass] = useState([])
    //Loading flag
    const [loading, setLoading] = useState(false)
    //baseUrl of img
    const [baseUrl, setBaseUrl] = useState('')
    //check if all student is chosen
    const [chooseAll, setChooseAll] = useState(false)
    //list of student
    const [list_student, setListStudent] = useState([])

    useEffect(() => {
        // const listener = props.navigation.addListener('didFocus', () => getData())
        // return () => {
        //     listener.remove();
        // }
        getData()
    }, [])

    /**
     * Function get data of course detail
    */
    const getData = () => {
        setLoading(true)
        APIBase.tokenAPI('get', API.baseurl + API.getCourseDetail(props.navigation.getParam('classId'), props.navigation.getParam('exerciseId')))
            .then((res) => {
                LogBase.log("=====getCourseDetail", res.data.data)
                setDataComplete(res.data.data.completed)
                setDataInComplete(res.data.data.incomplete)
                setInfoClass(res.data.exercise_info)
                setBaseUrl(res.data.base_url)
                setListStudent(res.data.list_student)
                setLoading(false)
            }).catch(() => {
                setLoading(false)
            })
    }
    useEffect(() => {
        const data_remind = dataInComplete.filter(i => i.remind === '0')
        if (studentChoose.length > 0 && data_remind.length === studentChoose.length) {
            setChooseAll(true)
        }
        else {
            setChooseAll(false)
        }
    }, [studentChoose])

    /**
     * Function add/remove assigned curriculum
    */
    const AssignCurriculum = (item) => {
        let temp = Array.from(studentChoose)
        if (temp.includes(item.id)) {
            temp = temp.filter(b => b !== item.id)
        } else if (!temp.includes(item.id)) {
            temp.push(item.id)
        }
        setStudentChoose(temp)
    }

    /**
     * Function select all/remove all assigned curriculum
    */
    const selectAll = () => {
        if (!chooseAll) {
            console.log(1)
            let temp = Array.from(studentChoose)
            dataInComplete.map(item => {
                if (item.remind === '0') {
                    if (temp.includes(item.id)) {
                        temp = temp.filter(i => i !== item.id)
                        temp.push(item.id)
                    } else {
                        temp.push(item.id)
                    }
                }
            })
            setStudentChoose(temp)
        }
        else {
            console.log(2)
            setStudentChoose([])
        }
    }

    /**
     * Function refresh data
    */
    const reloadData = () => {
        setLoading(true)
        APIBase.tokenAPI('get', API.baseurl + API.getCourseDetail(props.navigation.getParam('classId'), props.navigation.getParam('exerciseId')))
            .then((res) => {
                console.log('res', res)
                setDataInComplete(res.data.data.incomplete)
                setDataComplete(res.data.data.completed)
                setLoading(false)
            }).catch(() => {
                setLoading(false)
            })
    }
    return {
        AssignCurriculum, studentChoose,
        loading, dataComplete, dataInComplete, dataInfoClass,
        baseUrl, selectAll, chooseAll, reloadData, setStudentChoose, list_student, getData
    }
}