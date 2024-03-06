import {useSelector} from 'react-redux';
import {useState, useEffect} from 'react';
import LogBase from '../../../../base/LogBase';
import API from '../../../../API/APIConstant';
import APIBase from '../../../../base/APIBase';
import LessonBase from '../../../../base/LessonBase';

export const manageExerciseClassLogic = props => {
  const {navigation} = props;
  const {id} = navigation.state.params;
  const dataLogin = useSelector(state => state.AuthStackReducer.dataLogin);
  const childSelected = useSelector(
    state => state.ManageChildrenReducer.childSelected,
  );

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [mesPopup, setMes] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [curItemDT, setCurItemDT] = useState();

  useEffect(() => {
    _getData();
  }, []);

  const _getData = async () => {
    setLoading(true);
    const url =
      API.baseurl +
      API.listExerciseStudentAClass +
      '?class_id=' +
      id +
      '&student_id=' +
      childSelected?.id;

    try {
      const res = await APIBase.postDataJson('get', url);

      console.log('======res', res)

      if (res.data.status) {
        setData(res.data.data); // nhớ sửa lại
      } else {
        setData([]);
      }
      setLoading(false);
    } catch (e) {
      setData([]);
      setLoading(false);
    }
  };

  const checkStatus = item => {
    if (item.status == 1 && ((item.exercise_type == 'writing' && item.question_type == 7) || (item.exercise_type == 'speaking' && item.question_type == 3) || (item.exercise_type == 'project'))) {
      setCurItemDT(item);
      setMes(
        'Con đã nộp bài và giáo viên đã chấm. Bạn có muốn xem bài chữa của con không?',
      );
      setShowPopup(true);
    }
  };

  const onNavigateHomeworkDetail = item => {
    var mData = item;
    mData.userExerciseId = item.id;
    mData.library = 'exercise';
    mData.exerciseType = item.exercise_type;
    if (item.exercise_type == 'writing') {
      props.navigation.navigate('StudentWrittingScreen', {
        item: mData,
        isTeacher: false,
      });
    } else {
      props.navigation.navigate('HomeworkDetail', {item: mData});
    }
  };

  const _handleDoExercise = item => {
    const data = {
      lesson_type: item.exercise_type,
      exam_id: item.id,
      question_type: item.question_type,
      lesson_name: item.exercise_name,
      lesson_id: item.id,
      resources_id: item.resources_id,
      lesson_homework: true,
      user_received_id: item.id,
      class_id: item.class_id,
      unit_id: item?.unit_id,
    };

    LessonBase._moveLessonHS(
      data,
      props.navigation,
      false,
      _getData,
      'excClass',
    );
  };

  return {
    loading,
    data,
    mesPopup,
    showPopup,
    curItemDT,
    checkStatus,
    onNavigateHomeworkDetail,
    _handleDoExercise,
    setShowPopup,
  };
};
