import Types from '../types';

const initialState = {
  listFavourite: [],
  curriculumCourseSunday: [],
  curriculumCoursePersonal: [],
  choicedCurriculum: [],
};

const FavoriteCurriculumReducer = (state = initialState, action) => {
  const {type, param, data} = action;
  switch (type) {
    case Types.FAVORITECURRICULUM: {
      return {
        ...state,
        listFavourite: param,
      };
    }
    case Types.GET_CURRICULUM_COURSE_SUNDAY: {
      return {
        ...state,
        curriculumCourseSunday: data.curriculumCourseSunday,
      };
    }
    case Types.GET_CURRICULUM_COURSE_PERSONAL: {
      return {
        ...state,
        curriculumCoursePersonal: data.curriculumCoursePersonal,
      };
    }
    case Types.CHOICE_CURRICULUM_COURSE: {
      return {
        ...state,
        choicedCurriculum: data.choicedCurriculum,
      };
    }

    default: {
      return state;
    }
  }
};

export default FavoriteCurriculumReducer;
