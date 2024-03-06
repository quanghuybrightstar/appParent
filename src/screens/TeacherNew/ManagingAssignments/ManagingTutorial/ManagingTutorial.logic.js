import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { ActionAssign } from '../../../../redux/actions/ActionAssign';
import { ActionAssignManagent } from '../../../../redux/actions/ActionAssignManagent';
import LogBase from '../../../../base/LogBase';
import MyData from '../../../../component/MyData';


/**
 * Tutorial Management logic handler
 * @param {Object} props props from redux and navigation
 * @returns {Object}
 */
export const ManagingTutorialMethod = (props) => {
    const [dataParam, setDataParam] = useState(props.navigation.getParam('item'));
    const onSaveData = props.navigation.getParam('onSave');
    const listAssign = useSelector(state => state.AssignReducer.listAssign);
    const managingTutorial = useSelector(state => state.AssignReducer.managingTutorial);
    const listAssignManagent = useSelector(state => state.AssignManagentReducer.listAssignManagent);
    const [dataCurrent, setDataCurrent] = useState(props.navigation.getParam('item'));
    const dispatch = useDispatch();

    //chosen start date
    let [startDate, setStartDate] = useState(null);
    //chosen end date
    let [endDate, setEndDate] = useState(null);
    //list of chosen tutorial
    let [tutorial, setToturial] = useState([]);
    //Error for date
    let [errorDate, setErrorDate] = useState('');

    /**
   * get list for first time
   */
    useEffect(() => {
        let item = props.navigation.getParam('item');
        setDataParam(item);
        LogBase.log("=====item navigator",item)
        LogBase.log("=====listAssignManagent",listAssignManagent)
        // let lessionIndex = listAssignManagent.findIndex(i => i.lesson_id === item.lesson_id);
        // setDataCurrent({...listAssignManagent[lessionIndex]});
        // setStartDate(moment(listAssignManagent[lessionIndex].start_time, 'YYYY-MM-DD HH:mm:ss').toDate());
        // setEndDate(moment(listAssignManagent[lessionIndex].end_time, 'YYYY-MM-DD HH:mm:ss').toDate());
        // setToturial(lessionIndex > -1 ? listAssignManagent[lessionIndex] : null);

        setDataCurrent(item);
        setStartDate(moment(item.start_time, 'YYYY-MM-DD HH:mm:ss').toDate());
        setEndDate(moment(item.end_time, 'YYYY-MM-DD HH:mm:ss').toDate());
        setToturial(item);
    }, []);

    //validate the chosen date
    useEffect(() => {
        const checkStartDate = moment(moment(startDate).format('YYYY-MM-DD')).format('X');
        const checkEndDate = moment(moment(endDate).format('YYYY-MM-DD')).format('X');
        if (checkEndDate < checkStartDate) {
            setErrorDate('Ngày kết thúc không được nhỏ hơn ngày bắt đầu');
        } else {
            setErrorDate('');
        }

    }, [endDate, startDate]);

    /**
   * get list when endDate and startDate change
   */
    useEffect(() => {
        let item = props.navigation.getParam('item');
        let lession = listAssignManagent.filter(i => i.lesson_id === item.lesson_id)[0];
        let newList = listAssignManagent.filter(i => i.lesson_id !== item.lesson_id).concat([{
            ...lession,
            start_time: moment(startDate).format('YYYY-MM-DD HH:mm:ss'),
            end_time: moment(endDate).format('YYYY-MM-DD HH:mm:ss'),
        }]).sort((a, b) => Number(a.lesson_id) > Number(b.lesson_id));
        if(MyData.mAssignType == 'auto'){
            MyData.mAssignDateData = {
                start_time: moment(startDate).format('YYYY-MM-DD HH:mm:ss'),
                end_time: moment(endDate).format('YYYY-MM-DD HH:mm:ss'),
            }
        }else{
            dispatch(ActionAssignManagent(newList));
        }
    }, [endDate, startDate]);

    /**
   * CHeck tutorial when Assignment change
   */
    useEffect(() => {
        let item = props.navigation.getParam('item');

        if(MyData.mAssignType == 'auto'){
            //setToturial(item)
            return
        }

        let lessionIndex = listAssignManagent.findIndex(i => i.lesson_id === item.lesson_id);
        setToturial(lessionIndex > -1 ? listAssignManagent[lessionIndex] : null);
    }, [listAssignManagent]);

    const renderagain = () => {
        LogBase.log("=====renderagain",MyData.mAssignListFile)
        let newTutorial = {
            ...tutorial,
            file: MyData.mAssignListFile,
        };
        setToturial(newTutorial)
    }

    /**
   * remove tutorial
   * @param {Object} item tutorial
   */
    const removeTutorial = (item) => {
        let tempFile = tutorial.file.filter(i => i.id !== item.id);
        let newTutorial = {
            ...tutorial,
            file: tempFile,
        };
        setToturial(newTutorial);
        let newList = listAssignManagent.filter(i => i.lesson_id !== newTutorial.lesson_id).concat([newTutorial]);
        if(MyData.mAssignType != 'auto'){
            dispatch(ActionAssignManagent(newList.sort((a, b) => Number(a.lesson_id) > Number(b.lesson_id))));
        }else{
            MyData.mAssignListFile = tempFile
            LogBase.log("=====removeTutorial "+MyData.mAssignListFile)
        }
    };

    const onClear = () => {
        let item = props.navigation.getParam('item');
        let newList = listAssignManagent.filter(i => i.lesson_id !== item.lesson_id).concat([{
            ...dataCurrent,
        }]).sort((a, b) => Number(a.lesson_id) > Number(b.lesson_id));
        if(MyData.mAssignType != 'auto'){
            dispatch(ActionAssignManagent(newList));
        }
    };
    return {
        dataParam, errorDate,
        startDate, setStartDate,
        endDate, setEndDate, tutorial,
        removeTutorial,
        onClear, renderagain
    };
};
