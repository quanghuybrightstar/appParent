// map data from api to views
export const mapperHomeworkExcercises = (data = [], exercise_type) => {
  return data.map((value, index) => {
    const isAuto = !value.has_correction;
    // check nguoi cham hay may cham
    return isAuto
      ? {
          id: value.id,
          time: value.start_time,
          timeToLive: value.duration,
          score: value.score,
          isAuto: !value.has_correction,
          library: value.library,
          exerciseType: exercise_type,
          userExerciseId: value.user_exercise_id,
        }
      : {
          id: value.id,
          time: value.start_time,
          timeToLive: value.duration,
          score: value.score,
          isAuto: !value.has_correction,
          isMark: value.status === 1,
          library: value.library,
          exerciseType: exercise_type,
          userExerciseId: value.user_exercise_id,
        };
  });
};

export const mapHomeworkDetail = (data) => {
  return {
    exerciseData: {
      topic: data.exercise_data.topic,
      score: data.old_result.score || data.exercise_data.score,
      comment: data.old_result.comment || data.exercise_data.comment,
    },
    resourceData: {
      path: data.resource_data.path,
      file: data.resource_data.file,
      type: data.resource_data.file_type || data.resource_data.type,
    },
  };
};

export const mapSettingApp = (data) => {
  const setting = {};
  console.log('data', data);
  data?.map((item, index) => {
    const {key, value, type, setting_template_id, sub_value} = item;
    setting[key] = {
      type,
      value,
      index,
      setting_template_id,
      sub_value,
    };
  });
  return setting;
};
