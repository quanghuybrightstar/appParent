import React, {useEffect, useState} from 'react';
import moment from 'moment';
import APIBase from '../../../../base/APIBase';
import API from '../../../../API/APIConstant';
import {useDispatch, useSelector} from 'react-redux';
import {ActionAssign} from '../../../../redux/actions/ActionAssign';
import {EditAssignJson} from '../../../../stringJSON';
import {Colors} from '../../../../styleApp/color';
import {ActionAssignManagent} from '../../../../redux/actions/ActionAssignManagent';
import LogBase from '../../../../base/LogBase';

/**
 * FastAssignmentsScreen Screen logic handler
 * @param {object} props navigation props
 * @returns
 */
export const FastAssignmentsMethod = props => {
  // Start time
  let [startDate, setStartDate] = useState(moment().toDate());
  // End time
  let [endDate, setEndDate] = useState(moment().add(2, 'days').toDate());
  // chosen student list
  let [chooseStudent, setChooseStudent] = useState([]);
  // flag check if choose all student
  let [chooseAll, setChooseAll] = useState(false);
  // flag check if choose remind student
  let [remind, setRemind] = useState(false);
  // flag check if student can do before time
  let [startAfter, setStartAfter] = useState(false);
  // loading flag
  let [loading, setLoading] = useState(false);
  // Student list
  let [listStudent, setListStudent] = useState([]);
  const language = useSelector(state => state.LanguageStackReducer.language);
  // Error for checking remind days
  let [err, setErr] = useState('');
  //Error for date
  let [errorDate, setErrorDate] = useState('');
  // Note for remind
  let [note, setNote] = useState('');
  // number of days before remind
  let [numberDate, setnumberDate] = useState('');
  // role
  let [role] = useState(props.navigation.getParam('role'));
  // data list after assign
  const [dataAfterAssign, setDataAfterAssign] = useState([]);
  // data list before assign
  const [dataBeforeAssign, setDataBeforeAssign] = useState([]);
  const dispatch = useDispatch();
  const exercise_info = props.navigation.getParam('exercise_info');

  useEffect(() => {
    if (role === 'SettingAssign') {
      // getStudent()
    } else {
      setFillDataToEdit();
    }
    if (exercise_info) {
      setStartDate(moment(exercise_info.start_time).toDate());
      setEndDate(moment(exercise_info.end_time).toDate());
      LogBase.log('=====exercise_info.note', exercise_info.note);
      if (exercise_info.note && exercise_info.note.length > 0) {
        setRemind(true);
      } else {
        setRemind(false);
      }
      if (exercise_info.before_start_time === '0') {
        setStartAfter(false);
      } else {
        setStartAfter(true);
      }
    }
  }, []);
  useEffect(() => {
    if (
      chooseStudent.length > 0 &&
      listStudent.length === chooseStudent.length
    ) {
      setChooseAll(true);
    } else {
      setChooseAll(false);
    }
  }, [chooseStudent]);
  useEffect(() => {
    if (remind) {
      setNote(exercise_info?.note);
      if (!!exercise_info && exercise_info?.remind_before) {
        setnumberDate(exercise_info.remind_before);
      } else {
        setnumberDate('1');
      }
    } else {
      setNote(' ');
    }
  }, [remind]);
  useEffect(() => {
    const arr = [...dataAfterAssign, ...dataBeforeAssign];
    setChooseStudent([...new Set(arr)]);
  }, [dataAfterAssign, dataBeforeAssign]);

  // fill data when edit assign detail
  const setFillDataToEdit = async () => {
    const list_student = props.navigation.getParam('list_student');
    console.log('=====list_student', list_student);
    var dataStudent = [];
    var listStudentAssign = [];
    await list_student.map(i => {
      var student = {
        ...i,
        id: i.user_id,
      };
      if (i.status_assign == 1) {
        listStudentAssign.push(i.user_id);
      }
      dataStudent.push(student);
    });
    console.log('=====listStudentAssign', listStudentAssign);
    setListStudent(dataStudent);
    setDataAfterAssign(listStudentAssign);
    console.log('=====listStudentAssign ok');
  };

  /**
   * Function add/remove selected student in assign list
   */
  const onChooseStudent = item => {
    let temp = Array.from(dataBeforeAssign);
    if (temp.includes(item.id)) {
      temp = temp.filter(b => b !== item.id);
    } else if (!temp.includes(item.id)) {
      temp.push(item.id);
    }
    setDataBeforeAssign(temp);
  };

  /**
   * Function select all or remove all students in assign list
   */
  const onChooseAll = () => {
    if (!chooseAll) {
      let temp = Array.from(dataBeforeAssign);
      listStudent.map(item => {
        if (role === 'SettingAssign') {
          if (temp.includes(item.id)) {
            temp = temp.filter(i => i !== item.id);
            temp.push(item.id);
          } else {
            temp.push(item.id);
          }
        } else {
          if (item.status_assign === 0) {
            if (temp.includes(item.id)) {
              temp = temp.filter(i => i !== item.id);
              temp.push(item.id);
            } else {
              temp.push(item.id);
            }
          }
        }
      });
      setDataBeforeAssign(temp);
      setChooseAll(true);
    } else {
      setDataBeforeAssign([]);
      setChooseAll(false);
    }
  };

  /**
   * Function get list of student
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
   * Function save assignment ticket
   */
  const onSave = () => {
    console.log('=====onSave', numberDate);
    dispatch(ActionAssign([]));
    if (
      remind &&
      !!numberDate &&
      numberDate * 3600 * 24 >
        moment(moment(endDate).format('YYYY-MM-DD')).format('X') -
          moment(moment(startDate).format('YYYY-MM-DD')).format('X')
    ) {
      setErr(EditAssignJson.errMutil);
    } else {
      if (role === 'SettingAssign') {
        //props.navigation.navigate('ChooseCurruculum')
        props.navigation.navigate('ChooseAssignType');
        let param = {
          students: chooseStudent,
          data_exercise: [],
          before_start_time: startAfter ? 1 : 0,
          class_id: props.navigation.getParam('classId'),
          note: note,
          remind_before: numberDate,
          start_time: moment(startDate).format('YYYY-MM-DD 00:00:00'),
          end_time: moment(endDate).format('YYYY-MM-DD 23:59:59'),
        };
        console.log('=====paramGiao', param);
        dispatch(ActionAssign(param));
        dispatch(ActionAssignManagent([]));
      } else {
        var param = {
          students: JSON.stringify(dataAfterAssign),
          before_start_time: startAfter ? 1 : 0,
          class_id: Number(props.navigation.getParam('classId')),
          note: note,
          remind_before: Number(numberDate),
          start_time: moment(startDate).format('YYYY-MM-DD 00:00:00'),
          end_time: moment(endDate).format('YYYY-MM-DD 23:59:59'),
          exercise_id: props.navigation.getParam('exerciseId'),
        };
        var qs = require('qs');
        const form = qs.stringify(param);
        console.log('=====form', param);
        APIBase.tokenAPI('PUT', API.baseurl + API.ManagentAssign, form)
          .then(r => {
            setLoading(false);
            var cb = props.navigation.getParam('reload');
            if (cb) {
              cb();
            }
            props.navigation.goBack();
          })
          .catch(err => {
            console.log(err);
            setLoading(false);
          });
      }
    }
  };

  /**
   * Function return color base on selected student list
   */
  const checkColorBtn = () => {
    if (remind) {
      if (
        !!note &&
        !!numberDate &&
        chooseStudent.length > 0 &&
        err === '' &&
        errorDate === ''
      ) {
        return [Colors.LightGreen, Colors.BaseGreen];
      } else {
        return [Colors._BBBDBF, Colors._BBBDBF];
      }
    } else {
      if (chooseStudent.length > 0 && errorDate === '') {
        return [Colors.LightGreen, Colors.BaseGreen];
      } else {
        return [Colors._BBBDBF, Colors._BBBDBF];
      }
    }
  };

  /**
   * Function check disabled for button
   */
  const checkDisableBtn = () => {
    if (remind) {
      if (
        !!note &&
        note.trim().length > 0 &&
        !!numberDate &&
        chooseStudent.length > 0 &&
        err === '' &&
        errorDate === ''
      ) {
        return false;
      } else {
        return true;
      }
    } else {
      if (chooseStudent.length > 0 && errorDate === '') {
        return false;
      } else {
        return true;
      }
    }
  };

  /**
   * Function validation to make sure date is valid
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
    onChooseStudent,
    onChooseAll,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    remind,
    setRemind,
    startAfter,
    setStartAfter,
    chooseAll,
    chooseStudent,
    listStudent,
    language,
    err,
    setErr,
    note,
    setNote,
    numberDate,
    setnumberDate,
    onSave,
    loading,
    checkColorBtn,
    checkDisableBtn,
    role,
    checknumberDate,
    errorDate,
  };
};
