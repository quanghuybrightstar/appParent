import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import API from '../../../../API/APIConstant';
import APIBase from '../../../../base/APIBase';
import { ActionAssign } from '../../../../redux/actions/ActionAssign';
import { ActionAssignManagent } from '../../../../redux/actions/ActionAssignManagent';
import { Colors } from '../../../../styleApp/color';
import { Global } from '../../../../utils/global';

/**
 * CompleteAssign Screen logic handler
 * @param {object} props navigation props
 * @returns
 */
export const CompleteAssignMethod = (props) => {
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const listAssign = useSelector(state => state.AssignReducer.listAssign);
    const listAssignManagent = useSelector(state => state.AssignManagentReducer.listAssignManagent);
    const [data, setData] = useState([]);
    const role = props.navigation.getParam('role');
    const flow = props.navigation.getParam('flow');

    useEffect(() => {
        let temp = listAssignManagent.sort((a, b) => Number(b.lesson_id) - Number(a.lesson_id));
        setData(temp);
    }, [listAssignManagent]);

    /**
   * Function return color depends on level
  */
    const CheckLevel = (value) => {
        if (value === 'easy') {
            return Colors._6EBF49;
        } else if (value === 'normal') {
            return Colors.Orange;
        } else if (value === 'hard') {
            return Colors._BE1E2D;
        }
    };

    /**
   * Function remove Item in list assignment
  */
    const removeItem = (item) => {
        let temp = Array.from(props.listAssignManagent);
        temp = temp.filter(b => b.lesson_id !== item.lesson_id);
        dispatch(ActionAssignManagent(temp));
        setVisible(false);
    };

    /**
   * Function navigate to edit screen
  */
    const onEdit = (item) => {
        console.log(item);
        let data = {
            ...item,
            end_time: props.listAssign.end_time,
            start_time: props.listAssign.start_time,
        };
        props.navigation.navigate('ManagingTutorial', { item: data, onSave: (itemNew) => {
            const indexItem = (data || []).findIndex(l => l.lesson_id === item.lesson_id);
            const newData = [...data];
            newData[indexItem] = itemNew;
            setData(
                newData
            );
        } });
    };

    /**
   * Function check file is existed
  */
    const checkFile = (item) => {
        if (!!listAssignManagent && listAssignManagent.length > 0) {
            let dataFilter = listAssignManagent.filter(i => i.lesson_id === item.lesson_id);
            if (!!dataFilter && dataFilter.length > 0 && dataFilter[0].file.length > 0) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    };

    /**
   * Function assign homework
  */
    const onAssign = () => {
        console.log('----listAssignManagent', listAssignManagent);
        console.log('----listAssign', listAssign);
        let form = new URLSearchParams();
        form.append('before_start_time', String(listAssign.before_start_time));
        form.append('class_id', listAssign.class_id);
        form.append('end_time', listAssign.end_time);
        form.append('note', listAssign.note);
        form.append('remind_before', listAssign.remind_before);
        form.append('students', JSON.stringify(listAssign.students));
        form.append('data_exercise', JSON.stringify(listAssignManagent.map(i => {
            let body = {
                exercise_id: i.lesson_id,
                list_guide_id: i.file.map((f) => f.id),
                exercise_type: i.lesson_type,
                start_time: i.start_time,
                end_time: i.end_time,
                curriculum_id: i.curriculum_id
            };
            return body;
        })));
        console.log('----form11', form);
        setLoading(true);
        APIBase.tokenAPI('POST', API.baseurl + API.giveHomework, form)
            .then((r) => {
                console.log('=====Nopbai', r);
                console.log('------role', role, flow);
                setLoading(false);
                // if (role === 'assign') {
                //   Global.reloadDataAssignment()
                // }
                props.navigation.navigate(role === 'assign' ? 'ManagingAssignmentsScreen' : flow === 'ManageAssign' ? 'ManageAssign' : 'CourseListTCScreen', {reload : Math.random()});
                dispatch(ActionAssignManagent([]));
                dispatch(ActionAssign([]));
                setTimeout(() => {
                    Global.reloadDataAssignment();
                }, 100);
            }).catch((err) => {
                console.log(err);
                setLoading(false);
            });

    // "exercise_id": "1",
    // "list_guide_id": ["1","2"],
    // "exercise_type": "grammar",
    // "start_time": "2020-09-09 00:00:00",
    // "end_time": "2020-09-10 00:00:00"
    };
    return {
        CheckLevel,
        removeItem, visible, setVisible, onEdit, checkFile,
        onAssign, data, loading,
    };
};
