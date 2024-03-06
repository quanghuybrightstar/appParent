export const mapCurriculumCourses = (data) => {
  return data.map((value, index) => {
    return {
      id: value.id,
      name: value.name,
      grade: value.grade_name,
      unitAmount: value.num_unit,
      createAt: value.created_at,
    };
  });
};
