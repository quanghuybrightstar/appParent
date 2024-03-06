import React, { useEffect, useState } from 'react';
import API from '../../../../../API/APIConstant';
import APIBase from '../../../../../base/APIBase';
import LogBase from '../../../../../base/LogBase';
import { useSelector } from 'react-redux';

/**
 * Detail Assigning Lession management logic handler
 * @param {Object} props props from redux and navigation
 * @returns {Object}
 */
export const DetailManageAssignMethod = (props) => {
    const lessonDt = props.navigation.getParam('allData')
    const [dataDetail, setDataDetail] = useState([])
    const [displayedData, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [dataLesson, setDataLesson] = useState([])

    const dataLogin = useSelector(state => state.AuthStackReducer.dataLogin);
    
    useEffect(() => {
        getData()

    }, [])

    /**
     * Get list of data
     */
    const getData = () => {
        setLoading(true)
        var bonusL = lessonDt.skill == "exam" ? "&lesson_type=" + lessonDt.skill : ""
        APIBase.postDataJson('get', API.baseurl + API.DetailManageAssign + lessonDt.exercise_id + bonusL).then(resp => {
            LogBase.log("=====DMA",resp)
            setDataDetail(resp.data.data)
            let temp = resp.data.data.list_class_detail.sort(function (a, b) {
                var dateA = new Date(a.date_assign), dateB = new Date(b.date_assign);
                return dateB - dateA;
            })
            var filterByID = []
            temp.forEach(ele => {
                if(!filterByID.find(c => c.class_id == ele.class_id)){
                    filterByID.push({class_id: ele.class_id})
                }
            });
            // filterByID = [...new Set(temp.map((i) => ({ class_id: i.class_id })))]
            let outputArr = filterByID.map((item) => {
                const listLesson = temp.filter((i) => i.class_id === item.class_id)
                return {
                    class_id: item.class_id,
                    class_name: listLesson[0].class_name,
                    lesson: listLesson
                }
            })
            setData(outputArr)
            let lesson = [{
                lesson_id: lessonDt.exercise_id,
                lesson_type: lessonDt.skill,
                lesson_name: lessonDt.exercise_name,
                lesson_topic: lessonDt.exercise_topic,
                level: lessonDt.level,
                curriculum_name: lessonDt.curriculum_name
            }]
            setDataLesson(lesson)
            LogBase.log("=====setDataLesson",lessonDt)
            setLoading(false)
        }).catch(() => {
            setLoading(false)
        })
    }

    /**
     * navigate to Choosing class screen
     */
    const onAssign = () => { 
        dataLogin.role != 'parent' ?
        props.navigation.navigate('ChooseClassTCScreen', { dataLesson: dataLesson, flow: 'ManageAssign' })
        : props.navigation.navigate('SettingAssignmentsParentScreen',  {class:{ id: '2052',
        class_name: 'Lớp học tổng hợp',
        organization_id: '22',
        start_time: '1970-01-01 00:00:00',
        end_time: '1970-01-01 00:00:00',
        curriculum_id: '508',
        status: 'private',
        created_at: '2023-07-18 06:34:01',
        created_by: '1804',
        updated_at: '2023-07-18 09:56:51',
        deleted: '0',
        class_config: '{"score":0,"config_theory":"free","config_test":"free"}',
        type: 'online',
        updated_by: '1804',
        grade_id: '2',
        class_code: 'COL2052',
        class_avatar: 'assets/img_base/class_dfa.jpg',
        room_id: '3637',
        organization_name: 'THCS Tân Hội',
        type_class: 'sunday_default',
        number_student: '13',
        new_cu_id: null,
        curriculum_name: 'GT tổng hợp',
        teacher_id: '1848',
        teacher_name: 'Nguyễn Thúy Anh',
        teacher_email: 'nguyenthuyanh@gmail.com',
        avatar: 'assets/img_base/teacher_female_dfa.jpg',
        gender: 'female',
        count_student: '13',
        current_process: 100,
        curriculum_type: 'normal',
        is_learning: 0,
        report_data: 
         { overview_score: { A: 1, B: 0, C: 2, D: 8 },
           total_score: 233.47223000000002,
           total_student: '13',
           avg: 4.8 },
        number_system_new: 2,
        number_msg_new: 0,
        state: 'end' }, dataLesson: dataLesson, flow: 'ManageAssign' })
    }
    return {
        dataDetail, loading, onAssign, displayedData
    }
}