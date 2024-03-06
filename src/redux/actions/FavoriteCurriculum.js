import API from '../../API/APIConstant';
import APIBase from '../../base/APIBase';
import Types from '../types';
import qs from 'qs';

const FavoriteCurriculum = (param) => ({
  type: Types.FAVORITECURRICULUM,
  param,
});

const getCurriculumCoursesSunday = (type = 'sgk') => async (
  dispatch,
  getState,
) => {
  const result = await APIBase.tokenAPI(
    'get',
    `${API.baseurl}${API.getCurriculumCourses}?type=${type}`,
  );

  dispatch({
    type: Types.GET_CURRICULUM_COURSE_SUNDAY,
    data: {
      curriculumCourseSunday: result.data.courses,
    },
  });
  return result;
};

const getCurriculumCoursesPersonal = (type = 'sgk') => async (
  dispatch,
  getState,
) => {
  const result = await APIBase.tokenAPI(
    'get',
    `${API.baseurl}${API.getCurriculumCourses}?type=${type}`,
  );

  dispatch({
    type: Types.GET_CURRICULUM_COURSE_PERSONAL,
    data: {
      curriculumCoursePersonal: result.data.courses,
    },
  });
  return result;
};

const dispatchGetClassDetail = (id) => async (dispatch, getState) => {
  const result = await APIBase.tokenAPI(
    'get',
    `${API.baseurl}${API.CreateClass}?id=${id}`,
  );

  console.log(
    '🛠 LOG: 🚀 --> -----------------------------------------------------------------------',
  );
  console.log(
    '🛠 LOG: 🚀 --> ~ file: FavoriteCurriculum.js ~ line 30 ~ result',
    result,
  );
  console.log(
    '🛠 LOG: 🚀 --> -----------------------------------------------------------------------',
  );
  return result.data?.data;
};

const dispatchChangeCurriculum = (classId, curriculumId) => async (
  dispatch,
  getState,
) => {
  const result = await APIBase.tokenAPI(
    'put',
    `${API.baseurl}${API.EditClasscurriculum}`,
    qs.stringify({
      class_id: classId,
      curriculum_id: curriculumId,
    }),
  );
  console.log(
    '🛠 LOG: 🚀 --> -----------------------------------------------------------------------',
  );
  console.log(
    '🛠 LOG: 🚀 --> ~ file: FavoriteCurriculum.js ~ line 30 ~ result',
    result,
  );
  console.log(
    '🛠 LOG: 🚀 --> -----------------------------------------------------------------------',
  );
  if (!result.status) {
    throw result;
  }
  return result?.data.data;
};

const dispatchDeleteCurriculum = (classId, curriculumId) => async (
  dispatch,
  getState,
) => {
  const result = await APIBase.tokenAPI(
    'delete',
    `${API.baseurl}${API.Classcurriculum}`,
    qs.stringify({
      class_id: classId,
      curriculum_id: curriculumId,
    }),
  );

  if (!result.status) {
    throw result;
  }
  return result;
};

export {
  FavoriteCurriculum,
  getCurriculumCoursesSunday,
  getCurriculumCoursesPersonal,
  dispatchGetClassDetail,
  dispatchChangeCurriculum,
  dispatchDeleteCurriculum,
};
