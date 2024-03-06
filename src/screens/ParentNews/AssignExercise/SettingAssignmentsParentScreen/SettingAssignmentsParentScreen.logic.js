import React, {useEffect, useState} from 'react';
import moment from 'moment';
import APIBase from '../../../../base/APIBase';
import API from '../../../../API/APIConstant';
import {useDispatch, useSelector} from 'react-redux';
import {EditAssignJson} from '../../../../stringJSON';
import Axios from 'axios';
import {Colors} from '../../../../styleApp/color';
import {ActionAssignManagent} from '../../../../redux/actions/ActionAssignManagent';
import {ActionAssign} from '../../../../redux/actions/ActionAssign';
import {Global} from '../../../../utils/global';

/**
 * SettingAssignmentsScreen Screen logic handler
 * @param {object} props navigation props
 * @returns
 */
export const EditAssignMethod = props => {
  const language = useSelector(state => state.LanguageStackReducer.language);
  //Start date of lesson
  let [startDate, setStartDate] = useState(moment().toDate());
  //end date of lesson
  let [endDate, setEndDate] = useState(moment().add(2, 'days').toDate());
  //check if remind is checked
  let [remind, setRemind] = useState(false);
  //check if start before reach time
  let [startAfter, setStartAfter] = useState(false);
  //Loading flag
  let [loading, setLoading] = useState(false);
  //Error text
  let [err, setErr] = useState('');
  //Note of assignment
  let [note, setNote] = useState('');
  //number of date
  let [numberDate, setnumberDate] = useState('');
  //Error for date
  let [errorDate, setErrorDate] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (remind) {
      setnumberDate('1');
    } else {
      setnumberDate('');
      setNote('');
    }
  }, [remind]);

  /**
   * Function add/remove student in chossing student list
   */

  useEffect(() => {
    const checkStartDate = moment(
      moment(startDate).format('YYYY-MM-DD'),
    ).format('X');
    const checkEndDate = moment(moment(endDate).format('YYYY-MM-DD')).format(
      'X',
    );
    if (checkEndDate < checkStartDate) {
      setErrorDate('Ngày kết thúc không được nhỏ hơn ngày bắt đầu');
    } else {
      setErrorDate('');
    }

    if (remind) {
      if (
        numberDate &&
        Number(numberDate) * 3600 * 24 > checkEndDate - checkStartDate
      ) {
        setErr(EditAssignJson.errMutil);
      } else {
        setErr('');
      }
    }
  }, [endDate, startDate, numberDate, remind]);
  /**
   * Function Submit selected Student list and navigate to CompleteAssign screen
   */
  const onSave = () => {
    console.log('=====onSave', props.navigation.getParam('dataLesson'));
    dispatch(ActionAssign([]));
    if (
      !!numberDate &&
      numberDate * 3600 * 24 >
        moment(endDate).format('X') - moment(startDate).format('X')
    ) {
      setErr(EditAssignJson.errMutil);
    } else {
      setErr('');
      // setLoading(true)
      let data_exercise = [];
      props.navigation.getParam('dataLesson').map(item => {
        let arr = {
          ...item,
          file: [],
          start_time: moment(startDate).format('YYYY-MM-DD 00:00:00'),
          end_time: moment(endDate).format('YYYY-MM-DD 23:59:59'),
        };
        console.log('=====onSave mono', arr);
        data_exercise.push(arr);
      });
      // if (props.navigation.getParam('flow') === 'ManageAssign') {
      //     let form = new URLSearchParams();
      //     form.append('before_start_time', String(startAfter ? 1 : 0,));
      //     form.append('class_id', props.navigation.getParam('class').id,);
      //     form.append('note', note);
      //     form.append('remind_before', numberDate);
      //     form.append('students', JSON.stringify(chooseStudent));
      //     form.append('data_exercise', JSON.stringify(data_exercise.map(i => {
      //         let body = {
      //             exercise_id: i.lesson_id,
      //             list_guide_id: [],
      //             exercise_type: i.lesson_type,
      //             start_time: i.start_time,
      //             end_time: i.end_time
      //         }
      //         return body
      //     })));
      //     console.log("----form", form);
      //     setLoading(true)
      //     APIBase.tokenAPI('POST', API.baseurl + API.giveHomework, form)
      //         .then((r) => {
      //             console.log('r', r)
      //             setLoading(false)
      //             props.navigation.navigate('ManageAssign')
      //             Global.reloadDataManageAssign()
      //         }).catch((err) => {
      //             console.log(err)
      //             setLoading(false)
      //         })
      // }
      // else {
      const form = {
        data_exercise: [],
        before_start_time: startAfter ? 1 : 0,
        class_id: props.navigation.getParam('class').id,
        note: note,
        remind_before: numberDate,
        start_time: moment(startDate).format('YYYY-MM-DD 00:00:00'),
        end_time: moment(endDate).format('YYYY-MM-DD 23:59:59'),
      };
      dispatch(ActionAssignManagent(data_exercise));
      dispatch(ActionAssign(form));
      props.navigation.navigate('CompleteAssign', {
        role: 'curriculum',
        flow: props.navigation.getParam('flow'),
      });
      // }
    }
  };

  /**
   * Function validate before change textinput value
   */
  const checknumberDate = value => {
    if (!value) {
      setnumberDate('');
      return;
    }
    const regex = /^\d+$/;
    if (regex.test(value)) {
      setnumberDate(value);
    }
  };
  return {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    remind,
    setRemind,
    startAfter,
    setStartAfter,
    language,
    err,
    setErr,
    note,
    setNote,
    numberDate,
    setnumberDate,
    onSave,
    loading,
    checknumberDate,
    errorDate,
  };
};
