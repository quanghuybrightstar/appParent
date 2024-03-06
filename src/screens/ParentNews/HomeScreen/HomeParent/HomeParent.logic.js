import {useState, useEffect} from 'react';
import APIBase from '../../../../base/APIBase';
import API from '../../../../API/APIConstant';
import {useSelector, useDispatch} from 'react-redux';
import {
  ActionListChildren,
  ActionSelectedChild,
} from '../../../../redux/actions/Parent/ActionChildren';
import {store} from '../../../../redux/store';
import {Alert} from 'react-native';

export const homeParentLogic = props => {
  const _dispatch = useDispatch();
  const currDate = new Date();
  const listChildren = useSelector(
    state => state.ManageChildrenReducer.listChildren,
  );

  const childSelected = useSelector(
    state => state.ManageChildrenReducer.childSelected,
  );

  const [currChild, setCurrChild] = useState(childSelected);
  const [dataChildren, setDataChildren] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openListChildren, setOpenListChildren] = useState(false);
  const [typeAvgSkill, setTypeAvgSkill] = useState({type: 'month'});
  const [typeInforLearned, setTypeInforLearned] = useState('time');
  const [visibleModalInfor, setVisibleModalInfor] = useState(false);
  const [pointInfor, setPointInfor] = useState({
    total_time: '',
    month: '',
  });
  const [dataReportExercise, setDataReportExercise] = useState([]);
  const [dataAvgExam, setDataAvgExam] = useState({
    month: '',
    score: '0',
    growth: '0',
  });
  const [dataAvgExercise, setDataAvgExercise] = useState({
    month: '',
    score: '0',
    growth: '0',
  });

  const [totalScore, setTotalScore] = useState(0);

  const [dataTimeStudyMonth, setDataTimeStudyMonth] = useState([]);

  const [dataTimeLearning, setDataTimeLearning] = useState([]);

  const [dataExerciseWordMonth, setDataExerciseWordMonth] = useState([]);

  const [dataAvgSkill, setDataAvgSkill] = useState({
    type: 'month',
    month: '',
    skill_list: [],
  });

  // Helper function to check if a given month and day are within a specified range
  function isWithinRange(month, day, start, end) {
    const startDate = new Date(2022, start.month - 1, start.day); // Adding 1 because months are zero-based
    const endDate = new Date(2022, end.month - 1, end.day); // Adding 1 because months are zero-based

    const inputDate = new Date(2022, month - 1, day); // Adding 1 because months are zero-based

    // Check if the input date falls within the specified range
    return (
      (inputDate >= startDate && inputDate <= endDate) ||
      (inputDate >= startDate.setFullYear(2023) &&
        inputDate <= endDate.setFullYear(2023))
    );
  }

  // Convert time to id semester
  const convertSemester = date => {
    // Extract month and day components from the input date
    const inputMonth = date.getMonth() + 1; // Adding 1 because getMonth() returns a zero-based index
    const inputDay = date.getDate();

    // Define the start and end dates for each semester
    const semester1Start = {month: 8, day: 22}; // August 22
    const semester1End = {month: 1, day: 1}; // January 1

    const semester2Start = {month: 1, day: 2}; // January 2
    const semester2End = {month: 5, day: 31}; // May 31

    const summerSemesterStart = {month: 6, day: 1}; // June 1
    const summerSemesterEnd = {month: 8, day: 21}; // August 21

    // Compare the input month and day with each semester's start and end dates
    if (isWithinRange(inputMonth, inputDay, semester1Start, semester1End)) {
      return 1;
    } else if (
      isWithinRange(inputMonth, inputDay, semester2Start, semester2End)
    ) {
      return 2;
    } else if (
      isWithinRange(
        inputMonth,
        inputDay,
        summerSemesterStart,
        summerSemesterEnd,
      )
    ) {
      return 3;
    } else {
      return 0;
    }
  };

  const checkTypeAvg = dataParam =>
    dataParam.type == 'month'
      ? '&month=' + dataParam.month
      : '&semester=' + dataParam.semester;

  // Data Param Exam
  const [dataParamExam, setDataParamExam] = useState({
    type: 'month',
    month: currDate.getMonth() + 1,
    semester: convertSemester(currDate),
    year: currDate.getFullYear(),
  });

  // Data Param Exercise
  const [dataParamExercise, setDataParamExercise] = useState({
    type: 'month',
    month: currDate.getMonth() + 1,
    semester: convertSemester(currDate),
    year: currDate.getFullYear(),
  });

  // Data Param Exercise
  const [dataParamSkills, setDataParamSkills] = useState({
    type: 'month',
    month: currDate.getMonth() + 1,
    semester: convertSemester(currDate),
    year: currDate.getFullYear(),
  });

  // Fetch data list children
  const getDataChildren = async () => {
    setLoading(true);
    let url = API.baseurl + API.getListChildren;
    try {
      let response = await APIBase.postDataJson('get', url);
      setLoading(false);
      if (!!response && !!response.data && !!response.data.data) {
        const data = response.data.data;
        setDataChildren(data);
        _dispatch(ActionListChildren(data));
        if (!childSelected?.email) {
          setCurrChild(data[0]);
          store.dispatch(ActionSelectedChild(data[0]));
        }
      }
    } catch (error) {
      setLoading(false);
    }
  };

  // Fetch data list children
  const getDataReportExercise = async () => {
    setLoading(true);
    let url = API.baseurl + API.reportExercise + currChild?.id;
    try {
      let response = await APIBase.postDataJson('get', url);
      setLoading(false);
      if (!!response && !!response.data && !!response.data.data) {
        const data = response.data.data;
        setDataReportExercise(data);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  // Fetch data avg exam
  const getDataAvgExam = async () => {
    setLoading(true);

    let url =
      API.baseurl +
      API.getDataAvgChild +
      '?student_id=' +
      currChild?.id +
      '&type=' +
      dataParamExam.type +
      '&year=' +
      dataParamExam.year +
      '&source=1' +
      checkTypeAvg(dataParamExam);

    try {
      let response = await APIBase.postDataJson('get', url);
      setLoading(false);
      if (!!response && !!response.data && !!response.data.data) {
        const data = response.data.data;
        setDataAvgExam(data);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  // Fetch data avg exercise
  const getDataAvgExercise = async () => {
    setLoading(true);
    let url =
      API.baseurl +
      API.getDataAvgChild +
      '?student_id=' +
      currChild?.id +
      '&type=' +
      dataParamExercise.type +
      '&year=' +
      dataParamExercise.year +
      '&source=0' +
      checkTypeAvg(dataParamExercise);
    try {
      let response = await APIBase.postDataJson('get', url);
      setLoading(false);
      if (!!response && !!response.data && !!response.data.data) {
        const data = response.data.data;
        setDataAvgExercise(data);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  // Fetch data AVG Skill
  const getDataAvgSkill = async () => {
    setLoading(true);
    let url =
      API.baseurl +
      API.getDataAvgSkills +
      '?student_id=' +
      currChild?.id +
      '&type=' +
      dataParamSkills.type +
      '&year=' +
      dataParamSkills.year +
      checkTypeAvg(dataParamSkills);
    try {
      let response = await APIBase.postDataJson('get', url);
      setLoading(false);
      if (!!response && !!response.data && !!response.data.data) {
        const data = response.data.data;
        setDataAvgSkill(data);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  // Get total score
  const _getDataOnline = async () => {
    const url = API.baseurl + API.student_assessment + currChild?.id;
    try {
      const response = await APIBase.postDataJson('get', url);
      setTotalScore(response.data.data_assessment?.total_diamond);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch Data Time Study Month
  const getDataTimeStudyMonth = async () => {
    const url = API.baseurl + API.reportTimeStudyMonth + currChild?.id;
    try {
      const response = await APIBase.postDataJson('get', url);
      setDataTimeStudyMonth(response.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch Data Time Study Month
  const getDataTimeStudyWeek = async month => {
    // setLoading(true);
    const url =
      API.baseurl + API.reportTimeStudyWeek + currChild?.id + '&month=' + month;
    try {
      const response = await APIBase.postDataJson('get', url);
      setDataTimeLearning(response.data?.data);
      setVisibleModalInfor(true);
      // setLoading(false);
    } catch (error) {
      console.log(error);
      // setLoading(true);
    }
  };

  const checkUrlTypeMonth = month => {
    return month ? '&month=' + month : '';
  };

  // Fetch Data Time Study Month and Week
  const getDataExerciseWordLearned = async (
    type,
    typeExercise = typeInforLearned,
    month,
  ) => {
    // setLoading(true);
    const typeExerciseURL =
      typeExercise == 'exercise'
        ? API.reportExerciseLearned
        : API.reportWordLearned;

    const url =
      API.baseurl +
      typeExerciseURL +
      currChild?.id +
      '&type=' +
      type +
      checkUrlTypeMonth(month);
    try {
      const response = await APIBase.postDataJson('get', url);
      !!checkUrlTypeMonth()
        ? setDataTimeLearning(response.data?.data)
        : setDataExerciseWordMonth(response.data?.data);
      !!checkUrlTypeMonth(month) && setVisibleModalInfor(true);
      // setLoading(false);
    } catch (error) {
      console.log(error);
      // setLoading(true);
    }
  };

  useEffect(() => {
    getDataChildren();
    currChild?.id && getDataReportExercise();
    currChild?.id && _getDataOnline();
    currChild?.id && getDataTimeStudyMonth();
  }, [currChild]);

  useEffect(() => {
    currChild?.id && getDataAvgExam();
  }, [currChild, dataParamExam]);

  useEffect(() => {
    if (currChild?.id) {
      getDataAvgExercise();
    }
  }, [currChild, dataParamExercise]);

  useEffect(() => {
    if (currChild?.id) {
      getDataAvgSkill();
    }
  }, [currChild, dataParamSkills]);

  // Hnadle Open List Children
  const handleOpenListChildren = item => {
    dataChildren.length > 1 && setOpenListChildren(!openListChildren);
  };

  // Handle Select Child
  const handleSelectChild = item => {
    store.dispatch(ActionSelectedChild(item));
    setOpenListChildren(false);
    setCurrChild(item);
  };

  const handleNavigateDetailActivity = () => {
    const user = {
      fullname: childSelected.fullname || childSelected.full_name,
      id: childSelected.id,
    };
    props.navigation.navigate('StudyDiaryStudentScreen', {
      user: user,
    });
  };

  const handleChangeTypeLearned = type => {
    setTypeInforLearned(type);
    switch (type) {
      case 'time':
        getDataTimeStudyMonth();
        return;
      case 'exercise':
        getDataExerciseWordLearned(0, type);
        return;
      case 'word':
        getDataExerciseWordLearned(0, type);
        return;
      default:
        return;
    }
  };

  // Handle Close Modal Infor Week
  const handleCloseModalInfor = () => {
    setVisibleModalInfor(false);
  };

  // Handle Select point in chart
  const handleSelectPoint = value => {
    setPointInfor({
      total_time: value?.y,
      month: dataTimeStudyMonth[value?.x]?.month,
    });
    switch (typeInforLearned) {
      case 'time':
        getDataTimeStudyWeek(dataTimeStudyMonth[value?.x]?.month);
        return;
      case 'exercise':
        getDataExerciseWordLearned(
          1,
          typeInforLearned,
          dataExerciseWordMonth[value?.x].month,
        );
        return;
      case 'word':
        getDataExerciseWordLearned(
          1,
          typeInforLearned,
          dataExerciseWordMonth[value?.x].month,
        );
        return;
      default:
        return;
    }
  };

  // Handle Refresh data
  const handleRefreshData = () => {};

  return {
    currChild,
    visibleModalInfor,
    typeInforLearned,
    dataChildren,
    loading,
    openListChildren,
    handleOpenListChildren,
    handleSelectChild,
    setOpenListChildren,
    childSelected,
    typeAvgSkill,
    setTypeAvgSkill,
    handleNavigateDetailActivity,
    dataTimeLearning,
    handleChangeTypeLearned,
    handleCloseModalInfor,
    handleSelectPoint,
    pointInfor,
    setPointInfor,
    dataAvgSkill,
    dataReportExercise,
    currChild,
    dataAvgExam,
    dataAvgExercise,
    dataParamExam,
    dataParamExercise,
    setDataParamExam,
    setDataParamExercise,
    totalScore,
    dataTimeStudyMonth,
    dataExerciseWordMonth,
    dataParamSkills,
    setDataParamSkills,
    handleRefreshData,
  };
};
